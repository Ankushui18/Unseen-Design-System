# Unseen v2 Roadmap — From Component Collection to Design-System Platform

**Date:** 2026-09-18 · **Branch point:** `03e975f` · **Companion docs:** `UNSEEN-ROADMAP-2026-09-17.md` (engineering gates P0–P4), `ALIGNUI-PARITY-2026-09-17.md` (63/63 free-base parity), `COMPONENT-AUDIT.md` (generated per-component state matrix), `CONVENTIONS.md` (variant/API/naming/a11y law)

This document is the **product roadmap**. The 2026-09-17 roadmap stays authoritative for quality gates (types → unit → build → design-lint → smoke → axe → browser suites). This one answers the question that parity work already retired:

> Component parity with AlignUI's free set is **done (63/63)**. The remaining gap is *product depth*: variant matrices, blocks, widgets, templates, a Figma system, a real package, and a docs experience that feels like one coherent product.

**Strategic rule (from the re-audit):** do not chase AlignUI's "8,000 components/variants" number. Count only *meaningful* variants — matrix cells that exist in code, are rendered on the docs page, and consume tokens. Everything here is measured mechanically, not by marketing.

---

## 0. Where Unseen actually is (verified 2026-09-18)

Verified against this checkout — including corrections to the external re-audit, which was written against an older state:

| Claim | Verified state | Note |
|---|---|---|
| Duplicate `Design-system/` tree | ✅ **Already removed** | Removed in the 2026-09-17 pass (recoverable from git history). Nothing to archive. |
| Component count | **117 exported components** across 10 modules (`src/ui/`), 158 export lines | Not 63. AlignUI free-base parity 63/63 achieved *and* ~40 extras shipped. |
| Docs pages | **100 nav routes** (`src/docs/nav.ts`) + Home = 101 routes; ~70 component pages | Not "75 pages" — and all 101 routes are gated. |
| Theme Studio | **Shell-level theming exists**: 12 accent presets (OKLCH H/C) × 5 radius presets × light/dark, CSS-variable-first (`--accent-h/--accent-c`, `--radius-scale`) | A dedicated "Theme Studio" **product** (generator + exports) does not exist yet → Track B. |
| Blocks | **30+ registered blocks** (`src/blocks/`: auth, product, template, marketing) | Gap to 100+ → Phase 3. |
| Widgets | **0 as a library** — 5 full template pages exist (`AI & Neural Studio`, `Analytics Dashboard`, `Settings Screen`, `Billing & Plans`, `Team & People`) | Gap to 50+ composable widgets → Phase 4. |
| Templates | **5 pages** (nav) + 4 template blocks | Gap to 10 full applications → Phase 5. |
| Foundations | **13 pages** — Color, Typography, Spacing & Layout, **Sizing**, Radius & Elevation, **Borders**, **Opacity & Z-index**, Motion, **Breakpoints & Responsive**, Iconography, Accessibility, Token Reference, **Themes** (bold = added 2026-09-18) | ✅ Target met (12+). |
| Search | ⌘K palette over the 100 nav items (with keywords) in `src/docs/Shell.tsx` | Gap to full-content index → Track B. |
| Quality gates | types · 46+ unit/interaction tests · build · design-token lint · smoke (101 routes) · **axe WCAG 2.1 A/AA on 101 routes — 0 violations** · Playwright: a11y w/ color-contrast (202 tests), responsive 320→1600, **visual baselines ×29 surfaces ×2 themes** | Stronger than the re-audit credited. |
| State coverage (audit) | disabled ~60% · loading ~19% · error ~16% · empty ~7% · controlled ~27% · polymorphic ~5% of components | Phase 2 closes this. |
| Variant matrices | **Partial and uneven** — Button is already `mode5 × intent5 × size5` + full states; Chip/Avatar/FeaturedIcon carry 60–210 cells; many components have 0–2 axes. **Measured baseline: 853 meaningful cells across 52 components** (`npm run audit:variants`, landed this pass) | Phase 2 standardizes per `CONVENTIONS.md`; canonical live number = the audit script. |
| Packaging | Single-file Vite app; no package exports, no monorepo, no CLI | Phase 7 / Track A. |
| Figma | None (tokens are CSS-first, which makes export cheap) | Phase 6. |

**Conclusion:** the re-audit's "Phase 1 — Foundation hardening" is ~80% already done in this checkout. The real work starts at **component depth, then blocks, widgets, templates, Figma, packaging** — with conventions and measurement instrumented *first* so every later phase is verifiable.

---

## 1. The v1.0 target (and how each number is measured)

| Target | Number | Measured by |
|---|---|---|
| Core components (documented, state-complete, a11y-verified) | **70+** | `npm run audit:components` — 70+ rows with all required state columns ✓ and docs ✓ |
| Meaningful component variants | **1,000+** (measured 2026-09-18: **853** — baseline committed) | `npm run audit:variants` — matrix cells implemented in code **and** rendered on the docs page. Definition in §3. |
| Blocks | **100+** | `BLOCKS` registry length + category coverage (8 categories × ≥8 each) |
| Widgets | **50+** | `WIDGETS` registry length (Phase 4 defines the type) |
| Complete templates | **10** | Template page-completeness checklist (§8), rendered, responsive, dark-mode, gated |
| Foundations | **12+** | Nav sections under Foundations |
| Theme Studio | product, not a toggle | Track B acceptance criteria |
| Light + dark | ✓ (already gated on every surface) | visual suite |
| WCAG-oriented accessibility | 0 axe violations + contrast + interaction tests | existing gates, expanded to blocks/widgets/templates routes |
| Figma library | tokens + core-30 component sets + icon subset | Phase 6 acceptance criteria |
| Real npm package | `npm i @unseen-ui/react` works in a fresh app | Track A acceptance criteria (CI install test) |
| Search / command menu | full-content index | Track B acceptance criteria |
| Visual regression | 60+ baselines (from 29) | visual suite |

**v2 (post-v1.0):** 150+ components, 3,000+ meaningful variants, 250+ blocks, 100+ widgets, 20+ templates, Figma ↔ code token sync, asset + icon libraries, CLI, theme presets/marketplace, changelog + migration tooling.

---

## 2. Phase 1 — Lock the system (conventions + measurement) 〔1–2 weeks〕

Everything later depends on being *measurable*. Nothing in this phase ships pixels.

| # | Item | Acceptance | Effort |
|---|---|---|---|
| 1.1 | **`CONVENTIONS.md`** — variant-matrix axes, API style, naming, a11y, docs-page anatomy, block/widget conventions, new-component checklist | Committed; referenced by README + audit scripts | **Done (this pass)** |
| 1.2 | ~~**`scripts/variant-audit.mjs`**~~ ✅ **landed (this pass)** — per component: declared axis unions (incl. type aliases, mixed unions, `keyof typeof` records) → implemented cell count | `npm run audit:variants` (table/JSON/md); **baseline 853** committed in `audit/variant-audit-baseline.json`; fails on regression | done |
| 1.3 | ~~**Docs-anatomy lint**~~ ✅ **landed (this pass)** — `docs-anatomy` rule in `scripts/design-lint.mjs`: every `XDoc` page checked for API (+PropsTable) / examples / variants / states / accessibility sections. **Core-36 API section is blocking** (`docs-api-core`); the rest is reported and enforced in 2.4. Fixed in the same pass: added the missing `API` + `PropsTable` sections (real props, verified against source) to the 11 core-36 pages that lacked them — FancyButton, LinkButton, SocialButton, StatusBadge, Tag, SegmentedControl, Stepper, Datepicker, Banner, EmptyState, Combobox | Lint green: 0 `docs-api-core`; 24 non-blocking `docs-api` + full-anatomy report for the long tail | done |
| 1.4 | ~~**`tokens.json` export**~~ ✅ **landed (this pass)** — `scripts/tokens-export.mjs` derives a deterministic design-tokens-2.0 set from `src/index.css`: primitives (accent ramp evaluated at default H/C), semantic light/dark (Figma variable modes), 10-colour palette, syntax, type scale (20 styles), radius scale, shadows + elevation + focus rings (Figma shadow objects where flattenable), motion, sizing, opacity, brand config | `npm run tokens:export` → `tokens/tokens.json` (41.8 kB) + `tokens/figma-variables.csv` (103 variables); `npm run tokens:check` fails on drift (verified); first input to Figma (Phase 6) | done |
| 1.5 | ~~**Foundations completion**~~ ✅ **landed (this pass)** — five new pages in `src/pages/Foundations.tsx`: Sizing (control heights, icon sizes, avatar ladder, chrome tokens), Borders (hairline tokens + rules, premium hairlines), Opacity & Z-index (disabled-state contract, surface opacity table, fixed stack order), Breakpoints & Responsive (ladder, guaranteed behaviour, the browser gate), Themes (live brand engine, radius/density/appearance, `tokens.json` export + Figma pipeline) | Each page renders from real token values, light+dark, gated — routes now 106, axe 0 violations | done |
| 1.6 | **Type-scale & density tokens audit** — verify the custom type scale + add `--density-*` multiplier for compact/comfortable (used by Phase 2+) | design-lint passes; density tokens consumed by ≥10 components | S |

**Exit criteria:** `npm test` green; `audit:variants` baseline exists; every new component in the repo is now checkable against CONVENTIONS.md.

---

## 3. What counts as a "meaningful variant" (the counting law)

For each component the convention assigns **required axes** (§4 tables). A *matrix cell* = one combination of axis values (e.g. Button: `solid × success × sm`). A cell counts toward the 1,000+ total iff **all three** hold:

1. **Implemented** — the combination resolves to distinct styles in code (not a no-op `cn` merge).
2. **Tokenized** — every value comes from the token layer (design-lint already enforces no raw values).
3. **Documented** — rendered on the component's docs page (anatomy §9), light **and** dark.

States (default/hover/active/focus-visible/disabled/loading/error/empty) are **measured separately** by the existing component-audit — they are the *state matrix*, not variants. This is exactly what prevents AlignUI-style variant inflation: hover is not a variant; a `Button` with 5 modes × 5 intents × 5 sizes = **125** real variants already.

Top-30 core components at their required axes sum to ≈ 1,100 cells — see §4 for the per-component math.

---

## 4. Per-component variant gap matrix

Current axes are read from the actual source (`src/ui/*.tsx`); required axes come from `CONVENTIONS.md` rules R1–R8. State columns (D/L/E/C/P) — see `COMPONENT-AUDIT.md` (regenerable). **The canonical live numbers are `npm run audit:variants`** (baseline 853, `audit/variant-audit-baseline.json`) — if a row below disagrees with the script, the script wins and the row gets fixed. Priority: **P2a** = core-36 first wave, **P2b** = second wave, **P2c** = polish, **P3+** = consumed by blocks/widgets.

### 4.1 Actions 〔required: R1 — intent 5 × mode ≥3 × size 3–5 × icon content〕

| Component | Current axes (verified) | Target axes | Cells | Action | Priority |
|---|---|---|---|---|---|
| Button | mode 5 (solid/soft/outline/ghost/link) × intent 5 × size 5 (xxs–lg) + iconOnly + asChild/href + loading | Already at target | 125 | Docs matrix page (all 125 cells rendered); add `xl` only if marketing needs it | P2a |
| FancyButton | tone 6 (accent/default/success/warning/danger/stroke) × size 5 (xxs–lg) ✅ | intent 6 × size 5 | 30 | ~~Unify tone→intent; add sizes~~ **Done (wave 1)** — success/warning bevels with dedicated `--shadow-fancy-*` | done |
| CompactButton | variant 3 (stroke/ghost/white) × tone 5 (optional) × size 3 + fullRadius ✅ | variant 3 × intent 5 × size 3 | 45 | ~~Add intent axis~~ **Done (wave 1)** — `tone` added; `white` kept (3×5×3 = 45 > 15 target) | done |
| LinkButton | tone 5 (canonical) + legacy variant 4 × size 3 + underline ✅ | intent 5 × size 3 | 60 | ~~Unify to intent axis~~ **Done (wave 1)** — `tone` wins over legacy `variant`; size lg added | done |
| SocialButton | brand 9 (google/apple/github/x/microsoft/linkedin/gitlab/bitbucket/slack) × mode 2 × size 3 + iconOnly ✅ | brand 8–10 × mode 2 × size 3 | 54 | ~~Add brands~~ **Done (wave 1)** — 5 new monochrome marks; 4 originals keep brand colors | done |
| ButtonTile | variant 3 (soft/solid/outline) + selected + badge ✅ | variant 3 | 3 | ~~Add variant axis~~ **Done (wave 1)** — single size is intentional (documented) | done |
| Toolbar | variant 2 (solid/floating) ✅ | variant 2 | 2 | ~~Add axes~~ **Done (wave 1)** | done |
| ButtonGroup | container (no axes — correct) | — | 0 | Document composition | P2c |
| ToggleGroup | size 2 × variant 2 (filled/outline) + multiple ✅ | size 2 × variant 2 | 4 | ~~Add axes~~ **Done (wave 1)** | done |
| Spinner | single (correct) | — | 0 | — | — |

**Actions subtotal: 323 cells measured** (Button 125, LinkButton 60, SocialButton 54, CompactButton 45, FancyButton 30, ToggleGroup 4, ButtonTile 3, Toolbar 2).

### 4.2 Forms 〔required: R2 — size 3 (sm/md/lg) × state 5 (default/focus/disabled/error/loading) × label; R3 for selection controls〕

| Component | Current axes (measured) | Target axes | Cells | Action | Priority |
|---|---|---|---|---|---|
| Input | size 3 + labelPlacement 2 (top/left) + prefix/suffix | size 3 × label 2 | 3 (size counted; labelPlacement is a layout axis, not a canonical variant) | ~~Label-placement axis~~ **Done (wave 2)** — added `labelPlacement` | done |
| Textarea | size 3 (sm/md/lg) + error | size 3 | 3 | ~~Add size~~ **Done (wave 2)** — was missing entirely | done |
| Select | size 3 + error | size 3 | 3 | Docs matrix done; `multiple` left to a Select page pass | P2c |
| Checkbox | intent 5 × size 3 (was already at target — table was stale) | intent 5 × size 3 | 15 | Already at target | — |
| RadioGroup | intent 5 × orientation 2 × size 3 | intent 5 × orientation 2 × size 3 | 30 | ~~Add size~~ **Done (wave 2)** | done |
| Switch | intent 5 × size 3 (was already at target — table was stale) | intent 5 × size 3 | 15 | Already at target | — |
| Slider | intent 5 × orientation 2 (h/v) × size 3 | intent 5 × orientation 2 × size 3 | 30 | ~~Vertical + size~~ **Done (wave 2)** | done |
| NumberInput | size 3 (sm/md/lg) | size 3 | 3 | ~~Add size lg~~ **Done (wave 2)** | done |
| DigitInput | size 3 (sm/md/lg) + error + keyboard model | size 3 | 3 | ~~Add size~~ **Done (wave 2)** | done |
| SearchInput | size 3 + shortcut | size 3 | 3 | Docs matrix done | — |
| TextareaCounter | single (sub-part of Textarea) | — | 0 | Document on Textarea page | P2c |
| Rating | size 3 × tone 3 (default/accent/danger) | size 3 × tone 3 | 9 | ~~Tone axis~~ **Done (wave 2)** | done |
| ColorPicker | swatch + custom | — | 0 | Document | P2c |
| Combobox | size 3 (sm/md/lg) | size 3 | 3 | ~~Add size lg~~ **Done (wave 2)**; `multiple` deferred | done |
| ChatInput | single (AI-optimized) | — | 0 | Document | P2c |
| SelectionCard | variant 2 (card/inline) | variant 2 | 2 | ~~Variant axis~~ **Done (wave 2)** | done |
| Datepicker | size 2 (sm/md) | size 2 × view 3 × range | 2 (size counted) | ~~Add size~~ **Done (wave 2)**; month/year views + range picker still open | P2b |
| TimePicker | single | size 2 | 0 | Document | P2c |
| Label & Hint | tone 3 (default/error/success) | — | 0 | Already fine | — |

**Forms subtotal: 124 cells measured** (RadioGroup 30, Slider 30, Checkbox 15, Switch 15, Rating 9, then 3 each: Input/Textarea/Select/NumberInput/DigitInput/SearchInput/Combobox, 2 each: SelectionCard/Datepicker). Open remainders: Datepicker views + range, Combobox `multiple`, and documentation-only P2c items.

### 4.3 Data display 〔required: R4 — tone 5 × variant 2–3 × size 3; R8 for containers — density 2 × variant/elevation 2–3〕

Measured 2026-09-18 after wave 3 (data display). ✅ = landed in wave 3.

| Component | Measured axes | Cells | Note |
|---|---|---|---|
| Avatar | ✅ tone 5 × shape 3 (circle/rounded/square) × size 5 × status 3 | 225 | `square` boolean kept as alias for `shape="square"` |
| Chip | color 10 × variant 7 × size 3 (+selected/removable) | 210 | Already rich — documented grid |
| Badge | ✅ tone 5 × placement 4 × size 3 (+dot) | 60 | Dot scales with size |
| FeaturedIcon | tone 5 × size 4 × variant 3 (soft/solid/gradient) | 60 | Already at target |
| AvatarGroupCompact | tone 5 × size 4 × variant 2 | 40 | Already at target |
| Tag | ✅ intent 5 × variant 2 (stroke/gray) × size 3 (+removable) | 30 | Tone colours the stroke variant only |
| StatusBadge | status 5 × variant 2 × size 2 | 20 | `info` already renders the accent dot, `disabled` the neutral one — the roadmap's "add neutral/accent" is satisfied by existing names, so no alias statuses added |
| Progress | tone 5 × size 3 | 15 | Already at target |
| PaymentCard | ✅ brand 4 (visa/mastercard/amex/unionpay) × variant 3 | 12 | unionpay mark added |
| InlineMessage | ✅ tone 5 × variant 2 (plain/boxed) | 10 | boxed lifts the message onto its own surface |
| ActivityItem | tone 5 × density 2 | 10 | |
| Table | ✅ variant 3 (bordered/split/flush) × density 2 | 6 | |
| InfoLabel | tone 5 | 5 | (table once said "tone 3" — it already had all five) |
| CircularProgress | tone 5 | 5 | `size` is a px number (continuous), documented — not a 3-step axis |
| Timeline | tone 5 | 5 | |
| AvatarGroup | size 4 | 4 | tone flows from the member avatars |
| Card | ✅ variant 3 (default/bordered/elevated) | 3 | elevation 0–4 numeric stays uncounted; bordered ignores elevation |
| EmptyState | ✅ variant 3 (default/minimal/cta) — More.tsx; size 3 (sm/md/lg) — ProductPatterns | 3 + 3 | two same-named components; the audit counts both |
| Well | variant 3 (default/inset/dashed) | 3 | |
| DataTable | density 2 | 2 | sort/selection/loading/pagination are behaviour, documented |
| WidgetBox | ✅ density 2 (comfortable/compact) | 2 | |
| Skeleton / ListItem / DataCard / StatGrid / CardGrid / LoadingState / ErrorState | no counted axes | 0 | CSS-class-driven or behaviour-only; tone/density axes deferred to P2c+ |

**Data display subtotal: 733 cells (measured, both EmptyState rows included). Pre-wave-3 measured value was 493; the old ≈263 subtotal in this table was stale.**

### 4.4 Navigation 〔required: R6 — variant 2–4 × orientation × size 2–3〕

| Component | Current axes | Target axes | Cells | Action | Priority |
|---|---|---|---|---|---|
| Tabs | variant 4 (solid/underline/pill/segment) × size 3 | + orientation 2 (h/v) | 24 | Vertical via shared impl | P2a |
| SegmentedControl | size 2 | size 3 × variant 2 (filled/outline) | 6 | Axes | P2a |
| VerticalTabMenu | single + active | size 2 | 2 | Document | P2c |
| Stepper (Horizontal/Vertical/Dot) | 3 form factors + status states | × size 3 | 9 | Shared size axis | P2b |
| Breadcrumbs | single | size 2 | 2 | Document | P2c |
| Pagination | single | size 2 × variant 2 (default/pill) | 4 | Axes | P2b |
| SideNavItem | single + active | size 2 | 2 | Document | P2c |

**Navigation subtotal: ≈ 49 cells.**

### 4.5 Feedback & overlays 〔required: R5 — size 3–5 × placement 4; R7 — tone 5 × variant 2–3 × size 2–3〕

| Component | Current axes | Target axes | Cells | Action | Priority |
|---|---|---|---|---|---|
| Alert | tone 5 × variant 3 (soft/outline/solid) × size 2 ✅ | tone 5 × variant 3 × size 2 | 30 | ~~Full tones × size~~ **Done (wave 1)** | done |
| Banner | tone 5 × variant 3 (filled/light/stroke) | + size 2 | 30 | Size axis | P2a |
| Notification | tone 5 × variant 3 (stroke/filled/light) × size 2 ✅ | tone 5 × variant 3 × size 2 | 30 | ~~Axes~~ **Done (wave 1)** — actual variant axis is 3, not 2 (30 > 20 target) | done |
| Toast (provider) | placement 4 (provider) ✅ · tone 5 on `push()` | placement 4 × tone 5 | 4 (placement counted; tone lives on `push(options)`) | ~~Placement + tone matrix~~ **Done (wave 1)** — provider `placement`, tone per push | done |
| Tooltip | placement 4 + arrow | — | 4 | Already at target | — |
| Modal | size 5 (sm–full) × placement 2 | — | 10 | Already at target | — |
| Drawer | side 3 × size 3 (sm 320 / md 400 / lg 560) + explicit `width` ✅ | side 3 × size 3 | 9 | ~~Size axis~~ **Done (wave 1)** | done |
| AlertDialog | tone 3 (danger/accent/default) | tone 3 | 3 | Already fine | — |
| Popover | placement 4 | — | 4 | Already at target | — |
| Dropdown | placement 4 × size 2 (176/240px menu) ✅ | placement 4 × size 2 | 8 | ~~Size axis~~ **Done (wave 1)** | done |
| Menu (Item/Separator/Label) | composition | variant (default/divided) | 2 | Document | P2c |
| HoverCard / ProfileHoverCard | single | — | 2 | Document | P2c |
| SelectTrigger | size 3 | — | 3 | Already fine | — |

**Feedback subtotal: 115 cells measured** (Alert 30, Notification 30, Banner 15, Modal 10, Drawer 9, Dropdown 8, ToastProvider 4, Tooltip 4, AlertDialog 3, MenuItem 2 — Banner `size` axis still open, P2a).

### 4.6 PRO / AI / fintech + product patterns 〔required: R2/R8 as applicable〕

| Component | Current axes | Target axes | Cells | Action | Priority |
|---|---|---|---|---|---|
| AiPromptInput | single + loading | size 2 × mode 2 (plain/attached) | 4 | Axes | P2b |
| CurrencyAmountInput | currency + size | currency 3 × size 3 | 9 | Document | P2b |
| CryptoAddressChip | copy state | — | 2 | Document | P2c |
| VoiceVisualizer | single | — | 1 | Document | P2c |
| CommandMenu | single + controlled | — | 1 | Document (search v2 reuses it) | P2c |
| FileUploader | drag/progress/error states | size 2 | 2 | Document | P2b |
| Filters | density-ish | variant 2 (sidebar/inline) | 2 | Axes | P2c |
| Calendar | single | range on/off | 2 | Document | P2c |
| PageHeader | single | size 2 | 2 | Document | P2c |
| SearchBar | single | size 2 | 2 | Document | P2c |
| FilterBar / FilterChip | chip states | chip: tone 3 × selected 2 | 6 | Axes | P2b |
| SortMenu | single | — | 1 | Document | P2c |
| SettingsSection / SettingsToggle | single | — | 2 | Document | P2c |
| CopyField | single | — | 1 | Document | P2c |

**PRO/product subtotal: ≈ 37 cells.**

### 4.7 Matrix total

| Group | Target meaningful cells |
|---|---|
| Actions | 237 |
| Forms | 150 |
| Data display | 628 |
| Navigation | 49 |
| Feedback & overlays | 148 |
| PRO / product patterns | 37 |
| **Total** | **≈ 1,249 core cells** |

Measured **baseline: 853** (2026-09-18, before Phase 2 — the system is further along than this plan initially assumed: Chip, Avatar, FeaturedIcon and the Badge/StatusBadge families already carry most of their cells). **✅ The 1,000+ milestone was crossed in Phase 2 wave 1 (1,051 cells, Actions + Feedback depth), extended in wave 2 (1,114, Forms depth) and again in wave 3: measured 1,354 cells** (Data display — Avatar shape 3, Badge size 3, Tag intent 5 + size 3, Card variant 3, Table variant 3 + density 2, InlineMessage variant 2, WidgetBox density 2, PaymentCard +unionpay, EmptyState variant 3). Remaining gap: mostly **missing axes** (Banner `size`, Tabs orientation, Stepper size, Datepicker views + range, Combobox `multiple`) plus **documenting cells that already exist**. State matrix coverage is measured separately (target: 100% of interactive components on disabled/focus; ≥90% on loading/error where meaningful).

### 4.8 Core-36 (Phase 2 first wave, in order)

Button, Input, Select, Checkbox, RadioGroup, Switch, Alert, Badge, Tag, Chip, StatusBadge, Avatar, Card, Modal, Drawer, Dropdown, Menu, Tooltip, Tabs, Table, DataTable, Pagination, EmptyState, Progress, Textarea, Combobox, NumberInput, Datepicker, FancyButton, CompactButton, LinkButton, SocialButton, Banner, Toast, Stepper, SegmentedControl.

Each core-36 component ships: full matrix in code → matrix rendered on its docs page → unit test for one interaction per axis → visual baseline (both themes). This is the "1,000 meaningful variants" engine.

---

## 5. Phase 2 — Component depth 〔3–4 weeks〕

| # | Item | Acceptance | Effort |
|---|---|---|---|
| 2.1 | Core-36 matrix roll-out per §4.8 (wave 1: Actions + Feedback, wave 2: Forms + Data display) | `audit:variants` ≥ 1,000 cells (from 853 baseline); core-36 docs pages 100% conform to anatomy | L |
| 2.2 | **State-matrix uplift** — loading on 100% of action components; error on 100% of inputs; empty on 100% of list/table components; controlled/uncontrolled parity on all form primitives (27%→100%) | Component-audit columns move; audit table regenerated | L |
| 2.3 | **Per-component live playground** (carried over from 2026-09-17 P2.1): schema-driven `<Playground>` — knobs per prop mutate the live preview **and** the copyable JSX. Roll out to core-36 first | No stale `code` strings on core-36 pages; knobs + code + preview in sync | L |
| 2.4 | **Docs anatomy enforcement** (from 1.3) rolled out to all ~70 component pages | design-lint section check green | M |
| 2.5 | `asChild`/polymorphism on all action-like components (5%→100% of actions) | Audit column; rendered `<a>`/`<button>` swap tests | S |
| 2.6 | Visual baselines 29 → 60 (all core-36 pages × light/dark) | `test:browser` green | M |

---

## 6. Phase 3 — Blocks: 30 → 100+ 〔3–4 weeks〕

A block = a copy-paste product section composed **only** of library components, registered in the `BLOCKS` registry (`BlockDef`: key/title/category/description/render/span/pro), with a source snippet in docs. Convention in `CONVENTIONS.md` §6.

**Existing (30):** auth card, verify (OTP), onboarding, stats, table, command menu, profile, notifications, upload, usage, settings (3 tabs), rating, general/notifications/security sections, template-analytics/settings/billing/team, hero ×4, logos, features, features-bento, pricing, how-it-works, integrations, newsletter, stats-band, testimonials, cta, faq.

**Add (70+), by category — every entry named, no placeholders:**

### Authentication (12 → 22)
Register · Forgot password · Reset password · Magic link · 2FA (TOTP) · Social login wall · Email verification (full page) · Account recovery · Session expired · Password strength meter · Login (split layout) · Login (with terms/consent row)

### Marketing (14 → 26)
Pricing (3-tier annual/monthly toggle) · Pricing (comparison table) · Comparison (us-vs-them) · Stats (count-up band) · Testimonials (masonry) · Logo cloud (grayscale hover) · Features (icon list) · Features (sticky two-column) · CTA (inverse) · Newsletter (with validation) · FAQ (two-column) · Changelog (timeline) · Integrations (searchable grid) · How it works (3-step) · Roadmap (public) · Careers / join the team

### Dashboard (4 → 14)
SaaS dashboard · Finance dashboard · CRM dashboard · HR dashboard · Project dashboard · DevOps/infrastructure dashboard · Support/helpdesk dashboard · Sales pipeline dashboard · Marketing performance · Logistics/shipping · Subscription/billing overview · AI ops dashboard

### Application (10 → 24)
Team management · Billing (invoices + card) · API keys · Audit log · Permissions/roles · Preferences (dense settings) · Search results (command-style) · Empty-state set (6: no data, no results, error, offline, unauthenticated, trial expired) · Notifications center (grouped) · Activity stream (with filters) · Integrations setup (connect flow) · Onboarding checklist (progress-driven)

### Commerce (0 → 10)
Product grid · Product card (with hover swap) · Product detail (gallery + variants) · Cart (line items) · Checkout (one-page) · Payment methods (existing PaymentCard + list) · Order history (table) · Reviews (with rating) · Wishlist · Coupon/discount row

### Data & AI (0 → 8)
Kanban board (drag preview) · Calendar month (with events) · File manager (grid/list) · Timeline board · Model picker (AI) · Prompt playground (AI) · Agent run (status + logs) · Evaluation report (score + diff)

**Subtotal: 30 existing + 80 new = 110.** Tiers: **T1 (24)** = the dashboard + auth + commerce set most likely to be copied first; **T2 (36)**; **T3 (50+)** long tail. Every block: light+dark, 320→1440 responsive, axe-clean, visual baseline, source snippet.

**Exit:** `BLOCKS` registry ≥ 100; all 8 categories ≥ 8 blocks; Blocks page filterable by category; each block deep-linkable (`#/blocks/<key>`).

---

## 7. Phase 4 — Widget library: 0 → 50+ 〔2–3 weeks〕

A widget = one dashboard card: metric + trend + micro-visualization + footer action, built from `WidgetBox`, `DataCard`, `StatGrid`, `Progress`, `Sparkline*` primitives.

**Step 1 — Widget primitives (new, ~6 small components):** `Metric` (label + value + delta pill), `Sparkline` (SVG path, tokenized), `BarList` (horizontal bars), `Donut` (SVG, tokenized), `Heatmap` (grid, tokenized), `MiniTimeline`. All R8 (density 2), all tokenized, all a11y-verified (non-essential viz `aria-hidden`, real data available as text).

**Step 2 — Named widgets (56):**

| Category | Widgets |
|---|---|
| Analytics (8) | Revenue, Active users, Conversion rate, Traffic sources, Retention, Growth (WOW/MOM), Session duration, Funnel step |
| Finance (6) | Balance, Transactions (list), Expenses (bars), Cash flow (dual spark), Invoices (status list), FX rate |
| CRM (6) | Pipeline (stage bars), Leads (new/conversion), Contacts (growth), Activities (feed), Deals by stage (donut), Follow-ups (due list) |
| HR (5) | Headcount, Attendance (heatmap), Leave (calendar mini), Payroll (run status), Open roles |
| AI (6) | Token usage, Model spend, Requests (RPS), Latency (p50/p95), Error rate, Cache hit rate |
| Ops (6) | Uptime, CPU/Mem (dual bar), Disk, Network I/O, Error budget, Deploys (timeline mini) |
| Productivity (6) | Tasks (due today), Calendar mini, Goals (progress), Inbox count, SLA status, Roadmap snapshot |
| Common (3) | Team online (AvatarGroup), Storage used, System status |

Each widget ships: `WIDGETS` registry entry (key/category/render/data-samples), a mock-data module (`src/blocks/widget-data.ts` — deterministic, no dates), docs page with the full grid, and reuse in ≥2 Phase 5 templates.

**Exit:** ≥ 50 widgets; widgets page with category filters; every widget renders at 280/320/380px card widths; deterministic mock data keeps smoke + visual tests stable.

---

## 8. Phase 5 — Templates: 5 → 10 〔3–4 weeks〕

A template = a complete multi-page application shell (sidebar + header + auth + dashboard + tables + forms + settings + empty states), dark-mode, 320→1440, gated. Each template reuses blocks (§6) + widgets (§7) — templates must not hand-build what a block already is.

**Completion checklist per template (all 11 required):**

1. Sidebar (collapsible, mobile drawer) 2. Topbar (search ⌘K, notifications, user menu) 3. Auth flow (login + at least one of register/2FA) 4. Dashboard (widgets + data table) 5. Data table page (filters, sort, selection, pagination) 6. Form page (≥1 multi-section form with validation) 7. Settings (tabs) 8. Empty states (≥2 screens) 9. Loading states (skeleton pass) 10. Responsive 320/768/1440 verified 11. Dark mode verified (visual baseline)

| Template | Status | Pages |
|---|---|---|
| Analytics Dashboard | ✅ exists (upgrade to checklist) | 5 |
| AI & Neural Studio | ✅ exists (upgrade) | 4 |
| Settings Screen | ✅ exists (upgrade) | 3 |
| Billing & Plans | ✅ exists (upgrade) | 4 |
| Team & People | ✅ exists (upgrade) | 4 |
| **CRM** (new) | pipeline kanban + contacts table + deal detail + activities | 6 |
| **Finance** (new) | dashboard + transactions + invoices + cash-flow | 5 |
| **HR** (new) | dashboard + employees + leave + payroll | 5 |
| **E-commerce admin** (new) | products + orders + customers + settings | 6 |
| **Project management** (new) | board + backlog table + sprint + team | 6 |
| **Support / helpdesk** (new) | inbox + tickets table + agent settings | 5 |
| **DevOps** (new, stretch) | services + deploys + alerts + usage | 5 |

**Exit:** 10 templates, each passing the 11-point checklist; templates index page with thumbnail + stack; total app routes added ≈ 55 (all smoke + axe + contrast-gated).

---

## 9. Docs product spec (applies to all phases)

Every component page, in this exact order (enforced by the 1.3 lint):

```
1.  Title + one-line description
2.  Overview preview (default + one rich example)
3.  Variants        — full matrix grid, light+dark
4.  Sizes
5.  States          — default / hover / active / focus / disabled / loading / error
6.  With icons      — text / icon / icon+text / icon-only
7.  Composition     — real-world assembly (2–3 examples)
8.  Accessibility   — keyboard, screen reader, focus behavior (facts, not prose)
9.  API             — complete props table (script-checked vs TS types)
10. Source          — copy + full source
```

Site structure target (nav already matches; missing leaves filled in Phases 1–5):

```
Getting Started: Introduction · Installation · Design Principles · Changelog
Foundations:     Color · Typography · Spacing & Layout · Sizing · Radius & Elevation
                · Borders · Opacity & Z-index · Motion · Breakpoints · Iconography
                · Accessibility · Token Reference · Themes
Components:      (existing groups, anatomy §9 on every page)
Blocks:          All Blocks (category filters, deep links)
Widgets:         Widget gallery (category filters)
Templates:       10 full apps + index
Theme Studio:    (Track B)
Resources:       Figma · Icons · Tokens · Changelog · Roadmap
```

---

## 10. Phase 6 — Figma (start with tokens; components after core-36)

Goal: **one design language → Figma + React + Tailwind + docs**, with the mapping checkable by script.

| # | Item | Deliverable | Acceptance |
|---|---|---|---|
| 6.1 | Token export (from 1.4) | `tokens.json` + `figma-variables.csv` (Tokens Studio import format): color ramps (12 accent presets × 11 steps + neutrals + status), type scale, spacing, radius scale, elevation, motion, opacity, z-index | Import into Figma Variables without manual fixes |
| 6.2 | Figma Foundations file | Variables → styles (text styles, effect styles) mirroring `src/index.css` layers 1:1 | Style name = token name (enforced by naming convention) |
| 6.3 | Core-30 component sets in Figma | Button first (5×5×5 + states as the reference), then the core-30 per §4.8 | Variant property names = prop names (`variant`, `tone`, `size`, `loading`) |
| 6.4 | Icon subset | Curated Remix set (the existing curated catalogue, ~200 icons) exported as Figma components | 1:1 name match with `src/lib/icons.ts` |
| 6.5 | **Mapping manifest** | `figma-mapping.json`: figma-component ↔ token set ↔ react export ↔ tailwind classes ↔ docs route | `scripts/figma-check.mjs` fails CI if the manifest drifts from code exports |
| 6.6 | Blocks/patterns (stretch) | Top-20 T1 blocks as Figma frames | Counted in the mapping manifest |

**Not in scope:** rebuilding AlignUI's 8,000-instance catalogue. 30 well-mapped Figma components + full token parity beats 8,000 unmapped instances.

---

## 11. Track A — Packaging & distribution (parallel from Phase 2)

| # | Item | Acceptance |
|---|---|---|
| A.1 | Barrel `src/ui/index.ts` (explicit exports) + CSS entry | Tree-shakeable; no cycles |
| A.2 | Vite **library** build (ESM + `d.ts` via `tsc`), `exports` map, peer deps `react`/`react-dom`, deps `clsx`/`tailwind-merge` | `npm pack` → install into a fresh Vite+Tailwind app → Button/Select/Modal render (CI job) |
| A.3 | Publish `@unseen-ui/react` + `@unseen-ui/tokens` (JSON + CSS) | Real semver releases; install docs on the Installation page match reality |
| A.4 | **Monorepo split** (`packages/{ui,tokens,icons}` + `apps/docs`) — mechanical because of A.1/A.3 | Same gates run per-package + per-app |
| A.5 | **Registry + CLI** — each component/block has a `registry.json` (files, deps, tokens); `npx @unseen-ui/cli add button|login-block` copies source into the user's project (copy-paste model, no runtime dependency — AlignUI's distribution idea, our token-first implementation) | CLI installs 3 components + 2 blocks into a fresh app; `diff` shows token-safe output |
| A.6 | CHANGELOG + versioning + migration notes | Every release; `Changelog` docs page generated from it |

---

## 12. Track B — Theme Studio v2 + Search v2 (parallel from Phase 1)

**Theme Studio v2** — turn the shell's accent/radius toggles into a first-class generator page:

```
Brand:        primary hex/OKLCH → 11-step ramp (existing engine) · secondary · 4 status tones
Typography:   font pair (Inter now) · heading weight · body weight
Shape:        radius scale (existing 0–2.25) · density (compact/base/comfortable — 1.6)
Appearance:   light / dark / system
Preview:      live — Button · Input · Card · Table · Modal · Dropdown · Dashboard · Form · Navigation
Export:       [ CSS variables ] [ Tailwind v4 @theme ] [ JSON / Style Dictionary ] [ Copy ]
Share:        URL-encodable theme hash (deterministic) · preset gallery (12 → 20)
```

Acceptance: every export round-trips (import the JSON back → identical CSS); preview mutates on every control; presets persisted; page gated (smoke + axe + visual). This is the differentiator vs AlignUI — ship it as a **product**, not a settings panel.

**Search v2** — extend the ⌘K palette from 100 nav items to a full index:

- Sources: components (+ **props** — "search a prop name"), blocks (30→100+), widgets, templates, foundations, icons (curated 200 + Remix catalogue), doc sections, code examples
- UX: grouped results, recents, keyboard-full, jump-to-prop anchors, no-results suggestions
- Acceptance: `button` query returns Button, Compact Button, Fancy Button, Button Group (components) + Login button group (block) + checkout (template example); p95 < 50ms client-side.

---

## 13. Phasing, order, dependencies

```
Phase 1  Conventions + measurement + foundations  ──┐
                                                    ├─► v1.0
Track B  Theme Studio v2 + Search v2  (starts P1)  ──┤
Phase 2  Component depth (core-36)        (after P1) ┤
Phase 3  Blocks 100+                      (during P2) ┤
Phase 4  Widgets 50+                      (after P3 T1)│
Phase 5  Templates 10                     (after P3/P4)│
Phase 6  Figma (tokens start at P1.4)     (6.3 after P2)┤
Track A  Packaging A.1–A.3 (after P2) → A.4–A.6 (after P3) ┘
```

| Phase | Duration | Gate to enter | Gate to exit |
|---|---|---|---|
| 1 | 1–2 w | — | `audit:variants` baseline; anatomy lint green; tokens.json; 13 foundations |
| 2 | 3–4 w | P1 exit | ≥1,000 counted cells; state uplift; core-36 playgrounds; 60 baselines |
| 3 | 3–4 w | P2 wave 1 | 100+ blocks, all 8 categories, deep links, gated |
| 4 | 2–3 w | 3 T1 blocks | 50+ widgets, registry, reused in ≥2 templates each |
| 5 | 3–4 w | 4 exit | 10 templates × 11-point checklist |
| 6 | 2–3 w | tokens.json (P1) + core-36 (P2) | Figma import clean; mapping manifest CI-checked |
| A | 4–6 w | core-36 | `npm i @unseen-ui/react` CI install green; CLI works |

**Total to v1.0: ≈ 16–20 weeks of focused work** (parallel tracks fold ~3 weeks).

---

## 14. Metrics — how progress is judged

One dashboard, five scripts (all under `npm run`):

| Metric | Script | v1.0 target |
|---|---|---|
| Meaningful variant cells | `audit:variants` (new) | ≥ 1,000 |
| State coverage (D/L/E/C/P) | `audit:components` (existing) | D 100% interactive · L 100% actions · E 100% inputs · C 100% forms |
| Docs anatomy compliance | design-lint (extended) | 100% component pages |
| a11y | axe (existing, expanded to new routes) | 0 violations, all routes × themes |
| Blocks / widgets / templates | registry lengths | 100 / 50 / 10 |
| Figma mapping | `figma-check` | 100% of core-30 mapped |
| Package | CI install job | green |

**Anti-goal tracking (also on the dashboard):** raw export count, raw docs-page count, and "variant" counts that fail the §3 test are **not** progress. A 900-cell coherent system beats a 3,000-cell pile.

---

## 15. Risks & explicit non-goals

| Risk | Mitigation |
|---|---|
| Variant counting drifts into inflation | §3 counting law enforced by script; states counted separately |
| Blocks/widgets become one-off compositions | `CONVENTIONS.md` §6: blocks may use library components only; registry + lint enforce composition from `src/ui` |
| Monorepo split before library build works | Track A order is fixed: barrel → lib build → publish → split |
| Figma file diverges from code | Mapping manifest in CI (6.5) — Figma is a *projection* of tokens + core-30, never a second source of truth |
| Scope creep to AlignUI's paid territory | Non-goals below |

**Non-goals:** copying AlignUI's visuals; 8,000-instance Figma catalogue; new runtime dependencies (token-first, dependency-light stays); shipping before `npm test` + `npm run test:browser` are green.

---

## 16. First two weeks, concretely

1. Land `CONVENTIONS.md` (done) + this roadmap (done) + README pointers (done).
2. `scripts/variant-audit.mjs` (done — baseline 853 committed in `audit/variant-audit-baseline.json`; `npm run audit:variants` fails on regression). Remaining: fold into the `npm test` chain once Phase 2 starts moving numbers.
3. ~~Design-lint: docs-anatomy section check; run on core-36, fix what fails.~~ ✅ done (core-36 API sections now enforced + fixed).
4. ~~`tokens.json` export script + first diff-clean run.~~ ✅ done (`npm run tokens:export` / `tokens:check`, committed in `tokens/`).
5. ~~Foundations pages: Sizing · Borders · Opacity & Z-index · Breakpoints · Themes.~~ ✅ done (13 foundations, 106 routes gated).
6. Density tokens (`--density-*`) wired into DataTable/ActivityItem/SettingsSection as the reference consumers.

Everything else follows the dependency graph in §13.
