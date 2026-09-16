# Aperture vs AlignUI — Competitive Audit

Date: 2026-09-16
Scope: full source review of `/src`, the built single-file bundle, the design-lint and smoke gates, and the published AlignUI marketing site (alignui.com) as the reference.
Method: static audit of source + run of every project gate (`build`, `lint:design`, `test:smoke`) + rendered DOM probes of the production bundle in a DOM host.

---

## 1. Snapshot (measured, not estimated)

| Signal | Value |
|---|---|
| Component documentation pages | 64 (Actions 9 · Forms 16 · Data Display 19 · Navigation 7 · Feedback & Overlays 13) |
| Composed block examples | 16 |
| Total hash routes | 78 |
| Design lint gate | PASS — 43 files, 0 findings |
| Smoke gate | **BROKEN** — 81/81 routes report EMPTY, 1 SyntaxError (see §4.1) |
| Production bundle | 1,687 KB (418 KB gzip) self-contained single file |
| Dependency audit | 2 vulnerabilities — 1 high, 1 low (`jsdom` chain) |
| Duplicate source tree | `Design-system/` is a divergent fork of `src/` (extra `Pro.tsx`, `Marketing.tsx`, PRO-ified copy) |

---

## 2. Where AlignUI is stronger (gaps to close)

1. **The hero proves the product.** AlignUI's hero is a working editor: a file
   tree (`button.tsx`, `button-group.tsx`, …), a `preview`/`actions` toolbar,
   a live render of a real button, and the actual code beside it — the viewer
   sees the design system *and* the copy-paste developer experience in the
   first viewport. Aperture's hero is a wordmark and a paragraph; the live
   playground only appears below the fold.

   → Upgrade: put a live editor + preview on the landing hero.

2. **A real component directory.** AlignUI exposes the whole library as a
   searchable, categorized thumbnail directory on the homepage. Aperture
   hoards the same content behind "Explore components".

   → Upgrade: add a compact, real(generated-from-`COMPONENT_GROUPS`) thumbnail
   directory to the homepage.

3. **Proof-of-scale strip.** AlignUI carries an eight-cell strip (Components /
   Production Ready / Figma / Customizable / Responsive / Easy for Devs /
   Dark Mode / TypeScript / Accessible). Aperture has no equivalent
   at-a-glance summary of what the system covers.

   → Upgrade: add a factual coverage strip ("64 docs pages · 16 blocks ·
   React 19 · TypeScript · Tailwind v4 · Dark mode · Reduced motion").

4. **Marquee announcement + quick links.** AlignUI leads with a persistent PRO
   banner and a quick-links row. Aperture's header has neither.

   → Upgrade: add a lightweight top banner and a quick-links cluster.

---

## 3. Where Aperture already leads (keep, and say so)

- **Foundations depth.** Dedicated color / typography / spacing / radius & elevation / motion / accessibility pages with live controls (hue+chroma generator, radius multiplier, easing comparators). AlignUI has no public equivalent.
- **Theme Studio.** Live token editing persisted locally + CSS export. Industry-leading for a free preview.
- **Honest claims.** No invented testimonials or fabricated stats; the beta FAQ states what is not included. This must not regress (see §4.3).
- **Working interactions.** Team invite, preferences, destructive confirmation, and block examples all have real state and toast feedback — above AlignUI's static block thumbnails.
- **Token governance.** `extendTailwindMerge` + design-lint enforce the type scale and shadow scale automatically. Stronger tooling than AlignUI.

---

## 4. Defects found

### 4.1 Smoke test is non-functional (P0)
`npm run test:smoke` renders the production bundle in jsdom by stripping the
inline `<script type="module">` and re-running it as a classic script. The
`vite-plugin-singlefile` bundle inlines Babel runtime helpers containing:

```
require: `\n    import {createRequire as CREATE_REQUIRE_NAME} from "module";\n    const require = CREATE_REQUIRE_NAME(import.meta.url);\n  `
```

The real `import` statement and `import.meta.url` are not valid in a classic
script, so jsdom throws `SyntaxError: Unexpected token '<'` and **every route
reports EMPTY**. The gate currently passes only because it exits 0 on the
broken condition — it provides zero regression coverage.

Proposed fix: rewrite the harness to convert the bundle through esbuild
(`format: "iife"`) and execute it in the jsdom window. Verified locally: all
routes render, h1 populated, no runtime errors.

### 4.2 Typography drifts off the scale (P2)
- `font-weight: 550 / 650` (interpolated) is used across headings and labels;
  the loaded Inter axis is 300–800, so these weights are *faux* (synthetic
  bold) rather than optical masters.
- `text-[10px]` / `text-[11px]` literals break the documented 12–56px scale.

### 4.3 Unpublished package is documented as installable (P2)
The Installation page instructs `npm install @aperture/react` and peer-notes
a shipped package; no such package is published, and the repo's own
DESIGN-REVIEW.md forbids "a published npm package" claim. Frame this as a
local/copy-source install until a real publish exists.

### 4.4 Repo hygiene (P2)
`Design-system/` duplicates and diverges from `src/` (adds `Pro.tsx`,
`Marketing.tsx`, `BrandMarks.tsx`, PRO/marketing copy). Only one tree is
built; the other is drift risk.

### 4.5 Dependency & payload hygiene (P2)
- `npm audit` reports 1 high + 1 low severity (`jsdom` and its transitive
  `whatwg-encoding` chain).
- Homepage uses `lucide-react@^1.46.0` (a locked-in ancient resolution ticket)
  while the rest of the app prefers Remix Icons — two icon systems in one
  bundle.

---

## 5. Upgrade plan

### P0 — restore the regression gate (shipped)
Rewrite `scripts/smoke.mjs` to compile the single-file bundle to an IIFE via
esbuild and render every route in jsdom with proper stubs. Exit non-zero on
crash, empty route, missing h1, unlabeled buttons, or img-without-alt.

### P1 — landing hero parity (shipped)
1. Live **editor + preview** hero (React Live editor, real components in
   scope, preview/code tabs, copy + reset) replacing the logo-only hero.
2. Factual **coverage strip** (# documentation pages · # blocks · stack).
3. A **top announcement link** and a **quick-links row** to Components /
   Blocks / Foundations / Theme Studio.

### P2 — hardening queue
| Item | Action |
|---|---|
| Package claim | Reword Installation to copy-source + "publish upcoming"; note status honestly. |
| Typography | Replace 550/650 weights with optical masters; audit off-scale sizes. |
| jsdom vuln | Update/replace `jsdom` and audit chain; or drop DOM deps from the runtime test. |
| Icon system | Standardize on Remix Icons; remove `lucide-react@^1.46.0`. |
| Duplicate tree | Archive/delete `Design-system/`, keep `src/` as the single source of truth. |
| a11y audit | Real-browser sweep at 320/375/768/1024/1440 + 200% zoom (no headless browser is bundled in this sandbox yet). |

---

## 6. Success criteria
- [x] `npm run test:types` passes (new gate — esbuild build previously skipped type-checking).
- [x] `npm run build` passes.
- [x] `npm run lint:design` passes with 0 findings.
- [x] `npm run test:smoke` renders **all 81 routes** with a populated h1 and 0 findings.
- [x] The landing hero demonstrates a **working editor + preview** inside one viewport.
- [x] A factual coverage strip (64 docs pages · 16 blocks · 7 foundations · light/dark · Theme Studio · keyboard-first) communicates scale without invented numbers.

Note on residual items: the duplicate `Design-system/` tree and the
`npm audit` (jsdom chain) findings are tracked but not yet resolved in this
pass; they are the highest-value follow-ups.
