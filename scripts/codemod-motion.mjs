#!/usr/bin/env node
/**
 * codemod-motion — put every transition on Unseen's motion scale.
 *
 * The system defines five durations, three easings and a set of animation
 * tokens (see Foundations → Motion). Components drifted onto Tailwind's stock
 * numbers instead: duration-150/200/300/500/700, ease-out, animate-pulse,
 * animate-ping, plus a few hand-written `0.5s` strings inside inline styles.
 *
 * Stock values are not wrong in isolation — they are just not the system. Two
 * of them disagreed with it outright (500ms and 700ms exceeded the documented
 * 400ms cap).
 *
 * Mapping (the Foundations table is the source of truth):
 *
 *   duration-150  → --duration-fast     (150ms)  buttons, chips, switches
 *   duration-200  → --duration-base     (220ms)  popovers, tooltips, tabs
 *   duration-300  → --duration-slow     (300ms)  accordions, drawers
 *   duration-500  → --duration-slower   (400ms)  modals, page transitions
 *   duration-700  → --duration-slower   (400ms)  ditto (nothing exceeds 400ms)
 *   ease-out      → --ease-out-quint             the enter/reveal curve
 *   animate-pulse → --animate-pulse-soft         live/streaming indicators
 *   animate-ping  → --animate-ping-soft          attention rings
 *   animate-spin  → --animate-spin-slow          spinners
 *
 * Usage:
 *   node scripts/codemod-motion.mjs             dry run
 *   node scripts/codemod-motion.mjs --write     apply
 *   node scripts/codemod-motion.mjs --json      machine-readable report
 */
import { readFileSync, readdirSync, writeFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("../", import.meta.url).pathname;
const SRC = join(ROOT, "src");
const WRITE = process.argv.includes("--write");
const JSON_OUT = process.argv.includes("--json");

/** Utility rewrites. Order matters: `ease-out` must not eat `ease-out-quint`. */
const RULES = [
  [/\bduration-150\b/g, "duration-[var(--duration-fast)]"],
  [/\bduration-200\b/g, "duration-[var(--duration-base)]"],
  [/\bduration-300\b/g, "duration-[var(--duration-slow)]"],
  [/\bduration-500\b/g, "duration-[var(--duration-slower)]"],
  [/\bduration-700\b/g, "duration-[var(--duration-slower)]"],
  [/\bease-out\b(?!-)/g, "ease-out-quint"],
  [/\banimate-pulse\b(?!-)/g, "animate-pulse-soft"],
  [/\banimate-ping\b(?!-)/g, "animate-ping-soft"],
  [/\banimate-spin\b(?!-)/g, "animate-spin-slow"],
  /* hand-written durations in inline styles */
  [/(?<![\w-])\.5s\b/g, "var(--duration-slower)"],
  [/(?<![\w-])\.3s\b/g, "var(--duration-slow)"],
  [/(?<![\w-])\.2s\b/g, "var(--duration-base)"],
  [/(?<![\w-])\.15s\b/g, "var(--duration-fast)"],
  [/(?<![\w-])0\.5s\b/g, "var(--duration-slower)"],
  [/(?<![\w-])0\.3s\b/g, "var(--duration-slow)"],
  [/(?<![\w-])0\.2s\b/g, "var(--duration-base)"],
  [/(?<![\w-])0\.15s\b/g, "var(--duration-fast)"],
];

/** Hand-written seconds inside CSS transition/animation declarations. */
const CSS_FILES = ["src/index.css", "src/styles/studio.css"];
const CSS_SECONDS = [
  [/(?<![\w-])0?\.1s\b/g, "var(--duration-fast)"],
  [/(?<![\w-])0?\.15s\b/g, "var(--duration-fast)"],
  [/(?<![\w-])0?\.18s\b/g, "var(--duration-fast)"],
  [/(?<![\w-])0?\.2s\b/g, "var(--duration-base)"],
  [/(?<![\w-])0?\.22s\b/g, "var(--duration-base)"],
  [/(?<![\w-])0?\.25s\b/g, "var(--duration-base)"],
  [/(?<![\w-])0?\.3s\b/g, "var(--duration-slow)"],
  [/(?<![\w-])0?\.35s\b/g, "var(--duration-slow)"],
  [/(?<![\w-])0?\.65s\b/g, "var(--duration-slower)"],
];

/** Only seconds inside a transition/animation declaration — never a token
 *  definition (`--duration-fast: 0.15s`) or an unrelated measurement. */
function rewriteCss(src) {
  return src.replace(/(transition|animation)(-duration|-delay)?\s*:\s*([^;}]+)/g, (whole, prop, suffix = "", value) => {
    const next = CSS_SECONDS.reduce((acc, [re, token]) => acc.replace(re, token), value);
    return next === value ? whole : `${prop}${suffix}: ${next}`;
  });
}

/** Every .ts/.tsx file under src/. */
function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (/\.tsx?$/.test(entry)) out.push(p);
  }
  return out;
}

const report = { files: [], hits: {}, skipped: [] };

for (const path of walk(SRC).sort()) {
  const src = readFileSync(path, "utf8");
  let next = src;
  const counts = {};

  for (const [re, replacement] of RULES) {
    const found = next.match(re);
    if (found) counts[re.source] = (counts[re.source] ?? 0) + found.length;
    next = next.replace(re, replacement);
  }

  if (next === src) continue;
  const rel = relative(ROOT, path);
  report.files.push(rel);
  for (const [k, v] of Object.entries(counts)) report.hits[k] = (report.hits[k] ?? 0) + v;
  if (WRITE) writeFileSync(path, next);
}

/* the CSS layer: component CSS in index.css and the docs chrome */
for (const rel of CSS_FILES) {
  const path = join(ROOT, rel);
  const src = readFileSync(path, "utf8");
  const next = rewriteCss(src);
  if (next === src) continue;
  const n = [...src.matchAll(/[0-9.]+s/g)].length - [...next.matchAll(/[0-9.]+s/g)].length;
  report.files.push(rel);
  report.hits["css: transition/animation seconds"] = (report.hits["css: transition/animation seconds"] ?? 0) + n;
  if (WRITE) writeFileSync(path, next);
}

for (const rel of CSS_FILES) {
  for (const m of readFileSync(join(ROOT, rel), "utf8").matchAll(/(?:transition|animation)(?:-duration|-delay)?\s*:\s*([^;}]+)/g)) {
    const secs = [...m[1].matchAll(/(?<![\w.-])[0-9]*\.?[0-9]+m?s\b/g)].map((x) => x[0]).filter((v) => !/^0(\.01)?m?s$/.test(v)); // 0.01ms = the reduced-motion collapse
    if (secs.length) report.skipped.push({ utility: `css seconds: ${secs.join(", ")}`, files: [rel] });
  }
}

/* anything motion-shaped the rules do not know about */
const leftovers = {};
for (const path of walk(SRC).sort()) {
  const src = readFileSync(path, "utf8");
  for (const m of src.matchAll(/(?<![\w-])(?:duration|ease|animate)-[a-zA-Z0-9[\]().-]+/g)) {
    const u = m[0];
    if (/^duration-\[var\(--duration-(instant|fast|base|slow|slower)\)\]$/.test(u)) continue;
    if (/^ease-(out-quint|spring|in-out|linear)$/.test(u)) continue;
    if (/^animate-(fade-in|pop-in|slide-up|slide-down|slide-in-right|slide-in-left|indeterminate|shimmer|marquee|spin-slow|pulse-soft|ping-soft)$/.test(u)) continue;
    if (/^transition-/.test(u)) continue;
    (leftovers[u] ??= []).push(relative(ROOT, path));
  }
}
for (const [u, files] of Object.entries(leftovers)) {
  report.skipped.push({ utility: u, files: [...new Set(files)] });
}

if (JSON_OUT) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log(`\ncodemod-motion ${WRITE ? "(applied)" : "(dry run)"}`);
  console.log(`  files changed: ${report.files.length}`);
  console.log("  rewrites:");
  for (const [rule, n] of Object.entries(report.hits).sort((a, b) => b[1] - a[1])) {
    console.log(`    ${String(n).padStart(4)}  ${rule}`);
  }
  if (report.skipped.length) {
    console.log("\n  motion utilities not on the scale (review by hand):");
    for (const s of report.skipped) console.log(`    ${s.utility}  —  ${s.files.join(", ")}`);
  }
  if (!WRITE) console.log("\n  (dry run — re-run with --write to apply)");
}
