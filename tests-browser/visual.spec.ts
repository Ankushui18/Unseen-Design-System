import { expect, test } from "@playwright/test";
import { goto, type Mode } from "./helpers";

/**
 * Visual regression — viewport screenshots of the core surfaces in both
 * themes, compared against committed baselines. Baselines are the contract:
 * a diff means a deliberate visual change (update the baseline) or a
 * regression (fix the code).
 *
 * Update baselines deliberately with:  npx playwright test visual --update-snapshots
 */
test.describe.configure({ mode: "parallel" });

const SURFACES = [
  "",
  "components",
  "components/button",
  "components/fancy-button",
  "components/input",
  "components/select",
  "components/checkbox",
  "components/switch",
  "components/slider",
  "components/badge",
  "components/avatar",
  "components/card",
  "components/table",
  "components/data-table",
  "components/alert",
  "components/toast",
  "components/modal",
  "components/drawer",
  "components/dropdown",
  "components/tooltip",
  "components/tabs",
  "components/accordion",
  "components/pagination",
  "components/stepper",
  "components/datepicker",
  "components/command-menu",
  "foundations/color",
  "foundations/typography",
  "foundations/icons",
] as const;

const MODES: Mode[] = ["light", "dark"];

for (const mode of MODES) {
  for (const route of SURFACES) {
    test(`visual ${mode} /${route || "(home)"}`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await goto(page, route, mode);
      // settle web-font swap & animations (reducedMotion + blocked remote fonts keep this short)
      await page.waitForTimeout(150);
      const name = `${(route || "home").replaceAll("/", "-")}-${mode}.png`;
      await expect(page).toHaveScreenshot(name, {
        animations: "disabled",
        maxDiffPixelRatio: 0.01,
      });
    });
  }
}
