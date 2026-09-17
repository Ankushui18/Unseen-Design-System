import { expect, test } from "@playwright/test";
import { goto, KEY_ROUTES } from "./helpers";

/**
 * Responsive reflow gate — WCAG 1.4.10: no two-dimensional scrolling for
 * reading content at every supported width, plus a 200% zoom pass that
 * approximates the WCAG 1.4.4 resize-text requirement.
 */
test.describe.configure({ mode: "parallel" });

const VIEWPORTS = [
  { name: "mobile-s", width: 320, height: 740 },
  { name: "mobile-m", width: 375, height: 740 },
  { name: "tablet", width: 768, height: 900 },
  { name: "laptop", width: 1024, height: 768 },
  { name: "desktop", width: 1440, height: 900 },
];

for (const vp of VIEWPORTS) {
  for (const route of KEY_ROUTES) {
    test(`reflow ${vp.name} (${vp.width}px) /${route || "(home)"}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await goto(page, route);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `/${route} overflows horizontally by ${overflow}px at ${vp.width}px`).toBeLessThanOrEqual(1);
    });
  }
}

/*
 * WCAG 1.4.4 resize-text (200% zoom). Browser zoom is NOT the same as CSS
 * `zoom` (which inflates layout into the same viewport and false-fails).
 * 200% browser zoom at 1280px physical ≡ a 640px-layout viewport; 400% ≡ 320px
 * (already covered by the mobile-s viewport above). This pins the equivalence.
 */
for (const route of KEY_ROUTES) {
  test(`zoom-equivalent 640px (≈200% at 1280) /${route || "(home)"}`, async ({ page }) => {
    await page.setViewportSize({ width: 640, height: 700 });
    await goto(page, route);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `/${route} overflows horizontally by ${overflow}px at the 200%-zoom-equivalent 640px viewport`).toBeLessThanOrEqual(1);
  });
}
