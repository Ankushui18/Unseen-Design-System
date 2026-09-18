# Unseen Conventions

The binding conventions for Unseen. A component that violates these is not "done" — it fails review even if it renders. The `UNSEEN-V2-ROADMAP.md` is the *plan*; this file is the *system*.

**Enforcement:** where a rule is checkable, it is checked — `npm run lint:design` (tokens, docs anatomy), `npm run audit:components` (states, a11y), `npm run audit:variants` (matrix cells), `npm test` (everything else). If a rule here is not yet enforced, file it as a Phase 1 item; do not build around it.

---

## 1. The variant matrix

Every component declares **axes** as typed prop unions. A cell = one combination of axis values. Cells are the unit of system scale: they must be *implemented, tokenized, and documented* to count (roadmap §3).

### 1.1 Canonical axis names

| Axis | Prop name | Values (canonical set) |
|---|---|---|
| Intent | `tone` | `accent · default · success · warning · danger` |
| Mode / look | `variant` | `solid · soft · outline · ghost · link` (actions); `default · stroke · …` (others) |
| Size | `size` | from the **size scale**: `xxs · xs · sm · md · lg` (actions), `sm · md · lg` (forms/containers) |
| Shape | `shape` | `circle · rounded · square` (avatars etc.) |
| Placement | `placement` | `top · bottom · left · right` (+ `*-start`/`*-end`) — `side` aliases it on edge overlays (Drawer) |
| Density | `density` | `comfortable · compact` |
| State (not an axis) | — | `loading · disabled · error · empty` — props, measured separately |

**One name per axis across the system.** `color` may alias `tone` and `isLoading` may alias `loading` (HeroUI ergonomics, as in `Button`) — aliases are the *only* way to diverge.

**The vocabulary law (`COMPONENT-QUALITY-SPEC.md` §3).** Canonical props are the API of record. Human-facing display names (Primary/Filled/XS) exist only in docs and playground. AlignUI-shaped shorthand is allowed **only** through a declared alias layer:

- alias types are exported and named `*Alias` (e.g. `IntentAlias`) — the suffix is what makes `variant-audit` exclude them, because **aliases are ergonomics, not cells**;
- one mapping table per axis, defined once in the component's module, unit-tested, never duplicated in docs;
- precedence is total: canonical prop → alias prop → shorthand inside `variant`;
- aliases are additive forever and never change rendered output (assert class-identical output in tests).

Reference implementation: `src/ui/Button.tsx` + `tests/button-vocabulary.test.tsx`.

### 1.2 Required axes by category (R1–R8)

| Rule | Category | Required axes | Minimum |
|---|---|---|---|
| R1 | Actions (Button, Compact, Fancy, Link, Social, Tile) | `tone` × `variant` × `size` + icon content | 5 × 3 × 3, icon-only variant |
| R2 | Form fields (Input, Textarea, Select, Number, Search, …) | `size` × state (default/focus/disabled/error/loading) × label | 3 × 5 |
| R3 | Selection (Checkbox, RadioGroup, Switch) | `size` × state | 3 × 5 |
| R4 | Indicators (Badge, Tag, Chip, StatusBadge, Avatar, Progress) | `tone` × `variant` × `size` (tone where meaningful) | 5 × 2 × 3 |
| R5 | Overlays (Modal, Drawer, AlertDialog, Popover, Tooltip, Dropdown) | `size` presets × `placement` (where applicable) | 3 × 4 |
| R6 | Navigation (Tabs, Segmented, Stepper, Breadcrumbs, Pagination) | `variant` × orientation × `size` | 2 × 2 × 2 |
| R7 | Feedback (Alert, Banner, Notification, Toast) | `tone` × `variant` × `size` | 5 × 2 × 2 |
| R8 | Containers (Card, Well, Table, DataTable, WidgetBox, StatGrid) | `density` × `variant`/`elevation` | 2 × 2 |

Adding a component to a category inherits the rule. Deviating is allowed only with a note in the component's doc page under Accessibility/API ("deviates: …").

### 1.3 Matrix rules

1. **Cells must be real.** A cell that resolves to identical styles as another cell is a no-op — remove it or make it distinct.
2. **No hover-as-variant.** States are never counted or rendered as matrix cells; they live in the state section.
3. **New axis ⇒ new cell coverage.** Adding `size="xl"` to Button means documenting 5×5 cells at that size.
4. **Aliased unions stay exported.** `export type Tone = …` from the defining module (Button), imported elsewhere — one definition per axis value set.
5. **Aliases are not cells.** A `*Alias` union member is excluded from the cell product by `variant-audit` and reported separately (`aliases` in `--json`).

---

## 2. Component API

1. **Props + composition slots, not compound namespaces.** `<Select options …>` stays; `Select.Root/Select.Item` only where a component genuinely outgrows prop-driven composition (current candidates: `Menu`, `CommandMenu`, `DataTable`).
2. **Actions are polymorphic.** Every action-like component supports `asChild` and/or `href` (R1 components: both).
3. **Controlled/uncontrolled parity.** Every input-ish component accepts `value` + `onChange` **and** `defaultValue`.
4. **States are API.** `loading`, `disabled`, `error` (and `empty` for lists) are documented props with defined behavior (aria-busy, disabled semantics, error messaging via `aria-describedby`).
5. **Refs forward.** `forwardRef` on every public component.
6. **`className` last.** Every component merges caller classes via `cn` after its own styles; radius/type tokens registered in `extendTailwindMerge` (existing contract, locked by `tests/cn.test.ts`).
7. **Data props, not children, for repeated structures.** `items`, `options`, `rows` — children only for free composition (card content, menu slots).
8. **No new runtime dependencies.** Primitives stay in-house. Exception = deliberate, documented in the roadmap.

---

## 3. Naming

| Thing | Rule | Example |
|---|---|---|
| Component | PascalCase, noun-first, no `React`/`UI` suffix | `StatusBadge`, not `BadgeStatus` |
| Sub-parts | parent-prefixed, exported from parent's module | `CardHeader`, `MenuItem` |
| Module file | `src/ui/<Category>.tsx` (existing 10 modules stay; new category ⇒ new module + `ui/index.ts` export) | `src/ui/Feedback.tsx` |
| Route / docs page | kebab-case, one per public component (sub-parts ride the parent page) | `components/status-badge` |
| Token (primitive) | `--<family>-<step>` | `--accent-500` |
| Token (semantic) | `--<role>` | `--surface`, `--field`, `--border` |
| Token (component) | `--<component>-<role>` | `--btn-padding` |
| Block key | kebab-case, `<name>` or `<name>-<variant>` | `login-split`, `pricing-annual` |
| Widget key | kebab-case, `<metric>` | `token-usage` |
| Figma component | **exact PascalCase match** of the React export | `Button` in Figma = `Button` in code |

Component names are also Figma names and registry keys (Track A). Renaming a public component = major version, not a refactor.

---

## 4. Accessibility (non-negotiables)

1. **Native semantics first.** `<button>`, `<input>`, `<label>`, `<table>`; roles only when semantics can't be native (`role="switch"`, `role="tablist"`).
2. **Every interactive element has an accessible name** — visible label, `aria-label`, or `aria-labelledby`. Unlabeled = axe failure = gate failure.
3. **Focus is visible and managed:** `:focus-visible` ring on every interactive component; modal/drawer/command menus trap focus, return it on close, and lock body scroll.
4. **Keyboard:** Enter/Space activate; arrows navigate within roving groups (Tabs, radio, listbox, stepper); Escape closes overlays; Home/End on pagination.
5. **State is announced:** `aria-busy` on loading, `aria-invalid` + described error text, `aria-current` on nav, `aria-sort` on sortable `th` (existing contract).
6. **Motion respects `prefers-reduced-motion`** (token-driven; one rule, all components).
7. **Contrast:** WCAG AA on all token pairs in both themes — enforced by the real-browser axe pass (color-contrast rule), not by taste.
8. **Non-text viz is decorative** (`aria-hidden`) unless it carries unique data, which then gets a text alternative.

---

## 5. Docs page anatomy (enforced)

Exact section order, all present on every component page:

1. Title + one-line description
2. Overview preview (default + one rich example)
3. **Variants** — full matrix grid (every §1.2 cell), light + dark
4. **Sizes**
5. **States** — default / hover / active / focus / disabled / loading / error
6. **With icons** — text / icon / icon+text / icon-only (where applicable)
7. **Composition** — 2–3 real-world assemblies
8. **Accessibility** — keyboard, screen reader, focus behavior; facts, not prose
9. **API** — complete props table; script-checked against TS types (design-lint)
10. **Source** — copy + full source

Blocks/widgets/templates pages follow the same spine: preview → gallery (category filters, deep links) → anatomy section (how to assemble, which components it uses) → accessibility → source.

---

## 6. Blocks & widgets

**Block** = a product section composed **only** of `src/ui` components + block-local layout. No hand-rolled primitives, no new tokens, no raw values.

```ts
type BlockDef = {
  key: string;            // kebab-case, unique
  title: string;
  category: "auth" | "marketing" | "dashboard" | "application" | "commerce" | "data" | "ai" | "product";
  description: string;    // one line
  render: () => ReactNode;
  span?: 1 | 2 | 3;
  pro?: boolean;
};
```

- Registered in `src/blocks/index.tsx` (`BLOCKS`) — the registry is the source of truth for counts and the blocks page.
- Ships: light + dark, responsive 320→1440, axe-clean, visual baseline, copyable source (`block-source.ts` pattern).
- A block that needs a new primitive first builds the primitive in `src/ui` (with its audit row), then composes.

**Widget** = one dashboard card: `Metric` + micro-viz + footer action, built from `WidgetBox` + widget primitives. Registered in `WIDGETS` (same `BlockDef` shape, category from the widget list). Mock data lives in `src/blocks/widget-data.ts` — **deterministic** (no `Date.now()`, no randomness) so smoke and visual tests stay stable.

---

## 7. New component checklist (definition of done)

A component merges only when **all** of these are true:

- [ ] Module + export in `src/ui/index.ts`; axis unions exported per §1
- [ ] Required axes for its category implemented, tokenized, distinct (§1.2)
- [ ] States per §2.4; a11y contract per §4; ref forwarded; `cn` merge last
- [ ] `COMPONENT-AUDIT.md` row green where applicable (run `npm run audit:components`)
- [ ] `audit:variants` cells counted (run `npm run audit:variants`)
- [ ] Docs page: full anatomy (§5), in `src/docs/nav.ts` with keywords
- [ ] Unit test: ≥1 interaction test per axis (keyboard where non-native)
- [ ] Visual baseline (light + dark) added to the Playwright suite
- [ ] Smoke + axe green on the new route (the gate does this automatically)
- [ ] If it's an action: `asChild`/`href` work (test the rendered element)
- [ ] `npm run quality:report` grades it **A** (new components always enter at the Tier A bar; `--strict` is the gate)

---

## 8. Working agreements (every session)

1. `npm test` must stay green before anything else is considered.
2. Touch an interactive component ⇒ its a11y contract is in the same diff.
3. New value in code (color, size, radius, type) ⇒ it's a token in `src/index.css` first, component second.
4. New component/block/widget ⇒ registry + audit + docs + test in the same PR series.
5. Counts in docs/README come from the scripts, never from memory.
6. **Quality is a ratchet** (`COMPONENT-QUALITY-SPEC.md` §2.2): `npm test` runs `quality:check`, which fails if any component's score drops below `audit/quality-baseline.json`. Improvements refreeze the baseline in the same PR; regressions never merge.
