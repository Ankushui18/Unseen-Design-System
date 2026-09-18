# Unseen Quality Scorecard (generated)

> Regenerate with: `npm run quality:report -- --md`
> Standard: `COMPONENT-QUALITY-SPEC.md` — this file is that spec applied to the current source.
> Ratchet: `audit/quality-baseline.json` · Gate: `npm test` (`quality:check`) · Promotion: `quality:check -- --strict`

**Tier A (flagship):** Button, Input, Select, Checkbox, Switch, Textarea, Card, Badge, Avatar, Tabs, Modal, Dropdown, Table, DataTable, Alert, Toast, Chip, FeaturedIcon, Kbd, Progress, FancyButton, LinkButton, CompactButton

**117 components** · **64** axis-bearing · **1354** variant cells · mean score **69.7** · at or above tier bar **21/117**
Grades: A 4 · B 10 · C 68 · D 35 — Tiers: A 23 · B 63 · C 31

## Grades by component

| Component | File | Tier | Cells | Score | Grade | At bar | Failing checks |
|---|---|---|---|---|---|---|---|
| Alert | `ui/Display.tsx` | A | 30 | 72.2 | C | ✗ | M4.tokens, M5.keyboard, M6.anatomy, M6.playground, M6.a11y-section |
| Avatar | `ui/Display.tsx` | A | 225 | 72.2 | C | ✗ | M2.matrix-rendered, M4.tokens, M6.anatomy, M6.playground, M6.a11y-section |
| Badge | `ui/Display.tsx` | A | 60 | 72.2 | C | ✗ | M4.tokens, M6.anatomy, M6.playground, M6.api, M6.a11y-section |
| Badge | `ui/Display.tsx` | A | 60 | 66.7 | C | ✗ | M1.cn, M4.tokens, M6.anatomy, M6.playground, M6.api, M6.a11y-section |
| Button | `ui/Button.tsx` | A | 125 | 100 | A | ✓ | — |
| Card | `ui/Display.tsx` | A | 3 | 77.8 | C | ✗ | M2.cells, M6.anatomy, M6.playground, M6.a11y-section |
| Checkbox | `ui/Form.tsx` | A | 15 | 73.1 | C | ✗ | M2.matrix-rendered, M3.loading, M4.geometry, M5.aria, M6.anatomy, M6.playground, M6.a11y-section |
| Chip | `ui/Display.tsx` | A | 210 | 84.2 | B | ✗ | M6.anatomy, M6.playground, M6.a11y-section |
| CompactButton | `ui/Extra.tsx` | A | 45 | 72 | C | ✗ | M1.polymorphic, M3.loading, M3.unit-test, M4.geometry, M6.anatomy, M6.playground, M6.a11y-section |
| DataTable | `ui/ProductPatterns.tsx` | A | 2 | 64 | D | ✗ | M1.controlled, M2.cells, M2.matrix-rendered, M3.disabled, M3.focus, M4.tokens, M4.theme-parity, M6.anatomy, M6.a11y-section |
| Dropdown | `ui/More.tsx` | A | 8 | 54.2 | D | ✗ | M1.controlled, M2.cells, M2.matrix-rendered, M3.focus, M3.unit-test, M4.theme-parity, M4.geometry, M5.aria, M6.anatomy, M6.playground, M6.a11y-section |
| FancyButton | `ui/Button.tsx` | A | 30 | 76.9 | C | ✗ | M2.matrix-rendered, M3.unit-test, M4.tokens, M6.anatomy, M6.playground, M6.a11y-section |
| FeaturedIcon | `ui/Display.tsx` | A | 60 | 62.5 | D | ✗ | M2.matrix-rendered, M4.tokens, M4.geometry, M6.anatomy, M6.playground, M6.a11y-section |
| Input | `ui/Form.tsx` | A | 3 | 73.1 | C | ✗ | M2.cells, M2.matrix-rendered, M3.loading, M3.unit-test, M6.anatomy, M6.playground, M6.a11y-section |
| Kbd | `ui/Display.tsx` | A | 0 | 64.3 | D | ✗ | M4.tokens, M4.theme-parity, M6.anatomy, M6.playground, M6.a11y-section |
| LinkButton | `ui/Extra.tsx` | A | 60 | 65.4 | C | ✗ | M1.polymorphic, M2.matrix-rendered, M3.loading, M3.unit-test, M4.theme-parity, M5.icon-label, M6.anatomy, M6.playground, M6.a11y-section |
| Modal | `ui/Overlay.tsx` | A | 10 | 60 | D | ✗ | M1.ref, M2.cells, M2.matrix-rendered, M3.disabled, M3.focus, M4.geometry, M5.keyboard, M6.anatomy, M6.playground, M6.a11y-section |
| Progress | `ui/Display.tsx` | A | 15 | 73.7 | C | ✗ | M2.matrix-rendered, M4.tokens, M4.theme-parity, M6.anatomy, M6.a11y-section |
| Select | `ui/Form.tsx` | A | 3 | 76 | C | ✗ | M2.cells, M2.matrix-rendered, M3.loading, M6.anatomy, M6.playground, M6.a11y-section |
| Switch | `ui/Form.tsx` | A | 15 | 66.7 | C | ✗ | M1.controlled, M2.matrix-rendered, M3.loading, M3.error, M4.tokens, M4.geometry, M6.anatomy, M6.playground, M6.a11y-section |
| Table | `ui/Navigation.tsx` | A | 6 | 70.8 | C | ✗ | M2.cells, M2.matrix-rendered, M3.focus, M3.empty, M3.unit-test, M6.anatomy, M6.a11y-section |
| Tabs | `ui/Navigation.tsx` | A | 12 | 80 | B | ✗ | M1.controlled, M2.matrix-rendered, M6.anatomy, M6.a11y-section |
| Textarea | `ui/Form.tsx` | A | 3 | 69.2 | C | ✗ | M2.cells, M2.matrix-rendered, M3.loading, M3.unit-test, M5.role, M6.anatomy, M6.playground, M6.a11y-section |
| Accordion | `ui/Navigation.tsx` | B | 3 | 87.5 | B | ✓ | M2.cells, M6.anatomy |
| ActivityFeed | `ui/Pro.tsx` | B | 0 | 63.2 | D | ✗ | M1.axes, M2.axes, M3.disabled, M3.focus, M3.empty, M3.unit-test, M6.anatomy |
| AiPromptInput | `ui/Pro.tsx` | B | 0 | 63.6 | D | ✗ | M1.axes, M1.controlled, M2.axes, M3.error, M3.focus, M3.unit-test, M4.theme-parity, M6.anatomy |
| AlertDialog | `ui/Patterns.tsx` | B | 3 | 55 | D | ✗ | M1.ref, M1.cn, M2.cells, M2.matrix-rendered, M3.unit-test, M4.tokens, M5.role, M6.anatomy, M6.api |
| AvatarGroup | `ui/Display.tsx` | B | 4 | 75 | C | ✗ | M1.cn, M2.cells, M2.matrix-rendered, M6.anatomy |
| AvatarGroupCompact | `ui/Display.tsx` | B | 40 | 87.5 | B | ✓ | M2.matrix-rendered, M6.anatomy |
| Banner | `ui/Extra.tsx` | B | 15 | 73.3 | C | ✗ | M2.matrix-rendered, M5.ids, M6.anatomy, M6.code |
| Breadcrumbs | `ui/Navigation.tsx` | B | 0 | 71.4 | C | ✗ | M4.tokens, M4.theme-parity, M5.ids, M6.anatomy |
| ButtonGroup | `ui/Button.tsx` | B | 0 | 72.7 | C | ✗ | M1.axes, M1.polymorphic, M2.axes, M3.unit-test, M5.keyboard, M6.anatomy |
| ButtonTile | `ui/Patterns.tsx` | B | 3 | 73.9 | C | ✗ | M1.polymorphic, M2.cells, M2.matrix-rendered, M3.loading, M3.unit-test, M6.anatomy |
| Calendar | `ui/Pro.tsx` | B | 0 | 59.1 | D | ✗ | M1.axes, M1.controlled, M2.axes, M3.disabled, M3.error, M3.focus, M3.unit-test, M4.theme-parity, M6.anatomy |
| CardBody | `ui/Display.tsx` | B | 0 | 69.2 | C | ✗ | M1.axes, M2.axes, M4.tokens, M6.anatomy |
| CardFooter | `ui/Display.tsx` | B | 0 | 78.6 | C | ✗ | M1.axes, M2.axes, M6.anatomy |
| CardHeader | `ui/Display.tsx` | B | 0 | 69.2 | C | ✗ | M1.axes, M2.axes, M4.tokens, M6.anatomy |
| ChatInput | `ui/Patterns.tsx` | B | 0 | 63.6 | D | ✗ | M1.axes, M1.controlled, M2.axes, M3.loading, M3.error, M3.unit-test, M6.anatomy, M6.api |
| CircularProgress | `ui/Display.tsx` | B | 5 | 70.6 | C | ✗ | M1.cn, M2.cells, M2.matrix-rendered, M4.tokens, M6.anatomy |
| Code | `ui/Display.tsx` | B | 5 | 71.4 | C | ✗ | M2.cells, M2.matrix-rendered, M4.tokens, M6.anatomy |
| ColorPicker | `ui/More.tsx` | B | 0 | 54.5 | D | ✗ | M1.axes, M1.controlled, M2.axes, M3.disabled, M3.loading, M3.error, M3.focus, M3.unit-test, M6.anatomy, M6.api |
| Combobox | `ui/Patterns.tsx` | B | 3 | 75 | C | ✗ | M1.controlled, M2.cells, M2.matrix-rendered, M3.loading, M3.error, M6.anatomy |
| CommandMenu | `ui/Pro.tsx` | B | 0 | 61.9 | D | ✗ | M1.axes, M1.controlled, M2.axes, M3.disabled, M3.focus, M3.unit-test, M4.geometry, M6.anatomy |
| ContentDivider | `ui/More.tsx` | B | 4 | 69.2 | C | ✗ | M2.cells, M6.anatomy, M6.api, M6.code |
| CryptoAddressChip | `ui/Pro.tsx` | B | 0 | 80 | B | ✓ | M1.axes, M2.axes, M6.anatomy |
| CurrencyAmountInput | `ui/Pro.tsx` | B | 0 | 63.6 | D | ✗ | M1.axes, M1.controlled, M2.axes, M3.loading, M3.error, M3.focus, M3.unit-test, M6.anatomy |
| Datepicker | `ui/Extra.tsx` | B | 2 | 75 | C | ✗ | M1.controlled, M2.cells, M2.matrix-rendered, M3.loading, M4.geometry, M6.anatomy |
| DigitInput | `ui/Extra.tsx` | B | 3 | 79.2 | C | ✗ | M1.controlled, M2.cells, M2.matrix-rendered, M3.loading, M6.anatomy |
| Divider | `ui/Display.tsx` | B | 2 | 71.4 | C | ✗ | M2.cells, M4.tokens, M4.theme-parity, M6.anatomy |
| Drawer | `ui/Overlay.tsx` | B | 9 | 73.9 | C | ✗ | M2.matrix-rendered, M3.disabled, M3.focus, M4.geometry, M5.keyboard, M6.anatomy |
| EmptyState | `ui/More.tsx` | B | 3 | 71.4 | C | ✗ | M2.cells, M2.matrix-rendered, M3.disabled, M3.unit-test, M5.role, M6.anatomy |
| EmptyState | `ui/ProductPatterns.tsx` | B | 3 | 57.1 | D | ✗ | M2.cells, M2.matrix-rendered, M3.disabled, M3.focus, M3.unit-test, M4.tokens, M4.theme-parity, M5.role, M6.anatomy |
| ErrorState | `ui/ProductPatterns.tsx` | B | 0 | 75 | C | ✗ | M4.tokens, M4.theme-parity, M6.anatomy |
| FileFormatIcon | `ui/Extra.tsx` | B | 0 | 66.7 | C | ✗ | M4.tokens, M4.geometry, M6.anatomy, M6.api |
| FileUploader | `ui/Pro.tsx` | B | 0 | 68.2 | C | ✗ | M1.axes, M1.controlled, M2.axes, M3.loading, M3.focus, M3.unit-test, M6.anatomy |
| Filters | `ui/Pro.tsx` | B | 0 | 81.3 | C | ✗ | M1.controlled, M4.theme-parity, M6.anatomy |
| HoverCard | `ui/Patterns.tsx` | B | 0 | 57.9 | D | ✗ | M1.axes, M2.axes, M3.unit-test, M4.tokens, M4.theme-parity, M5.role, M6.anatomy, M6.api |
| InfoLabel | `ui/Patterns.tsx` | B | 5 | 59.1 | D | ✗ | M2.cells, M2.matrix-rendered, M3.loading, M3.error, M3.unit-test, M4.tokens, M5.role, M6.anatomy, M6.api |
| ListItem | `ui/Patterns.tsx` | B | 0 | 65 | C | ✗ | M1.axes, M2.axes, M3.empty, M3.unit-test, M5.role, M6.anatomy, M6.api |
| Notification | `ui/Extra.tsx` | B | 30 | 70.6 | C | ✗ | M2.matrix-rendered, M4.geometry, M5.keyboard, M5.ids, M6.anatomy |
| NotificationFeed | `ui/Pro.tsx` | B | 0 | 65 | C | ✗ | M1.axes, M2.axes, M3.focus, M3.empty, M3.unit-test, M4.theme-parity, M6.anatomy |
| Pagination | `ui/Navigation.tsx` | B | 0 | 80 | C | ✗ | M1.controlled, M5.ids, M6.anatomy |
| PaymentCard | `ui/Patterns.tsx` | B | 12 | 75 | C | ✗ | M2.matrix-rendered, M4.geometry, M6.anatomy, M6.api |
| Popover | `ui/Overlay.tsx` | B | 0 | 71.4 | C | ✗ | M1.axes, M2.axes, M3.disabled, M3.focus, M3.unit-test, M6.anatomy |
| RadioGroup | `ui/Form.tsx` | B | 30 | 76 | C | ✗ | M1.controlled, M2.matrix-rendered, M3.loading, M3.unit-test, M4.geometry, M6.anatomy |
| Rating | `ui/More.tsx` | B | 9 | 68 | C | ✗ | M1.controlled, M2.matrix-rendered, M3.loading, M3.error, M3.focus, M3.unit-test, M4.tokens, M6.anatomy |
| ScrollShadow | `ui/Display.tsx` | B | 0 | 78.6 | C | ✗ | M4.tokens, M5.keyboard, M6.anatomy |
| SegmentedControl | `ui/Extra.tsx` | B | 2 | 66.7 | C | ✗ | M1.controlled, M2.cells, M2.matrix-rendered, M5.keyboard, M5.icon-label, M6.anatomy |
| SelectionCard | `ui/More.tsx` | B | 2 | 62.5 | D | ✗ | M1.controlled, M2.cells, M2.matrix-rendered, M3.loading, M3.error, M3.focus, M3.unit-test, M4.geometry, M6.anatomy |
| Skeleton | `ui/Display.tsx` | B | 0 | 66.7 | C | ✗ | M1.axes, M2.axes, M4.tokens, M4.theme-parity, M6.anatomy |
| Slider | `ui/Form.tsx` | B | 30 | 75 | C | ✗ | M1.controlled, M2.matrix-rendered, M3.loading, M3.error, M4.tokens, M6.anatomy |
| Snippet | `ui/Display.tsx` | B | 0 | 85.7 | C | ✗ | M5.keyboard, M6.anatomy |
| SocialButton | `ui/Extra.tsx` | B | 54 | 79.2 | C | ✗ | M1.polymorphic, M2.matrix-rendered, M3.loading, M3.unit-test, M6.anatomy |
| Spinner | `ui/Button.tsx` | B | 0 | 71.4 | C | ✗ | M4.tokens, M4.theme-parity, M5.icon-label, M6.anatomy |
| StatusBadge | `ui/Extra.tsx` | B | 20 | 82.4 | C | ✗ | M2.matrix-rendered, M5.icon-label, M6.anatomy |
| Tag | `ui/Extra.tsx` | B | 30 | 83.3 | C | ✗ | M2.matrix-rendered, M5.icon-label, M6.anatomy |
| Timeline | `ui/More.tsx` | B | 5 | 66.7 | C | ✗ | M2.cells, M2.matrix-rendered, M3.disabled, M3.focus, M4.tokens, M6.anatomy, M6.api |
| TimePicker | `ui/Pro.tsx` | B | 0 | 52.2 | D | ✗ | M1.cn, M1.axes, M1.controlled, M2.axes, M3.disabled, M3.loading, M3.error, M3.focus, M3.unit-test, M4.theme-parity, M6.anatomy |
| ToastProvider | `ui/Overlay.tsx` | B | 4 | 66.7 | C | ✗ | M2.cells, M2.matrix-rendered, M3.disabled, M3.focus, M3.unit-test, M4.geometry, M6.anatomy |
| ToggleGroup | `ui/More.tsx` | B | 4 | 61.5 | D | ✗ | M1.polymorphic, M1.controlled, M2.cells, M2.matrix-rendered, M3.loading, M3.focus, M3.unit-test, M4.geometry, M5.keyboard, M6.anatomy |
| Toolbar | `ui/Patterns.tsx` | B | 2 | 69.6 | C | ✗ | M1.polymorphic, M2.cells, M2.matrix-rendered, M3.loading, M3.unit-test, M5.keyboard, M6.anatomy |
| Tooltip | `ui/Overlay.tsx` | B | 4 | 69.6 | C | ✗ | M2.cells, M2.matrix-rendered, M3.disabled, M3.focus, M3.unit-test, M4.tokens, M6.anatomy |
| User | `ui/Display.tsx` | B | 20 | 71.4 | C | ✗ | M2.matrix-rendered, M4.tokens, M4.theme-parity, M6.anatomy |
| VoiceVisualizer | `ui/Pro.tsx` | B | 0 | 92.3 | A | ✓ | M6.anatomy |
| Well | `ui/Patterns.tsx` | B | 3 | 68.8 | C | ✗ | M2.cells, M2.matrix-rendered, M6.anatomy, M6.api, M6.code |
| WidgetBox | `ui/More.tsx` | B | 2 | 82.4 | B | ✓ | M2.cells, M2.matrix-rendered, M6.anatomy |
| ActivityItem | `ui/ProductPatterns.tsx` | C | 10 | 75 | C | ✓ | M4.tokens, M4.theme-parity |
| CardGrid | `ui/ProductPatterns.tsx` | C | 0 | 42.9 | D | ✗ | M1.axes, M2.axes, M3.focus, M3.empty, M3.unit-test, M4.tokens, M4.theme-parity, M5.role |
| CopyField | `ui/ProductPatterns.tsx` | C | 0 | 100 | A | ✓ | — |
| DataCard | `ui/ProductPatterns.tsx` | C | 0 | 55.6 | D | ✗ | M1.axes, M2.axes, M4.tokens, M4.theme-parity |
| DotStepper | `ui/Extra.tsx` | C | 0 | 80 | B | ✓ | M1.controlled, M4.tokens |
| FilterBar | `ui/ProductPatterns.tsx` | C | 0 | 75 | C | ✓ | M4.tokens, M4.theme-parity |
| FilterChip | `ui/ProductPatterns.tsx` | C | 0 | 55.6 | D | ✗ | M1.axes, M2.axes, M4.tokens, M4.theme-parity |
| Hint | `ui/Extra.tsx` | C | 3 | 88.9 | C | ✓ | M5.ids |
| HorizontalStepper | `ui/Extra.tsx` | C | 0 | 85.7 | B | ✓ | M4.tokens |
| InlineMessage | `ui/Patterns.tsx` | C | 10 | 100 | A | ✓ | — |
| Label | `ui/Extra.tsx` | C | 0 | 56.3 | D | ✗ | M1.axes, M2.axes, M3.disabled, M3.loading, M3.focus, M4.tokens, M5.ids |
| LoadingState | `ui/ProductPatterns.tsx` | C | 0 | 71.4 | C | ✓ | M4.tokens, M4.theme-parity |
| MenuItem | `ui/Overlay.tsx` | C | 2 | 86.7 | B | ✓ | M3.disabled, M3.focus |
| MenuLabel | `ui/Overlay.tsx` | C | 5 | 43.8 | D | ✗ | M1.cn, M3.disabled, M3.loading, M3.error, M3.focus, M3.unit-test, M4.tokens, M4.theme-parity, M5.role |
| MenuSeparator | `ui/Overlay.tsx` | C | 0 | 30.8 | D | ✗ | M1.cn, M1.axes, M2.axes, M3.disabled, M3.focus, M3.unit-test, M4.tokens, M4.theme-parity, M5.role |
| NumberInput | `ui/More.tsx` | C | 3 | 73.7 | C | ✓ | M1.controlled, M3.loading, M3.error, M3.focus, M3.unit-test |
| PageHeader | `ui/ProductPatterns.tsx` | C | 0 | 62.5 | D | ✗ | M1.controlled, M4.tokens, M4.theme-parity |
| ProfileHoverCard | `ui/Patterns.tsx` | C | 0 | 46.2 | D | ✗ | M1.cn, M1.axes, M2.axes, M3.unit-test, M4.tokens, M4.theme-parity, M5.role |
| SearchBar | `ui/ProductPatterns.tsx` | C | 0 | 62.5 | D | ✗ | M1.controlled, M4.tokens, M4.theme-parity |
| SearchInput | `ui/More.tsx` | C | 3 | 78.9 | C | ✓ | M1.controlled, M3.loading, M3.error, M3.focus |
| SelectTrigger | `ui/More.tsx` | C | 3 | 76.5 | C | ✓ | M3.disabled, M3.loading, M3.error, M3.unit-test |
| SettingsSection | `ui/ProductPatterns.tsx` | C | 0 | 71.4 | C | ✓ | M4.tokens, M4.theme-parity |
| SettingsToggle | `ui/ProductPatterns.tsx` | C | 0 | 62.5 | D | ✗ | M1.controlled, M4.tokens, M4.theme-parity |
| SideNavItem | `ui/ProductPatterns.tsx` | C | 0 | 71.4 | C | ✓ | M4.tokens, M4.theme-parity |
| SortMenu | `ui/ProductPatterns.tsx` | C | 0 | 42.9 | D | ✗ | M1.axes, M1.controlled, M2.axes, M3.disabled, M3.focus, M3.unit-test, M4.tokens, M4.theme-parity |
| StatGrid | `ui/ProductPatterns.tsx` | C | 0 | 42.9 | D | ✗ | M1.axes, M2.axes, M3.focus, M3.empty, M3.unit-test, M4.tokens, M4.theme-parity, M5.role |
| TextareaCounter | `ui/More.tsx` | C | 0 | 61.1 | D | ✗ | M1.axes, M1.controlled, M2.axes, M3.loading, M3.error, M3.focus, M3.unit-test |
| ToolbarButton | `ui/Patterns.tsx` | C | 0 | 62.5 | D | ✗ | M1.axes, M1.polymorphic, M2.axes, M3.loading, M3.unit-test, M4.geometry |
| ToolbarSeparator | `ui/Patterns.tsx` | C | 0 | 40 | D | ✗ | M1.cn, M1.axes, M1.polymorphic, M2.axes, M3.loading, M3.unit-test, M4.tokens, M4.theme-parity, M5.role |
| VerticalStepper | `ui/Extra.tsx` | C | 0 | 85.7 | B | ✓ | M4.tokens |
| VerticalTabMenu | `ui/More.tsx` | C | 0 | 46.7 | D | ✗ | M1.axes, M1.controlled, M2.axes, M3.focus, M3.unit-test, M4.theme-parity, M4.geometry, M5.aria |

## Debt ledger (below tier bar, worst first)

| Component | Tier | Score | Grade | Needs |
|---|---|---|---|---|
| MenuSeparator | C | 30.8 | D | M1.cn, M1.axes, M2.axes, M3.disabled, M3.focus, M3.unit-test, M4.tokens, M4.theme-parity, M5.role |
| ToolbarSeparator | C | 40 | D | M1.cn, M1.axes, M1.polymorphic, M2.axes, M3.loading, M3.unit-test, M4.tokens, M4.theme-parity, M5.role |
| SortMenu | C | 42.9 | D | M1.axes, M1.controlled, M2.axes, M3.disabled, M3.focus, M3.unit-test, M4.tokens, M4.theme-parity |
| StatGrid | C | 42.9 | D | M1.axes, M2.axes, M3.focus, M3.empty, M3.unit-test, M4.tokens, M4.theme-parity, M5.role |
| CardGrid | C | 42.9 | D | M1.axes, M2.axes, M3.focus, M3.empty, M3.unit-test, M4.tokens, M4.theme-parity, M5.role |
| MenuLabel | C | 43.8 | D | M1.cn, M3.disabled, M3.loading, M3.error, M3.focus, M3.unit-test, M4.tokens, M4.theme-parity, M5.role |
| ProfileHoverCard | C | 46.2 | D | M1.cn, M1.axes, M2.axes, M3.unit-test, M4.tokens, M4.theme-parity, M5.role |
| VerticalTabMenu | C | 46.7 | D | M1.axes, M1.controlled, M2.axes, M3.focus, M3.unit-test, M4.theme-parity, M4.geometry, M5.aria |
| TimePicker | B | 52.2 | D | M1.cn, M1.axes, M1.controlled, M2.axes, M3.disabled, M3.loading, M3.error, M3.focus, M3.unit-test, M4.theme-parity, M6.anatomy |
| Dropdown | A | 54.2 | D | M1.controlled, M2.cells, M2.matrix-rendered, M3.focus, M3.unit-test, M4.theme-parity, M4.geometry, M5.aria, M6.anatomy, M6.playground, M6.a11y-section |
| ColorPicker | B | 54.5 | D | M1.axes, M1.controlled, M2.axes, M3.disabled, M3.loading, M3.error, M3.focus, M3.unit-test, M6.anatomy, M6.api |
| AlertDialog | B | 55 | D | M1.ref, M1.cn, M2.cells, M2.matrix-rendered, M3.unit-test, M4.tokens, M5.role, M6.anatomy, M6.api |
| FilterChip | C | 55.6 | D | M1.axes, M2.axes, M4.tokens, M4.theme-parity |
| DataCard | C | 55.6 | D | M1.axes, M2.axes, M4.tokens, M4.theme-parity |
| Label | C | 56.3 | D | M1.axes, M2.axes, M3.disabled, M3.loading, M3.focus, M4.tokens, M5.ids |
| EmptyState | B | 57.1 | D | M2.cells, M2.matrix-rendered, M3.disabled, M3.focus, M3.unit-test, M4.tokens, M4.theme-parity, M5.role, M6.anatomy |
| HoverCard | B | 57.9 | D | M1.axes, M2.axes, M3.unit-test, M4.tokens, M4.theme-parity, M5.role, M6.anatomy, M6.api |
| InfoLabel | B | 59.1 | D | M2.cells, M2.matrix-rendered, M3.loading, M3.error, M3.unit-test, M4.tokens, M5.role, M6.anatomy, M6.api |
| Calendar | B | 59.1 | D | M1.axes, M1.controlled, M2.axes, M3.disabled, M3.error, M3.focus, M3.unit-test, M4.theme-parity, M6.anatomy |
| Modal | A | 60 | D | M1.ref, M2.cells, M2.matrix-rendered, M3.disabled, M3.focus, M4.geometry, M5.keyboard, M6.anatomy, M6.playground, M6.a11y-section |
| TextareaCounter | C | 61.1 | D | M1.axes, M1.controlled, M2.axes, M3.loading, M3.error, M3.focus, M3.unit-test |
| ToggleGroup | B | 61.5 | D | M1.polymorphic, M1.controlled, M2.cells, M2.matrix-rendered, M3.loading, M3.focus, M3.unit-test, M4.geometry, M5.keyboard, M6.anatomy |
| CommandMenu | B | 61.9 | D | M1.axes, M1.controlled, M2.axes, M3.disabled, M3.focus, M3.unit-test, M4.geometry, M6.anatomy |
| FeaturedIcon | A | 62.5 | D | M2.matrix-rendered, M4.tokens, M4.geometry, M6.anatomy, M6.playground, M6.a11y-section |
| SelectionCard | B | 62.5 | D | M1.controlled, M2.cells, M2.matrix-rendered, M3.loading, M3.error, M3.focus, M3.unit-test, M4.geometry, M6.anatomy |
| ToolbarButton | C | 62.5 | D | M1.axes, M1.polymorphic, M2.axes, M3.loading, M3.unit-test, M4.geometry |
| PageHeader | C | 62.5 | D | M1.controlled, M4.tokens, M4.theme-parity |
| SearchBar | C | 62.5 | D | M1.controlled, M4.tokens, M4.theme-parity |
| SettingsToggle | C | 62.5 | D | M1.controlled, M4.tokens, M4.theme-parity |
| ActivityFeed | B | 63.2 | D | M1.axes, M2.axes, M3.disabled, M3.focus, M3.empty, M3.unit-test, M6.anatomy |
| ChatInput | B | 63.6 | D | M1.axes, M1.controlled, M2.axes, M3.loading, M3.error, M3.unit-test, M6.anatomy, M6.api |
| AiPromptInput | B | 63.6 | D | M1.axes, M1.controlled, M2.axes, M3.error, M3.focus, M3.unit-test, M4.theme-parity, M6.anatomy |
| CurrencyAmountInput | B | 63.6 | D | M1.axes, M1.controlled, M2.axes, M3.loading, M3.error, M3.focus, M3.unit-test, M6.anatomy |
| DataTable | A | 64 | D | M1.controlled, M2.cells, M2.matrix-rendered, M3.disabled, M3.focus, M4.tokens, M4.theme-parity, M6.anatomy, M6.a11y-section |
| Kbd | A | 64.3 | D | M4.tokens, M4.theme-parity, M6.anatomy, M6.playground, M6.a11y-section |
| ListItem | B | 65 | C | M1.axes, M2.axes, M3.empty, M3.unit-test, M5.role, M6.anatomy, M6.api |
| NotificationFeed | B | 65 | C | M1.axes, M2.axes, M3.focus, M3.empty, M3.unit-test, M4.theme-parity, M6.anatomy |
| LinkButton | A | 65.4 | C | M1.polymorphic, M2.matrix-rendered, M3.loading, M3.unit-test, M4.theme-parity, M5.icon-label, M6.anatomy, M6.playground, M6.a11y-section |
| Badge | A | 66.7 | C | M1.cn, M4.tokens, M6.anatomy, M6.playground, M6.api, M6.a11y-section |
| Skeleton | B | 66.7 | C | M1.axes, M2.axes, M4.tokens, M4.theme-parity, M6.anatomy |
| SegmentedControl | B | 66.7 | C | M1.controlled, M2.cells, M2.matrix-rendered, M5.keyboard, M5.icon-label, M6.anatomy |
| FileFormatIcon | B | 66.7 | C | M4.tokens, M4.geometry, M6.anatomy, M6.api |
| Switch | A | 66.7 | C | M1.controlled, M2.matrix-rendered, M3.loading, M3.error, M4.tokens, M4.geometry, M6.anatomy, M6.playground, M6.a11y-section |
| Timeline | B | 66.7 | C | M2.cells, M2.matrix-rendered, M3.disabled, M3.focus, M4.tokens, M6.anatomy, M6.api |
| ToastProvider | B | 66.7 | C | M2.cells, M2.matrix-rendered, M3.disabled, M3.focus, M3.unit-test, M4.geometry, M6.anatomy |
| Rating | B | 68 | C | M1.controlled, M2.matrix-rendered, M3.loading, M3.error, M3.focus, M3.unit-test, M4.tokens, M6.anatomy |
| FileUploader | B | 68.2 | C | M1.axes, M1.controlled, M2.axes, M3.loading, M3.focus, M3.unit-test, M6.anatomy |
| Well | B | 68.8 | C | M2.cells, M2.matrix-rendered, M6.anatomy, M6.api, M6.code |
| CardHeader | B | 69.2 | C | M1.axes, M2.axes, M4.tokens, M6.anatomy |
| CardBody | B | 69.2 | C | M1.axes, M2.axes, M4.tokens, M6.anatomy |
| Textarea | A | 69.2 | C | M2.cells, M2.matrix-rendered, M3.loading, M3.unit-test, M5.role, M6.anatomy, M6.playground, M6.a11y-section |
| ContentDivider | B | 69.2 | C | M2.cells, M6.anatomy, M6.api, M6.code |
| Tooltip | B | 69.6 | C | M2.cells, M2.matrix-rendered, M3.disabled, M3.focus, M3.unit-test, M4.tokens, M6.anatomy |
| Toolbar | B | 69.6 | C | M1.polymorphic, M2.cells, M2.matrix-rendered, M3.loading, M3.unit-test, M5.keyboard, M6.anatomy |
| CircularProgress | B | 70.6 | C | M1.cn, M2.cells, M2.matrix-rendered, M4.tokens, M6.anatomy |
| Notification | B | 70.6 | C | M2.matrix-rendered, M4.geometry, M5.keyboard, M5.ids, M6.anatomy |
| Table | A | 70.8 | C | M2.cells, M2.matrix-rendered, M3.focus, M3.empty, M3.unit-test, M6.anatomy, M6.a11y-section |
| Spinner | B | 71.4 | C | M4.tokens, M4.theme-parity, M5.icon-label, M6.anatomy |
| User | B | 71.4 | C | M2.matrix-rendered, M4.tokens, M4.theme-parity, M6.anatomy |
| Divider | B | 71.4 | C | M2.cells, M4.tokens, M4.theme-parity, M6.anatomy |
| Code | B | 71.4 | C | M2.cells, M2.matrix-rendered, M4.tokens, M6.anatomy |
| EmptyState | B | 71.4 | C | M2.cells, M2.matrix-rendered, M3.disabled, M3.unit-test, M5.role, M6.anatomy |
| Breadcrumbs | B | 71.4 | C | M4.tokens, M4.theme-parity, M5.ids, M6.anatomy |
| Popover | B | 71.4 | C | M1.axes, M2.axes, M3.disabled, M3.focus, M3.unit-test, M6.anatomy |
| CompactButton | A | 72 | C | M1.polymorphic, M3.loading, M3.unit-test, M4.geometry, M6.anatomy, M6.playground, M6.a11y-section |
| Badge | A | 72.2 | C | M4.tokens, M6.anatomy, M6.playground, M6.api, M6.a11y-section |
| Avatar | A | 72.2 | C | M2.matrix-rendered, M4.tokens, M6.anatomy, M6.playground, M6.a11y-section |
| Alert | A | 72.2 | C | M4.tokens, M5.keyboard, M6.anatomy, M6.playground, M6.a11y-section |
| ButtonGroup | B | 72.7 | C | M1.axes, M1.polymorphic, M2.axes, M3.unit-test, M5.keyboard, M6.anatomy |
| Input | A | 73.1 | C | M2.cells, M2.matrix-rendered, M3.loading, M3.unit-test, M6.anatomy, M6.playground, M6.a11y-section |
| Checkbox | A | 73.1 | C | M2.matrix-rendered, M3.loading, M4.geometry, M5.aria, M6.anatomy, M6.playground, M6.a11y-section |
| Banner | B | 73.3 | C | M2.matrix-rendered, M5.ids, M6.anatomy, M6.code |
| Progress | A | 73.7 | C | M2.matrix-rendered, M4.tokens, M4.theme-parity, M6.anatomy, M6.a11y-section |
| Drawer | B | 73.9 | C | M2.matrix-rendered, M3.disabled, M3.focus, M4.geometry, M5.keyboard, M6.anatomy |
| ButtonTile | B | 73.9 | C | M1.polymorphic, M2.cells, M2.matrix-rendered, M3.loading, M3.unit-test, M6.anatomy |
| AvatarGroup | B | 75 | C | M1.cn, M2.cells, M2.matrix-rendered, M6.anatomy |
| Datepicker | B | 75 | C | M1.controlled, M2.cells, M2.matrix-rendered, M3.loading, M4.geometry, M6.anatomy |
| Slider | B | 75 | C | M1.controlled, M2.matrix-rendered, M3.loading, M3.error, M4.tokens, M6.anatomy |
| Combobox | B | 75 | C | M1.controlled, M2.cells, M2.matrix-rendered, M3.loading, M3.error, M6.anatomy |
| PaymentCard | B | 75 | C | M2.matrix-rendered, M4.geometry, M6.anatomy, M6.api |
| ErrorState | B | 75 | C | M4.tokens, M4.theme-parity, M6.anatomy |
| Select | A | 76 | C | M2.cells, M2.matrix-rendered, M3.loading, M6.anatomy, M6.playground, M6.a11y-section |
| RadioGroup | B | 76 | C | M1.controlled, M2.matrix-rendered, M3.loading, M3.unit-test, M4.geometry, M6.anatomy |
| FancyButton | A | 76.9 | C | M2.matrix-rendered, M3.unit-test, M4.tokens, M6.anatomy, M6.playground, M6.a11y-section |
| Card | A | 77.8 | C | M2.cells, M6.anatomy, M6.playground, M6.a11y-section |
| CardFooter | B | 78.6 | C | M1.axes, M2.axes, M6.anatomy |
| ScrollShadow | B | 78.6 | C | M4.tokens, M5.keyboard, M6.anatomy |
| SocialButton | B | 79.2 | C | M1.polymorphic, M2.matrix-rendered, M3.loading, M3.unit-test, M6.anatomy |
| DigitInput | B | 79.2 | C | M1.controlled, M2.cells, M2.matrix-rendered, M3.loading, M6.anatomy |
| Tabs | A | 80 | B | M1.controlled, M2.matrix-rendered, M6.anatomy, M6.a11y-section |
| Pagination | B | 80 | C | M1.controlled, M5.ids, M6.anatomy |
| Filters | B | 81.3 | C | M1.controlled, M4.theme-parity, M6.anatomy |
| StatusBadge | B | 82.4 | C | M2.matrix-rendered, M5.icon-label, M6.anatomy |
| Tag | B | 83.3 | C | M2.matrix-rendered, M5.icon-label, M6.anatomy |
| Chip | A | 84.2 | B | M6.anatomy, M6.playground, M6.a11y-section |
| Snippet | B | 85.7 | C | M5.keyboard, M6.anatomy |

## IA taxonomy (WEBSITE-IA.md §3)

Mapped: **80** components · Categories: actions 9 · forms 21 · display 19 · navigation 8 · feedback 6 · overlay 9 · layout 3 · utilities 5 · Pro badges: 11 · Legacy routes: 2

No orphans, no unmapped routes, no empty categories.
