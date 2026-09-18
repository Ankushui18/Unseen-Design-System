import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";

/**
 * Ref-coverage ratchet.
 *
 * `scripts/codemod-ref.mjs` only reports a component as "refactored" when the
 * rewrite is provably safe: one JSX root, intrinsic, typed props, no competing
 * `ref` binding. So a dry run that finds nothing to do is a precise statement —
 * "no component in src/ui is still missing a ref that could safely have one" —
 * and it holds for components added later, not just the ones it fixed.
 *
 * Components it declines (portals, fragments, alternative roots, non-element
 * roots) are legitimately out of scope for an automatic pass and are listed in
 * the report rather than asserted on.
 */
describe("ref coverage", () => {
  const report = JSON.parse(
    execFileSync(process.execPath, ["scripts/codemod-ref.mjs", "--json"], {
      encoding: "utf8",
    }),
  ) as { refactored: { file: string; name: string }[]; skipped: { file: string; name: string; why: string }[] };

  it("leaves no component that can be given a ref automatically", () => {
    const pending = report.refactored.map((r) => `${r.file}::${r.name}`);
    expect(pending, `run \`node scripts/codemod-ref.mjs --write\` — ${pending.length} component(s) still need a ref`).toEqual([]);
  });

  it("still finds work to do, so the check above cannot pass vacuously", () => {
    /* if the codemod ever stopped recognising components it would report zero
     * refactored AND zero skipped, and the ratchet above would silently pass */
    expect(report.skipped.length).toBeGreaterThan(0);
  });
});
