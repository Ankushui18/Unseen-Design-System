import { ArrowRight, Blocks, Check, Compass, Feather, Layers, Package, Ruler, ShieldCheck, Sparkles } from "lucide-react";
import { Callout, Grid, PageHeader, Section } from "../docs/Blocks";
import { CodeBlock } from "../docs/CodeBlock";
import { Button } from "../ui/Button";
import { Card, Chip, Code, Snippet } from "../ui/Display";
import { Accordion, Tabs } from "../ui/Navigation";
import { useState } from "react";

export function IntroductionPage({ navigate }: { navigate: (t: string) => void }) {
  return (
    <>
      <PageHeader
        eyebrow="Getting Started"
        title="Introduction"
        description="Aperture is a source-first React design-system preview. Explore the components, inspect their code, and tune the shared tokens to suit your product. Everything in the beta is free to evaluate."
        tags={["React 19", "Tailwind CSS v4", "TypeScript", "MIT"]}
      />

      <Section title="What you get">
        <Grid cols={2}>
          {[
            { i: Layers, t: "A token graph, not a stylesheet", d: "Primitive → semantic → component. Components only read semantics, so rebranding never means touching component code." },
            { i: Blocks, t: "Reusable interface components", d: "Buttons, form fields, navigation, overlays, and composed patterns, with documented APIs." },
            { i: ShieldCheck, t: "Interaction patterns", d: "Native controls, keyboard navigation, focus management, and reduced-motion preferences. Evaluate each example in your own application before production use." },
            { i: Feather, t: "CSS-driven styling", d: "Tailwind utilities and CSS variables provide the visual layer. React manages interactive state." },
          ].map((f) => (
            <Card key={f.t} className="p-5">
              <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface-secondary text-foreground ring-1 ring-border">
                <f.i className="h-4 w-4" />
              </span>
              <p className="text-label-md">{f.t}</p>
              <p className="mt-1.5 text-paragraph-sm text-muted">{f.d}</p>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section title="How it fits together" description="Three layers, one direction of dependency. Nothing reaches upward.">
        <CodeBlock
          filename="architecture.txt"
          code={`┌───────────────────────────────────────────────────────────┐
│  Your product                                              │
│  <Button tone="danger">Delete workspace</Button>           │
└───────────────┬───────────────────────────────────────────┘
                │ reads
┌───────────────▼───────────────────────────────────────────┐
│  Components  ·  48 React primitives, ARIA + keyboard       │
└───────────────┬───────────────────────────────────────────┘
                │ reads only
┌───────────────▼───────────────────────────────────────────┐
│  Semantic tokens  ·  --accent  --surface  --separator      │
└───────────────┬───────────────────────────────────────────┘
                │ resolves to
┌───────────────▼───────────────────────────────────────────┐
│  Primitives  ·  OKLCH ramps, spacing units, type scale     │
└───────────────────────────────────────────────────────────┘`}
        />
        <Callout title="The one rule">
          A component may never reference a primitive. If you find yourself writing <Code>bg-accent-600</Code> inside a
          component, the system is missing a semantic token — add it instead.
        </Callout>
      </Section>

      <Section title="Where to go next">
        <Grid cols={3}>
          {[
            { i: Package, t: "Installation", d: "Get running in two minutes.", to: "docs/installation" },
            { i: Compass, t: "Design Principles", d: "The rules behind the decisions.", to: "docs/principles" },
            { i: Ruler, t: "Color", d: "The semantic palette in depth.", to: "foundations/color" },
          ].map((c) => (
            <button key={c.t} onClick={() => navigate(c.to)} className="group rounded-2xl bg-surface ring-1 ring-border shadow-xs p-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-md hover:ring-border-strong">
              <c.i className="mb-3 h-4.5 w-4.5 text-accent" />
              <p className="flex items-center gap-1.5 text-label-md">
                {c.t}
                <ArrowRight className="h-3.5 w-3.5 text-subtle transition-transform group-hover:translate-x-0.5" />
              </p>
              <p className="mt-1 text-paragraph-sm text-muted">{c.d}</p>
            </button>
          ))}
        </Grid>
      </Section>
    </>
  );
}

export function InstallationPage({ navigate }: { navigate: (t: string) => void }) {
  const [pm, setPm] = useState("npm");
  const cmd = { npm: "npm install @aperture/react", pnpm: "pnpm add @aperture/react", yarn: "yarn add @aperture/react", bun: "bun add @aperture/react" }[pm]!;

  return (
    <>
      <PageHeader
        eyebrow="Getting Started"
        title="Installation"
        description="Aperture ships as a single ESM package plus one stylesheet. There is no Tailwind plugin, no PostCSS config and no build step to wire up."
        tags={["2 minutes", "No config"]}
      />

      <Section title="1 · Install the package">
        <Tabs
          variant="segment"
          size="sm"
          value={pm}
          onChange={setPm}
          items={[{ key: "npm", label: "npm" }, { key: "pnpm", label: "pnpm" }, { key: "yarn", label: "yarn" }, { key: "bun", label: "bun" }]}
        />
        <Snippet>{cmd}</Snippet>
        <p className="text-paragraph-sm text-muted">
          Peer dependencies: <Code>react@≥18</Code>, <Code>react-dom@≥18</Code> and <Code>tailwindcss@≥4</Code>.
        </p>
      </Section>

      <Section title="2 · Import the stylesheet" description="One import brings in the token layer and the Tailwind bridge. Order matters — Aperture must come after the Tailwind import.">
        <CodeBlock
          filename="src/index.css"
          code={`@import "tailwindcss";
@import "@aperture/react/styles.css";

/* optional: your brand overrides */
:root {
  --accent-h: 262;
  --accent-c: 0.19;
  --radius-scale: 1;
}`}
        />
      </Section>

      <Section title="3 · Wrap your app" description="The provider handles color-mode persistence, toast portals and the reduced-motion listener.">
        <CodeBlock
          filename="src/main.tsx"
          code={`import { ApertureProvider } from "@aperture/react";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <ApertureProvider defaultMode="system">
    <App />
  </ApertureProvider>,
);`}
        />
      </Section>

      <Section title="4 · Use a component">
        <CodeBlock
          filename="src/App.tsx"
          code={`import { Button, Card, CardHeader, CardBody, Chip } from "@aperture/react";

export default function App() {
  return (
    <Card elevation={2}>
      <CardHeader>
        <h2 className="text-paragraph-md font-medium">Deploy preview</h2>
        <Chip tone="success" dot>Ready</Chip>
      </CardHeader>
      <CardBody>Built in 42s · 1.2 MB transferred</CardBody>
      <CardFooter>
        <Button tone="accent">Promote to production</Button>
      </CardFooter>
    </Card>
  );
}`}
        />
        <Callout tone="success" title="That's the whole setup">
          No <Code>tailwind.config.js</Code> edits, no content globbing, no plugin array. Aperture's utilities are
          emitted from the package's own CSS layer.
        </Callout>
      </Section>

      <Section title="Framework notes">
        <Accordion
          variant="split"
          multiple
          defaultOpen={["next"]}
          items={[
            { key: "next", title: "Next.js (App Router)", subtitle: "RSC compatible", content: <>Import the stylesheet in <Code>app/globals.css</Code> and place <Code>&lt;ApertureProvider&gt;</Code> in your root layout. Interactive components are marked <Code>"use client"</Code> at the package level, so server components can import them directly without a wrapper.</> },
            { key: "vite", title: "Vite", subtitle: "Recommended", content: <>Add <Code>@tailwindcss/vite</Code> to your plugins and import the stylesheet from <Code>src/index.css</Code>. Hot module replacement picks up token changes without a full reload.</> },
            { key: "remix", title: "Remix / React Router", content: <>Export the stylesheet from your root <Code>links()</Code> function. Use the <Code>cookie</Code> mode strategy so the server renders the correct color mode and avoids a flash.</> },
            { key: "astro", title: "Astro", content: <>Install the React integration, then hydrate interactive islands with <Code>client:idle</Code>. Static components such as Card and Chip need no hydration at all.</> },
          ]}
        />
      </Section>

      <Section title="Next steps">
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => navigate("components/button")} endContent={<ArrowRight className="h-4 w-4" />}>Explore components</Button>
          <Button variant="outline" tone="default" onClick={() => navigate("theme")} startContent={<Sparkles className="h-4 w-4" />}>Open Theme Studio</Button>
        </div>
      </Section>
    </>
  );
}

const PRINCIPLES = [
  { n: "01", t: "Semantics over appearance", d: "Name things by what they mean, not what they look like. `--danger` survives a rebrand; `--red-500` does not. Every token, variant and prop in Aperture is named for intent.", e: "tone=\"danger\"  not  color=\"red\"" },
  { n: "02", t: "Constrain, then allow escape", d: "A system earns trust by saying no. Five elevations, nine type steps, one accent. When a product genuinely needs more, component-level tokens provide a documented escape hatch rather than a fork.", e: "--button-bg: var(--brand-gradient)" },
  { n: "03", t: "Accessible by construction", d: "Contrast, focus order and ARIA are decided when the component is designed, not audited afterwards. If a variant cannot pass AA, the variant does not ship.", e: "focus-visible:outline-2 outline-accent" },
  { n: "04", t: "Motion must explain", d: "Animation communicates causality and continuity. If removing an animation loses no information, remove it. Nothing exceeds 400ms and everything degrades under reduced motion.", e: "transition duration-150 ease-out-quint" },
  { n: "05", t: "Composition over configuration", d: "Prefer slots and children to a growing prop surface. A component with 30 props is a component that should have been three components.", e: "<Card><CardHeader/><CardBody/></Card>" },
  { n: "06", t: "Predictable, boring APIs", d: "The same prop means the same thing everywhere: `tone`, `variant`, `size`, `radius`. Learning one component should teach you the next forty-seven.", e: "size=\"sm\" | \"md\" | \"lg\"" },
];

export function PrinciplesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Getting Started"
        title="Design Principles"
        description="Six rules that decide every argument. When two options both look fine, the principle higher on this list wins."
        tags={["Opinionated", "Enforced in review"]}
      />
      <Section title="The principles">
        <div className="space-y-3">
          {PRINCIPLES.map((p) => (
            <Card key={p.n} className="flex gap-5 p-5">
              <span className="font-mono text-label-sm text-accent">{p.n}</span>
              <div className="min-w-0">
                <h3 className="text-paragraph-md font-medium tracking-[-0.01em]">{p.t}</h3>
                <p className="mt-1.5 text-paragraph-sm text-muted">{p.d}</p>
                <code className="mt-3 block w-fit rounded-md bg-background-secondary px-2.5 py-1.5 font-mono text-paragraph-xs text-[var(--syn-attr)]">{p.e}</code>
              </div>
            </Card>
          ))}
        </div>
      </Section>
      <Section title="Applying them" description="A quick test before adding anything to the system.">
        <Grid cols={2}>
          {[
            "Can this be expressed with an existing token?",
            "Does the name describe intent rather than appearance?",
            "Does it pass AA contrast in both color modes?",
            "Is it operable with a keyboard alone?",
            "Would removing the animation lose information?",
            "Could composition replace this new prop?",
          ].map((q) => (
            <div key={q} className="flex items-start gap-2.5 rounded-xl bg-surface p-3.5 ring-1 ring-border">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span className="text-paragraph-sm text-muted">{q}</span>
            </div>
          ))}
        </Grid>
      </Section>
    </>
  );
}

const RELEASES = [
  {
    v: "3.2.0", d: "Feb 2026", tag: "Latest" as const,
    items: [
      ["added", "Theme Studio with live token editing and CSS export"],
      ["added", "Toast, Drawer, Command Palette and Scroll Shadow components"],
      ["added", "OKLCH ramp generator — accent palettes derive from hue + chroma"],
      ["changed", "Table gains sticky headers, striped rows and empty states"],
      ["fixed", "Focus ring clipping inside overflow-hidden containers"],
    ],
  },
  {
    v: "3.1.0", d: "Dec 2025",
    items: [
      ["added", "`soft` variant across Button, Chip, Alert and Badge"],
      ["changed", "Radius tokens now multiply through `--radius-scale`"],
      ["removed", "Legacy `content1–4` surface tokens (use `--surface-*`)"],
    ],
  },
  {
    v: "3.0.0", d: "Oct 2025", tag: "Major" as const,
    items: [
      ["added", "Tailwind CSS v4 native theme bridge via `@theme inline`"],
      ["changed", "`primary` renamed to `accent` throughout the system"],
      ["changed", "All colors migrated from HSL to OKLCH"],
      ["removed", "Runtime style engine — styling is now fully static"],
    ],
  },
];

export function ChangelogPage() {
  const badge = { added: "success", changed: "accent", removed: "danger", fixed: "warning" } as const;
  return (
    <>
      <PageHeader eyebrow="Getting Started" title="Changelog" description="Aperture follows semantic versioning. Breaking changes only land in major releases and always ship with a codemod." tags={["SemVer", "Codemods"]} />
      <Section title="Releases">
        <div className="space-y-8">
          {RELEASES.map((r) => (
            <div key={r.v} className="relative border-l border-separator pl-6">
              <span className="absolute top-1.5 -left-[5px] h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-background" />
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="font-mono text-label-md">v{r.v}</h3>
                <span className="text-paragraph-xs text-subtle">{r.d}</span>
                {r.tag && <Chip size="sm" tone={r.tag === "Latest" ? "success" : "accent"}>{r.tag}</Chip>}
              </div>
              <ul className="mt-3 space-y-2">
                {r.items.map(([k, text]) => (
                  <li key={text} className="flex items-start gap-2.5">
                    <Chip size="sm" tone={badge[k as keyof typeof badge]} variant="soft" className="mt-px w-[68px] justify-center capitalize">{k}</Chip>
                    <span className="text-paragraph-sm text-muted">{text}</span>
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
