#!/usr/bin/env node
/**
 * Aperture component audit — mechanically measures the state/a11y/docs matrix
 * for every exported component, so the roadmap in UNSEEN-ROADMAP-*.md stays
 * honest and regressions are visible in CI.
 *
 * For each `export function X` / `export const X` in src/ui, it records:
 *   states   — disabled / loading / error / empty support found in source
 *   a11y     — aria-*, role=, focus-visible, keyboard handlers, useId
 *   api      — forwardRef, asChild/polymorphic, controlled (value/onChange)
 *   docs     — whether a doc page exists in src/docs/nav.ts (by keyword match)
 *
 * Usage:
 *   node scripts/component-audit.mjs            human table + summary
 *   node scripts/component-audit.mjs --json     machine-readable
 *   node scripts/component-audit.mjs --md       markdown table (for ROADMAP)
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const UI = new URL("../src/ui/", import.meta.url).pathname;
const MODE = process.argv.includes("--json") ? "json" : process.argv.includes("--md") ? "md" : "table";

/* Components are capitalised exports of function/const in src/ui/*.tsx */
const rows = [];
for (const file of readdirSync(UI).filter((f) => f.endsWith(".tsx")).sort()) {
  const src = readFileSync(join(UI, file), "utf8");
  const names = new Set();
  for (const m of src.matchAll(/export\s+function\s+([A-Z][A-Za-z0-9]*)/g)) names.add(m[1]);
  for (const m of src.matchAll(/export\s+const\s+([A-Z][A-Za-z0-9]*)\s*=/g)) names.add(m[1]);

  /* Split the file into per-component chunks: from each export to the next. */
  const exportIdx = [...src.matchAll(/\nexport\s+(?:function|const)\s+([A-Z][A-Za-z0-9]*)/g)].map((m) => ({
    name: m[1],
    at: m.index,
  }));
  exportIdx.forEach(({ name, at }, i) => {
    const nextSection = src.indexOf("\n/* ---", at + 20);
    const end = exportIdx[i + 1]?.at ?? (nextSection > 0 ? nextSection : src.length);
    const chunk = src.slice(at, Math.max(end, at + 40));
    // shared helpers defined above the export still count: scan a window of the file
    const window2 = src.slice(Math.max(0, at - 4000), Math.min(src.length, at + chunk.length + 2000));
    rows.push({
      file: `ui/${file}`,
      name,
      disabled: /\bdisabled\b/.test(window2),
      loading: /\b(loading|isLoading|busy)\b/.test(window2),
      error: /\b(error|invalid|aria-invalid)\b/.test(window2),
      empty: /empty/i.test(chunk),
      aria: /aria-/.test(chunk) || /aria-/.test(window2),
      role: /role=/.test(chunk) || /role=/.test(window2),
      focus: /focus-visible|focus:shadow-ring|focus:ring/.test(window2),
      keyboard: /onKeyDown|key === |e\.key/.test(window2),
      ids: /useId/.test(window2),
      polymorph: /asChild|href\?|forwardRef/.test(chunk),
      controlled: /onChange|onValueChange|onCheckedChange|defaultValue/.test(chunk),
    });
  });
}

/* Doc coverage: match component name words against nav hrefs/titles. */
const nav = readFileSync(new URL("../src/docs/nav.ts", import.meta.url), "utf8");
const navText = nav.toLowerCase();
const slug = (s) => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
for (const r of rows) {
  const s = slug(r.name);
  const words = s.split("-");
  r.docs =
    navText.includes(s) ||
    navText.includes(`href: "components/${s}`) ||
    words.every((w) => w.length < 3 || navText.includes(w));
}

/* De-dupe and summarise. */
const flags = ["disabled", "loading", "error", "empty", "aria", "role", "focus", "keyboard", "ids", "polymorph", "controlled", "docs"];
const tally = Object.fromEntries(flags.map((f) => [f, rows.filter((r) => r[f]).length]));

if (MODE === "json") {
  console.log(JSON.stringify({ total: rows.length, tally, rows }, null, 2));
  process.exit(0);
}

if (MODE === "md") {
  console.log(`| Component | File | Dis | Load | Err | Aria | Role | Focus | Keys | Ctrl | Docs |`);
  console.log(`|---|---|---|---|---|---|---|---|---|---|---|`);
  for (const r of rows)
    console.log(
      `| ${r.name} | ${r.file} | ${["disabled", "loading", "error", "aria", "role", "focus", "keyboard", "controlled", "docs"].map((f) => (r[f] ? "✓" : "·")).join(" | ")} |`
    );
  process.exit(0);
}

const col = (s, n) => String(s).padEnd(n);
console.log(col("Component", 24) + col("File", 20) + flags.map((f) => col(f.slice(0, 5), 6)).join(""));
console.log("-".repeat(24 + 20 + flags.length * 6));
for (const r of rows)
  console.log(col(r.name, 24) + col(r.file, 20) + flags.map((f) => col(r[f] ? "✓" : "·", 6)).join(""));
console.log(`\n${rows.length} components audited.`);
for (const f of flags) console.log(`  ${col(f, 12)} ${tally[f]}/${rows.length} (${Math.round((tally[f] / rows.length) * 100)}%)`);
