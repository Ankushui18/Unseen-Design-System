import { useState } from "react";
import { Accordion } from "../ui/Navigation";
import { Button, FancyButton } from "../ui/Button";
import { Avatar, AvatarGroup, Card, Chip, CircularProgress, FeaturedIcon, Kbd, Snippet } from "../ui/Display";
import { Input, Switch } from "../ui/Form";
import { useToast } from "../ui/Overlay";
import { cn } from "../utils/cn";
import {
  RiArrowRightLine,
  RiCheckLine,
  RiCommandLine,
  RiGlobalLine,
  RiMailLine,
  RiPaletteLine,
  RiRocketLine,
  RiShieldCheckLine,
  RiSparkling2Line,
  RiStarFill,
  RiTeamLine,
  RiTerminalLine,
} from "@remixicon/react";

/* --------------------------------- Lit Hero -------------------------------- */

export function HeroLitBlock() {
  const { push } = useToast();
  return (
    <section className="surface-lit relative flex w-full flex-col items-center overflow-hidden rounded-20 px-4 py-12 text-center sm:px-8 sm:py-16">
      <div className="inline-flex items-center gap-2 rounded-full bg-surface-secondary/80 py-1 pl-1.5 pr-3.5 ring-1 ring-border backdrop-blur-sm transition hover:ring-border-strong">
        <FeaturedIcon icon={<RiSparkling2Line size={14} />} size="xs" variant="gradient" tone="accent" />
        <span className="text-paragraph-xs font-medium text-foreground">Unseen Public Beta</span>
        <span className="h-3 w-px bg-separator" />
        <span className="text-paragraph-xs text-muted">What's new <RiArrowRightLine size={12} className="inline ml-0.5" /></span>
      </div>
      <h1 className="mt-6 max-w-3xl text-title-h3 text-foreground sm:text-title-h1">
        Build products people<br />describe as <span className="text-gradient font-medium">considered</span>.
      </h1>
      <p className="mt-5 max-w-xl text-paragraph-md text-muted sm:text-paragraph-lg">
        Thoughtful React primitives, design tokens, and composed patterns that agree with each other — so every surface ships with one voice.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <FancyButton size="lg" onClick={() => push({ title: "Explore components", description: "Opening the component library.", tone: "accent" })}>
          Explore components <RiArrowRightLine size={18} />
        </FancyButton>
        <Button size="lg" variant="outline" tone="default" onClick={() => push({ title: "Foundations", description: "Opening token reference.", tone: "default" })}>
          Browse foundations
        </Button>
      </div>
      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-5">
        <AvatarGroup items={[{ name: "Sophia W" }, { name: "James B" }, { name: "Lena M" }, { name: "Arthur T" }, { name: "Emma W" }]} size="sm" max={4} />
        <div className="flex flex-col items-center gap-0.5 sm:items-start">
          <span className="flex items-center gap-1 text-warning">
            {Array.from({ length: 5 }).map((_, i) => <RiStarFill key={i} size={14} className="fill-current" />)}
          </span>
          <span className="text-paragraph-xs text-muted">Loved by <strong className="font-medium text-foreground">4,300+</strong> teams building in public</span>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Split Hero ------------------------------- */

export function HeroSplitBlock() {
  const [workspace, setWorkspace] = useState("Studio");
  const [tier, setTier] = useState<"pro" | "team">("pro");
  const [autoScale, setAutoScale] = useState(true);
  const { push } = useToast();

  return (
    <section className="w-full rounded-20 bg-surface px-4 py-8 ring-1 ring-border sm:px-8 sm:py-12">
      <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="text-left lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-paragraph-xs font-medium text-accent-soft-foreground">
            <RiSparkling2Line size={14} /> Production-grade design system
          </div>
          <h1 className="mt-4 text-title-h3 text-foreground sm:text-title-h1">
            Design and code in <span className="text-gradient">lockstep</span>.
          </h1>
          <p className="mt-4 max-w-lg text-paragraph-md text-muted sm:text-paragraph-lg">
            A token-driven foundation and 60+ headless-grade primitives designed for modern SaaS applications.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <FancyButton size="lg" onClick={() => push({ title: "Get Started", description: "Opening installation guide.", tone: "accent" })}>
              Start building <RiArrowRightLine size={18} />
            </FancyButton>
            <Button size="lg" variant="outline" tone="default" onClick={() => push({ title: "Live Preview", description: "Opening interactive patterns.", tone: "default" })}>
              View showcases
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-paragraph-xs text-muted">
            <span className="flex items-center gap-1.5"><RiCheckLine size={15} className="text-success" /> React 19 & TypeScript</span>
            <span className="flex items-center gap-1.5"><RiCheckLine size={15} className="text-success" /> OKLCH semantic tokens</span>
            <span className="flex items-center gap-1.5"><RiCheckLine size={15} className="text-success" /> Zero bundle lock-in</span>
          </div>
        </div>

        <div className="lg:col-span-5">
          <Card elevation={3} className="border-glow overflow-hidden p-5 sm:p-6">
            <div className="flex items-center justify-between border-b border-separator pb-4">
              <div className="flex items-center gap-2.5">
                <FeaturedIcon icon={<RiRocketLine size={18} />} size="sm" tone="accent" />
                <div>
                  <p className="text-label-sm text-foreground">Deploy Environment</p>
                  <p className="text-paragraph-xs text-subtle">us-east · production</p>
                </div>
              </div>
              <Chip size="sm" tone="success" variant="soft" dot>Online</Chip>
            </div>

            <div className="mt-4 space-y-4">
              <Input
                label="Workspace slug"
                value={workspace}
                onChange={(e) => setWorkspace(e.target.value)}
                prefixAffix="app.io/"
                size="sm"
              />
              <div>
                <p className="mb-2 text-label-xs text-foreground">Cluster Plan</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTier("pro")}
                    className={cn(
                      "flex flex-col items-start rounded-10 p-2.5 text-left ring-1 transition-all",
                      tier === "pro" ? "bg-accent-soft ring-accent text-accent-soft-foreground" : "bg-surface-secondary ring-border text-muted hover:text-foreground"
                    )}
                  >
                    <span className="text-label-xs font-medium">Pro Node</span>
                    <span className="text-[11px]">$29/mo · 8 vCPU</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTier("team")}
                    className={cn(
                      "flex flex-col items-start rounded-10 p-2.5 text-left ring-1 transition-all",
                      tier === "team" ? "bg-accent-soft ring-accent text-accent-soft-foreground" : "bg-surface-secondary ring-border text-muted hover:text-foreground"
                    )}
                  >
                    <span className="text-label-xs font-medium">Dedicated</span>
                    <span className="text-[11px]">$99/mo · 32 vCPU</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-10 bg-surface-secondary p-3 ring-1 ring-border">
                <div className="min-w-0">
                  <p className="text-label-xs text-foreground">Auto-scale cluster</p>
                  <p className="text-[11px] text-muted">Dynamically scale instances</p>
                </div>
                <Switch checked={autoScale} onChange={setAutoScale} size="sm" label={<span className="sr-only">Auto-scale cluster</span>} />
              </div>

              <Button
                fullWidth
                size="md"
                onClick={() => push({ title: "Cluster deployed", description: `Provisioned ${workspace}.app.io on ${tier.toUpperCase()} tier.`, tone: "accent" })}
              >
                Deploy cluster
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Inverse Hero ------------------------------ */

export function HeroInverseBlock() {
  const { push } = useToast();
  return (
    <section className="relative w-full overflow-hidden rounded-20 bg-neutral-950 px-4 py-12 text-center text-white sm:px-8 sm:py-16 dark:bg-neutral-950">
      <div className="dot-grid absolute inset-0 opacity-[0.07]" aria-hidden />
      <div className="relative mx-auto max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-paragraph-xs font-medium text-neutral-200 backdrop-blur-md ring-1 ring-white/15">
          <FeaturedIcon icon={<RiShieldCheckLine size={14} />} size="xs" variant="gradient" tone="accent" />
          <span>Unseen Next Season</span>
          <span className="h-3 w-px bg-white/20" />
          <span className="text-accent-300">v2.4 Released <RiArrowRightLine size={12} className="inline" /></span>
        </div>
        <h1 className="mt-6 text-title-h3 text-white sm:text-title-h1">
          The design system engineered for <span className="bg-gradient-to-r from-accent-300 via-accent-200 to-white bg-clip-text text-transparent">speed and depth</span>.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-paragraph-md text-neutral-400 sm:text-paragraph-lg">
          High-contrast accessible surfaces, responsive mobile preview wrappers, and production-ready component blueprints.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <FancyButton size="lg" onClick={() => push({ title: "Start Building", description: "Opening installation guide.", tone: "accent" })}>
            Start building free <RiArrowRightLine size={18} />
          </FancyButton>
          <Button size="lg" variant="ghost" tone="default" className="text-white hover:bg-white/10 hover:text-white" onClick={() => push({ title: "Preview Showcases", description: "Opening showcase templates.", tone: "default" })}>
            Inspect showcases
          </Button>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-8 sm:grid-cols-4 text-left">
          {[
            { metric: "60+", label: "Primitives" },
            { metric: "100%", label: "TypeScript" },
            { metric: "< 15kb", label: "Core bundle" },
            { metric: "4.9/5", label: "Developer rating" },
          ].map((m) => (
            <div key={m.label} className="rounded-10 bg-white/[0.04] p-3 ring-1 ring-white/10">
              <p className="text-title-h5 font-medium tabular-nums text-white">{m.metric}</p>
              <p className="text-paragraph-xs text-neutral-400">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------- Hero ---------------------------------- */

export function HeroBlock() {
  return <HeroLitBlock />;
}

/* ------------------------ Brands & Social Proof ---------------------------- */

export function LogosBlock() {
  const wordmarks = [
    { name: "Northwind", weight: "text-label-lg" },
    { name: "Halcyon", weight: "text-label-lg" },
    { name: "Ridgeline", weight: "text-label-lg" },
    { name: "Aurora", weight: "text-label-lg" },
    { name: "Polaris", weight: "text-label-lg" },
    { name: "Meridian", weight: "text-label-lg" },
  ];

  return (
    <section className="w-full border-y border-separator py-9">
      <p className="text-center text-subheading-xs uppercase text-subtle">Powering interfaces at</p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
        {wordmarks.map((w) => (
          <span key={w.name} className={cn("tracking-tight text-subtle transition-colors hover:text-muted", w.weight)}>{w.name}</span>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------- Features -------------------------------- */

export function FeaturesBlock() {
  const features = [
    { icon: RiPaletteLine, title: "Brand your system", description: "One accent hue and chroma regenerate the full ramp and every semantic alias." },
    { icon: RiShieldCheckLine, title: "Keyboard first", description: "Focus traps, roving tab stops and double rings — accessibility from the first render." },
    { icon: RiRocketLine, title: "Patterns, not pieces", description: "Auth, onboarding, tables and settings ship as composed examples you can inspect." },
    { icon: RiTeamLine, title: "For real teams", description: "Tokens, props and naming stay consistent from Button to Notification Feed." },
    { icon: RiSparkling2Line, title: "Live documentation", description: "Edit the examples in place. The preview renders the actual local components." },
    { icon: RiGlobalLine, title: "Light & dark, one graph", description: "A single token layer drives both themes — no duplicated component styles." },
  ];

  return (
    <section className="w-full py-12">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-subheading-xs uppercase text-subtle">Why Unseen</p>
        <h2 className="mt-3 text-title-h4 text-foreground">Everything an interface needs.<br />Nothing it has to fight.</h2>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <Card key={f.title} className="group border-glow p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
            <FeaturedIcon icon={<f.icon size={20} />} tone="accent" variant="soft" size="md" />
            <h3 className="mt-4 text-label-md text-foreground">{f.title}</h3>
            <p className="mt-1.5 text-paragraph-sm text-muted">{f.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ Bento Features ----------------------------- */

export function FeaturesBentoBlock() {
  const [accent, setAccent] = useState("violet");
  return (
    <section className="w-full py-12">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-subheading-xs uppercase text-subtle">Bento Showcase</p>
        <h2 className="mt-3 text-title-h4 text-foreground">Engineered for depth.<br />Built for composition.</h2>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Large Bento Card 1: Token ramp */}
        <Card className="border-glow p-6 sm:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <FeaturedIcon icon={<RiPaletteLine size={20} />} tone="accent" variant="gradient" size="md" />
              <Chip size="sm" tone="accent" variant="soft">Token-first</Chip>
            </div>
            <h3 className="mt-4 text-label-lg text-foreground">OKLCH Brand Engine</h3>
            <p className="mt-1.5 max-w-md text-paragraph-sm text-muted">
              Dynamically derived ramps preserve perceptual lightness and contrast ratios across both light and dark modes.
            </p>
          </div>

          <div className="mt-6 rounded-10 bg-surface-secondary p-4 ring-1 ring-border">
            <div className="flex items-center justify-between gap-2">
              <span className="text-label-xs text-foreground">Active Brand Ramp</span>
              <div className="flex gap-1.5">
                {["violet", "sky", "emerald", "amber", "rose"].map((c) => (
                  <button
                    key={c}
                    type="button"
                    aria-label={`Select ${c} theme`}
                    onClick={() => setAccent(c)}
                    className={cn(
                      "h-5 w-5 rounded-full ring-1 transition-transform",
                      accent === c ? "scale-110 ring-foreground shadow-xs" : "ring-border hover:scale-105"
                    )}
                    style={{
                      background: c === "violet" ? "var(--accent)" : c === "sky" ? "var(--info)" : c === "emerald" ? "var(--success)" : c === "amber" ? "var(--warning)" : "var(--danger)"
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="mt-3 grid grid-cols-5 gap-1.5">
              {[100, 300, 500, 700, 900].map((step) => (
                <div key={step} className="h-6 rounded-md bg-accent-soft ring-1 ring-accent/20 flex items-center justify-center">
                  <span className="text-[9px] font-mono font-medium text-accent-soft-foreground">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Bento Card 2: Performance & Reliability */}
        <Card className="border-glow p-6 flex flex-col justify-between">
          <div>
            <FeaturedIcon icon={<RiRocketLine size={20} />} tone="success" variant="soft" size="md" />
            <h3 className="mt-4 text-label-md text-foreground">99.99% Availability</h3>
            <p className="mt-1.5 text-paragraph-sm text-muted">
              Zero client runtime overhead. Static single-file tree-shakeable exports.
            </p>
          </div>
          <div className="mt-6 flex items-center justify-center gap-4 rounded-10 bg-surface-secondary p-4 ring-1 ring-border">
            <CircularProgress value={98} size={64} stroke={6} />
            <div>
              <p className="text-label-sm tabular-nums text-foreground">0.12ms</p>
              <p className="text-paragraph-xs text-subtle">Average render</p>
            </div>
          </div>
        </Card>

        {/* Bento Card 3: Keyboard Navigation */}
        <Card className="border-glow p-6 flex flex-col justify-between">
          <div>
            <FeaturedIcon icon={<RiShieldCheckLine size={20} />} tone="default" variant="soft" size="md" />
            <h3 className="mt-4 text-label-md text-foreground">Accessible Shortcuts</h3>
            <p className="mt-1.5 text-paragraph-sm text-muted">
              Focus rings, roving tab indices, and ARIA compliant roles baked into every primitive.
            </p>
          </div>
          <div className="mt-6 space-y-2 rounded-10 bg-surface-secondary p-3.5 ring-1 ring-border">
            <div className="flex items-center justify-between text-paragraph-xs">
              <span className="text-muted">Global Search</span>
              <Kbd>⌘K</Kbd>
            </div>
            <div className="flex items-center justify-between text-paragraph-xs">
              <span className="text-muted">Quick Action</span>
              <Kbd>⌘↵</Kbd>
            </div>
          </div>
        </Card>

        {/* Large Bento Card 4: Source Included */}
        <Card className="border-glow p-6 sm:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <FeaturedIcon icon={<RiTerminalLine size={20} />} tone="accent" variant="soft" size="md" />
              <Chip size="sm" tone="default" variant="outline">Copy & Paste</Chip>
            </div>
            <h3 className="mt-4 text-label-lg text-foreground">Source-First Architecture</h3>
            <p className="mt-1.5 max-w-md text-paragraph-sm text-muted">
              No black-box dependencies. Inspect the exact React and Tailwind components and customize them directly in your project.
            </p>
          </div>
          <div className="mt-6">
            <Snippet className="w-full text-paragraph-xs">
              npx aperture-ui add button card data-table
            </Snippet>
          </div>
        </Card>
      </div>
    </section>
  );
}

/* ------------------------------ Stats & Metrics ---------------------------- */

export function StatsBandBlock() {
  const metrics = [
    { value: "76", label: "Components documented" },
    { value: "94", label: "Routes verified" },
    { value: "0", label: "Vulnerabilities" },
    { value: "100%", label: "Free during beta" },
  ];

  return (
    <section className="w-full rounded-20 bg-surface-secondary py-10 ring-1 ring-border">
      <div className="grid grid-cols-2 gap-8 px-8 text-center lg:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label}>
            <p className="text-title-h2 tabular-nums text-foreground">{m.value}</p>
            <p className="mt-1 text-paragraph-sm text-muted">{m.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------- Testimonials ----------------------------- */

export function TestimonialsBlock() {
  const quotes = [
    { name: "Sophia Williams", role: "Product Designer · Halcyon", quote: "The first system where the components actually agree with the tokens. We rebuilt our dashboard in a weekend." },
    { name: "James Brown", role: "Frontend Lead · Northwind", quote: "Live, editable examples changed how our team onboards. You read the source, you edit it, you see it render." },
    { name: "Lena Müller", role: "Design Ops · Ridgeline", quote: "The token graph is what sold us. One accent later our whole product felt like ours again." },
  ];

  return (
    <section className="w-full py-12">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-subheading-xs uppercase text-subtle">What teams say</p>
        <h2 className="mt-3 text-title-h4 text-foreground">Consistency people notice.</h2>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {quotes.map((q) => (
          <Card key={q.name} className="flex flex-col p-6">
            <span className="flex items-center gap-1 text-warning">{Array.from({ length: 5 }).map((_, i) => <RiStarFill key={i} size={14} className="fill-current" />)}</span>
            <p className="mt-4 flex-1 text-paragraph-sm text-foreground">“{q.quote}”</p>
            <div className="mt-6 flex items-center gap-3 border-t border-separator pt-4">
              <Avatar name={q.name} size="sm" tone="accent" />
              <div className="min-w-0">
                <p className="truncate text-label-sm text-foreground">{q.name}</p>
                <p className="truncate text-paragraph-xs text-subtle">{q.role}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------ CTA ----------------------------------- */

export function CtaBlock() {
  const { push } = useToast();
  return (
    <section className="relative w-full overflow-hidden rounded-20 bg-neutral-950 px-8 py-14 text-center dark:bg-neutral-100">
      <div className="dot-grid absolute inset-0 opacity-[0.06] dark:opacity-[0.08]" aria-hidden />
      <div className="relative mx-auto max-w-xl">
        <h2 className="text-title-h3 text-white dark:text-neutral-950">Start building with<br />a system that agrees.</h2>
        <p className="mx-auto mt-4 max-w-md text-paragraph-md text-neutral-300 dark:text-neutral-700">All components and blocks are unlocked during the public beta. No checkout, no account.</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <FancyButton size="lg" onClick={() => push({ title: "Get started", description: "Opening the installation guide.", tone: "accent" })}>Get started free <RiArrowRightLine size={18} /></FancyButton>
          <Button size="lg" variant="ghost" tone="default" className="text-white hover:bg-white/10 hover:text-white dark:text-neutral-950 dark:hover:bg-neutral-950/10" onClick={() => push({ title: "Talk to the team", description: "Community links are not connected in the preview.", tone: "default" })}>Ask the community</Button>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-paragraph-xs text-neutral-300 dark:text-neutral-700">
          {["No credit card required", "Source included", "Light & dark themes"].map((t) => (
            <span key={t} className="flex items-center gap-1.5"><RiCheckLine size={14} />{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- How It Works ------------------------------ */

export function HowItWorksBlock() {
  const [step, setStep] = useState(1);
  const steps = [
    {
      num: 1,
      title: "Configure Token Layer",
      desc: "Define your OKLCH brand hue, radius scale, and light/dark theme variables in pure CSS.",
      code: ":root { --accent-h: 265; --radius-scale: 1; }",
      icon: <RiPaletteLine size={18} />,
    },
    {
      num: 2,
      title: "Copy TSX Primitives",
      desc: "Zero heavy npm packages to pin. Drop accessible React 19 primitives directly into your project.",
      code: "import { Button, Modal, Card } from '@/ui';",
      icon: <RiCommandLine size={18} />,
    },
    {
      num: 3,
      title: "Compose & Ship Fast",
      desc: "Assemble complete SaaS dashboards, settings pages, and billing flows with coherent visual tokens.",
      code: "<AnalyticsDashboard workspace='Acme' />",
      icon: <RiRocketLine size={18} />,
    },
  ];

  return (
    <section className="w-full py-10 space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-subheading-xs uppercase text-accent font-medium tracking-wider">// 3 Simple Steps</p>
        <h2 className="mt-2 text-title-h3 font-medium text-foreground">How Unseen Works</h2>
        <p className="mt-2 text-paragraph-sm text-muted">From zero tokens to shipping production SaaS in minutes.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {steps.map((s) => (
          <Card
            key={s.num}
            elevation={step === s.num ? 3 : 1}
            onClick={() => setStep(s.num)}
            className={cn(
              "cursor-pointer p-6 transition-all duration-200 text-left border-glow",
              step === s.num ? "ring-2 ring-accent" : "hover:ring-border-strong"
            )}
          >
            <div className="flex items-center justify-between">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft font-mono text-label-xs font-medium text-accent">
                0{s.num}
              </span>
              <FeaturedIcon icon={s.icon} size="xs" tone={step === s.num ? "accent" : "default"} />
            </div>
            <h3 className="mt-4 text-label-md font-medium text-foreground">{s.title}</h3>
            <p className="mt-1 text-paragraph-xs text-muted leading-relaxed">{s.desc}</p>
            <div className="mt-4 rounded-8 bg-neutral-950 p-2.5 font-mono text-[11px] text-neutral-300">
              <code>{s.code}</code>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------- Integrations ------------------------------ */

export function IntegrationsBlock() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { push } = useToast();

  const integrations = [
    { name: "GitHub", category: "devtools", desc: "Automate pull request previews and CI checks.", connected: true },
    { name: "Stripe", category: "payments", desc: "Sync subscriptions, invoices, and payment webhooks.", connected: true },
    { name: "Slack", category: "messaging", desc: "Real-time alerts for customer churn and revenue milestones.", connected: false },
    { name: "Linear", category: "devtools", desc: "Two-way issue tracking directly from UI exceptions.", connected: true },
    { name: "Figma", category: "design", desc: "Inspect design tokens and component variable specs.", connected: false },
    { name: "Vercel", category: "cloud", desc: "Instant edge deployment and preview URL generator.", connected: true },
  ];

  const filtered = integrations.filter((i) => activeCategory === "all" || i.category === activeCategory);

  return (
    <section className="w-full py-10 space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-subheading-xs uppercase text-accent font-medium tracking-wider">// Ecosystem & Connectors</p>
          <h2 className="mt-2 text-title-h3 font-medium text-foreground">Third-Party Integrations</h2>
          <p className="mt-1 text-paragraph-sm text-muted">Connect your design system with your engineering stack seamlessly.</p>
        </div>

        <div className="inline-flex rounded-10 bg-surface-secondary p-1 ring-1 ring-border shadow-2xs">
          {(["all", "devtools", "payments", "messaging"] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-7 px-3 py-1 text-paragraph-xs capitalize transition-all",
                activeCategory === cat ? "bg-surface text-foreground font-medium shadow-xs" : "text-muted hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <Card key={item.name} elevation={2} className="p-5 space-y-4 hover:ring-border-strong transition">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-10 bg-surface-secondary ring-1 ring-border text-foreground font-medium">
                  {item.name[0]}
                </div>
                <div>
                  <h4 className="text-label-sm font-medium text-foreground">{item.name}</h4>
                  <span className="text-[10px] uppercase tracking-wider text-subtle font-medium">{item.category}</span>
                </div>
              </div>
              <Chip size="sm" tone={item.connected ? "success" : "default"} variant="soft" dot>
                {item.connected ? "Connected" : "Available"}
              </Chip>
            </div>
            <p className="text-paragraph-xs text-muted leading-relaxed">{item.desc}</p>
            <div className="flex items-center justify-between border-t border-separator pt-3">
              <button
                type="button"
                onClick={() => push({ title: `${item.name} Config`, description: `Opening settings for ${item.name}...`, tone: "accent" })}
                className="text-paragraph-xs font-medium text-accent hover:underline inline-flex items-center gap-1"
              >
                Configure <RiArrowRightLine size={12} />
              </button>
              <Switch checked={item.connected} onChange={() => {}} size="sm" aria-label={`Connect ${item.name}`} />
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------- Newsletter -------------------------------- */

export function NewsletterBlock() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { push } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    push({ title: "Subscribed Successfully", description: "You are now receiving weekly component updates.", tone: "success" });
  };

  return (
    <section className="surface-lit relative w-full overflow-hidden rounded-20 bg-surface p-8 text-center ring-1 ring-border sm:p-12">
      <div className="mx-auto max-w-xl space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-paragraph-xs font-medium text-accent-soft-foreground">
          <RiMailLine size={14} /> Weekly Design System Changelog
        </div>
        <h2 className="text-title-h3 font-medium text-foreground sm:text-title-h2">Stay Ahead of Component Craft</h2>
        <p className="text-paragraph-sm text-muted">Get new component teardowns, OKLCH token recipes, and accessible pattern guides delivered directly to your inbox.</p>

        <form onSubmit={handleSubscribe} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="colleague@acme.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={subscribed}
            className="flex-1 rounded-10 border border-border bg-field px-3.5 py-2 text-paragraph-sm text-foreground placeholder:text-subtle focus:border-accent focus:outline-none"
          />
          <FancyButton tone="accent" type="submit" disabled={subscribed || !email}>
            {subscribed ? "Subscribed!" : "Subscribe Free"}
          </FancyButton>
        </form>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[11px] text-subtle">
          <span className="flex items-center gap-1"><RiShieldCheckLine size={13} className="text-success" /> Zero spam</span>
          <span className="flex items-center gap-1"><RiCheckLine size={13} className="text-success" /> One-click unsubscribe</span>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------ FAQ ----------------------------------- */

export function FaqBlock() {
  return (
    <section className="w-full py-12">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-subheading-xs uppercase text-subtle">Questions, answered</p>
        <h2 className="mt-3 text-title-h4 text-foreground">Clear from the start.</h2>
      </div>
      <div className="mx-auto mt-10 max-w-2xl">
        <Accordion
          variant="flush"
          multiple
          defaultOpen={["free"]}
          items={[
            { key: "free", title: "Is everything really free during beta?", content: "Yes. Every component, pattern and block in this build is unlocked. There is no checkout, no credit card, and no account wall." },
            { key: "source", title: "Can I use the component source?", content: "The Source tabs show the real local implementations. Start with the installation guide, copy the component and its supporting files, and adapt them to your project." },
            { key: "stack", title: "What stack is this built for?", content: "This preview runs React 19, TypeScript and Tailwind CSS v4. CSS variables power the themes; Vue and Svelte adapters are not included." },
            { key: "figma", title: "Is there a Figma library?", content: "A downloadable Figma library is not part of this preview. The live foundations pages are the current reference for color, spacing, type and shape." },
            { key: "production", title: "Is the beta production certified?", content: "Not yet. Evaluate keyboard support, responsive behavior and color contrast in your own application. The beta is for testing, not a claim of accessibility certification." },
          ]}
        />
      </div>
    </section>
  );
}

