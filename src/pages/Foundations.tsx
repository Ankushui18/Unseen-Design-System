import { useMemo, useState } from "react";
import { Callout, Grid, PageHeader, PropsTable, Section, Showcase } from "../docs/Blocks";
import { CodeBlock } from "../docs/CodeBlock";
import { Button } from "../ui/Button";
import { Card, Chip, Code, Divider, Kbd, Snippet } from "../ui/Display";
import { Input, Slider, Switch } from "../ui/Form";
import { Table } from "../ui/Navigation";
import { useCopy } from "../lib/hooks";
import { useTheme } from "../lib/theme";
import { cn } from "../utils/cn";
import { RiAccessibilityLine, RiArrowRightSLine, RiAttachmentLine, RiBookmarkLine, RiCalendarLine, RiChat3Line, RiCheckLine, RiCloudLine, RiDeleteBinLine, RiDownloadLine, RiEyeLine, RiFileCopyLine, RiFilterLine, RiFlashlightLine, RiFolderLine, RiHeartLine, RiHome5Line, RiImageLine, RiLockLine, RiMailLine, RiNotification3Line, RiSearchLine, RiSettings3Line, RiShareLine, RiStackLine, RiStarLine, RiUserLine } from "@remixicon/react";

/* --------------------------------- shared --------------------------------- */

function Swatch({ token, className, height = "h-16", label }: { token: string; className: string; height?: string; label?: string }) {
  const { copied, copy } = useCopy();
  return (
    <button onClick={() => copy(`var(${token})`)} className="group text-left">
      <div className={cn("relative w-full rounded-lg border border-border transition-transform group-hover:scale-[1.02]", height, className)}>
        <span className="absolute top-1.5 right-1.5 rounded-md bg-background/70 p-1 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
          {copied ? <RiCheckLine className="h-3 w-3 text-success" /> : <RiFileCopyLine className="h-3 w-3 text-foreground" />}
        </span>
      </div>
      <p className="mt-1.5 text-paragraph-xs font-medium text-foreground">{label ?? token.replace(/^--/, "")}</p>
      <p className="font-mono text-[11px] text-subtle">{token}</p>
    </button>
  );
}

/* ---------------------------------- COLOR ---------------------------------- */

const SEMANTIC_SETS = [
  { name: "Accent", desc: "Brand identity, primary actions, focus and selection.", tokens: [["--accent", "bg-accent"], ["--accent-hover", "bg-accent-hover"], ["--accent-soft", "bg-accent-soft"], ["--accent-foreground", "bg-accent-foreground"]] },
  { name: "Default", desc: "Neutral backbone for non-emphasised controls.", tokens: [["--default", "bg-default"], ["--default-hover", "bg-default-hover"], ["--default-soft", "bg-default-soft"], ["--default-foreground", "bg-default-foreground"]] },
  { name: "Success", desc: "Confirmations, completed states, positive validation.", tokens: [["--success", "bg-success"], ["--success-hover", "bg-success-hover"], ["--success-soft", "bg-success-soft"], ["--success-foreground", "bg-success-foreground"]] },
  { name: "Warning", desc: "Caution and reversible risk that needs review.", tokens: [["--warning", "bg-warning"], ["--warning-hover", "bg-warning-hover"], ["--warning-soft", "bg-warning-soft"], ["--warning-foreground", "bg-warning-foreground"]] },
  { name: "Danger", desc: "Destructive, irreversible or critical states.", tokens: [["--danger", "bg-danger"], ["--danger-hover", "bg-danger-hover"], ["--danger-soft", "bg-danger-soft"], ["--danger-foreground", "bg-danger-foreground"]] },
] as const;

const RAMP = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

export function ColorPage() {
  const { accentH, accentC, set } = useTheme();
  return (
    <>
      <PageHeader
        eyebrow="Foundations"
        title="Color"
        description="Aperture's color system is built around semantic intent, not visual abundance. A small set of meaningful roles covers the majority of interface needs, and every value is generated in OKLCH so lightness stays perceptually even across hues."
        tags={["OKLCH", "Semantic", "Light & dark"]}
      />

      <Section title="The generator" description="The entire accent ramp derives from two numbers: a hue angle and a chroma ceiling. Change them and 11 steps, 4 semantic aliases and both color modes update at once.">
        <Showcase align="stretch">
          <div className="grid gap-6 md:grid-cols-[1fr_auto]">
            <div className="space-y-4">
              <Slider label="--accent-h (hue)" value={accentH} onChange={(v) => set({ accentH: v })} min={0} max={360} formatValue={(v) => `${v}°`} />
              <Slider label="--accent-c (chroma)" value={accentC} onChange={(v) => set({ accentC: v })} min={0.02} max={0.3} step={0.005} formatValue={(v) => v.toFixed(3)} />
            </div>
            <div className="flex items-center gap-3">
              <Button size="sm">Solid</Button>
              <Button size="sm" variant="soft">Soft</Button>
              <Button size="sm" variant="outline">Outline</Button>
            </div>
          </div>
          <div className="grid grid-cols-11 gap-1 pt-2">
            {RAMP.map((s) => (
              <div key={s} className="space-y-1">
                <div className="h-14 rounded-md border border-border" style={{ background: `var(--accent-${s})` }} />
                <p className="text-center font-mono text-[10px] text-subtle">{s}</p>
              </div>
            ))}
          </div>
        </Showcase>
        <CodeBlock
          filename="accent-ramp.css"
          code={`/* Every step shares one hue and scales chroma proportionally,
   which keeps hue-shift and muddiness out of the ramp. */
--accent-500: oklch(0.646 var(--accent-c) var(--accent-h));
--accent-600: oklch(0.567 calc(var(--accent-c) * 1.02) var(--accent-h));
--accent-700: oklch(0.490 calc(var(--accent-c) * 0.92) var(--accent-h));`}
        />
      </Section>

      <Section title="Semantic roles" description="Components never reference a numbered step. They consume roles, which is why a single override retheme's the whole system.">
        <div className="space-y-7">
          {SEMANTIC_SETS.map((s) => (
            <div key={s.name}>
              <div className="mb-2.5 flex items-baseline gap-3">
                <h3 className="text-label-md">{s.name}</h3>
                <p className="text-paragraph-xs text-muted">{s.desc}</p>
              </div>
              <Grid cols={4}>
                {s.tokens.map(([t, c]) => (
                  <Swatch key={t} token={t} className={c} />
                ))}
              </Grid>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Surfaces & structure" description="Elevation is communicated through layered surfaces and separators rather than heavy color shifts.">
        <Grid cols={4}>
          <Swatch token="--background" className="bg-background" />
          <Swatch token="--background-secondary" className="bg-background-secondary" />
          <Swatch token="--surface" className="bg-surface" />
          <Swatch token="--surface-secondary" className="bg-surface-secondary" />
          <Swatch token="--surface-tertiary" className="bg-surface-tertiary" />
          <Swatch token="--overlay" className="bg-overlay" />
          <Swatch token="--separator" className="bg-separator" />
          <Swatch token="--border" className="bg-border" />
        </Grid>
      </Section>

      <Section title="Content & fields" description="Foreground tokens are tuned for readability and must never be hard-coded at the component level.">
        <Grid cols={4}>
          <Swatch token="--foreground" className="bg-foreground" />
          <Swatch token="--muted" className="bg-muted" />
          <Swatch token="--subtle" className="bg-subtle" />
          <Swatch token="--link" className="bg-link" />
          <Swatch token="--field" className="bg-field" />
          <Swatch token="--field-hover" className="bg-field-hover" />
          <Swatch token="--field-focus" className="bg-field-focus" />
          <Swatch token="--field-placeholder" className="bg-field-placeholder" />
        </Grid>
      </Section>

      <Section title="Usage" description="Rules that keep a large product visually coherent.">
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-success/30 p-5">
            <p className="mb-3 flex items-center gap-2 text-label-sm text-success"><RiCheckLine className="h-4 w-4" />Do</p>
            <ul className="space-y-2 text-paragraph-sm text-muted">
              <li>Use <Code tone="success">--accent</Code> for one primary action per view.</li>
              <li>Pair every background token with its matching foreground token.</li>
              <li>Reach for soft variants when color carries status, not emphasis.</li>
              <li>Express elevation with surface layers plus a separator.</li>
            </ul>
          </Card>
          <Card className="border-danger/30 p-5">
            <p className="mb-3 flex items-center gap-2 text-label-sm text-danger">
              <span className="inline-block h-4 w-4 text-center leading-4">✕</span>Don't
            </p>
            <ul className="space-y-2 text-paragraph-sm text-muted">
              <li>Hard-code hex values or Tailwind palette colors in components.</li>
              <li>Use danger as decoration — it should always mean loss or error.</li>
              <li>Stack three accent-filled buttons in the same region.</li>
              <li>Rely on hue alone to convey state; add an icon or label.</li>
            </ul>
          </Card>
        </div>
        <Callout title="Check contrast in context">
          An OKLCH ramp is not an accessibility guarantee. Check each foreground and background pairing in both modes,
          especially after changing the brand hue. Body text should reach 4.5:1; large text and meaningful UI boundaries
          should reach 3:1.
        </Callout>
      </Section>
    </>
  );
}

/* -------------------------------- TYPOGRAPHY -------------------------------- */

const TYPE_SCALE = [
  { name: "Display", cls: "text-[3.5rem] leading-[1.02] tracking-[-0.045em] font-semibold", size: "56 / 57", use: "Marketing hero only" },
  { name: "Title 1", cls: "text-[2.25rem] leading-[1.1] tracking-[-0.035em] font-semibold", size: "36 / 40", use: "Page title" },
  { name: "Title 2", cls: "text-[1.75rem] leading-[1.15] tracking-[-0.03em] font-semibold", size: "28 / 32", use: "Section heading" },
  { name: "Title 3", cls: "text-[1.375rem] leading-[1.2] tracking-[-0.022em] font-semibold", size: "22 / 26", use: "Card / dialog title" },
  { name: "Headline", cls: "text-[1rem] leading-[1.4] tracking-[-0.01em] font-semibold", size: "16 / 22", use: "Emphasised body" },
  { name: "Body", cls: "text-[0.9375rem] leading-[1.65]", size: "15 / 25", use: "Default paragraph" },
  { name: "Callout", cls: "text-[0.875rem] leading-[1.6]", size: "14 / 22", use: "Secondary copy" },
  { name: "Caption", cls: "text-[0.75rem] leading-[1.45] text-muted", size: "12 / 17", use: "Metadata, helper text" },
  { name: "Mono", cls: "font-mono text-[0.8125rem] leading-[1.7]", size: "13 / 22", use: "Code, tokens, numerics" },
];

export function TypographyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Foundations"
        title="Typography"
        description="A nine-step type scale tuned for interface density. Inter handles UI and prose with optical sizing enabled; JetBrains Mono carries code and tabular data."
        tags={["Inter", "JetBrains Mono", "9 steps", "Fluid"]}
      />

      <Section title="Typefaces">
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <p className="text-subheading-xs uppercase text-subtle">Sans — Interface</p>
            <p className="mt-3 text-[2.5rem] leading-none font-medium tracking-[-0.02em]">Inter</p>
            <p className="mt-3 text-paragraph-sm text-muted">
              Variable weight 300–800, optical sizing 14–32. Contextual alternates enabled for a cleaner <Code>a</Code>,{" "}
              <Code>g</Code> and <Code>l</Code> at small sizes.
            </p>
            <Divider className="my-4" />
            <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-paragraph-md">
              {[["Light", "font-light"], ["Regular", "font-normal"], ["Medium", "font-medium"], ["Semibold", "font-semibold"], ["Bold", "font-bold"]].map(([l, c]) => (
                <span key={l} className={c}>{l}</span>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <p className="text-subheading-xs uppercase text-subtle">Mono — Code & data</p>
            <p className="mt-3 font-mono text-[2.5rem] leading-none font-medium tracking-[-0.02em]">JetBrains</p>
            <p className="mt-3 text-paragraph-sm text-muted">
              Tabular figures by default so numeric columns never jitter. Used for tokens, shortcuts, code blocks and
              metric readouts.
            </p>
            <Divider className="my-4" />
            <p className="font-mono text-paragraph-sm tabular-nums">0123456789 · {"{}"} [] () =&gt; !== ---</p>
          </Card>
        </div>
      </Section>

      <Section title="Type scale" description="Each step pairs a size with a line height and tracking value. Never mix a size from one step with the leading of another.">
        <div className="overflow-hidden rounded-2xl bg-surface ring-1 ring-border shadow-xs">
          {TYPE_SCALE.map((t, i) => (
            <div key={t.name} className={cn("flex flex-wrap items-baseline gap-x-6 gap-y-2 px-5 py-4", i > 0 && "border-t border-separator-secondary")}>
              <div className="w-24 shrink-0">
                <p className="text-paragraph-xs font-medium">{t.name}</p>
                <p className="font-mono text-[11px] text-subtle">{t.size}</p>
              </div>
              <p className={cn("min-w-0 flex-1 truncate", t.cls)}>Design with intent</p>
              <p className="hidden text-paragraph-xs text-subtle lg:block">{t.use}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Measure & rhythm" description="Line length is the single biggest lever on readability. Aperture caps prose at 68 characters and UI copy at 52.">
        <Showcase align="stretch" code={`<p className="max-w-[68ch] text-[0.9375rem] leading-[1.65]">
  Long-form documentation copy is capped at 68 characters…
</p>`}>
          <div className="space-y-5">
            <div>
              <p className="mb-1.5 text-subheading-xs uppercase text-subtle">Optimal — 68ch</p>
              <p className="max-w-[68ch] text-paragraph-md leading-[1.65] text-foreground">
                Typography is the voice of an interface. When the measure is right the eye returns to the next line
                without hunting, and dense documentation stops feeling dense.
              </p>
            </div>
            <div>
              <p className="mb-1.5 text-subheading-xs uppercase text-subtle">Too wide — 110ch</p>
              <p className="max-w-[110ch] text-paragraph-md leading-[1.65] text-muted">
                Typography is the voice of an interface. When the measure is right the eye returns to the next line without hunting, and dense documentation stops feeling dense once the rhythm settles in.
              </p>
            </div>
          </div>
        </Showcase>
      </Section>

      <Section title="Tokens">
        <CodeBlock
          filename="typography.css"
          code={`@theme inline {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  --text-display: 3.5rem;   --text-display--line-height: 1.02;
  --text-title-1: 2.25rem;  --text-title-1--line-height: 1.1;
  --text-body:    0.9375rem;--text-body--line-height: 1.65;
  --text-caption: 0.75rem;  --text-caption--line-height: 1.45;
}`}
        />
      </Section>
    </>
  );
}

/* --------------------------------- SPACING --------------------------------- */

const SPACE = [
  ["0.5", 2], ["1", 4], ["1.5", 6], ["2", 8], ["3", 12], ["4", 16], ["5", 20], ["6", 24], ["8", 32], ["10", 40], ["12", 48], ["16", 64], ["20", 80], ["24", 96],
] as const;

export function SpacingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Foundations"
        title="Spacing & Layout"
        description="A 4px base unit governs every gap, pad and offset in the system. Consistent spacing is what makes an interface feel engineered rather than assembled."
        tags={["4px base", "12-col grid", "6 breakpoints"]}
      />

      <Section title="Scale" description="Values below 8px are reserved for intra-component spacing. Anything arranging components starts at 8px.">
        <div className="overflow-hidden rounded-2xl bg-surface ring-1 ring-border shadow-xs">
          {SPACE.map(([name, px], i) => (
            <div key={name} className={cn("flex items-center gap-5 px-5 py-2.5", i > 0 && "border-t border-separator-secondary")}>
              <code className="w-16 font-mono text-paragraph-xs text-accent">{name}</code>
              <span className="w-14 font-mono text-paragraph-xs text-subtle">{px}px</span>
              <span className="h-4 rounded-sm bg-accent/75" style={{ width: px }} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Density" description="Component padding is derived from the scale, so switching density recalculates every control at once.">
        <Grid cols={3}>
          {[
            { t: "Compact", p: "px-2.5 py-1", h: "Data-dense tables, toolbars" },
            { t: "Default", p: "px-4 py-2.5", h: "Standard application UI" },
            { t: "Comfortable", p: "px-6 py-4", h: "Marketing, onboarding" },
          ].map((d) => (
            <Card key={d.t} className="p-4">
              <p className="text-label-sm">{d.t}</p>
              <p className="mt-0.5 mb-3 text-paragraph-xs text-muted">{d.h}</p>
              <span className={cn("inline-flex items-center rounded-lg bg-accent text-paragraph-sm font-medium text-accent-foreground", d.p)}>Button</span>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section title="Breakpoints" description="Mobile-first. Containers are centred with a fluid gutter that never drops below 16px.">
        <Table
          columns={[
            { key: "name", header: "Token", render: (r) => <code className="font-mono text-paragraph-xs text-accent">{r.name}</code> },
            { key: "min", header: "Min width", render: (r) => <span className="font-mono text-paragraph-xs">{r.min}</span> },
            { key: "container", header: "Container", render: (r) => <span className="font-mono text-paragraph-xs text-muted">{r.container}</span> },
            { key: "use", header: "Typical layout" },
          ]}
          rows={[
            { name: "base", min: "0px", container: "100%", use: "Single column, stacked nav" },
            { name: "sm", min: "640px", container: "640px", use: "Two column cards" },
            { name: "md", min: "768px", container: "768px", use: "Sidebar appears" },
            { name: "lg", min: "1024px", container: "1024px", use: "Docs shell, 3-up grids" },
            { name: "xl", min: "1280px", container: "1280px", use: "Table of contents rail" },
            { name: "2xl", min: "1536px", container: "1536px", use: "Max reading width" },
          ]}
        />
      </Section>

      <Section title="Grid" description="A 12-column grid with a 24px gutter underpins every page template.">
        <Showcase padded={false} align="stretch">
          <div className="grid grid-cols-12 gap-1.5 p-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-24 rounded-md bg-accent/12 ring-1 ring-accent/22 ring-inset" />
            ))}
          </div>
        </Showcase>
      </Section>
    </>
  );
}

/* ------------------------------- ELEVATION -------------------------------- */

export function ElevationPage() {
  const { radiusScale, set } = useTheme();
  return (
    <>
      <PageHeader
        eyebrow="Foundations"
        title="Radius & Elevation"
        description="Corner radius and shadow work together to express hierarchy. Both are driven by multipliers, so the whole product can shift from sharp and technical to soft and friendly with one value."
        tags={["5 elevations", "Radius multiplier", "Dark-aware"]}
      />

      <Section title="Radius" description="Every rounded utility multiplies its base value by --radius-scale. Drag the slider to see it propagate.">
        <Showcase align="stretch" controls={<div className="w-full max-w-sm"><Slider label="--radius-scale" value={radiusScale} onChange={(v) => set({ radiusScale: v })} min={0} max={2.5} step={0.25} formatValue={(v) => `${v}×`} /></div>}>
          <div className="grid w-full grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {([
              ["xs", "rounded-xs", 2],
              ["sm", "rounded-sm", 4],
              ["md", "rounded-md", 6],
              ["lg", "rounded-lg", 8],
              ["xl", "rounded-xl", 12],
              ["2xl", "rounded-2xl", 16],
            ] as const).map(([n, c, base]) => (
              <div key={n} className="flex flex-col items-center gap-2.5">
                <div className={cn("aspect-square w-full max-h-28 border-2 border-accent/35 bg-accent-soft shadow-xs", c)} />
                <div className="text-center">
                  <p className="font-mono text-label-xs text-foreground">{n}</p>
                  <p className="font-mono text-[10px] text-subtle">{Math.round(base * radiusScale)}px</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex w-full flex-wrap items-center gap-3 border-t border-separator pt-6">
            <Button size="sm">Button</Button>
            <Input size="sm" placeholder="Input" wrapperClassName="w-40" />
            <Chip tone="accent" size="md">Chip</Chip>
            <Card className="px-4 py-2.5 text-paragraph-sm">Card</Card>
          </div>
        </Showcase>
      </Section>

      <Section title="Elevation ladder" description="Five steps only. If you need a sixth, the layout is doing too much.">
        <Grid cols={3}>
          {[
            { n: "xs", c: "shadow-xs", u: "Resting cards, inputs, chips" },
            { n: "sm", c: "shadow-sm", u: "Raised cards, segmented controls" },
            { n: "md", c: "shadow-md", u: "Hovered cards, dropdowns" },
            { n: "lg", c: "shadow-lg", u: "Popovers, toasts, drawers" },
            { n: "xl", c: "shadow-xl", u: "Modals, command palette" },
            { n: "none", c: "", u: "Flush content on a surface" },
          ].map((s) => (
            <div key={s.n} className="rounded-2xl bg-surface-secondary p-5">
              <div className={cn("mb-3 flex h-20 items-center justify-center rounded-lg border border-border bg-surface font-mono text-paragraph-xs text-muted", s.c)}>{s.n}</div>
              <p className="text-paragraph-xs text-muted">{s.u}</p>
            </div>
          ))}
        </Grid>
        <Callout tone="warning" title="Dark mode uses opacity, not lightness">
          Shadows in dark themes are near-black with higher alpha; lifting surfaces by lightening them is handled by
          the <Code>--surface-*</Code> ladder instead. Never combine both or panels start to glow.
        </Callout>
      </Section>

      <Section title="Borders">
        <Showcase>
          {[["border", "1px — default"], ["border-2", "2px — emphasis"], ["border-[3px]", "3px — focus ring"]].map(([c, l]) => (
            <div key={c} className="text-center">
              <div className={cn("h-16 w-28 rounded-lg border-border bg-surface", c)} />
              <p className="mt-2 font-mono text-[11px] text-subtle">{l}</p>
            </div>
          ))}
        </Showcase>
      </Section>
    </>
  );
}

/* --------------------------------- MOTION --------------------------------- */

export function MotionPage() {
  const [play, setPlay] = useState(0);
  const EASES = [
    { n: "--ease-out-quint", v: "cubic-bezier(0.22, 1, 0.36, 1)", u: "Enter, expand, reveal" },
    { n: "--ease-spring", v: "cubic-bezier(0.34, 1.56, 0.64, 1)", u: "Toggles, checkmarks, pops" },
    { n: "--ease-in-out", v: "cubic-bezier(0.65, 0, 0.35, 1)", u: "Position changes, reorder" },
    { n: "linear", v: "linear", u: "Spinners, progress, marquee" },
  ];
  return (
    <>
      <PageHeader
        eyebrow="Foundations"
        title="Motion"
        description="Motion in Aperture is functional: it explains where an element came from and where it went. Durations are short, easings are asymmetric, and everything respects prefers-reduced-motion."
        tags={["4 easings", "5 durations", "Reduced motion"]}
      />

      <Section title="Duration" description="Larger surfaces travel further, so they get more time. Nothing exceeds 400ms.">
        <Table
          columns={[
            { key: "token", header: "Token", render: (r) => <code className="font-mono text-paragraph-xs text-accent">{r.token}</code> },
            { key: "ms", header: "Value", render: (r) => <span className="font-mono text-paragraph-xs">{r.ms}</span> },
            { key: "use", header: "Applied to" },
          ]}
          rows={[
            { token: "--duration-instant", ms: "75ms", use: "Color and opacity on hover" },
            { token: "--duration-fast", ms: "150ms", use: "Buttons, chips, switches" },
            { token: "--duration-base", ms: "220ms", use: "Popovers, tooltips, tabs" },
            { token: "--duration-slow", ms: "300ms", use: "Accordions, drawers" },
            { token: "--duration-slower", ms: "400ms", use: "Modals, page transitions" },
          ]}
        />
      </Section>

      <Section title="Easing" description="Press play to compare curves on the same distance.">
        <Showcase
          align="stretch"
          controls={<Button size="sm" variant="soft" onClick={() => setPlay((p) => p + 1)} startContent={<RiFlashlightLine className="h-3.5 w-3.5" />}>Replay</Button>}
        >
          <div className="w-full space-y-4">
            {EASES.map((e) => (
              <div key={e.n}>
                <div className="mb-1.5 flex items-baseline justify-between">
                  <code className="font-mono text-paragraph-xs text-accent">{e.n}</code>
                  <span className="text-[11px] text-subtle">{e.u}</span>
                </div>
                <div className="relative h-7 rounded-full bg-background-secondary">
                  <span
                    key={`${e.n}-${play}`}
                    className="absolute top-1 left-1 h-5 w-5 rounded-full bg-accent"
                    style={{ animation: `travel 1.1s ${e.v} both` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Showcase>
        <CodeBlock code={`@keyframes travel {
  from { transform: translateX(0); }
  to   { transform: translateX(calc(100cqw - 2.75rem)); }
}`} filename="motion.css" />
      </Section>

      <Section title="Reduced motion" description="Every animation in the library is wrapped so it degrades to an opacity change.">
        <CodeBlock
          filename="reduced-motion.css"
          code={`@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`}
        />
      </Section>
    </>
  );
}

/* --------------------------------- ICONS ---------------------------------- */

const ICONS = [RiSearchLine, RiSettings3Line, RiUserLine, RiNotification3Line, RiMailLine, RiHeartLine, RiStarLine, RiBookmarkLine, RiCalendarLine, RiCloudLine, RiDownloadLine, RiEyeLine, RiFilterLine, RiFolderLine, RiHome5Line, RiImageLine, RiStackLine, RiLockLine, RiChat3Line, RiAttachmentLine, RiShareLine, RiDeleteBinLine, RiFlashlightLine, RiFileCopyLine, RiCheckLine, RiArrowRightSLine, RiAccessibilityLine, RiNotification3Line];

export function IconsPage() {
  const [stroke, setStroke] = useState(1.75);
  const [size, setSize] = useState(20);
  return (
    <>
      <PageHeader
        eyebrow="Foundations"
        title="Iconography"
        description="A single icon family on a 24px grid with a consistent optical weight. Icons clarify an action — they never decorate it."
        tags={["24px grid", "1.75 stroke", "1,400+ glyphs"]}
      />

      <Section title="Anatomy" description="Icons are drawn on a 24×24 canvas with a 2px safe margin, rendered at 16, 20 or 24px.">
        <Showcase
          align="stretch"
          controls={
            <>
              <div className="w-44"><Slider label="Size" value={size} onChange={setSize} min={14} max={32} formatValue={(v) => `${v}px`} /></div>
              <div className="w-44"><Slider label="Stroke" value={stroke} onChange={setStroke} min={1} max={3} step={0.25} formatValue={(v) => `${v}`} /></div>
            </>
          }
        >
          <div className="grid w-full grid-cols-6 gap-3 sm:grid-cols-10 lg:grid-cols-14">
            {ICONS.map((Icon, i) => (
              <div key={i} className="flex aspect-square items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors hover:ring-border-strong hover:text-accent">
                <Icon size={size} strokeWidth={stroke} />
              </div>
            ))}
          </div>
        </Showcase>
      </Section>

      <Section title="Sizing pairs" description="Icon size is locked to the text size it sits beside.">
        <Table
          columns={[
            { key: "ctx", header: "Context" },
            { key: "text", header: "Text", render: (r) => <span className="font-mono text-paragraph-xs">{r.text}</span> },
            { key: "icon", header: "Icon", render: (r) => <span className="font-mono text-paragraph-xs text-accent">{r.icon}</span> },
            { key: "demo", header: "Preview", align: "right", render: (r) => <span className="inline-flex items-center gap-1.5" style={{ fontSize: r.fs }}><RiStarLine size={r.is} strokeWidth={1.75} />Label</span> },
          ]}
          rows={[
            { ctx: "Caption / chip", text: "12px", icon: "14px", fs: 12, is: 14, demo: "" },
            { ctx: "Small button", text: "13px", icon: "16px", fs: 13, is: 16, demo: "" },
            { ctx: "Body / default", text: "15px", icon: "18px", fs: 15, is: 18, demo: "" },
            { ctx: "Large button", text: "16px", icon: "20px", fs: 16, is: 20, demo: "" },
          ]}
        />
      </Section>

      <Section title="Usage">
        <Showcase code={`<Button startContent={<Download />}>Export</Button>
<Button iconOnly aria-label="Settings"><Settings /></Button>`}>
          <Button startContent={<RiDownloadLine className="h-4 w-4" />}>Export</Button>
          <Button variant="outline" tone="default" iconOnly aria-label="Settings"><RiSettings3Line className="h-4 w-4" /></Button>
          <Button variant="ghost" tone="default" startContent={<RiFilterLine className="h-4 w-4" />}>Filter</Button>
        </Showcase>
        <Callout tone="warning" title="Always label icon-only controls">
          An icon-only button must carry an <Code>aria-label</Code> and, ideally, a tooltip. Screen readers announce
          nothing otherwise.
        </Callout>
      </Section>
    </>
  );
}

/* ------------------------------ ACCESSIBILITY ------------------------------ */

export function AccessibilityPage() {
  const [reduced, setReduced] = useState(false);
  return (
    <>
      <PageHeader
        eyebrow="Foundations"
        title="Accessibility"
        description="Accessibility is a design and engineering responsibility. Use these contrast targets and interaction checks to evaluate the beta in the context of your product. This page is guidance, not a certification."
        tags={["WCAG 2.2 AA", "WAI-ARIA", "Keyboard first"]}
      />

      <Section title="Contrast targets" description="WCAG targets for evaluating your interface. These are requirements, not measured scores for this preview.">
        <Table
          columns={[
            { key: "pair", header: "Content type" },
            { key: "ratio", header: "Minimum", align: "right", render: (r) => <span className="font-mono text-paragraph-xs tabular-nums">{r.ratio}</span> },
            { key: "level", header: "Level", align: "right", render: (r) => <Chip size="sm" tone={r.level === "AAA" ? "success" : "accent"}>{r.level}</Chip> },
          ]}
          rows={[
            { pair: "Body text", ratio: "4.5:1", level: "AA" },
            { pair: "Large text", ratio: "3:1", level: "AA" },
            { pair: "Meaningful UI boundaries and graphics", ratio: "3:1", level: "AA" },
            { pair: "Enhanced body text contrast", ratio: "7:1", level: "AAA" },
          ]}
        />
      </Section>

      <Section title="Focus" description="A 2px accent outline with a 2px offset appears only for keyboard users via :focus-visible. Tab through the controls below.">
        <Showcase>
          <Button>Focusable</Button>
          <Button variant="outline" tone="default">Outline</Button>
          <Input placeholder="Text field" wrapperClassName="w-56" />
          <Switch checked={reduced} onChange={setReduced} label="Reduced motion" />
        </Showcase>
      </Section>

      <Section title="Keyboard model" description="Shared interaction contracts across every component.">
        <div className="overflow-hidden rounded-2xl bg-surface ring-1 ring-border shadow-xs divide-y divide-separator-secondary">
          {[
            [["Tab"], "Move to the next focusable element"],
            [["Shift", "Tab"], "Move to the previous focusable element"],
            [["Space"], "Toggle checkbox, switch or press a button"],
            [["Enter"], "Activate the focused control or submit"],
            [["Esc"], "Dismiss modal, drawer, popover or palette"],
            [["↑", "↓"], "Move between menu, listbox or tab items"],
            [["⌘", "K"], "Open the command palette from anywhere"],
          ].map(([keys, desc]) => (
            <div key={desc as string} className="flex items-center gap-4 px-5 py-3">
              <span className="flex w-28 shrink-0 gap-1">{(keys as string[]).map((k) => <Kbd key={k}>{k}</Kbd>)}</span>
              <span className="text-paragraph-sm text-muted">{desc as string}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Checklist" description="Ships with every component in the library.">
        <Grid cols={2}>
          {[
            "Semantic element or correct ARIA role",
            "Accessible name via label, aria-label or aria-labelledby",
            "Visible focus indicator at 3:1 against its background",
            "Full keyboard operability with logical tab order",
            "State announced through aria-expanded / checked / selected",
            "Focus trapped and restored for modal surfaces",
            "Touch target of at least 44×44px on coarse pointers",
            "No information conveyed by color alone",
          ].map((c) => (
            <div key={c} className="flex items-start gap-2.5 rounded-xl bg-surface p-3.5 ring-1 ring-border">
              <RiCheckLine className="mt-0.5 h-4 w-4 shrink-0 text-success" />
              <span className="text-paragraph-sm text-muted">{c}</span>
            </div>
          ))}
        </Grid>
      </Section>
    </>
  );
}

/* --------------------------------- TOKENS --------------------------------- */

const TOKEN_ROWS = [
  { group: "Color", name: "--background", value: "oklch(1 0 0)", desc: "Base canvas of the interface." },
  { group: "Color", name: "--surface", value: "oklch(1 0 0)", desc: "Cards, panels, menus and modals." },
  { group: "Color", name: "--foreground", value: "oklch(0.185 0.008 265)", desc: "Primary text and icon color." },
  { group: "Color", name: "--muted", value: "oklch(0.545 0.014 265)", desc: "Secondary text and inactive icons." },
  { group: "Color", name: "--accent", value: "var(--accent-600)", desc: "Brand color for primary actions." },
  { group: "Color", name: "--accent-soft", value: "oklch(0.955 … )", desc: "Tinted accent background." },
  { group: "Color", name: "--separator", value: "oklch(0.925 0.004 265)", desc: "Dividers between content regions." },
  { group: "Color", name: "--field", value: "oklch(0.975 0.002 265)", desc: "Resting background of form controls." },
  { group: "Radius", name: "--radius-scale", value: "1", desc: "Global multiplier for every radius token." },
  { group: "Radius", name: "--radius-lg", value: "calc(0.5rem * scale)", desc: "Buttons, inputs, small cards." },
  { group: "Radius", name: "--radius-2xl", value: "calc(1rem * scale)", desc: "Modals, large panels." },
  { group: "Elevation", name: "--shadow-sm", value: "0 1px 3px …", desc: "Resting card elevation." },
  { group: "Elevation", name: "--shadow-lg", value: "0 12px 28px …", desc: "Popovers and toasts." },
  { group: "Motion", name: "--ease-out-quint", value: "cubic-bezier(.22,1,.36,1)", desc: "Default enter easing." },
  { group: "Motion", name: "--ease-spring", value: "cubic-bezier(.34,1.56,.64,1)", desc: "Playful toggle easing." },
  { group: "State", name: "--disabled-opacity", value: "0.5", desc: "Opacity applied to disabled controls." },
  { group: "State", name: "--border-width", value: "1px", desc: "Default control border width." },
];

export function TokensPage() {
  const [q, setQ] = useState("");
  const rows = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return TOKEN_ROWS;
    return TOKEN_ROWS.filter((r) => r.name.includes(t) || r.desc.toLowerCase().includes(t) || r.group.toLowerCase().includes(t));
  }, [q]);

  return (
    <>
      <PageHeader
        eyebrow="Theming"
        title="Token Reference"
        description="Every variable Aperture exposes, what it controls, and where it is safe to override. Tokens marked calculated are derived — override their source instead."
        tags={["312 tokens", "CSS variables", "Tailwind bridge"]}
      />

      <Section title="Search">
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter tokens…" startContent={<RiSearchLine />} />
        <Table
          columns={[
            { key: "name", header: "Token", width: "34%", render: (r) => <code className="font-mono text-paragraph-xs text-accent">{r.name}</code> },
            { key: "value", header: "Light value", width: "26%", render: (r) => <code className="font-mono text-paragraph-xs text-muted">{r.value}</code> },
            { key: "desc", header: "Description", render: (r) => <span className="text-paragraph-sm text-muted">{r.desc}</span> },
          ]}
          rows={rows}
        />
      </Section>

      <Section title="Overriding" description="Scope overrides to :root and .dark — never to a component class.">
        <CodeBlock
          filename="app.css"
          code={`@import "@aperture/react/styles.css";

:root {
  --accent-h: 208;        /* rebrand in one line  */
  --accent-c: 0.15;
  --radius-scale: 1.5;    /* softer corners       */
}

.dark {
  --surface: oklch(0.18 0.01 265);
}

/* Add a brand-new semantic role */
:root { --info: oklch(0.6 0.15 210); --info-foreground: oklch(0.98 0 0); }
.dark { --info: oklch(0.7 0.12 210); --info-foreground: oklch(0.15 0 0); }

@theme inline {
  --color-info: var(--info);
  --color-info-foreground: var(--info-foreground);
}`}
        />
        <Snippet symbol="">{"<div className=\"bg-info text-info-foreground\">Heads up</div>"}</Snippet>
      </Section>

      <Section title="Layer contract">
        <PropsTable
          title="Rules"
          rows={[
            { name: "Primitive", type: "--accent-600, --neutral-200, --space-4", description: "Raw values. Never referenced by a component — only by semantic tokens." },
            { name: "Semantic", type: "--accent, --surface, --separator, --field", description: "Intent-based aliases. The only layer components are allowed to read." },
            { name: "Component", type: "--button-bg, --card-padding", description: "Local, scoped overrides. Always resolve to a semantic token by default." },
            { name: "Bridge", type: "@theme inline { --color-*: var(--*) }", description: "Exposes semantic tokens as Tailwind utilities. Generated, do not edit by hand." },
          ]}
        />
      </Section>
    </>
  );
}
