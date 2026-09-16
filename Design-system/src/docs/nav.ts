export type NavItem = { title: string; href: string; badge?: "New" | "Beta" | "Updated"; pro?: boolean; keywords?: string };
export type NavGroup = { title: string; items: NavItem[] };

export const COMPONENT_GROUPS: NavGroup[] = [
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
      { title: "Digit Input", href: "components/digit-input", badge: "New", keywords: "otp code verification pin", pro: true,},
      { title: "Datepicker", href: "components/datepicker", badge: "New", keywords: "calendar date", pro: true,},
      { title: "Label & Hint", href: "components/label-hint", badge: "New", keywords: "form text helper" },
      { title: "Checkbox & Radio Card", href: "components/selection-card", badge: "New", keywords: "plan option card select", pro: true,},
      { title: "Number, Search & Counter", href: "components/inputs-more", badge: "New", keywords: "stepper quantity search clear textarea counter select trigger" },
      { title: "Rating", href: "components/rating", badge: "New", keywords: "stars review" },
      { title: "Inline Edit", href: "components/overflow-utilities", badge: "New", keywords: "transfer list carousel tree inline edit speed dial split button", pro: true,},
      { title: "Copy Button", href: "components/system-ui", badge: "New", keywords: "clipboard clipboard copy", pro: true,},
      { title: "Color Picker", href: "components/color-picker", badge: "New", keywords: "swatch hex", pro: true,},
      { title: "Combobox", href: "components/combobox", badge: "New", keywords: "searchable select autocomplete", pro: true,},
      { title: "Chat Input", href: "components/chat-input", badge: "New", keywords: "ai composer prompt message", pro: true,},
      { title: "Chat Bubble", href: "components/chat-bubble", badge: "New", keywords: "message thread conversation", pro: true,},
    ],
  },
  {
    title: "Data Display",
    items: [
      { title: "Card", href: "components/card", keywords: "surface panel container" },
      { title: "Data Table", href: "components/data-table", badge: "New", keywords: "sortable selectable bulk pagination column visibility datagrid", pro: true,},
      { title: "Table", href: "components/table", badge: "Updated", keywords: "grid rows data" },
      { title: "Avatar", href: "components/avatar", keywords: "profile user image" },
      { title: "Chip", href: "components/chip", keywords: "tag pill label" },
      { title: "Status Badge", href: "components/status-badge", badge: "New", keywords: "dot state completed pending failed" },
      { title: "Tag", href: "components/tag", badge: "New", keywords: "filter removable label" },
      { title: "Badge", href: "components/badge", badge: "Updated", keywords: "count notification dot 10 colors" },
      { title: "Info Label & Message", href: "components/info-label", badge: "New", keywords: "stat caption inline message" },
      { title: "List Item", href: "components/list-item", badge: "New", keywords: "row cell" },
      { title: "Payment Card", href: "components/payment-card", badge: "New", keywords: "credit visa billing", pro: true,},
      { title: "Well", href: "components/well", badge: "New", keywords: "container recessed inset", pro: true,},
      { title: "Progress", href: "components/progress", keywords: "bar loading circular" },
      { title: "Skeleton", href: "components/skeleton", keywords: "placeholder shimmer loading" },
      { title: "Snippet", href: "components/snippet", keywords: "code copy terminal" },
      { title: "Keyboard Key", href: "components/kbd", keywords: "kbd shortcut hotkey" },
      { title: "File Upload", href: "components/file-upload", badge: "New", keywords: "dropzone drag drop attach progress", pro: true,},
      { title: "File Format Icon", href: "components/file-format-icon", badge: "New", keywords: "pdf document extension" },
      { title: "Widget Box", href: "components/widget-box", badge: "New", keywords: "dashboard panel container", pro: true,},
      { title: "Content Divider", href: "components/content-divider", badge: "New", keywords: "section separator label", pro: true,},
      { title: "Timeline", href: "components/timeline", badge: "New", keywords: "activity log history", pro: true,},
      { title: "Pricing Card", href: "components/pricing-card", badge: "New", keywords: "plan tier billing package", pro: true,},
      { title: "Order Summary", href: "components/order-summary", badge: "New", keywords: "cart checkout totals receipt", pro: true,},
      { title: "Team Member Card", href: "components/team-member-card", badge: "New", keywords: "person staff directory", pro: true,},
      { title: "Stat Card", href: "components/stat-card", badge: "New", keywords: "kpi metric delta analytics", pro: true,},
      { title: "Metre", href: "components/metre", badge: "New", keywords: "capacity quota storage battery segment", pro: true,},
      { title: "Scroll Area", href: "components/scroll-area", badge: "New", keywords: "scrollbar mask fade overflow", pro: true,},
      { title: "Tree View", href: "components/tree-view", badge: "New", keywords: "hierarchy folder nested expand", pro: true,},
      { title: "Carousel", href: "components/carousel", badge: "New", keywords: "slider testimonial swipe slide", pro: true,},
    ],
  },
  {
    title: "Navigation",
    items: [
      { title: "Tabs", href: "components/tabs", keywords: "segmented panel" },
      { title: "Segmented Control", href: "components/segmented-control", badge: "New", keywords: "toggle switch view" },
      { title: "Stepper", href: "components/stepper", badge: "New", keywords: "wizard steps progress dot", pro: true,},
      { title: "Tab Menu Vertical", href: "components/tab-menu-vertical", badge: "New", keywords: "sidebar settings rail", pro: true,},
      { title: "Accordion", href: "components/accordion", keywords: "collapse disclosure faq" },
      { title: "Breadcrumbs", href: "components/breadcrumbs", keywords: "path trail" },
      { title: "Pagination", href: "components/pagination", keywords: "pages paging" },
    ],
  },
  {
    title: "Feedback & Overlays",
    items: [
      { title: "Alert", href: "components/alert", keywords: "banner callout notice" },
      { title: "Notification", href: "components/notification", badge: "New", keywords: "toast rich actions", pro: true,},
      { title: "Banner", href: "components/banner", badge: "New", keywords: "announcement strip top", pro: true,},
      { title: "Toast", href: "components/toast", badge: "New", keywords: "notification snackbar" },
      { title: "Modal", href: "components/modal", badge: "Updated", keywords: "dialog popup" },
      { title: "Alert Dialog", href: "components/alert-dialog", badge: "New", keywords: "confirm destructive", pro: true,},
      { title: "Hover Card", href: "components/hover-card", badge: "New", keywords: "preview profile popover", pro: true,},
      { title: "Drawer", href: "components/drawer", keywords: "sheet sidebar panel" },
      { title: "Tooltip", href: "components/tooltip", keywords: "hint hover" },
      { title: "Dropdown", href: "components/dropdown", badge: "New", keywords: "account menu checkbox user", pro: true,},
      { title: "Menu", href: "components/menu", keywords: "dropdown popover context" },
      { title: "Empty State", href: "components/empty-state", badge: "New", keywords: "no data placeholder", pro: true,},
      { title: "Error Page", href: "components/error-page", badge: "New", keywords: "404 500 403 not found" },
      { title: "Cookie Consent", href: "components/cookie-consent", badge: "New", keywords: "gdpr banner accept" },
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
      { title: "Roadmap", href: "docs/roadmap", keywords: "future plans voting" },
    ],
  },
  {
    title: "Foundations",
    items: [
      { title: "Color", href: "foundations/color", keywords: "palette tokens semantic oklch" },
      { title: "Typography", href: "foundations/typography", keywords: "font type scale text" },
      { title: "Spacing & Layout", href: "foundations/spacing", keywords: "grid gap margin padding" },
      { title: "Radius & Elevation", href: "foundations/elevation", keywords: "shadow corner depth" },
      { title: "Motion", href: "foundations/motion", keywords: "animation easing duration" },
      { title: "Iconography", href: "foundations/icons", keywords: "icon svg symbol" },
      { title: "Accessibility", href: "foundations/accessibility", keywords: "a11y contrast wcag" },
    ],
  },
  {
    title: "Theming",
    items: [
      { title: "Theme Studio", href: "theme", badge: "New", keywords: "customize builder brand accent" },
      { title: "Token Reference", href: "foundations/tokens", keywords: "variables css api" },
      { title: "Pricing", href: "pricing", keywords: "cost licence free pro team buy" },
    ],
  },
  {
    title: "Blocks",
    items: [
      { title: "All Blocks", href: "blocks", badge: "New", keywords: "auth login pricing table dashboard premium" },
      { title: "Templates", href: "templates", badge: "New", keywords: "sector industry ai finance healthcare ecommerce hr agency pages" },
    ],
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
