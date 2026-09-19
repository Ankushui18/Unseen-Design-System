import { COMPONENT_GROUPS } from "./nav";
import source from "../blocks/index.tsx?raw";
import landing from "../blocks/landing.tsx?raw";
import templates from "../pages/Templates.tsx?raw";

const NAMES: Record<string, { name: string; file: "index" | "landing" | "templates" }> = {
  auth: { name: "AuthCardBlock", file: "index" },
  verify: { name: "VerifyBlock", file: "index" },
  onboarding: { name: "OnboardingBlock", file: "index" },
  stats: { name: "StatsBlock", file: "index" },
  table: { name: "TableBlock", file: "index" },
  command: { name: "CommandMenuBlock", file: "index" },
  profile: { name: "ProfileCardBlock", file: "index" },
  notification: { name: "NotificationBlock", file: "index" },
  upload: { name: "FileUploadBlock", file: "index" },
  usage: { name: "UsageBlock", file: "index" },
  settings: { name: "SettingsBlock", file: "index" },
  rating: { name: "RatingBlock", file: "index" },
  pricing: { name: "PricingBlock", file: "index" },
  hero: { name: "HeroBlock", file: "landing" },
  "hero-lit": { name: "HeroLitBlock", file: "landing" },
  "hero-split": { name: "HeroSplitBlock", file: "landing" },
  "hero-inverse": { name: "HeroInverseBlock", file: "landing" },
  logos: { name: "LogosBlock", file: "landing" },
  features: { name: "FeaturesBlock", file: "landing" },
  "features-bento": { name: "FeaturesBentoBlock", file: "landing" },
  metrics: { name: "StatsBandBlock", file: "landing" },
  testimonials: { name: "TestimonialsBlock", file: "landing" },
  cta: { name: "CtaBlock", file: "landing" },
  faq: { name: "FaqBlock", file: "landing" },
  "how-it-works": { name: "HowItWorksBlock", file: "landing" },
  integrations: { name: "IntegrationsBlock", file: "landing" },
  newsletter: { name: "NewsletterBlock", file: "landing" },
  "template-analytics": { name: "AnalyticsDashboardTemplate", file: "templates" },
  "template-settings": { name: "SettingsScreenTemplate", file: "templates" },
  "template-billing": { name: "BillingPageTemplate", file: "templates" },
  "template-team": { name: "TeamPeopleTemplate", file: "templates" },
};

/** The raw file a block lives in, plus its exported function name. */
function entryFor(key: string) {
  const entry = NAMES[key];
  const raw = entry?.file === "landing" ? landing : entry?.file === "templates" ? templates : source;
  const name = entry?.name;
  const start = name ? raw.indexOf(`export function ${name}(`) : -1;
  const end = start < 0 ? -1 : raw.indexOf("\n/* ", start);
  return { raw, name, start, end };
}

/** The block's own function body — the only thing it renders from. */
function bodyFor(key: string) {
  const { raw, start, end } = entryFor(key);
  if (start < 0) return "";
  return raw.slice(start, end < 0 ? undefined : end);
}

// Copy the implementation that is actually rendered, not an imaginary npm API.
export function getBlockSource(key: string) {
  const { raw, start, end } = entryFor(key);
  if (start < 0) return raw;
  const body = raw.slice(start, end < 0 ? undefined : end).trim();
  const imports = raw.slice(0, raw.indexOf("/* ")).replace(/import\s*\{([^}]+)\}\s*from\s*([\"'][^\"']+[\"']);/g, (_statement, names: string, modulePath: string) => {
    const used = names.split(",").map((n) => n.trim()).filter((n) => {
      const localName = n.replace(/^type\s+/, "").split(/\s+as\s+/).pop()!;
      return new RegExp(`\\b${localName}\\b`).test(body);
    });
    return used.length ? `import { ${used.join(", ")} } from ${modulePath};` : "";
  }).replace(/\n{3,}/g, "\n\n");
  return `${imports.trim()}\n\n${body}\n`;
}

export function blockFilename(key: string) {
  return `${NAMES[key]?.name ?? "Block"}.tsx`;
}

/* --------------------------------------------------------------------------
   "Built with" — derived from the block's own source, never hand-listed.
   -------------------------------------------------------------------------- */

/**
 * Component names whose docs page is not the slug of the export name.
 *
 * Each entry is here because the two names genuinely differ — `Kbd` is
 * documented as "Keyboard Key", `Divider` as "Content Divider", and the product
 * patterns share the `/patterns` page. `tests/block-manifest.test.ts` fails if
 * an alias points at a route that does not exist, so this table cannot rot
 * silently.
 */
const ROUTE_ALIASES: Record<string, string> = {
  Divider: "components/content-divider",
  CircularProgress: "components/progress",
  Kbd: "components/kbd",
  Hint: "components/label-hint",
  HorizontalStepper: "components/stepper",
  AvatarGroupCompact: "components/avatar-group",
  FilterBar: "components/filters",
  FilterChip: "components/filters",
  SearchBar: "components/filters",
  ActivityItem: "components/activity-feed",
  SettingsSection: "patterns",
  SettingsToggle: "patterns",
};

/** Exports with no docs page yet. Rendered unlinked rather than hidden. */
export const UNDOCUMENTED = new Set(["Logo"]);

const slug = (name: string) =>
  name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Every component route in the site, keyed by the slug of its nav title. */
const SLUG_TO_ROUTE: Record<string, string> = Object.fromEntries(
  COMPONENT_GROUPS.flatMap((g) =>
    g.items.filter((i) => i.href.startsWith("components/")).map((i) => [slug(i.title), i.href])
  )
);

export type ComponentUse = { name: string; href?: string };

const cache = new Map<string, ComponentUse[]>();
const KEY_BY_NAME = new Map(Object.entries(NAMES).map(([key, e]) => [e.name, key]));

/** The `src/ui` names a file imports — the allow-list for any tag in its body. */
function uiImports(raw: string) {
  const names = new Set<string>();
  for (const m of raw.matchAll(/import\s*\{([^}]+)\}\s*from\s*"\.\.\/ui\/[A-Za-z]+"/g)) {
    for (const rawName of m[1].split(",")) {
      const local = rawName.trim().replace(/^type\s+/, "").split(/\s+as\s+/).pop();
      if (local) names.add(local);
    }
  }
  return names;
}

/**
 * The `src/ui` components a block actually renders.
 *
 * Parsed from the block's function body and filtered against the `../ui/*`
 * imports in the same file, so the list follows the code — a rename shows up
 * here on the next build, and nothing is stored twice.
 *
 * One level of indirection is followed: several blocks are thin compositions of
 * others (`HeroBlock` renders `<HeroLitBlock />`). Reporting "no components" for
 * those would be wrong — the page shows what the visitor will actually get.
 */
export function getBlockComponents(key: string, seen = new Set<string>()): ComponentUse[] {
  if (seen.has(key)) return [];   // composition cycles cannot recurse forever
  seen.add(key);

  const hit = cache.get(key);
  if (hit) return hit;

  const { raw } = entryFor(key);
  const uiNames = uiImports(raw);
  const tags = [...new Set([...bodyFor(key).matchAll(/<([A-Z][A-Za-z0-9]*)/g)].map((m) => m[1]))];

  const own = tags.filter((n) => uiNames.has(n));
  const delegated = tags
    .map((n) => KEY_BY_NAME.get(n))
    .filter((k): k is string => Boolean(k))
    .flatMap((k) => getBlockComponents(k, seen).map((u) => u.name));

  const names = [...new Set([...own, ...delegated])].sort((a, b) => a.localeCompare(b));

  const uses: ComponentUse[] = names.map((name) => {
    if (UNDOCUMENTED.has(name)) return { name };
    const href = ROUTE_ALIASES[name] ?? SLUG_TO_ROUTE[slug(name)];
    return href ? { name, href } : { name };
  });

  cache.set(key, uses);
  return uses;
}
