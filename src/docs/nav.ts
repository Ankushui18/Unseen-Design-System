export type NavItem = { title: string; href: string; badge?: "New" | "Beta" | "Updated"; keywords?: string };
export type NavGroup = { title: string; items: NavItem[] };

export const COMPONENT_GROUPS: NavGroup[] = [
  {
    title: "PRO",
    items: [
      { title: "AI Prompt Input", href: "components/ai-prompt-input", badge: "New", keywords: "llm ai chat prompt multimodal model picker" },
      { title: "Currency Amount Input", href: "components/currency-amount-input", badge: "New", keywords: "fintech crypto currency amount balance" },
      { title: "Crypto Address Chip", href: "components/crypto-address-chip", badge: "New", keywords: "web3 crypto hash wallet address" },
      { title: "Voice Visualizer", href: "components/voice-visualizer", badge: "New", keywords: "audio voice waveform recording speech" },
      { title: "Activity Feed", href: "components/activity-feed", badge: "New", keywords: "timeline events feed updates" },
      { title: "Command Menu", href: "components/command-menu", badge: "New", keywords: "quick actions palette fuzzy search" },
      { title: "Notification Feed", href: "components/notification-feed", badge: "New", keywords: "inbox unread events list" },
      { title: "File Uploader", href: "components/file-uploader", badge: "New", keywords: "dropzone drag drop attach" },
      { title: "Filters", href: "components/filters", badge: "New", keywords: "faceted filter sidebar facet" },
      { title: "Time Picker", href: "components/time-picker", badge: "New", keywords: "hours minutes picker" },
      { title: "Calendar", href: "components/calendar", badge: "New", keywords: "date month grid" },
    ],
  },
  {
    title: "Actions",
    items: [
      { title: "Button", href: "components/button", badge: "Updated", keywords: "cta action click submit filled stroke lighter ghost" },
      { title: "Fancy Button", href: "components/fancy-button", badge: "New", keywords: "bevel primary shine" },
      { title: "Button Tile", href: "components/button-tile", badge: "New", keywords: "tile selectable onboarding" },
      { title: "Toolbar", href: "components/toolbar", badge: "New", keywords: "formatting floating editor" },
      { title: "Compact Button", href: "components/compact-button", badge: "New", keywords: "icon small dense" },
      { title: "Link Button", href: "components/link-button", badge: "New", keywords: "text anchor inline" },
      { title: "Social Button", href: "components/social-button", badge: "New", keywords: "google apple github oauth login" },
      { title: "Button Group", href: "components/button-group", keywords: "segmented joined" },
      { title: "Toggle Group", href: "components/toggle-group", badge: "New", keywords: "toolbar pressed format" },
    ],
  },
  {
    title: "Forms",
    items: [
      { title: "Input", href: "components/input", keywords: "text field form" },
      { title: "Textarea", href: "components/textarea", keywords: "multiline" },
      { title: "Select", href: "components/select", keywords: "dropdown picker" },
      { title: "Checkbox", href: "components/checkbox", keywords: "tick boolean" },
      { title: "Radio Group", href: "components/radio-group", keywords: "choice option" },
      { title: "Switch", href: "components/switch", keywords: "toggle boolean" },
      { title: "Slider", href: "components/slider", keywords: "range" },
      { title: "Digit Input", href: "components/digit-input", badge: "New", keywords: "otp code verification pin" },
      { title: "Datepicker", href: "components/datepicker", badge: "New", keywords: "calendar date" },
      { title: "Label & Hint", href: "components/label-hint", badge: "New", keywords: "form text helper" },
      { title: "Checkbox & Radio Card", href: "components/selection-card", badge: "New", keywords: "plan option card select" },
      { title: "Number, Search & Counter", href: "components/inputs-more", badge: "New", keywords: "stepper quantity search clear textarea counter select trigger" },
      { title: "Rating", href: "components/rating", badge: "New", keywords: "stars review" },
      { title: "Color Picker", href: "components/color-picker", badge: "New", keywords: "swatch hex" },
      { title: "Combobox", href: "components/combobox", badge: "New", keywords: "searchable select autocomplete" },
      { title: "Chat Input", href: "components/chat-input", badge: "New", keywords: "ai composer prompt message" },
    ],
  },
  {
    title: "Data Display",
    items: [
      { title: "Card", href: "components/card", keywords: "surface panel container" },
      { title: "Featured Icon", href: "components/featured-icon", badge: "New", keywords: "contained icon tinted gradient flourish" },
      { title: "Table", href: "components/table", badge: "Updated", keywords: "grid rows data" },
      { title: "Data Table", href: "components/data-table", badge: "New", keywords: "sortable selectable rows bulk actions pagination" },
      { title: "Avatar", href: "components/avatar", keywords: "profile user image group" },
      { title: "Avatar Group", href: "components/avatar-group", badge: "New", keywords: "stack overlap overflow compact capsule" },
      { title: "Chip", href: "components/chip", keywords: "tag pill label" },
      { title: "Status Badge", href: "components/status-badge", badge: "New", keywords: "dot state completed pending failed" },
      { title: "Tag", href: "components/tag", badge: "New", keywords: "filter removable label" },
      { title: "Badge", href: "components/badge", badge: "Updated", keywords: "count notification dot 10 colors" },
      { title: "Info Label & Message", href: "components/info-label", badge: "New", keywords: "stat caption inline message" },
      { title: "List Item", href: "components/list-item", badge: "New", keywords: "row cell" },
      { title: "Payment Card", href: "components/payment-card", badge: "New", keywords: "credit visa billing" },
      { title: "Well", href: "components/well", badge: "New", keywords: "container recessed inset" },
      { title: "Progress", href: "components/progress", keywords: "bar loading circular" },
      { title: "Skeleton", href: "components/skeleton", keywords: "placeholder shimmer loading" },
      { title: "Snippet", href: "components/snippet", keywords: "code copy terminal" },
      { title: "Keyboard Key", href: "components/kbd", keywords: "kbd shortcut hotkey" },
      { title: "File Format Icon", href: "components/file-format-icon", badge: "New", keywords: "pdf document extension" },
      { title: "Widget Box", href: "components/widget-box", badge: "New", keywords: "dashboard panel container" },
      { title: "Content Divider", href: "components/content-divider", badge: "New", keywords: "section separator label" },
      { title: "Timeline", href: "components/timeline", badge: "New", keywords: "activity log history" },
    ],
  },
  {
    title: "Navigation",
    items: [
      { title: "Tabs", href: "components/tabs", keywords: "segmented panel" },
      { title: "Tab Menu Horizontal", href: "components/tab-menu-horizontal", badge: "New", keywords: "underline navigation categories menu row" },
      { title: "Segmented Control", href: "components/segmented-control", badge: "New", keywords: "toggle switch view" },
      { title: "Stepper", href: "components/stepper", badge: "New", keywords: "wizard steps progress dot" },
      { title: "Tab Menu Vertical", href: "components/tab-menu-vertical", badge: "New", keywords: "sidebar settings rail" },
      { title: "Accordion", href: "components/accordion", keywords: "collapse disclosure faq" },
      { title: "Breadcrumbs", href: "components/breadcrumbs", keywords: "path trail" },
      { title: "Pagination", href: "components/pagination", keywords: "pages paging" },
    ],
  },
  {
    title: "Feedback & Overlays",
    items: [
      { title: "Alert", href: "components/alert", keywords: "banner callout notice" },
      { title: "Notification", href: "components/notification", badge: "New", keywords: "toast rich actions" },
      { title: "Banner", href: "components/banner", badge: "New", keywords: "announcement strip top" },
      { title: "Toast", href: "components/toast", badge: "New", keywords: "notification snackbar" },
      { title: "Modal", href: "components/modal", badge: "Updated", keywords: "dialog popup" },
      { title: "Alert Dialog", href: "components/alert-dialog", badge: "New", keywords: "confirm destructive" },
      { title: "Hover Card", href: "components/hover-card", badge: "New", keywords: "preview profile popover" },
      { title: "Drawer", href: "components/drawer", keywords: "sheet sidebar panel" },
      { title: "Tooltip", href: "components/tooltip", keywords: "hint hover" },
      { title: "Popover", href: "components/popover", badge: "New", keywords: "anchored floating helper layer" },
      { title: "Dropdown", href: "components/dropdown", badge: "New", keywords: "account menu checkbox user" },
      { title: "Menu", href: "components/menu", keywords: "dropdown popover context" },
      { title: "Empty State", href: "components/empty-state", badge: "New", keywords: "no data placeholder" },
      { title: "Spinner", href: "components/spinner", keywords: "loader loading" },
    ],
  },
];

export const NAV: NavGroup[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "docs/introduction", keywords: "overview about" },
      { title: "Installation", href: "docs/installation", keywords: "setup install npm" },
      { title: "Design Principles", href: "docs/principles", keywords: "philosophy rules" },
      { title: "Changelog", href: "docs/changelog", badge: "Updated", keywords: "releases versions" },
    ],
  },
  {
    title: "Foundations",
    items: [
      { title: "Color", href: "foundations/color", keywords: "palette tokens semantic oklch" },
      { title: "Typography", href: "foundations/typography", keywords: "font type scale text" },
      { title: "Spacing & Layout", href: "foundations/spacing", keywords: "grid gap margin padding" },
      { title: "Sizing", href: "foundations/sizing", keywords: "height icon avatar control scale" },
      { title: "Radius & Elevation", href: "foundations/elevation", keywords: "shadow corner depth" },
      { title: "Borders", href: "foundations/borders", keywords: "hairline ring separator divider" },
      { title: "Opacity & Z-index", href: "foundations/opacity", keywords: "disabled translucent stacking layer" },
      { title: "Motion", href: "foundations/motion", keywords: "animation easing duration" },
      { title: "Breakpoints & Responsive", href: "foundations/breakpoints", keywords: "mobile viewport reflow responsive zoom" },
      { title: "Iconography", href: "foundations/icons", keywords: "icon svg symbol" },
      { title: "Accessibility", href: "foundations/accessibility", keywords: "a11y contrast wcag" },
      { title: "Token Reference", href: "foundations/tokens", keywords: "variables css api" },
      { title: "Themes", href: "foundations/themes", keywords: "brand accent radius dark mode export figma" },
    ],
  },
  {
    title: "Templates",
    items: [
      { title: "AI & Neural Studio", href: "templates/ai", badge: "New", keywords: "ai neural chat assistant streaming model parameters" },
      { title: "Analytics Dashboard", href: "templates/analytics", badge: "New", keywords: "dashboard kpi metrics charts widgetbox data table" },
      { title: "Settings Screen", href: "templates/settings", badge: "New", keywords: "preferences vertical tab account security slider alert" },
      { title: "Billing & Plans", href: "templates/billing", badge: "New", keywords: "subscription payment card invoices pricing coupon" },
      { title: "Team & People", href: "templates/team", badge: "New", keywords: "members permissions data table filters activity feed" },
    ],
  },
  {
    title: "Patterns",
    items: [{ title: "Product Patterns", href: "patterns", badge: "New", keywords: "pageheader search filter table statgrid empty state settings" }],
  },
  {
    title: "Blocks",
    items: [{ title: "All Blocks", href: "blocks", badge: "New", keywords: "auth login pricing table dashboard premium" }],
  },
  {
    title: "Components",
    items: [{ title: "Overview", href: "components", keywords: "all gallery list" }],
  },
  ...COMPONENT_GROUPS,
];

export const ALL_ITEMS: (NavItem & { group: string })[] = NAV.flatMap((g) =>
  g.items.map((i) => ({ ...i, group: g.title })),
);

export function findItem(href: string) {
  return ALL_ITEMS.find((i) => i.href === href);
}

export function siblings(href: string) {
  const idx = ALL_ITEMS.findIndex((i) => i.href === href);
  return { prev: idx > 0 ? ALL_ITEMS[idx - 1] : undefined, next: idx >= 0 && idx < ALL_ITEMS.length - 1 ? ALL_ITEMS[idx + 1] : undefined };
}
