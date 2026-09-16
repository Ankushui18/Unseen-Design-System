import { useState } from "react";
import { Callout, Import, PageHeader, PropsTable, Section, Showcase, OptionPicker } from "../../docs/Blocks";
import { Button, ButtonGroup, type Size, type Tone, type Variant } from "../../ui/Button";
import { Checkbox, Input, RadioGroup, Select, Slider, Switch, Textarea } from "../../ui/Form";
import { Chip, Code } from "../../ui/Display";
import { RiAtLine, RiDeleteBinLine, RiDownloadLine, RiEyeLine, RiEyeOffLine, RiHeartLine, RiLockLine, RiSearchLine, RiSettings3Line, RiVolumeMuteLine, RiVolumeUpLine } from "@remixicon/react";

const VARIANTS: Variant[] = ["solid", "soft", "outline", "ghost", "link"];
const TONES: Tone[] = ["accent", "default", "success", "warning", "danger"];
const SIZES: Size[] = ["xs", "sm", "md", "lg"];

/* --------------------------------- BUTTON --------------------------------- */

export function ButtonDoc() {
  const [variant, setVariant] = useState<Variant>("solid");
  const [tone, setTone] = useState<Tone>("accent");
  const [size, setSize] = useState<Size>("md");
  const [loading, setLoading] = useState(false);

  return (
    <>
      <PageHeader
        eyebrow="Components · Actions"
        title="Button"
        description="Buttons trigger an action or a change of state. Solid buttons ship with the bevelled fancy treatment; stroke buttons sit on a hairline ring. Exactly one solid accent button should appear per view."
        tags={["Keyboard", "Loading state", "5 variants", "5 tones"]}
      />
      <Import names="Button, ButtonGroup" />

      <Section title="Playground" description="Combine variant, tone and size to see every permutation the system supports.">
        <Showcase
          code={`<Button variant="${variant}" tone="${tone}" size="${size}"${loading ? " loading" : ""}>\n  Continue\n</Button>`}
          controls={
            <>
              <OptionPicker label="Variant" value={variant} options={VARIANTS} onChange={setVariant} />
              <OptionPicker label="Tone" value={tone} options={TONES} onChange={setTone} />
              <OptionPicker label="Size" value={size} options={SIZES} onChange={setSize} />
              <Switch checked={loading} onChange={setLoading} label="Loading" size="sm" />
            </>
          }
        >
          <Button variant={variant} tone={tone} size={size} loading={loading}>Continue</Button>
          <Button variant={variant} tone={tone} size={size} loading={loading} startContent={<RiDownloadLine className="h-4 w-4" />}>Download</Button>
          <Button variant={variant} tone={tone} size={size} loading={loading} iconOnly aria-label="Settings"><RiSettings3Line className="h-4 w-4" /></Button>
          <Button variant={variant} tone={tone} size={size} disabled>Disabled</Button>
        </Showcase>
      </Section>

      <Section title="Variants" description="Emphasis ladder from highest to lowest. Mixing more than two levels in one cluster creates visual noise.">
        <Showcase code={VARIANTS.map((v) => `<Button variant="${v}">${v}</Button>`).join("\n")}>
          {VARIANTS.map((v) => (
            <Button key={v} variant={v} className="capitalize">{v}</Button>
          ))}
        </Showcase>
      </Section>

      <Section title="Tones" description="Tone communicates consequence, never decoration.">
        <Showcase align="stretch">
          {(["solid", "soft", "outline"] as Variant[]).map((v) => (
            <div key={v} className="flex flex-wrap items-center gap-2">
              <span className="w-16 font-mono text-[11px] text-subtle">{v}</span>
              {TONES.map((t) => (
                <Button key={t} variant={v} tone={t} size="sm" className="capitalize">{t}</Button>
              ))}
            </div>
          ))}
        </Showcase>
      </Section>

      <Section title="Sizes">
        <Showcase code={SIZES.map((s) => `<Button size="${s}">Button</Button>`).join("\n")}>
          {SIZES.map((s) => (
            <Button key={s} size={s}>Button</Button>
          ))}
        </Showcase>
      </Section>

      <Section title="With content" description="Icons sit at 16px next to 13–15px labels. Icon-only buttons require an accessible name.">
        <Showcase code={`<Button startContent={<Download />}>Export CSV</Button>
<Button endContent={<ArrowRight />} variant="soft">Continue</Button>
<Button iconOnly aria-label="Delete" tone="danger" variant="ghost"><Trash2 /></Button>`}>
          <Button startContent={<RiDownloadLine className="h-4 w-4" />}>Export CSV</Button>
          <Button variant="soft" startContent={<RiHeartLine className="h-4 w-4" />}>Favourite</Button>
          <Button variant="ghost" tone="danger" iconOnly aria-label="Delete"><RiDeleteBinLine className="h-4 w-4" /></Button>
          <Button variant="outline" tone="default" loading>Saving</Button>
        </Showcase>
      </Section>

      <Section title="Button group" description="Joins related actions into a single control. Radius is applied only to the outer edges.">
        <Showcase code={`<ButtonGroup>
  <Button variant="outline" tone="default">Day</Button>
  <Button variant="outline" tone="default">Week</Button>
  <Button variant="outline" tone="default">Month</Button>
</ButtonGroup>`}>
          <ButtonGroup>
            {["Day", "Week", "Month"].map((l) => (
              <Button key={l} variant="outline" tone="default" size="sm">{l}</Button>
            ))}
          </ButtonGroup>
          <ButtonGroup>
            <Button size="sm">Publish</Button>
            <Button size="sm" iconOnly aria-label="More options"><RiSettings3Line className="h-3.5 w-3.5" /></Button>
          </ButtonGroup>
        </Showcase>
      </Section>

      <Section title="API">
        <PropsTable
          rows={[
            { name: "variant", type: '"solid" | "soft" | "outline" | "ghost" | "link"', default: '"solid"', description: "Visual emphasis level." },
            { name: "tone", type: '"accent" | "default" | "success" | "warning" | "danger"', default: '"accent"', description: "Semantic intent of the action." },
            { name: "size", type: '"xs" | "sm" | "md" | "lg"', default: '"md"', description: "Control height and horizontal padding." },
            { name: "loading", type: "boolean", default: "false", description: "Swaps content for a spinner and disables interaction." },
            { name: "iconOnly", type: "boolean", default: "false", description: "Renders a square button. Requires aria-label." },
            { name: "fullWidth", type: "boolean", default: "false", description: "Stretches the button to its container width." },
            { name: "startContent", type: "ReactNode", description: "Node rendered before the label." },
            { name: "endContent", type: "ReactNode", description: "Node rendered after the label." },
            { name: "disabled", type: "boolean", default: "false", description: "Applies --disabled-opacity and blocks pointer events." },
          ]}
        />
      </Section>

      <Section title="Accessibility">
        <Callout title="Guarantees">
          Renders a native <Code>&lt;button&gt;</Code>, activates on <Code>Space</Code> and <Code>Enter</Code>, exposes{" "}
          <Code>aria-busy</Code> while loading, and shows a 2px focus ring only for keyboard users.
        </Callout>
      </Section>
    </>
  );
}

export function ButtonGroupDoc() {
  return (
    <>
      <PageHeader eyebrow="Components · Actions" title="Button Group" description="Groups mutually related actions into one visual unit, collapsing the inner radii and sharing a single border." tags={["Composition"]} />
      <Import names="ButtonGroup, Button" />
      <Section title="Usage">
        <Showcase code={`<ButtonGroup>
  <Button variant="outline" tone="default">Left</Button>
  <Button variant="outline" tone="default">Center</Button>
  <Button variant="outline" tone="default">Right</Button>
</ButtonGroup>`}>
          <ButtonGroup>
            {["Left", "Center", "Right"].map((l) => <Button key={l} variant="outline" tone="default">{l}</Button>)}
          </ButtonGroup>
        </Showcase>
      </Section>
      <Section title="Split action" description="Pair a primary action with an overflow trigger.">
        <Showcase>
          <ButtonGroup>
            <Button>Deploy</Button>
            <Button iconOnly aria-label="Deploy options"><RiSettings3Line className="h-4 w-4" /></Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button tone="default" variant="soft">Approve</Button>
            <Button tone="default" variant="soft" iconOnly aria-label="More"><RiSettings3Line className="h-4 w-4" /></Button>
          </ButtonGroup>
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[{ name: "children", type: "ReactNode", required: true, description: "Two or more Button elements." }, { name: "className", type: "string", description: "Merged onto the group wrapper." }]} />
      </Section>
    </>
  );
}

/* ---------------------------------- INPUT --------------------------------- */

export function InputDoc() {
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const invalid = value.length > 0 && !value.includes("@");

  return (
    <>
      <PageHeader
        eyebrow="Components · Forms"
        title="Input"
        description="A single-line text field with label, description, validation and slot support. Field tokens give inputs a distinct visual language from buttons."
        tags={["Validation", "Slots", "3 sizes"]}
      />
      <Import names="Input" />

      <Section title="Basic">
        <Showcase align="stretch" code={`<Input
  label="Work email"
  placeholder="you@company.com"
  description="We'll never share this."
/>`}>
          <div className="grid w-full gap-4 sm:grid-cols-2">
            <Input label="Work email" placeholder="you@company.com" description="We'll never share this." />
            <Input label="Workspace" placeholder="acme" startContent={<RiAtLine />} description="Lowercase letters and dashes." />
          </div>
        </Showcase>
      </Section>

      <Section title="Sizes">
        <Showcase align="stretch">
          <div className="grid w-full gap-3">
            {(["sm", "md", "lg"] as const).map((s) => (
              <Input key={s} size={s} placeholder={`Size ${s}`} startContent={<RiSearchLine />} />
            ))}
          </div>
        </Showcase>
      </Section>

      <Section title="States" description="Validation messages replace the description and recolor the border.">
        <Showcase align="stretch">
          <div className="grid w-full gap-4 sm:grid-cols-2">
            <Input label="Email" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Type to validate…" error={invalid ? "Enter a valid email address." : undefined} description="Live validation on each keystroke." />
            <Input label="Password" type={show ? "text" : "password"} defaultValue="correct-horse" startContent={<RiLockLine />} endContent={<button onClick={() => setShow((s) => !s)} aria-label="Toggle visibility">{show ? <RiEyeOffLine /> : <RiEyeLine />}</button>} />
            <Input label="Disabled" placeholder="Not editable" disabled />
            <Input label="Read only" defaultValue="acme-prod-01" readOnly description="Generated by the system." />
          </div>
        </Showcase>
      </Section>

      <Section title="Slots">
        <Showcase align="stretch">
          <div className="grid w-full gap-4 sm:grid-cols-2">
            <Input placeholder="Search components…" startContent={<RiSearchLine />} endContent={<Chip size="sm">⌘K</Chip>} />
            <Input placeholder="0.00" startContent={<span className="text-paragraph-sm">$</span>} endContent={<span className="text-paragraph-xs">USD</span>} />
          </div>
        </Showcase>
      </Section>

      <Section title="API">
        <PropsTable
          rows={[
            { name: "label", type: "string", description: "Visible label wired to the input via htmlFor." },
            { name: "description", type: "ReactNode", description: "Helper text below the field." },
            { name: "error", type: "string", description: "Error message. Overrides description and sets the danger state." },
            { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Field height and padding." },
            { name: "startContent", type: "ReactNode", description: "Leading adornment inside the field." },
            { name: "endContent", type: "ReactNode", description: "Trailing adornment inside the field." },
            { name: "wrapperClassName", type: "string", description: "Class applied to the outer wrapper." },
          ]}
        />
      </Section>
    </>
  );
}

export function TextareaDoc() {
  return (
    <>
      <PageHeader eyebrow="Components · Forms" title="Textarea" description="A multi-line text field that inherits every field token from Input, including focus ring, validation and disabled treatment." tags={["Resizable", "Validation"]} />
      <Import names="Textarea" />
      <Section title="Usage">
        <Showcase align="stretch" code={`<Textarea
  label="Release notes"
  placeholder="What changed in this version?"
  rows={4}
/>`}>
          <div className="grid w-full gap-4">
            <Textarea label="Release notes" placeholder="What changed in this version?" rows={4} description="Markdown is supported." />
            <Textarea label="Reason" defaultValue="Too short" error="Please provide at least 40 characters." rows={3} />
          </div>
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "label", type: "string", description: "Visible label for the field." },
          { name: "description", type: "ReactNode", description: "Helper text below the field." },
          { name: "error", type: "string", description: "Error message and danger state." },
          { name: "rows", type: "number", default: "3", description: "Initial visible line count." },
        ]} />
      </Section>
    </>
  );
}

export function SelectDoc() {
  return (
    <>
      <PageHeader eyebrow="Components · Forms" title="Select" description="A native select styled with field tokens. Native rendering keeps mobile pickers, type-ahead and accessibility behaviour intact." tags={["Native", "Accessible"]} />
      <Import names="Select" />
      <Section title="Usage">
        <Showcase align="stretch" code={`<Select
  label="Region"
  items={[
    { label: "us-east-1", value: "use1" },
    { label: "eu-west-2", value: "euw2" },
  ]}
/>`}>
          <div className="grid w-full gap-4 sm:grid-cols-2">
            <Select label="Region" items={[{ label: "us-east-1 · N. Virginia", value: "use1" }, { label: "eu-west-2 · London", value: "euw2" }, { label: "ap-south-1 · Mumbai", value: "aps1" }]} description="Determines data residency." />
            <Select label="Plan" items={[{ label: "Starter", value: "s" }, { label: "Pro", value: "p" }, { label: "Enterprise", value: "e" }]} defaultValue="p" />
            <Select label="Disabled" items={[{ label: "Unavailable", value: "x" }]} disabled />
            <Select label="Invalid" items={[{ label: "Choose…", value: "" }]} error="Selection is required." />
          </div>
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "items", type: "{ label: string; value: string }[]", description: "Convenience shorthand for options." },
          { name: "label", type: "string", description: "Visible label." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Control height." },
          { name: "error", type: "string", description: "Error message and danger state." },
        ]} />
      </Section>
    </>
  );
}

/* ------------------------------ CHECKBOX/RADIO ----------------------------- */

export function CheckboxDoc() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  const all = a && b;
  return (
    <>
      <PageHeader eyebrow="Components · Forms" title="Checkbox" description="Binary selection for independent options. Supports an indeterminate state for parent/child relationships." tags={["Indeterminate", "5 tones"]} />
      <Import names="Checkbox" />
      <Section title="Usage">
        <Showcase align="stretch" code={`<Checkbox
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
  label="Enable telemetry"
  description="Anonymous usage data only."
/>`}>
          <div className="space-y-3">
            <Checkbox checked={a} onChange={(e) => setA(e.target.checked)} label="Enable telemetry" description="Anonymous usage data only." />
            <Checkbox checked={b} onChange={(e) => setB(e.target.checked)} label="Weekly digest" description="Sent every Monday morning." />
            <Checkbox checked disabled label="Required policy" description="Locked by your administrator." />
          </div>
        </Showcase>
      </Section>
      <Section title="Indeterminate" description="Use for a parent that controls a partially selected group.">
        <Showcase align="stretch">
          <div className="space-y-3">
            <Checkbox checked={all} indeterminate={!all && (a || b)} onChange={(e) => { setA(e.target.checked); setB(e.target.checked); }} label="Select all notifications" />
            <div className="ml-6 space-y-2.5 border-l border-separator pl-4">
              <Checkbox checked={a} onChange={(e) => setA(e.target.checked)} label="Product updates" />
              <Checkbox checked={b} onChange={(e) => setB(e.target.checked)} label="Security alerts" />
            </div>
          </div>
        </Showcase>
      </Section>
      <Section title="Tones & sizes">
        <Showcase>
          {(["accent", "success", "warning", "danger", "default"] as const).map((t) => (
            <Checkbox key={t} checked tone={t} label={t} className="capitalize" onChange={() => {}} />
          ))}
        </Showcase>
        <Showcase>
          {(["sm", "md", "lg"] as const).map((s) => <Checkbox key={s} checked size={s} label={s} onChange={() => {}} />)}
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "checked", type: "boolean", description: "Controlled checked state." },
          { name: "indeterminate", type: "boolean", default: "false", description: "Renders a dash instead of a check." },
          { name: "tone", type: "Tone", default: '"accent"', description: "Fill color when checked." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Box dimensions." },
          { name: "label", type: "ReactNode", description: "Primary label text." },
          { name: "description", type: "ReactNode", description: "Secondary text beneath the label." },
        ]} />
      </Section>
    </>
  );
}

export function RadioDoc() {
  const [v, setV] = useState("pro");
  const [o, setO] = useState("card");
  return (
    <>
      <PageHeader eyebrow="Components · Forms" title="Radio Group" description="Mutually exclusive selection from a visible set. Use a Select instead once the list exceeds six options." tags={["Roving focus", "Arrow keys"]} />
      <Import names="RadioGroup" />
      <Section title="Usage">
        <Showcase align="stretch" code={`<RadioGroup
  value={plan}
  onChange={setPlan}
  options={[
    { value: "starter", label: "Starter", description: "$0 · 3 seats" },
    { value: "pro", label: "Pro", description: "$9 / seat" },
  ]}
/>`}>
          <RadioGroup
            value={v}
            onChange={setV}
            options={[
              { value: "starter", label: "Starter", description: "$0 · up to 3 seats" },
              { value: "pro", label: "Pro", description: "$9 per seat · unlimited events" },
              { value: "enterprise", label: "Enterprise", description: "Custom · SSO and audit logs" },
              { value: "legacy", label: "Legacy", description: "No longer available", disabled: true },
            ]}
          />
        </Showcase>
      </Section>
      <Section title="Horizontal">
        <Showcase align="stretch">
          <RadioGroup orientation="horizontal" value={o} onChange={setO} options={[{ value: "card", label: "Card" }, { value: "bank", label: "Bank transfer" }, { value: "invoice", label: "Invoice" }]} />
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "value", type: "string", required: true, description: "Currently selected value." },
          { name: "onChange", type: "(value: string) => void", required: true, description: "Fires with the newly selected value." },
          { name: "options", type: "{ value, label, description?, disabled? }[]", required: true, description: "Available choices." },
          { name: "orientation", type: '"vertical" | "horizontal"', default: '"vertical"', description: "Layout direction." },
          { name: "tone", type: "Tone", default: '"accent"', description: "Indicator color." },
        ]} />
      </Section>
    </>
  );
}

export function SwitchDoc() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  return (
    <>
      <PageHeader eyebrow="Components · Forms" title="Switch" description="Toggles a setting that applies immediately. If the change requires a save action, use a Checkbox instead." tags={["Instant effect", "3 sizes"]} />
      <Import names="Switch" />
      <Section title="Usage">
        <Showcase align="stretch" code={`<Switch
  checked={enabled}
  onChange={setEnabled}
  label="Auto-deploy"
  description="Ship every merge to main."
/>`}>
          <div className="space-y-4">
            <Switch checked={a} onChange={setA} label="Auto-deploy" description="Ship every merge to main." />
            <Switch checked={b} onChange={setB} label="Maintenance mode" description="Serves a static page to all visitors." tone="warning" />
            <Switch checked disabled onChange={() => {}} label="Enforced by policy" />
          </div>
        </Showcase>
      </Section>
      <Section title="Sizes & icons">
        <Showcase>
          {(["sm", "md", "lg"] as const).map((s) => <Switch key={s} size={s} checked={a} onChange={setA} label={s} />)}
        </Showcase>
        <Showcase>
          <Switch checked={a} onChange={setA} size="lg" startIcon={<RiVolumeMuteLine className="h-3 w-3" />} endIcon={<RiVolumeUpLine className="h-3 w-3" />} label="Sound" />
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "checked", type: "boolean", required: true, description: "Controlled on/off state." },
          { name: "onChange", type: "(checked: boolean) => void", required: true, description: "Fires with the next state." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Track and thumb dimensions." },
          { name: "tone", type: "Tone", default: '"accent"', description: "Track color when on." },
          { name: "startIcon", type: "ReactNode", description: "Icon shown in the thumb when off." },
          { name: "endIcon", type: "ReactNode", description: "Icon shown in the thumb when on." },
        ]} />
      </Section>
    </>
  );
}

export function SliderDoc() {
  const [v, setV] = useState(42);
  const [q, setQ] = useState(0.7);
  return (
    <>
      <PageHeader eyebrow="Components · Forms" title="Slider" description="Selects a value from a continuous or stepped range. Always pair it with a numeric readout so the exact value is never a guess." tags={["Keyboard", "Steps", "Tones"]} />
      <Import names="Slider" />
      <Section title="Usage">
        <Showcase align="stretch" code={`<Slider
  value={value}
  onChange={setValue}
  min={0}
  max={100}
  label="Team seats"
  formatValue={(v) => \`\${v} seats\`}
/>`}>
          <div className="w-full max-w-md space-y-6">
            <Slider value={v} onChange={setV} label="Team seats" formatValue={(x) => `${x} seats`} />
            <Slider value={q} onChange={setQ} min={0} max={1} step={0.05} label="Quality" formatValue={(x) => x.toFixed(2)} tone="success" />
            <Slider value={68} onChange={() => {}} label="Locked" formatValue={(x) => `${x}%`} disabled />
          </div>
        </Showcase>
      </Section>
      <Section title="Tones">
        <Showcase align="stretch">
          <div className="w-full max-w-md space-y-5">
            {(["accent", "success", "warning", "danger"] as const).map((t) => (
              <Slider key={t} tone={t} value={v} onChange={setV} label={t} formatValue={(x) => `${x}`} />
            ))}
          </div>
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "value", type: "number", required: true, description: "Controlled value." },
          { name: "onChange", type: "(value: number) => void", required: true, description: "Fires on each committed change." },
          { name: "min / max", type: "number", default: "0 / 100", description: "Range bounds." },
          { name: "step", type: "number", default: "1", description: "Increment between valid values." },
          { name: "formatValue", type: "(value: number) => string", description: "Renders the numeric readout." },
          { name: "tone", type: "Tone", default: '"accent"', description: "Fill and thumb color." },
        ]} />
      </Section>
    </>
  );
}
