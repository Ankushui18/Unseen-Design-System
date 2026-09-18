# The Unseen Component Quality Bar

> **What this is.** The exact, graded, mechanically-checkable standard a component must meet to be called *shipped* in Unseen v2. This is not a plan (that is `UNSEEN-V2-ROADMAP.md`) and not the system rulebook (that is `CONVENTIONS.md`). It is the **bar**: what "done" means, per matrix, per tier, with the evidence that proves it.
>
> **The goal it serves:** *a premium-quality design system whose components, documentation, playground, blocks, and website feel as polished and cohesive as AlignUI* — with Unseen's own visual language, not AlignUI's appearance.
>
> **Enforcement.** `npm run quality:report` grades every component against §1–§8 and writes the scorecard. `npm run quality:check` (in `npm test`) is the ratchet: **no component may score lower than its recorded baseline.** `npm run quality:check -- --strict` fails any component below its **tier** bar — run it before promoting a tier. A rule that cannot be checked is labelled *Manual* and is a review obligation, not a gate.

**Current state (regenerate, never guess):**

| Metric | Value | Source |
|---|---|---|
| Exported components | **117** | `npm run audit:components -- --json` |
| Component modules | 11 (`src/ui/*.tsx`) | — |
| Components with a docs route | 112 / 117 | `audit:components` (`CardBody`, `CardFooter`, `ScrollShadow`, `ToastProvider`, `ErrorState` are sub-parts/hooks) |
| Variant cells | **1,354** across 64 axis-bearing components | `npm run audit:variants` → `audit/variant-audit-baseline.json` |
| Docs routes | 106 (82 component, 13 foundation, 5 template, 4 docs, 5 root) | `npm run lint:design` |
| Block registry entries | 33 | `src/blocks/index.tsx` |
| Gate coverage | types · unit · build · design-lint · smoke · axe (jsdom, 106 routes) · axe + contrast (browser, 106×2 themes) · responsive (320→1600 + 200% zoom) · visual (29 surfaces × 2 themes) | `npm test`, `npm run test:browser` |

---

## 0. How to read this

Six matrices. A component is graded on all six. Nothing here is aspirational decoration: each check maps to an artifact (`scripts/*.mjs`, a test file, a baseline, a docs page) in §9.

```
M1 Contract ────────┐
M2 Variant matrix   │
M3 State matrix     ├──►  score (0–100) ──► grade (A–D) ──► tier minimum ──► pass / debt
M4 Visual matrix    │
M5 A11y matrix      │
M6 Documentation ───┘
```

**Two hours of a session should never be spent guessing what "polished" means.** If a component feels wrong but this document doesn't say why, this document is incomplete — fix it here first, then fix the component.

---

## 1. The quality model

| # | Matrix | Question it answers | Evidence |
|---|---|---|---|
| **M1** | Contract | Is the API predictable, composable and future-proof? | static (source) + unit tests |
| **M2** | Variant | Are the meaningful combinations real, distinct and counted? | `variant-audit` + docs matrix render |
| **M3** | State | Does every state exist, and does it behave (not just look)? | `component-audit` + unit tests + axe |
| **M4** | Visual | Is it built from Unseen's geometry, tokens and motion — in both themes? | `design-lint` + browser axe (contrast) + visual baselines |
| **M5** | Accessibility | Can everyone operate it? | axe (jsdom + real browser) + unit keyboard tests |
| **M6** | Documentation | Can a stranger copy it into a product in under a minute? | docs page (source-checked anatomy) + playground |

### 1.1 Scoring

Each matrix holds a fixed set of checks (§4–§9 define them). A check is one of:

- **Required** — must pass; failing costs the matrix.
- **Conditional** — applies only if the component's category/kind triggers it (e.g. `error` state applies to form fields, not to `Divider`). A conditional check that does not apply is excluded from the denominator — never silently passed.
- **Manual** — cannot be automated; listed in §9.3 and asserted in review.

```
score  =  passed required+conditional checks / applicable checks × 100
ground =  any failed check in M5 (accessibility) or M4 (contrast/dark) caps the grade at C.
grade  =  A ≥ 90 · B ≥ 80 · C ≥ 65 · D < 65
```

Grades are **not** rounded up. A component at 89.9 is a B, and that is actionable information.

### 1.2 Tier minimums

| Tier | Minimum grade | Meaning |
|---|---|---|
| **A — Flagship** | **A** | The components a stranger meets first, and the ones blocks are built from |
| **B — Core** | **B** | Everything with a public docs route |
| **C — Specialist** | **C** | Pro/specialist components, sub-parts, internal primitives |

A component below its tier minimum is **debt**: it keeps its docs route and works, but it cannot be referenced from the homepage, a block, or a template, and no new feature may be layered on top of it until it clears.

---

## 2. Tiers, rollout and the ratchet

### 2.1 How tiers are assigned (mechanical, not political)

1. **Tier A** = the curated flagship list in `scripts/quality-check.mjs` (`TIER_A`) **∪** the top 12 most-used components in `src/blocks/**` + `src/pages/Templates.tsx` by JSX usage count. Usage decides, not taste: if a block reaches for it, it is flagship.
2. **Tier B** = every remaining component with a public route in `src/docs/nav.ts`.
3. **Tier C** = everything else (sub-parts, providers, hooks, internal primitives).

Tier changes are proposed by editing the script, and land with the scorecard regenerated in the same commit — a diff you can argue about.

### 2.2 The ratchet law

> **A component's score may never decrease.** Adding a component, refactoring a module, or "quickly fixing" a style must not lower any existing score.

- `audit/quality-baseline.json` is the record: per-component score + grade + failing checks, keyed by `file::name` (export names are not unique across modules).
- `npm test` runs `quality:check` in **ratchet mode**: a drop fails the build.
- Scores may rise freely; when they do, refresh the baseline in the same PR (`npm run quality:check -- --write-baseline audit/quality-baseline.json`) so the gain is locked in.
- **New components enter at Tier A bar** — a new component with no baseline is scored against `TIER_A` minimums, and cannot be added to the registry below an A.

### 2.3 Debt ledger

`npm run quality:report -- --md` writes `QUALITY-SCORECARD.md`, which contains the debt list: every component below its tier bar, its score, and the **exact failing checks**. That list is the remediation backlog — never a hand-written todo file.

Remediation order (highest value first):

1. **Tier A accessibility failures** — a flagship that fails M5 is a system-wide credibility failure. Fix before anything else.
2. **Tier A anything else** — flagship components reach grade A.
3. **Tier B failures where the component is used by a block** — blocks are the marketing surface.
4. **Tier B / Tier C** — swept in category batches (one PR per module: `Form.tsx`, `Display.tsx`, …) so shared helper fixes land once.

**No count inflation.** Going 117 → 300 is not progress; 117 → 80 excellent → 180 excellent is. A component that fails its tier bar does not get deleted for that reason, but **it does not get counted in headline numbers** (§9.4).

---

## 3. Vocabulary law (canonical props × display vocabulary)

Unseen has **one canonical prop vocabulary** (already in the codebase, counted by `variant-audit`) and **one display vocabulary** (what humans read on the docs site, matching how AlignUI presents its own examples). They are related by a mapping table, not by duplicating components.

### 3.1 Canonical props (the API of record)

| Axis | Canonical prop | Values | Count |
|---|---|---|---|
| Intent | `tone` | `accent · default · success · warning · danger` | 5 |
| Look / mode | `variant` | `solid · soft · outline · ghost · link` | 5 |
| Size | `size` | `xxs · xs · sm · md · lg` | 5 |
| Shape | `shape` | `circle · rounded · square` | 3 |
| Placement | `placement` *(alias `side` on edge overlays)* | `top · bottom · left · right · *-start · *-end` | 6 |
| Density | `density` | `comfortable · compact` | 2 |

States (`loading`, `disabled`, `error`, `empty`) are **props, never axes** — they are measured by M3, and they are never rendered as variant cells.

### 3.2 Display vocabulary (docs, playground, marketing copy)

| Canonical | Display label | px | Canonical | Display label |
|---|---|---|---|---|
| `tone="accent"` | **Primary** | | `size="xxs"` | **XS** |
| `tone="default"` | **Secondary / Neutral** | | `size="xs"` | **SM** |
| `tone="danger"` | **Destructive** | | `size="sm"` | **MD** |
| `tone="success"` | **Success** | | `size="md"` | **LG** |
| `tone="warning"` | **Warning** | | `size="lg"` | **XL** |
| `variant="solid"` | **Filled** | | `variant="outline"` | **Stroke** |
| `variant="soft"` | **Lighter** | | `variant="ghost"` | **Ghost** |
| `variant="link"` | **Link** | | | |

The size mapping is **1:1 and a pure relabel** — `xxs` is the smallest control in the system, so it displays as `XS`. There is no hidden `xl` value and no size semantics change: XS 28 · SM 32 · MD 36 · LG 40 · XL 48. Display labels are for humans; **canonical values are what appear in copyable code** (a reader copying `tone="accent"` must never have to translate).

### 3.3 The alias layer (AlignUI-shaped ergonomics, one definition)

Copy-friendly shorthand is allowed **only** through a declared alias layer, so that `variant="primary" mode="filled"` works without forking the vocabulary:

- Alias types are exported and named `*Alias` (e.g. `IntentAlias`) — the naming is what lets `variant-audit` exclude them from cell counting (**aliases are ergonomics, not cells**).
- **One mapping table per axis, defined once, in the component's module, and unit-tested.** No second copy anywhere in the docs site.
- Resolution precedence is total and documented in the component's API table:
  1. Canonical prop wins (`tone`/`variant`/`size`).
  2. Explicit alias prop next (`mode` is the alias prop for look).
  3. Shorthand inside `variant` last (disjoint value sets — `primary` can only mean an intent, `solid` can only mean a look — make this unambiguous).
- Aliases are additive forever: an alias may be deprecated (warn via types) but never repurposed. `variant="primary"` cannot later mean "filled".
- **Aliases never change rendered output**: unit tests assert that the alias form and the canonical form produce identical class output.

*Reference implementation:* `Button` (`src/ui/Button.tsx`) — `variant?: Variant | IntentAlias`, `mode?: Mode`, canonical `tone`/`variant` untouched, locked by `tests/button-vocabulary.test.tsx`.

---

## 4. M2 — The variant matrix

### 4.1 What a cell is

A **cell** is one combination of axis values (intent × look × size). Cells are the unit of scale. `variant-audit` counts them and `audit/variant-audit-baseline.json` records the total (**1,354** today).

### 4.2 Cell laws

1. **Cells must be real.** If two cells resolve to identical classes, one is a no-op: remove it or make it distinct. *Check: `design-lint` distinctness report; unit test asserts class output differs across intents.*
2. **No hover-as-variant.** States never become cells.
3. **Aliases are not cells.** Shorthand must not inflate the count (§3.3). *Check: `variant-audit` alias reporting.*
4. **New axis ⇒ new coverage.** Adding `size="lg"` to a component means documenting and testing that full row, not just the new size in isolation.
5. **Every cell is documented once.** The docs matrix renders the full grid from the same axis arrays the component declares — no hand-written cell lists that drift.

### 4.3 Required axes by category (extends `CONVENTIONS.md` §1.2)

| Rule | Category | Axes | Floor | Documentation |
|---|---|---|---|---|
| R1 | Actions | `tone` × `variant` × `size` + icon content | 5 × 5 × 5, icon-only cell | Intent grid × look grid, sizes row, icon rows |
| R2 | Form fields | `size` × state × label/hint/error | 3 × 5 | State grid |
| R3 | Selection | `size` × state | 3 × 5 | State grid |
| R4 | Indicators | (tone or color) × `variant` × `size` | 5 × 4 × 3 | Colour × variant matrix |
| R5 | Overlays | size presets × `placement` | 3 × 4 | Placement grid |
| R6 | Navigation | `variant` × orientation × `size` | 2 × 2 × 2 | Orientation grid |
| R7 | Feedback | `tone` × `variant` × `size` | 5 × 2 × 2 | Tone × variant grid |
| R8 | Containers | `density` × `variant`/`elevation` | 2 × 2 | Density grid |

A deviation is allowed only with a one-line justification in the component's docs page under **Accessibility/API** ("deviates: …").

**Machine proxy floor** (what `quality:report` checks today, per spec §2.1 tiers): Tier A ≥ 12 cells, Tier B ≥ 6, Tier C ≥ 1. The category rules above remain the human contract — the floor is the cheapest check that catches a component losing its matrix.

---

## 5. M3 — The state matrix

States are behaviour, not screenshots. Each required state has a contract that must hold in the DOM:

| State | Contract |
|---|---|
| **Default** | Renders with no props beyond content. No layout shift when other states engage. |
| **Hover** | Pointer-only affordance; never the only way to reach an action (keyboard parity with `:focus-visible`). |
| **Focus** | `:focus-visible` ring on every interactive element, from token (`shadow-ring-*`), visible against both themes, ≥ 3:1 against adjacent colours. |
| **Active** | Pressed feedback within `--duration-fast` (0.15s). |
| **Disabled** | Uses Unseen's weak fill + disabled text (never `opacity` alone); `disabled`/`aria-disabled` on the real control; not focusable when truly disabled; not the only signal of an error. |
| **Loading** | `aria-busy="true"`; action surface stays the same size (no reflow); the label either persists or is replaced by text, never left blank; spinner is `aria-hidden`. |
| **Error / invalid** | `aria-invalid="true"` + error text wired via `aria-describedby` + visible text (never colour alone), and announced. |
| **Empty** | Lists/tables/feeds: a real empty state (icon, sentence, action), not a blank region; covered by a block or docs example. |

**Required by category**

| Category | Required states |
|---|---|
| Actions | default, hover, focus, active, disabled, loading |
| Form fields | default, focus, filled, disabled, error, loading (async), readonly where meaningful |
| Selection | default, hover, focus, checked, disabled, error |
| Indicators | default, and the status variants they encode (no hover/active required) |
| Overlays | closed, open, opening/closing motion, focus-trapped, dismissible (Esc), scroll-locked |
| Navigation | default, hover, focus, active/current (`aria-current`), disabled, overflow |
| Feedback | default, dismissible, auto-dismiss (motion-reduced safe), action |
| Containers | default, loading (skeleton), empty |

An unusual state (e.g. "pinned", "streaming") must be declared in the docs page under **States** — undocumented states are review failures, not easter eggs.

---

## 6. M4 — The visual matrix (Unseen's language, not AlignUI's)

The interaction model is borrowed. **The appearance is not.** AlignUI is calm-neutral with a blue accent, generous radius, flat low-contrast elevation. Unseen's identity, already encoded in tokens, is:

| Dimension | Unseen's rule | Forbidden |
|---|---|---|
| **Geometry** | Control heights come from the size scale: 28 · 32 · 36 · 40 · 48. Radius pairs with height (`h-7 rounded-8` … `h-12 rounded-12`), radius driven by `--radius-scale` so users can flatten/sharpen the whole system. | Arbitrary geometry (`h-[38px]`, `rounded-[7px]`), radius that ignores `--radius-scale`. |
| **Type** | The four families only: `title-h1…h6`, `label-xl…xs`, `paragraph-xl…xs`, `subheading-*`. Weights are **400 / 500** — nothing else, in components *and in the docs chrome* (the site is the reference implementation). The **typeface ships with the system**: Inter + JetBrains Mono are self-hosted (`src/fonts/`, SIL OFL, subset, inlined by the build) and no runtime font CDN is permitted — every letter-spacing and line-height token is tuned to those metrics, so a fallback silently invalidates the type scale. | `text-sm`/`text-xl`, arbitrary `text-[13px]`, `font-semibold`, `font-weight: 650` in chrome CSS, mixed weights inside one control, third-party font CDNs. |
| **Colour** | Semantic roles only: `surface`, `surface-secondary`, `foreground`, `muted`, `subtle`, `border`, `field`, `accent`, `success`, `warning`, `danger` (+ the 10-colour categorical palette). Accent is OKLCH-generated from `--accent-h` / `--accent-c`, so every accent choice is a first-class theme. | Raw Tailwind palette (`bg-slate-700`), hex literals in components, colour used as the only carrier of meaning. |
| **Elevation** | Five steps: `shadow-xs · sm · md · lg · xl`, each with a dark-mode counterpart. Cards are hairline `ring-1 ring-border`, not borders + shadow. Rings for focus (`shadow-ring-accent/neutral/danger`). | `shadow-e1..e5` (legacy), stacked shadows invented per-component, `border border-border bg-surface` card pattern. |
| **Spacing** | 4px base; component internals from the size scale's padding; section rhythm consistent across docs and blocks. | One-off margins to "make it look right", padding that changes between sizes without a rule. |
| **Icons** | One family (Remix Icon), 16 / 20 / 24 px. Action icons are 20px, pulled in by `-mx-1` with a 12px gap. | Mixed icon sets, 12px icons (except the documented badge/tag glyph), icons as the only label without an accessible name. |
| **Motion** | Token-driven only: `--duration-fast/base/slow` (0.15/0.22/0.30s) with `--ease-out-quint` / `--ease-spring`; named animations `fade-in`, `pop-in`, `slide-up`. Everything respects `prefers-reduced-motion`. | Ad-hoc `transition-all duration-500`, bounce for its own sake, motion that gates comprehension. |
| **Dark mode** | Every component is designed in dark *first-class*: token-driven or explicit `dark:` classes; shadows and rings re-tuned, not reused; no washed-out greys. | Dark mode as an afterthought, `opacity` tricks to fake depth, contrast that passes in light and fails in dark. |

**Budgets (hard):**

- **Contrast:** WCAG 2.1 AA in **both** themes for text (4.5:1) and UI boundaries/focus (3:1) — enforced by the real-browser axe pass (contrast is impossible in jsdom; that is why the browser suite exists).
- **Reflow:** no horizontal overflow 320 → 1600px, and at the 200%-zoom-equivalent viewport (WCAG 1.4.10 / 1.4.4) — enforced by `tests-browser/responsive.spec.ts`.
- **Pixel stability:** every Tier A component has a visual baseline in **both themes**; a diff requires a deliberate `test:browser:update`.
- **Design-lint:** zero findings for the component's file on: raw hex, raw palette colour, arbitrary type sizes, off-scale weights (in TSX **and** in our CSS), legacy elevation, card-border pattern, undersized icons, third-party font CDNs.
- **Typeface proof:** the browser gate asserts that Inter and JetBrains Mono actually load from our own origin and that Inter measures differently from the fallback — a `font-face` that silently falls back is a system-wide typography failure, not a cosmetic one (`tests-browser/fonts.spec.ts`).

---

## 7. M5 — The accessibility matrix

Accessibility is gated twice (jsdom axe in `npm test`, real-browser axe with contrast + responsive in `test:browser`). It is still a per-component design obligation, not a test result.

### 7.1 Keyboard contract (by category)

| Component kind | Required keys |
|---|---|
| Actions (`button`, links) | Enter, Space (button), no keyboard trap, `asChild` preserves the target's keys |
| Fields | Tab in/out in DOM order, Esc clears/blurs where documented, arrow keys only where a listbox is attached |
| Selection | Space toggles checkbox/switch; arrows move within a radio group; Home/End jump where the group is long |
| Overlays | Esc closes; Tab cycles inside; focus returns to the trigger on close; first focus is meaningful (not `body`) |
| Menus / listboxes / combobox | ↑↓ move, Enter selects, Esc closes and restores focus, Home/End, typeahead where documented |
| Tabs / segmented | Arrows move between tabs, Home/End, `aria-selected` + roving `tabIndex` |
| Data table | `aria-sort` on sortable headers, keyboard-reachable bulk selection, no hover-only affordances |

### 7.2 Contract, always

1. **Native first.** `<button>`, `<input>`, `<label>`, `<table>`; `role=` only when semantics cannot be native.
2. **Accessible name on every interactive element** — the top cause of gate failures; an icon-only control without a label is a broken component, not a style choice.
3. **Focus is visible, managed, and restored** (overlays) — `:focus-visible` ring from tokens, never `outline: none` alone.
4. **State is announced:** `aria-busy`, `aria-invalid` + described error, `aria-current`, `aria-sort`, `aria-expanded`, `role="status"` for async feedback.
5. **Live regions are polite by default** (toasts), assertive only for blocking errors.
6. **Motion respects `prefers-reduced-motion`** — one token-driven rule, applied system-wide.
7. **Non-text visuals are decorative** (`aria-hidden`) unless they carry unique meaning, which then gets a text alternative.
8. **Zoom and text-size:** usable at 200% zoom and 320px width (1.4.10 reflow), text never clipped by fixed heights.

**Non-negotiable:** any M5 failure caps the grade at **C** regardless of other matrices (§1.1).

---

## 8. M6 — The documentation matrix

The docs page is the product surface people actually copy from. Every component page follows **exactly** this order (source-checked by `design-lint`; `quality-check` grades depth per tier):

| # | Section | Required content | Tier A depth |
|---|---|---|---|
| 1 | **Header** | Name, one-line description, capability tags, category eyebrow | + "used in" links to blocks/templates |
| 2 | **Import** | Copyable import line, correct module path | — |
| 3 | **Playground** | Live, editable example: controls ↔ code stay in sync, copy, reset, viewport (desktop/tablet/mobile), light/dark canvas, deep-linkable state. Copy emits the snippet **plus the import lines it needs** (the editor itself stays runnable JSX) — never a truncated snippet | + full axis control set, "open in playground" route |
| 4 | **Variants** | The complete declared matrix rendered from the axis arrays (never a curated subset) | + every cell labelled with its display name |
| 5 | **Sizes** | All sizes at real size, labelled with px | + density/geometry notes |
| 6 | **States** | Every state from §5, shown side by side | + the behavioural contract in words, one line per state |
| 7 | **With icons / content** | text · leading · trailing · both · icon-only (where applicable) | + icon-only with `aria-label` shown in code |
| 8 | **Composition** | 2–3 real assemblies using only `src/ui` components | + a link to the matching block |
| 9 | **Accessibility** | Keyboard table, screen-reader behaviour, focus management — facts, not prose | + what is announced, verbatim |
| 10 | **API** | Complete props table: name, type, default, description; aliases and precedence documented; script-checked against TS types | + controlled/uncontrolled examples |
| 11 | **Source** | Copy button + full source | + "edit on GitHub" link |

Page-level requirements (all tiers):

- Route is registered in `src/pages/registry.tsx` **and** `src/docs/nav.ts` with search keywords (**zero orphan components** — this is a `design-lint` rule already).
- Every code sample is copyable and runnable as written (no `// …` ellipses standing in for required props).
- The page is axe-clean in light and dark (gate), and passes responsive checks.
- Terminology is the display vocabulary from §3.2; code blocks use the canonical vocabulary.

---

## 9. Evidence, enforcement and artifacts

### 9.1 The pipeline (already green — protect it)

```
types → unit → build → design-lint → smoke (106 routes) → axe jsdom (106 routes)
      → browser axe + contrast (106 × light/dark) → responsive (320→1600, 200% zoom) → visual (29 × 2)
```

### 9.2 The quality layer (new)

| Command | Mode | Blocks |
|---|---|---|
| `npm run quality:report` | human table: per-component score, grade, tier, failing checks | — |
| `npm run quality:report -- --md` | writes `QUALITY-SCORECARD.md` (grades + debt ledger, generated) | — |
| `npm run quality:check` | **ratchet** vs `audit/quality-baseline.json` | `npm test` |
| `npm run quality:check -- --strict` | **tier bar**: every component ≥ its tier minimum | promotion PRs, Tier A work |
| `npm run quality:check -- --write-baseline audit/quality-baseline.json` | records current scores | after every improvement |
| `npm run audit:variants` | cells vs `audit/variant-audit-baseline.json` | `npm test` (via `audit:variants`) |
| `npm run audit:components` | state/a11y/docs matrix | informational + `COMPONENT-AUDIT.md` |
| `npm run codemod:ref` | components that could take a `ref` but do not — safe rewrite, `--write` to apply | `tests/codemod-ref.test.ts` |

Mechanical checks are static-analysis over source + docs + tests. That means they are **necessary but not sufficient**: they prove structure (an `aria-invalid` exists, a docs section is titled "States"), not taste. Structural honesty is what makes the human review cheap — the reviewer verifies the *look*, not the checklist.

### 9.3 Manual checks (review obligations, in every PR that touches a component)

- [ ] **Real-browser look pass** in light **and** dark at 320 / 768 / 1440 — including hover, focus, disabled, and a long-content case.
- [ ] **Keyboard-only pass** — reach everything without a mouse; no focus lost behind an overlay; focus returns.
- [ ] **Screen-reader pass** (VoiceOver/NVDA) for any new interactive pattern — the name, role and state are announced correctly.
- [ ] **Copy-paste pass** — take the docs sample verbatim into `src/blocks` and confirm it renders as shown.
- [ ] **Alignment pass** — spacing, radius, type and elevation match neighbours on the same page (the cohesion check).
- [ ] **Zoom pass** — 200% zoom, no clipped text or lost controls.

### 9.4 Honesty rules

1. Counts in docs/README come from scripts, never from memory (`CONVENTIONS.md` §8.5).
2. **Headline numbers count only components at or above their tier bar.** Total exports may be larger; the *product* number is the bar-passing number, printed by `quality:report`.
3. A check that is skipped prints as skipped — silently passing a check that did not run is the only unforgivable bug in the auditor.
4. **A declaration is not evidence.** `M1.ref` reads source for `ref?:` / `forwardRef`; that proves the prop
   exists, not that it reaches anything. Where a check can only see structure, pair it with a test that
   exercises the behaviour (`tests/refs.test.tsx`). Never let a source-shape check stand in for a wire that
   was never connected.

---

## 10. Definition of done

### 10.1 Any new component (Tier A bar, always)

- [ ] Module + export in `src/ui/index.ts`; axis unions exported; alias types named `*Alias` and mapped once (§3.3)
- [ ] Required axes for its category implemented, tokenized, distinct cells (§4)
- [ ] Required states implemented with their contract (§5)
- [ ] Visual rules respected: tokens only, both themes, motion tokens, size scale (§6)
- [ ] A11y contract: native semantics, accessible name, focus ring, keyboard per §7.1
- [ ] `forwardRef`, `className` merged last via `cn`, controlled/uncontrolled parity where applicable
- [ ] Docs page with the full 11-section anatomy (§8), nav entry with keywords
- [ ] ≥1 interaction test per axis (keyboard where non-native) + a vocabulary test if aliases exist
- [ ] Visual baseline in both themes; smoke + axe green on the route
- [ ] `npm run quality:check -- --strict` reports **A** for the component
- [ ] `npm test` green; baseline refrozen in the same PR

### 10.2 Touching an existing component

- [ ] Its score did not drop (ratchet) — and if you touched its module, you moved it up where cheap
- [ ] Its a11y contract is in the same diff (if interactive)
- [ ] Any new value is a token first, component second
- [ ] Docs updated in the same diff — including the API table if props changed

### 10.3 Removing a cell/variant

Deleting a documented cell is a **breaking change**: it needs a changelog entry, a deprecation path (alias or warning) where users could be relying on it, and a note in the component's Accessibility/API section.

---

## 11. Anti-patterns (each one is a review failure)

1. **No-op cells** — two cells with identical output, presented as choice.
2. **Hover-as-variant** — "Hover" listed under Variants.
3. **Alias inflation** — shorthand values counted as new cells (§3.3), or aliases defined twice (docs vs source).
4. **Opacity-only disabled** — the component is not `disabled` in the DOM.
5. **Icon-only without a name** — an `aria-label` is required.
6. **Dark mode by inversion** — reusing light shadows/rings; a "dark" that is just `opacity`.
7. **Arbitrary geometry** — `h-[38px]` to hit a mockup instead of a size token.
8. **Colour-only status** — red text with no icon/label.
9. **Docs written last** — an API table that documents the props the author remembers.
10. **Count inflation** — exporting a wrapper to move the number; headline counts including sub-bar components.
11. **Screenshot docs** — a docs section that shows a picture instead of a live, copyable example.
12. **Silent skips** — a check that cannot run and passes anyway.

---

## Appendix A — Canonical class mapping (reference implementation: Button)

| Canonical | Display | Class contract (as built) |
|---|---|---|
| `tone="accent"` + `variant="solid"` | Primary / Filled | `btn-accent-fill` + accent ring |
| `tone="default"` + `variant="outline"` | Secondary / Stroke | `bg-surface` + `ring-1 ring-border` + `shadow-xs` |
| `tone="danger"` + `variant="soft"` | Destructive / Lighter | `bg-red-lighter text-red-base`, hover lifts to surface |
| `size="xxs"/"xs"/"sm"/"md"/"lg"` | XS/SM/MD/LG/XL | `h-7/8/9/10/12` + `rounded-8/8/8/10/12` + `text-label-sm` (lg → `text-label-md`) |

## Appendix B — Where each number comes from

| Number | Command |
|---|---|
| Component exports 117 · docs coverage 112/117 | `npm run audit:components -- --json` |
| Variant cells 1,354 | `npm run audit:variants` |
| Routes 106 · nav 105 · previews | `npm run lint:design` (footer line) |
| Blocks 33 | `src/blocks/index.tsx` |
| Quality grades + debt | `npm run quality:report -- --md` → `QUALITY-SCORECARD.md` |

## Appendix C — Related documents

| Document | Role |
|---|---|
| `CONVENTIONS.md` | The system rulebook — axes, naming, a11y non-negotiables, new-component checklist |
| `WEBSITE-IA.md` | The website as a product: route table, navigation taxonomy, page templates, playground spec |
| `UNSEEN-V2-ROADMAP.md` | The plan for the v2 platform |
| `UNSEEN-ROADMAP-2026-09-17.md` | Phased engineering plan |
| `COMPONENT-AUDIT.md` | Generated state/a11y/docs matrix |
| `QUALITY-SCORECARD.md` | Generated grades, tiers and debt ledger (this spec, applied) |
