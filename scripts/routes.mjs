/**
 * Every route the site ships, in one place.
 *
 * `nav.ts` covers the documented routes. Block pages are derived from the block
 * registry instead: `/blocks/{key}` exists for each block (WEBSITE-IA.md §4.3)
 * but is deliberately not a sidebar entry — 31 rows would bury the navigation.
 * Both smoke.mjs and a11y-audit.mjs read this file, so a route can never be
 * covered by one gate and invisible to the other.
 *
 * Run: node scripts/routes.mjs   (prints the list)
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

export function siteRoutes() {
  const nav = readFileSync(join(process.cwd(), "src/docs/nav.ts"), "utf8");
  const routes = [...nav.matchAll(/href:\s*"([^"]+)"/g)].map((m) => m[1]);
  routes.unshift("");

  const registry = readFileSync(join(process.cwd(), "src/blocks/index.tsx"), "utf8");
  const start = registry.indexOf("export const BLOCKS");
  const body = registry.slice(start, registry.indexOf("\n];", start));
  for (const m of body.matchAll(/key:\s*"([a-z0-9-]+)"/g)) routes.push(`blocks/${m[1]}`);

  return routes;
}

if (process.argv[1] && process.argv[1].endsWith("routes.mjs")) {
  const routes = siteRoutes();
  console.log(`${routes.length} routes`);
  console.log(routes.filter((r) => r.startsWith("blocks/")).join("\n"));
}
