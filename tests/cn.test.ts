import { describe, expect, it } from "vitest";
import { cn } from "@/utils/cn";

/**
 * The cn() merge contract — the defect that motivated the original design
 * review: custom tokens must be seen by tailwind-merge as font-size /
 * shadow / radius, or overrides silently lose (CSS source order decides).
 */
describe("cn merge contract", () => {
  it("keeps custom type size and color utilities side by side", () => {
    // text-label-sm must NOT be treated as a color and dropped.
    expect(cn("text-label-sm", "text-foreground")).toBe("text-label-sm text-foreground");
  });

  it("merges custom type sizes — last one wins", () => {
    expect(cn("text-label-sm", "text-label-md")).toBe("text-label-md");
    expect(cn("text-title-h2", "text-title-h4")).toBe("text-title-h4");
    expect(cn("text-paragraph-xs", "text-subheading-sm")).toBe("text-subheading-sm");
  });

  it("merges standard layout utilities", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });

  it("merges every numeric radius step of the system scale", () => {
    for (const a of ["4", "6", "8", "10", "12", "14", "16", "20"]) {
      expect(cn(`rounded-${a}`, "rounded-20"), `rounded-${a} vs rounded-20`).toBe("rounded-20");
    }
    expect(cn("rounded-10", "rounded-full")).toBe("rounded-full");
  });

  it("keeps shadows of different variants apart", () => {
    expect(cn("shadow-xs", "focus-visible:shadow-ring-accent")).toBe("shadow-xs focus-visible:shadow-ring-accent");
  });

  it("merges custom shadow tokens — last one wins", () => {
    expect(cn("shadow-fancy-neutral", "shadow-fancy-accent")).toBe("shadow-fancy-accent");
  });

  it("handles conditional/undefined/false inputs like clsx", () => {
    expect(cn("p-2", false && "m-9", undefined, { "mt-1": true })).toBe("p-2 mt-1");
  });
});
