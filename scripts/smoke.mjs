/**
 * Aperture smoke harness — renders every route from the production single-file
 * bundle in jsdom and reports crashes + layout/accessibility hazards.
 *
 * Why this is not a trivial script: the app ships as one inlined
 * `<script type="module">` (vite-plugin-singlefile). jsdom ignores module
 * scripts, and the bundle contains real `import`/`export` statements (plus a
 * babel-runtime `import.meta.url` helper string), so the old "hoist the
 * module into a classic <script>" trick threw `SyntaxError: Unexpected token
 * '<'` and every route reported EMPTY.
 *
 * The fix: hand the untouched module code to esbuild and compile it to an
 * IIFE, then evaluate it inside the jsdom window. Verified: every route
 * renders with a populated <h1> and no runtime errors.
 *
 * Run: node scripts/smoke.mjs   (requires `dist/` — `npm run build` first)
 */
import { readFileSync } from "node:fs";
import { transform } from "esbuild";
import { JSDOM, VirtualConsole } from "jsdom";
import { siteRoutes } from "./routes.mjs";

const html = readFileSync(new URL("../dist/index.html", import.meta.url), "utf8");
const match = html.match(/<script type="module"[^>]*>([\s\S]*?)<\/script>/);
if (!match) {
  console.error("✗ No inline module script found in dist/index.html. Run `npm run build` first.");
  process.exit(1);
}

// `import.meta.url` only appears inside a babel-runtime helper *string* (the
// generated `require()` shim). Neutralizing it is safe because that shim is
// never executed: the bundle is fully self-contained.
const source = match[1].replace(/import\.meta\.url/g, JSON.stringify("http://localhost/"));
const compiled = await transform(source, {
  format: "iife",
  loader: "js",
  target: "es2020",
  legalComments: "none",
});

const routes = siteRoutes();

const errors = [];
const vc = new VirtualConsole();
vc.on("jsdomError", (e) => {
  if (!/Could not parse CSS|not implemented/i.test(String(e.message))) errors.push(String(e.message).slice(0, 160));
});
vc.on("error", (m) => errors.push(String(m).slice(0, 160)));

const dom = new JSDOM(`<!doctype html><html><body><div id="root"></div></body></html>`, {
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

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
await sleep(500);

const results = [];
for (const r of routes) {
  const before = errors.length;
  window.location.hash = "/" + r;
  window.dispatchEvent(new window.Event("hashchange"));
  await sleep(120);
  const doc = window.document;
  const main = doc.querySelector("main") ?? doc.getElementById("root") ?? doc.body;
  const text = main.textContent ?? "";
  const h1 = doc.querySelector("h1")?.textContent?.trim() ?? "";
  const notFound = /Page not found/.test(text);
  const empty = text.trim().length < 80;
  const unlabeled = [...doc.querySelectorAll("button")].filter((b) => !b.textContent.trim() && !b.getAttribute("aria-label") && !b.getAttribute("title")).length;
  const imgs = [...doc.querySelectorAll("img")].filter((i) => !i.getAttribute("alt")).length;
  const rawInputs = [...doc.querySelectorAll("input:not([type=checkbox]):not([type=radio]):not([type=range])")].filter((i) => !i.id && !i.getAttribute("aria-label") && !i.getAttribute("placeholder") && !i.closest("label")).length;
  results.push({ route: r || "(home)", h1, crashed: errors.length > before, notFound, empty, unlabeled, imgs, rawInputs });
}

let bad = 0;
for (const x of results) {
  const flags = [x.crashed && "CRASH", x.notFound && "404", x.empty && "EMPTY", x.unlabeled && `${x.unlabeled} unlabeled btn`, x.imgs && `${x.imgs} img no alt`, x.rawInputs && `${x.rawInputs} input no label`].filter(Boolean);
  if (flags.length) bad++;
  console.log(`${flags.length ? "✗" : "✓"} ${x.route.padEnd(36)} ${x.h1.slice(0, 40).padEnd(40)} ${flags.join(" · ")}`);
}
if (errors.length) {
  console.log("\nRuntime errors:");
  for (const e of [...new Set(errors)].slice(0, 10)) console.log("  " + e);
}
console.log(`\n${results.length} routes · ${bad} with findings · ${errors.length} runtime errors`);
process.exit(bad || errors.length ? 1 : 0);
