#!/usr/bin/env node
/**
 * Aperture accessibility audit — runs axe-core (WCAG 2.1 A/AA) against every
 * docs route, rendered from the production bundle in jsdom.
 *
 * This extends smoke.mjs's three hand-rolled heuristics with the full axe
 * rule set: ARIA attribute validity, role/parent relationships, labels,
 * duplicate ids, heading order, landmark structure, list/table semantics, …
 *
 * Known limit: jsdom cannot evaluate color-contrast (no layout painting), so
 * that rule is disabled here and must be validated in a real browser
 * (Playwright pass is on the roadmap). Everything else runs for real.
 *
 * Gate policy: CRITICAL and SERIOUS violations fail the run; moderate/minor
 * are reported as warnings. `--strict` fails on any impact.
 *
 * Run: node scripts/a11y-audit.mjs   (requires `dist/` — `npm run build` first)
 */
import { readFileSync } from "node:fs";
import { transform } from "esbuild";
import { JSDOM, VirtualConsole } from "jsdom";
import { siteRoutes } from "./routes.mjs";

const strict = process.argv.includes("--strict");
const GATE = strict ? ["critical", "serious", "moderate", "minor"] : ["critical", "serious"];

const html = readFileSync(new URL("../dist/index.html", import.meta.url), "utf8");
const match = html.match(/<script type="module"[^>]*>([\s\S]*?)<\/script>/);
if (!match) {
  console.error("✗ No inline module script found in dist/index.html. Run `npm run build` first.");
  process.exit(1);
}
const source = match[1].replace(/import\.meta\.url/g, JSON.stringify("http://localhost/"));
const compiled = await transform(source, { format: "iife", loader: "js", target: "es2020", legalComments: "none" });
const axeSource = readFileSync(new URL("../node_modules/axe-core/axe.min.js", import.meta.url), "utf8");

const routes = siteRoutes();

const errors = [];
const vc = new VirtualConsole();
vc.on("jsdomError", (e) => {
  if (!/Could not parse CSS|not implemented|Could not load/i.test(String(e.message))) errors.push(String(e.message).slice(0, 160));
});

const dom = new JSDOM(`<!doctype html><html lang="en"><body><div id="root"></div></body></html>`, {
  runScripts: "outside-only",
  pretendToBeVisual: true,
  url: "http://localhost/#/",
  virtualConsole: vc,
  beforeParse(window) {
    window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} });
    window.scrollTo = () => {};
    window.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
    window.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} };
    window.MutationObserver = window.MutationObserver ?? class { observe() {} disconnect() {} };
    if (!window.CSS) window.CSS = {};
    window.CSS.escape = (s) => s;
    window.HTMLElement.prototype.scrollIntoView = () => {};
    window.HTMLCanvasElement.prototype.getContext = () => null;
    window.requestAnimationFrame = (cb) => setTimeout(cb, 0);
    window.cancelAnimationFrame = (id) => clearTimeout(id);
  },
});

const { window } = dom;
window.eval(compiled.code);
window.eval(axeSource);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
await sleep(500);

const allFindings = [];
let gated = 0;
for (const r of routes) {
  window.location.hash = "/" + r;
  window.dispatchEvent(new window.Event("hashchange"));
  await sleep(140);

  let result;
  try {
    result = await window.axe.run(window.document, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
      rules: {
        "color-contrast": { enabled: false }, // jsdom has no painted layout — see header
        "page-has-heading-one": { enabled: false }, // checked by smoke.mjs instead
      },
    });
  } catch (e) {
    errors.push(`axe failed on /${r}: ${e.message}`);
    continue;
  }

  const v = result.violations.filter((x) => x.nodes.length > 0);
  if (v.length) {
    const worst = v.some((x) => GATE.includes(x.impact));
    if (worst) gated++;
    console.log(`${worst ? "✗" : "△"} /${r || "(home)"}`);
    for (const x of v.slice(0, 6)) {
      const tag = GATE.includes(x.impact) ? "FAIL" : "warn";
      console.log(`    [${tag}/${x.impact}] ${x.id}: ${x.help} (${x.nodes.length} node${x.nodes.length > 1 ? "s" : ""})`);
      if (x.nodes[0]?.target?.[0]) console.log(`             e.g. ${String(x.nodes[0].target[0]).slice(0, 110)}`);
      allFindings.push({ route: r, id: x.id, impact: x.impact, nodes: x.nodes.length });
    }
    if (v.length > 6) console.log(`    … and ${v.length - 6} more rule(s)`);
  }
}

const byRule = {};
for (const f of allFindings) byRule[f.id] = (byRule[f.id] ?? 0) + f.nodes;
const top = Object.entries(byRule).sort((a, b) => b[1] - a[1]);
if (top.length) {
  console.log("\nMost frequent rules:");
  for (const [id, n] of top.slice(0, 10)) console.log(`  ${String(n).padStart(4)} nodes  ${id}`);
}
console.log(`\n${routes.length} routes · ${gated} with gating (${GATE.join("/")}) violations · ${allFindings.length} total findings · ${errors.length} runtime errors`);
if (errors.length) for (const e of [...new Set(errors)].slice(0, 8)) console.log("  " + e);
process.exit(gated || errors.length ? 1 : 0);
