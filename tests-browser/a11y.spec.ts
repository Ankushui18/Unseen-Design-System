import { expect, test } from "@playwright/test";
import { goto, ROUTES, runAxe, type Mode } from "./helpers";

/**
 * Browser accessibility gate — axe WCAG 2.1/2.2 A/AA on every docs route, in
 * BOTH themes, with rules that need painted layout enabled (color-contrast,
 * target size friends). This is the complement of scripts/a11y-audit.mjs,
 * which covers the statically-computable rules in jsdom.
 */
test.describe.configure({ mode: "parallel" });

const MODES: Mode[] = ["light", "dark"];

for (const mode of MODES) {
  for (const route of ROUTES) {
    test(`a11y ${mode} /${route || "(home)"}`, async ({ page }) => {
      await goto(page, route, mode);
      const violations = await runAxe(page);
      const summary = violations.map((v) => `[${v.impact}] ${v.id} ×${v.nodes} (${v.example ?? ""})`).join("\n  ");
      expect(violations, `\n/${route} [${mode}] violations:\n  ${summary}\n`).toEqual([]);
    });
  }
}
