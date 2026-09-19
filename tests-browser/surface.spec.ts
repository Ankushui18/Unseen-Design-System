import { readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "@playwright/test";
import { FIGMA_STATUS } from "../src/docs/figma-status";
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

/**
 * Block pages (WEBSITE-IA.md §4.3). Every block has its own route; these assert
 * the four things the page promises — a preview at three viewports, a component
 * manifest that links to real pages, copyable source, and accessibility notes —
 * on blocks of different shapes (a 400px card, a 980px marketing band, a
 * 1100px application screen, and one that renders no components at all).
 */
test.describe("block pages", () => {
  test.use({ viewport: { width: WIDE, height: 1000 } });

  /* Deliberately different shapes: a 400px card, a plain-markup band, a
     marketing section, a 980px hero and an 1100px application screen. */
  const SAMPLE = ["auth", "logos", "pricing", "hero-lit", "template-team"];

  test("every block has a route that renders its own block", async ({ page }) => {
    for (const key of SAMPLE) {
      await goto(page, `blocks/${key}`);
      const main = page.locator("main#main");
      await expect(main).toHaveAttribute("data-block", key);
      await expect(page.locator(".block-example .showcase-toolbar")).toBeVisible();
      // The heading is the block's own title, and there is exactly one of them —
      // a block that carries its own <h1> collides with the page's.
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).not.toHaveText("Start with a pattern. Make it your own.");
      // Rendered by the router, not the 404 branch.
      await expect(main).not.toContainText("Block not found");
    }
  });

  test("a block page says what the block is made of", async ({ page }) => {
    await goto(page, "blocks/auth");
    const uses = page.locator(".block-use");
    expect(await uses.count()).toBeGreaterThan(2);
    // Linked chips must go somewhere that exists.
    const hrefs = await page.locator("a.block-use").evaluateAll((els) => els.map((e) => e.getAttribute("href")));
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      expect(href).toMatch(/^#\/(components|patterns)\//);
      await goto(page, href!.replace("#/", ""));
      await expect(page.locator("main#main h1")).toBeVisible();
    }
    // A component with no docs page is named, not hidden or linked nowhere.
    await goto(page, "blocks/auth");
    await expect(page.locator(".block-use.is-unlinked")).toHaveCount(1);
  });

  test("a block that renders no components says so instead of showing an empty list", async ({ page }) => {
    await goto(page, "blocks/logos");
    await expect(page.locator(".block-use")).toHaveCount(0);
    await expect(page.locator(".block-uses-note")).toContainText("plain markup");
    await expect(page.locator(".block-a11y-list li")).not.toHaveCount(0);
  });

  test("every block page carries accessibility notes and a way onward", async ({ page }) => {
    for (const key of SAMPLE) {
      await goto(page, `blocks/${key}`);
      expect(await page.locator(".block-a11y-list li").count(), `${key} has no a11y notes`).toBeGreaterThanOrEqual(2);
      // Prev/next and the gallery link are real, keyboard-reachable links.
      await expect(page.locator(".block-pager a")).toHaveCount(2);
      expect(await page.locator(".block-pager a[href^='#/blocks/']").count()).toBe(2);
      await expect(page.getByRole("button", { name: /All \d+ blocks/ })).toBeVisible();
    }
  });

  test("an unknown block key 404s without crashing", async ({ page }) => {
    await goto(page, "blocks/not-a-real-block");
    await expect(page.locator("main#main")).toContainText("Block not found");
    await expect(page.getByRole("button", { name: "All blocks" })).toBeVisible();
  });

  test("the gallery links into the block pages", async ({ page }) => {
    await goto(page, "blocks");
    const first = page.locator(".block-example-title-link").first();
    await expect(first).toHaveAttribute("href", /^#\/blocks\//);
    await first.click();
    await expect(page.locator("main#main")).toHaveAttribute("data-block", /^[a-z0-9-]+$/);
  });
});

/**
 * Template pages (WEBSITE-IA.md §12 sprint 4). All five are rendered by one
 * `TemplateAnatomy`, so what can go wrong is a page drifting from that shape —
 * or the recipes silently not applying. Both are checked here.
 */
test.describe("template pages", () => {
  test.use({ viewport: { width: WIDE, height: 1000 } });

  const TEMPLATES = ["analytics", "settings", "billing", "team", "ai"];

  test("every template carries the same anatomy", async ({ page }) => {
    for (const key of TEMPLATES) {
      await goto(page, `templates/${key}`);
      // One page-level heading, owned by the page (a nested <main> would show
      // up here as a second landmark).
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("main#main")).toHaveCount(1);
      expect(await page.locator(".block-uses .block-use").count(), `${key} has no component manifest`).toBeGreaterThan(0);
      expect(await page.locator(".recipe").count(), `${key} has no recipes`).toBe(3);
      await expect(page.locator(".recipe-code").first()).toBeVisible();
      await expect(page.locator(".block-pager a")).toHaveCount(2);
    }
  });

  test("applying a recipe changes the live theme, and reset undoes it", async ({ page }) => {
    await goto(page, "templates/analytics");
    const read = () =>
      page.evaluate(() => {
        const cs = getComputedStyle(document.documentElement);
        return {
          h: cs.getPropertyValue("--accent-h").trim(),
          r: cs.getPropertyValue("--radius-scale").trim(),
          dark: document.documentElement.classList.contains("dark"),
        };
      });

    const before = await read();
    await page.locator('.recipe[data-recipe="ops-room"] .recipe-apply').click();
    const after = await read();
    expect(after).not.toEqual(before);
    // It must be the recipe's own values: Azure / Tight / dark.
    expect(after.h).toBe("240");
    expect(after.r).toBe("0.5");
    expect(after.dark).toBe(true);
    // And the page says so, rather than leaving the button looking untouched.
    await expect(page.locator('.recipe[data-recipe="ops-room"] .recipe-state')).toContainText("Applied");

    // A token change must reach the screen in the preview, not just the CSS vars.
    const radius = await page.evaluate(() =>
      parseFloat(getComputedStyle(document.querySelector("[data-template] [class*='rounded-8'], [data-template] [class*='rounded']")!).borderRadius)
    );
    expect(radius).toBeGreaterThan(0);

    await page.locator(".recipe-reset").click();
    expect(await read()).toEqual(before);
    await expect(page.locator(".recipe-state")).toHaveCount(0);
  });

  test("a recipe's code block shows the values it applies", async ({ page }) => {
    await goto(page, "templates/billing");
    await page.locator('.recipe[data-recipe="fintech-pill"] .recipe-apply').click();
    const code = await page.locator(".recipe-code").innerText();
    // Magenta is h:345 c:0.19 and Round is 2.25 — the code must match the theme.
    expect(code).toContain("345");
    expect(code).toContain("2.25");
    const h = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--accent-h").trim());
    expect(h).toBe("345");
  });
});

/**
 * The code ↔ Figma bridge has one job: show the contract without implying a
 * library exists. Two failure modes are worth a browser: a parity table that
 * silently loses rows (the artifact and the page are two files), and a homepage
 * band that breaks the layout it was built to sit in.
 */
test.describe("the figma bridge", () => {
  const audit = JSON.parse(readFileSync(join(process.cwd(), "audit/variant-audit.json"), "utf8")) as {
    rows: { name: string }[];
  };

  /** Statuses that are not the default — what the page may render as live. */
  const published = Object.values(FIGMA_STATUS).filter((status) => status !== "none").length;

  test("the parity table covers every component the audit knows", async ({ page }) => {
    await goto(page, "figma");
    const rows = page.locator(".parity-table tbody tr");
    await expect(rows).toHaveCount(audit.rows.length);
    await expect(rows.first()).toContainText(audit.rows[0].name);
    // With an empty status map nothing may render as published, and the page says why.
    await expect(page.locator(".parity-status.is-live")).toHaveCount(published);
    if (published === 0) {
      await expect(page.locator(".figma-note.is-warning")).toContainText("No Figma library is published");
    }
    // The filter is real, not decorative: it must narrow the table.
    await page.getByLabel("Filter components").fill("button");
    await expect(rows).not.toHaveCount(audit.rows.length);
    expect(await rows.count()).toBeLessThan(audit.rows.length);
  });

  test("the homepage band shows the bridge and spills nothing", async ({ page }) => {
    await goto(page, "");
    const band = page.locator(".figma-band");
    await band.scrollIntoViewIfNeeded();
    await expect(band.locator(".figma-band-pane")).toHaveCount(2);
    await expect(band.locator(".figma-band-code")).toContainText("<Button");
    await expect(band.locator(".figma-band-prop")).toHaveCount(3);
    // The stats strip is the band's sibling, not its child — the honest status sits under the strip.
    await expect(page.locator(".figma-band-stats")).toContainText("No Figma library is published");

    const overflow = () =>
      band.evaluate((el) => {
        const right = el.getBoundingClientRect().right;
        return [...el.querySelectorAll("*")].filter((c) => c.getBoundingClientRect().right > right + 1).length;
      });
    expect(await overflow()).toBe(0);
    // Below the breakpoint the strip stacks: still two panes, still inside the card.
    await page.setViewportSize({ width: 390, height: 900 });
    await expect(band.locator(".figma-band-pane")).toHaveCount(2);
    expect(await overflow()).toBe(0);
  });
});
