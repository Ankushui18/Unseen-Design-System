import { useState } from "react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import {
  RiBankLine,
  RiBoxingLine,
  RiBriefcaseLine,
  RiCheckLine,
  RiCpuLine,
  RiFlaskLine,
  RiCustomerService2Line,
  RiGlobalLine,
  RiHeartPulseLine,
  RiRocketLine,
  RiShoppingBagLine,
  RiSparklingLine,
  RiTwitterXLine,
  RiDiscordLine,
  RiGithubLine,
  RiMailLine,
} from "@remixicon/react";
import { SectionLabel } from "./Home";
import { Button, FancyButton } from "../ui/Button";
import { Chip, Divider } from "../ui/Display";
import { Accordion } from "../ui/Navigation";
import { SegmentedControl, StatusBadge } from "../ui/Extra";
import { Callout, PageHeader, Section } from "../docs/Blocks";
import { cn } from "../utils/cn";

/* ================================= PRICING ================================= */

/** Launch tiers. Shown as "planned" while everything is free in preview. */
const TIERS = [
  {
    name: "Free",
    monthly: 0,
    annual: 0,
    tagline: "Forever free, MIT licensed.",
    cta: "Start building",
    variant: "outline" as const,
    planned: false,
    features: [
      "42 open-source components",
      "Light & dark mode",
      "MIT licence, commercial use allowed",
      "Community Discord support",
      "Figma free file",
    ],
  },
  {
    name: "Pro",
    monthly: 119,
    annual: 95,
    tagline: "Everything below, free while we're in preview.",
    cta: "Use it now — free",
    variant: "solid" as const,
    popular: true,
    planned: true,
    features: [
      "100+ PRO components",
      "13 premium blocks",
      "7 sector templates",
      "Theme Studio + CSS export",
      "Figma PRO library (1 seat)",
      "Lifetime updates at launch",
    ],
  },
  {
    name: "Team",
    monthly: 299,
    annual: 239,
    tagline: "For design systems teams adopting at scale.",
    cta: "Talk to sales",
    variant: "outline" as const,
    planned: true,
    features: [
      "Everything in Pro",
      "Unlimited Figma seats",
      "Private Discord channel",
      "Priority issue triage (48h)",
      "Onboarding call",
      "Invoice & PO billing",
    ],
  },
];

export function PricingPage({ navigate }: { navigate: (t: string) => void }) {
  const [annual, setAnnual] = useState(true);

  const FAQ = [
    { q: "Is everything really free right now?", a: "Yes. All 100+ components, the 13 premium blocks, the 7 sector templates and the Theme Studio are open with no signup and no paywall. We are in public preview so we can test the system against real projects before charging for it." },
    { q: "Why is it free?", a: "Because the best way to validate a design system is to see it survive real products. Free beta access buys us honest feedback, edge cases and usage data; in return you get every component without a paywall. Early users will get a discount when paid tiers launch." },
    { q: "What happens when preview ends?", a: "Launch pricing is shown on this page for transparency. The 42 core components stay free under MIT permanently — that does not change. PRO features move behind a one-time payment, and anyone who has been using them in preview gets an early-adopter discount." },
    { q: "Can I ship to production during preview?", a: "Yes, and we would appreciate it. Preview exists precisely so the components get exercised on real products. If something breaks, that is a bug we want to hear about in Discord or GitHub issues." },
    { q: "How does this compare to shadcn/ui?", a: "shadcn/ui copies component source into your project, which gives you ownership but no central theming. Aperture keeps components as a versioned package driven by semantic tokens, so a rebrand is two CSS variables instead of a find-and-replace across your repo. Both are valid; they optimise for different things." },
    { q: "Do I need Tailwind CSS?", a: "Yes. Aperture is built on Tailwind CSS v4 and exposes its tokens through the native @theme bridge. You need Tailwind v4 in your project, and you do not need a tailwind.config.js — the package ships its own CSS layer." },
    { q: "Which frameworks are supported?", a: "React 18+ is the primary target and is fully supported, including React Server Components. Vue and Web Component adapters are on the public roadmap but not yet available. Next.js (App Router), Vite, Remix and Astro all work today — see the installation guide." },
    { q: "Is TypeScript required?", a: "TypeScript is optional at runtime but every component ships with full type definitions. Props, variants and token names are all typed, so you get autocomplete and compile-time errors whether or not your project uses TS." },
    { q: "What is the licence?", a: "The free tier is MIT licensed with no attribution required, including commercial and client work. PRO tier is a commercial licence that permits unlimited projects; the only restriction is redistributing the source as a competing component library." },
    { q: "Is there dark mode?", a: "Yes, natively. Every semantic token has a paired dark value, and toggling the dark class or the data-theme attribute switches the entire system — components, blocks and templates. There is a toggle in the navbar to try it." },
    { q: "How do updates work?", a: "Updates ship as normal npm versions and Figma library updates. We follow semantic versioning and publish a codemod for any breaking change, so major upgrades are mechanical rather than manual." },
  ];

  return (
    <div className="mx-auto max-w-[1180px] px-4 py-14 sm:px-5 sm:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <SectionLabel>Pricing</SectionLabel>
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-paragraph-xs font-medium text-accent-soft-foreground ring-1 ring-inset ring-accent/20">
          <RiFlaskLine size={13} />
          Public preview — everything is free right now
        </div>
        <h1 className="mt-4 text-title-h5 text-foreground text-balance sm:text-title-h4 lg:text-title-h3">
          Use everything now. <span className="text-gradient">Pay only if we earn it.</span>
        </h1>
        <p className="mt-4 text-paragraph-md text-muted">
          Every PRO component, block and template is open during public preview — no signup, no paywall. Prices below are
          what we plan to charge at launch, shown for transparency.
        </p>
        <div className="mt-8 flex justify-center">
          <SegmentedControl
            value={annual ? "annual" : "monthly"}
            onChange={(v) => setAnnual(v === "annual")}
            items={[{ value: "monthly", label: "Monthly" }, { value: "annual", label: "Annual" }]}
          />
        </div>
        {annual && <p className="mt-3 text-paragraph-xs text-success-soft-foreground">Annual billing saves 20% at launch</p>}
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {TIERS.map((t) => {
          const price = annual ? t.annual : t.monthly;
          return (
            <div
              key={t.name}
              className={cn(
                "relative flex flex-col rounded-20 bg-surface p-6 ring-1 shadow-xs",
                t.popular ? "ring-2 ring-accent shadow-md lg:-mt-3 lg:mb-3" : "ring-border",
              )}
            >
              {t.popular && <Chip tone="accent" size="sm" className="absolute -top-2.5 left-6">Most popular</Chip>}
              <div className="flex items-center justify-between">
                <p className="text-label-md text-foreground">{t.name}</p>
                {t.popular ? (
                  <Chip size="sm" tone="accent" variant="soft"><Sparkles className="h-3 w-3" />Best value</Chip>
                ) : t.name === "Free" ? (
                  <Chip size="sm" tone="success" variant="soft">Open source</Chip>
                ) : null}
              </div>
              <p className="mt-1.5 text-paragraph-sm text-muted">{t.tagline}</p>

              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="text-title-h2 tabular-nums text-foreground">${price}</span>
                <span className="text-paragraph-sm text-subtle">
                  {price === 0 ? "forever" : annual ? "/ seat / year" : "/ seat / month"}
                </span>
              </div>
              {price > 0 && annual && <p className="mt-1 text-paragraph-xs text-subtle">${t.monthly} billed monthly</p>}

              <Button
                fullWidth
                className="mt-6"
                variant={t.popular ? "solid" : "outline"}
                tone={t.popular ? "accent" : "default"}
                onClick={() => navigate("docs/installation")}
                endContent={t.popular ? <ArrowRight className="h-4 w-4" /> : undefined}
              >
                {t.cta}
              </Button>

              <Divider label="Includes" className="my-6" />

              <ul className="flex-1 space-y-2.5">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-paragraph-sm text-foreground">
                    <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-success-soft text-success-soft-foreground">
                      <RiCheckLine size={12} />
                    </span>
                    {f}
                  </li>
                ))}
                {t.planned && (
                  <li className="!mt-4 flex items-start gap-2.5 rounded-lg bg-accent-soft/50 px-2.5 py-2 text-paragraph-xs text-accent-soft-foreground">
                    <RiFlaskLine size={14} className="mt-px shrink-0" />
                    Free during public preview — pricing applies at launch
                  </li>
                )}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Comparison */}
      <div className="mt-16">
        <h2 className="text-title-h6 text-foreground">Compare tiers</h2>
        <div className="mt-5 overflow-hidden rounded-20 bg-surface ring-1 ring-border shadow-xs">
          <div className="ds-scroll overflow-x-auto">
            <table className="w-full min-w-[560px] text-left">
              <thead>
                <tr className="border-b border-separator bg-surface-secondary text-subheading-xs uppercase text-subtle">
                  <th className="px-5 py-3 font-medium">Capability</th>
                  <th className="px-5 py-3 text-center font-medium">Free</th>
                  <th className="px-5 py-3 text-center font-medium text-accent">Pro</th>
                  <th className="px-5 py-3 text-center font-medium">Team</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-separator-secondary">
                {[
                  ["Components", "42", "100+", "100+"],
                  ["Premium blocks", "—", "13", "13"],
                  ["Sector templates", "—", "7", "7"],
                  ["Dark mode", true, true, true],
                  ["Theme Studio", "—", true, true],
                  ["Figma library", "Free file", "PRO · 1 seat", "PRO · unlimited"],
                  ["Licence", "MIT", "Commercial", "Commercial"],
                  ["Updates", "Community", "Lifetime", "Lifetime"],
                  ["Support", "Discord", "Email · 72h", "Priority · 48h"],
                  ["Team seats", "1", "1 Figma seat", "Unlimited"],
                ].map(([label, f, p, t]) => (
                  <tr key={label as string} className="transition-colors hover:bg-surface-hover">
                    <td className="px-5 py-3 text-paragraph-sm text-foreground">{label as string}</td>
                    {[f, p, t].map((v, i) => (
                      <td key={i} className="px-5 py-3 text-center">
                        {v === true ? (
                          <RiCheckLine size={16} className={cn("mx-auto", i === 1 && "text-accent")} />
                        ) : v === "—" ? (
                          <span className="text-disabled">—</span>
                        ) : (
                          <span className={cn("text-paragraph-sm tabular-nums", i === 1 ? "font-medium text-accent" : "text-muted")}>{v as string}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Guarantee strip */}
      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {[
          { i: RiCustomerService2Line, t: "14-day refund", d: "No questions asked, full refund." },
          { i: RiRocketLine, t: "Lifetime updates", d: "Every future release included." },
          { i: RiBriefcaseLine, t: "Client work allowed", d: "Unlimited commercial projects." },
        ].map((g) => (
          <div key={g.t} className="flex items-start gap-3 rounded-2xl bg-surface p-4 ring-1 ring-border shadow-xs">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-secondary text-muted ring-1 ring-border">
              <g.i size={16} />
            </span>
            <div>
              <p className="text-label-sm text-foreground">{g.t}</p>
              <p className="text-paragraph-xs text-muted">{g.d}</p>
            </div>
          </div>
        ))}
      </div>

      <FAQBlock items={FAQ} />
    </div>
  );
}

/* ================================== TEMPLATES ============================== */

const SECTORS = [
  { key: "ai", name: "AI & SaaS", icon: RiCpuLine, count: 9, tone: "accent" as const,
    pages: ["Chat workspace", "Model playground", "Usage & billing", "Prompt library", "Team settings"] },
  { key: "finance", name: "Finance", icon: RiBankLine, count: 11, tone: "success" as const,
    pages: ["Portfolio dashboard", "Transactions table", "KYC verification", "Invoices", "Card management"] },
  { key: "health", name: "Healthcare", icon: RiHeartPulseLine, count: 8, tone: "danger" as const,
    pages: ["Patient overview", "Appointments", "Prescriptions", "Lab results", "Provider directory"] },
  { key: "ecommerce", name: "E-commerce", icon: RiShoppingBagLine, count: 10, tone: "warning" as const,
    pages: ["Product grid", "Cart & checkout", "Order summary", "Inventory", "Customer profiles"] },
  { key: "hr", name: "HR & Internal", icon: RiBoxingLine, count: 7, tone: "default" as const,
    pages: ["Employee directory", "Time off", "Performance review", "Onboarding flow", "Org chart"] },
  { key: "agency", name: "Agency & Marketing", icon: RiSparklingLine, count: 8, tone: "accent" as const,
    pages: ["Landing page", "Pricing", "Case study", "Client portal", "Testimonials"] },
];

export function TemplatesPage({ navigate }: { navigate: (t: string) => void }) {
  return (
    <div className="mx-auto max-w-[1180px] px-4 py-14 sm:px-5 sm:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <SectionLabel>Templates</SectionLabel>
        <h1 className="mt-3 text-title-h5 text-foreground text-balance sm:text-title-h4 lg:text-title-h3">
          Sector templates, <span className="text-gradient">not blank canvas</span>
        </h1>
        <p className="mt-4 text-paragraph-md text-muted">
          Free during preview — 53 full pages across six industries, each assembled from Aperture primitives. Drop in your data, retheme in two
          variables, ship.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <FancyButton onClick={() => navigate("blocks")} endContent={<ArrowRight />}>
            Explore the blocks
          </FancyButton>
          <Button variant="outline" tone="default" onClick={() => navigate("docs/installation")}>Install Aperture</Button>
        </div>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SECTORS.map((s) => (
          <div key={s.key} className="group overflow-hidden rounded-20 bg-surface ring-1 ring-border shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="dot-grid relative h-40 overflow-hidden bg-background-secondary/70 p-5">
              {/* Miniature layout mock — varies per sector */}
              {s.key === "ai" && (
                <div className="flex h-full gap-2">
                  <div className="w-14 shrink-0 space-y-1.5 rounded-lg bg-surface p-1.5 ring-1 ring-border">{[0,1,2,3,4].map((i) => <div key={i} className={cn("h-1.5 rounded", i === 1 ? "bg-accent" : "bg-neutral-200 dark:bg-neutral-700")} />)}</div>
                  <div className="flex flex-1 flex-col gap-1.5">
                    <div className="h-6 rounded-lg bg-surface ring-1 ring-border" />
                    <div className="ml-auto w-3/5 rounded-lg rounded-br-sm bg-accent px-2 py-1"><div className="h-1 rounded bg-white/70" /></div>
                    <div className="w-4/5 rounded-lg rounded-tl-sm bg-surface px-2 py-1 ring-1 ring-border"><div className="h-1 rounded bg-neutral-200 dark:bg-neutral-700" /></div>
                    <div className="ml-auto w-2/5 rounded-lg rounded-br-sm bg-accent px-2 py-1"><div className="h-1 rounded bg-white/70" /></div>
                    <div className="mt-auto flex gap-1.5 rounded-lg bg-surface p-1.5 ring-1 ring-border"><div className="h-1.5 flex-1 rounded bg-neutral-200 dark:bg-neutral-700" /></div>
                  </div>
                </div>
              )}
              {s.key === "finance" && (
                <div className="flex h-full flex-col gap-2">
                  <div className="grid grid-cols-3 gap-2">{["$28.9k", "1,204", "2.1%"].map((v, i) => <div key={i} className="rounded-lg bg-surface p-1.5 ring-1 ring-border"><div className="text-[8px] tabular-nums text-foreground">{v}</div><div className="mt-1 h-0.5 rounded-full bg-accent/70" style={{ width: `${40 + i * 20}%` }} /></div>)}</div>
                  <div className="flex flex-1 items-end gap-1 rounded-lg bg-surface p-2 ring-1 ring-border">{[38,55,42,70,58,82,64,90,74,96].map((h, i) => <div key={i} className={cn("flex-1 rounded-sm", i === 9 ? "bg-accent" : "bg-accent/25")} style={{ height: `${h}%` }} />)}</div>
                </div>
              )}
              {s.key === "health" && (
                <div className="flex h-full gap-2">
                  <div className="flex-1 space-y-1.5">{[0,1,2,3].map((i) => <div key={i} className="flex items-center gap-1.5 rounded-lg bg-surface p-1.5 ring-1 ring-border"><span className={cn("h-4 w-4 shrink-0 rounded-full", i === 0 ? "bg-success-soft" : "bg-neutral-200 dark:bg-neutral-700")} /><div className="flex-1 space-y-0.5"><div className="h-1 w-3/4 rounded bg-neutral-200 dark:bg-neutral-700" /><div className="h-1 w-1/2 rounded bg-neutral-100 dark:bg-neutral-800" /></div></div>)}</div>
                  <div className="w-16 shrink-0 rounded-lg bg-surface p-1.5 ring-1 ring-border"><div className="mx-auto h-8 w-8 rounded-full border-2 border-accent/70" /><div className="mt-1.5 h-1 rounded bg-neutral-200 dark:bg-neutral-700" /><div className="mt-1 h-1 rounded bg-neutral-100 dark:bg-neutral-800" /></div>
                </div>
              )}
              {s.key === "ecommerce" && (
                <div className="grid h-full grid-cols-3 gap-2">{[0,1,2,3,4,5].map((i) => <div key={i} className="overflow-hidden rounded-lg bg-surface ring-1 ring-border"><div className={cn("h-1/2", ["bg-accent/25","bg-warning/25","bg-success/25","bg-sky/25","bg-purple/25","bg-accent/15"][i])} /><div className="space-y-1 p-1"><div className="h-1 rounded bg-neutral-200 dark:bg-neutral-700" /><div className="h-1 w-1/2 rounded bg-neutral-100 dark:bg-neutral-800" /></div></div>)}</div>
              )}
              {s.key === "hr" && (
                <div className="flex h-full flex-col gap-2">
                  <div className="rounded-lg bg-surface p-1.5 ring-1 ring-border"><div className="flex gap-1"><span className="h-2 w-8 rounded bg-accent" /><span className="h-2 w-8 rounded bg-neutral-200 dark:bg-neutral-700" /><span className="h-2 w-8 rounded bg-neutral-200 dark:bg-neutral-700" /></div></div>
                  <div className="grid flex-1 grid-cols-2 gap-1.5">{[0,1,2,3].map((i) => <div key={i} className="rounded-lg bg-surface p-1.5 ring-1 ring-border"><div className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-neutral-200 dark:bg-neutral-700" /><div className="h-1 flex-1 rounded bg-neutral-200 dark:bg-neutral-700" /></div><div className="mt-1 h-1 w-2/3 rounded bg-neutral-100 dark:bg-neutral-800" /></div>)}</div>
                </div>
              )}
              {s.key === "agency" && (
                <div className="flex h-full flex-col items-center justify-center gap-2 rounded-lg bg-surface p-3 ring-1 ring-border">
                  <div className="h-2 w-3/4 rounded bg-neutral-300 dark:bg-neutral-600" />
                  <div className="h-1.5 w-1/2 rounded bg-neutral-200 dark:bg-neutral-700" />
                  <div className="h-1.5 w-2/5 rounded bg-neutral-200 dark:bg-neutral-700" />
                  <span className="mt-1 rounded bg-accent px-2 py-0.5"><span className="text-[7px] text-white">Get started</span></span>
                </div>
              )}
              <span className="pointer-events-none absolute bottom-2 right-2 rounded-full bg-surface/90 px-2 py-0.5 text-[9px] font-medium text-foreground shadow-sm ring-1 ring-border backdrop-blur">
                {s.count} pages
              </span>
            </div>
            <div className="border-t border-separator p-5">
              <div className="flex items-center justify-between gap-2">
                <p className="text-label-md text-foreground">{s.name}</p>
                <Chip size="sm" tone={s.tone} variant="soft" startContent={<RiFlaskLine size={11} />}>Free preview</Chip>
              </div>
              <ul className="mt-3 space-y-1.5">
                {s.pages.slice(0, 4).map((p) => (
                  <li key={p} className="flex items-center gap-2 text-paragraph-xs text-muted">
                    <span className="h-1 w-1 rounded-full bg-subtle" />
                    {p}
                  </li>
                ))}
                {s.pages.length > 4 && <li className="text-paragraph-xs text-subtle">+{s.pages.length - 4} more</li>}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <Callout title="Every template is token-driven">
        Because templates consume the same semantic tokens as the library, switching your brand hue or radius restyles
        every template at once. No template ships hard-coded colours.
      </Callout>
    </div>
  );
}

/* ==================================== FAQ ================================== */

export function FAQBlock({ items, title = "Frequently asked questions" }: { items: { q: string; a: string }[]; title?: string }) {
  return (
    <div className="mx-auto mt-16 max-w-2xl">
      <h2 className="text-center text-title-h6 text-foreground">{title}</h2>
      <div className="mt-7">
        <Accordion items={items.map((i, n) => ({ key: String(n), title: i.q, content: i.a }))} variant="split" />
      </div>
      <p className="mt-6 text-center text-paragraph-sm text-muted">
        Still have a question?{" "}
        <a href="mailto:hello@aperture.design" className="inline-flex items-center gap-1 text-accent hover:underline">
          <RiMailLine size={14} /> Email us
        </a>
      </p>
    </div>
  );
}

/* ================================= ROADMAP ================================= */

const ROADMAP = [
  { status: "Shipped", tone: "success" as const, items: ["Data Table with sorting & selection", "File Upload dropzone", "Focus traps in Modal & Drawer", "Theme Studio CSS export", "Remix Icon gallery (333 icons)"] },
  { status: "In progress", tone: "accent" as const, items: ["Date range picker", "Combobox typeahead", "Virtualised table for 10k+ rows", "Right-to-left layout support"] },
  { status: "Next up", tone: "warning" as const, items: ["Vue adapter", "Web Component build", "Time picker", "Drag-and-drop list reorder", "Chart primitives"] },
  { status: "Exploring", tone: "default" as const, items: ["Figma plugin for token sync", "Codemod CLI for major versions", "Animated route transitions"] },
];

export function RoadmapPage() {
  return (
    <>
      <PageHeader
        eyebrow="Getting Started"
        title="Roadmap"
        description="What is shipped, what is being built and what is under consideration. Vote by opening an issue — priority follows demand."
        tags={["Public", "Updated monthly"]}
      />
      <Section title="Status board">
        <div className="grid gap-5 sm:grid-cols-2">
          {ROADMAP.map((col) => (
            <div key={col.status} className="rounded-20 bg-surface p-5 ring-1 ring-border shadow-xs">
              <div className="flex items-center justify-between">
                <p className="text-label-sm text-foreground">{col.status}</p>
                <StatusBadge status={col.status === "Shipped" ? "completed" : col.status === "In progress" ? "pending" : "info"} size="sm">
                  {col.items.length}
                </StatusBadge>
              </div>
              <ul className="mt-4 space-y-2.5">
                {col.items.map((i) => (
                  <li key={i} className="flex items-start gap-2.5 text-paragraph-sm text-muted">
                    <span className={cn("mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full", col.tone === "success" ? "bg-success" : col.tone === "accent" ? "bg-accent" : col.tone === "warning" ? "bg-warning" : "bg-subtle")} />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

/* ============================== NEWSLETTER + COMMUNITY ===================== */

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const valid = /.+@.+\..+/.test(email);

  return (
    <section className="border-t border-separator bg-surface-secondary/50">
      <div className="mx-auto max-w-2xl px-4 py-14 text-center sm:px-5">
        <p className="text-subheading-xs uppercase text-accent">Stay in the loop</p>
        <h2 className="mt-3 text-title-h5 text-foreground sm:text-title-h4">Join the early-access list</h2>
        <p className="mx-auto mt-3 max-w-md text-paragraph-sm text-muted">
          One email a month: new components, template drops and token changes before they launch. No marketing,
          unsubscribe anytime — and you will be first in line for the early-adopter discount when beta ends.
        </p>

        {done ? (
          <div className="mx-auto mt-7 flex max-w-md items-center justify-center gap-2 rounded-2xl bg-success-soft px-5 py-3.5 text-label-sm text-success-soft-foreground">
            <Check className="h-4 w-4" /> You're on the list — check your inbox.
          </div>
        ) : (
          <form
            className="mx-auto mt-7 flex max-w-md flex-col gap-2.5 sm:flex-row"
            onSubmit={(e) => { e.preventDefault(); if (valid) setDone(true); }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              aria-label="Email address"
              className="h-11 flex-1 rounded-10 bg-field px-3.5 text-paragraph-sm text-foreground shadow-xs ring-1 ring-inset ring-border outline-none transition-all placeholder:text-field-placeholder hover:bg-field-hover focus:bg-field-focus focus:ring-foreground focus:shadow-ring-neutral"
            />
            <FancyButton type="submit" disabled={!valid}>Subscribe</FancyButton>
          </form>
        )}

        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {[
            { i: RiGithubLine, l: "GitHub", m: "24.8k" },
            { i: RiDiscordLine, l: "Discord", m: "3,200 members" },
            { i: RiTwitterXLine, l: "X / Twitter", m: "12k followers" },
            { i: RiGlobalLine, l: "Figma", m: "2,000+ users" },
          ].map((c) => (
            <a key={c.l} href="#" className="group inline-flex items-center gap-2 text-paragraph-sm text-muted transition-colors hover:text-foreground">
              <c.i size={17} />
              {c.l}
              <span className="text-paragraph-xs text-subtle">{c.m}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
