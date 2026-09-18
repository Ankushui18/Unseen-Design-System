# Unseen Quality Scorecard (generated)

> Regenerate with: `npm run quality:report -- --md`
> Standard: `COMPONENT-QUALITY-SPEC.md` — this file is that spec applied to the current source.
> Ratchet: `audit/quality-baseline.json` · Gate: `npm test` (`quality:check`) · Promotion: `quality:check -- --strict`

**Tier A (flagship):** Button, Input, Select, Checkbox, Switch, Textarea, Card, Badge, Avatar, Tabs, Modal, Dropdown, Table, DataTable, Alert, Toast, Chip, FeaturedIcon, Kbd, Progress, FancyButton, LinkButton, CompactButton

**117 components** · **64** axis-bearing · **1354** variant cells · mean score **61.3** · at or above tier bar **9/117**
Grades: A 1 · B 4 · C 42 · D 70 — Tiers: A 23 · B 63 · C 31

## Grades by component

| Component | File | Tier | Cells | Score | Grade | At bar | Failing checks |
|---|---|---|---|---|---|---|---|
| Alert | `ui/Display.tsx` | A | 30 | 61.1 | D | ✗ | M1.ref, M4.tokens, M4.motion, M5.keyboard, M6.anatomy, M6.playground, M6.a11y-section |
| Avatar | `ui/Display.tsx` | A | 225 | 66.7 | C | ✗ | M1.ref, M2.matrix-rendered, M4.tokens, M6.anatomy, M6.playground, M6.a11y-section |
| Badge | `ui/Display.tsx` | A | 60 | 66.7 | C | ✗ | M1.ref, M4.tokens, M6.anatomy, M6.playground, M6.api, M6.a11y-section |
| Badge | `ui/Display.tsx` | A | 60 | 61.1 | D | ✗ | M1.ref, M1.cn, M4.tokens, M6.anatomy, M6.playground, M6.api, M6.a11y-section |
| Button | `ui/Button.tsx` | A | 125 | 100 | A | ✓ | — |
| Card | `ui/Display.tsx` | A | 3 | 66.7 | C | ✗ | M1.ref, M2.cells, M4.motion, M6.anatomy, M6.playground, M6.a11y-section |
| Checkbox | `ui/Form.tsx` | A | 15 | 65.4 | C | ✗ | M2.matrix-rendered, M3.loading, M3.unit-test, M4.geometry, M4.motion, M5.aria, M6.anatomy, M6.playground, M6.a11y-section |
| Chip | `ui/Display.tsx` | A | 210 | 73.7 | C | ✗ | M1.ref, M4.motion, M6.anatomy, M6.playground, M6.a11y-section |
| CompactButton | `ui/Extra.tsx` | A | 45 | 64 | D | ✗ | M1.ref, M1.polymorphic, M3.loading, M3.unit-test, M4.geometry, M4.motion, M6.anatomy, M6.playground, M6.a11y-section |
| DataTable | `ui/ProductPatterns.tsx` | A | 2 | 60 | D | ✗ | M1.ref, M1.controlled, M2.cells, M2.matrix-rendered, M3.disabled, M3.focus, M4.tokens, M4.theme-parity, M6.anatomy, M6.a11y-section |
| Dropdown | `ui/More.tsx` | A | 8 | 45.8 | D | ✗ | M1.ref, M1.controlled, M2.cells, M2.matrix-rendered, M3.focus, M3.unit-test, M4.theme-parity, M4.geometry, M4.motion, M5.aria, M6.anatomy, M6.playground, M6.a11y-section |
| FancyButton | `ui/Button.tsx` | A | 30 | 73.1 | C | ✗ | M2.matrix-rendered, M3.unit-test, M4.tokens, M4.motion, M6.anatomy, M6.playground, M6.a11y-section |
| FeaturedIcon | `ui/Display.tsx` | A | 60 | 50 | D | ✗ | M1.ref, M2.matrix-rendered, M4.tokens, M4.geometry, M4.motion, M6.anatomy, M6.playground, M6.a11y-section |
| Input | `ui/Form.tsx` | A | 3 | 69.2 | C | ✗ | M2.cells, M2.matrix-rendered, M3.loading, M3.unit-test, M4.motion, M6.anatomy, M6.playground, M6.a11y-section |
| Kbd | `ui/Display.tsx` | A | 0 | 57.1 | D | ✗ | M1.ref, M4.tokens, M4.theme-parity, M6.anatomy, M6.playground, M6.a11y-section |
| LinkButton | `ui/Extra.tsx` | A | 60 | 57.7 | D | ✗ | M1.ref, M1.polymorphic, M2.matrix-rendered, M3.loading, M3.unit-test, M4.theme-parity, M4.motion, M5.icon-label, M6.anatomy, M6.playground, M6.a11y-section |
| Modal | `ui/Overlay.tsx` | A | 10 | 60 | D | ✗ | M1.ref, M2.cells, M2.matrix-rendered, M3.disabled, M3.focus, M4.geometry, M5.keyboard, M6.anatomy, M6.playground, M6.a11y-section |
| Progress | `ui/Display.tsx` | A | 15 | 63.2 | D | ✗ | M1.ref, M2.matrix-rendered, M4.tokens, M4.theme-parity, M4.motion, M6.anatomy, M6.a11y-section |
| Select | `ui/Form.tsx` | A | 3 | 76 | C | ✗ | M2.cells, M2.matrix-rendered, M3.loading, M6.anatomy, M6.playground, M6.a11y-section |
| Switch | `ui/Form.tsx` | A | 15 | 59.3 | D | ✗ | M1.ref, M1.controlled, M2.matrix-rendered, M3.loading, M3.error, M4.tokens, M4.geometry, M4.motion, M6.anatomy, M6.playground, M6.a11y-section |
| Table | `ui/Navigation.tsx` | A | 6 | 66.7 | C | ✗ | M2.cells, M2.matrix-rendered, M3.focus, M3.empty, M3.unit-test, M4.motion, M6.anatomy, M6.a11y-section |
| Tabs | `ui/Navigation.tsx` | A | 12 | 75 | C | ✗ | M1.ref, M1.controlled, M2.matrix-rendered, M6.anatomy, M6.a11y-section |
| Textarea | `ui/Form.tsx` | A | 3 | 65.4 | C | ✗ | M2.cells, M2.matrix-rendered, M3.loading, M3.unit-test, M4.motion, M5.role, M6.anatomy, M6.playground, M6.a11y-section |
| Accordion | `ui/Navigation.tsx` | B | 3 | 81.3 | B | ✓ | M2.cells, M4.motion, M6.anatomy |
| ActivityFeed | `ui/Pro.tsx` | B | 0 | 57.9 | D | ✗ | M1.ref, M1.axes, M2.axes, M3.disabled, M3.focus, M3.empty, M3.unit-test, M6.anatomy |
| AiPromptInput | `ui/Pro.tsx` | B | 0 | 54.5 | D | ✗ | M1.ref, M1.axes, M1.controlled, M2.axes, M3.error, M3.focus, M3.unit-test, M4.theme-parity, M4.motion, M6.anatomy |
| AlertDialog | `ui/Patterns.tsx` | B | 3 | 55 | D | ✗ | M1.ref, M1.cn, M2.cells, M2.matrix-rendered, M3.unit-test, M4.tokens, M5.role, M6.anatomy, M6.api |
| AvatarGroup | `ui/Display.tsx` | B | 4 | 68.8 | C | ✗ | M1.ref, M1.cn, M2.cells, M2.matrix-rendered, M6.anatomy |
| AvatarGroupCompact | `ui/Display.tsx` | B | 40 | 81.3 | B | ✓ | M1.ref, M2.matrix-rendered, M6.anatomy |
| Banner | `ui/Extra.tsx` | B | 15 | 66.7 | C | ✗ | M1.ref, M2.matrix-rendered, M5.ids, M6.anatomy, M6.code |
| Breadcrumbs | `ui/Navigation.tsx` | B | 0 | 64.3 | D | ✗ | M4.tokens, M4.theme-parity, M4.motion, M5.ids, M6.anatomy |
| ButtonGroup | `ui/Button.tsx` | B | 0 | 72.7 | C | ✗ | M1.axes, M1.polymorphic, M2.axes, M3.unit-test, M5.keyboard, M6.anatomy |
| ButtonTile | `ui/Patterns.tsx` | B | 3 | 65.2 | C | ✗ | M1.ref, M1.polymorphic, M2.cells, M2.matrix-rendered, M3.loading, M3.unit-test, M4.motion, M6.anatomy |
| Calendar | `ui/Pro.tsx` | B | 0 | 50 | D | ✗ | M1.ref, M1.axes, M1.controlled, M2.axes, M3.disabled, M3.error, M3.focus, M3.unit-test, M4.theme-parity, M4.motion, M6.anatomy |
| CardBody | `ui/Display.tsx` | B | 0 | 61.5 | D | ✗ | M1.ref, M1.axes, M2.axes, M4.tokens, M6.anatomy |
| CardFooter | `ui/Display.tsx` | B | 0 | 71.4 | C | ✗ | M1.ref, M1.axes, M2.axes, M6.anatomy |
| CardHeader | `ui/Display.tsx` | B | 0 | 61.5 | D | ✗ | M1.ref, M1.axes, M2.axes, M4.tokens, M6.anatomy |
| ChatInput | `ui/Patterns.tsx` | B | 0 | 54.5 | D | ✗ | M1.ref, M1.axes, M1.controlled, M2.axes, M3.loading, M3.error, M3.unit-test, M4.motion, M6.anatomy, M6.api |
| CircularProgress | `ui/Display.tsx` | B | 5 | 58.8 | D | ✗ | M1.ref, M1.cn, M2.cells, M2.matrix-rendered, M4.tokens, M4.motion, M6.anatomy |
| Code | `ui/Display.tsx` | B | 5 | 64.3 | D | ✗ | M1.ref, M2.cells, M2.matrix-rendered, M4.tokens, M6.anatomy |
| ColorPicker | `ui/More.tsx` | B | 0 | 45.5 | D | ✗ | M1.ref, M1.axes, M1.controlled, M2.axes, M3.disabled, M3.loading, M3.error, M3.focus, M3.unit-test, M4.motion, M6.anatomy, M6.api |
| Combobox | `ui/Patterns.tsx` | B | 3 | 70.8 | C | ✗ | M1.ref, M1.controlled, M2.cells, M2.matrix-rendered, M3.loading, M3.error, M6.anatomy |
| CommandMenu | `ui/Pro.tsx` | B | 0 | 57.1 | D | ✗ | M1.ref, M1.axes, M1.controlled, M2.axes, M3.disabled, M3.focus, M3.unit-test, M4.geometry, M6.anatomy |
| ContentDivider | `ui/More.tsx` | B | 4 | 61.5 | D | ✗ | M1.ref, M2.cells, M6.anatomy, M6.api, M6.code |
| CryptoAddressChip | `ui/Pro.tsx` | B | 0 | 66.7 | C | ✗ | M1.ref, M1.axes, M2.axes, M4.motion, M6.anatomy |
| CurrencyAmountInput | `ui/Pro.tsx` | B | 0 | 54.5 | D | ✗ | M1.ref, M1.axes, M1.controlled, M2.axes, M3.loading, M3.error, M3.focus, M3.unit-test, M4.motion, M6.anatomy |
| Datepicker | `ui/Extra.tsx` | B | 2 | 66.7 | C | ✗ | M1.ref, M1.controlled, M2.cells, M2.matrix-rendered, M3.loading, M4.geometry, M4.motion, M6.anatomy |
| DigitInput | `ui/Extra.tsx` | B | 3 | 70.8 | C | ✗ | M1.ref, M1.controlled, M2.cells, M2.matrix-rendered, M3.loading, M4.motion, M6.anatomy |
| Divider | `ui/Display.tsx` | B | 2 | 64.3 | D | ✗ | M1.ref, M2.cells, M4.tokens, M4.theme-parity, M6.anatomy |
| Drawer | `ui/Overlay.tsx` | B | 9 | 69.6 | C | ✗ | M1.ref, M2.matrix-rendered, M3.disabled, M3.focus, M4.geometry, M5.keyboard, M6.anatomy |
| EmptyState | `ui/More.tsx` | B | 3 | 66.7 | C | ✗ | M1.ref, M2.cells, M2.matrix-rendered, M3.disabled, M3.unit-test, M5.role, M6.anatomy |
| EmptyState | `ui/ProductPatterns.tsx` | B | 3 | 52.4 | D | ✗ | M1.ref, M2.cells, M2.matrix-rendered, M3.disabled, M3.focus, M3.unit-test, M4.tokens, M4.theme-parity, M5.role, M6.anatomy |
| ErrorState | `ui/ProductPatterns.tsx` | B | 0 | 66.7 | C | ✗ | M1.ref, M4.tokens, M4.theme-parity, M6.anatomy |
| FileFormatIcon | `ui/Extra.tsx` | B | 0 | 58.3 | D | ✗ | M1.ref, M4.tokens, M4.geometry, M6.anatomy, M6.api |
| FileUploader | `ui/Pro.tsx` | B | 0 | 59.1 | D | ✗ | M1.ref, M1.axes, M1.controlled, M2.axes, M3.loading, M3.focus, M3.unit-test, M4.motion, M6.anatomy |
| Filters | `ui/Pro.tsx` | B | 0 | 75 | C | ✗ | M1.ref, M1.controlled, M4.theme-parity, M6.anatomy |
| HoverCard | `ui/Patterns.tsx` | B | 0 | 52.6 | D | ✗ | M1.ref, M1.axes, M2.axes, M3.unit-test, M4.tokens, M4.theme-parity, M5.role, M6.anatomy, M6.api |
| InfoLabel | `ui/Patterns.tsx` | B | 5 | 54.5 | D | ✗ | M1.ref, M2.cells, M2.matrix-rendered, M3.loading, M3.error, M3.unit-test, M4.tokens, M5.role, M6.anatomy, M6.api |
| ListItem | `ui/Patterns.tsx` | B | 0 | 55 | D | ✗ | M1.ref, M1.axes, M2.axes, M3.empty, M3.unit-test, M4.motion, M5.role, M6.anatomy, M6.api |
| Notification | `ui/Extra.tsx` | B | 30 | 58.8 | D | ✗ | M1.ref, M2.matrix-rendered, M4.geometry, M4.motion, M5.keyboard, M5.ids, M6.anatomy |
| NotificationFeed | `ui/Pro.tsx` | B | 0 | 55 | D | ✗ | M1.ref, M1.axes, M2.axes, M3.focus, M3.empty, M3.unit-test, M4.theme-parity, M4.motion, M6.anatomy |
| Pagination | `ui/Navigation.tsx` | B | 0 | 73.3 | C | ✗ | M1.controlled, M4.motion, M5.ids, M6.anatomy |
| PaymentCard | `ui/Patterns.tsx` | B | 12 | 68.8 | C | ✗ | M1.ref, M2.matrix-rendered, M4.geometry, M6.anatomy, M6.api |
| Popover | `ui/Overlay.tsx` | B | 0 | 66.7 | C | ✗ | M1.ref, M1.axes, M2.axes, M3.disabled, M3.focus, M3.unit-test, M6.anatomy |
| RadioGroup | `ui/Form.tsx` | B | 30 | 72 | C | ✗ | M1.controlled, M2.matrix-rendered, M3.loading, M3.unit-test, M4.geometry, M4.motion, M6.anatomy |
| Rating | `ui/More.tsx` | B | 9 | 60 | D | ✗ | M1.ref, M1.controlled, M2.matrix-rendered, M3.loading, M3.error, M3.focus, M3.unit-test, M4.tokens, M4.motion, M6.anatomy |
| ScrollShadow | `ui/Display.tsx` | B | 0 | 64.3 | D | ✗ | M1.ref, M4.tokens, M4.motion, M5.keyboard, M6.anatomy |
| SegmentedControl | `ui/Extra.tsx` | B | 2 | 55.6 | D | ✗ | M1.ref, M1.controlled, M2.cells, M2.matrix-rendered, M4.motion, M5.keyboard, M5.icon-label, M6.anatomy |
| SelectionCard | `ui/More.tsx` | B | 2 | 56 | D | ✗ | M1.ref, M1.controlled, M2.cells, M2.matrix-rendered, M3.loading, M3.error, M3.focus, M3.unit-test, M4.geometry, M4.motion, M6.anatomy |
| Skeleton | `ui/Display.tsx` | B | 0 | 53.3 | D | ✗ | M1.ref, M1.axes, M2.axes, M4.tokens, M4.theme-parity, M4.motion, M6.anatomy |
| Slider | `ui/Form.tsx` | B | 30 | 70.8 | C | ✗ | M1.ref, M1.controlled, M2.matrix-rendered, M3.loading, M3.error, M4.tokens, M6.anatomy |
| Snippet | `ui/Display.tsx` | B | 0 | 71.4 | C | ✗ | M1.ref, M4.motion, M5.keyboard, M6.anatomy |
| SocialButton | `ui/Extra.tsx` | B | 54 | 70.8 | C | ✗ | M1.ref, M1.polymorphic, M2.matrix-rendered, M3.loading, M3.unit-test, M4.motion, M6.anatomy |
| Spinner | `ui/Button.tsx` | B | 0 | 71.4 | C | ✗ | M4.tokens, M4.theme-parity, M5.icon-label, M6.anatomy |
| StatusBadge | `ui/Extra.tsx` | B | 20 | 76.5 | C | ✗ | M1.ref, M2.matrix-rendered, M5.icon-label, M6.anatomy |
| Tag | `ui/Extra.tsx` | B | 30 | 72.2 | C | ✗ | M1.ref, M2.matrix-rendered, M4.motion, M5.icon-label, M6.anatomy |
| Timeline | `ui/More.tsx` | B | 5 | 57.1 | D | ✗ | M1.ref, M2.cells, M2.matrix-rendered, M3.disabled, M3.focus, M3.unit-test, M4.tokens, M6.anatomy, M6.api |
| TimePicker | `ui/Pro.tsx` | B | 0 | 47.8 | D | ✗ | M1.ref, M1.cn, M1.axes, M1.controlled, M2.axes, M3.disabled, M3.loading, M3.error, M3.focus, M3.unit-test, M4.theme-parity, M6.anatomy |
| ToastProvider | `ui/Overlay.tsx` | B | 4 | 61.9 | D | ✗ | M1.ref, M2.cells, M2.matrix-rendered, M3.disabled, M3.focus, M3.unit-test, M4.geometry, M6.anatomy |
| ToggleGroup | `ui/More.tsx` | B | 4 | 53.8 | D | ✗ | M1.ref, M1.polymorphic, M1.controlled, M2.cells, M2.matrix-rendered, M3.loading, M3.focus, M3.unit-test, M4.geometry, M4.motion, M5.keyboard, M6.anatomy |
| Toolbar | `ui/Patterns.tsx` | B | 2 | 65.2 | C | ✗ | M1.ref, M1.polymorphic, M2.cells, M2.matrix-rendered, M3.loading, M3.unit-test, M5.keyboard, M6.anatomy |
| Tooltip | `ui/Overlay.tsx` | B | 4 | 65.2 | C | ✗ | M1.ref, M2.cells, M2.matrix-rendered, M3.disabled, M3.focus, M3.unit-test, M4.tokens, M6.anatomy |
| User | `ui/Display.tsx` | B | 20 | 64.3 | D | ✗ | M1.ref, M2.matrix-rendered, M4.tokens, M4.theme-parity, M6.anatomy |
| VoiceVisualizer | `ui/Pro.tsx` | B | 0 | 76.9 | C | ✗ | M1.ref, M4.motion, M6.anatomy |
| Well | `ui/Patterns.tsx` | B | 3 | 62.5 | D | ✗ | M1.ref, M2.cells, M2.matrix-rendered, M6.anatomy, M6.api, M6.code |
| WidgetBox | `ui/More.tsx` | B | 2 | 76.5 | C | ✗ | M1.ref, M2.cells, M2.matrix-rendered, M6.anatomy |
| ActivityItem | `ui/ProductPatterns.tsx` | C | 10 | 62.5 | D | ✗ | M1.ref, M4.tokens, M4.theme-parity |
| CardGrid | `ui/ProductPatterns.tsx` | C | 0 | 35.7 | D | ✗ | M1.ref, M1.axes, M2.axes, M3.focus, M3.empty, M3.unit-test, M4.tokens, M4.theme-parity, M5.role |
| CopyField | `ui/ProductPatterns.tsx` | C | 0 | 85.7 | B | ✓ | M1.ref |
| DataCard | `ui/ProductPatterns.tsx` | C | 0 | 44.4 | D | ✗ | M1.ref, M1.axes, M2.axes, M4.tokens, M4.theme-parity |
| DotStepper | `ui/Extra.tsx` | C | 0 | 60 | D | ✗ | M1.ref, M1.controlled, M4.tokens, M4.motion |
| FilterBar | `ui/ProductPatterns.tsx` | C | 0 | 62.5 | D | ✗ | M1.ref, M4.tokens, M4.theme-parity |
| FilterChip | `ui/ProductPatterns.tsx` | C | 0 | 44.4 | D | ✗ | M1.ref, M1.axes, M2.axes, M4.tokens, M4.theme-parity |
| Hint | `ui/Extra.tsx` | C | 3 | 77.8 | C | ✓ | M1.ref, M5.ids |
| HorizontalStepper | `ui/Extra.tsx` | C | 0 | 71.4 | C | ✓ | M1.ref, M4.tokens |
| InlineMessage | `ui/Patterns.tsx` | C | 10 | 87.5 | B | ✓ | M1.ref |
| Label | `ui/Extra.tsx` | C | 0 | 43.8 | D | ✗ | M1.ref, M1.axes, M2.axes, M3.disabled, M3.loading, M3.focus, M3.unit-test, M4.tokens, M5.ids |
| LoadingState | `ui/ProductPatterns.tsx` | C | 0 | 57.1 | D | ✗ | M1.ref, M4.tokens, M4.theme-parity |
| MenuItem | `ui/Overlay.tsx` | C | 2 | 66.7 | C | ✓ | M1.ref, M3.disabled, M3.focus, M3.unit-test, M4.motion |
| MenuLabel | `ui/Overlay.tsx` | C | 5 | 37.5 | D | ✗ | M1.ref, M1.cn, M3.disabled, M3.loading, M3.error, M3.focus, M3.unit-test, M4.tokens, M4.theme-parity, M5.role |
| MenuSeparator | `ui/Overlay.tsx` | C | 0 | 23.1 | D | ✗ | M1.ref, M1.cn, M1.axes, M2.axes, M3.disabled, M3.focus, M3.unit-test, M4.tokens, M4.theme-parity, M5.role |
| NumberInput | `ui/More.tsx` | C | 3 | 63.2 | D | ✗ | M1.ref, M1.controlled, M3.loading, M3.error, M3.focus, M3.unit-test, M4.motion |
| PageHeader | `ui/ProductPatterns.tsx` | C | 0 | 50 | D | ✗ | M1.ref, M1.controlled, M4.tokens, M4.theme-parity |
| ProfileHoverCard | `ui/Patterns.tsx` | C | 0 | 38.5 | D | ✗ | M1.ref, M1.cn, M1.axes, M2.axes, M3.unit-test, M4.tokens, M4.theme-parity, M5.role |
| SearchBar | `ui/ProductPatterns.tsx` | C | 0 | 50 | D | ✗ | M1.ref, M1.controlled, M4.tokens, M4.theme-parity |
| SearchInput | `ui/More.tsx` | C | 3 | 63.2 | D | ✗ | M1.ref, M1.controlled, M3.loading, M3.error, M3.focus, M3.unit-test, M4.motion |
| SelectTrigger | `ui/More.tsx` | C | 3 | 64.7 | D | ✗ | M1.ref, M3.disabled, M3.loading, M3.error, M3.unit-test, M4.motion |
| SettingsSection | `ui/ProductPatterns.tsx` | C | 0 | 57.1 | D | ✗ | M1.ref, M4.tokens, M4.theme-parity |
| SettingsToggle | `ui/ProductPatterns.tsx` | C | 0 | 50 | D | ✗ | M1.ref, M1.controlled, M4.tokens, M4.theme-parity |
| SideNavItem | `ui/ProductPatterns.tsx` | C | 0 | 57.1 | D | ✗ | M1.ref, M4.tokens, M4.theme-parity |
| SortMenu | `ui/ProductPatterns.tsx` | C | 0 | 35.7 | D | ✗ | M1.ref, M1.axes, M1.controlled, M2.axes, M3.disabled, M3.focus, M3.unit-test, M4.tokens, M4.theme-parity |
| StatGrid | `ui/ProductPatterns.tsx` | C | 0 | 35.7 | D | ✗ | M1.ref, M1.axes, M2.axes, M3.focus, M3.empty, M3.unit-test, M4.tokens, M4.theme-parity, M5.role |
| TextareaCounter | `ui/More.tsx` | C | 0 | 50 | D | ✗ | M1.ref, M1.axes, M1.controlled, M2.axes, M3.loading, M3.error, M3.focus, M3.unit-test, M4.motion |
| ToolbarButton | `ui/Patterns.tsx` | C | 0 | 50 | D | ✗ | M1.ref, M1.axes, M1.polymorphic, M2.axes, M3.loading, M3.unit-test, M4.geometry, M4.motion |
| ToolbarSeparator | `ui/Patterns.tsx` | C | 0 | 33.3 | D | ✗ | M1.ref, M1.cn, M1.axes, M1.polymorphic, M2.axes, M3.loading, M3.unit-test, M4.tokens, M4.theme-parity, M5.role |
| VerticalStepper | `ui/Extra.tsx` | C | 0 | 71.4 | C | ✓ | M1.ref, M4.tokens |
| VerticalTabMenu | `ui/More.tsx` | C | 0 | 33.3 | D | ✗ | M1.ref, M1.axes, M1.controlled, M2.axes, M3.focus, M3.unit-test, M4.theme-parity, M4.geometry, M4.motion, M5.aria |

## Debt ledger (below tier bar, worst first)

| Component | Tier | Score | Grade | Needs |
|---|---|---|---|---|
| MenuSeparator | C | 23.1 | D | M1.ref, M1.cn, M1.axes, M2.axes, M3.disabled, M3.focus, M3.unit-test, M4.tokens, M4.theme-parity, M5.role |
| VerticalTabMenu | C | 33.3 | D | M1.ref, M1.axes, M1.controlled, M2.axes, M3.focus, M3.unit-test, M4.theme-parity, M4.geometry, M4.motion, M5.aria |
| ToolbarSeparator | C | 33.3 | D | M1.ref, M1.cn, M1.axes, M1.polymorphic, M2.axes, M3.loading, M3.unit-test, M4.tokens, M4.theme-parity, M5.role |
| SortMenu | C | 35.7 | D | M1.ref, M1.axes, M1.controlled, M2.axes, M3.disabled, M3.focus, M3.unit-test, M4.tokens, M4.theme-parity |
| StatGrid | C | 35.7 | D | M1.ref, M1.axes, M2.axes, M3.focus, M3.empty, M3.unit-test, M4.tokens, M4.theme-parity, M5.role |
| CardGrid | C | 35.7 | D | M1.ref, M1.axes, M2.axes, M3.focus, M3.empty, M3.unit-test, M4.tokens, M4.theme-parity, M5.role |
| MenuLabel | C | 37.5 | D | M1.ref, M1.cn, M3.disabled, M3.loading, M3.error, M3.focus, M3.unit-test, M4.tokens, M4.theme-parity, M5.role |
| ProfileHoverCard | C | 38.5 | D | M1.ref, M1.cn, M1.axes, M2.axes, M3.unit-test, M4.tokens, M4.theme-parity, M5.role |
| Label | C | 43.8 | D | M1.ref, M1.axes, M2.axes, M3.disabled, M3.loading, M3.focus, M3.unit-test, M4.tokens, M5.ids |
| FilterChip | C | 44.4 | D | M1.ref, M1.axes, M2.axes, M4.tokens, M4.theme-parity |
| DataCard | C | 44.4 | D | M1.ref, M1.axes, M2.axes, M4.tokens, M4.theme-parity |
| ColorPicker | B | 45.5 | D | M1.ref, M1.axes, M1.controlled, M2.axes, M3.disabled, M3.loading, M3.error, M3.focus, M3.unit-test, M4.motion, M6.anatomy, M6.api |
| Dropdown | A | 45.8 | D | M1.ref, M1.controlled, M2.cells, M2.matrix-rendered, M3.focus, M3.unit-test, M4.theme-parity, M4.geometry, M4.motion, M5.aria, M6.anatomy, M6.playground, M6.a11y-section |
| TimePicker | B | 47.8 | D | M1.ref, M1.cn, M1.axes, M1.controlled, M2.axes, M3.disabled, M3.loading, M3.error, M3.focus, M3.unit-test, M4.theme-parity, M6.anatomy |
| FeaturedIcon | A | 50 | D | M1.ref, M2.matrix-rendered, M4.tokens, M4.geometry, M4.motion, M6.anatomy, M6.playground, M6.a11y-section |
| TextareaCounter | C | 50 | D | M1.ref, M1.axes, M1.controlled, M2.axes, M3.loading, M3.error, M3.focus, M3.unit-test, M4.motion |
| ToolbarButton | C | 50 | D | M1.ref, M1.axes, M1.polymorphic, M2.axes, M3.loading, M3.unit-test, M4.geometry, M4.motion |
| Calendar | B | 50 | D | M1.ref, M1.axes, M1.controlled, M2.axes, M3.disabled, M3.error, M3.focus, M3.unit-test, M4.theme-parity, M4.motion, M6.anatomy |
| PageHeader | C | 50 | D | M1.ref, M1.controlled, M4.tokens, M4.theme-parity |
| SearchBar | C | 50 | D | M1.ref, M1.controlled, M4.tokens, M4.theme-parity |
| SettingsToggle | C | 50 | D | M1.ref, M1.controlled, M4.tokens, M4.theme-parity |
| EmptyState | B | 52.4 | D | M1.ref, M2.cells, M2.matrix-rendered, M3.disabled, M3.focus, M3.unit-test, M4.tokens, M4.theme-parity, M5.role, M6.anatomy |
| HoverCard | B | 52.6 | D | M1.ref, M1.axes, M2.axes, M3.unit-test, M4.tokens, M4.theme-parity, M5.role, M6.anatomy, M6.api |
| Skeleton | B | 53.3 | D | M1.ref, M1.axes, M2.axes, M4.tokens, M4.theme-parity, M4.motion, M6.anatomy |
| ToggleGroup | B | 53.8 | D | M1.ref, M1.polymorphic, M1.controlled, M2.cells, M2.matrix-rendered, M3.loading, M3.focus, M3.unit-test, M4.geometry, M4.motion, M5.keyboard, M6.anatomy |
| InfoLabel | B | 54.5 | D | M1.ref, M2.cells, M2.matrix-rendered, M3.loading, M3.error, M3.unit-test, M4.tokens, M5.role, M6.anatomy, M6.api |
| ChatInput | B | 54.5 | D | M1.ref, M1.axes, M1.controlled, M2.axes, M3.loading, M3.error, M3.unit-test, M4.motion, M6.anatomy, M6.api |
| AiPromptInput | B | 54.5 | D | M1.ref, M1.axes, M1.controlled, M2.axes, M3.error, M3.focus, M3.unit-test, M4.theme-parity, M4.motion, M6.anatomy |
| CurrencyAmountInput | B | 54.5 | D | M1.ref, M1.axes, M1.controlled, M2.axes, M3.loading, M3.error, M3.focus, M3.unit-test, M4.motion, M6.anatomy |
| ListItem | B | 55 | D | M1.ref, M1.axes, M2.axes, M3.empty, M3.unit-test, M4.motion, M5.role, M6.anatomy, M6.api |
| AlertDialog | B | 55 | D | M1.ref, M1.cn, M2.cells, M2.matrix-rendered, M3.unit-test, M4.tokens, M5.role, M6.anatomy, M6.api |
| NotificationFeed | B | 55 | D | M1.ref, M1.axes, M2.axes, M3.focus, M3.empty, M3.unit-test, M4.theme-parity, M4.motion, M6.anatomy |
| SegmentedControl | B | 55.6 | D | M1.ref, M1.controlled, M2.cells, M2.matrix-rendered, M4.motion, M5.keyboard, M5.icon-label, M6.anatomy |
| SelectionCard | B | 56 | D | M1.ref, M1.controlled, M2.cells, M2.matrix-rendered, M3.loading, M3.error, M3.focus, M3.unit-test, M4.geometry, M4.motion, M6.anatomy |
| Kbd | A | 57.1 | D | M1.ref, M4.tokens, M4.theme-parity, M6.anatomy, M6.playground, M6.a11y-section |
| Timeline | B | 57.1 | D | M1.ref, M2.cells, M2.matrix-rendered, M3.disabled, M3.focus, M3.unit-test, M4.tokens, M6.anatomy, M6.api |
| CommandMenu | B | 57.1 | D | M1.ref, M1.axes, M1.controlled, M2.axes, M3.disabled, M3.focus, M3.unit-test, M4.geometry, M6.anatomy |
| SettingsSection | C | 57.1 | D | M1.ref, M4.tokens, M4.theme-parity |
| LoadingState | C | 57.1 | D | M1.ref, M4.tokens, M4.theme-parity |
| SideNavItem | C | 57.1 | D | M1.ref, M4.tokens, M4.theme-parity |
| LinkButton | A | 57.7 | D | M1.ref, M1.polymorphic, M2.matrix-rendered, M3.loading, M3.unit-test, M4.theme-parity, M4.motion, M5.icon-label, M6.anatomy, M6.playground, M6.a11y-section |
| ActivityFeed | B | 57.9 | D | M1.ref, M1.axes, M2.axes, M3.disabled, M3.focus, M3.empty, M3.unit-test, M6.anatomy |
| FileFormatIcon | B | 58.3 | D | M1.ref, M4.tokens, M4.geometry, M6.anatomy, M6.api |
| CircularProgress | B | 58.8 | D | M1.ref, M1.cn, M2.cells, M2.matrix-rendered, M4.tokens, M4.motion, M6.anatomy |
| Notification | B | 58.8 | D | M1.ref, M2.matrix-rendered, M4.geometry, M4.motion, M5.keyboard, M5.ids, M6.anatomy |
| FileUploader | B | 59.1 | D | M1.ref, M1.axes, M1.controlled, M2.axes, M3.loading, M3.focus, M3.unit-test, M4.motion, M6.anatomy |
| Switch | A | 59.3 | D | M1.ref, M1.controlled, M2.matrix-rendered, M3.loading, M3.error, M4.tokens, M4.geometry, M4.motion, M6.anatomy, M6.playground, M6.a11y-section |
| DotStepper | C | 60 | D | M1.ref, M1.controlled, M4.tokens, M4.motion |
| Rating | B | 60 | D | M1.ref, M1.controlled, M2.matrix-rendered, M3.loading, M3.error, M3.focus, M3.unit-test, M4.tokens, M4.motion, M6.anatomy |
| Modal | A | 60 | D | M1.ref, M2.cells, M2.matrix-rendered, M3.disabled, M3.focus, M4.geometry, M5.keyboard, M6.anatomy, M6.playground, M6.a11y-section |
| DataTable | A | 60 | D | M1.ref, M1.controlled, M2.cells, M2.matrix-rendered, M3.disabled, M3.focus, M4.tokens, M4.theme-parity, M6.anatomy, M6.a11y-section |
| Badge | A | 61.1 | D | M1.ref, M1.cn, M4.tokens, M6.anatomy, M6.playground, M6.api, M6.a11y-section |
| Alert | A | 61.1 | D | M1.ref, M4.tokens, M4.motion, M5.keyboard, M6.anatomy, M6.playground, M6.a11y-section |
| CardHeader | B | 61.5 | D | M1.ref, M1.axes, M2.axes, M4.tokens, M6.anatomy |
| CardBody | B | 61.5 | D | M1.ref, M1.axes, M2.axes, M4.tokens, M6.anatomy |
| ContentDivider | B | 61.5 | D | M1.ref, M2.cells, M6.anatomy, M6.api, M6.code |
| ToastProvider | B | 61.9 | D | M1.ref, M2.cells, M2.matrix-rendered, M3.disabled, M3.focus, M3.unit-test, M4.geometry, M6.anatomy |
| Well | B | 62.5 | D | M1.ref, M2.cells, M2.matrix-rendered, M6.anatomy, M6.api, M6.code |
| FilterBar | C | 62.5 | D | M1.ref, M4.tokens, M4.theme-parity |
| ActivityItem | C | 62.5 | D | M1.ref, M4.tokens, M4.theme-parity |
| Progress | A | 63.2 | D | M1.ref, M2.matrix-rendered, M4.tokens, M4.theme-parity, M4.motion, M6.anatomy, M6.a11y-section |
| NumberInput | C | 63.2 | D | M1.ref, M1.controlled, M3.loading, M3.error, M3.focus, M3.unit-test, M4.motion |
| SearchInput | C | 63.2 | D | M1.ref, M1.controlled, M3.loading, M3.error, M3.focus, M3.unit-test, M4.motion |
| CompactButton | A | 64 | D | M1.ref, M1.polymorphic, M3.loading, M3.unit-test, M4.geometry, M4.motion, M6.anatomy, M6.playground, M6.a11y-section |
| User | B | 64.3 | D | M1.ref, M2.matrix-rendered, M4.tokens, M4.theme-parity, M6.anatomy |
| Divider | B | 64.3 | D | M1.ref, M2.cells, M4.tokens, M4.theme-parity, M6.anatomy |
| Code | B | 64.3 | D | M1.ref, M2.cells, M2.matrix-rendered, M4.tokens, M6.anatomy |
| ScrollShadow | B | 64.3 | D | M1.ref, M4.tokens, M4.motion, M5.keyboard, M6.anatomy |
| Breadcrumbs | B | 64.3 | D | M4.tokens, M4.theme-parity, M4.motion, M5.ids, M6.anatomy |
| SelectTrigger | C | 64.7 | D | M1.ref, M3.disabled, M3.loading, M3.error, M3.unit-test, M4.motion |
| Tooltip | B | 65.2 | C | M1.ref, M2.cells, M2.matrix-rendered, M3.disabled, M3.focus, M3.unit-test, M4.tokens, M6.anatomy |
| ButtonTile | B | 65.2 | C | M1.ref, M1.polymorphic, M2.cells, M2.matrix-rendered, M3.loading, M3.unit-test, M4.motion, M6.anatomy |
| Toolbar | B | 65.2 | C | M1.ref, M1.polymorphic, M2.cells, M2.matrix-rendered, M3.loading, M3.unit-test, M5.keyboard, M6.anatomy |
| Textarea | A | 65.4 | C | M2.cells, M2.matrix-rendered, M3.loading, M3.unit-test, M4.motion, M5.role, M6.anatomy, M6.playground, M6.a11y-section |
| Checkbox | A | 65.4 | C | M2.matrix-rendered, M3.loading, M3.unit-test, M4.geometry, M4.motion, M5.aria, M6.anatomy, M6.playground, M6.a11y-section |
| Card | A | 66.7 | C | M1.ref, M2.cells, M4.motion, M6.anatomy, M6.playground, M6.a11y-section |
| Badge | A | 66.7 | C | M1.ref, M4.tokens, M6.anatomy, M6.playground, M6.api, M6.a11y-section |
| Avatar | A | 66.7 | C | M1.ref, M2.matrix-rendered, M4.tokens, M6.anatomy, M6.playground, M6.a11y-section |
| Datepicker | B | 66.7 | C | M1.ref, M1.controlled, M2.cells, M2.matrix-rendered, M3.loading, M4.geometry, M4.motion, M6.anatomy |
| Banner | B | 66.7 | C | M1.ref, M2.matrix-rendered, M5.ids, M6.anatomy, M6.code |
| EmptyState | B | 66.7 | C | M1.ref, M2.cells, M2.matrix-rendered, M3.disabled, M3.unit-test, M5.role, M6.anatomy |
| Table | A | 66.7 | C | M2.cells, M2.matrix-rendered, M3.focus, M3.empty, M3.unit-test, M4.motion, M6.anatomy, M6.a11y-section |
| Popover | B | 66.7 | C | M1.ref, M1.axes, M2.axes, M3.disabled, M3.focus, M3.unit-test, M6.anatomy |
| CryptoAddressChip | B | 66.7 | C | M1.ref, M1.axes, M2.axes, M4.motion, M6.anatomy |
| ErrorState | B | 66.7 | C | M1.ref, M4.tokens, M4.theme-parity, M6.anatomy |
| AvatarGroup | B | 68.8 | C | M1.ref, M1.cn, M2.cells, M2.matrix-rendered, M6.anatomy |
| PaymentCard | B | 68.8 | C | M1.ref, M2.matrix-rendered, M4.geometry, M6.anatomy, M6.api |
| Input | A | 69.2 | C | M2.cells, M2.matrix-rendered, M3.loading, M3.unit-test, M4.motion, M6.anatomy, M6.playground, M6.a11y-section |
| Drawer | B | 69.6 | C | M1.ref, M2.matrix-rendered, M3.disabled, M3.focus, M4.geometry, M5.keyboard, M6.anatomy |
| SocialButton | B | 70.8 | C | M1.ref, M1.polymorphic, M2.matrix-rendered, M3.loading, M3.unit-test, M4.motion, M6.anatomy |
| DigitInput | B | 70.8 | C | M1.ref, M1.controlled, M2.cells, M2.matrix-rendered, M3.loading, M4.motion, M6.anatomy |
| Slider | B | 70.8 | C | M1.ref, M1.controlled, M2.matrix-rendered, M3.loading, M3.error, M4.tokens, M6.anatomy |
| Combobox | B | 70.8 | C | M1.ref, M1.controlled, M2.cells, M2.matrix-rendered, M3.loading, M3.error, M6.anatomy |
| Spinner | B | 71.4 | C | M4.tokens, M4.theme-parity, M5.icon-label, M6.anatomy |
| CardFooter | B | 71.4 | C | M1.ref, M1.axes, M2.axes, M6.anatomy |
| Snippet | B | 71.4 | C | M1.ref, M4.motion, M5.keyboard, M6.anatomy |
| RadioGroup | B | 72 | C | M1.controlled, M2.matrix-rendered, M3.loading, M3.unit-test, M4.geometry, M4.motion, M6.anatomy |
| Tag | B | 72.2 | C | M1.ref, M2.matrix-rendered, M4.motion, M5.icon-label, M6.anatomy |
| ButtonGroup | B | 72.7 | C | M1.axes, M1.polymorphic, M2.axes, M3.unit-test, M5.keyboard, M6.anatomy |
| FancyButton | A | 73.1 | C | M2.matrix-rendered, M3.unit-test, M4.tokens, M4.motion, M6.anatomy, M6.playground, M6.a11y-section |
| Pagination | B | 73.3 | C | M1.controlled, M4.motion, M5.ids, M6.anatomy |
| Chip | A | 73.7 | C | M1.ref, M4.motion, M6.anatomy, M6.playground, M6.a11y-section |
| Tabs | A | 75 | C | M1.ref, M1.controlled, M2.matrix-rendered, M6.anatomy, M6.a11y-section |
| Filters | B | 75 | C | M1.ref, M1.controlled, M4.theme-parity, M6.anatomy |
| Select | A | 76 | C | M2.cells, M2.matrix-rendered, M3.loading, M6.anatomy, M6.playground, M6.a11y-section |
| StatusBadge | B | 76.5 | C | M1.ref, M2.matrix-rendered, M5.icon-label, M6.anatomy |
| WidgetBox | B | 76.5 | C | M1.ref, M2.cells, M2.matrix-rendered, M6.anatomy |
| VoiceVisualizer | B | 76.9 | C | M1.ref, M4.motion, M6.anatomy |

## IA taxonomy (WEBSITE-IA.md §3)

Mapped: **80** components · Categories: actions 9 · forms 21 · display 19 · navigation 8 · feedback 6 · overlay 9 · layout 3 · utilities 5 · Pro badges: 11 · Legacy routes: 2

No orphans, no unmapped routes, no empty categories.
