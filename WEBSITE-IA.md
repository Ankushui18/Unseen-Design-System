# The Unseen Website — Information Architecture & Product Spec

> **What this is.** The website specified as a product: what pages exist, in what order, what each one must contain for a developer to *find, understand, and copy* a component in under a minute. This is the companion to `COMPONENT-QUALITY-SPEC.md` — that document sets the bar for what gets published here; this one sets the bar for how it is published.
>
> **The thesis.** Unseen's biggest opportunity is not more components; it is that the **website itself becomes a product**. The interaction model is borrowed deliberately from AlignUI (live examples, copyable code, category navigation, playground, light/dark, blocks, Figma parity). The **visual language is not** — it is Unseen's tokens, geometry and motion, per `COMPONENT-QUALITY-SPEC.md` §6.

**Current state (verified, not remembered):**

| Thing | Today | Source of truth |
|---|---|---|
| Routes | **139** — 106 documented + 32 block pages + `/figma` | `node scripts/routes.mjs` |
| Nav items | 105, in 9 groups (6 component groups including a **PRO** group of 11) | `src/docs/nav.ts` |
| Blocks | 32 registered (the 5 application screens are registered blocks too), `category` in 8 values | `src/blocks/index.tsx` |
| Templates | 5 (`ai`, `analytics`, `settings`, `billing`, `team`) | `src/pages/Templates.tsx` |
| Search | Command palette (`Cmd/Ctrl-K`), nav-title + keyword matching | `src/docs/Shell.tsx` |
| Preview chrome | Preview/Code tabs, viewport switcher (desktop/768/390), canvas light/dark, reset, copy | `src/docs/Blocks.tsx` → `Showcase` |
| Live editing | `react-live` on the homepage hero only | `src/pages/Home.tsx` |

**What is missing** (this document's job): a component taxonomy that is *topics*, not *commercial tiers*; a **playground on every Tier A page** (the component and the first page now exist — `src/docs/Playground.tsx`, `#/components/button`); **deep-linkable state** (built for Button, needs wider adoption); per-block routes; a Layout/Utilities home for the structural primitives; a Figma bridge page; and a nav that shows the same order to every visitor. The taxonomy is codified in `audit/ia-taxonomy.json` and validated by `npm run quality:report -- --ia`.

---

## 1. Principles

1. **Discovery → comprehension → copy.** Every page has exactly one job: get a working, correct snippet into the visitor's editor. Copy buttons are the primary conversion event of the site.
2. **Show the quality, don't count it.** Counts are receipts, not pitches (§9). A page that leads with "117 components" is a weaker page than one showing five flawless matrices.
3. **The interaction model is borrowed; the look is ours.** Live preview, code tab, copy, controls, blocks, templates, Figma parity — borrowed. Type, colour, geometry, elevation, motion — Unseen's, and identical to what ships in `src/ui`.
4. **The site is the reference implementation.** Every docs page is built from `src/ui` components and tokens — no bespoke docs widgets that contradict the system. If the site needs a nicer control, the control gets built in `src/ui` first (`CONVENTIONS.md` §6, block rule).
5. **Nothing load-bearing lives in prose.** States, axes, props and counts come from the code, or from a script that reads the code.
6. **One canonical URL per thing.** Everything else is a redirect. Deep links are permanent (§2.3).

---

## 2. Sitemap & URL contracts

```
/                                   Home
├── /components                     Index: all 8 categories, filterable, searchable
│   └── /components/{slug}          80 component pages  (the killer feature — §4.4)
├── /blocks                         Index: 33 blocks, category filters, deep links
│   └── /blocks/{key}               One page per block (pattern anatomy + source)
├── /templates                      Index: 5 templates
│   └── /templates/{key}            One page per template
├── /foundations                    Index
│   └── /foundations/{topic}        13 topics (color, type, spacing, sizing, elevation,
│                                   borders, opacity, motion, breakpoints, icons,
│                                   accessibility, tokens, themes)
├── /playground                     Standalone: full-bleed playground, shareable state
├── /figma                          Figma/code parity: naming, tokens, variants, kits
├── /patterns                       Compositions (existing) — reframed as Blocks §7 "Patterns"
├── /docs/introduction · /installation · /principles · /changelog
└── /pricing                        Marketing (exists; out of scope for the docs IA)
```

### 2.1 URL rules

| Rule | Detail |
|---|---|
| Shape | lower-case, kebab-case, no verbs, no nesting deeper than 2 segments |
| Component | `/components/{component-slug}` — one page per **public component**; sub-parts live on the parent page (`CardBody` → `/components/card`) |
| Anchors | Every docs section is addressable: `/components/button#variants`, `#sizes`, `#states`, `#accessibility`, `#api`, `#source` — generated from the section titles in `COMPONENT-QUALITY-SPEC.md` §8 |
| Playground state | Deep-linkable query params (§5.4): `?variant=primary&mode=filled&size=lg&theme=dark&viewport=390` |
| Search | `?q=` on `/components` for shareable filtered views |
| No orphans | Every component route appears in `src/docs/nav.ts` **and** is reachable from `/components`; a route without a nav entry fails `design-lint` (already enforced) |

### 2.2 Two pages that must die (found by this audit)

| Route | Problem | Action |
|---|---|---|
| `components/badge-spec` | duplicate of `components/badge` | alias → `/components/badge`, delete the page, keep the URL as a redirect |
| `components/badge-overlay` | duplicate of `components/badge` | same |

Registered in `audit/ia-taxonomy.json` → `legacyRoutes`, so the redirect table is code, not memory.

### 2.3 Redirect policy

- Renames get a permanent redirect in the router + an entry in `legacyRoutes`; a docs URL that 404s is a broken contract.
- Blocks/templates gain deep links *before* they are linked from anywhere else, so no link is ever born broken.
- The `?` state of a playground is optional decoration: the page must be fully usable when the params are stripped (share links degrade gracefully).

---

## 3. Navigation taxonomy

### 3.1 The problem with today's nav

`PRO` is a **price tier presented as a topic**. It sorts 11 unrelated components (an AI prompt input, a crypto address chip, a calendar) above `Actions`, so the first thing a visitor learns is the paywall, not the system. Meanwhile `Feedback & Overlays` mixes two different mental models in one column, and the structural primitives (`Widget Box`, `Well`, `Content Divider`) sit inside `Data Display`.

### 3.2 The target taxonomy — 8 categories, 80 components, a perfect partition

| # | Category | Count | Mental model |
|---|---|---|---|
| 1 | **Actions** | 9 | Things users press |
| 2 | **Forms** | 21 | Everything that captures input — including AI, money and time |
| 3 | **Data Display** | 19 | Surfaces that present state, identity and numbers |
| 4 | **Navigation** | 8 | Moving between places, views and steps |
| 5 | **Feedback** | 6 | Telling the user what happened, inline and transient |
| 6 | **Overlay** | 9 | Content layered above the page, with focus management |
| 7 | **Layout** | 3 | Structure, rhythm, containers |
| 8 | **Utilities** | 5 | Small helpers: code, keys, media |

Verified: **80 of 80** currently-routed components map to exactly one category (`audit/ia-taxonomy.json`; `npm run quality:report -- --ia` re-checks it and fails on orphans).

Rules that follow from this:

1. **Commercial tiers are badges, not categories.** `PRO` becomes a badge (`Pro`) on the component page, block card and template card. Same components, no separate shelf. The existing 11 PRO components are redistributed in §3.3.
2. **One category per component.** Multi-purpose components get **capability tags** (`AI`, `Data`, `Finance`, `Media`) rendered in the index — not a second category. Tags are filterable; categories are fixed.
3. **A new category needs ≥5 members** and a distinct mental model. Otherwise it is a tag.
4. **Order is stable and identical for everyone.** Categories sort by the order above; inside a category, components sort by usage (blocks/templates first) so the page leads with what people actually reach for.

### 3.3 What moved (the PRO dissolution)

| Component | Was | Becomes |
|---|---|---|
| AI Prompt Input, Chat Input | PRO / Forms | **Forms** (tag: AI) |
| Currency Amount Input | PRO | **Forms** (tag: Finance) |
| File Uploader | PRO | **Forms** |
| Time Picker, Calendar | PRO | **Forms** (Date & time) |
| Crypto Address Chip | PRO | **Data Display** (tag: Finance) |
| Activity Feed, Notification Feed | PRO | **Data Display** |
| Command Menu | PRO | **Overlay** |
| Voice Visualizer | PRO | **Utilities** (tag: Media) |
| Filters | PRO | **Utilities** |
| Widget Box, Well, Content Divider | Data Display | **Layout** |

### 3.4 Sidebar anatomy

```
[ Brand ]  [ Search ⌘K ]                      ← nav search filters the tree instantly
  Components                                  ← section: 8 category groups
    ▸ Actions            9
    ▸ Forms             21
    ▸ Data Display      19
    ▸ Navigation         8
    ▸ Feedback           6
    ▸ Overlay            9
    ▸ Layout             3
    ▸ Utilities          5
  Blocks                                      ← 33, grouped by block category
  Templates                                   ← 5
  Foundations                                 ← 13 topics
  Docs                                        ← introduction · installation · principles · changelog
  Playground · Figma                          ← the two product surfaces (§5, §8)
```

Behavior that must hold: the currently open category stays expanded across navigation; the active item is marked with `aria-current`; the sidebar is keyboard-navigable (arrows within a group, Enter to open); on mobile it is a slide-over that traps focus and returns it (`CONVENTIONS.md` §4). **Badges**: `New` (added in the last two releases), `Updated`, `Pro` (tier), `Beta` (API may change). Every badge is documented in `/docs/changelog`.

---

## 4. Page templates

### 4.1 Home — "a design-system product", not a landing page

Order (top to bottom), with the rule for each:

1. **Hero** — the name, one sentence of positioning, two actions (`Explore components` primary, `Get started` secondary), and a one-line stack strip (`React · Tailwind · TypeScript · Accessible`).
2. **Live component** — a real, editable example (email/password card, as in the current hero) with `react-live`: edit the code, the preview updates. This is the single strongest proof of quality; it must render something genuinely useful, not a toy.
3. **Capability strip** — counts as *receipts*: `117 components · 33 blocks · 5 templates · TypeScript · dark mode · responsive · accessible`. Print them from the registries (`COMPONENT-QUALITY-SPEC.md` §9.4), never hard-coded, and head-line only the bar-passing count.
4. **Quality proof** — the matrices themselves: a live `Button` intent × mode grid, a states row, a dark/light split. Show, don't assert.
5. **Foundations proof** — tokens, accent generator, radius scale, dark mode toggle (the customizer popover already exists — surface it here).
6. **Blocks & templates** — 3–4 real compositions, each linking to its own page.
7. **Accessibility & quality** — the gate, stated as facts: axe on all routes in both themes, keyboard contracts, the quality bar with a link to the scorecard.
8. **Figma parity** — one visual, linking to `/figma`.
9. **FAQ + footer.**

Unchanged rule: the homepage never becomes a second docs site. It proves quality in one scroll and hands off to `/components`.

**Build status (this pass).** Built in the order above, with two deviations, both deliberate:

- **Band 8 (Figma parity) is deferred with its route.** `/figma` does not exist yet (§8), and a homepage band linking nowhere would be the same class of claim this pass removed. The band lands with the route.
- **Bands 4 and 5 are live, not illustrative.** The quality proof renders the real `Button` (5 intents × 5 modes = 25 cells, plus states and sizes) and the foundations proof drives `useTheme()` — the same state the header popover writes — so the accent, radius and mode controls re-theme the page rather than a sandboxed mock.
- Bands 1–3, 6, 7 and 9 shipped as specified: hero, editable example, capability strip (printed from the registries), blocks/templates (from `BLOCKS` and `TEMPLATE_CARDS`), the quality receipts, and the FAQ.

**What the page must never do again.** This pass removed, and `tests-browser/surface.spec.ts` now guards against: a competitor's tagline as the headline (with its name in the document title), an invented "trusted by 2,400+" social-proof pile, fabricated per-sector metrics with two sectors pointing at the wrong template, a block gallery that stated counts it did not have and pointed every card at the same route, an empty editor pane, a second duplicate theme customiser, a "Zero deps" claim next to a package.json with six runtime dependencies, and an MIT grant the repository does not make.

### 4.2 Components index — `/components`

- Above the fold: search (`?q=`, matches name, keyword, tag and prop name), category chips (8), a light/dark toggle that switches **all** previews, and a density control (1/2/3 columns).
- Each card: live preview (not a screenshot), name, one-line description, tags, `Pro` badge if applicable, and a `Copy import` action on hover/focus.
- Grouped by category, in the fixed order of §3.2; empty search states are real empty states with suggestions.

### 4.3 Blocks & templates indexes

- **Blocks**: 31 entries, category filters, preview at real size, `Pro` badge, and — the fix — **each block has its own route** `/blocks/{key}`.

  **Built (this pass).** The page is `/blocks/{key}`, rendered by `src/pages/BlockPage.tsx` and registered in `App.tsx` (`isBlockPage`). It carries: the breadcrumb, the block's own preview with the three-viewport switcher and copyable source (the same `BlockExample` the gallery uses), a **Built with** manifest, the accessibility notes, prev/next, and the way back to the gallery. The gallery's card titles link into it. Measured: **31/31 deep-linkable**, up from 0.

  Three rules the implementation follows, each with a check:

  1. **The component manifest is derived, never listed.** `getBlockComponents()` parses the block's own function body, keeps only names imported from `../ui/*`, and follows one level of composition (`HeroBlock` is a thin wrapper over `HeroLitBlock`). Aliases where the export name and the page genuinely differ (`Kbd` → Keyboard Key, `Divider` → Content Divider, the product patterns → `/patterns`) live in one table in `src/docs/block-source.ts`. `tests/block-manifest.test.ts` fails if an alias 404s, if a block resolves nothing while importing `src/ui`, or if a block has no notes.
  2. **Blocks never open a second `<h1>`.** A block is a section of a page, and the page already has a heading — this was wrong in 7 places (three marketing heroes, four application screens) and only surfaced when a real-browser test counted the headings on `/blocks/template-team`. `design-lint` now blocks `<h1>` in `src/blocks/`, and because the template screens are registered as blocks the same test covers them.
  3. **The accessibility notes say what is *not* handled.** Every claim is one the gates can back; where an example leaves a gap (sign-in failure has no error surface, the command palette exposes no `aria-activedescendant`), the note names it and the fix. A page that lists only strengths is a brochure.

  **Nav carve-out.** Block pages are deliberately *not* sidebar entries: 31 rows would bury the navigation. They are therefore derived from the block registry by `scripts/routes.mjs`, which `smoke.mjs` and `a11y-audit.mjs` both read — so the §10 rule "no orphan routes" holds in the direction that matters (every route is gated), while the router itself is the source of truth for the detail routes.
- **Templates**: `/templates/{key}` with a full-page preview, the responsive frame (desktop/tablet/mobile), the component manifest, and **"Make it yours"** — three token recipes per screen.

  **Built (this pass).** All five pages are rendered by one component, `src/pages/TemplateAnatomy.tsx`, so their anatomy cannot drift: heading → preview (with viewport switcher, canvas theme and copyable source) → **Built with** (derived from the registered screen's own source, exactly as on `/blocks/{key}`) → **Make it yours** → prev/next → the way back to `/templates`. `surface.spec` asserts all five carry the same sections.

  **Recipes are prescriptions, not explanations.** Foundations → Themes documents the whole input space; a template recipe says what *this screen* looks like as a fintech product instead of a developer tool. Each names an accent, a radius preset and a mode, and those names are resolved against `ACCENT_PRESETS`/`RADIUS_PRESETS` — the same lists the header popover and the themes page render — so a recipe cannot invent a value, and `tests/template-recipes.test.ts` fails if a preset is renamed out from under one. Applying a recipe calls the real `useTheme()`: the page re-themes, **the preview above it re-themes**, the header popover's selection moves with it, and the code block beside it is what you would paste into your own project to get the same result. `surface.spec` asserts the applied values (Azure = `--accent-h: 240`, Tight = `0.5`, dark) and that reset restores.

  **The AI screen was invisible to the registry.** `template-ai` was not registered in `src/blocks/index.tsx`, which is why its manifest resolved nothing — the "Built with" section is what found it. It is a block now (32 registered), and `tests/template-recipes.test.ts` asserts every template has a registered screen.

  Both of these pages render inside `DocsLayout`, which owns `<main>`: the anatomy deliberately does **not** open a second landmark. (The first version did, and the test caught it in the same run as the missing pager links.)

### 4.4 The component page — the killer feature

The section order is normative (`COMPONENT-QUALITY-SPEC.md` §8) and the tier decides depth. The page's shape:

```
Components / Actions                                     ← breadcrumb = category
Button                                          [Pro] [Copy import]
The base action. Five intents, five modes, five sizes, six states.
[5 intents] [5 modes] [5 sizes] [used in 12 blocks]       ← capability tags

┌─ Playground ────────────────────────────────────────────────────────────┐
│  [ live preview ]                          [Preview | Code]  [⌘] [⟳] [⧉] │
│  ▸ Variant [Primary ▾]  Mode [Filled ▾]  Size [LG ▾]  Icon [None ▾]     │
│  ▸ Content [Continue ▾]  State [Default ▾]  [ dark canvas ] [ 390px ]   │
└─────────────────────────────────────────────────────────────────────────┘
    ↑ controls ↔ code stay in sync; the code tab is editable; copy = the code below

Variants        full 5 × 5 intent × mode matrix, every cell labelled
Sizes           XS·SM·MD·LG·XL at real size, with px
States          default · hover · focus · active · disabled · loading
With icons      text · leading · trailing · both · icon-only (aria-label shown)
Composition     2–3 real assemblies (form submit row, destructive confirm, …)
Accessibility   keyboard table, announced state, focus behaviour
API             props table incl. aliases + precedence; controlled/uncontrolled example
Source          full source + copy
```

Additional requirements: every section header is an anchor (`#variants`); the page is axe-clean in both themes; the "used in" list is computed from the block registry (so it cannot lie); a "Related" strip links neighbours in the same category.

### 4.5 Foundations pages

Unchanged structure, one requirement added: **every token table is generated from `src/index.css`** (the tokens exporter already exists — `npm run tokens:export`), and each foundation page ends with "which components use this" links, turning theory into navigation.

### 4.6 Docs pages

`Introduction` (what this is + the 60-second tour), `Installation` (package + copy-paste paths, prerequisites, framework notes), `Principles`, `Changelog` (drives the `New`/`Updated` badges). Installation is the funnel: it must show the real import line and a first working example per framework.

---

## 5. The playground

The playground is the highest-value missing surface: it turns "there is a component" into "I have configured the component I want."

### 5.1 Two forms, one implementation

| Form | Where | Purpose |
|---|---|---|
| **Inline playground** | Every Phase-A component page, section 3 | Configure and copy without leaving the page |
| **Full playground** | `/playground` (route) | Larger canvas, all controls, saved/shared state, no docs chrome |

Both are the same component (`<Playground/>`), differing only in available width and control set.

> **Reference implementation (built):** `src/docs/Playground.tsx` — controlled by the page, driven by `react-live`, with viewport switcher, canvas theme, reset, copy (including the import lines) and a readable error surface. First adopter: `src/pages/components/ButtonDoc.tsx` (`#/components/button`), whose state is mirrored into the hash (`useHashParams`, `src/lib/hooks.ts`). Copy this pattern for every Tier A page.

### 5.2 Layout

```
┌─────────────────────────────────────────────────────────────┐
│ Button                                      [Copy] [Open]   │
├─────────────────────────────────────────────────────────────┤
│                    [ Continue → ]                           │
├───────────────────────┬─────────────────────────────────────┤
│ Controls              │ Code                                │
│ Variant [ Primary ▾ ] │ <Button variant="primary"           │
│ Mode    [ Filled  ▾ ] │   mode="filled" size="lg"           │
│ Size    [ LG      ▾ ] │   endContent={<RiArrowRightLine/>}> │
│ Icon    [ Trailing ▾] │   Continue                          │
│ State   [ Default ▾ ] │ </Button>                           │
│                       │ [ Copy ]                            │
└───────────────────────┴─────────────────────────────────────┘
```

### 5.3 Behavior contract

1. **Controls ↔ code are one state.** No control may exist that the code cannot express, and no code the controls cannot reach (the inline playground is a *subset* of the API, never a different API).
2. **Code is editable.** Editing the code re-renders the preview; the controls reset to the closest matching state (or show an "edited" chip with a reset). `react-live` is already a dependency.
3. **Copy copies exactly what is shown** — canonical vocabulary (`tone`/`variant`), never the display vocabulary, never a truncated snippet.
4. **Reset** returns to the component's documented default cell.
5. **Toggling to Code** must not lose control state; toggling back must not lose edits.
6. **Error handling**: invalid edited code shows a readable error in place of the preview (`LiveError`), never a blank canvas or a console-only failure.
7. **Performance**: the preview renders only when visible (idle-mount), and edits are not persisted to storage beyond the session.
8. **No network**: the playground never fetches; everything compiles locally.

### 5.4 Deep-linkable state (shareability)

- State serialises to the query string: `?variant=primary&mode=filled&size=lg&icon=trailing&state=loading&theme=dark&viewport=390`.
- Canonical values only; unknown params are dropped silently; defaults are omitted so a "clean" URL stays short.
- A share affordance copies the URL; the receiver sees the identical configuration.
- The page works with all params stripped (§2.3).

### 5.5 The playground's own accessibility

The playground is a component in the dock: toolbar buttons have accessible names, the controls are real labelled form fields, viewport/theme toggles and **every option control expose their selected state** (`aria-pressed` — `OptionPicker` does this for the whole docs site), the preview region is **not** a live region (it must not spam screen readers on every keystroke), and the code editor is a labelled multiline text field.

> **Editor labelling note:** `react-live`'s `LiveEditor` forwards only `className`/`style` to a `contentEditable <pre>` and drops ARIA props, and `use-editable` listens for keydown/keyup/paste (not `input`). `src/docs/Playground.tsx` therefore labels the editable node itself (`role="textbox"`, `aria-multiline`, accessible name) in an effect. If the editor is ever swapped, that shim goes with it; `tests-browser/playground.spec.ts` locks the behaviour.

Toolbar and controls are keyboard-complete: `Tab` in order, `Enter/Space` to act, `Esc` to reset a field where applicable.

---

## 6. Search & discovery

Existing: `Cmd/Ctrl-K` palette with keyboard navigation, `aria-autocomplete`, `role="listbox"`, empty state, and `aria-activedescendant` management (`src/docs/Shell.tsx`). Required upgrades:

| Requirement | Detail |
|---|---|
| Index sources | Nav titles + keywords, component names, **prop names** (`mode`, `tone`), block/template titles, foundation topics |
| Ranking | Exact name > name prefix > keyword > prop > description; ties broken by category order (§3.2) |
| Result anatomy | Name, category, badge, and the matched field highlighted; `Enter` navigates, `Cmd+Enter` opens in a new tab |
| Synonyms | `filled/stroke/lighter/ghost` → the same results as `solid/outline/soft/ghost` (display vocabulary is searchable) |
| Recents | Last 5 visited pages, session-scoped, shown with an empty query |
| No-result state | "No results for _x_" + the three most likely categories + a link to `/components` |
| Keyboard | `↑↓`, `Enter`, `Esc`, `Home/End`; focus is trapped while open and returned to the trigger on close |
| Site search parity | The `/components` index search uses the same ranker as the palette — one implementation |

---

## 7. Responsive, theme and quality budgets (the site itself)

| Budget | Requirement | Gate |
|---|---|---|
| Reflow | No horizontal overflow 320 → 1600px; 200%-zoom equivalent usable | `tests-browser/responsive.spec.ts` |
| Dark mode | Every docs page correct in dark **and** light, including previews (canvas toggle), code blocks, and the sidebar | browser axe per theme |
| Contrast | AA in both themes, including code-block token colours and canvas chrome | browser axe (contrast rule) |
| Motion | Docs and previews respect `prefers-reduced-motion` | token rule + manual |
| Accessibility | axe-clean on every route, both themes; skip-link; focus visible on every control | `npm test` + `test:browser` |
| Visual stability | Baselines for 29 core surfaces × 2 themes; new Tier A pages add baselines | `tests-browser/visual.spec.ts` |
| Performance | Docs route JS stays flat as components grow (per-page previews, no global heavy deps); the palette and playground are code-split | roadmap Phase 2 |
| Content | No hard-coded counts, no screenshot-only examples, no lorem | `design-lint` + review |

---

## 8. The Figma bridge — `/figma`

AlignUI's credibility partly comes from code/Figma alignment. Unseen's version, scoped to what is verifiable:

1. **Naming parity is the contract**: a component's Figma name = its React export (`Button` = `Button`), a variant axis = the prop name (`tone`, `variant`, `size`), a variant value = the canonical value (`accent`, `solid`, `md`). `CONVENTIONS.md` §3 already states this; `/figma` publishes the table.
2. **Token parity**: `npm run tokens:export` produces the token file(s); the page documents the export, its shape, and how to re-run it when tokens change.
3. **Parity table**: every component → Figma component name → status (`none` / `base` / `variants` / `complete`). Generated from a registry field, so it is honest; a component without a Figma counterpart says so.
4. **Kit structure**: Foundations (tokens), Components (with variant properties mirroring the axes), Patterns (blocks), Templates.
5. **No promises in prose**: no "100% parity" claims — the table is the claim.

**Built (sprint 5).** The page is live at `/figma` and every number on it is derived:

| Piece | Where | What it does |
|---|---|---|
| `/figma` | `src/pages/Figma.tsx` | Naming contract (worked example), kit structure, and the filterable parity table |
| Status field | `src/docs/figma-status.ts` | `none` \| `base` \| `variants` \| `complete` per React export; the map is **empty**, so every row renders "Not published" and the page says exactly that |
| Shared facts | `src/docs/figma-facts.ts` | Token/variable counts, the worked example and its JSX — imported by `/figma` *and* the homepage band, so the two cannot drift |
| Naming artifact | `audit/variant-audit.json` | `audit:variants:write` writes it, `audit:variants:check` diffs it (64 components · 1354 cells · axes with their canonical values) |
| Homepage band | `src/pages/Home.tsx` → `FigmaBand` | React snippet → Figma component, with the export counts underneath |

The status rule is tested, not assumed (`tests/figma.test.ts`): a key that is not a real component fails, a `variants`/`complete` claim on a component with no axes to mirror fails, and the page has to read its statuses from the module rather than hold a copy.

**What the gate caught.** Wiring `tokens:check` into `npm test` (it had never run in a defined pipeline — see the CI note below) proved the committed export was two motion tokens behind `src/index.css`. The export is regenerated and committed, so the page's token count is now 337.

**Still true:** there is no Figma library. The page publishes the export and the contract a kit would have to match, and says so in as many words.

---

## 9. Home-page copy rules and honest numbers

- Counts are **generated**: components, blocks, templates and routes are printed from the registries at build time; `COMPONENT-QUALITY-SPEC.md` §9.4 governs which number is head-lined (bar-passing, not total exports).
- The homepage may say "117 components" only when the scorecard backs it; the quality proof is the matrices, not the number.
- "Accessible" is only claimed with the receipt: axe on all routes × both themes, keyboard contracts, and a link to how it is enforced.
- Comparisons to other systems are banned in copy; parity tables (like `ALIGNUI-PARITY-2026-09-17.md`) live in the repo, not on the site. A competitor's name must not appear in the product at all — `tests-browser/surface.spec.ts` scans the shipped copy for them.
- **A licence is stated only where one exists.** The repository is MIT licensed (`LICENSE`), so the site names MIT. The pairing is mechanical: the `licence-claim` rule in `scripts/design-lint.mjs` fails the build if copy names a licence the repository does not hold, or names an identifier that disagrees with `package.json`. Remove `LICENSE` and eight findings appear across `Shell`, `Blocks`, `ComponentsIndex`, `GettingStarted`, `Pricing` and `Home`.
- **No empty chrome.** An editor pane, preview frame or canvas that can render empty must not be shipped in that state. The hero editor had a blank pane and was rebuilt.

---

## 10. Definition of done for a website change

- [ ] Route registered in `src/pages/registry.tsx` **and** `src/docs/nav.ts` with keywords; no orphan routes either way (`design-lint` route rule). *Exception:* generated detail routes (`/blocks/{key}`) are registered in the router and derived by `scripts/routes.mjs` instead of the nav — see §4.3.
- [ ] Every component on the page comes from `src/ui`; every colour/space/type value from a token
- [ ] Preview is live and responsive (320 / 768 / 1440) — screenshots are not acceptable
- [ ] Every code sample is copyable, runnable as written, and uses canonical vocabulary
- [ ] Light and dark verified; axe-clean in both
- [ ] Keyboard-only pass on any new interactive chrome (playground, palette, index filters)
- [ ] Deep links work with params stripped and with params set
- [ ] Counts on the page come from registries/scripts
- [ ] `npm test` green — it is the whole pipeline (types, unit, design-lint, quality ratchet, `tokens:check`, both variant audits, build, smoke, axe) and `.github/workflows/quality.yml` runs exactly it; baseline refrozen if a Tier A surface changed
- [ ] If the page is a new core surface, add it to `tests-browser/visual.spec.ts`
- [ ] One page component per route, with a **globally unique export name** — duplicate doc export names are reported by `npm run quality:report` (they would otherwise grade the wrong page)

---

## 11. Metrics that define site success

| Metric | Target | How it is measured today |
|---|---|---|
| Time-to-copy on a component page | < 60s from landing | manual study (scripted: sections present, playground above the fold, copy affordance per code block) |
| Pages with a real playground | 100% of Tier A, then Tier B | `quality:report` (playground check per component) |
| Deep-linkable blocks | **32/32** (was 0) | block registry routes · `siteRoutes()` feeds smoke + axe |
| Orphan routes | 0 | `design-lint` + `quality:report -- --ia` |
| Category coverage | 8/8 non-empty, 80/80 mapped | `audit/ia-taxonomy.json` |
| Site accessibility | 0 axe violations, all routes, both themes | `npm test` + `test:browser` |
| Content drift | 0 hard-coded counts | `design-lint` review rule |

---

## 12. Sprint mapping (who owns what)

| Sprint | Scope | Repo artifacts |
|---|---|---|
| **1 — Component quality** | Audit, normalise APIs/variants/sizes/states, dark mode, keyboard, missing states | `COMPONENT-QUALITY-SPEC.md`, `QUALITY-SCORECARD.md`, `audit/quality-baseline.json` (ratchet) |
| **2 — Component website** | Nav taxonomy (§3), search (§6), component page anatomy with playground (§4.4, §5), copy buttons, API tables, responsive preview, light/dark | `src/docs/nav.ts`, `src/docs/Playground.tsx`, `src/pages/components/**`, `audit/ia-taxonomy.json` |
| **3 — Blocks** | Per-block routes, categories, anatomy pages, component manifests | `src/blocks/index.tsx`, `/blocks/{key}` |
| **4 — Templates** | Template pages, responsive frames, "make it yours" token recipes | `src/pages/Templates.tsx`, `src/pages/TemplateAnatomy.tsx`, `src/pages/template-recipes.ts`, `/templates/{key}` |
| **5 — Figma + ecosystem** | Parity table, token export docs, kit structure, the naming artifact, homepage band, CI gate | `src/pages/Figma.tsx`, `src/docs/figma-status.ts`, `src/docs/figma-facts.ts`, `src/pages/Home.tsx` (⁠`FigmaBand`), `audit/variant-audit.json`, `.github/workflows/quality.yml` — **built**; CLI/package remains on the packaging roadmap |

---

## Appendix A — Component → category map (generated)

> Generated from `audit/ia-taxonomy.json`; validated by `npm run quality:report -- --ia` (fails on orphans or unmapped components).

### Actions — Things users press. Intent × mode × size × icon content. _(9)_

| Component | Route | Pro |
|---|---|---|
| Button | `components/button` | · |
| Fancy Button | `components/fancy-button` | · |
| Button Tile | `components/button-tile` | · |
| Toolbar | `components/toolbar` | · |
| Compact Button | `components/compact-button` | · |
| Link Button | `components/link-button` | · |
| Social Button | `components/social-button` | · |
| Button Group | `components/button-group` | · |
| Toggle Group | `components/toggle-group` | · |

### Forms — Everything that captures input, including AI, money and time. _(21)_

| Component | Route | Pro |
|---|---|---|
| AI Prompt Input | `components/ai-prompt-input` | Pro |
| Currency Amount Input | `components/currency-amount-input` | Pro |
| File Uploader | `components/file-uploader` | Pro |
| Time Picker | `components/time-picker` | Pro |
| Calendar | `components/calendar` | Pro |
| Input | `components/input` | · |
| Textarea | `components/textarea` | · |
| Select | `components/select` | · |
| Checkbox | `components/checkbox` | · |
| Radio Group | `components/radio-group` | · |
| Switch | `components/switch` | · |
| Slider | `components/slider` | · |
| Digit Input | `components/digit-input` | · |
| Datepicker | `components/datepicker` | · |
| Label & Hint | `components/label-hint` | · |
| Checkbox & Radio Card | `components/selection-card` | · |
| Number, Search & Counter | `components/inputs-more` | · |
| Rating | `components/rating` | · |
| Color Picker | `components/color-picker` | · |
| Combobox | `components/combobox` | · |
| Chat Input | `components/chat-input` | · |

### Data Display — Surfaces that present state, identity and numbers. _(19)_

| Component | Route | Pro |
|---|---|---|
| Crypto Address Chip | `components/crypto-address-chip` | Pro |
| Activity Feed | `components/activity-feed` | Pro |
| Notification Feed | `components/notification-feed` | Pro |
| Card | `components/card` | · |
| Featured Icon | `components/featured-icon` | · |
| Table | `components/table` | · |
| Data Table | `components/data-table` | · |
| Avatar | `components/avatar` | · |
| Avatar Group | `components/avatar-group` | · |
| Chip | `components/chip` | · |
| Status Badge | `components/status-badge` | · |
| Tag | `components/tag` | · |
| Badge | `components/badge` | · |
| Info Label & Message | `components/info-label` | · |
| List Item | `components/list-item` | · |
| Payment Card | `components/payment-card` | · |
| Progress | `components/progress` | · |
| Skeleton | `components/skeleton` | · |
| Timeline | `components/timeline` | · |

### Navigation — Moving between places, views and steps. _(8)_

| Component | Route | Pro |
|---|---|---|
| Tabs | `components/tabs` | · |
| Tab Menu Horizontal | `components/tab-menu-horizontal` | · |
| Segmented Control | `components/segmented-control` | · |
| Stepper | `components/stepper` | · |
| Tab Menu Vertical | `components/tab-menu-vertical` | · |
| Accordion | `components/accordion` | · |
| Breadcrumbs | `components/breadcrumbs` | · |
| Pagination | `components/pagination` | · |

### Feedback — Telling the user what happened, inline and transient. _(6)_

| Component | Route | Pro |
|---|---|---|
| Alert | `components/alert` | · |
| Notification | `components/notification` | · |
| Banner | `components/banner` | · |
| Toast | `components/toast` | · |
| Empty State | `components/empty-state` | · |
| Spinner | `components/spinner` | · |

### Overlay — Content layered above the page, with focus management. _(9)_

| Component | Route | Pro |
|---|---|---|
| Command Menu | `components/command-menu` | Pro |
| Modal | `components/modal` | · |
| Alert Dialog | `components/alert-dialog` | · |
| Hover Card | `components/hover-card` | · |
| Drawer | `components/drawer` | · |
| Tooltip | `components/tooltip` | · |
| Popover | `components/popover` | · |
| Dropdown | `components/dropdown` | · |
| Menu | `components/menu` | · |

### Layout — Structure, rhythm and containers. Small today, load-bearing forever. _(3)_

| Component | Route | Pro |
|---|---|---|
| Well | `components/well` | · |
| Widget Box | `components/widget-box` | · |
| Content Divider | `components/content-divider` | · |

### Utilities — Small helpers that make other components usable: code, keys, media. _(5)_

| Component | Route | Pro |
|---|---|---|
| Voice Visualizer | `components/voice-visualizer` | Pro |
| Filters | `components/filters` | Pro |
| Snippet | `components/snippet` | · |
| Keyboard Key | `components/kbd` | · |
| File Format Icon | `components/file-format-icon` | · |

## Appendix B — Route inventory and migration

| Route | Kind | Status | Action |
|---|---|---|---|
| `/` | home | exists | rebuild per §4.1 |
| `/components` | index | exists | add category grouping, tags, `?q=`, dark toggle |
| `/components/{slug}` (80) | component pages | exists | add playground + full anatomy per `COMPONENT-QUALITY-SPEC.md` §8 |
| `/components/badge-spec`, `/components/badge-overlay` | legacy duplicates | exists | redirect → `/components/badge` |
| `/blocks` | index | exists | add per-block deep links + Pro badges |
| `/blocks/{key}` (33) | block pages | **missing** | build |
| `/templates` + `/templates/{key}` | templates | exists (5) | add component manifests |
| `/foundations/{topic}` (13) | foundations | exists | generate tables from tokens; add "used by" links |
| `/playground` | playground | **missing** | build (§5) |
| `/figma` | bridge | **missing** | build (§8) |
| `/patterns` | compositions | exists | reframe as Blocks → Patterns |
| `/pricing`, `/docs/*` | marketing / docs | exists | unchanged (installation is the funnel) |

## Appendix C — IA defects found in this audit

1. **`PRO` is a nav category** (11 components) — a price tier occupying the first shelf; dissolves into §3.3.
2. **`Feedback & Overlays` is two mental models in one group** — split into Feedback (6) and Overlay (9).
3. **Structural primitives buried in `Data Display`** — `Widget Box`, `Well`, `Content Divider` move to Layout.
4. **Two duplicate Badge routes** (`badge-spec`, `badge-overlay`) — redirect and delete.
5. **33 blocks, zero deep links** — the highest-traffic content on the site is not addressable or shareable.
6. **No Layout/Utilities categories** — 3 and 5 components respectively have no home matching their purpose.
7. **Playground exists on the homepage only** — the strongest interaction in the codebase is not applied where users need it (per-component configuration).
8. **No Figma page** — naming parity is documented in `CONVENTIONS.md` §3 but invisible to visitors.
9. **Counts are hard-coded in places** (e.g. `76+ Components` in homepage copy vs 117 exports) — must come from registries (§9).

## Appendix D — Related documents

| Document | Role |
|---|---|
| `COMPONENT-QUALITY-SPEC.md` | The bar components must clear before they appear on these pages |
| `CONVENTIONS.md` | System rules (axes, naming, a11y, docs anatomy, new-component checklist) |
| `QUALITY-SCORECARD.md` | Generated grades + debt ledger |
| `COMPONENT-AUDIT.md` | Generated state/a11y/docs matrix |
| `audit/ia-taxonomy.json` | Machine-readable taxonomy (categories, members, legacy routes, Pro badges) |
| `UNSEEN-V2-ROADMAP.md` / `UNSEEN-ROADMAP-2026-09-17.md` | Plan and phased engineering roadmap |
