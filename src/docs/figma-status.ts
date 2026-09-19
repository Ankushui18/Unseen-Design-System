/**
 * Figma kit status, per React export (WEBSITE-IA.md §8).
 *
 * **There is no published Figma library.** Every component is `none` until a
 * kit exists, and this file is where that changes — one line per component, not
 * a badge invented on a marketing page. The page says so in as many words
 * rather than rendering a table that quietly implies otherwise.
 *
 * Statuses, in the spec's language:
 *   none      — no Figma counterpart published
 *   base      — published, no variant properties
 *   variants  — published with variant properties mirroring the component's axes
 *   complete  — published with variants, states, and every value bound to a token
 *
 * Sparse on purpose: the default is `none`, and flipping a component means
 * adding its name here. `tests/figma.test.ts` fails if a key is not a real
 * component, or if a component claims a kit while having no variant axes to
 * mirror — a claim nothing could satisfy.
 */
export type FigmaStatus = "none" | "base" | "variants" | "complete";

export const FIGMA_STATUS: Record<string, FigmaStatus> = {};

export const DEFAULT_FIGMA_STATUS: FigmaStatus = "none";

export function figmaStatus(name: string): FigmaStatus {
  return FIGMA_STATUS[name] ?? DEFAULT_FIGMA_STATUS;
}

/**
 * Whether a component's status is one a kit could actually satisfy. `none` and
 * `base` always are — a base component mirrors no property. `variants` and
 * `complete` promise the kit carries the component's axes, so a component with
 * none cannot keep that promise.
 */
export function canPublish(name: string, axisCount: number): boolean {
  const status = figmaStatus(name);
  if (status === "none" || status === "base") return true;
  return axisCount > 0;
}
