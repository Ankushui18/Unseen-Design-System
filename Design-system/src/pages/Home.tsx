import { ArrowRight, Blocks, BookOpen, Check, Contrast, Feather, Gauge, Layers, Moon, Palette, PenTool as Figma, ShieldCheck, Star } from "lucide-react";
import { Button, FancyButton } from "../ui/Button";
import { Avatar, Chip, Snippet } from "../ui/Display";
import { Slider } from "../ui/Form";
import { AuthCardBlock, BLOCKS, CommandMenuBlock, NotificationBlock, StatsBlock } from "../blocks";
import { ScaledFrame } from "../docs/ScaledFrame";
import { BRAND_MARKS } from "../docs/BrandMarks";
import { GithubIcon, Logo } from "../docs/Shell";
import { NewsletterSignup, FAQBlock } from "./Marketing";
import { ACCENT_PRESETS, RADIUS_PRESETS, useTheme } from "../lib/theme";
import { cn } from "../utils/cn";

const FEATURES = [
  { icon: Palette, title: "Token-first architecture", body: "Change two CSS variables and every component, block and template updates at once. No drift, no find-and-replace." },
  { icon: Contrast, title: "OKLCH color engine", body: "Pick a brand hue, get a full accessible palette. Contrast stays WCAG AA in light and dark without hand-tuning." },
  { icon: Moon, title: "Dark mode, natively", body: "Every semantic token has a paired dark value. No class soup, no duplicated styles, no flash of wrong theme." },
  { icon: ShieldCheck, title: "Accessible by default", body: "WAI-ARIA patterns, full keyboard support, double focus rings and reduced-motion handling out of the box." },
  { icon: Gauge, title: "Zero-runtime styling", body: "Styling compiles at build time, so your app renders fast and never re-calculates styles at runtime." },
  { icon: Figma, title: "Aligned with Figma", body: "Variables, styles and components map 1:1 to the code library, so design and engineering never diverge." },
];

export function SectionLabel({ children }: { children: string }) {
  return <p className="text-subheading-xs uppercase text-accent">{children}</p>;
}

export default function Home({ navigate }: { navigate: (to: string) => void }) {
  const { accentH, radiusScale, set } = useTheme();

  return (
    <div className="relative">
      {/* --------------------------------- HERO -------------------------------- */}
      <section className="relative overflow-hidden">
        <div className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
          style={{ background: "radial-gradient(50rem 24rem at 50% -6rem, var(--accent-soft), transparent 70%)" }}
        />

        <div className="relative mx-auto max-w-[1180px] px-4 pt-14 pb-8 sm:px-5 sm:pt-20 lg:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <button
              onClick={() => navigate("docs/changelog")}
              className="animate-slide-down mx-auto mb-8 inline-flex items-center gap-2 rounded-full bg-surface py-1 pr-3 pl-1 text-paragraph-xs text-muted shadow-xs ring-1 ring-border transition hover:ring-border-strong"
            >
              <span className="rounded-full bg-accent px-2 py-0.5 text-subheading-2xs uppercase text-accent-foreground">New</span>
              Aperture 3.2 — Theme Studio and 11 premium blocks
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            <h1 className="animate-slide-up text-title-h3 text-foreground text-balance sm:text-title-h2 lg:text-title-h1">
              Design and development,{" "}
              <span className="text-gradient">perfectly aligned.</span>
            </h1>

            <p className="animate-slide-up mx-auto mt-5 max-w-xl text-paragraph-md text-muted text-pretty sm:mt-6 sm:text-paragraph-lg">
              <strong className="font-semibold text-foreground">100% free public beta.</strong> 100+ components, 13 premium
              blocks and 7 sector templates — open with no signup, no paywall, no credit card. A token-driven design
              system for React and Tailwind, free while we build it in the open.
            </p>

            {/* Stack badges */}
            <div className="animate-slide-up mt-6 flex flex-wrap items-center justify-center gap-2">
              {[
                { label: "React 19", d: "M9.5 15.4a6 6 0 1 0-4.8-7.5M9 15.6a3 3 0 1 0-2.4-3.8" },
                { label: "Tailwind v4", d: "M4 10c1.5-3 3.5-4.5 6-4.5 3.7 0 4.3 2.7 6 2.7 1.2 0 2-.7 2.5-1.7" },
                { label: "TypeScript", d: "m8 4-5 16m18-16L16 20M13.5 4l-3 16" },
                { label: "RSC ready", d: "M12 3 4 7.5v9L12 21l8-4.5v-9Z" },
                { label: "WCAG 2.2 AA", d: "M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6Zm-3 9 2 2 4-4" },
              ].map((b) => (
                <span key={b.label} className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-paragraph-xs font-medium text-muted shadow-xs ring-1 ring-border">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d={b.d} />
                  </svg>
                  {b.label}
                </span>
              ))}
            </div>

            <div className="animate-slide-up mt-9 flex flex-wrap items-center justify-center gap-3">
              <FancyButton size="lg" onClick={() => navigate("docs/installation")} endContent={<ArrowRight />}>
                Get started — it's free
              </FancyButton>
              <Button size="lg" variant="outline" tone="default" onClick={() => navigate("components")} startContent={<Blocks />}>
                Browse components
              </Button>
            </div>

            <div className="mx-auto mt-8 max-w-md">
              <Snippet>npm install @aperture/react</Snippet>
            </div>
          </div>
        </div>

        {/* Live block bento */}
        <div className="relative mx-auto max-w-[1180px] px-4 pb-16 sm:px-5 sm:pb-20">
          <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
            <div className="animate-slide-up w-full min-w-0 [animation-delay:80ms]">
              <ScaledFrame designWidth={400} className="w-full" >
                <AuthCardBlock />
              </ScaledFrame>
            </div>
            <div className="animate-slide-up grid w-full min-w-0 gap-5 content-start [animation-delay:160ms]">
              <StatsBlock />
              <div className="flex w-full justify-center">
                <NotificationBlock />
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-paragraph-xs text-subtle">
            {["MIT licensed", "TypeScript native", "RSC compatible", "WCAG 2.2 AA"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-success" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------- LOGOS ------------------------------- */}
      <section className="border-y border-separator bg-surface-secondary/50 py-10">
        <p className="mb-7 text-center text-subheading-xs uppercase text-subtle">Early-access teams building with Aperture</p>
        <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex animate-marquee items-center gap-16 pr-16">
            {[...Array(2)].map((_, d) =>
              BRAND_MARKS.map((b) => (
                <span key={`${d}-${b.name}`} className="opacity-60 transition-opacity hover:opacity-100" aria-hidden={d === 1}>
                  {b.node}
                </span>
              )),
            )}
          </div>
        </div>
      </section>

      {/* ------------------------------ QUICK START ---------------------------- */}
      <section className="border-b border-separator bg-background">
        <div className="mx-auto max-w-[1180px] px-4 py-16 sm:px-5 sm:py-20">
          <div className="max-w-2xl">
            <SectionLabel>30-second setup</SectionLabel>
            <h2 className="mt-3 text-title-h5 text-foreground sm:text-title-h4">From install to first component in three steps</h2>
            <p className="mt-3 text-paragraph-md text-muted">No build plugin, no config file, no framework lock-in. Aperture is one package and one stylesheet.</p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {[
              { n: "01", title: "Install the package", body: "One dependency. React 18+ and Tailwind v4 are the only peers.", code: "npm install @aperture/react" },
              { n: "02", title: "Import the stylesheet", body: "The token layer and Tailwind bridge ship as one CSS file.", code: '@import "@aperture/react/styles.css";' },
              { n: "03", title: "Render a component", body: "Every component reads semantic tokens, so theming works immediately.", code: 'import { Button } from "@aperture/react";\n\n<Button tone="accent">Ship it</Button>' },
            ].map((s) => (
              <div key={s.n} className="flex flex-col rounded-20 bg-surface p-5 ring-1 ring-border shadow-xs">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft font-mono text-label-xs text-accent-soft-foreground">{s.n}</span>
                  <p className="text-label-md text-foreground">{s.title}</p>
                </div>
                <p className="mt-3 flex-1 text-paragraph-sm leading-[1.65] text-muted">{s.body}</p>
                <pre className="mt-4 ds-scroll overflow-x-auto rounded-xl bg-neutral-950 p-3.5 text-[12px] leading-[1.6] text-neutral-100 dark:bg-neutral-900"><code>{s.code}</code></pre>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <FancyButton onClick={() => navigate("docs/installation")} endContent={<ArrowRight />}>Full installation guide</FancyButton>
            <Button variant="outline" tone="default" onClick={() => navigate("components/button")}>See your first component</Button>
          </div>
        </div>
      </section>

      {/* -------------------------------- BLOCKS ------------------------------- */}
      <section className="mx-auto max-w-[1180px] px-4 py-16 sm:px-5 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <SectionLabel>Components & Blocks</SectionLabel>
            <h2 className="mt-3 text-title-h5 text-foreground sm:text-title-h4">Ready-made blocks for real product surfaces</h2>
            <p className="mt-3 text-paragraph-md text-muted">Pre-built compositions for authentication, dashboards, settings and marketing — all assembled from the same 100+ primitives.</p>
          </div>
          <Button variant="outline" tone="default" onClick={() => navigate("blocks")} endContent={<ArrowRight />}>
            View all blocks
          </Button>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BLOCKS.filter((b) => !["onboarding", "table", "pricing"].includes(b.key)).slice(0, 6).map((b) => (
            <button
              key={b.key}
              onClick={() => navigate("blocks")}
              className="group overflow-hidden rounded-20 bg-surface text-left ring-1 ring-border shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:ring-border-strong"
            >
              <div className="dot-grid relative flex h-64 items-start justify-center overflow-hidden bg-background-secondary/60">
                <ScaledFrame designWidth={b.width ?? 440} maxScale={0.72} className="pointer-events-none w-full px-4 pt-5">
                  {b.render()}
                </ScaledFrame>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface to-transparent" />
              </div>
              <div className="flex items-center justify-between border-t border-separator px-5 py-3.5">
                <div>
                  <p className="text-label-sm text-foreground">{b.title}</p>
                  <p className="text-paragraph-xs text-subtle">{b.category}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ------------------------------ THEME STRIP ---------------------------- */}
      <section className="border-y border-separator bg-surface-secondary/50">
        <div className="mx-auto grid max-w-[1180px] items-center gap-10 px-4 py-16 sm:px-5 sm:py-20 lg:grid-cols-2">
          <div>
            <SectionLabel>Theme Studio</SectionLabel>
            <h2 className="mt-3 text-title-h5 text-foreground sm:text-title-h4">Rebrand in two variables</h2>
            <p className="mt-3 text-paragraph-md text-muted">
              The accent ramp, soft tints, focus rings and dark-mode pairs are all derived from a hue and a chroma. Pick a preset or drag the slider — the whole page follows.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {ACCENT_PRESETS.map((p) => (
                <button
                  key={p.name}
                  onClick={() => set({ accentH: p.h, accentC: p.c })}
                  title={p.name}
                  className={cn("h-7 w-7 rounded-full ring-offset-2 ring-offset-background-secondary transition-transform hover:scale-110", Math.abs(accentH - p.h) < 2 && "ring-2 ring-foreground")}
                  style={{ background: `oklch(0.58 ${p.c} ${p.h})` }}
                />
              ))}
            </div>
            <div className="mt-6 max-w-sm">
              <Slider value={accentH} onChange={(h) => set({ accentH: h })} min={0} max={360} label="Hue" formatValue={(v) => `${v}°`} />
            </div>
            <div className="mt-6 inline-flex items-center rounded-10 bg-surface p-1 ring-1 ring-inset ring-border">
              {RADIUS_PRESETS.map((r) => (
                <button
                  key={r.name}
                  onClick={() => set({ radiusScale: r.value })}
                  className={cn("rounded-lg px-3 py-1.5 text-label-xs transition-all", radiusScale === r.value ? "bg-neutral-950 text-white shadow-fancy-neutral dark:bg-neutral-200 dark:text-neutral-950" : "text-muted hover:text-foreground")}
                >
                  {r.name}
                </button>
              ))}
            </div>
            <div className="mt-8">
              <Button variant="outline" tone="default" onClick={() => navigate("theme")} startContent={<Palette />}>Open Theme Studio</Button>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <CommandMenuBlock />
          </div>
        </div>
      </section>

      {/* ------------------------------- FEATURES ------------------------------ */}
      <section className="mx-auto max-w-[1180px] px-4 py-16 sm:px-5 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel>Why Aperture</SectionLabel>
          <h2 className="mt-3 text-title-h5 text-foreground sm:text-title-h4">Engineered for systems, not screenshots</h2>
          <p className="mt-3 text-paragraph-md text-muted">Most libraries give you components. Aperture gives you the contract underneath them.</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-20 bg-surface p-6 ring-1 ring-border shadow-xs">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-surface-secondary ring-1 ring-border">
                <f.icon className="h-5 w-5 text-foreground" />
              </span>
              <h3 className="mt-5 text-label-md text-foreground">{f.title}</h3>
              <p className="mt-2 text-paragraph-sm text-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ----------------------------- TESTIMONIALS ---------------------------- */}
      <section className="border-y border-separator bg-surface-secondary/50 py-16 sm:py-20">
        <div className="mx-auto max-w-[1180px] px-4 sm:px-5">
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>Early-access feedback</SectionLabel>
            <h2 className="mt-3 text-title-h5 text-foreground sm:text-title-h4">Built in the open, tested on real products</h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {[
              {
                quote: "We replaced three years of accumulated CSS in a fortnight. Designers ship tokens, engineers ship features, and nobody argues about hex codes anymore.",
                name: "Maya Chen", role: "Head of Design Engineering", company: "Corewave", tone: "accent" as const,
              },
              {
                quote: "The OKLCH ramp generator means our white-label customers each get a full brand palette from one hue — including a dark mode that actually passes contrast.",
                name: "Ivan Petrov", role: "Staff Engineer", company: "Vertex Labs", tone: "success" as const,
              },
              {
                quote: "The components look expensive out of the box, and the focus traps and ARIA patterns were already correct. Accessibility review went from a week to a day.",
                name: "Nadia Rahim", role: "Design Lead", company: "Sentinel", tone: "warning" as const,
              },
            ].map((t) => (
              <figure key={t.name} className="flex flex-col rounded-20 bg-surface p-6 ring-1 ring-border shadow-xs">
                <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-warning text-warning" />)}</div>
                <blockquote className="mt-4 flex-1 text-paragraph-sm leading-[1.7] text-foreground">“{t.quote}”</blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-separator pt-4">
                  <Avatar name={t.name} tone={t.tone} size="sm" />
                  <div>
                    <p className="text-label-sm text-foreground">{t.name}</p>
                    <p className="text-paragraph-xs text-subtle">{t.role}, {t.company}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------- CTA -------------------------------- */}
      <section className="relative overflow-hidden">
        <div className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_80%_at_50%_100%,black,transparent)]" />
        <div className="relative mx-auto max-w-2xl px-5 py-24 text-center">
          <Logo size={56} />
          <h2 className="mt-6 text-title-h4 text-foreground text-balance sm:text-title-h3">Start building free today</h2>
          <p className="mx-auto mt-4 max-w-lg text-paragraph-md text-muted">
            Install the package, paste one CSS file, and you have a themable, accessible, production-grade component layer.
            Everything is open during public beta — your feedback shapes what ships at launch.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <FancyButton size="lg" onClick={() => navigate("docs/installation")} endContent={<ArrowRight />}>Get started — it's free</FancyButton>
            <Button size="lg" variant="outline" tone="default" onClick={() => navigate("docs/introduction")} startContent={<BookOpen />}>Read the docs</Button>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-paragraph-xs text-subtle">
            <span className="inline-flex items-center gap-1.5"><GithubIcon className="h-4 w-4" />9,437 GitHub stars</span>
            <span className="inline-flex items-center gap-1.5"><Feather className="h-4 w-4" />14.2 kB core</span>
            <span className="inline-flex items-center gap-1.5"><Layers className="h-4 w-4" />318 tokens</span>
          </div>
        </div>
      </section>

      {/* -------------------------------- FAQ --------------------------------- */}
      <section className="mx-auto max-w-[1180px] px-4 py-16 sm:px-5 sm:py-20">
        <FAQBlock
          title="Questions developers actually ask"
          items={[
            { q: "Is it really free?", a: "The 42 core components are free forever under MIT. Everything else — the PRO components, premium blocks, sector templates and Theme Studio — is also free right now while we are in public preview. Launch pricing is published on the pricing page so there are no surprises." },
            { q: "How is this different from shadcn/ui?", a: "shadcn/ui copies component source into your repository, giving you ownership but no central theming. Aperture keeps components as a versioned package driven by semantic tokens, so rebranding is two CSS variables rather than a find-and-replace across your codebase." },
            { q: "Do I need Tailwind CSS?", a: "Yes — Tailwind CSS v4. Aperture exposes its tokens through the native theme bridge and ships its own CSS layer, so you do not need a tailwind.config.js or a plugin array." },
            { q: "Which frameworks are supported?", a: "React 18+ today, including React Server Components. Next.js App Router, Vite, Remix and Astro all work. Vue and Web Component adapters are on the public roadmap." },
            { q: "Is TypeScript required?", a: "No, but you get it either way. Every component ships full type definitions, so props, variants and token names autocomplete whether your project uses TypeScript or plain JavaScript." },
            { q: "Can I use it in client work?", a: "Yes. The free tier is MIT licensed with no attribution required. Unlimited commercial and client projects are explicitly permitted." },
          ]}
        />
      </section>

      {/* ----------------------------- NEWSLETTER ----------------------------- */}
      <NewsletterSignup />

      {/* -------------------------------- FOOTER ------------------------------- */}
      <footer className="border-t border-separator bg-surface-secondary/50">
        <div className="mx-auto max-w-[1180px] px-5 py-14">
          <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
            <div>
              <div className="flex items-center gap-2.5">
                <Logo size={28} />
                <span className="text-label-md text-foreground">Aperture</span>
              </div>
              <p className="mt-3 max-w-xs text-paragraph-sm text-muted">A token-driven design system for teams who care about consistency, accessibility and speed.</p>
              <div className="mt-5 flex items-center gap-2">
                <Button size="sm" variant="outline" tone="default" startContent={<GithubIcon className="h-4 w-4" />}>GitHub</Button>
                <Button size="sm" variant="outline" tone="default" startContent={<Figma />}>Figma kit</Button>
              </div>
            </div>
            {[
              { h: "Product", l: [["Components", "components"], ["Blocks", "blocks"], ["Templates", "templates"], ["Theme Studio", "theme"], ["Pricing", "pricing"]] },
              { h: "Resources", l: [["Introduction", "docs/introduction"], ["Installation", "docs/installation"], ["Principles", "docs/principles"], ["Roadmap", "docs/roadmap"], ["Changelog", "docs/changelog"]] },
              { h: "Foundations", l: [["Color", "foundations/color"], ["Typography", "foundations/typography"], ["Icons", "foundations/icons"], ["Accessibility", "foundations/accessibility"], ["Tokens", "foundations/tokens"]] },
            ].map((col) => (
              <div key={col.h}>
                <p className="mb-3 text-subheading-xs uppercase text-subtle">{col.h}</p>
                <ul className="space-y-2.5">
                  {col.l.map(([label, to]) => (
                    <li key={label}>
                      <button onClick={() => navigate(to)} className="text-paragraph-sm text-muted transition-colors hover:text-foreground">{label}</button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-separator pt-6 text-paragraph-xs text-subtle">
            <span>© {new Date().getFullYear()} Aperture Design System — MIT Licensed.</span>
            <span className="inline-flex items-center gap-2">
              <Chip size="sm" variant="outline">v3.2.0</Chip>
              Built with React 19 · Tailwind CSS v4 · OKLCH
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
