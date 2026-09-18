import { useState } from "react";
import { Callout, OptionPicker, Import, PageHeader, PropsTable, Section, Showcase } from "../../docs/Blocks";
import { Button, FancyButton } from "../../ui/Button";
import { Card } from "../../ui/Display";
import { Input } from "../../ui/Form";
import {
  Banner,
  CompactButton,
  Datepicker,
  DigitInput,
  DotStepper,
  FileFormatIcon,
  Hint,
  HorizontalStepper,
  Label,
  LinkButton,
  Notification,
  SegmentedControl,
  SocialButton,
  StatusBadge,
  Tag,
  VerticalStepper,
} from "../../ui/Extra";
import { RiAddLine, RiArrowRightLine, RiCalendarLine, RiCheckLine, RiCloseLine, RiErrorWarningLine, RiExternalLinkLine, RiFileCopyLine, RiLayoutGridLine, RiListUnordered, RiMoreLine, RiNotification3Line, RiPencilLine, RiStarLine, RiTableLine } from "@remixicon/react";

/* --------------------------- Fancy / Compact / Link -------------------------- */

export function FancyButtonDoc() {
  return (
    <>
      <PageHeader eyebrow="Components · Actions" title="Fancy Button" description="The bevelled primary action. A subtle inner highlight, a one-pixel ring shadow and a soft drop give it physical presence without gradients that fight your brand." tags={["Bevel", "6 tones", "Focus ring"]} />
      <Import names="FancyButton" />
      <Section title="Tones" description="All five intents plus the etched stroke treatment. The neutral tone renders as the signature black button; success and warning carry their own bevel shadows.">
        <Showcase code={`<FancyButton tone="accent">Primary</FancyButton>
<FancyButton tone="default">Neutral</FancyButton>
<FancyButton tone="success">Success</FancyButton>
<FancyButton tone="warning">Warning</FancyButton>
<FancyButton tone="danger">Destructive</FancyButton>
<FancyButton tone="stroke">Stroke</FancyButton>`}>
          <FancyButton>Primary</FancyButton>
          <FancyButton tone="default">Neutral</FancyButton>
          <FancyButton tone="success" startContent={<RiCheckLine />}>Success</FancyButton>
          <FancyButton tone="warning">Warning</FancyButton>
          <FancyButton tone="danger">Destructive</FancyButton>
          <FancyButton tone="stroke">Stroke</FancyButton>
        </Showcase>
      </Section>
      <Section title="Stroke" description="The white counterpart uses a hairline ring and a faint drop so it reads as a button on any surface.">
        <Showcase>
          <Button variant="outline" tone="default">Stroke</Button>
          <Button variant="outline" tone="default" startContent={<RiAddLine />}>Add member</Button>
          <Button variant="outline" tone="default" iconOnly aria-label="More"><RiMoreLine /></Button>
          <Button variant="outline" tone="accent">Accent stroke</Button>
          <Button variant="outline" tone="danger">Danger stroke</Button>
        </Showcase>
      </Section>
      <Section title="Anatomy">
        <Card className="p-5">
          <ul className="grid gap-3 text-paragraph-sm text-muted sm:grid-cols-2">
            <li><span className="text-label-sm text-foreground">Highlight</span> — 20% → 0% white gradient painted beneath the label.</li>
            <li><span className="text-label-sm text-foreground">Ring</span> — 1px spread shadow in the button's own color for crisp edges.</li>
            <li><span className="text-label-sm text-foreground">Drop</span> — <code className="font-mono text-paragraph-xs">0 1px 2px rgb(14 18 27 / .24)</code>.</li>
            <li><span className="text-label-sm text-foreground">Focus</span> — double ring: 2px background gap, 4px tinted halo.</li>
          </ul>
        </Card>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "tone", type: '"accent" | "default" | "success" | "warning" | "danger" | "stroke"', default: '"accent"', description: "Bevel-filled treatments; `stroke` is the etched outline look." },
          { name: "size", type: '"xxs" | "xs" | "sm" | "md" | "lg"', default: '"md"', description: "Same height ladder as Button." },
          { name: "loading", type: "boolean", default: "false", description: "Spinner in place of the content." },
          { name: "iconOnly", type: "boolean", default: "false", description: "Square icon button — give it an accessible name." },
          { name: "startContent / endContent", type: "ReactNode", description: "Icon slot before / after the label." },
          { name: "asChild / href", type: "boolean / string", description: "Inherits the rest of the Button contract: renders as the child element or an anchor, styles merged." },
        ]} />
      </Section>
    </>
  );
}

export function CompactButtonDoc() {
  return (
    <>
      <PageHeader eyebrow="Components · Actions" title="Compact Button" description="A tiny icon-only control for dense contexts: table rows, card corners, chips and dismiss actions." tags={["3 sizes", "3 variants", "5 tones"]} />
      <Import names="CompactButton" />
      <Section title="Variants">
        <Showcase code={`<CompactButton variant="stroke"><X /></CompactButton>
<CompactButton variant="ghost" fullRadius><Pencil /></CompactButton>`}>
          {(["stroke", "ghost", "white"] as const).map((v) => (
            <div key={v} className="flex items-center gap-3">
              <span className="w-12 font-mono text-[11px] text-subtle">{v}</span>
              <CompactButton variant={v} size="sm" aria-label="Close"><RiCloseLine /></CompactButton>
              <CompactButton variant={v} aria-label="Edit"><RiPencilLine /></CompactButton>
              <CompactButton variant={v} size="lg" aria-label="More"><RiMoreLine /></CompactButton>
              <CompactButton variant={v} fullRadius aria-label="Add"><RiAddLine /></CompactButton>
            </div>
          ))}
        </Showcase>
      </Section>
      <Section title="Tones" description="Optional intent colouring for the glyph — destructive row actions, success confirmations and accent shortcuts without a full button.">
        <Showcase code={`<CompactButton tone="danger" aria-label="Delete"><Trash /></CompactButton>
<CompactButton tone="success" aria-label="Done"><Check /></CompactButton>`}>
          <div className="flex items-center gap-3">
            <span className="w-12 font-mono text-[11px] text-subtle">none</span>
            <CompactButton size="sm" aria-label="Close"><RiCloseLine /></CompactButton>
            <CompactButton aria-label="Edit"><RiPencilLine /></CompactButton>
            <CompactButton size="lg" aria-label="More"><RiMoreLine /></CompactButton>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-12 font-mono text-[11px] text-subtle">accent</span>
            <CompactButton tone="accent" size="sm" aria-label="Close"><RiCloseLine /></CompactButton>
            <CompactButton tone="accent" aria-label="Edit"><RiPencilLine /></CompactButton>
            <CompactButton tone="accent" size="lg" aria-label="More"><RiMoreLine /></CompactButton>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-12 font-mono text-[11px] text-subtle">success</span>
            <CompactButton tone="success" size="sm" aria-label="Done"><RiCheckLine /></CompactButton>
            <CompactButton tone="success" aria-label="Done"><RiCheckLine /></CompactButton>
            <CompactButton tone="success" size="lg" aria-label="Done"><RiCheckLine /></CompactButton>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-12 font-mono text-[11px] text-subtle">warning</span>
            <CompactButton tone="warning" size="sm" aria-label="Flag"><RiErrorWarningLine /></CompactButton>
            <CompactButton tone="warning" aria-label="Flag"><RiErrorWarningLine /></CompactButton>
            <CompactButton tone="warning" size="lg" aria-label="Flag"><RiErrorWarningLine /></CompactButton>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-12 font-mono text-[11px] text-subtle">danger</span>
            <CompactButton tone="danger" size="sm" aria-label="Delete"><RiCloseLine /></CompactButton>
            <CompactButton tone="danger" aria-label="Delete"><RiCloseLine /></CompactButton>
            <CompactButton tone="danger" size="lg" aria-label="Delete"><RiCloseLine /></CompactButton>
          </div>
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "variant", type: '"stroke" | "ghost" | "white"', default: '"stroke"', description: "Surface treatment." },
          { name: "tone", type: "Tone", description: "Optional intent colour for the glyph; overrides the variant text colour." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "20, 24 or 28px square." },
          { name: "fullRadius", type: "boolean", default: "false", description: "Circular instead of rounded square." },
        ]} />
      </Section>
    </>
  );
}

export function LinkButtonDoc() {
  return (
    <>
      <PageHeader eyebrow="Components · Actions" title="Link Button" description="A text-only action that behaves like a button but reads like a link. Used inline in copy, in form headers and as tertiary actions." tags={["5 tones", "3 sizes", "Inline"]} />
      <Import names="LinkButton" />
      <Section title="Tones">
        <Showcase code={`<LinkButton tone="accent" endContent={<ArrowRight />}>Learn more</LinkButton>`}>
          <LinkButton tone="accent">Accent</LinkButton>
          <LinkButton tone="default">Default</LinkButton>
          <LinkButton tone="success">Success</LinkButton>
          <LinkButton tone="warning">Warning</LinkButton>
          <LinkButton tone="danger">Danger</LinkButton>
          <LinkButton tone="accent" underline>Underlined</LinkButton>
          <LinkButton tone="default" endContent={<RiArrowRightLine />}>Learn more</LinkButton>
          <LinkButton tone="default" size="sm" startContent={<RiExternalLinkLine />}>Open docs</LinkButton>
          <LinkButton tone="accent" size="lg">Large</LinkButton>
        </Showcase>
      </Section>
      <Section title="Legacy variants" description="The original four named variants still work; `tone` is the canonical axis and wins when both are given.">
        <Showcase>
          <LinkButton variant="gray">Gray</LinkButton>
          <LinkButton variant="black">Black</LinkButton>
          <LinkButton variant="primary">Primary</LinkButton>
          <LinkButton variant="error">Error</LinkButton>
        </Showcase>
      </Section>
      <Section title="In context">
        <Showcase align="stretch">
          <div className="w-full max-w-sm space-y-1.5">
            <div className="flex w-full items-center justify-between gap-4">
              <Label htmlFor="pw">Password</Label>
              <LinkButton variant="gray" size="sm" className="ml-4 shrink-0">Forgot?</LinkButton>
            </div>
            <Input id="pw" type="password" placeholder="••••••••••" />
            <Hint>Must be at least 8 characters.</Hint>
          </div>
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "tone", type: "Tone", default: undefined, description: "Canonical intent axis; wins over `variant` when both are given." },
          { name: "variant", type: '"gray" | "black" | "primary" | "error"', default: '"gray"', description: "Legacy alias for tone; kept for compatibility." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Icon size follows (16 / 20 / 20px)." },
          { name: "underline", type: "boolean", default: "false", description: "Persistent underline for inline anchors." },
          { name: "startContent / endContent", type: "ReactNode", description: "Leading / trailing icon." },
        ]} />
      </Section>
    </>
  );
}

export function SocialButtonDoc() {
  return (
    <>
      <PageHeader eyebrow="Components · Actions" title="Social Button" description="Brand-accurate sign-in buttons. Brand mode uses the official fill; stroke mode keeps the glyph on a neutral surface for quieter layouts. Newer brands ship as monochrome marks that inherit the fill colour." tags={["9 brands", "Icon only"]} />
      <Import names="SocialButton" />
      <Section title="Brands">
        <Showcase code={`<SocialButton brand="google">Continue with Google</SocialButton>`}>
          <SocialButton brand="google">Continue with Google</SocialButton>
          <SocialButton brand="apple">Continue with Apple</SocialButton>
          <SocialButton brand="github">Continue with GitHub</SocialButton>
          <SocialButton brand="x">Continue with X</SocialButton>
          <SocialButton brand="microsoft">Continue with Microsoft</SocialButton>
          <SocialButton brand="linkedin">Continue with LinkedIn</SocialButton>
          <SocialButton brand="gitlab">Continue with GitLab</SocialButton>
          <SocialButton brand="bitbucket">Continue with Bitbucket</SocialButton>
          <SocialButton brand="slack">Continue with Slack</SocialButton>
        </Showcase>
      </Section>
      <Section title="Stroke & icon only">
        <Showcase>
          <SocialButton brand="google" mode="stroke">Google</SocialButton>
          <SocialButton brand="apple" mode="stroke">Apple</SocialButton>
          <div className="flex flex-wrap gap-2">
            {(["google", "apple", "github", "x", "microsoft", "linkedin", "gitlab", "bitbucket", "slack"] as const).map((b) => <SocialButton key={b} brand={b} mode="stroke" iconOnly aria-label={b} />)}
          </div>
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "brand", type: '"google" | "apple" | "github" | "x" | "microsoft" | "linkedin" | "gitlab" | "bitbucket" | "slack"', required: true, description: "Brand mark and brand fill." },
          { name: "mode", type: '"brand" | "stroke"', default: '"brand"', description: "Brand-colour fill or neutral outline." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "" },
          { name: "iconOnly", type: "boolean", default: "false", description: "Mark-only square button; labelled “Continue with <brand>” automatically." },
        ]} />
      </Section>
    </>
  );
}

/* ----------------------------- Status Badge / Tag --------------------------- */

export function StatusBadgeDoc() {
  return (
    <>
      <PageHeader eyebrow="Components · Data Display" title="Status Badge" description="A dot-led badge for lifecycle states. The dot carries the color; the label stays neutral so tables stay calm." tags={["5 states", "Stroke / light"]} />
      <Import names="StatusBadge" />
      <Section title="States">
        <Showcase code={`<StatusBadge status="completed">Completed</StatusBadge>`}>
          {(["completed", "pending", "failed", "disabled", "info"] as const).map((s) => <StatusBadge key={s} status={s} className="capitalize">{s}</StatusBadge>)}
        </Showcase>
        <Showcase>
          {(["completed", "pending", "failed", "disabled", "info"] as const).map((s) => <StatusBadge key={s} status={s} variant="light" className="capitalize">{s}</StatusBadge>)}
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "status", type: '"completed" | "pending" | "failed" | "disabled" | "info"', default: '"completed"', description: "Dot colour, and the tinted fill in the `light` variant." },
          { name: "variant", type: '"stroke" | "light"', default: '"stroke"', description: "Hairline outline or tinted soft fill." },
          { name: "size", type: '"sm" | "md"', default: '"md"', description: "" },
        ]} />
      </Section>
    </>
  );
}

export function TagDoc() {
  const [tags, setTags] = useState(["React", "Tailwind", "OKLCH", "Figma"]);
  const [active, setActive] = useState("All");
  return (
    <>
      <PageHeader eyebrow="Components · Data Display" title="Tag" description="Compact, removable labels for filters and multi-select values. Square corners distinguish tags from status chips." tags={["Removable", "Selectable"]} />
      <Import names="Tag" />
      <Section title="Removable">
        <Showcase code={`<Tag onRemove={() => remove(tag)}>{tag}</Tag>`}>
          {tags.map((t) => <Tag key={t} onRemove={() => setTags((s) => s.filter((x) => x !== t))}>{t}</Tag>)}
          {tags.length === 0 && <Button size="sm" variant="soft" onClick={() => setTags(["React", "Tailwind", "OKLCH", "Figma"])}>Reset</Button>}
        </Showcase>
      </Section>
      <Section title="Filter row">
        <Showcase>
          {["All", "Design", "Engineering", "Marketing"].map((t) => (
            <button key={t} onClick={() => setActive(t)}><Tag active={active === t} variant="gray">{t}</Tag></button>
          ))}
        </Showcase>
      </Section>
      <Section title="With icon">
        <Showcase>
          <Tag startContent={<RiStarLine />}>Starred</Tag>
          <Tag startContent={<RiNotification3Line />} variant="gray">Subscribed</Tag>
        </Showcase>
      </Section>
      <Section title="Tones" description="Tone colours the hairline variant; the gray filled variant stays neutral by design.">
        <Showcase code={`<Tag>Default</Tag>
<Tag tone="accent">Accent</Tag>
<Tag tone="success">Success</Tag>
<Tag tone="warning">Warning</Tag>
<Tag tone="danger">Danger</Tag>`}>
          <Tag>Default</Tag>
          <Tag tone="accent">Accent</Tag>
          <Tag tone="success">Success</Tag>
          <Tag tone="warning">Warning</Tag>
          <Tag tone="danger">Danger</Tag>
        </Showcase>
      </Section>
      <Section title="Sizes" description="sm fits inline copy, lg suits filter bars and empty-state prompts.">
        <Showcase code={`<Tag size="sm">Small</Tag>
<Tag size="md">Medium</Tag>
<Tag size="lg">Large</Tag>`}>
          <Tag size="sm">Small</Tag>
          <Tag size="md">Medium</Tag>
          <Tag size="lg">Large</Tag>
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "variant", type: '"stroke" | "gray"', default: '"stroke"', description: "Hairline outline or filled neutral." },
          { name: "tone", type: "Tone", description: "Colours the stroke variant's text and hairline; ignored by gray." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Height, corner radius and label size." },
          { name: "onRemove", type: "() => void", description: "Adds the × remove action." },
          { name: "startContent", type: "ReactNode", description: "Leading 14px icon." },
          { name: "active", type: "boolean", default: "false", description: "Selected / pressed tag state." },
        ]} />
      </Section>
    </>
  );
}

/* ----------------------------- Segmented Control ---------------------------- */

export function SegmentedDoc() {
  const [v, setV] = useState("list");
  const [p, setP] = useState("monthly");
  return (

    <>
      <PageHeader eyebrow="Components · Navigation" title="Segmented Control" description="A compact switch between two to five views. The active pill animates between segments." tags={["Animated", "Icons", "Full width"]} />
      <Import names="SegmentedControl" />
      <Section title="Usage">
        <Showcase code={`<SegmentedControl
  value={view}
  onChange={setView}
  items={[
    { value: "list", label: "List", icon: <List /> },
    { value: "grid", label: "Grid", icon: <Grid2x2 /> },
  ]}
/>`}>
          <SegmentedControl value={v} onChange={setV} items={[{ value: "list", label: "List", icon: <RiListUnordered /> }, { value: "grid", label: "Grid", icon: <RiLayoutGridLine /> }, { value: "table", label: "Table", icon: <RiTableLine /> }]} />
          <SegmentedControl value={v} onChange={setV} items={[{ value: "list", icon: <RiListUnordered /> }, { value: "grid", icon: <RiLayoutGridLine /> }, { value: "table", icon: <RiTableLine /> }]} />
        </Showcase>
      </Section>
      <Section title="Sizes & full width">
        <Showcase align="stretch">
          <div className="w-full max-w-md space-y-4">
            <SegmentedControl size="sm" value={p} onChange={setP} items={[{ value: "monthly", label: "Monthly" }, { value: "annual", label: "Annual" }]} />
            <SegmentedControl fullWidth value={p} onChange={setP} items={[{ value: "monthly", label: "Monthly" }, { value: "annual", label: "Annual" }, { value: "custom", label: "Custom", disabled: true }]} />
          </div>
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "value", type: "T", required: true, description: "Selected item value (controlled)." },
          { name: "onChange", type: "(v: T) => void", required: true, description: "" },
          { name: "items", type: "{ value: T; label?: ReactNode; icon?: ReactNode; disabled?: boolean }[]", required: true, description: "Label or icon per item." },
          { name: "size", type: '"sm" | "md"', default: '"md"', description: "" },
          { name: "fullWidth", type: "boolean", default: "false", description: "Stretches the items to fill the container." },
        ]} />
      </Section>
    </>
  );
}

/* ---------------------------------- Stepper -------------------------------- */

export function StepperDoc() {
  const [cur, setCur] = useState(1);
  const [dot, setDot] = useState(0);
  const steps = [
    { title: "Account", description: "Email and password" },
    { title: "Workspace", description: "Name and URL" },
    { title: "Invite team", description: "Optional" },
    { title: "Done" },
  ];
  return (
    <>
      <PageHeader eyebrow="Components · Navigation" title="Stepper" description="Horizontal, vertical and dot variants for multi-step flows. Completed steps turn green, the current step is fancy-accent, upcoming steps stay outlined." tags={["3 variants"]} />
      <Import names="HorizontalStepper, VerticalStepper, DotStepper" />
      <Section title="Horizontal">
        <Showcase align="stretch" controls={<div className="flex gap-2"><Button size="sm" variant="outline" tone="default" onClick={() => setCur((c) => Math.max(0, c - 1))}>Back</Button><Button size="sm" onClick={() => setCur((c) => Math.min(steps.length - 1, c + 1))}>Next</Button></div>} code={`<HorizontalStepper steps={steps} current={${cur}} />`}>
          <HorizontalStepper steps={steps} current={cur} />
        </Showcase>
      </Section>
      <Section title="Vertical">
        <Showcase align="start">
          <VerticalStepper steps={steps} current={cur} />
        </Showcase>
      </Section>
      <Section title="Dot">
        <Showcase code={`<DotStepper count={5} current={index} onChange={setIndex} />`}>
          <DotStepper count={5} current={dot} onChange={setDot} />
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "steps", type: "{ title: string; description?: string }[]", required: true, description: "Horizontal / Vertical Stepper only." },
          { name: "current", type: "number", required: true, description: "Active step index (0-based); completed steps render with the check state." },
          { name: "count / onChange", type: "number / (i: number) => void", description: "DotStepper only — interactive pagination dots." },
        ]} />
      </Section>
    </>
  );
}

/* -------------------------------- Digit Input ------------------------------- */

export function DigitInputDoc() {
  const [code, setCode] = useState("");
  const ok = code === "1234";
  return (
    <>
      <PageHeader eyebrow="Components · Forms" title="Digit Input" description="One-time-code entry with auto-advance, backspace navigation and paste support." tags={["OTP", "3 sizes", "Paste"]} />
      <Import names="DigitInput" />
      <Section title="Usage">
        <Showcase align="stretch" code={`<DigitInput length={4} value={code} onChange={setCode} />`}>
          <div className="mx-auto flex max-w-sm flex-col items-center gap-4 text-center">
            <p className="text-label-md text-foreground">Enter verification code</p>
            <p className="-mt-3 text-paragraph-sm text-muted">We sent a 4-digit code to +1 ••• ••• 4821. Try <code className="font-mono">1234</code>.</p>
            <DigitInput length={4} value={code} onChange={setCode} error={code.length === 4 && !ok} />
            {code.length === 4 && (ok ? <Hint tone="success">Code verified</Hint> : <Hint tone="error">Incorrect code, please try again</Hint>)}
            <LinkButton variant="gray" size="sm">Resend code</LinkButton>
          </div>
        </Showcase>
      </Section>
      <Section title="Sizes">
        <Showcase code={`<DigitInput size="sm" length={4} value={code} onChange={setCode} />`}>
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <span className="w-8 font-mono text-[11px] text-subtle">sm</span>
              <DigitInput size="sm" length={4} value={code} onChange={setCode} />
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 font-mono text-[11px] text-subtle">md</span>
              <DigitInput size="md" length={4} value={code} onChange={setCode} />
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 font-mono text-[11px] text-subtle">lg</span>
              <DigitInput size="lg" length={4} value={code} onChange={setCode} />
            </div>
          </div>
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "length", type: "number", default: "4", description: "Number of cells." },
          { name: "value", type: "string", required: true, description: "Controlled digits." },
          { name: "onChange", type: "(v: string) => void", required: true, description: "Fires on every cell change, paste and backspace." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Cell dimensions — 40, 48 or 56px." },
          { name: "error", type: "boolean", default: "false", description: "Danger ring for failed verification." },
        ]} />
      </Section>
    </>
  );
}

/* -------------------------------- Datepicker -------------------------------- */

export function DatepickerDoc() {
  const [d, setD] = useState<Date | null>(new Date());
  return (
    <>
      <PageHeader eyebrow="Components · Forms" title="Datepicker" description="A single-date calendar with month navigation and a Today shortcut. Selected dates use the fancy neutral button." tags={["Calendar", "Keyboard"]} />
      <Import names="Datepicker" />
      <Section title="Usage">
        <Showcase code={`<Datepicker value={date} onChange={setDate} />`}>
          <Datepicker value={d} onChange={setD} />
        </Showcase>
      </Section>
      <Section title="With input">
        <Showcase>
          <Input label="Start date" readOnly value={d ? d.toLocaleDateString() : ""} startContent={<RiCalendarLine />} wrapperClassName="w-60" />
        </Showcase>
      </Section>
      <Section title="Sizes">
        <Showcase code={`<Datepicker size="sm" value={date} onChange={setDate} />`}>
          <div className="flex flex-wrap gap-6">
            <Datepicker value={d} onChange={setD} />
            <Datepicker size="sm" value={d} onChange={setD} />
          </div>
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "value", type: "Date | null", required: true, description: "Selected date (controlled)." },
          { name: "onChange", type: "(d: Date) => void", required: true, description: "Fires when a day cell is chosen." },
          { name: "size", type: '"sm" | "md"', default: '"md"', description: "Compact 280px or standard 320px calendar." },
        ]} />
      </Section>
    </>
  );
}

/* ------------------------------ File Format Icon ---------------------------- */

export function FileIconDoc() {
  return (
    <>
      <PageHeader eyebrow="Components · Data Display" title="File Format Icon" description="A document glyph with a colored extension tab. Colors follow common conventions so users recognise formats at a glance." tags={["20 formats"]} />
      <Import names="FileFormatIcon" />
      <Section title="Formats">
        <Showcase code={`<FileFormatIcon format="pdf" size={40} />`}>
          {["pdf", "docx", "xlsx", "pptx", "png", "svg", "mp4", "mp3", "zip", "fig", "json", "tsx"].map((f) => (
            <div key={f} className="flex flex-col items-center gap-1.5">
              <FileFormatIcon format={f} />
              <span className="font-mono text-[10px] text-subtle">{f}</span>
            </div>
          ))}
        </Showcase>
      </Section>
      <Section title="Sizes">
        <Showcase>
          {[24, 32, 40, 56].map((s) => <FileFormatIcon key={s} format="pdf" size={s} />)}
        </Showcase>
      </Section>
    </>
  );
}

/* ------------------------------- Notification ------------------------------- */

export function NotificationDoc() {
  const [v, setV] = useState<"stroke" | "light" | "filled">("stroke");
  return (
    <>
      <PageHeader eyebrow="Components · Feedback" title="Notification" description="A richer toast body with optional actions. Use it for events that benefit from a follow-up — undo, view, dismiss." tags={["3 variants", "2 sizes", "Actions"]} />
      <Import names="Notification" />
      <Section title="Variants">
        <Showcase align="stretch" controls={<OptionPicker label="Variant" value={v} options={["stroke", "light", "filled"] as const} onChange={setV} />} code={`<Notification
  variant="${v}"
  tone="success"
  title="Changes saved"
  description="Your workspace settings were updated."
  actions={<><LinkButton variant="black" size="sm">Undo</LinkButton></>}
  onClose={dismiss}
/>`}>
          <div className="mx-auto grid w-full max-w-3xl gap-3 sm:grid-cols-2">
            <Notification variant={v} tone="success" title="Changes saved" description="Your workspace settings were updated." onClose={() => {}} actions={<><LinkButton variant={v === "filled" ? "gray" : "black"} size="sm" className={v === "filled" ? "text-current" : ""}>Undo</LinkButton></>} />
            <Notification variant={v} tone="danger" title="Payment failed" description="We couldn't charge Visa •••• 4242." onClose={() => {}} actions={<><LinkButton variant={v === "filled" ? "gray" : "primary"} size="sm" className={v === "filled" ? "text-current" : ""}>Update card</LinkButton><LinkButton variant="gray" size="sm" className={v === "filled" ? "text-current opacity-70" : ""}>Retry</LinkButton></>} />
            <Notification variant={v} tone="warning" title="Storage almost full" description="You've used 92% of your 50 GB plan." onClose={() => {}} />
            <Notification variant={v} tone="accent" title="New teammate joined" description="Lena Müller accepted your invitation." onClose={() => {}} />
          </div>
        </Showcase>
      </Section>
      <Section title="Sizes">
        <Showcase align="stretch" code={`<Notification tone="success" title="Changes saved" description="Your workspace settings were updated." />
<Notification size="sm" tone="success" title="Changes saved" description="A tighter body for dense sidebars." />`}>
          <div className="mx-auto grid w-full max-w-3xl gap-3 sm:grid-cols-2">
            <Notification tone="success" title="Changes saved" description="Your workspace settings were updated." onClose={() => {}} />
            <Notification size="sm" tone="success" title="Changes saved" description="A tighter body for dense sidebars." onClose={() => {}} />
          </div>
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "title", type: "ReactNode", required: true, description: "" },
          { name: "tone", type: "Tone", default: '"default"', description: "Icon colour + tinted fill in `light` / `filled`." },
          { name: "variant", type: '"stroke" | "filled" | "light"', default: '"stroke"', description: "Hairline card, solid tone fill or tinted surface." },
          { name: "size", type: '"sm" | "md"', default: '"md"', description: "md 400px, sm 320px max width." },
          { name: "actions", type: "ReactNode", description: "Trailing action row." },
          { name: "onClose", type: "() => void", description: "Adds the dismiss × control." },
        ]} />
      </Section>
    </>
  );
}

export function BannerDoc() {
  const [open, setOpen] = useState(true);
  return (
    <>
      <PageHeader eyebrow="Components · Feedback" title="Banner" description="A full-width strip pinned to the top of a page or panel for announcements and system-wide states." tags={["3 variants"]} />
      <Import names="Banner" />
      <Section title="Variants">
        <Showcase align="stretch" padded={false}>
          <div className="w-full divide-y divide-separator">
            {open && <Banner tone="accent" onClose={() => setOpen(false)} action={<LinkButton variant="gray" size="sm" className="text-current underline">See what's new</LinkButton>}>Unseen 3.2 is out — 11 premium blocks and 14 new components.</Banner>}
            <Banner tone="warning" variant="light" action={<Button size="xs" tone="warning">Upgrade</Button>}>Your trial ends in 3 days.</Banner>
            <Banner tone="danger" variant="light">Scheduled maintenance on Saturday 02:00–04:00 UTC.</Banner>
            <Banner tone="default" variant="stroke" action={<LinkButton variant="primary" size="sm" startContent={<RiFileCopyLine />}>Copy link</LinkButton>}>Share this page with your team.</Banner>
          </div>
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "tone", type: "Tone", default: '"accent"', description: "Intent colour + matching icon." },
          { name: "variant", type: '"filled" | "light" | "stroke"', default: '"filled"', description: "Solid fill, tinted surface or hairline outline." },
          { name: "action", type: "ReactNode", description: "Trailing action — usually a small Button or LinkButton." },
          { name: "onClose", type: "() => void", description: "Adds the dismiss × control." },
        ]} />
      </Section>
    </>
  );
}

export function LabelHintDoc() {
  return (
    <>
      <PageHeader eyebrow="Components · Forms" title="Label & Hint" description="The text primitives that wrap every field: a medium-weight label with required / optional markers, and an icon-led hint for help and validation." tags={["Primitives"]} />
      <Import names="Label, Hint" />
      <Section title="Label">
        <Showcase align="stretch">
          <div className="flex flex-wrap gap-8">
            <Label>Email address</Label>
            <Label required>Password</Label>
            <Label optional>Company</Label>
            <Label sub="(max 60 chars)">Bio</Label>
          </div>
        </Showcase>
      </Section>
      <Section title="Hint">
        <Showcase align="stretch">
          <div className="space-y-2">
            <Hint>This is a hint text to help user.</Hint>
            <Hint tone="success">Username is available.</Hint>
            <Hint tone="error">This field is required.</Hint>
          </div>
        </Showcase>
      </Section>
      <Section title="Composed">
        <Showcase align="stretch">
          <div className="w-full max-w-sm space-y-1.5">
            <Label htmlFor="uname" required>Username</Label>
            <Input id="uname" placeholder="aperture" startContent={<span className="text-paragraph-sm text-subtle">@</span>} />
            <Hint tone="success">@aperture is available.</Hint>
          </div>
        </Showcase>
        <Callout title="Field composition">Input, Select and Textarea already render Label and Hint for you through the <code className="font-mono text-paragraph-xs">label</code>, <code className="font-mono text-paragraph-xs">description</code> and <code className="font-mono text-paragraph-xs">error</code> props. Use the primitives directly only for custom controls.</Callout>
      </Section>
    </>
  );
}
