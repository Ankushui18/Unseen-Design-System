/**
 * Facts behind the code ↔ Figma story, derived at build time from three files
 * that CI already diff-checks: `audit/variant-audit.json` (the naming
 * contract), `tokens/tokens.json` and `tokens/figma-variables.csv` (the
 * export).
 *
 * `/figma` and the homepage band both print these numbers, so they live here
 * rather than in either page — the same reason the components' counts come from
 * the registry. Nothing in this file is typed by hand, and nothing here can
 * claim a Figma counterpart: that is `figma-status.ts`, and its default is
 * `none`.
 */
import variantAuditRaw from "../../audit/variant-audit.json?raw";
import tokensRaw from "../../tokens/tokens.json?raw";
import variablesCsv from "../../tokens/figma-variables.csv?raw";

export type AxisValues = Record<string, string[]>;
export type AuditRow = {
  name: string;
  file: string;
  axes: Record<string, number>;
  values?: AxisValues;
  cells: number;
};

export const AUDIT = JSON.parse(variantAuditRaw) as {
  total: number;
  withAxes: number;
  totalComponents: number;
  rows: AuditRow[];
};

const tokens = JSON.parse(tokensRaw) as Record<string, unknown>;

/** Leaf count of the token tree — every `$value` is one token. */
function countTokens(node: unknown): number {
  if (!node || typeof node !== "object") return 0;
  const obj = node as Record<string, unknown>;
  if ("$value" in obj) return 1;
  return Object.values(obj).reduce((n: number, child) => n + countTokens(child), 0);
}

export const TOKEN_COUNT = countTokens(tokens);
export const VARIABLE_ROWS = variablesCsv.trim().split("\n").length - 1; // minus the header
export const TOKEN_GROUPS = Object.keys(tokens).filter((k) => k !== "$meta" && k !== "config");

/** `$type` values present in the export — what Figma gets as variable types. */
export const TOKEN_TYPES = (() => {
  const types = new Set<string>();
  const walk = (node: unknown) => {
    if (!node || typeof node !== "object") return;
    const obj = node as Record<string, unknown>;
    if (typeof obj.$type === "string") types.add(obj.$type);
    for (const v of Object.values(obj)) walk(v);
  };
  walk(tokens);
  return [...types].sort();
})();

export const VARIABLE_EXCERPT = variablesCsv
  .trim()
  .split("\n")
  .slice(0, 7)
  .join("\n");

/** The axis names a Figma variant property would take, in the components' words. */
export const AXIS_PROP: Record<string, string> = {
  intent: "tone",
  variant: "variant",
  size: "size",
  shape: "shape",
  placement: "placement",
  density: "density",
  status: "status",
};

/** One worked example, used to show the contract rather than describe it. */
export const EXAMPLE = AUDIT.rows.find((r) => r.name === "Button") ?? AUDIT.rows[0];

/** `EXAMPLE`'s axes, normalised: canonical axis, mirrored property, its values. */
export const EXAMPLE_AXES: { axis: string; prop: string; values: string[] }[] = Object.entries(
  EXAMPLE.values ?? {},
).length
  ? Object.entries(EXAMPLE.values ?? {}).map(([axis, values]) => ({
      axis,
      prop: AXIS_PROP[axis] ?? axis,
      values,
    }))
  : Object.entries(EXAMPLE.axes).map(([axis, count]) => ({
      axis,
      prop: AXIS_PROP[axis] ?? axis,
      values: [`${count} values`],
    }));

/** The preferred value per axis, falling back to the first one the union has. */
function pickValue(axis: string, preferred: string): string {
  const values = EXAMPLE_AXES.find((a) => a.axis === axis)?.values ?? [];
  return values.includes(preferred) ? preferred : (values[0] ?? preferred);
}

/** What the example looks like written in React — the other side of the bridge. */
export const EXAMPLE_CODE = `<${EXAMPLE.name}
  ${AXIS_PROP.intent}="${pickValue("intent", "accent")}"
  ${AXIS_PROP.size}="${pickValue("size", "md")}"
  ${AXIS_PROP.variant}="${pickValue("variant", "solid")}"
/>`;
