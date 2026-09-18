# Unseen Design System

A production-grade React 19 + Tailwind CSS 4 design system: **117 components**, live theming (OKLCH accent generator, radius scale, light/dark), 20+ blocks and templates, and a docs site with gated quality checks — type safety, design-token linting, smoke rendering and full **axe-core WCAG 2.1 A/AA accessibility audits across all 106 routes**.

## Quick start

```bash
npm install
npm run dev        # docs site at the printed local URL
npm run build      # production single-file build → dist/
npm test           # the full gate — see below
```

## The quality gate

`npm test` runs, in order:

| Step | Command | What it enforces |
|---|---|---|
| Types | `npm run test:types` | `tsc --noEmit` — zero type errors (src **and** tests) |
| Unit | `npm run test:unit` | Vitest + Testing Library: component interaction, keyboard, focus management, stateful primitives, the `cn` merge contract |
| Build | `npm run build` | Production bundle compiles |
| Design lint | `npm run lint:design` | The design contract: semantic tokens only (no raw hex/palette), the custom type scale, elevation tokens, nav/routes/previews parity, real `cn` merge behavior |
| Smoke | `npm run test:smoke` | Every route renders from the production bundle in jsdom — no crashes, no empty pages, heading present, plus label/alt heuristics |
| Accessibility | `npm run test:a11y` | `axe-core` WCAG 2.1 A/AA on all 106 routes; critical/serious violations fail. `--strict` fails on any impact |

Useful extras:

```bash
npm run test:unit:watch          # watch-mode unit tests
npm run test:a11y -- --strict    # zero-tolerance a11y run
npm run audit:components         # per-component state/a11y/docs matrix
npm run audit:components -- --md # same, as Markdown (docs/COMPONENT-AUDIT.md is generated from this)
```

### Real-browser suite (optional, offline)

The browser gate is separate because it needs a real Chromium: `npm run test:browser` builds the app,
extracts a bundled browser on first run (`scripts/browser-setup.mjs` → `/tmp/chromium`), and runs three
Playwright suites in `tests-browser/` against the production build:

| Suite | Coverage |
|---|---|
| `a11y` | `axe-core` WCAG 2.1 A/AA **with the color-contrast rule** (impossible in jsdom) on all 106 routes × light/dark — 212 tests |
| `responsive` | No horizontal overflow at 320→1600px on layout-critical routes (WCAG 1.4.10 reflow) + the 200%-zoom-equivalent viewport (1.4.4) |
| `visual` | Pixel-diff screenshots of 29 core surfaces × both themes against committed baselines (`tests-browser/visual.spec.ts-snapshots/`) |

```bash
npm run test:browser             # run all three suites
npm run test:browser:update      # deliberately refresh visual baselines after an intended change
```

## Repository layout

```
src/
  ui/            the component library (117 components, 10 modules)
  lib/           theme provider (mode/accent/radius), hooks
  utils/cn.ts    class merge, wired to the custom type scale
  docs/          docs-site chrome: shell, nav, search, showcase, previews
  pages/         docs pages: home, foundations, components, blocks, templates…
  blocks/        copy-paste product blocks (auth, tables, settings, heroes…)
  index.css      the token layer: primitive → semantic → component
  styles/        component-scoped CSS (data table, sliders, studio chrome)
tests/           Vitest unit + interaction tests (jsdom)
scripts/
  design-lint.mjs      static design-contract enforcement
  smoke.mjs            jsdom render of all routes from dist/
  a11y-audit.mjs       axe-core gate over all routes
  component-audit.mjs  the component matrix generator
```

## The quality bar (v2)

Two documents define what "done" means, and one gate enforces it:

- **`COMPONENT-QUALITY-SPEC.md`** — the graded bar: six matrices (contract, variants, states, visual, accessibility, documentation), tiers, scoring, definition of done, anti-patterns.
- **`WEBSITE-IA.md`** — the website as a product: route table, 8-category taxonomy (80 components mapped), page templates, the playground contract, deep links.
- **`QUALITY-SCORECARD.md`** — generated grades, tiers and the debt ledger.

```bash
npm run quality:report            # per-component score, grade, tier, failing checks
npm run quality:report -- --md    # regenerate QUALITY-SCORECARD.md
npm run quality:check             # ratchet vs audit/quality-baseline.json (runs in npm test)
npm run quality:check -- --strict # tier bar: fail any component below its tier minimum
npm run quality:ia                # validate the WEBSITE-IA taxonomy (no orphans, no empty categories)
```

**How the bar works in practice:** every component is graded A–D and assigned a tier (Tier A flagship · B core · C specialist). `npm test` enforces the **ratchet** — no score may drop — and new components enter at the Tier A bar. Remediation is tracked as generated debt, never as a hand-written list. The reference implementation is `Button` (`src/ui/Button.tsx` + `src/pages/components/ButtonDoc.tsx`): the canonical/alias vocabulary layer, the full matrix, and the inline playground with deep-linkable state.

## Architecture contracts (short version)

- **Tokens first.** Components only consume semantic tokens; raw color/px values are lint errors.
- **Dependency-light.** No Radix — primitives are in-house.
- **States are API.** Disabled/loading/error/focus support is part of a component's public contract, measured mechanically by the audit.
- **Accessibility is gated, not aspirational.** axe runs on every route in `npm test`; the current state is **0 violations**, and it stays that way.

## Licensing

**There is no `LICENSE` file in this repository yet, so no licence is granted.**
Everything in it is published so you can read, run and evaluate the system, and the
repository is public — but "public" is not "licensed". Until a licence is added,
treat the code as all-rights-reserved and do not ship it in a product.

To make the site's former claim true, the owner only has to pick one:

1. **MIT** (or Apache-2.0) — add the licence text as `LICENSE`, put the chosen
   identifier in `package.json` (`"license": "MIT"`), replace this section with a
   one-line statement, and the copy in `src/pages/GettingStarted.tsx` can go back
   to naming the licence.
2. **Source-available / evaluation only** — keep this section, and the site keeps
   saying "free to explore during the public beta".

The site does not state a licence until then: `GettingStarted` links here instead,
and the homepage FAQ says the same thing in one sentence.

## Status & roadmap

- **Component quality bar (grades, tiers, matrices, DoD):** `COMPONENT-QUALITY-SPEC.md` — enforced by `npm run quality:check`.
- **Website information architecture (routes, taxonomy, page templates, playground):** `WEBSITE-IA.md`.
- **Product roadmap (v2 platform: variants, blocks, widgets, templates, Figma, packaging):** `UNSEEN-V2-ROADMAP.md`.
- **Binding conventions (variant matrix, API, naming, a11y, docs anatomy, new-component definition of done):** `CONVENTIONS.md`.
- Component coverage vs AlignUI free base: **63/63** — see `ALIGNUI-PARITY-2026-09-17.md`.
- Phased engineering plan (tests, playground, packaging, ecosystem): **`UNSEEN-ROADMAP-2026-09-17.md`**.
- Live component matrix with per-component state/a11y/docs coverage: `COMPONENT-AUDIT.md`.
