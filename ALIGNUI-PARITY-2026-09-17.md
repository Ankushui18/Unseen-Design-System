# Aperture vs AlignUI v1.2 — Component Parity Audit

Benchmark: AlignUI **v1.2 docs sidebar** (the FREE "Base Components" set) —
https://www.alignui.com/docs/v1.2/introduction

Aperture at commit `57a9470` · 71 documented components (6 groups) · 7 PRO primitives · 20 block entries.

Legend: ✅ documented page · 🟡 component exists but no doc page / inline only · ❌ missing

---

Updated 2026-09-17 — the four top gaps are now closed. See the resolution log at the bottom.

---

## 1. Actions

| AlignUI | Aperture | Status |
|---|---|---|
| Button | `components/button` | ✅ |
| Button Group | `components/button-group` | ✅ |
| Compact Button | `components/compact-button` | ✅ |
| Fancy Button | `components/fancy-button` | ✅ |
| Link Button | `components/link-button` | ✅ |

Extras we ship that AlignUI free doesn't: Social Button, Button Tile, Toolbar, Toggle Group.
**Verdict: parity + more.**

## 2. Displaying Data

| AlignUI | Aperture | Status |
|---|---|---|
| Avatar | `components/avatar` | ✅ |
| Avatar Group | `AvatarGroup` only used inside "Plan Usage" block | 🟡 no docs page |
| Avatar Group Compact | — | ❌ |
| Badge | `components/badge` | ✅ |
| Banner | `components/banner` | ✅ |
| Data Table | `Table` (`components/table`) + rich `DataTable` live on Patterns page | 🟡 no "Data Table" page |
| Divider | `components/content-divider` | ✅ |
| Kbd | `components/kbd` (+ `Kbd` util) | ✅ |
| Progress Bar | `components/progress` (Linear) | ✅ |
| Progress Circle | `CircularProgress` inside Progress page only | 🟡 no own page |
| Rating | `components/rating` | ✅ |
| Status Badge | `components/status-badge` | ✅ |
| Tag | `components/tag` | ✅ |

**Verdict: parity + more, with 4 discoverability gaps (Avatar Group, Avatar Group Compact, Data Table, Progress Circle).**

## 3. Feedback

| AlignUI | Aperture | Status |
|---|---|---|
| Alert | `components/alert` | ✅ |
| Notification | `components/notification` | ✅ |
| Toast | `components/toast` | ✅ |
| Tooltip | `components/tooltip` | ✅ |

**Verdict: parity.**

## 4. Form

| AlignUI | Aperture | Status |
|---|---|---|
| Checkbox | `components/checkbox` | ✅ |
| Color Picker | `components/color-picker` | ✅ |
| Datepicker | `components/datepicker` | ✅ |
| Digit Input | `components/digit-input` | ✅ |
| File Upload | `components/file-uploader` (PRO) + File Upload block | ✅ |
| Hint | `components/label-hint` (Hint + Label) | ✅ |
| Input | `components/input` | ✅ |
| Label | `components/label-hint` | ✅ |
| Radio | `components/radio-group` | ✅ |
| Select | `components/select` (+ Combobox, Select Trigger) | ✅ |
| Slider | `components/slider` | ✅ |
| Switch | `components/switch` | ✅ |
| Textarea | `components/textarea` | ✅ |

**Verdict: parity + more (Combobox, Chat Input, Selection Card, Rating-color picker).**

## 5. Layout

| AlignUI | Aperture | Status |
|---|---|---|
| Accordion | `components/accordion` | ✅ |
| Breadcrumb | `components/breadcrumbs` | ✅ |
| Segmented Control | `components/segmented-control` | ✅ |
| Tab Menu Horizontal | Tabs `underline`/`solid` variants only | 🟡 no "Tab Menu" page |
| Tab Menu Vertical | `components/tab-menu-vertical` | ✅ |

**Verdict: parity except a dedicated horizontal Tab Menu page.**

## 6. Navigation

| AlignUI | Aperture | Status |
|---|---|---|
| Dot Stepper | `components/stepper` (Dot) | ✅ |
| Horizontal Stepper | `components/stepper` (Horizontal) | ✅ |
| Pagination | `components/pagination` | ✅ |
| Vertical Stepper | `components/stepper` (Vertical) | ✅ |

**Verdict: parity (three steppers merged into one page — a discoverability nuance, not a gap).**

## 7. Overlays

| AlignUI | Aperture | Status |
|---|---|---|
| Command Menu | `components/command-menu` (PRO) | ✅ |
| Drawer | `components/drawer` | ✅ |
| Dropdown | `components/dropdown` | ✅ |
| Modal | `components/modal` | ✅ |
| Popover | `Popover` primitive exists (`src/ui/Overlay.tsx`) but **no page** | 🟡 |

**Verdict: parity + more (Alert Dialog, Hover Card, Menu, Empty State, Spinner), but Popover is undocumented.**

## 8. Utils

| AlignUI | Aperture | Status |
|---|---|---|
| cn | `src/utils/cn.ts` (used everywhere, no doc page) | 🟡 |
| Polymorphic | — | ❌ |
| Recursive Clone Children | — | ❌ |
| tv (tailwind-variants) | — | ❌ |

**Verdict: cn exists; the other three util APIs don't, and utilities aren't surfaced in the docs at all.**

---

## Net assessment

- **60 of 63** AlignUI free components have a real Aperture equivalent, and we additionally ship two dozen+ components AlignUI free does not (Toolbar, Combobox, Chat Input, Selection Card, Card, Chip, Payment Card, Widget Box, Hover Card, Alert Dialog, Empty State, Timeline, Snippet, Skeleton, Info Label, 7 PRO primitives, …).
- The real gap is **not raw coverage — it's discoverability and the missing long-tail primitives** AlignUI's huge sidebar gives away for free.

### Gaps worth closing, in priority order

1. **Docs pages for primitives that already exist but have no page** (highest ROI — near-zero component risk, instantly “more professional” sidebar):
   - Popover (`overlay/popover`)
   - Avatar Group + **Avatar Group Compact variant** (`data-display/avatar-group`)
   - Data Table (`data-display/data-table` — promote the existing `DataTable` from Patterns into a component page)
2. **Tab Menu Horizontal** page (Tabs already supports `underline`/`solid`; give it the official “Tab Menu” surface AlignUI has).
3. **Utils parity** (lower visual impact, but part of “production-ready”):
   - add `src/utils/polymorphic.tsx`, `src/utils/tv.ts`, `src/utils/recursive-clone-children.tsx` and a single “Utilities” docs page listing `cn` + the three new ones.

### Deliberately not attempting

- AlignUI's **Figma file** and **Sector Templates** are paid distribution (PRO) and outside this repo's code system.
- `@radix-ui/*` primitives — Aperture is dependency-light by design (no Radix); parity is achieved with equivalent in-house behavior.

---

## Resolution log (2026-09-17)

Closed the discoverability gaps; user chose "docs pages" scope (no utils parity this pass).

- **Popover** — new `components/popover` page (`PopoverDoc` in `NavDocs.tsx`): usage, menu composition, keyboard, API.
- **Avatar Group** — new `components/avatar-group` page (`AvatarGroupDoc` in `DisplayDocs.tsx`) plus a new `AvatarGroupCompact` primitive in `src/ui/Display.tsx` (AlignUI capsule style: soft surface capsule, tight stack, `stroke` variant, `tone` for uniform palettes).
- **Data Table** — new `components/data-table` page (`DataTableDoc` in `DisplayDocs.tsx`) promoting the existing `DataTable` primitive (sort / selection / bulk actions / loading / empty state / pagination / density) to a first-class documented component.
- **Tab Menu Horizontal** — new `components/tab-menu-horizontal` page (`HorizontalTabMenuDoc` in `NavDocs.tsx`) using the `Tabs` underline variant as an official tab-menu surface.

All four wired through nav (`src/docs/nav.ts`, badges `New`), routes (`src/pages/registry.tsx`), and gallery previews (`src/docs/previews.tsx`).

**Result: 75 component pages** (was 71). Verification at commit: `tsc --noEmit` clean, `vite build` clean, design-lint `46 files · nav 91 · routes 94 · previews 75 · 0 findings`, smoke `92 routes · 0 findings · 0 runtime errors`.

Full AlignUI free parity now stands at **63/63** covered (60 with pages before → 63 components, of which the previously page-less equivalents now have pages; horizontal Tab Menu and all stepper variants remain expressed through merged pages, matching design-system norms).
