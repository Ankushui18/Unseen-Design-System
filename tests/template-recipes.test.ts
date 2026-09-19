import { describe, expect, it } from "vitest";
import { ACCENT_PRESETS, RADIUS_PRESETS } from "../src/lib/theme";
import { TEMPLATE_CARDS, TEMPLATE_RECIPES } from "../src/pages/template-recipes";

/**
 * "Make it yours" recipes are the one place a template page makes a promise the
 * code has to keep: three ways this screen reads in your product, applied with
 * the site's real theme state.
 *
 * The failure modes are quiet — a recipe naming a preset that was renamed, a
 * value that exists in no ramp, a sixth template with no recipes — so they are
 * checked here rather than discovered by clicking.
 */
describe("template recipes", () => {
  const accentNames = ACCENT_PRESETS.map((p) => p.name);
  const radiusNames = RADIUS_PRESETS.map((p) => p.name);

  it("covers every template, and only templates that exist", () => {
    const templateKeys = TEMPLATE_CARDS.map((t) => t.key).sort();
    expect(Object.keys(TEMPLATE_RECIPES).sort()).toEqual(templateKeys);
  });

  it("offers a real choice on every page", () => {
    for (const [key, recipes] of Object.entries(TEMPLATE_RECIPES)) {
      expect(recipes.length, `${key} needs three recipes`).toBe(3);
      const ids = recipes.map((r) => r.id);
      expect(new Set(ids).size, `${key} has duplicate recipe ids`).toBe(ids.length);
      // Three recipes that all resolve to the same theme would be decoration.
      const applied = recipes.map((r) => `${r.accent}/${r.radius}/${r.mode}`);
      expect(new Set(applied).size, `${key} recipes are not distinct`).toBe(recipes.length);
    }
  });

  it("only names presets the system actually has", () => {
    for (const [key, recipes] of Object.entries(TEMPLATE_RECIPES)) {
      for (const r of recipes) {
        expect(accentNames, `${key}/${r.id} names accent "${r.accent}"`).toContain(r.accent);
        expect(radiusNames, `${key}/${r.id} names radius "${r.radius}"`).toContain(r.radius);
        expect(["light", "dark"]).toContain(r.mode);
      }
    }
  });

  it("says something useful about each recipe", () => {
    for (const [key, recipes] of Object.entries(TEMPLATE_RECIPES)) {
      for (const r of recipes) {
        expect(r.name.trim().length, `${key}/${r.id} has no name`).toBeGreaterThan(2);
        // A blurb that only restates the tokens is noise — require a sentence.
        expect(r.blurb.trim().length, `${key}/${r.id} blurb is too short`).toBeGreaterThan(60);
        expect(r.blurb, `${key}/${r.id} blurb should end in a period`).toMatch(/\.$/);
      }
    }
  });

  it("registers every template as a block, so 'Built with' has a source", async () => {
    const { BLOCKS } = await import("../src/blocks");
    const blockKeys = new Set(BLOCKS.map((b) => b.key));
    for (const t of TEMPLATE_CARDS) {
      expect([...blockKeys].some((k) => k === `template-${t.key}`), `${t.key} is not a registered block`).toBe(true);
    }
  });
});
