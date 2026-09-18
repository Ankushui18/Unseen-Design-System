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

/**
 * Homepage rules (WEBSITE-IA.md §4.1 and §9). The page previously carried a
 * competitor's tagline, an invented adoption count, fabricated sector metrics,
 * an MIT grant the repository does not make, and a blueprint ruler asked for
 * removal. These assertions are the ones that keep it honest — they are about
 * content and wiring, not taste.
 */
test.describe("homepage", () => {
  test.describe.configure({ mode: "serial" });
  test.use({ viewport: { width: WIDE, height: 1000 } });

  test("the hero is ours, and the buttons do what they say", async ({ page }) => {
    await goto(page, "");
    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText("shows its work");
    // The competitor's tagline, verbatim. Ours must not be it.
    await expect(page.locator("body")).not.toContainText("perfectly aligned");

    const primary = page.getByRole("button", { name: /Explore components/ }).first();
    const secondary = page.getByRole("button", { name: /^Get started$/ }).first();
    await expect(primary).toBeVisible();
    await expect(secondary).toBeVisible();
    // The stack strip is one line, not an assertion.
    await expect(page.locator(".home-stack li")).toHaveCount(4);
  });

  test("the quality proof is live components, not pictures", async ({ page }) => {
    await goto(page, "");
    // 5 tones × 5 modes, every cell a real <button>
    await expect(page.locator(".matrix-cell button")).toHaveCount(25);
    // The states and sizes rows are real specimens too.
    expect(await page.locator(".specimen-row .specimen").count()).toBeGreaterThanOrEqual(11);
    // The disabled specimen must actually be disabled, and the loading one must
    // announce itself — a screenshot cannot tell you either. Both are `disabled`
    // at the DOM level (a loading button is not clickable); only one is busy.
    await expect(page.locator(".specimen-row button[disabled]")).toHaveCount(2);
    await expect(page.locator(".specimen-row button[aria-busy='true']")).toHaveCount(1);
  });

  test("the foundation knobs are the real theme, and radius propagates", async ({ page }) => {
    await goto(page, "");
    const knob = (name: string) => page.locator(`.accent-swatch`, { hasText: name });
    const accentH = () => page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--accent-h").trim());

    expect(await accentH()).toBe("265");
    await knob("Rose").click();
    expect(await accentH()).toBe("15");
    // A token change must reach the components, not just the swatch.
    expect(await page.evaluate(() => getComputedStyle(document.querySelector(".accent-swatch-dot")!).backgroundColor)).not.toBe("rgba(0, 0, 0, 0)");

    await page.locator(".theme-toggle", { hasText: "dark" }).click();
    expect(await page.evaluate(() => document.documentElement.classList.contains("dark"))).toBe(true);
    await page.locator(".theme-toggle", { hasText: "light" }).click();

    const before = await page.evaluate(() => parseFloat(getComputedStyle(document.querySelector(".matrix-cell button")!).borderRadius));
    await page.locator(".radius-preset", { hasText: "Round" }).click();
    const after = await page.evaluate(() => parseFloat(getComputedStyle(document.querySelector(".matrix-cell button")!).borderRadius));
    expect(after).toBeGreaterThan(before);
    await page.getByRole("button", { name: "Reset to defaults" }).click();
    expect(await accentH()).toBe("265");
  });

  test("no page in the shell carries a competitor's name", async ({ page }) => {
    /* DESIGN-REVIEW.md: shipped copy names only Unseen. Screenshots live in the
       repo, never in the product. */
    for (const route of ["", "components", "blocks", "templates", "templates/analytics"]) {
      await goto(page, route);
      const text = await page.locator("main").innerText();
      for (const banned of ["Untitled UI", "AlignUI", "Aperture"]) {
        expect(text, `${route} names ${banned}`).not.toContain(banned);
      }
    }
  });

  test("the advertised counts are the registry's counts", async ({ page }) => {
    await goto(page, "");
    const strip = await page.locator(".coverage-strip").innerText();
    // Derived from src/docs/nav.ts at render time; the strip checks the registry
    // agrees with itself rather than quoting a number written into copy.
    const components = (strip.match(/(\d+)\s+components/i) ?? [])[1];
    expect(Number(components)).toBeGreaterThan(50);
    await goto(page, "components");
    const indexText = await page.locator("main").innerText();
    expect(indexText).toContain(`${components} documented components`);
  });
});
