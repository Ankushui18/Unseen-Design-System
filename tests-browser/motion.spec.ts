import { expect, test } from "@playwright/test";
import { goto } from "./helpers";

/**
 * Motion is a system property (COMPONENT-QUALITY-SPEC.md §6).
 *
 * Three claims only a real browser can settle:
 *
 *  1. Every transition in the product runs on Unseen's scale. Class names prove
 *     nothing — the utilities a component declares can be overridden by a
 *     component CSS rule, and a hand-written `0.18s` in the stylesheet is
 *     invisible to a source scan of TSX. This sweeps computed style across
 *     representative pages instead of trusting one element.
 *  2. A bare `transition-*` utility inherits the scale rather than Tailwind's
 *     stock 150ms / ease-in-out pairing.
 *  3. `prefers-reduced-motion: reduce` neutralises motion app-wide without
 *     hiding content.
 *
 * The config pins `reducedMotion: "reduce"` for deterministic rendering, so the
 * scale measurements opt back into `no-preference` explicitly.
 */
const UNSEEN_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const TAILWIND_DEFAULT_EASE = "cubic-bezier(0.4, 0, 0.2, 1)";

/** The documented transition scale — nothing else may appear on a transition. */
const SCALE = new Set(["0.075s", "0.15s", "0.22s", "0.3s", "0.4s"]);
/** Ambient/loop animations are exempt from the 400ms ceiling but must still be
 *  tokens: fade-in, pop-in, slide-up/down/in-*, indeterminate, shimmer,
 *  marquee, spin-slow, pulse-soft, ping-soft. */
const AMBIENT = new Set(["0.18s", "0.2s", "0.22s", "0.3s", "0.4s", "1.1s", "1.4s", "1.6s", "2.2s", "2.4s", "38s"]);

const PAGES = ["components/button", "components/table", "foundations/motion"] as const;

async function sweep(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const transitions = new Map<string, string>();
    const animations = new Set<string>();
    for (const el of document.querySelectorAll("main *")) {
      const cs = getComputedStyle(el);
      for (const d of cs.transitionDuration.split(",").map((s) => s.trim())) {
        if (d !== "0s" && !transitions.has(d)) transitions.set(d, (el.getAttribute("class") ?? "").slice(0, 70));
      }
      for (const d of cs.animationDuration.split(",").map((s) => s.trim())) {
        if (d !== "0s") animations.add(d);
      }
    }
    return { transitions: [...transitions.entries()], animations: [...animations] };
  });
}

test("every transition in the product runs on the motion scale", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });

  for (const route of PAGES) {
    await goto(page, route, "light");
    const { transitions, animations } = await sweep(page);

    const offScale = transitions.filter(([d]) => !SCALE.has(d));
    expect(offScale, `${route} — off-scale transition durations (offender class shown): ${JSON.stringify(offScale)}`).toEqual([]);

    const strayAnimations = animations.filter((d) => !AMBIENT.has(d));
    expect(strayAnimations, `${route} — animation durations that are not tokens: ${JSON.stringify(strayAnimations)}`).toEqual([]);
  }
});

test("bare transition utilities inherit the scale, not Tailwind's defaults", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await goto(page, "components/button", "light");

  /* An element that transitions but declares no duration of its own. Variant
   * utilities (`placeholder:transition-colors`) are skipped — they style a
   * pseudo-element, not this node. */
  const inherited = await page.evaluate(() => {
    const el = [...document.querySelectorAll("main *")].find((n) => {
      const cls = n.getAttribute("class") ?? "";
      return /(?:^|\s)transition-(colors|all|transform|shadow|opacity)\b/.test(cls) && !cls.includes("duration-");
    }) as HTMLElement | undefined;
    if (!el) return null;
    const cs = getComputedStyle(el);
    return { cls: (el.getAttribute("class") ?? "").slice(0, 70), duration: cs.transitionDuration, timing: cs.transitionTimingFunction };
  });

  expect(inherited, "no bare transition utility on this page").not.toBeNull();
  /* --default-transition-duration is --duration-fast (150ms); the curve is what
   * proves the override took effect, since Tailwind's stock pairing is also
   * 150ms but eases with cubic-bezier(0.4, 0, 0.2, 1). */
  expect(inherited!.duration).toBe("0.15s");
  expect(inherited!.timing).toBe(UNSEEN_EASE);
  expect(inherited!.timing).not.toBe(TAILWIND_DEFAULT_EASE);
});

test("prefers-reduced-motion collapses motion without removing content", async ({ page }) => {
  /* no emulateMedia here: the config runs every browser test under `reduce` */
  await goto(page, "components/button", "light");

  const measured = await page.evaluate(() => {
    const el = [...document.querySelectorAll("main *")].find((n) => (n.getAttribute("class") ?? "").includes("transition")) as
      | HTMLElement
      | undefined;
    const animated = document.querySelector("main [class*='animate-']") as HTMLElement | null;
    return {
      transitionDuration: el ? getComputedStyle(el).transitionDuration : null,
      animationDuration: animated ? getComputedStyle(animated).animationDuration : null,
      visible: el ? el.getBoundingClientRect().height > 0 : false,
    };
  });

  /* the global rule sets 0.01ms — instant, not merely shorter */
  const instant = (v: string | null) => v === null || v.split(",").every((part) => parseFloat(part) <= 0.00001);
  expect(instant(measured.transitionDuration), `transition-duration: ${measured.transitionDuration}`).toBe(true);
  expect(instant(measured.animationDuration), `animation-duration: ${measured.animationDuration}`).toBe(true);
  expect(measured.visible).toBe(true);
});
