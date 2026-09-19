#!/usr/bin/env node
/**
 * Unseen variant audit — mechanically counts the *meaningful variant cells*
 * of every exported component, per the counting law in CONVENTIONS.md §1 and
 * UNSEEN-V2-ROADMAP.md §3.
 *
 * A "cell" = one combination of axis values (intent × variant × size × …).
 * Only canonical axis props count (tone/variant/size/shape/placement/density/
 * status/brand/orientation); states (loading/disabled/error) are measured
 * separately by component-audit and are NOT variants.
 *
 * Alias law (COMPONENT-QUALITY-SPEC.md §3.3): a union member whose type name
 * ends in `Alias` (e.g. `variant?: Variant | IntentAlias`) is ergonomics, not a
 * cell. Alias members are recorded per component in `aliases` and excluded from
 * the cell product, so shorthand can never inflate the count.
 *
 * For each `export function X` / `export const X` in src/ui it:
 *   - resolves string-literal unions in the component's prop sections,
 *     including: file-level `export type Axis = "a" | "b"` referenced from a
 *     prop (`size?: Size`), cross-file aliases (imports), mixed unions
 *     (`BadgeVariant | "solid"`), and `keyof typeof X` brand/color records;
 *   - buckets the unions under canonical axis names,
 *   - computes cells = product of the axis arities (0 when the component
 *     has no axes — documentation-only, which is fine for containers).
 *
 * Usage:
 *   node scripts/variant-audit.mjs                       human table + total
 *   node scripts/variant-audit.mjs --json                machine-readable
 *   node scripts/variant-audit.mjs --md                  markdown table
 *   node scripts/variant-audit.mjs --baseline F          fail if total < F's total
 *   node scripts/variant-audit.mjs --write-baseline F    record current total
 *   node scripts/variant-audit.mjs --out F               write the full payload
 *                                                        (axes AND their values)
 *   node scripts/variant-audit.mjs --out F --check       fail if F would change
 *
 * The `--out` payload is what `/figma` publishes as the naming contract: one
 * component per row, its axes and the canonical value of every axis. It is
 * deterministic and diff-checked, so the page cannot describe a component the
 * source no longer has.
 */
import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";

const UI = new URL("../src/ui/", import.meta.url).pathname;
const argv = process.argv.slice(2);
const MODE = argv.includes("--json") ? "json" : argv.includes("--md") ? "md" : "table";
const BASELINE = argv.includes("--baseline") ? argv[argv.indexOf("--baseline") + 1] : null;
const WRITE_BASELINE = argv.includes("--write-baseline") ? argv[argv.indexOf("--write-baseline") + 1] : null;
const OUT = argv.includes("--out") ? argv[argv.indexOf("--out") + 1] : null;
const CHECK = argv.includes("--check");

/* Canonical axis prop names (CONVENTIONS.md §1.1). Aliases map to the
 * canonical name: color→intent, mode/look→variant, side→placement (edge overlays). */
const AXIS = {
  tone: "intent", color: "intent",
  variant: "variant", mode: "variant", look: "variant", appearance: "variant",
  size: "size", shape: "shape", placement: "placement", side: "placement", density: "density",
  status: "status", brand: "brand", orientation: "orientation",
};

/* `status` unions count only when they look like display statuses, not data
 * states (e.g. FileUploader's "uploading" | "done" | "error"). */
const STATUS_VALUES = new Set([
  "completed", "pending", "failed", "disabled", "info", "neutral",
  "online", "offline", "busy", "success", "warning", "error",
  "accent", "danger", "default", "new", "active",
]);

const files = readdirSync(UI).filter((f) => f.endsWith(".tsx")).sort();
const sources = Object.fromEntries(files.map((f) => [f, readFileSync(join(UI, f), "utf8")]));

/* ---- global symbol maps ------------------------------------------------ */

/* type NAME = "a" | "b" | …  (exported or not) */
const aliasDefs = {}; // name -> [valuesArray, …]
for (const [f, src] of Object.entries(sources)) {
  for (const m of src.matchAll(/^(?:export\s+)?type\s+([A-Z][A-Za-z0-9]*)\s*=\s*((?:"[^"]+"\s*\|\s*)*"[^"]+")\s*;/gm)) {
    const values = [...m[2].matchAll(/"([^"]+)"/g)].map((v) => v[1]);
    (aliasDefs[m[1]] ??= []).push(values);
  }
}

/* const NAME = { key: …, … } → record key count (for `keyof typeof NAME`) */
const recordDefs = {}; // name -> [keyCount, …]
for (const [f, src] of Object.entries(sources)) {
  for (const m of src.matchAll(/^(?:export\s+)?const\s+([A-Z][A-Za-z0-9]*)\s*=\s*\{/gm)) {
    /* brace-match to the end of the object literal */
    let depth = 0, i = m.index + m[0].length - 1, inStr = null;
    for (; i < src.length; i++) {
      const ch = src[i];
      if (inStr) { if (ch === inStr && src[i - 1] !== "\\") inStr = null; continue; }
      if (ch === '"' || ch === "'" || ch === "`") { inStr = ch; continue; }
      if (ch === "{") depth++;
      else if (ch === "}") { depth--; if (depth === 0) break; }
    }
    const body = src.slice(m.index + m[0].length, i);
    /* body starts just inside the opening brace, so top-level keys are the
     * ':' at depth 0 (relative) preceded by an identifier */
    let keys = 0;
    depth = 0;
    for (let j = 0; j < body.length; j++) {
      const ch = body[j];
      if (ch === "{") depth++;
      else if (ch === "}") depth--;
      else if (ch === ":" && depth === 0) {
        const before = body.slice(0, j).match(/([A-Za-z_$][\w$]*)\s*$/);
        if (before && !/[={(:,]/.test(body[j - 1] || "")) keys++;
      }
    }
    if (keys > 0) (recordDefs[m[1]] ??= []).push(keys);
  }
}

const resolveAlias = (file, name) => {
  const all = aliasDefs[name];
  if (!all) return null;
  /* same-file definition wins; otherwise require global uniqueness */
  if (all.length === 1) return all[0];
  return null;
};
const resolveRecord = (name) => {
  const all = recordDefs[name];
  if (!all || all.length !== 1) return null;
  return all[0];
};

/* ---- per-file analysis -------------------------------------------------- */

const rows = [];
for (const file of files) {
  const src = sources[file];

  /* section boundaries at every export. Only *capitalised* function/const
   * exports are components (CONVENTIONS.md §3); lower-case exports are helpers
   * and must never create a row or contribute cells. */
  const bounds = [];
  for (const m of src.matchAll(/\nexport\s+(function|const|interface|type)\s+([A-Za-z0-9_]+)/g)) {
    const isHelperFn = (m[1] === "function" || m[1] === "const") && !/^[A-Z]/.test(m[2]);
    if (isHelperFn) continue;
    bounds.push({ at: m.index, kind: m[1], name: m[2] });
  }

  const isCompKind = (k) => k === "function" || k === "const";

  /* union props found in each section */
  const propsForSection = bounds.map((b, i) => {
    const end = bounds[i + 1]?.at ?? src.length;
    const section = src.slice(b.at, end);
    const found = {};
    const foundValues = {};
    const foundAliases = {};
    /* prop-name then a union of string literals and/or identifiers,
     * or the special form `keyof typeof Record` */
    const re = /(^|[\s,{(])\b([a-z][A-Za-z0-9]*)\??:\s*((?:keyof\s+typeof\s+[A-Za-z_$][\w$]*)|(?:"[^"]+"|[A-Za-z_$][\w$]*)(?:\s*\|\s*(?:"[^"]+"|[A-Za-z_$][\w$]*))*)/g;
    for (const m of section.matchAll(re)) {
      const propName = m[2];
      const axis = AXIS[propName];
      if (!axis) continue;
      const type = m[3];
      let values = null;
      if (/^keyof\s+typeof\s+([A-Za-z_$][\w$]*)$/.test(type)) {
        const n = resolveRecord(type.replace(/^keyof\s+typeof\s+/, ""));
        if (n && n >= 2) values = Array.from({ length: n }, (_, k) => `key${k}`);
      } else {
        const tokens = type.split(/\s*\|\s*/);
        const vals = new Set();
        let ok = true;
        for (const t of tokens) {
          if (t.startsWith('"')) vals.add(t.slice(1, -1));
          else if (/Alias$/.test(t)) (foundAliases[propName] ??= []).push(t);
          else {
            const a = resolveAlias(file, t);
            if (!a) { ok = false; break; }
            for (const v of a) vals.add(v);
          }
        }
        if (ok) values = [...vals];
      }
      if (!values || values.length < 2) continue;
      if (axis === "status" && values.filter((v) => STATUS_VALUES.has(v)).length < 2) continue;
      /* Longest union wins, and its values are kept: the count is what the
         scorecard grades, the values are what `/figma` publishes as the
         naming contract. One parse, two consumers. */
      if (!found[axis] || values.length > found[axis].length) {
        found[axis] = values;
        foundValues[axis] = [...values].sort((a, b) => a.localeCompare(b));
      }
    }
    return { axes: found, values: foundValues, aliases: foundAliases };
  });

  /* attribute sections to components */
  const compNames = new Set(bounds.filter((b) => isCompKind(b.kind)).map((b) => b.name));
  const acc = new Map();
  const get = (name) => {
    if (!acc.has(name)) acc.set(name, { file: `ui/${file}`, name, axes: {} });
    return acc.get(name);
  };
  const merge = (row, props, values) => {
    for (const [axis, list] of Object.entries(props)) {
      if (!row.axes[axis] || list.length > row.axes[axis]) {
        row.axes[axis] = list.length;
        row.values = row.values ?? {};
        row.values[axis] = values[axis] ?? [];
      }
    }
  };
  const mergeAliases = (row, aliases) => {
    for (const [prop, types] of Object.entries(aliases)) {
      row.aliases = row.aliases ?? {};
      row.aliases[prop] = [...new Set([...(row.aliases[prop] ?? []), ...types])];
    }
  };
  bounds.forEach((b, i) => {
    const { axes: props, values: propValues, aliases: propAliases } = propsForSection[i];
    if (Object.keys(props).length === 0) return;
    if (isCompKind(b.kind)) {
      merge(get(b.name), props, propValues);
      mergeAliases(get(b.name), propAliases);
      return;
    }
    /* interface/type sections: attribute only when clearly the component's
     * own props — `XProps` (to component X when it exists in this file,
     * else to the next component), a type named exactly like the next
     * component, or a bare `Props`. Unrelated data types (e.g. UploadFile)
     * are skipped. */
    const next = bounds.slice(i + 1).find((x) => isCompKind(x.kind));
    if (!next) return;
    const base = b.name.endsWith("Props") ? b.name.slice(0, -5) : b.name;
    if (b.name.endsWith("Props") && compNames.has(base)) { merge(get(base), props, propValues); mergeAliases(get(base), propAliases); }
    else if (b.name === "Props" || base === next.name) { merge(get(next.name), props, propValues); mergeAliases(get(next.name), propAliases); }
  });

  for (const row of acc.values()) {
    row.axes = Object.fromEntries(Object.entries(row.axes).sort((a, b) => a[0].localeCompare(b[0])));
    if (row.values) row.values = Object.fromEntries(Object.entries(row.values).sort((a, b) => a[0].localeCompare(b[0])));
    const entries = Object.entries(row.axes);
    row.cells = entries.length ? entries.reduce((p, [, n]) => p * n, 1) : 0;
    rows.push(row);
  }
}

rows.sort((a, b) => b.cells - a.cells || a.name.localeCompare(b.name));
const total = rows.reduce((p, r) => p + r.cells, 0);
const withAxes = rows.filter((r) => r.cells > 0).length;

/* baseline enforcement: the count may never silently shrink */
if (BASELINE && existsSync(BASELINE)) {
  const prev = JSON.parse(readFileSync(BASELINE, "utf8"));
  if (total < prev.total) {
    console.error(`variant-audit: REGRESSION — ${total} cells < baseline ${prev.total} (${BASELINE}).`);
    console.error("If this is deliberate (axes removed), update with --write-baseline and note it in the roadmap.");
    process.exit(1);
  }
}
if (WRITE_BASELINE) {
  mkdirSync(dirname(WRITE_BASELINE), { recursive: true });
  writeFileSync(
    WRITE_BASELINE,
    JSON.stringify({ total, components: withAxes, totalComponents: rows.length, at: new Date().toISOString().slice(0, 10) }, null, 2) + "\n",
  );
  console.error(`variant-audit: baseline written to ${WRITE_BASELINE} (total=${total}).`);
}

/* The committed artifact. Deliberately no timestamp: CI diffs it, and the page
 * imports it, so a change must mean the components changed. */
if (OUT) {
  const payload = JSON.stringify({ total, withAxes, totalComponents: rows.length, rows }, null, 2) + "\n";
  if (CHECK) {
    const prev = existsSync(OUT) ? readFileSync(OUT, "utf8") : "";
    if (prev !== payload) {
      console.error(`variant-audit: ${OUT} is stale — run \`npm run audit:variants:write\`.`);
      process.exit(1);
    }
    console.error(`variant-audit: ${OUT} up to date (${rows.length} components).`);
    process.exit(0);
  }
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, payload);
  console.error(`variant-audit: wrote ${OUT} (${rows.length} components, ${total} cells).`);
}

if (MODE === "json") {
  console.log(JSON.stringify({ total, withAxes, totalComponents: rows.length, rows }, null, 2));
  process.exit(0);
}

const axesOf = (r) => Object.entries(r.axes).map(([a, n]) => `${a}${n}`).join("·") || "—";
if (MODE === "md") {
  console.log("| Component | File | Axes | Cells |");
  console.log("|---|---|---|---|");
  for (const r of rows) console.log(`| ${r.name} | ${r.file} | ${axesOf(r)} | ${r.cells} |`);
  console.log(`\n**Total meaningful variant cells: ${total}** (${withAxes} of ${rows.length} components carry axes)`);
  process.exit(0);
}

const col = (s, w) => String(s).padEnd(w);
console.log(col("Component", 24) + col("File", 22) + col("Axes", 34) + "Cells");
console.log("-".repeat(84));
for (const r of rows) console.log(col(r.name, 24) + col(r.file, 22) + col(axesOf(r), 34) + r.cells);
const aliased = rows.filter((r) => r.aliases && Object.keys(r.aliases).length);
if (aliased.length) {
  console.log("\nAlias layer (ergonomics, not counted as cells — QUALITY-SPEC §3.3):");
  for (const r of aliased) console.log("  " + col(r.name, 24) + Object.entries(r.aliases).map(([p, t]) => `${p}: ${t.join("|")}`).join(", "));
}
console.log(`\n${rows.length} components · ${withAxes} with axes · **${total} meaningful variant cells**`);
