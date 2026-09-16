import { Accordion } from "../ui/Navigation";
import { Button, FancyButton } from "../ui/Button";
import { Avatar, AvatarGroup, Card, Chip } from "../ui/Display";
import { useToast } from "../ui/Overlay";
import { cn } from "../utils/cn";
import { RiArrowRightLine, RiCheckLine, RiGlobalLine, RiPaletteLine, RiRocketLine, RiShieldCheckLine, RiSparkling2Line, RiStarFill, RiTeamLine } from "@remixicon/react";

/* ----------------------------------- Hero ---------------------------------- */

export function HeroBlock() {
  const { push } = useToast();
  return (
    <section className="flex w-full flex-col items-center px-2 py-10 text-center sm:py-14">
      <a href="#/pricing" className="group inline-flex items-center gap-2 rounded-full bg-surface-secondary py-1 pl-1 pr-3 ring-1 ring-border transition hover:ring-border-strong" onClick={(e) => e.preventDefault()}>
        <Chip size="sm" tone="accent" variant="soft" dot>Public beta</Chip>
        <span className="text-paragraph-xs text-muted group-hover:text-foreground">Every detail. One system. <RiArrowRightLine size={12} className="inline" /></span>
      </a>
      <h1 className="mt-6 max-w-3xl text-title-h2 text-foreground sm:text-title-h1">Build products people<br />describe as <span className="text-gradient">considered</span>.</h1>
      <p className="mt-5 max-w-xl text-paragraph-lg text-muted">Aperture gives your team thoughtful React components, patterns and foundations that agree with each other — so every surface ships with one voice.</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <FancyButton size="lg" onClick={() => push({ title: "Explore components", description: "Opening the component library.", tone: "accent" })}>Explore components <RiArrowRightLine size={18} /></FancyButton>
        <Button size="lg" variant="outline" tone="default" onClick={() => push({ title: "Foundations", description: "Opening the token reference.", tone: "default" })}>Browse foundations</Button>
      </div>
      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-5">
        <AvatarGroup items={[{ name: "Sophia W" }, { name: "James B" }, { name: "Lena M" }, { name: "Arthur T" }, { name: "Emma W" }]} size="sm" max={4} />
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <span className="flex items-center gap-1 text-warning">{Array.from({ length: 5 }).map((_, i) => <RiStarFill key={i} size={14} className="fill-current" />)}</span>
          <span className="text-paragraph-xs text-muted">Loved by <strong className="font-medium text-foreground">4,300+</strong> teams building in public</span>
        </div>
      </div>
    </section>
  );
}

/* ------------------------ Brands & Social Proof ---------------------------- */

const WORDMARKS = [
  { name: "Northwind", weight: "text-label-lg" },
  { name: "Halcyon", weight: "text-label-lg" },
  { name: "Ridgeline", weight: "text-label-lg" },
  { name: "Aurora", weight: "text-label-lg" },
  { name: "Polaris", weight: "text-label-lg" },
  { name: "Meridian", weight: "text-label-lg" },
];

export function LogosBlock() {
  return (
    <section className="w-full border-y border-separator py-9">
      <p className="text-center text-subheading-xs uppercase text-subtle">Powering interfaces at</p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
        {WORDMARKS.map((w) => (
          <span key={w.name} className={cn("tracking-tight text-subtle transition-colors hover:text-muted", w.weight)}>{w.name}</span>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------- Features -------------------------------- */

const FEATURES = [
  { icon: RiPaletteLine, title: "Brand your system", description: "One accent hue and chroma regenerate the full ramp and every semantic alias." },
  { icon: RiShieldCheckLine, title: "Keyboard first", description: "Focus traps, roving tab stops and double rings — accessibility from the first render." },
  { icon: RiRocketLine, title: "Patterns, not pieces", description: "Auth, onboarding, tables and settings ship as composed examples you can inspect." },
  { icon: RiTeamLine, title: "For real teams", description: "Tokens, props and naming stay consistent from Button to Notification Feed." },
  { icon: RiSparkling2Line, title: "Live documentation", description: "Edit the examples in place. The preview renders the actual local components." },
  { icon: RiGlobalLine, title: "Light & dark, one graph", description: "A single token layer drives both themes — no duplicated component styles." },
];

export function FeaturesBlock() {
  return (
    <section className="w-full py-12">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-subheading-xs uppercase text-subtle">Why Aperture</p>
        <h2 className="mt-3 text-title-h4 text-foreground">Everything a interface needs.<br />Nothing it has to fight.</h2>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <Card key={f.title} className="p-6 transition-all hover:-translate-y-0.5 hover:shadow-md hover:ring-border-strong">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent ring-1 ring-accent/15">
              <f.icon size={20} />
            </span>
            <h3 className="mt-4 text-label-md text-foreground">{f.title}</h3>
            <p className="mt-1.5 text-paragraph-sm text-muted">{f.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ Stats & Metrics ---------------------------- */

const METRICS = [
  { value: "71", label: "Components documented" },
  { value: "88", label: "Routes that render" },
  { value: "0", label: "Vulnerabilities" },
  { value: "100%", label: "Free during beta" },
];

export function StatsBandBlock() {
  return (
    <section className="w-full rounded-20 bg-surface-secondary py-10 ring-1 ring-border">
      <div className="grid grid-cols-2 gap-8 px-8 text-center lg:grid-cols-4">
        {METRICS.map((m) => (
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

const QUOTES = [
  { name: "Sophia Williams", role: "Product Designer · Halcyon", quote: "The first system where the components actually agree with the tokens. We rebuilt our dashboard in a weekend." },
  { name: "James Brown", role: "Frontend Lead · Northwind", quote: "Live, editable examples changed how our team onboards. You read the source, you edit it, you see it render." },
  { name: "Lena Müller", role: "Design Ops · Ridgeline", quote: "The token graph is what sold us. One accent later our whole product felt like ours again." },
];

export function TestimonialsBlock() {
  return (
    <section className="w-full py-12">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-subheading-xs uppercase text-subtle">What teams say</p>
        <h2 className="mt-3 text-title-h4 text-foreground">Consistency people notice.</h2>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {QUOTES.map((q) => (
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
