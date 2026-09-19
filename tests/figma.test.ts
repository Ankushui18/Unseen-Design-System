import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { canPublish, figmaStatus, FIGMA_STATUS, type FigmaStatus } from "../src/docs/figma-status";

/**
 * `/figma` makes one claim that nothing in the pipeline can compute: which
 * components have a Figma counterpart. The token export is diffed by
 * `tokens:check`, the axes are diffed by `audit:variants:check`, and the parity
 * statuses were — until this file — an honour system.
 *
 * So the status map is checked like data, not like copy: a key that is not a
 * real component would print a row nothing owns, and a variant claim on a
 * component with no axes to mirror is a claim no kit could satisfy. There is no
 * Figma library today, which makes these tests quiet; they are the reason the
 * first real claim can be made safely.
 */
const ROOT = process.cwd();

type AuditRow = { name: string; axes: Record<string, unknown>; cells: number };
const audit = JSON.parse(readFileSync(join(ROOT, "audit/variant-audit.json"), "utf8")) as {
  total: number;
  totalComponents: number;
  withAxes: number;
  rows: AuditRow[];
};

const byName = new Map(audit.rows.map((r) => [r.name, r]));
const axesOf = (name: string) => Object.keys(byName.get(name)?.axes ?? {}).length;

const STATUSES: FigmaStatus[] = ["none", "base", "variants", "complete"];

describe("figma status", () => {
  it("only names components that exist", () => {
    const unknown = Object.keys(FIGMA_STATUS).filter((name) => !byName.has(name));
    expect(unknown, `not in audit/variant-audit.json: ${unknown.join(", ")}`).toEqual([]);
  });

  it("uses the four statuses the page renders", () => {
    const bad = Object.entries(FIGMA_STATUS).filter(([, s]) => !STATUSES.includes(s));
    expect(bad).toEqual([]);
  });

  it("is sparse — no entry restating the default", () => {
    const pointless = Object.entries(FIGMA_STATUS)
      .filter(([, s]) => s === "none")
      .map(([name]) => name);
    expect(pointless, "`none` is the default; listing it hides which components changed").toEqual(
      [],
    );
  });

  it("resolves anything unlisted to `none`", () => {
    for (const row of audit.rows) {
      if (!(row.name in FIGMA_STATUS)) expect(figmaStatus(row.name)).toBe("none");
    }
    expect(figmaStatus("NotAComponent")).toBe("none");
  });

  it("refuses a variant claim with nothing to mirror", () => {
    // `variants`/`complete` promise the kit mirrors the component's axes; a
    // component with zero axes cannot keep that promise. `base` and `none` can.
    expect(canPublish("NotAComponent", 0)).toBe(true); // default `none`
    for (const [name, status] of Object.entries(FIGMA_STATUS)) {
      if (status === "variants" || status === "complete") {
        expect(canPublish(name, axesOf(name)), `${name} claims ${status} with no axes`).toBe(true);
      }
    }

    FIGMA_STATUS.Button = "variants";
    try {
      expect(canPublish("Button", axesOf("Button"))).toBe(true);
      expect(canPublish("Button", 0)).toBe(false);
      FIGMA_STATUS.Button = "base";
      expect(canPublish("Button", 0)).toBe(true); // a base component mirrors no property
    } finally {
      delete FIGMA_STATUS.Button;
    }
  });

  it("keeps the page honest about where status comes from", () => {
    const page = readFileSync(join(ROOT, "src/pages/Figma.tsx"), "utf8");
    expect(page).toMatch(/from "\.\.\/docs\/figma-status"/);
    expect(page).toMatch(/figmaStatus\(row\.name\)/);
  });

  it("prints totals that match the artifact it imports", () => {
    expect(audit.rows).toHaveLength(audit.totalComponents);
    expect(audit.rows.reduce((sum, r) => sum + r.cells, 0)).toBe(audit.total);
    expect(audit.rows.filter((r) => Object.keys(r.axes).length > 0)).toHaveLength(audit.withAxes);
  });
});
