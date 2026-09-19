import { useMemo, useState } from "react";
import { Callout, Grid, PageHeader, PropsTable, Section, Showcase } from "../docs/Blocks";
import { CodeBlock } from "../docs/CodeBlock";
import { Button } from "../ui/Button";
import { Avatar, Card, Chip, Code, Divider, Kbd, Snippet } from "../ui/Display";
import { Input, Slider, Switch } from "../ui/Form";
import { Table } from "../ui/Navigation";
import { useCopy } from "../lib/hooks";
import { ACCENT_PRESETS, RADIUS_PRESETS, useTheme } from "../lib/theme";
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
        description="Unseen's color system is built around semantic intent, not visual abundance. A small set of meaningful roles covers the majority of interface needs, and every value is generated in OKLCH so lightness stays perceptually even across hues."
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

      <Section title="Measure & rhythm" description="Line length is the single biggest lever on readability. Unseen caps prose at 68 characters and UI copy at 52.">
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
        description="Motion in Unseen is functional: it explains where an element came from and where it went. Durations are short, easings are asymmetric, and everything respects prefers-reduced-motion."
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

      <Section title="Reduced motion" description="One rule in the stylesheet neutralises every animation and transition in the library — including components written later. It is enforced by design-lint, so it cannot be quietly removed.">
        <CodeBlock
          filename="reduced-motion.css"
          code={`@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  [data-reveal] { opacity: 1 !important; transform: none !important; }
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
        description="Every variable Unseen exposes, what it controls, and where it is safe to override. Tokens marked calculated are derived — override their source instead."
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
          code={`@import "tailwindcss";

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

/* ---------------------------------- SIZING --------------------------------- */

const CONTROL_HEIGHTS: [string, string, string][] = [
  ["xxs", "h-7", "28px — dense toolbars, table row actions"],
  ["xs", "h-8", "32px — compact controls, embedded UI"],
  ["sm", "h-9", "36px — secondary actions, forms in dense layouts"],
  ["md", "h-10", "40px — the default"],
  ["lg", "h-12", "48px — primary actions in marketing / onboarding"],
];

export function SizingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Foundations"
        title="Sizing"
        description="Components come in a fixed size ladder, not a continuum. Five control heights, three icon sizes and one header height — that is the entire vocabulary, and every component in the system draws from it."
        tags={["5 control heights", "3 icon sizes", "96px chrome"]}
      />

      <Section title="Control heights" description="The same ladder is used by Button, Input, Select, Switch and friends. A control is either on the ladder or it is a documentation bug.">
        <div className="overflow-hidden rounded-2xl bg-surface ring-1 ring-border shadow-xs">
          {CONTROL_HEIGHTS.map(([name, h, note], i) => (
            <div key={name} className={cn("flex flex-wrap items-center gap-5 px-5 py-3", i > 0 && "border-t border-separator-secondary")}>
              <code className="w-10 font-mono text-paragraph-xs text-accent">{name}</code>
              <span className={cn("inline-flex w-40 items-center justify-center rounded-lg bg-surface-secondary px-3 font-medium ring-1 ring-inset ring-border", h)}>
                {name}
              </span>
              <span className="text-paragraph-xs text-muted">{note}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Icon sizes" description="Icons are 16 / 20 / 24px. 12px exists only inside small badge/tag glyphs and is an explicit exception, not a scale step.">
        <div className="grid gap-4 sm:grid-cols-3">
          {([
            ["16px", "h-4 w-4", "Label rows, list items"],
            ["20px", "h-5 w-5", "Inside md controls (the default pairing)"],
            ["24px", "h-6 w-6", "Empty states, feature icons"],
          ] as const).map(([px, cls, use]) => (
            <Card key={px} className="flex items-center gap-3 p-4">
              <RiStarLine className={cn(cls, "text-accent")} />
              <div>
                <p className="font-mono text-paragraph-xs text-foreground">{px}</p>
                <p className="text-paragraph-xs text-muted">{use}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Avatars & media" description="The avatar ladder runs xs → xl; groups clip to a max and render the remainder as a count chip.">
        <Showcase align="stretch">
          <div className="flex items-end gap-4">
            {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
              <div key={s} className="flex flex-col items-center gap-1.5">
                <Avatar name={`Size ${s}`} size={s} />
                <code className="font-mono text-paragraph-xs text-subtle">{s}</code>
              </div>
            ))}
          </div>
        </Showcase>
      </Section>

      <Section title="Chrome" description="Layout-level dimensions live in tokens, not in components.">
        <Table
          columns={[
            { key: "token", header: "Token", render: (r) => <code className="font-mono text-paragraph-xs text-accent">{r.token}</code> },
            { key: "value", header: "Value", render: (r) => <span className="font-mono text-paragraph-xs">{r.value}</span> },
            { key: "use", header: "Used by" },
          ]}
          rows={[
            { token: "--header-height", value: "96px", use: "Docs shell, template topbars" },
            { token: "--border-width", value: "1px", use: "Every hairline in the system" },
            { token: "--spacing", value: "0.25rem", use: "Tailwind spacing base (4px unit)" },
          ]}
        />
      </Section>
    </>
  );
}

/* --------------------------------- BORDERS --------------------------------- */

export function BordersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Foundations"
        title="Borders"
        description="Unseen frames everything with a 1px hairline — rendered as an inset ring, not a border. The difference is intentional: rings never shift layout and they layer cleanly with shadows and focus states."
        tags={["1px hairline", "ring, not border", "separator tokens"]}
      />

      <Section title="Tokens" description="Two strengths for frames, two tones for dividers. Every value below is the full set — there is no border color outside of it.">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Swatch token="--border" className="bg-surface" />
          <Swatch token="--border-strong" className="bg-surface" />
          <Swatch token="--separator" className="bg-surface" />
          <Swatch token="--separator-secondary" className="bg-surface" />
        </div>
      </Section>

      <Section title="The hairline rules" description="design-lint enforces these mechanically — a card that uses `border border-border` will fail the gate.">
        <Grid cols={2}>
          <Card>
            <p className="text-label-sm">Outer frames</p>
            <p className="mt-0.5 mb-3 text-paragraph-xs text-muted">Cards, fields, tables: <code className="font-mono text-accent">ring-1 ring-inset ring-border</code>. Hover raises to the strong border, never a second line.</p>
            <div className="rounded-xl bg-surface-secondary p-4 ring-1 ring-inset ring-border transition-shadow hover:ring-border-strong">
              <div className="rounded-lg bg-surface p-3 ring-1 ring-inset ring-border">Resting card</div>
            </div>
          </Card>
          <Card>
            <p className="text-label-sm">Inner dividers</p>
            <p className="mt-0.5 mb-3 text-paragraph-xs text-muted">List rows and section separators: <code className="font-mono text-accent">border-separator-secondary</code>; structural breaks: <code className="font-mono text-accent">--separator</code> via the Divider component.</p>
            <div className="divide-y divide-separator-secondary rounded-lg bg-surface p-3 text-paragraph-xs ring-1 ring-inset ring-border">
              <div className="py-2">Row one — secondary divider</div>
              <div className="py-2">Row two — secondary divider</div>
              <div className="flex items-center gap-2 py-2">
                <Divider className="min-w-6" /> Structural
                <Divider className="min-w-6" />
              </div>
            </div>
          </Card>
        </Grid>
      </Section>

      <Section title="Premium hairlines" description="For hover-lift cards, a gradient hairline replaces the flat ring: accent-tinted at 135°, falling back to the standard border. One utility, token-driven.">
        <Showcase align="stretch">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-surface p-5 ring-1 ring-inset ring-border">Flat hairline</div>
            <div className="border-glow rounded-xl bg-surface p-5">Gradient hairline</div>
            <div className="surface-lit rounded-xl bg-surface p-5 ring-1 ring-inset ring-border">Brand-lit surface</div>
          </div>
        </Showcase>
      </Section>
    </>
  );
}

/* ------------------------------ OPACITY & Z-INDEX -------------------------- */

export function OpacityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Foundations"
        title="Opacity & Z-index"
        description="Opacity is reserved for state, not decoration, and stacking follows one fixed order. Both are small, explicit systems — anything else is a review flag."
        tags={["--disabled-opacity: 0.5", "fixed stack order", "no z-fighting"]}
      />

      <Section title="Disabled state" description="Unseen disabling: a weak fill and disabled text, not a 50% ghost. <code>--disabled-opacity: 0.5</code> exists for the few elements that genuinely fade (icons inside disabled controls) — design-lint blocks opacity-only disabling on buttons and fields.">
        <Showcase align="stretch">
          <div className="flex flex-wrap items-center gap-3">
            <Button>Enabled</Button>
            <Button disabled>Disabled</Button>
            <Button tone="success">Confirmed</Button>
            <Button tone="success" disabled>Confirmed (disabled)</Button>
            <Chip disabled>Chip (disabled)</Chip>
          </div>
        </Showcase>
      </Section>

      <Section title="Surface opacity" description="Where translucency is deliberate, it is tokenized: backdrop veils, bevel highlights and scrollbar chrome.">
        <Table
          columns={[
            { key: "where", header: "Where" },
            { key: "light", header: "Light", render: (r) => <span className="font-mono text-paragraph-xs">{r.light}</span> },
            { key: "dark", header: "Dark", render: (r) => <span className="font-mono text-paragraph-xs">{r.dark}</span> },
            { key: "why", header: "Why" },
          ]}
          rows={[
            { where: "Modal / drawer backdrop", light: "rgb(14 18 27 / 0.32)", dark: "rgb(0 0 0 / 0.6)", why: "Focus shift without hiding the page" },
            { where: "Bevel highlight (buttons, fills)", light: "white 0.20 → 0.28 on hover", dark: "raised to 0.9 on neutral fill", why: "The “physical” top edge" },
            { where: "Scrollbar thumb", light: "border colour", dark: "border colour", why: "Thin, unobtrusive, token-matched" },
            { where: "Skeleton shimmer", light: "accent 8–12% wash", dark: "surface-secondary wash", why: "Perceptible, never distracting" },
          ]}
        />
      </Section>

      <Section title="Stacking order" description="One fixed order, applied at the layer — not with escalating z-50s. If two layers fight, the fix is structure (portals, isolation), not a bigger number.">
        <div className="overflow-hidden rounded-2xl bg-surface ring-1 ring-border shadow-xs">
          {[
            ["10", "Content", "Cards, tables, inline blocks"],
            ["20", "Sticky chrome", "Sticky table headers, floating toolbars"],
            ["30", "Popovers", "Dropdowns, menus, tooltips, hover cards"],
            ["40", "Overlays", "Modal, drawer, command menu"],
            ["50", "System", "Toast, global progress"],
          ].map(([z, layer, use], i) => (
            <div key={layer} className={cn("flex items-center gap-5 px-5 py-2.5", i > 0 && "border-t border-separator-secondary")}>
              <code className="w-8 font-mono text-paragraph-xs text-accent">z-{z}</code>
              <span className="w-36 text-label-sm">{layer}</span>
              <span className="text-paragraph-xs text-muted">{use}</span>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

/* -------------------------------- BREAKPOINTS ------------------------------ */

export function BreakpointsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Foundations"
        title="Breakpoints & Responsive"
        description="Mobile-first on Tailwind’s standard ladder, with the guarantee that comes with it: no horizontal overflow at any width from 320px to 1600px, and nothing that depends on a single breakpoint to hold together. The guarantee is enforced in the browser suite, not hoped for."
        tags={["mobile-first", "320 → 1600px", "WCAG 1.4.10 / 1.4.4"]}
      />

      <Section title="The ladder" description="Standard Tailwind v4 breakpoints. Layouts are built mobile-first: the base styles are the narrow view, and each breakpoint only adds capacity.">
        <Table
          columns={[
            { key: "name", header: "Token", render: (r) => <code className="font-mono text-paragraph-xs text-accent">{r.name}</code> },
            { key: "min", header: "Min width", render: (r) => <span className="font-mono text-paragraph-xs">{r.min}</span> },
            { key: "shift", header: "What changes" },
          ]}
          rows={[
            { name: "base", min: "0px", shift: "Single column; nav collapses to a drawer; tables scroll in a container" },
            { name: "sm", min: "640px", shift: "Two-up card grids; inline action rows" },
            { name: "md", min: "768px", shift: "Sidebar appears (docs, templates); 3-up grids" },
            { name: "lg", min: "1024px", shift: "Full docs shell: sidebar + content + TOC rail" },
            { name: "xl", min: "1280px", shift: "Max content width reached; extra table columns reveal" },
            { name: "2xl", min: "1536px", shift: "4-up grids; wide tables" },
          ]}
        />
      </Section>

      <Section title="Guaranteed behaviour" description="These are the invariants every route and block must hold — the visual and responsive suites exist to prove them.">
        <Grid cols={2}>
          {[
            ["No horizontal overflow", "At 320, 375, 768, 1024 and 1440px, no route scrolls horizontally. Long content (tables, code) scrolls inside its own container (ds-scroll), never the page."],
            ["200% zoom", "At the 200%-zoom-equivalent viewport nothing reflows into overlap — the WCAG 1.4.4 check runs at the scaled viewport."],
            ["Navigation degrades", "The sidebar becomes a drawer below md; the topbar condenses; ⌘K and theme controls stay reachable."],
            ["Motion respects preference", "prefers-reduced-motion collapses every animation to 0.01ms — one rule in the base layer, all components inherit it."],
          ].map(([t, d]) => (
            <Card key={t} className="p-4">
              <p className="text-label-sm">{t}</p>
              <p className="mt-1 text-paragraph-xs text-muted">{d}</p>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section title="The gate" description="Run it the same way CI does — it builds the production bundle first, then drives a real browser.">
        <CodeBlock code={`npm run test:browser            # a11y (incl. contrast) + responsive + visual
npm run test:browser -- responsive   # reflow suite only`} filename="shell" />
      </Section>
    </>
  );
}

/* ---------------------------------- THEMES --------------------------------- */

export function ThemesPage() {
  const { mode, accentH, accentC, radiusScale, set, toggleMode, reset } = useTheme();
  return (
    <>
      <PageHeader
        eyebrow="Foundations"
        title="Themes"
        description="A theme in Unseen is two numbers and a scale: an OKLCH hue + chroma pair that regenerates the entire accent ramp, a radius multiplier, and one of two appearances. That is the whole input space — and it is the same input space Figma sees, because tokens export from this system, not from a Figma file."
        tags={["OKLCH brand engine", "5 radius presets", "tokens.json export"]}
      />

      <Section title="Brand engine" description="Pick a preset or slide the hue/chroma. Every accent surface in the page — buttons, links, focus rings, this header — updates from the two variables.">
        <Showcase align="stretch">
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              {ACCENT_PRESETS.map((p) => (
                <button
                  key={p.name}
                  onClick={() => set({ accentH: p.h, accentC: p.c })}
                  className={cn(
                    "h-8 w-8 rounded-full ring-2 ring-offset-2 ring-offset-surface transition-transform hover:scale-110",
                    p.h === accentH && p.c === accentC ? "ring-foreground" : "ring-transparent",
                  )}
                  style={{ background: `oklch(0.62 ${p.c} ${p.h})` }}
                  aria-label={`Accent preset ${p.name}`}
                />
              ))}
              <Button variant="ghost" size="sm" onClick={reset}>Reset</Button>
            </div>
            <div className="flex gap-1.5">
              {RAMP.map((i) => (
                <div key={i} className="h-10 flex-1 rounded-md" style={{ background: `var(--accent-${i})` }} title={`--accent-${i}`} />
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button>Solid</Button>
              <Button variant="soft">Soft</Button>
              <Button variant="outline">Outline</Button>
              <Chip tone="accent">Chip</Chip>
              <a href="#/foundations/themes" className="text-paragraph-sm text-accent underline-offset-4 hover:underline">Accent link</a>
            </div>
          </div>
        </Showcase>
      </Section>

      <Section title="Radius, density & appearance" description="The radius scale is one multiplier over the whole radius ladder (presets 0 → 2.25). Density and appearance round out the theme.">
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="p-4">
            <p className="text-label-sm">Radius</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {RADIUS_PRESETS.map((r) => (
                <button
                  key={r.name}
                  onClick={() => set({ radiusScale: r.value })}
                  className={cn(
                    "rounded-lg px-2.5 py-1.5 text-paragraph-xs font-medium ring-1 ring-inset transition-colors",
                    r.value === radiusScale ? "bg-accent-soft text-accent-soft-foreground ring-accent" : "bg-surface-secondary text-muted ring-border hover:text-foreground",
                  )}
                >
                  {r.name}
                </button>
              ))}
            </div>
          </Card>
          <Card className="p-4">
            <p className="text-label-sm">Appearance</p>
            <div className="mt-3 flex gap-1.5">
              {(["light", "dark"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => (m === mode ? undefined : toggleMode())}
                  className={cn(
                    "flex-1 rounded-lg px-2.5 py-1.5 text-paragraph-xs font-medium capitalize ring-1 ring-inset transition-colors",
                    mode === m ? "bg-accent-soft text-accent-soft-foreground ring-accent" : "bg-surface-secondary text-muted ring-border hover:text-foreground",
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
          </Card>
          <Card className="p-4">
            <p className="text-label-sm">Disabled opacity</p>
            <p className="mt-3 font-mono text-paragraph-xs text-muted">--disabled-opacity: 0.5</p>
            <p className="mt-1 text-paragraph-xs text-subtle">State opacity is fixed; theming is colour, shape and mode.</p>
          </Card>
        </div>
      </Section>

      <Section title="Export — the Figma bridge" description="Tokens are the source of truth, so they export — they are never re-entered in Figma. The export is deterministic and diff-checked, which is what makes a Figma library stay honest.">
        <Grid cols={2}>
          <Card className="p-4">
            <p className="text-label-sm">What exports</p>
            <ul className="mt-2 space-y-1.5 text-paragraph-xs text-muted">
              <li>• <code className="font-mono text-accent">tokens/tokens.json</code> — design-tokens 2.0: primitive + semantic (light/dark modes) colours, palette, type scale, radius, shadows, motion, sizing, brand config.</li>
              <li>• <code className="font-mono text-accent">tokens/figma-variables.csv</code> — 103 variables for manual Figma import.</li>
              <li>• Accent ramp evaluated at the current H/C, so Figma shows real values.</li>
            </ul>
          </Card>
          <Card className="p-4">
            <p className="text-label-sm">The pipeline</p>
            <CodeBlock code={`npm run tokens:export   # regenerate from src/index.css
npm run tokens:check    # CI: fail if tokens drift
# Figma: import tokens.json via Tokens Studio
#   → light/dark semantic pairs become variable modes`} filename="shell" />
          </Card>
        </Grid>
        <div className="mt-4">
          <Callout tone="accent" title="Next: Theme Studio v2">
            A full generator with live component previews, CSS / Tailwind / JSON exports and shareable preset URLs — roadmap, Track B.
          </Callout>
        </div>
      </Section>
    </>
  );
}
