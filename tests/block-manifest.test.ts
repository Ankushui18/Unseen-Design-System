import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { BLOCKS } from "../src/blocks";
import { BLOCK_A11Y } from "../src/blocks/a11y";
import { getBlockComponents, getBlockSource } from "../src/docs/block-source";

/**
 * Block pages are generated from the registry (`/blocks/{key}`, WEBSITE-IA.md
 * §4.3), so the things that can rot are the *derivations*: a block added
 * without accessibility notes, an alias pointing at a page that was renamed,
 * a component list that links nowhere.
 *
 * This is the ratchet for all three. It reads the same nav file the router
 * uses, so "the route exists" means the same thing here as it does in the app.
 */
const ROOT = process.cwd();
const nav = readFileSync(join(ROOT, "src/docs/nav.ts"), "utf8");
const registry = readFileSync(join(ROOT, "src/pages/registry.tsx"), "utf8");

/** Every href the nav exposes, plus the static routes the registry declares. */
const navHrefs = new Set([...nav.matchAll(/href:\s*"([^"]+)"/g)].map((m) => m[1]));
const registryKeys = new Set([...registry.matchAll(/^\s+"?([a-z0-9/-]+)"?:\s*\(/gm)].map((m) => m[1]));

const routeExists = (href: string) => navHrefs.has(href) || registryKeys.has(href);

describe("block pages", () => {
  it("covers every registered block, and only those", () => {
    expect(BLOCKS.length).toBeGreaterThan(20);
    const keys = BLOCKS.map((b) => b.key);
    expect(new Set(keys).size, "block keys must be unique (they are routes)").toBe(keys.length);
    for (const key of keys) expect(key, `"${key}" is not URL-safe`).toMatch(/^[a-z0-9-]+$/);
  });

  it("has an accessibility note for every block — and no orphaned notes", () => {
    const keys = BLOCKS.map((b) => b.key).sort();
    const documented = Object.keys(BLOCK_A11Y).sort();
    expect(documented).toEqual(keys);
    for (const [key, notes] of Object.entries(BLOCK_A11Y)) {
      expect(notes.length, `${key} needs at least one note`).toBeGreaterThanOrEqual(2);
      for (const note of notes) {
        expect(note.trim().length, `${key} has an empty note`).toBeGreaterThan(20);
      }
    }
  });

  it("derives each block's components from its own source", () => {
    for (const block of BLOCKS) {
      const uses = getBlockComponents(block.key);
      // Deterministic and de-duplicated: the page renders the array directly.
      const names = uses.map((u) => u.name);
      expect(new Set(names).size).toBe(names.length);
      expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
      expect(uses.some((u) => !u.name.trim())).toBe(false);

      /* A block may legitimately render no components — `logos` and `metrics`
         are plain markup. What must never happen is importing from src/ui and
         rendering none of it, which means the manifest silently lost a name. */
      const source = getBlockSource(block.key);
      if (source.includes('from "../ui/')) {
        expect(uses.length, `${block.key} imports src/ui but resolved no components`).toBeGreaterThan(0);
      }
    }
  });

  it("never opens a second page-level heading", () => {
    /* One <h1> per document. A block that carries its own collides with the
       heading of the page rendering it, so blocks start at <h2>. */
    const offenders = BLOCKS.filter((b) => /<h1[\s>]/.test(getBlockSource(b.key))).map((b) => b.key);
    expect(offenders, "these blocks render an <h1>").toEqual([]);
  });

  it("links only to routes that exist", () => {
    const unresolved = new Map<string, string>();
    for (const block of BLOCKS) {
      for (const use of getBlockComponents(block.key)) {
        if (!use.href) continue;
        if (!routeExists(use.href)) unresolved.set(use.name, use.href);
      }
    }
    expect(
      [...unresolved].map(([name, href]) => `${name} → ${href}`),
      "a component is linked to a route the nav does not declare"
    ).toEqual([]);
  });

  it("counts what the page claims to count", () => {
    /* The page says "N of M are documented" — both numbers come from the same
       derivation, so this asserts they cannot drift apart. */
    for (const block of BLOCKS) {
      const uses = getBlockComponents(block.key);
      const documented = uses.filter((u) => u.href);
      expect(documented.length).toBeLessThanOrEqual(uses.length);
      if (uses.length) expect(documented.length).toBeGreaterThan(0);
    }
  });
});

describe("route coverage", () => {
  it("smoke and a11y share one route list that includes every block page", async () => {
    const { siteRoutes } = await import("../scripts/routes.mjs");
    const routes = siteRoutes();
    for (const block of BLOCKS) {
      expect(routes, `${block.key} missing from siteRoutes()`).toContain(`blocks/${block.key}`);
    }
    expect(new Set(routes).size, "siteRoutes() must not repeat a route").toBe(routes.length);
  });
});
