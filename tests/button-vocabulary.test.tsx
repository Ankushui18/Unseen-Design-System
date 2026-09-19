import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button, resolveButtonVocabulary, sizeLabels, toneLabels, variantLabels } from "@/ui/Button";

/**
 * The vocabulary law (COMPONENT-QUALITY-SPEC.md §3.3), locked:
 *  - canonical props win, then the alias prop, then the shorthand inside `variant`;
 *  - the alias form renders *identical* classes to the canonical form;
 *  - intents and looks are disjoint, so shorthand is never ambiguous;
 *  - aliases add zero variant cells (enforced separately by scripts/variant-audit.mjs).
 */

const classes = (el: Element) => el.className.split(/\s+/).sort().join(" ");

describe("resolveButtonVocabulary", () => {
  it("defaults to accent / solid / md", () => {
    expect(resolveButtonVocabulary({})).toEqual({ tone: "accent", variant: "solid", size: "md" });
  });

  it("resolves the canonical pair (tone + variant) unchanged", () => {
    expect(resolveButtonVocabulary({ tone: "danger", variant: "soft", size: "lg" }))
      .toEqual({ tone: "danger", variant: "soft", size: "lg" });
  });

  it("resolves the AlignUI-shaped shorthand inside variant", () => {
    expect(resolveButtonVocabulary({ variant: "primary" }).tone).toBe("accent");
    expect(resolveButtonVocabulary({ variant: "destructive" }).tone).toBe("danger");
    expect(resolveButtonVocabulary({ variant: "secondary" }).tone).toBe("default");
    expect(resolveButtonVocabulary({ variant: "success" }).tone).toBe("success");
    expect(resolveButtonVocabulary({ variant: "warning" }).tone).toBe("warning");
  });

  it("resolves the mode alias prop to the canonical look", () => {
    expect(resolveButtonVocabulary({ mode: "filled" }).variant).toBe("solid");
    expect(resolveButtonVocabulary({ mode: "stroke" }).variant).toBe("outline");
    expect(resolveButtonVocabulary({ mode: "lighter" }).variant).toBe("soft");
    expect(resolveButtonVocabulary({ mode: "ghost" }).variant).toBe("ghost");
  });

  it("precedence: canonical prop → alias prop → shorthand inside variant", () => {
    /* tone beats color beats the shorthand */
    expect(resolveButtonVocabulary({ tone: "success", color: "danger", variant: "primary" }).tone).toBe("success");
    expect(resolveButtonVocabulary({ color: "warning", variant: "primary" }).tone).toBe("warning");
    /* variant (canonical look) beats mode; mode beats the default */
    expect(resolveButtonVocabulary({ variant: "soft", mode: "stroke" }).variant).toBe("soft");
    expect(resolveButtonVocabulary({ mode: "stroke" }).variant).toBe("outline");
  });

  it("keeps intents and looks disjoint (no value can mean both)", () => {
    const intents = ["primary", "secondary", "neutral", "destructive", "success", "warning"];
    const looks = ["solid", "soft", "outline", "ghost", "link"];
    expect(intents.filter((i) => looks.includes(i))).toEqual([]);
  });

  it("exposes display labels 1:1 with the canonical axes", () => {
    expect(Object.keys(toneLabels)).toHaveLength(5);
    expect(Object.keys(variantLabels)).toHaveLength(5);
    expect(sizeLabels).toEqual({ xxs: "XS", xs: "SM", sm: "MD", md: "LG", lg: "XL" });
  });
});

describe("Button alias layer renders identically", () => {
  const pairs: Array<[{ [k: string]: unknown }, { [k: string]: unknown }]> = [
    [{ tone: "accent", variant: "solid" }, { variant: "primary", mode: "filled" }],
    [{ tone: "danger", variant: "outline" }, { variant: "destructive", mode: "stroke" }],
    [{ tone: "default", variant: "soft" }, { variant: "secondary", mode: "lighter" }],
    [{ tone: "success", variant: "ghost" }, { variant: "success", mode: "ghost" }],
  ];

  it.each(pairs)("canonical %o === alias %o", (canonical, alias) => {
    const a = render(<Button {...canonical}>Continue</Button>).container.querySelector("button")!;
    const b = render(<Button {...alias}>Continue</Button>).container.querySelector("button")!;
    expect(classes(a)).toBe(classes(b));
  });

  it("alias form preserves state semantics (disabled, loading, aria-busy)", () => {
    const { container } = render(<Button variant="destructive" mode="stroke" loading aria-label="Delete" />);
    const el = container.querySelector("button")!;
    expect(el).toBeDisabled();
    expect(el).toHaveAttribute("aria-busy", "true");
    expect(el).toHaveAccessibleName("Delete");
  });

  it("renders an anchor when href is provided, in either vocabulary", () => {
    const { container } = render(<Button variant="primary" mode="filled" href="/pricing">Pricing</Button>);
    const el = container.querySelector("a")!;
    expect(el).toHaveAttribute("href", "/pricing");
    expect(el).toHaveClass("group");
  });

  it("does not leak the shorthand into the DOM", () => {
    const { container } = render(<Button variant="primary" mode="filled">Continue</Button>);
    const el = container.querySelector("button")!;
    expect(el.getAttribute("variant")).toBeNull();
    expect(el.getAttribute("mode")).toBeNull();
  });
});
