/**
 * Aperture design-lint — enforces the design-system contract statically.
 * Run: node scripts/design-lint.mjs
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("../src/", import.meta.url).pathname;
const files = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(tsx|ts)$/.test(f)) files.push(p);
  }
})(ROOT);

const problems = [];
const warn = (file, line, rule, msg) => problems.push({ file: relative(ROOT, file), line, rule, msg });

/* ------------------------------------------------------------------ rules */
const RULES = [
  { id: "type-scale", re: /\btext-\[(1[0-9]|[6-9]|2[0-9]|3[0-9])(\.\d+)?px\]/g, msg: "Arbitrary px text size — use text-label-* / text-paragraph-* / text-title-h* / text-subheading-*", allow: [/\[8px\]/, /\[9px\]/, /\[10px\]/, /\[11px\]/] },
  { id: "type-scale", re: /\b(text-xs|text-sm|text-base|text-lg|text-xl|text-2xl|text-3xl)\b/g, msg: "Tailwind default text size — use the Aperture type scale" },
  { id: "weight", re: /\bfont-semibold\b/g, msg: "font-semibold is not in the scale; the system is 500 (label/title) and 400 (paragraph)", allow: [/Typography|Foundations/] },
  { id: "legacy-shadow", re: /\bshadow-e[1-5]\b/g, msg: "Legacy elevation token — use shadow-xs/sm/md/lg/xl" },
  { id: "card-border", re: /rounded-(xl|2xl|20) border border-border bg-surface/g, msg: "Cards use ring-1 ring-border (hairline) not border" },
  { id: "raw-color", re: /\b(bg|text|ring|border)-(slate|zinc|stone|indigo|violet|emerald|rose|amber|lime|cyan)-\d{2,3}\b/g, msg: "Raw Tailwind palette colour — use semantic or the 10-colour state palette" },
  { id: "raw-hex", re: /#[0-9a-fA-F]{6}\b/g, msg: "Hex literal in a component — move it to a token", onlyIn: /ui\//, allow: [/Extra\.tsx/, /Patterns\.tsx/, /More\.tsx/] },
  { id: "icon-size", re: /\[&_svg\]:h-3\b/g, msg: "12px icons are below the 16/20/24 scale", allow: [/Display\.tsx/, /Extra\.tsx/] /* small badge/tag glyphs are 12px per AlignUI */ },
  { id: "opacity-disabled", re: /disabled:opacity-\[var\(--disabled-opacity\)\]/g, msg: "AlignUI disables with weak fill + disabled text, not opacity", onlyIn: /ui\/(Button|Form)\.tsx/ },
];

for (const f of files) {
  const src = readFileSync(f, "utf8");
  const lines = src.split("\n");
  for (const r of RULES) {
    if (r.onlyIn && !r.onlyIn.test(f)) continue;
    if (r.allow?.some((a) => a.test(f))) continue;
    lines.forEach((ln, i) => {
      if (ln.trimStart().startsWith("//") || ln.trimStart().startsWith("*")) return;
      let m;
      r.re.lastIndex = 0;
      while ((m = r.re.exec(ln))) {
        if (r.allow?.some((a) => a.test(m[0]))) continue;
        warn(f, i + 1, r.id, `${r.msg}  →  ${m[0]}`);
      }
    });
  }
}

/* -------------------------------------------------- a11y: icon-only buttons */
for (const f of files) {
  const src = readFileSync(f, "utf8");
  const re = /<(Button|FancyButton|CompactButton)\b([^>]*?)iconOnly([^>]*?)>/g;
  let m;
  while ((m = re.exec(src))) {
    const attrs = m[2] + m[3];
    if (!/aria-label=/.test(attrs) && !/\{\.\.\./.test(attrs)) {
      const line = src.slice(0, m.index).split("\n").length;
      warn(f, line, "a11y", `iconOnly <${m[1]}> without aria-label`);
    }
  }
}

/* ---------------------------------------------- routes ↔ nav ↔ previews */
const nav = readFileSync(join(ROOT, "docs/nav.ts"), "utf8");
const registry = readFileSync(join(ROOT, "pages/registry.tsx"), "utf8");
const index = readFileSync(join(ROOT, "pages/ComponentsIndex.tsx"), "utf8");
const navHrefs = [...nav.matchAll(/href:\s*"([^"]+)"/g)].map((m) => m[1]);
const routeKeys = [...registry.matchAll(/^\s+"?([a-z0-9/-]+)"?:\s*\(/gm)].map((m) => m[1]);
const previewKeys = [...index.matchAll(/^\s+"(components\/[a-z0-9-]+)":/gm)].map((m) => m[1]);

for (const h of navHrefs) if (!routeKeys.includes(h)) warn(join(ROOT, "docs/nav.ts"), 0, "route", `nav item "${h}" has no page in registry`);
for (const h of navHrefs.filter((x) => x.startsWith("components/"))) if (!previewKeys.includes(h)) warn(join(ROOT, "pages/ComponentsIndex.tsx"), 0, "preview", `component "${h}" has no gallery preview`);
const dupPreview = previewKeys.filter((k, i) => previewKeys.indexOf(k) !== i);
for (const d of new Set(dupPreview)) warn(join(ROOT, "pages/ComponentsIndex.tsx"), 0, "preview", `duplicate preview key "${d}" (later one wins)`);

/* ------------------------------------------------------------ tokens bridge */
const css = readFileSync(join(ROOT, "index.css"), "utf8");
const semantic = [...css.matchAll(/^\s+--([a-z0-9-]+):/gm)].map((m) => m[1]);
const bridged = new Set([...css.matchAll(/--color-([a-z0-9-]+):\s*var\(--([a-z0-9-]+)\)/g)].map((m) => m[2]));
const colorish = semantic.filter((t) => /^(background|surface|foreground|muted|subtle|disabled|link|overlay|segment|backdrop|border|separator|field|accent|default|success|warning|danger|gray|blue|orange|red|green|yellow|purple|sky|pink|teal)(-|$)/.test(t) && !/^accent-(h|c)$/.test(t) && !/^(disabled-opacity|border-width)$/.test(t));
for (const t of new Set(colorish)) if (!bridged.has(t)) warn(join(ROOT, "index.css"), 0, "bridge", `semantic token --${t} is not exposed to Tailwind via @theme inline`);

/* ------------------------------------------------------------------ report */
const byRule = {};
for (const p of problems) (byRule[p.rule] ??= []).push(p);
const order = ["route", "preview", "bridge", "a11y", "type-scale", "weight", "legacy-shadow", "card-border", "raw-color", "raw-hex", "icon-size", "opacity-disabled"];
let total = 0;
for (const r of order) {
  const list = byRule[r];
  if (!list) continue;
  total += list.length;
  console.log(`\n\x1b[1m${r}\x1b[0m  (${list.length})`);
  for (const p of list.slice(0, 12)) console.log(`  ${p.file}${p.line ? ":" + p.line : ""}  ${p.msg}`);
  if (list.length > 12) console.log(`  … +${list.length - 12} more`);
}
console.log(`\n${files.length} files scanned · nav ${navHrefs.length} · routes ${routeKeys.length} · previews ${previewKeys.length} · ${total} findings`);
const blocking = problems.filter((p) => ["route", "preview", "bridge", "a11y"].includes(p.rule)).length;
process.exit(blocking ? 1 : 0);
