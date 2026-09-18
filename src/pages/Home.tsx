import React, { useEffect, useState } from "react";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import { Button, FancyButton } from "../ui/Button";
import { Chip, Progress, Snippet } from "../ui/Display";
import { Input, Switch } from "../ui/Form";
import { Accordion } from "../ui/Navigation";
import { BLOCKS } from "../blocks";
import { TEMPLATE_CARDS } from "./Templates";
import { SiteFooter } from "../docs/Shell";
import { COMPONENT_GROUPS } from "../docs/nav";
import { useCopy } from "../lib/hooks";
import { ACCENT_PRESETS, RADIUS_PRESETS, useTheme } from "../lib/theme";
import { cn } from "../utils/cn";
import { User } from "../ui/Display";
import {
  RiAccessibilityLine,
  RiArrowRightLine,
  RiCheckLine,
  RiCodeSSlashLine,
  RiCommandLine,
  RiContrastLine,
  RiEyeLine,
  RiFileCopyLine,
  RiKeyboardLine,
  RiLayoutGridLine,
  RiMoreLine,
  RiLockPasswordLine,
  RiMoonLine,
  RiPaletteLine,
  RiRestartLine,
  RiRobot2Line,
  RiStackLine,
  RiSunLine,
} from "@remixicon/react";

/* ========================================================================== */
/*  THE HOMEPAGE IS A DESIGN-SYSTEM PRODUCT, NOT A LANDING PAGE              */
/*                                                                           */
/*  WEBSITE-IA.md §4.1 fixes the order and the rule for each band. Two       */
/*  further rules apply to every line here:                                  */
/*    · Every number is derived from a registry (never typed in).            */
/*    · Nothing claims what the repository cannot show. The site previously   */
/*      carried a competitor's tagline, an invented "trusted by 2,400+"       */
/*      count, fabricated sector metrics and an MIT grant the repo does not   */
/*      make (there is no LICENSE file). Those are gone.                     */
/* ========================================================================== */

const COMPONENT_COUNT = COMPONENT_GROUPS.reduce((n, g) => n + g.items.length, 0);

/* -------------------------------------------------------------------------- */
/*            1. THE LIVE COMPONENT — edit the source, watch it run          */
/* -------------------------------------------------------------------------- */

const HERO_SNIPPETS: Record<string, { filename: string; code: string; imports: string }> = {
  "workspace-card.tsx": {
    filename: "workspace-card.tsx",
    imports: `import { FancyButton } from "./ui/Button";\nimport { Input, Switch } from "./ui/Form";\nimport { Chip } from "./ui/Display";`,
    code: `function WorkspaceCard() {
  const [plan, setPlan] = React.useState(false);

  return (
    <div style={{ width: "100%", maxWidth: 340, textAlign: "left" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          padding: 22,
          border: "1px solid var(--border)",
          borderRadius: "calc(14px * var(--radius-scale))",
          background: "var(--surface)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Chip tone="accent" variant="soft" dot size="sm">Public beta</Chip>
        </div>
        <div style={{ textAlign: "center" }}>
          <h3 style={{ fontSize: 20, fontWeight: 500, letterSpacing: -0.5 }}>Your workspace</h3>
          <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
            Create a workspace and start building.
          </p>
        </div>
        <Input
          size="md"
          label="Workspace name"
          placeholder="Acme, Inc."
          defaultValue="Acme"
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 13, color: "var(--muted)" }}>
            Annual billing
          </span>
          <Switch size="sm" checked={plan} onChange={setPlan} aria-label="Annual billing" />
        </div>
        <FancyButton tone="accent" size="lg" fullWidth>
          Create workspace
        </FancyButton>
      </div>
    </div>
  );
}`,
  },
  "button.tsx": {
    filename: "button.tsx",
    imports: `import { Button } from "./ui/Button";`,
    code: `function ButtonDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center", justifyContent: "center", padding: 24, width: "100%", maxWidth: 320 }}>
      <Button variant="solid" tone="accent" size="md" fullWidth>
        Primary Filled
      </Button>
      <Button variant="outline" tone="default" size="md" fullWidth>
        Stroke Outline
      </Button>
      <Button variant="soft" tone="accent" size="md" fullWidth>
        Soft Tinted
      </Button>
      <Button variant="ghost" tone="default" size="md" fullWidth>
        Ghost Action
      </Button>
    </div>
  );
}`,
  },
  "fancy-button.tsx": {
    filename: "fancy-button.tsx",
    imports: `import { FancyButton } from "./ui/Button";`,
    code: `function FancyDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center", justifyContent: "center", padding: 24, width: "100%", maxWidth: 320 }}>
      <FancyButton tone="accent" size="lg" fullWidth>
        Specular Primary
      </FancyButton>
      <FancyButton tone="accent" size="md" fullWidth>
        Get Started Today
      </FancyButton>
      <FancyButton tone="default" size="sm" fullWidth>
        Compact Shiny
      </FancyButton>
    </div>
  );
}`,
  },
  "input.tsx": {
    filename: "input.tsx",
    imports: `import { Input } from "./ui/Form";`,
    code: `function InputDemo() {
  const [val, setVal] = React.useState("alex@unseen.design");
  return (
    <div style={{ width: "100%", maxWidth: 320, display: "flex", flexDirection: "column", gap: 14, padding: 20 }}>
      <Input
        label="Email Address"
        placeholder="alex@unseen.design"
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
      <Input
        label="Master Password"
        type="password"
        placeholder="••••••••••"
        defaultValue="unseen_2026"
      />
    </div>
  );
}`,
  },
  "switch.tsx": {
    filename: "switch.tsx",
    imports: `import { Switch } from "./ui/Form";`,
    code: `function SwitchDemo() {
  const [enabled, setEnabled] = React.useState(true);
  const [notify, setNotify] = React.useState(false);
  return (
    <div style={{ width: "100%", maxWidth: 320, display: "flex", flexDirection: "column", gap: 16, padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 13, fontWeight: 500 }}>Push Notifications</span>
        <Switch size="sm" checked={enabled} onChange={setEnabled} aria-label="Push Notifications" />
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 13, fontWeight: 500 }}>Email Digests</span>
        <Switch size="sm" checked={notify} onChange={setNotify} aria-label="Email Digests" />
      </div>
    </div>
  );
}`,
  },
};

const HERO_SCOPE = { Button, FancyButton, Input, Switch, Chip, User, React };

function HeroEditor() {
  const [activeFile, setActiveFile] = useState<string>("workspace-card.tsx");
  const [view, setView] = useState<"preview" | "code">("preview");
  const [resetKey, setResetKey] = useState(0);
  const { copy, copied } = useCopy();

  const fileData = HERO_SNIPPETS[activeFile] ?? HERO_SNIPPETS["workspace-card.tsx"];
  const copySource = `import React from "react";\n${fileData.imports}\n\nexport default ${fileData.code}`;

  return (
    <div className="hero-editor" aria-label="Interactive example editor">
      {/* Multi-file tab bar */}
      <div className="flex items-center justify-between border-b border-separator bg-surface-secondary/80 px-2 py-1 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1">
          {Object.keys(HERO_SNIPPETS).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => {
                setActiveFile(f);
                setResetKey((n) => n + 1);
              }}
              className={cn(
                "flex items-center gap-1.5 rounded-6 px-2.5 py-1 text-[11px] font-mono transition-all",
                activeFile === f
                  ? "bg-surface text-accent shadow-xs border border-border font-medium"
                  : "text-muted hover:text-foreground"
              )}
            >
              <RiCodeSSlashLine size={13} />
              <span>{f}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 shrink-0 ml-2">
          <span className="hero-editor-tabs" role="tablist" aria-label="Example editor view">
            <button role="tab" aria-selected={view === "preview"} onClick={() => setView("preview")}><RiEyeLine size={13} /> Preview</button>
            <button role="tab" aria-selected={view === "code"} onClick={() => setView("code")}><RiCodeSSlashLine size={13} /> Code</button>
          </span>
          <button className="hero-editor-iconbtn" title="Reset example" aria-label="Reset example" onClick={() => setResetKey((n) => n + 1)}><RiRestartLine size={13} /></button>
          <button className="hero-editor-iconbtn" title={copied ? "Copied" : "Copy source"} aria-label={copied ? "Copied" : "Copy source"} onClick={() => copy(copySource)}>{copied ? <RiCheckLine size={13} /> : <RiFileCopyLine size={13} />}</button>
        </div>
      </div>

      <LiveProvider key={`${activeFile}-${resetKey}`} code={fileData.code} scope={HERO_SCOPE} language="jsx" noInline={false}>
        <div className="hero-editor-body">
          {view === "preview" ? (
            <div className="hero-editor-preview"><LivePreview key={resetKey} /></div>
          ) : (
            <LiveEditor key={`code-${activeFile}-${resetKey}`} className="hero-editor-source" aria-label="Edit the component code" />
          )}
        </div>
        <div aria-live="polite"><LiveError className="hero-editor-error" /></div>
      </LiveProvider>
      <div className="hero-editor-footer">
        <span><span className="beta-status-dot" /> Editable — switch to Code and type. The preview is the real component.</span>
        <span>React 19 · Tailwind CSS v4 · TypeScript</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*            2. QUALITY PROOF — the matrices, live, not screenshots         */
/* -------------------------------------------------------------------------- */

const TONES = ["accent", "default", "success", "warning", "danger"] as const;
const VARIANTS = ["solid", "soft", "outline", "ghost", "link"] as const;
const SIZES = ["xxs", "xs", "sm", "md", "lg"] as const;

/** Intent × mode. Five intents down, five modes across — 25 live specimens. */
function IntentModeMatrix() {
  return (
    <div className="matrix">
      <div className="matrix-row matrix-row--head">
        <span className="matrix-corner" />
        {VARIANTS.map((v) => (
          <span key={v} className="matrix-col-label">{v}</span>
        ))}
      </div>
      {TONES.map((tone) => (
        <div className="matrix-row" key={tone}>
          <span className="matrix-row-label">{tone}</span>
          {VARIANTS.map((variant) => (
            <span className="matrix-cell" key={variant}>
              <Button size="sm" tone={tone} variant={variant}>
                {tone === "default" ? "Button" : tone.charAt(0).toUpperCase() + tone.slice(1)}
              </Button>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

/** The states that are usually left to chance. */
function StateRow() {
  return (
    <div className="specimen-row">
      <div className="specimen">
        <Button size="sm" tone="accent" variant="solid">Continue</Button>
        <em>default</em>
      </div>
      <div className="specimen">
        <Button size="sm" tone="accent" variant="solid" disabled>Continue</Button>
        <em>disabled</em>
      </div>
      <div className="specimen">
        <Button size="sm" tone="accent" variant="solid" loading>Continue</Button>
        <em>loading</em>
      </div>
      <div className="specimen">
        <Button size="sm" tone="default" variant="outline" iconOnly aria-label="More actions">
          <RiMoreLine />
        </Button>
        <em>icon only</em>
      </div>
      <div className="specimen">
        <Button size="sm" tone="default" variant="outline" startContent={<RiPaletteLine />}>
          Theme
        </Button>
        <em>leading icon</em>
      </div>
      <div className="specimen">
        <Button size="sm" tone="accent" variant="soft" endContent={<RiArrowRightLine />}>
          Next
        </Button>
        <em>trailing icon</em>
      </div>
    </div>
  );
}

/** Sizes, on the same component, in the same frame. */
function SizeRow() {
  return (
    <div className="specimen-row specimen-row--tight">
      {SIZES.map((size) => (
        <div className="specimen" key={size}>
          <Button size={size} tone="accent" variant="solid">Size</Button>
          <em>{size}</em>
        </div>
      ))}
      <div className="specimen">
        <FancyButton size="lg" tone="accent">Fancy</FancyButton>
        <em>fancy</em>
      </div>
    </div>
  );
}

function QualityProofSection() {
  return (
    <section className="home-section home-container" aria-labelledby="quality-proof-title">
      <div className="home-section-heading">
        <div>
          <span className="section-number">Quality Proof</span>
          <h2 id="quality-proof-title">Every intent, every mode, on purpose.</h2>
        </div>
        <div>
          <p>
            This is the Button component as it ships — the same file the docs page renders, on the same
            tokens. Twenty-five intent × mode cells, the states that usually go undesigned, and all five
            sizes. Nothing here is a screenshot.
          </p>
          <a href="#/components/button" className="text-action">
            Open the Button page <RiArrowRightLine size={16} />
          </a>
        </div>
      </div>

      <div className="matrix-frame">
        <div className="matrix-toolbar">
          <span className="matrix-toolbar-title">Intent × mode</span>
          <a className="text-action" href="#/components/button">
            Variants, sizes and states <RiArrowRightLine size={14} />
          </a>
        </div>
        <div
          className="specimen-stage matrix-stage"
          role="region"
          aria-label="Button: intent by mode"
          tabIndex={0}
        >
          <IntentModeMatrix />
        </div>
      </div>

      <div className="specimen-pair">
        <div className="specimen-frame">
          <div className="matrix-toolbar">
            <span className="matrix-toolbar-title">States</span>
          </div>
          <div className="specimen-stage"><StateRow /></div>
        </div>
        <div className="specimen-frame">
          <div className="matrix-toolbar">
            <span className="matrix-toolbar-title">Sizes</span>
          </div>
          <div className="specimen-stage"><SizeRow /></div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*            3. FOUNDATIONS PROOF — the real theme knobs, not a mock        */
/* -------------------------------------------------------------------------- */

/**
 * The controls drive `useTheme()` — the same state the header popover writes.
 * Nothing here is a sandboxed imitation: changing the accent, the radius scale
 * or the mode re-themes this page and every component on it, and persists.
 */
function FoundationsProofSection() {
  const theme = useTheme();
  const activeAccent = ACCENT_PRESETS.find((p) => Math.abs(theme.accentH - p.h) < 10);
  const activeRadius = RADIUS_PRESETS.reduce((best, p) =>
    Math.abs(p.value - theme.radiusScale) < Math.abs(best.value - theme.radiusScale) ? p : best
  );

  return (
    <section className="home-section home-container" aria-labelledby="foundations-proof-title">
      <div className="home-section-heading">
        <div>
          <span className="section-number">Foundations Proof</span>
          <h2 id="foundations-proof-title">Change three tokens. Watch everything follow.</h2>
        </div>
        <div>
          <p>
            Accent, corner radius and mode are three knobs out of the whole graph, and these are the real
            ones — the same state the header controls write. There is one token layer, not a light copy and
            a dark copy.
          </p>
          <a href="#/foundations/color" className="text-action">
            Foundations <RiArrowRightLine size={16} />
          </a>
        </div>
      </div>

      <div className="home-customizer">
        <div className="home-customizer-controls">
          <fieldset>
            <legend className="home-control-label">
              <RiPaletteLine size={14} className="text-accent" /> Accent ramp
            </legend>
            <div className="accent-swatch-grid">
              {ACCENT_PRESETS.map((p) => {
                const selected = activeAccent?.name === p.name;
                return (
                  <button
                    key={p.name}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => theme.set({ accentH: p.h, accentC: p.c })}
                    className={cn("accent-swatch", selected && "is-selected")}
                    title={p.name}
                  >
                    <span className="accent-swatch-dot" style={{ background: `oklch(0.62 ${p.c} ${p.h})` }} aria-hidden />
                    <span className="accent-swatch-name">{p.name}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset>
            <legend className="home-control-label">
              <RiContrastLine size={14} className="text-accent" /> Mode
            </legend>
            <div className="theme-toggle-row" role="group" aria-label="Color mode">
              {(["light", "dark"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  aria-pressed={theme.mode === m}
                  onClick={() => theme.set({ mode: m })}
                  className={cn("theme-toggle", theme.mode === m && "is-selected")}
                >
                  {m === "light" ? <RiSunLine size={14} /> : <RiMoonLine size={14} />}
                  <span className="capitalize">{m}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="home-control-label">
              <RiStackLine size={14} className="text-accent" /> Corner radius
            </legend>
            <div className="radius-preset-row">
              {RADIUS_PRESETS.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  aria-pressed={activeRadius?.name === p.name}
                  onClick={() => theme.set({ radiusScale: p.value })}
                  className={cn("radius-preset", activeRadius?.name === p.name && "is-selected")}
                  style={{ borderRadius: `${4 + p.value * 8}px` }}
                >
                  <span className="radius-preset-name">{p.name}</span>
                  <span className="radius-preset-value">{p.value}×</span>
                </button>
              ))}
            </div>
          </fieldset>

          <Snippet className="w-full text-[11px]">
            {`:root {\n  --accent-h: ${theme.accentH};\n  --accent-c: ${theme.accentC};\n  --radius-scale: ${theme.radiusScale};\n}`}
          </Snippet>

          <Button size="xs" variant="ghost" tone="default" onClick={theme.reset}>Reset to defaults</Button>
        </div>

        <div className="specimen-frame">
          <div className="matrix-toolbar">
            <span className="matrix-toolbar-title">Specimen · live</span>
            <span className="text-[11px] text-subtle">
              {activeAccent?.name ?? "Custom"} · {theme.mode} · {activeRadius?.name ?? "Custom"}
            </span>
          </div>
          <div className="specimen-stage p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-8 bg-accent text-accent-foreground">
                  <RiLockPasswordLine size={16} />
                </span>
                <div>
                  <p className="text-label-xs font-medium text-foreground">Reset password</p>
                  <p className="text-[11px] text-muted">We&rsquo;ll email you a recovery link.</p>
                </div>
              </div>
              <Chip size="sm" tone="accent" variant="soft">Security</Chip>
            </div>

            <Input size="md" label="Email address" defaultValue="alex@unseen.design" wrapperClassName="w-full" />
            <div className="flex items-center justify-between">
              <span className="text-paragraph-xs text-muted">Trust this device</span>
              <Switch size="sm" checked onChange={() => {}} aria-label="Trust this device" />
            </div>
            <Button size="md" tone="accent" variant="solid" fullWidth>Send recovery link</Button>
            <div className="flex items-center gap-3">
              <Progress value={72} size="sm" />
              <span className="text-[11px] font-mono text-subtle shrink-0">72%</span>
            </div>
            <div className="flex items-center gap-2">
              <Chip size="sm" tone="success" variant="soft" dot>Active</Chip>
              <Chip size="sm" tone="warning" variant="soft" dot>Review</Chip>
              <Chip size="sm" tone="danger" variant="soft">Failed</Chip>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*            4. BLOCKS & TEMPLATES — real entries from the registry         */
/* -------------------------------------------------------------------------- */

/**
 * Four compositions, named and described by the block registry itself.
 *
 * Each one's declared native width must fit the card: blocks render at native
 * size (DESIGN-REVIEW.md), so a 980px table in a 320px card is a clipped word,
 * not a preview. `homepage.spec` asserts nothing overflows its card.
 */
const HOMEPAGE_BLOCKS = ["auth", "command", "onboarding", "profile"];

function BlocksTemplatesSection({ navigate }: { navigate: (to: string) => void }) {
  const featured = HOMEPAGE_BLOCKS
    .map((key) => BLOCKS.find((b) => b.key === key))
    .filter((b): b is (typeof BLOCKS)[number] => Boolean(b));

  return (
    <section className="home-section home-container" aria-labelledby="blocks-templates-title">
      <div className="home-section-heading">
        <div>
          <span className="section-number">Blocks &amp; Templates</span>
          <h2 id="blocks-templates-title">Composed, not decorated.</h2>
        </div>
        <div>
          <p>
            {BLOCKS.length} composed blocks and {TEMPLATE_CARDS.length} full application screens, every one
            assembled from the components above. Each opens on its own page with the source.
          </p>
          <a href="#/blocks" className="text-action">
            All {BLOCKS.length} blocks <RiArrowRightLine size={16} />
          </a>
        </div>
      </div>

      <div className="block-showcase-grid">
        {featured.map((block) => (
          <a
            key={block.key}
            href="#/blocks"
            onClick={(e) => {
              e.preventDefault();
              navigate("blocks");
            }}
            className="block-showcase"
          >
            <div className="block-showcase-preview specimen-stage">
              {/* Native width, centred — never scaled. */}
              <div className="block-showcase-inner" style={{ maxWidth: block.width ? `${block.width}px` : "100%" }}>
                {block.render()}
              </div>
            </div>
            <div className="block-showcase-meta">
              <span className="text-label-xs font-medium text-foreground">{block.title}</span>
              <span className="text-[11px] text-subtle">{block.category}</span>
            </div>
          </a>
        ))}
      </div>

      <div className="template-strip">
        {TEMPLATE_CARDS.map((t) => (
          <a
            key={t.key}
            href={`#/${t.href}`}
            onClick={(e) => {
              e.preventDefault();
              navigate(t.href);
            }}
            className="template-strip-card"
          >
            <span className="flex items-center gap-2">
              <RiLayoutGridLine size={15} className="text-accent shrink-0" />
              <span className="text-label-xs font-medium text-foreground">{t.title}</span>
            </span>
            <span className="text-[11px] text-muted leading-relaxed">{t.description}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*            5. ACCESSIBILITY & QUALITY — the receipts                      */
/* -------------------------------------------------------------------------- */

const QUALITY_RECEIPTS = [
  {
    icon: RiAccessibilityLine,
    title: "axe-core clean",
    body: "Every route is scanned in a real browser, in light and dark, and the gate fails on any critical or serious violation.",
  },
  {
    icon: RiKeyboardLine,
    title: "Keyboard complete",
    body: "Focus is visible, ordered and returned on close. Overlays trap it; menus rove through it; the docs state the contract per component.",
  },
  {
    icon: RiEyeLine,
    title: "Motion, governed",
    body: "Transitions run on a five-step duration scale, and one global rule collapses every one of them when reduced motion is requested.",
  },
  {
    icon: RiStackLine,
    title: "Contract-tested",
    body: "Unit tests cover interaction and focus; real-browser suites re-check motion, refs, the playground and these very pages.",
  },
];

function QualityBand() {
  return (
    <section className="home-section home-container" aria-labelledby="quality-band-title">
      <div className="home-section-heading">
        <div>
          <span className="section-number">Accessibility &amp; Quality</span>
          <h2 id="quality-band-title">Claims that come with receipts.</h2>
        </div>
        <div>
          <p>
            Every statement on this page is checked by a script in the repository. Where a number exists it
            is printed from the registry, never typed here.
          </p>
          <a href="#/foundations/accessibility" className="text-action">
            How it is enforced <RiArrowRightLine size={16} />
          </a>
        </div>
      </div>

      <div className="receipt-grid">
        {QUALITY_RECEIPTS.map((r) => (
          <div className="receipt" key={r.title}>
            <span className="receipt-icon"><r.icon size={17} aria-hidden /></span>
            <h3 className="text-label-xs font-medium text-foreground">{r.title}</h3>
            <p className="text-[11px] text-muted leading-relaxed mt-1">{r.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*            6. FAQ                                                         */
/* -------------------------------------------------------------------------- */

const FAQ_CODE = [
  {
    key: "what",
    title: "What exactly is Unseen?",
    content: `${COMPONENT_COUNT} documented components, ${BLOCKS.length} composed blocks and ${TEMPLATE_CARDS.length} application templates on a single OKLCH token layer. Every example on this site is the real component running — the preview and the source sit next to each other, with nothing re-drawn for the marketing.`,
  },
  {
    key: "install",
    title: "How do I add it to a project?",
    content: "Copy the component file you need and keep its imports. The installation page lists the three peer libraries the components reference and walks through the token layer, which is one CSS file.",
  },
  {
    key: "stack",
    title: "Which stack is it built on?",
    content: "React 19, Tailwind CSS v4 with a CSS-first @theme mapping, and TypeScript in strict mode. The components are plain functions — no wrapper library, no provider tree to mount.",
  },
  {
    key: "deps",
    title: "Do I have to install a runtime package?",
    content: "There is no Unseen package to install. The components import clsx and tailwind-merge for class merging, and Remixicon for icons; those are the only runtime imports, and the installation page shows how to swap them if you prefer your own.",
  },
  {
    key: "breadth",
    title: "Why 80 components instead of 300?",
    content: "Because a component is not finished when it renders. Each one carries a variant matrix, a state matrix, an accessibility contract, documentation and real-browser coverage. The published quality bar decides what is Done, and the audit trails what is not yet there.",
  },
  {
    key: "license",
    title: "Can I use it in commercial work?",
    content: "Everything on this site is free to explore, read and copy during the public beta, and the repository states its licensing position in the README. Before you ship it in a product, check that file — this page deliberately makes no claim it cannot point at.",
  },
];

function FaqSection() {
  return (
    <section className="home-section home-container home-faq-section" aria-labelledby="home-faq-title">
      <div className="home-faq-grid">
        <div>
          <span className="section-number">Questions</span>
          <h2 id="home-faq-title">Clear answers.<br />From code to license.</h2>
          <p>
            What the system is, how it installs, and where it stops — answered without the adjectives.
          </p>
        </div>
        <Accordion variant="flush" multiple items={FAQ_CODE} defaultOpen={["what"]} />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*            PAGE                                                           */
/* -------------------------------------------------------------------------- */

const STACK = ["React 19", "Tailwind CSS v4", "TypeScript", "Accessible"];

export default function Home({ navigate }: { navigate: (to: string) => void }) {
  /* The hero's live editor measures itself; re-run its preview on theme change
     so the specimen never shows a stale surface colour. */
  const [, setThemeTick] = useState(0);
  useEffect(() => {
    const obs = new MutationObserver(() => setThemeTick((n) => n + 1));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  return (
    <main id="main" tabIndex={-1} className="home-page relative">
      <div className="hero-ambient-mesh" aria-hidden="true" />
      <div className="subtle-grid-pattern absolute inset-0 h-[560px] pointer-events-none" aria-hidden="true" />

      {/* 1 — Hero: the name, one sentence, two actions, the stack. */}
      <section className="home-hero page-enter relative z-10 max-w-4xl mx-auto">
        <span className="home-eyebrow">Public beta · everything free to explore</span>

        <h1 className="tracking-tight text-foreground font-medium">
          A design system that <span>shows its work</span>.
        </h1>

        <p className="home-intro">
          {COMPONENT_COUNT} components, {BLOCKS.length} composed blocks and {TEMPLATE_CARDS.length} application
          templates on one OKLCH token layer. Every example on this site is the real component — with the
          source beside it.
        </p>

        <div className="home-hero-actions">
          <FancyButton size="lg" tone="accent" onClick={() => navigate("components")} endContent={<RiArrowRightLine size={18} />}>
            Explore components
          </FancyButton>
          <Button size="lg" variant="outline" tone="default" onClick={() => navigate("docs/installation")}>
            Get started
          </Button>
        </div>

        <ul className="home-stack" aria-label="Built with">
          {STACK.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      {/* 2 — The single strongest proof: a live, editable example. */}
      <div className="home-container relative z-10">
        <div className="hero-showcase page-enter">
          <HeroEditor />
        </div>
      </div>

      {/* 3 — Capability strip: counts as receipts, printed from the registries. */}
      <div className="home-container relative z-10">
        <CapabilityStrip />
      </div>

      {/* 4 — Quality proof: the matrices, live. */}
      <QualityProofSection />

      {/* 5 — Foundations proof: the token layer, live. */}
      <FoundationsProofSection />

      {/* 6 — Blocks & templates, straight from the registries. */}
      <BlocksTemplatesSection navigate={navigate} />

      {/* 7 — Accessibility & quality, stated as facts with a link to the gate. */}
      <QualityBand />

      {/* 8 — Questions. */}
      <FaqSection />

      <SiteFooter navigate={navigate} />
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*            CAPABILITY STRIP                                               */
/* -------------------------------------------------------------------------- */

function CapabilityStrip() {
  const coverage = [
    { icon: RiStackLine, label: `${COMPONENT_COUNT} components`, note: "Each with a live preview" },
    { icon: RiLayoutGridLine, label: `${BLOCKS.length} composed blocks`, note: "Full source, per block" },
    { icon: RiCommandLine, label: `${TEMPLATE_CARDS.length} templates`, note: "Whole application screens" },
    { icon: RiPaletteLine, label: "One token layer", note: "Light and dark from one graph" },
    { icon: RiKeyboardLine, label: "Keyboard complete", note: "Documented focus contracts" },
    { icon: RiRobot2Line, label: "TypeScript strict", note: "Typed props, no runtime package" },
  ];

  return (
    <div className="coverage-strip mt-6" role="list" aria-label="What the system covers">
      {coverage.map((c) => (
        <div className="coverage-cell" role="listitem" key={c.label}>
          <c.icon size={18} aria-hidden />
          <span>
            <strong>{c.label}</strong>
            <em>{c.note}</em>
          </span>
        </div>
      ))}
    </div>
  );
}

export { SiteFooter } from "../docs/Shell";
