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

// Copy the implementation that is actually rendered, not an imaginary npm API.
export function getBlockSource(key: string) {
  const entry = NAMES[key];
  const raw = entry?.file === "landing" ? landing : entry?.file === "templates" ? templates : source;
  const name = entry?.name;
  const start = name ? raw.indexOf(`export function ${name}(`) : -1;
  if (start < 0) return raw;
  const end = raw.indexOf("\n/* ", start);
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
