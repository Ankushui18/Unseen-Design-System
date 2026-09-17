# Unseen Design System

A production-grade React 19 + Tailwind CSS 4 design system: **117 components**, live theming (OKLCH accent generator, radius scale, light/dark), 20+ blocks and templates, and a docs site with gated quality checks — type safety, design-token linting, smoke rendering and full **axe-core WCAG 2.1 A/AA accessibility audits across all 101 routes**.

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
| Types | `npm run test:types` | `tsc --noEmit` — zero type errors |
| Build | `npm run build` | Production bundle compiles |
| Design lint | `npm run lint:design` | The design contract: semantic tokens only (no raw hex/palette), the custom type scale, elevation tokens, nav/routes/previews parity, real `cn` merge behavior |
| Smoke | `npm run test:smoke` | Every route renders from the production bundle in jsdom — no crashes, no empty pages, heading present, plus label/alt heuristics |
| Accessibility | `npm run test:a11y` | `axe-core` WCAG 2.1 A/AA on all 101 routes; critical/serious violations fail. `--strict` fails on any impact |

Useful extras:

```bash
npm run test:a11y -- --strict    # zero-tolerance a11y run
npm run audit:components         # per-component state/a11y/docs matrix
npm run audit:components -- --md # same, as Markdown (docs/COMPONENT-AUDIT.md is generated from this)
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
scripts/
  design-lint.mjs      static design-contract enforcement
  smoke.mjs            jsdom render of all routes from dist/
  a11y-audit.mjs       axe-core gate over all routes
  component-audit.mjs  the component matrix generator
```

## Architecture contracts (short version)

- **Tokens first.** Components only consume semantic tokens; raw color/px values are lint errors.
- **Dependency-light.** No Radix — primitives are in-house.
- **States are API.** Disabled/loading/error/focus support is part of a component's public contract, measured mechanically by the audit.
- **Accessibility is gated, not aspirational.** axe runs on every route in `npm test`; the current state is **0 violations**, and it stays that way.

## Status & roadmap

- Component coverage vs AlignUI free base: **63/63** — see `ALIGNUI-PARITY-2026-09-17.md`.
- Phased engineering plan (tests, playground, packaging, ecosystem): **`UNSEEN-ROADMAP-2026-09-17.md`**.
- Live component matrix with per-component state/a11y/docs coverage: `COMPONENT-AUDIT.md`.
