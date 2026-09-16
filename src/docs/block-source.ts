import source from "../blocks/index.tsx?raw";

const NAMES: Record<string, string> = {
  auth: "AuthCardBlock", verify: "VerifyBlock", onboarding: "OnboardingBlock",
  stats: "StatsBlock", table: "TableBlock", command: "CommandMenuBlock",
  profile: "ProfileCardBlock", notification: "NotificationBlock", upload: "FileUploadBlock",
  usage: "UsageBlock", settings: "SettingsBlock", rating: "RatingBlock", pricing: "PricingBlock",
};

// Copy the implementation that is actually rendered, not an imaginary npm API.
export function getBlockSource(key: string) {
  const name = NAMES[key];
  const start = name ? source.indexOf(`export function ${name}(`) : -1;
  if (start < 0) return source;
  const end = source.indexOf("\n/* ", start);
  const body = source.slice(start, end < 0 ? undefined : end).trim();
  const imports = source.slice(0, source.indexOf("/* ")).replace(/import\s*\{([^}]+)\}\s*from\s*(["'][^"']+["']);/g, (_statement, names: string, modulePath: string) => {
    const used = names.split(",").map((name) => name.trim()).filter((name) => {
      const localName = name.replace(/^type\s+/, "").split(/\s+as\s+/).pop()!;
      return new RegExp(`\\b${localName}\\b`).test(body);
    });
    return used.length ? `import { ${used.join(", ")} } from ${modulePath};` : "";
  }).replace(/\n{3,}/g, "\n\n");
  return `${imports.trim()}\n\n${body}\n`;
}

export function blockFilename(key: string) {
  return `${NAMES[key] ?? "Block"}.tsx`;
}