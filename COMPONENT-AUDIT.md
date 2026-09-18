# Component Audit (generated)

> Regenerate with: `npm run audit:components -- --md`
> Source: `scripts/component-audit.mjs` — static source heuristics over `src/ui/*.tsx`.
>
> Columns: Dis = disabled state · Load = loading state · Err = error/invalid state ·
> Aria = aria-* attributes · Role = explicit role · Focus = focus-visible styles ·
> Keys = **explicit** key handlers (native elements like `<button>` get keyboard for
> free and legitimately show "·") · Ctrl = controlled API (onChange/onValueChange) ·
> Docs = matched to a page in `src/docs/nav.ts`.


| Component | File | Dis | Load | Err | Aria | Role | Focus | Keys | Ctrl | Docs |
|---|---|---|---|---|---|---|---|---|---|---|
| Spinner | ui/Button.tsx | ✓ | ✓ | · | ✓ | · | ✓ | · | · | ✓ |
| Button | ui/Button.tsx | ✓ | ✓ | · | ✓ | · | ✓ | · | · | ✓ |
| FancyButton | ui/Button.tsx | ✓ | ✓ | · | ✓ | ✓ | ✓ | · | · | ✓ |
| ButtonGroup | ui/Button.tsx | ✓ | ✓ | · | ✓ | ✓ | ✓ | · | · | ✓ |
| FeaturedIcon | ui/Display.tsx | · | · | · | · | · | · | · | · | ✓ |
| Card | ui/Display.tsx | · | · | · | · | · | · | · | · | ✓ |
| CardHeader | ui/Display.tsx | · | · | · | · | · | · | · | · | ✓ |
| CardBody | ui/Display.tsx | · | · | · | · | · | · | · | · | · |
| CardFooter | ui/Display.tsx | ✓ | · | · | ✓ | · | · | · | · | · |
| Chip | ui/Display.tsx | ✓ | ✓ | · | ✓ | · | · | · | · | ✓ |
| Badge | ui/Display.tsx | ✓ | ✓ | · | ✓ | · | · | · | · | ✓ |
| Badge | ui/Display.tsx | ✓ | ✓ | · | ✓ | · | · | · | · | ✓ |
| Avatar | ui/Display.tsx | ✓ | ✓ | · | ✓ | · | · | · | · | ✓ |
| AvatarGroup | ui/Display.tsx | ✓ | ✓ | · | ✓ | · | · | · | · | ✓ |
| AvatarGroupCompact | ui/Display.tsx | · | ✓ | · | ✓ | ✓ | · | · | · | ✓ |
| User | ui/Display.tsx | · | ✓ | · | ✓ | ✓ | · | · | · | ✓ |
| Kbd | ui/Display.tsx | · | ✓ | · | ✓ | ✓ | · | · | · | ✓ |
| Snippet | ui/Display.tsx | · | ✓ | · | ✓ | ✓ | · | · | · | ✓ |
| Divider | ui/Display.tsx | · | · | · | ✓ | ✓ | · | · | · | ✓ |
| Skeleton | ui/Display.tsx | · | · | · | ✓ | ✓ | · | · | · | ✓ |
| Progress | ui/Display.tsx | · | · | · | ✓ | ✓ | · | · | · | ✓ |
| CircularProgress | ui/Display.tsx | · | · | · | ✓ | ✓ | · | · | · | ✓ |
| Alert | ui/Display.tsx | · | · | · | ✓ | ✓ | · | · | · | ✓ |
| Code | ui/Display.tsx | · | · | · | ✓ | ✓ | · | · | · | ✓ |
| ScrollShadow | ui/Display.tsx | · | · | · | ✓ | ✓ | · | · | · | · |
| CompactButton | ui/Extra.tsx | ✓ | · | ✓ | ✓ | · | ✓ | · | · | ✓ |
| LinkButton | ui/Extra.tsx | ✓ | · | ✓ | ✓ | · | ✓ | · | · | ✓ |
| SocialButton | ui/Extra.tsx | ✓ | · | · | ✓ | · | ✓ | · | · | ✓ |
| StatusBadge | ui/Extra.tsx | ✓ | · | · | ✓ | · | ✓ | · | · | ✓ |
| Tag | ui/Extra.tsx | ✓ | · | · | ✓ | ✓ | ✓ | · | · | ✓ |
| SegmentedControl | ui/Extra.tsx | ✓ | · | · | ✓ | ✓ | ✓ | · | ✓ | ✓ |
| HorizontalStepper | ui/Extra.tsx | ✓ | · | ✓ | ✓ | ✓ | · | · | · | ✓ |
| VerticalStepper | ui/Extra.tsx | ✓ | · | ✓ | ✓ | ✓ | · | · | · | ✓ |
| DotStepper | ui/Extra.tsx | ✓ | · | ✓ | ✓ | ✓ | · | ✓ | ✓ | ✓ |
| DigitInput | ui/Extra.tsx | ✓ | · | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Datepicker | ui/Extra.tsx | ✓ | · | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| FileFormatIcon | ui/Extra.tsx | ✓ | · | · | ✓ | ✓ | · | · | · | ✓ |
| Notification | ui/Extra.tsx | ✓ | · | · | ✓ | ✓ | · | · | · | ✓ |
| Banner | ui/Extra.tsx | · | · | ✓ | ✓ | ✓ | · | · | · | ✓ |
| Label | ui/Extra.tsx | · | · | ✓ | ✓ | ✓ | · | · | · | ✓ |
| Hint | ui/Extra.tsx | · | · | ✓ | ✓ | ✓ | · | · | · | ✓ |
| Input | ui/Form.tsx | ✓ | · | ✓ | ✓ | · | ✓ | · | · | ✓ |
| Textarea | ui/Form.tsx | ✓ | · | ✓ | ✓ | · | ✓ | · | · | ✓ |
| Select | ui/Form.tsx | ✓ | · | ✓ | ✓ | · | ✓ | · | · | ✓ |
| Checkbox | ui/Form.tsx | ✓ | · | ✓ | · | ✓ | ✓ | · | · | ✓ |
| RadioGroup | ui/Form.tsx | ✓ | · | ✓ | ✓ | ✓ | ✓ | · | ✓ | ✓ |
| Switch | ui/Form.tsx | ✓ | · | · | ✓ | ✓ | ✓ | · | ✓ | ✓ |
| Slider | ui/Form.tsx | ✓ | · | · | ✓ | ✓ | ✓ | · | ✓ | ✓ |
| Dropdown | ui/More.tsx | ✓ | · | · | · | · | · | · | ✓ | ✓ |
| VerticalTabMenu | ui/More.tsx | ✓ | · | · | · | · | · | · | ✓ | ✓ |
| ContentDivider | ui/More.tsx | ✓ | · | · | · | · | · | · | · | ✓ |
| SelectionCard | ui/More.tsx | ✓ | · | · | ✓ | ✓ | · | · | ✓ | ✓ |
| Rating | ui/More.tsx | ✓ | · | · | ✓ | ✓ | · | · | ✓ | ✓ |
| NumberInput | ui/More.tsx | ✓ | · | · | ✓ | ✓ | · | · | ✓ | ✓ |
| SearchInput | ui/More.tsx | ✓ | · | · | ✓ | ✓ | · | · | ✓ | ✓ |
| TextareaCounter | ui/More.tsx | ✓ | · | · | ✓ | ✓ | · | · | ✓ | ✓ |
| ToggleGroup | ui/More.tsx | ✓ | · | · | ✓ | ✓ | · | · | ✓ | ✓ |
| WidgetBox | ui/More.tsx | · | · | · | ✓ | ✓ | · | · | · | ✓ |
| ColorPicker | ui/More.tsx | · | · | · | ✓ | ✓ | · | · | ✓ | ✓ |
| Timeline | ui/More.tsx | · | · | · | ✓ | · | · | · | · | ✓ |
| EmptyState | ui/More.tsx | · | · | · | ✓ | · | ✓ | · | · | ✓ |
| SelectTrigger | ui/More.tsx | · | · | · | ✓ | · | ✓ | · | · | ✓ |
| Tabs | ui/Navigation.tsx | ✓ | · | · | ✓ | ✓ | · | ✓ | ✓ | ✓ |
| Accordion | ui/Navigation.tsx | ✓ | · | · | ✓ | ✓ | · | ✓ | · | ✓ |
| Breadcrumbs | ui/Navigation.tsx | ✓ | · | · | ✓ | ✓ | · | ✓ | · | ✓ |
| Pagination | ui/Navigation.tsx | ✓ | · | · | ✓ | ✓ | · | ✓ | ✓ | ✓ |
| Table | ui/Navigation.tsx | ✓ | · | · | ✓ | · | · | · | · | ✓ |
| Modal | ui/Overlay.tsx | · | · | · | ✓ | ✓ | · | · | · | ✓ |
| Drawer | ui/Overlay.tsx | · | · | · | ✓ | ✓ | · | · | · | ✓ |
| Tooltip | ui/Overlay.tsx | · | · | · | ✓ | ✓ | · | ✓ | · | ✓ |
| Popover | ui/Overlay.tsx | · | · | · | ✓ | ✓ | · | ✓ | · | ✓ |
| MenuItem | ui/Overlay.tsx | · | · | · | ✓ | ✓ | · | ✓ | · | ✓ |
| MenuSeparator | ui/Overlay.tsx | · | · | · | ✓ | ✓ | · | ✓ | · | ✓ |
| MenuLabel | ui/Overlay.tsx | · | · | · | ✓ | ✓ | · | ✓ | · | ✓ |
| ToastProvider | ui/Overlay.tsx | · | · | · | ✓ | ✓ | · | · | · | · |
| ButtonTile | ui/Patterns.tsx | ✓ | · | · | ✓ | · | ✓ | · | · | ✓ |
| InfoLabel | ui/Patterns.tsx | ✓ | · | · | ✓ | · | ✓ | · | · | ✓ |
| InlineMessage | ui/Patterns.tsx | ✓ | · | · | ✓ | ✓ | ✓ | · | · | ✓ |
| ListItem | ui/Patterns.tsx | ✓ | · | · | ✓ | ✓ | ✓ | · | · | ✓ |
| Toolbar | ui/Patterns.tsx | ✓ | · | · | ✓ | ✓ | ✓ | · | · | ✓ |
| ToolbarButton | ui/Patterns.tsx | ✓ | · | · | ✓ | ✓ | ✓ | · | · | ✓ |
| ToolbarSeparator | ui/Patterns.tsx | ✓ | · | · | ✓ | ✓ | ✓ | · | · | ✓ |
| HoverCard | ui/Patterns.tsx | ✓ | · | · | ✓ | ✓ | ✓ | · | · | ✓ |
| ProfileHoverCard | ui/Patterns.tsx | ✓ | · | · | ✓ | ✓ | ✓ | ✓ | · | ✓ |
| ChatInput | ui/Patterns.tsx | ✓ | · | · | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| AlertDialog | ui/Patterns.tsx | ✓ | · | · | ✓ | · | ✓ | ✓ | · | ✓ |
| Combobox | ui/Patterns.tsx | ✓ | · | · | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| PaymentCard | ui/Patterns.tsx | · | · | · | ✓ | ✓ | ✓ | ✓ | · | ✓ |
| Well | ui/Patterns.tsx | · | · | · | ✓ | ✓ | · | · | · | ✓ |
| ActivityFeed | ui/Pro.tsx | · | · | · | ✓ | ✓ | · | · | · | ✓ |
| CommandMenu | ui/Pro.tsx | · | · | · | ✓ | ✓ | · | ✓ | ✓ | ✓ |
| NotificationFeed | ui/Pro.tsx | ✓ | · | ✓ | ✓ | ✓ | · | ✓ | · | ✓ |
| FileUploader | ui/Pro.tsx | ✓ | · | ✓ | ✓ | · | · | ✓ | ✓ | ✓ |
| Filters | ui/Pro.tsx | ✓ | · | ✓ | ✓ | ✓ | · | ✓ | ✓ | ✓ |
| TimePicker | ui/Pro.tsx | · | · | · | ✓ | ✓ | · | ✓ | ✓ | ✓ |
| Calendar | ui/Pro.tsx | · | ✓ | · | ✓ | ✓ | · | ✓ | ✓ | ✓ |
| AiPromptInput | ui/Pro.tsx | ✓ | ✓ | · | ✓ | ✓ | · | ✓ | ✓ | ✓ |
| CryptoAddressChip | ui/Pro.tsx | ✓ | ✓ | · | ✓ | · | · | · | · | ✓ |
| VoiceVisualizer | ui/Pro.tsx | ✓ | ✓ | · | ✓ | · | · | · | · | ✓ |
| CurrencyAmountInput | ui/Pro.tsx | ✓ | · | · | ✓ | · | · | · | ✓ | ✓ |
| PageHeader | ui/ProductPatterns.tsx | · | · | · | ✓ | ✓ | · | ✓ | ✓ | ✓ |
| SearchBar | ui/ProductPatterns.tsx | · | · | · | ✓ | ✓ | · | ✓ | ✓ | ✓ |
| FilterBar | ui/ProductPatterns.tsx | · | · | · | ✓ | ✓ | · | ✓ | · | ✓ |
| FilterChip | ui/ProductPatterns.tsx | · | · | · | ✓ | ✓ | · | ✓ | · | ✓ |
| SortMenu | ui/ProductPatterns.tsx | · | ✓ | · | ✓ | ✓ | · | ✓ | ✓ | ✓ |
| DataTable | ui/ProductPatterns.tsx | · | ✓ | · | ✓ | ✓ | · | ✓ | ✓ | ✓ |
| DataCard | ui/ProductPatterns.tsx | · | ✓ | · | ✓ | · | · | ✓ | · | ✓ |
| ActivityItem | ui/ProductPatterns.tsx | · | ✓ | · | ✓ | · | · | · | · | ✓ |
| SettingsSection | ui/ProductPatterns.tsx | · | ✓ | · | ✓ | · | · | · | · | ✓ |
| EmptyState | ui/ProductPatterns.tsx | · | · | · | ✓ | · | · | · | · | ✓ |
| LoadingState | ui/ProductPatterns.tsx | · | · | · | ✓ | · | · | · | · | ✓ |
| ErrorState | ui/ProductPatterns.tsx | ✓ | · | · | ✓ | · | · | · | · | · |
| StatGrid | ui/ProductPatterns.tsx | ✓ | · | · | ✓ | · | · | · | · | ✓ |
| CardGrid | ui/ProductPatterns.tsx | ✓ | · | · | ✓ | · | · | · | · | ✓ |
| SettingsToggle | ui/ProductPatterns.tsx | ✓ | · | · | ✓ | · | · | · | ✓ | ✓ |
| CopyField | ui/ProductPatterns.tsx | ✓ | · | · | ✓ | · | · | · | · | ✓ |
| SideNavItem | ui/ProductPatterns.tsx | ✓ | · | · | ✓ | · | · | · | · | ✓ |
