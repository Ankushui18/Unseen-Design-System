import { useState } from "react";
import { Callout, OptionPicker, Import, PageHeader, PropsTable, Section, Showcase } from "../../docs/Blocks";
import { Button } from "../../ui/Button";
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
import { RiAddLine, RiArrowRightLine, RiCalendarLine, RiCloseLine, RiExternalLinkLine, RiFileCopyLine, RiLayoutGridLine, RiListUnordered, RiMoreLine, RiNotification3Line, RiPencilLine, RiStarLine, RiTableLine } from "@remixicon/react";

/* --------------------------- Fancy / Compact / Link -------------------------- */

export function FancyButtonDoc() {
  return (
    <>
      <PageHeader eyebrow="Components · Actions" title="Fancy Button" description="The bevelled primary action. A subtle inner highlight, a one-pixel ring shadow and a soft drop give it physical presence without gradients that fight your brand." tags={["Bevel", "5 tones", "Focus ring"]} />
      <Import names="Button" />
      <Section title="Tones" description="Solid buttons are fancy by default. The neutral tone renders as the signature black button.">
        <Showcase code={`<Button tone="accent">Primary</Button>
<Button tone="default">Neutral</Button>
<Button tone="danger">Destructive</Button>`}>
          <Button>Primary</Button>
          <Button tone="default">Neutral</Button>
          <Button tone="success">Success</Button>
          <Button tone="warning">Warning</Button>
          <Button tone="danger">Destructive</Button>
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
    </>
  );
}

export function CompactButtonDoc() {
  return (
    <>
      <PageHeader eyebrow="Components · Actions" title="Compact Button" description="A tiny icon-only control for dense contexts: table rows, card corners, chips and dismiss actions." tags={["3 sizes", "3 variants"]} />
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
      <Section title="API">
        <PropsTable rows={[
          { name: "variant", type: '"stroke" | "ghost" | "white"', default: '"stroke"', description: "Visual treatment." },
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
      <PageHeader eyebrow="Components · Actions" title="Link Button" description="A text-only action that behaves like a button but reads like a link. Used inline in copy, in form headers and as tertiary actions." tags={["4 variants", "Inline"]} />
      <Import names="LinkButton" />
      <Section title="Variants">
        <Showcase code={`<LinkButton variant="primary" endContent={<ArrowRight />}>Learn more</LinkButton>`}>
          <LinkButton variant="gray">Gray</LinkButton>
          <LinkButton variant="black">Black</LinkButton>
          <LinkButton variant="primary">Primary</LinkButton>
          <LinkButton variant="error">Error</LinkButton>
          <LinkButton variant="primary" underline>Underlined</LinkButton>
          <LinkButton variant="black" endContent={<RiArrowRightLine />}>Learn more</LinkButton>
          <LinkButton variant="gray" size="sm" startContent={<RiExternalLinkLine />}>Open docs</LinkButton>
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
    </>
  );
}

export function SocialButtonDoc() {
  return (
    <>
      <PageHeader eyebrow="Components · Actions" title="Social Button" description="Brand-accurate sign-in buttons. Brand mode uses the official color; stroke mode keeps the glyph on a neutral surface for quieter layouts." tags={["Brand colors", "Icon only"]} />
      <Import names="SocialButton" />
      <Section title="Brand">
        <Showcase code={`<SocialButton brand="google">Continue with Google</SocialButton>`}>
          <SocialButton brand="google">Continue with Google</SocialButton>
          <SocialButton brand="apple">Continue with Apple</SocialButton>
          <SocialButton brand="github">Continue with GitHub</SocialButton>
          <SocialButton brand="x">Continue with X</SocialButton>
        </Showcase>
      </Section>
      <Section title="Stroke & icon only">
        <Showcase>
          <SocialButton brand="google" mode="stroke">Google</SocialButton>
          <SocialButton brand="apple" mode="stroke">Apple</SocialButton>
          <div className="flex gap-2">
            {(["google", "apple", "github", "x"] as const).map((b) => <SocialButton key={b} brand={b} mode="stroke" iconOnly aria-label={b} />)}
          </div>
        </Showcase>
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
    </>
  );
}

/* -------------------------------- Digit Input ------------------------------- */

export function DigitInputDoc() {
  const [code, setCode] = useState("");
  const ok = code === "1234";
  return (
    <>
      <PageHeader eyebrow="Components · Forms" title="Digit Input" description="One-time-code entry with auto-advance, backspace navigation and paste support." tags={["OTP", "Paste"]} />
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
      <PageHeader eyebrow="Components · Feedback" title="Notification" description="A richer toast body with optional actions. Use it for events that benefit from a follow-up — undo, view, dismiss." tags={["3 variants", "Actions"]} />
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
            {open && <Banner tone="accent" onClose={() => setOpen(false)} action={<LinkButton variant="gray" size="sm" className="text-current underline">See what's new</LinkButton>}>Aperture 3.2 is out — 11 premium blocks and 14 new components.</Banner>}
            <Banner tone="warning" variant="light" action={<Button size="xs" tone="warning">Upgrade</Button>}>Your trial ends in 3 days.</Banner>
            <Banner tone="danger" variant="light">Scheduled maintenance on Saturday 02:00–04:00 UTC.</Banner>
            <Banner tone="default" variant="stroke" action={<LinkButton variant="primary" size="sm" startContent={<RiFileCopyLine />}>Copy link</LinkButton>}>Share this page with your team.</Banner>
          </div>
        </Showcase>
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
