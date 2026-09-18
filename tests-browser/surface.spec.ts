import { expect, test } from "@playwright/test";
import { goto } from "./helpers";

/**
 * Surface rules for the documentation shell (DESIGN-REVIEW.md — the surface pass).
 *
 * These are the things a screenshot review catches and a source scan cannot:
 * a right rail that exists but can never be filled, a preview canvas that is the
 * same colour as the page it sits on, and a landmark a page renders twice.
 */

const WIDE = 1440;

test.describe("documentation shell", () => {
  test.use({ viewport: { width: WIDE, height: 1000 } });

  test("the rail appears only when a page has sections to list", async ({ page }) => {
    // Nine documented sections — the rail earns its column here.
    await goto(page, "components/button");
    await expect(page.locator(".docs-toc")).toHaveCount(1);
    expect(await page.locator(".toc-sticky nav button").count()).toBeGreaterThanOrEqual(3);
    await expect(page.locator(".docs-layout")).toHaveAttribute("data-rail", "full");

    // A one-section component page and the library index have nothing to list.
    for (const route of ["components/timeline", "components"]) {
      await goto(page, route);
      await expect(page.locator(".docs-toc")).toHaveCount(0);
      await expect(page.locator(".docs-layout")).toHaveAttribute("data-rail", "none");
      // The width the rail would have taken goes to the content.
      const main = await page.locator("main").boundingBox();
      expect(main!.width).toBeGreaterThan(1000);
    }
  });

  test("the shell drops to two columns below the rail breakpoint", async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 1000 });
    await goto(page, "components/button");
    const narrow = await page.evaluate(() => ({
      columns: getComputedStyle(document.querySelector(".docs-layout")!).gridTemplateColumns,
      toc: getComputedStyle(document.querySelector(".docs-toc")!).display,
    }));
    expect(narrow.columns.split(" ").length).toBe(2);
    expect(narrow.toc).toBe("none");
  });

  test("the library index is one landmark and one footer", async ({ page }) => {
    await goto(page, "components");
    expect(await page.locator("main").count()).toBe(1);
    expect(await page.locator("footer").count()).toBe(1);
    // Filters and search share a single band above the grid.
    await expect(page.locator(".index-toolbar .index-filters")).toHaveCount(1);
    await expect(page.locator(".index-toolbar .index-search")).toHaveCount(1);
  });

  test("a preview canvas is a recessed surface, not page background", async ({ page }) => {
    await goto(page, "components/button");

    const canvas = await page.evaluate(() => {
      const el = document.querySelector(".showcase-preview") as HTMLElement;
      const cs = getComputedStyle(el);
      const page_ = getComputedStyle(document.documentElement).getPropertyValue("--background-secondary").trim();
      return { bg: cs.backgroundColor, dots: cs.backgroundImage, shadow: cs.boxShadow, token: page_, className: el.className };
    });

    expect(canvas.bg).not.toBe("rgba(0, 0, 0, 0)");
    expect(canvas.bg).not.toBe("rgb(255, 255, 255)"); // never the page itself
    expect(canvas.dots).toContain("radial-gradient");
    expect(canvas.shadow).not.toBe("none"); // the recessed top edge
  });

  test("the canvas step survives dark mode", async ({ page }) => {
    await goto(page, "components/button", "dark");
    const step = await page.evaluate(() => {
      const el = document.querySelector(".showcase-preview") as HTMLElement;
      return {
        canvas: getComputedStyle(el).backgroundColor,
        page: getComputedStyle(document.documentElement).backgroundColor,
        body: getComputedStyle(document.body).backgroundColor,
      };
    });
    expect(step.canvas).not.toBe(step.body);
    expect(step.canvas).not.toBe(step.page);
  });
});
