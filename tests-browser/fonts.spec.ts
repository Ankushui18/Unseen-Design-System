import { expect, test } from "@playwright/test";
import { goto } from "./helpers";

/**
 * The system ships its own typeface (COMPONENT-QUALITY-SPEC.md §6).
 *
 * This is the one check that would have caught the real state of the product:
 * the site asked a third-party CDN for Inter, and in any environment where that
 * CDN is unreachable every component rendered in a fallback whose metrics do not
 * match the letter-spacing and line-height the tokens were tuned to.
 */
test("the brand typefaces actually render (self-hosted, not a CDN)", async ({ page, baseURL }) => {
  const thirdParty: string[] = [];
  page.on("request", (r) => {
    if (/fonts\.(googleapis|gstatic)\.com/.test(r.url())) thirdParty.push(r.url());
  });

  await goto(page, "components/button", "light");

  const fonts = await page.evaluate(async () => {
    const set = (document as any).fonts;
    await set.ready;
    const faces = [...set].map((f: any) => ({ family: f.family, weight: f.weight, status: f.status }));
    const probe = (family: string) => {
      const el = document.createElement("span");
      el.style.cssText = `position:absolute;font-size:64px;font-family:"${family}"`;
      el.textContent = "Hamburgefonstiv";
      document.body.appendChild(el);
      const w = el.getBoundingClientRect().width;
      el.remove();
      return Math.round(w);
    };
    return {
      faces,
      interLoaded: faces.some((f) => f.family.includes("Inter") && f.status === "loaded"),
      monoLoaded: faces.some((f) => f.family.includes("JetBrains Mono") && f.status === "loaded"),
      interWidth: probe("Inter"),
      fallbackWidth: probe("__definitely_not_installed__"),
    };
  });

  expect(thirdParty, `third-party font requests: ${thirdParty.join(", ")}`).toEqual([]);
  expect(fonts.interLoaded, `font faces: ${JSON.stringify(fonts.faces)}`).toBe(true);
  expect(fonts.monoLoaded, `font faces: ${JSON.stringify(fonts.faces)}`).toBe(true);
  /* Inter must actually measure differently from the fallback — a "loaded" face
   * that renders identically means we are still looking at the fallback. */
  expect(fonts.interWidth).not.toBe(fonts.fallbackWidth);
});
