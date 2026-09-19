import { useState } from "react";
import { RiAddLine, RiArrowRightLine, RiDeleteBinLine, RiDownloadLine, RiSaveLine } from "@remixicon/react";
import { ControlLabel, Import, OptionPicker, PageHeader, PropsTable, Section, Showcase } from "../../docs/Blocks";
import { CodeBlock } from "../../docs/CodeBlock";
import { Playground } from "../../docs/Playground";
import { useHashParams } from "../../lib/hooks";
import buttonSource from "../../ui/Button.tsx?raw";
import {
  Button,
  resolveButtonVocabulary,
  sizeLabels,
  sizePixels,
  toneLabels,
  variantLabels,
  type Mode,
  type Size,
  type Tone,
  type Variant,
} from "../../ui/Button";
import { Input } from "../../ui/Form";

/* Canonical axes — the docs render from these arrays, never from hand-written lists
 * (COMPONENT-QUALITY-SPEC.md §4.2/§8). */
const TONES: Tone[] = ["accent", "default", "success", "warning", "danger"];
const VARIANTS: Variant[] = ["solid", "soft", "outline", "ghost", "link"];
const SIZES: Size[] = ["xxs", "xs", "sm", "md", "lg"];
const MODES: Mode[] = ["filled", "stroke", "lighter", "ghost"];
const ICONS = ["none", "leading", "trailing", "both", "only"] as const;
const STATES = ["default", "loading", "disabled"] as const;
const VOCABS = ["canonical", "alias"] as const;

type IconChoice = (typeof ICONS)[number];
type StateChoice = (typeof STATES)[number];
type VocabChoice = (typeof VOCABS)[number];

/** Display vocabulary for the mode picker (spec §3.2). */
const modeLabels: Record<Mode, string> = { filled: "Filled", stroke: "Stroke", lighter: "Lighter", ghost: "Ghost" };

const one = <T extends string>(v: string | null, allowed: readonly T[], fallback: T): T =>
  (allowed as readonly string[]).includes(v ?? "") ? (v as T) : fallback;

/* ------------------------------- Playground ------------------------------- */

function ButtonPlayground() {
  const [params, setParams] = useHashParams();
  const [tone, setTone] = useState<Tone>(() => one(params.get("tone"), TONES, "accent"));
  const [mode, setMode] = useState<Mode>(() => one(params.get("mode"), MODES, "filled"));
  const [size, setSize] = useState<Size>(() => one(params.get("size"), SIZES, "md"));
  const [icon, setIcon] = useState<IconChoice>(() => one(params.get("icon"), ICONS, "trailing"));
  const [state, setState] = useState<StateChoice>(() => one(params.get("state"), STATES, "default"));
  const [vocab, setVocab] = useState<VocabChoice>(() => one(params.get("vocab"), VOCABS, "canonical"));
  const [label, setLabel] = useState("Continue");

  /* Controls ↔ code are one state: the URL mirrors only non-defaults so a clean
   * link stays short and a shared link reproduces the exact example (IA §5.4). */
  const update = (patch: Record<string, string | undefined>) => setParams(patch);

  const resolved = resolveButtonVocabulary({ tone, mode, size });

  /* The code is generated from the controls, so every control is expressible and
   * every prop in the code is reachable by a control (IA §5.3.1). */
  const intentAlias = (t: Tone): string =>
    t === "accent" ? "primary" : t === "default" ? "secondary" : t === "danger" ? "destructive" : t;

  /* the live preview renders from `code`, so the sample props are derived from the same axes */
  const attrs: string[] = [];
  attrs.push(vocab === "canonical" ? `tone="${tone}"` : `variant="${intentAlias(tone)}"`);
  attrs.push(vocab === "canonical" ? `variant="${resolved.variant}"` : `mode="${mode}"`);
  attrs.push(`size="${size}"`);
  if (icon === "leading" || icon === "both") attrs.push("startContent={<RiArrowRightLine />}");
  if (icon === "trailing" || icon === "both") attrs.push("endContent={<RiArrowRightLine />}");
  if (icon === "only") { attrs.push("iconOnly"); attrs.push(`aria-label="${label}"`); }
  if (state === "loading") attrs.push("loading");
  if (state === "disabled") attrs.push("disabled");

  const code = `<Button\n  ${attrs.join("\n  ")}\n>\n  ${icon === "only" ? "<RiArrowRightLine />" : label}\n</Button>`;


  return (
    <Playground
      id="playground-live"
      code={code}
      scope={{ Button, RiArrowRightLine }}
      imports={`import { Button } from "@unseen/ui";\nimport { RiArrowRightLine } from "@remixicon/react";`}
      onReset={() => {
        setTone("accent"); setMode("filled"); setSize("md"); setIcon("trailing"); setState("default"); setVocab("canonical"); setLabel("Continue");
        update({ tone: undefined, mode: undefined, size: undefined, icon: undefined, state: undefined, vocab: undefined });
      }}
      description="Controls and code are one state — change a control, edit the code, copy what you see. This link is deep-linkable."
      controls={
        <>
          <div>
            <ControlLabel>Label</ControlLabel>
            <Input size="sm" aria-label="Button label" value={label} onChange={(e) => setLabel(e.target.value)} />
          </div>
          <OptionPicker wrap label="Tone / intent" value={tone} options={TONES} labels={toneLabels}
            onChange={(v) => { setTone(v); update({ tone: v === "accent" ? undefined : v }); }} />
          <OptionPicker wrap label="Variant / mode" value={mode} options={MODES} labels={modeLabels}
            onChange={(v) => { setMode(v); update({ mode: v === "filled" ? undefined : v }); }} />
          <OptionPicker wrap label="Size" value={size} options={SIZES} labels={sizeLabels}
            onChange={(v) => { setSize(v); update({ size: v === "md" ? undefined : v }); }} />
          <OptionPicker wrap label="Content" value={icon} options={ICONS}
            onChange={(v) => { setIcon(v); update({ icon: v === "trailing" ? undefined : v }); }} />
          <OptionPicker wrap label="State" value={state} options={STATES}
            onChange={(v) => { setState(v); update({ state: v === "default" ? undefined : v }); }} />
          <OptionPicker wrap label="Vocabulary" value={vocab} options={VOCABS}
            labels={{ canonical: "tone + variant", alias: "variant + mode" }}
            onChange={(v) => { setVocab(v); update({ vocab: v === "canonical" ? undefined : v }); }} />
          <p className="text-paragraph-xs text-subtle">
            Same component, both vocabularies. Canonical is the API of record; the alias form is
            Display shorthand resolved by one mapping table (spec §3).
          </p>
        </>
      }
    />
  );
}

/* --------------------------------- Sections -------------------------------- */

export function ButtonPage() {
  const [loadingDemo, setLoadingDemo] = useState(false);

  return (
    <>
      <PageHeader
        eyebrow="Components · Actions"
        title="Button"
        description="The base action. Five intents, five modes, five sizes and six states — with one canonical vocabulary and a display-alias layer on top of it. Regular buttons are flat; Fancy Button is the bevelled marketing CTA."
        tags={["5 intents · 5 modes", "XS 28 → XL 48", "icon · icon-only", "loading & disabled"]}
      />
      <Import names="Button" />

      <Section title="Playground" description="Every control regenerates the code; the code is editable and the preview follows. State lives in the URL.">
        <ButtonPlayground />
      </Section>

      <Section
        title="Variants"
        description="The full intent × mode matrix, rendered from the same axis arrays the component declares — 25 cells, none of them a no-op. Display names are shown, canonical props are copied."
      >
        <Showcase align="stretch">
          <div className="grid gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className="w-24 text-subheading-2xs uppercase text-subtle">Intent \ Mode</span>
              {VARIANTS.map((v) => (
                <span key={v} className="min-w-24 text-label-xs text-muted">{variantLabels[v]}</span>
              ))}
            </div>
            {TONES.map((t) => (
              <div key={t} className="flex flex-wrap items-center gap-3">
                <span className="w-24 text-label-xs text-foreground">{toneLabels[t]}</span>
                {VARIANTS.map((v) => (
                  <span key={v} className="min-w-24">
                    <Button tone={t} variant={v} size="sm" className="w-full">
                      {toneLabels[t]}
                    </Button>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </Showcase>
      </Section>

      <Section title="Sizes" description="Five sizes, 1:1 with the size scale. Labels are the display vocabulary; the props are the canonical values.">
        <Showcase align="stretch">
          <div className="flex flex-wrap items-end gap-4">
            {SIZES.map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <Button size={s} endContent={<RiArrowRightLine />}>{sizeLabels[s]}</Button>
                <span className="font-mono text-paragraph-xs text-subtle">{s} · {sizePixels[s]}px</span>
              </div>
            ))}
          </div>
        </Showcase>
      </Section>

      <Section
        title="States"
        description="Hover and focus are live, not screenshots — hover the row and press Tab. Disabled uses the weak fill and disabled text; loading keeps the surface size and announces aria-busy."
      >
        <Showcase align="stretch">
          <div className="grid w-full gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {[
              { caption: "Default", node: <Button>Continue</Button> },
              { caption: "Hover — hover it", node: <Button>Continue</Button> },
              { caption: "Focus — press Tab", node: <Button>Continue</Button> },
              { caption: "Disabled", node: <Button disabled>Continue</Button> },
              { caption: "Loading — aria-busy", node: <Button loading>Saving…</Button> },
            ].map(({ caption, node }) => (
              <div key={caption} className="flex flex-col items-start gap-2 rounded-12 bg-surface-secondary/60 p-3 ring-1 ring-border">
                {node}
                <span className="font-mono text-paragraph-xs text-subtle">{caption}</span>
              </div>
            ))}
          </div>
        </Showcase>
        <div className="mt-4 grid gap-2">
          <Button
            variant="soft"
            tone="accent"
            size="sm"
            className="w-fit"
            onClick={() => setLoadingDemo((v) => !v)}
          >
            {loadingDemo ? "Cancel the request" : "Trigger a real loading state"}
          </Button>
          <div className="flex items-center gap-3">
            <Button loading={loadingDemo} tone="accent">Save changes</Button>
            <span className="text-paragraph-xs text-subtle">
              {loadingDemo ? "aria-busy=\"true\", disabled semantics, same surface size" : "idle — no layout shift when loading starts"}
            </span>
          </div>
        </div>
      </Section>

      <Section title="With icons" description="Text · leading · trailing · both · icon-only. Icon-only always carries an accessible name.">
        <Showcase
          align="stretch"
          code={`<Button>Continue</Button>\n<Button startContent={<RiSaveLine />}>Save</Button>\n<Button endContent={<RiArrowRightLine />}>Next</Button>\n<Button startContent={<RiDownloadLine />} endContent={<RiArrowRightLine />}>Export</Button>\n<Button iconOnly aria-label="Add item"><RiAddLine /></Button>`}
        >
          <Button>Continue</Button>
          <Button tone="default" startContent={<RiSaveLine />}>Save</Button>
          <Button tone="accent" endContent={<RiArrowRightLine />}>Next</Button>
          <Button tone="default" startContent={<RiDownloadLine />} endContent={<RiArrowRightLine />}>Export</Button>
          <Button tone="default" iconOnly aria-label="Add item"><RiAddLine /></Button>
          <Button tone="danger" iconOnly aria-label="Delete"><RiDeleteBinLine /></Button>
        </Showcase>
      </Section>

      <Section title="Composition" description="Real assemblies, built only from Unseen components.">
        <Showcase align="stretch" code={`<Button variant="ghost" tone="default">Cancel</Button>\n<Button tone="accent" endContent={<RiArrowRightLine />}>Create workspace</Button>`}>
          <div className="grid w-full gap-6">
            <div className="flex flex-wrap items-center justify-end gap-3 border-b border-separator pb-4">
              <Button variant="ghost" tone="default">Cancel</Button>
              <Button tone="accent" endContent={<RiArrowRightLine />}>Create workspace</Button>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-3 border-b border-separator pb-4">
              <Button variant="soft" tone="default">Keep plan</Button>
              <Button tone="danger" startContent={<RiDeleteBinLine />}>Delete workspace</Button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm" tone="default" iconOnly aria-label="Add"><RiAddLine /></Button>
              <Button size="sm" tone="default" iconOnly aria-label="Export"><RiDownloadLine /></Button>
              <Button size="sm" tone="default" iconOnly aria-label="Delete"><RiDeleteBinLine /></Button>
            </div>
          </div>
        </Showcase>
      </Section>

      <Section title="Accessibility" description="Facts, not prose.">
        <div className="grid gap-3">
          {[
            ["Keyboard", "Enter and Space activate. Every button is reachable in DOM order and the focus ring (shadow-ring-*) is visible on both themes."],
            ["Link form", "With href, the button renders an <a> — Enter follows it, and the accessible name is the link text. asChild forwards the styles to a router link and keeps the child's semantics."],
            ["Icon-only", "Requires an accessible name via aria-label (shown in every icon-only example above). axe fails the route otherwise."],
            ["Loading", "Sets aria-busy=\"true\" and disables activation without changing the surface size; the label stays readable."],
            ["Disabled", "Real disabled semantics, removed from the tab order, weak fill + disabled text rather than opacity — and never the only signal of an error."],
            ["Motion", "Press feedback is token-driven and suppressed under prefers-reduced-motion."],
            ["Contrast", "All 25 intent × mode cells are axe-clean in light and dark; the colour-contrast rule runs in the real-browser gate."],
          ].map(([k, v]) => (
            <div key={k} className="grid gap-1 border-b border-separator pb-3 last:border-0 sm:grid-cols-[160px_1fr]">
              <span className="text-label-sm">{k}</span>
              <span className="text-paragraph-sm text-muted">{v}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="API" description="Complete props table. Aliases resolve through one mapping table; precedence is canonical prop → alias prop → shorthand inside variant.">
        <PropsTable
          rows={[
            { name: "tone", type: '"accent" | "default" | "success" | "warning" | "danger"', default: '"accent"', description: "Canonical intent. Display: Primary · Secondary · Success · Warning · Destructive." },
            { name: "variant", type: '"solid" | "soft" | "outline" | "ghost" | "link" | IntentAlias', default: '"solid"', description: "Canonical mode, and also accepts the intent shorthand (primary, destructive, …). Display: Filled · Lighter · Stroke · Ghost · Link." },
            { name: "mode", type: '"filled" | "stroke" | "lighter" | "ghost"', description: "Display alias for the mode axis. Wins over a shorthand passed to variant; loses to variant itself." },
            { name: "color", type: "Tone", description: "Alias for tone (kept for compatibility). Precedence: tone → color → shorthand inside variant." },
            { name: "size", type: '"xxs" | "xs" | "sm" | "md" | "lg"', default: '"md"', description: "28 · 32 · 36 · 40 · 48px. Display: XS · SM · MD · LG · XL." },
            { name: "startContent / endContent", type: "ReactNode", description: "20px icon slots, pulled in by −4px with a 12px gap." },
            { name: "iconOnly", type: "boolean", default: "false", description: "Square control; the child becomes the icon, and an aria-label is required." },
            { name: "loading", type: "boolean", default: "false", description: "Swaps the leading slot for a spinner, sets aria-busy, blocks activation." },
            { name: "disabled / isDisabled", type: "boolean", default: "false", description: "Disabled semantics with the weak fill; removed from the tab order." },
            { name: "asChild", type: "boolean", default: "false", description: "Forwards styles and props to the single child element (router links)." },
            { name: "href, target, rel", type: "string", description: "Renders an anchor instead of a button." },
            { name: "fullWidth", type: "boolean", default: "false", description: "Fills the container width." },
          ]}
        />
      </Section>

      <Section title="Source" description="Full source, copyable. The vocabulary mapping lives in the component's module — never duplicated in docs.">
        <CodeBlock code={buttonSource} language="tsx" filename="Button.tsx" maxHeight={520} />
      </Section>
    </>
  );
}
