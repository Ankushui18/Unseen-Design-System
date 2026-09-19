import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * The motion scale is a contract, not a habit.
 *
 * Foundations → Motion documents five durations, three easings and a set of
 * named animations; components are graded on using them (M4.motion). Nothing
 * checked the other direction — that the scale the docs promise actually
 * exists, that the default transition is wired to it, and that every named
 * animation has keyframes to run. That gap is how the system drifted onto
 * Tailwind's stock values in the first place.
 */
/* vitest runs from the project root (jsdom has no file:// URL for import.meta.url) */
const css = readFileSync(join(process.cwd(), "src/index.css"), "utf8");

const duration = (name: string) => {
  const m = css.match(new RegExp(`--duration-${name}:\\s*([\\d.]+)s`));
  return m ? Number(m[1]) : null;
};

describe("motion scale", () => {
  it("defines the five documented durations, in order", () => {
    const scale = ["instant", "fast", "base", "slow", "slower"].map(duration);
    expect(scale).toEqual([...scale].sort((a, b) => (a ?? 0) - (b ?? 0)));
    expect(scale.every((v) => typeof v === "number" && v > 0), `durations: ${JSON.stringify(scale)}`).toBe(true);
    expect(duration("instant")).toBe(0.075);
    expect(duration("fast")).toBe(0.15);
    expect(duration("base")).toBe(0.22);
    expect(duration("slow")).toBe(0.3);
    expect(duration("slower")).toBe(0.4);
  });

  it("caps transition duration at 400ms — the documented ceiling", () => {
    /* loop animations (spinner, shimmer, marquee) are exempt: they are ambient,
       not transitions. This is the rule the docs state as "nothing exceeds
       400ms". */
    expect(duration("slower")).toBeLessThanOrEqual(0.4);
  });

  it("defines the three easings, and none of them is linear-by-accident", () => {
    for (const name of ["out-quint", "spring", "in-out"]) {
      expect(css, `--ease-${name}`).toContain(`--ease-${name}:`);
    }
    expect(css).toMatch(/--ease-out-quint:\s*cubic-bezier\(0\.22, 1, 0\.36, 1\)/);
  });

  it("wires bare transition-* utilities to the scale, not to Tailwind's defaults", () => {
    expect(css).toMatch(/--default-transition-duration:\s*var\(--duration-fast\)/);
    expect(css).toMatch(/--default-transition-timing-function:\s*var\(--ease-out-quint\)/);
  });

  it("gives every named animation keyframes to run", () => {
    const builtIn = new Set(["spin", "pulse", "ping", "bounce"]); // Tailwind ships these
    const tokens = [...css.matchAll(/--animate-([a-z-]+):\s*([a-z-]+)\s/g)].map((m) => ({ token: m[1], keyframes: m[2] }));
    expect(tokens.length).toBeGreaterThanOrEqual(10);
    for (const { token, keyframes } of tokens) {
      if (builtIn.has(keyframes)) continue;
      expect(css, `--animate-${token} names @keyframes ${keyframes}, which does not exist`).toContain(`@keyframes ${keyframes}`);
    }
  });

  it("keeps the global reduced-motion guarantee", () => {
    /* per-component motion-reduce: classes are optional; this block is not —
       it is what makes reduced motion a system property (design-lint blocks on
       its removal) */
    expect(css).toMatch(/@media\s*\(prefers-reduced-motion:\s*reduce\)/);
    expect(css).toMatch(/transition-duration:\s*0\.01ms\s*!important/);
    expect(css).toMatch(/animation-duration:\s*0\.01ms\s*!important/);
  });
});
