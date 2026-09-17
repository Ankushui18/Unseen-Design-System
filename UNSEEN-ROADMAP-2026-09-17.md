# Unseen → Production-Grade: Engineering Roadmap

**Date:** 2026-09-17 · **Supersedes:** the discussion notes from the AlignUI comparison · **Complements:** `ALIGNUI-PARITY-2026-09-17.md`, `DESIGN-REVIEW.md`, `DESIGN-REVIEW-2026-09-16.md`, `COMPONENT-AUDIT.md` (generated)

This document turns the "bring Unseen to AlignUI-level completeness" discussion into an executable engineering plan: every gap verified against the actual repository state, each phase with acceptance criteria, each component dimension measured mechanically (`npm run audit:components`).

---

## 0. Where Unseen actually is (verified 2026-09-17)

The discussion note assumed an early-stage repo. The audit shows Unseen is much further along — roughly **end of Phase 3 of 6**. Verified facts:

| Plan pillar | Status | Evidence |
|---|---|---|
| Design tokens ("foundations extremely strong") | ✅ **Done** | `src/index.css`: primitive → semantic → component token chain; OKLCH accent generator (`--accent-h/--accent-c` → full 11-step ramp at runtime); `--radius-scale`; dark mode via `@custom-variant dark`; motion/easing tokens; `cn` wired to `extendTailwindMerge` for custom type tokens |
| Component matrix | ✅ **Done** | **117 exported components** across 10 modules; **101 routes**; AlignUI free-base parity 63/63 (see parity doc) |
| Docs site structure | ✅ **Done** | Searchable shell (⌘K palette w/ full ARIA combobox), mobile nav, grouped sidebar (PRO/Actions/Forms/Data Display/Feedback/Navigation/Overlays/Layouts/…), foundations section (Color, Typography, Spacing, Elevation, Motion, Icons, Tokens, Accessibility), templates + patterns + blocks sections |
| Blocks | ✅ **Started** | 20+ live blocks (`src/blocks/`), 6 template pages, patterns gallery |
| Dark mode / theming UX | ✅ **Done** | 13 accent presets × 5 radius presets × light/dark, live in the docs shell |
| Multi-state components | 🟡 **Partial** | Audit: disabled 60%, loading 19%, error 16%, empty 7%, controlled 27%, polymorphic 5% (see §3) |
| Accessibility first-class | 🟡→✅ **Harnessed today** | Was 3 hand-rolled heuristics in `smoke.mjs`. Now full axe-core WCAG 2.1 A/AA gate on all 101 routes — **0 violations** (see §1) |
| Live playground (per-component prop controls) | ❌ **Gap** | `Showcase` renders static `code` strings + copy; `react-live` appears only on Home. No knob-controlled playground per component page |
| Tests (unit / interaction / visual) | ❌ **Gap** | No unit tests, no keyboard-interaction tests, no visual regression |
| Library packaging / CLI | ❌ **Gap** | Single-file demo build (`vite-plugin-singlefile`); no package exports, no published dist |
| Figma / design-code parity | ❌ **Deliberately deferred** | Paid AlignUI territory; tokens are CSS-first so a `tokens.json` export is feasible cheaply (Phase 5) |
| Monorepo | ❌ **Phase 5+** | Premature now; revisit after library packaging |

Also fixed by this pass: stale diverged `Design-system/` duplicate (old lucide-based era) removed; route-aware `<title>`; DataTable `aria-sort` moved to the column header; `Switch`/`Slider` accessible-name contract hardened.

---

## 1. P0 — Landed in this pass (2026-09-17)

| Change | Files | Verification |
|---|---|---|
| **axe-core a11y gate** — every route rendered from the production bundle in jsdom, full WCAG 2.1 A/AA ruleset; critical/serious fail CI, `--strict` fails on any impact | `scripts/a11y-audit.mjs`, `npm run test:a11y`, wired into `npm test` | `101 routes · 0 violations · 0 runtime errors` (was: 112 findings incl. 41 critical) |
| **Component audit matrix** — mechanical per-component state/a11y/docs measurement, regenerable, embedded in `npm run audit:components` | `scripts/component-audit.mjs`, `COMPONENT-AUDIT.md` | 117 components measured |
| Route-aware `document.title` (WCAG 2.4.2) | `src/App.tsx`, `src/docs/nav.ts` (`findItem`) | axe `document-title` clean on all routes |
| `aria-sort` on `th` (columnheader), only for the active sort column | `src/ui/ProductPatterns.tsx` | axe `aria-allowed-attr` clean |
| `Switch`: `role="switch"`, `aria-checked`, `aria-label` support; all 8 unlabeled call sites fixed | `src/ui/Form.tsx`, `src/pages/Home.tsx`, `src/docs/previews.tsx`, `src/blocks/landing.tsx` | axe `label` clean |
| `Slider`: visible label is now a real `<label htmlFor>` (useId), `aria-label` when unlabeled | `src/ui/Form.tsx`, `src/pages/Icons.tsx` | axe `label` clean |
| Bare textareas/inputs labeled (bio field w/ `aria-describedby`, block table row-selection checkboxes) | `src/pages/Templates.tsx`, `src/blocks/index.tsx` | axe `label` clean |
| Repo hygiene: removed stale `Design-system/` duplicate (recoverable from git history) | — | `tsc` + build + all gates green |
| `README.md` (install, dev, gates, structure) | `README.md` | — |

### Known harness limits (explicitly out of the jsdom gate)

- `color-contrast` needs painted layout → real-browser pass (P1).
- Keyboard *behavior* (focus trapping, arrow-key roving, Esc) is not covered by static axe → interaction tests (P1).
- The component-audit percentages are source heuristics: native elements score "no key handler" legitimately (keyboard comes free with `<button>`/`<input>`).

---

## 2. The architecture contract (decisions, not aspirations)

1. **Tokens are the product.** Components consume semantic tokens (`--surface`, `--field`, `--accent`, …); raw hex/palette utilities are design-lint errors. New color/radius/type values land in `src/index.css` first.
2. **No Radix / no new runtime deps by default.** Primitives are in-house (AlignUI-parity behavior, dependency-light). Any exception needs a note in this file.
3. **API style: props + composition slots, not compound namespaces.** Current system (`<Button startContent …>`, `<Select options …>`) is deliberately flat. Compound APIs (`Select.Root/Item/…`) are adopted **only** where a component outgrows prop-driven composition — candidates: `Menu`, `CommandMenu`, `DataTable`. A full `Button.Root`-style rewrite is rejected: churn without user-visible gain.
4. **Polymorphism** exists via `asChild`/`href` on actions; extend to every action-like component (P2), not to layout components.
5. **States are part of the public API.** Every interactive component must define its state matrix before it is considered "done": default / hover / active / focus-visible / disabled, plus loading & error where meaningful. This is now measurable via the audit.
6. **Gates are non-optional.** `npm test` = types → build → design-lint → smoke(101 routes) → a11y(axe, 101 routes). Nothing merges red.

---

## 3. P1 — Production quality hardening (next)

**Theme:** tests that catch what types and linters can't.

| # | Task | Approach | Acceptance |
|---|---|---|---|
| 1.1 | Unit + interaction tests | Vitest + Testing Library + jsdom (deps only; no visual stack). Start with: `cn` merge contract, `hooks.ts`, `DigitInput` (typing/paste/backspace), `Datepicker` (month nav, selection), `Slider` (keyboard arrows), `Combobox` (typeahead), `DataTable` (sort/selection), `Modal`/`Drawer` (focus trap, Esc, return-focus) | `npm run test:unit`; every overlay has Esc + focus-trap tests; every form primitive has keyboard tests |
| 1.2 | Real-browser a11y + responsive validation | Playwright across 320/375/768/1024/1440 + 200% zoom; run axe incl. `color-contrast`; light + dark | `npm run test:browser` green; contrast report attached to DESIGN-REVIEW |
| 1.3 | Visual regression | Playwright screenshots of the 30 core component pages (light/dark), pixel-diff baseline in CI | Baseline committed; diff report on change |
| 1.4 | State-matrix uplift | Close audit gaps where meaningful: loading (19%→ target 100% of action components), error (16%→100% of inputs), keyboard where semantics aren't native (28%) | Audit tally moves; per-component matrix tables added to doc pages |
| 1.5 | RTL check | `dir="rtl"` smoke pass on layouts/navigation | No horizontal breakage; icons that imply direction flagged |

## 4. P2 — Developer experience (docs as a product)

| # | Task | Approach | Acceptance |
|---|---|---|---|
| 2.1 | **Per-component live playground** | Reusable `<Playground>`: schema-driven controls (select/boolean/text per prop) → live preview + generated, copyable JSX. Roll out to top-20 pages first (all Actions, all Forms, Select, Dialog, Dropdown, Tabs, Table) | Variant/size/state knobs mutate preview AND code; copyable; no stale `code` strings on converted pages |
| 2.2 | State-matrix docs section | Each primary component page gains the "Variants × Sizes × States" matrix (rendered, not prose) | Button/Input/Select/Checkbox/Radio/Switch/Dialog/Dropdown shipped |
| 2.3 | Controlled/uncontrolled parity | Every input-ish component accepts `(value, onChange)` + `defaultValue` | 27%→100% for form primitives |
| 2.4 | `asChild` on all actions | Link/Social/Fancy/Compact/ButtonTile/IconButton | Rendered element swaps, styles merge, types check |
| 2.5 | API reference hygiene | PropsTable completeness check (script: props in TS type vs props documented); each page: Accessibility + API + Examples sections present | Lint rule in design-lint |
| 2.6 | Remaining docs nits | Document `ScrollShadow`/`ErrorState`/providers on their host pages (they're sub-exports, fine today) | `audit` docs col = 100% |

## 5. P3 — Distribution

| # | Task | Acceptance |
|---|---|---|
| 3.1 | Library entry: `src/ui/index.ts` barrel w/ explicit exports + CSS entry (`index.css`) | Tree-shakeable import surface |
| 3.2 | Vite **library** build (ESM + types via `tsc -b`), `exports` map, peer-deps on react/react-dom | `npm pack` installs into a fresh Vite app; demo page renders Button/Select/Modal |
| 3.3 | Install docs become real (npm i + css import + tailwind preset notes) | Installation page matches reality |
| 3.4 | CHANGELOG + versioning policy | Semver; per-release notes |

## 6. P4 — Ecosystem

- **Utils parity** (deferred from the parity pass, still deliberate): `polymorphic` helper, `tv`-style variant helper, recursive-clone — only if P2 shows real need; our `cn` + record-maps already cover ~90% of variant ergonomics.
- **Tokens export**: script generating `tokens.json` (Style-Dictionary/Tokens-Studio-compatible) from `src/index.css` CSS vars → first step of Figma sync.
- **Monorepo** (`packages/{ui,tokens,icons}` + `apps/docs`): only after P3 proves the library build. Design the barrel now so the split is mechanical later.

## 7. Explicitly out of scope (unchanged)

- AlignUI's Figma file and sector templates (their paid distribution).
- Copying AlignUI visuals — parity means **completeness + DX**, not skin.
- "500 components" chasing: 117 excellent components > 250 inconsistent ones.

---

## 8. Working agreement for each next session

1. Run `npm test` — it must stay green (types, build, design-lint, smoke, axe).
2. New component ⇒ update the audit row: states, aria, controlled API, docs page, preview entry.
3. Touch an interactive component ⇒ its a11y contract (labels, focus, keyboard) is part of the diff, not a follow-up.
4. Pick P1 items in order 1.1 → 1.4; they unlock the truthful "production-grade" claim.
