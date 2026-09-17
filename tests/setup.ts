import "@testing-library/jest-dom/vitest";

/* jsdom environment shims — mirror scripts/smoke.mjs's harness so components
   behave the same in unit tests as in the route-level gates. */

if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({ matches: false, media: query, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, onchange: null, dispatchEvent: () => false }) as MediaQueryList;
}
window.scrollTo = () => {};
if (!window.ResizeObserver) {
  window.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} } as unknown as typeof ResizeObserver;
}
if (!window.IntersectionObserver) {
  window.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} } as unknown as typeof IntersectionObserver;
}
if (!window.HTMLElement.prototype.scrollIntoView) {
  window.HTMLElement.prototype.scrollIntoView = () => {};
}

/* jsdom has no layout: getClientRects() returns empty, which would make
   useDialogFocus's focusable() filter find nothing. Pretend every element
   produces a rect so focus management logic runs for real. */
window.HTMLElement.prototype.getClientRects = function getClientRects() {
  return { length: 1, item: () => null, 0: undefined } as unknown as DOMRectList;
};
