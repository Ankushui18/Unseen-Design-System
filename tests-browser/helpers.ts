import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import type { Page } from "@playwright/test";

const require = createRequire(import.meta.url);

/** All doc routes, sourced from the nav the same way smoke.mjs does. */
export const ROUTES: string[] = (() => {
  const nav = readFileSync(new URL("../src/docs/nav.ts", import.meta.url), "utf8");
  const routes = [...nav.matchAll(/href:\s*"([^"]+)"/g)].map((m) => m[1]);
  routes.unshift("");
  return routes;
})();

/** Routes that matter most for layout/reflow checks. */
export const KEY_ROUTES = [
  "",
  "components",
  "components/button",
  "components/data-table",
  "components/filters",
  "components/modal",
  "components/command-menu",
  "foundations/color",
  "foundations/tokens",
  "patterns",
  "blocks",
  "templates/analytics",
  "templates/settings",
];

const AXE_PATH = require.resolve("axe-core/axe.min.js");
export const axeScript = AXE_PATH;

const THEME_KEY = "aperture-theme-v2";
const THEME_DEFAULTS = { accentH: 265, accentC: 0.225, radiusScale: 1, disabledOpacity: 0.5 };

export type Mode = "light" | "dark";

/** Navigate to a hash route in the requested theme, with the app settled. */
export async function goto(page: Page, route: string, mode: Mode = "light") {
  await page.addInitScript(
    ({ key, state }) => window.localStorage.setItem(key, JSON.stringify(state)),
    { key: THEME_KEY, state: { ...THEME_DEFAULTS, mode } },
  );
  // Never hang on unreachable external requests (fonts etc.)
  await page.route(/^(https?:)?\/\/(?!localhost|127\.0\.0\.1)/, (r) => r.abort());
  await page.goto(`/#/${route}`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("main, [id='root'] > *", { state: "attached" });
  await page.waitForTimeout(120);
  const dark = await page.evaluate(() => document.documentElement.classList.contains("dark"));
  if (dark !== (mode === "dark")) throw new Error(`theme not applied: expected ${mode}, got ${dark ? "dark" : "light"}`);
}

export type AxeFinding = { id: string; impact: string | null; help: string; nodes: number; example?: string };

/** Run axe (wcag2 A/AA + best practice) INSIDE the page and return violations. */
export async function runAxe(page: Page): Promise<AxeFinding[]> {
  await page.addScriptTag({ path: AXE_PATH });
  return page.evaluate(async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const axe = (window as any).axe;
    const result = await axe.run(document, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
      rules: { "page-has-heading-one": { enabled: false } },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return result.violations.map((v: any) => ({
      id: v.id,
      impact: v.impact,
      help: v.help,
      nodes: v.nodes.length,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      example: v.nodes[0]?.target?.[0] ? String(v.nodes[0].target[0]).slice(0, 120) : undefined,
    }));
  });
}
