/** Renders every route in jsdom via the production bundle and reports crashes + layout hazards. */
import { readFileSync } from "node:fs";
import { JSDOM, VirtualConsole } from "jsdom";

// jsdom does not execute <script type="module">; the singlefile bundle is self-contained so run it classically.
let html = readFileSync(new URL("../dist/index.html", import.meta.url), "utf8");
{
  // Inline <script type="module"> is deferred in browsers but ignored by jsdom; hoist it to the end of <body>.
  const scripts = [];
  html = html.replace(/<script type="module"[^>]*>([\s\S]*?)<\/script>/g, (_, body) => { scripts.push(body); return ""; });
  html = html.replace("</body>", scripts.map((b) => `<script>${b}</script>`).join("") + "</body>");
}
const routes = [...readFileSync(new URL("../src/docs/nav.ts", import.meta.url), "utf8").matchAll(/href:\s*"([^"]+)"/g)].map((m) => m[1]);
routes.unshift("");

const errors = [];
const vc = new VirtualConsole();
vc.on("jsdomError", (e) => { if (!/Could not parse CSS|not implemented/i.test(String(e.message))) errors.push(String(e.message).slice(0, 160)); });
vc.on("error", (m) => errors.push(String(m).slice(0, 160)));

const dom = new JSDOM(html, {
  runScripts: "dangerously",
  pretendToBeVisual: true,
  url: "http://localhost/#/",
  virtualConsole: vc,
  beforeParse(window) {
    window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} });
    window.scrollTo = () => {};
    window.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
    window.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} };
    if (!window.CSS) window.CSS = {};
    window.CSS.escape = (s) => s;
    window.HTMLElement.prototype.scrollIntoView = () => {};
    window.HTMLCanvasElement.prototype.getContext = () => null;
  },
});
const { window } = dom;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
await sleep(400);

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
if (errors.length) { console.log("\nRuntime errors:"); for (const e of [...new Set(errors)].slice(0, 10)) console.log("  " + e); }
console.log(`\n${results.length} routes · ${bad} with findings · ${errors.length} runtime errors`);
process.exit(bad || errors.length ? 1 : 0);
