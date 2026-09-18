import { useState } from "react";
import {
  RiAddLine,
  RiAlignCenter,
  RiAlignLeft,
  RiAlignRight,
  RiArrowDownSLine,
  RiBankCardLine,
  RiBold,
  RiBuildingLine,
  RiDashboardLine,
  RiDeleteBinLine,
  RiEditLine,
  RiFileCopyLine,
  RiFileTextLine,
  RiFilterLine,
  RiGitCommitLine,
  RiInboxLine,
  RiItalic,
  RiLogoutBoxRLine,
  RiMoreLine,
  RiNotification3Line,
  RiRocketLine,
  RiSettings3Line,
  RiShieldCheckLine,
  RiTeamLine,
  RiUnderline,
  RiUser3Line,
  RiUserLine,
  RiWalletLine,
} from "@remixicon/react";
import { PageHeader, Import, PropsTable, Section, Showcase } from "../../docs/Blocks";
import { Button } from "../../ui/Button";
import { Avatar, Chip, Progress } from "../../ui/Display";
import { LinkButton, StatusBadge } from "../../ui/Extra";
import {
  ColorPicker,
  ContentDivider,
  Dropdown,
  EmptyState,
  NumberInput,
  Rating,
  SearchInput,
  SelectTrigger,
  SelectionCard,
  TextareaCounter,
  Timeline,
  ToggleGroup,
  VerticalTabMenu,
  WidgetBox,
} from "../../ui/More";

export function DropdownDoc() {
  const [dark, setDark] = useState(false);
  const [beta, setBeta] = useState(true);
  return (
    <>
      <PageHeader eyebrow="Components · Overlays" title="Dropdown" description="A composed menu with a user header, grouped items, shortcuts, sub-labels, checkbox rows and destructive actions — the full account-menu pattern in one declarative list." tags={["Entries API", "Checkbox items", "User header"]} />
      <Import names="Dropdown" />
      <Section title="Account menu">
        <Showcase code={`<Dropdown
  trigger={({ toggle }) => <Button variant="outline" tone="default" onClick={toggle}>Account</Button>}
  entries={[
    { type: "user", name: "Sophia Williams", email: "sophia@aperture.design" },
    { type: "divider" },
    { label: "Profile", icon: <RiUser3Line />, shortcut: "⌘P" },
    { label: "Billing", icon: <RiBankCardLine />, sub: "Pro · renews Mar 12" },
    { type: "checkbox", label: "Dark mode", checked: dark, onChange: setDark },
    { type: "divider" },
    { label: "Sign out", icon: <RiLogoutBoxRLine />, danger: true },
  ]}
/>`}>
          <Dropdown
            trigger={({ toggle, open }) => <Button variant="outline" tone="default" onClick={toggle} startContent={<Avatar name="Sophia Williams" size="xs" tone="accent" />} endContent={<RiArrowDownSLine className={open ? "rotate-180 transition-transform" : "transition-transform"} />}>Sophia</Button>}
            entries={[
              { type: "user", name: "Sophia Williams", email: "sophia@aperture.design" },
              { type: "divider" },
              { label: "Profile", icon: <RiUser3Line />, shortcut: "⌘P" },
              { label: "Billing", icon: <RiBankCardLine />, sub: "Pro · renews Mar 12" },
              { label: "Team", icon: <RiTeamLine />, shortcut: "⌘T" },
              { type: "label", label: "Preferences" },
              { type: "checkbox", label: "Dark mode", checked: dark, onChange: setDark },
              { type: "checkbox", label: "Beta features", checked: beta, onChange: setBeta },
              { type: "divider" },
              { label: "Sign out", icon: <RiLogoutBoxRLine />, danger: true },
            ]}
          />
          <Dropdown
            placement="bottom"
            size="sm"
            trigger={({ toggle }) => <Button variant="outline" tone="default" iconOnly aria-label="Row actions" onClick={toggle}><RiMoreLine /></Button>}
            entries={[
              { label: "Edit", icon: <RiEditLine />, shortcut: "E" },
              { label: "Duplicate", icon: <RiFileCopyLine />, shortcut: "⌘D" },
              { label: "Archive", icon: <RiInboxLine />, disabled: true },
              { type: "divider" },
              { label: "Delete", icon: <RiDeleteBinLine />, danger: true },
            ]}
          />
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "entries", type: "DropdownEntry[]", required: true, description: "Items, checkbox rows, labels, dividers and a user header." },
          { name: "trigger", type: "({ open, toggle }) => ReactNode", required: true, description: "Anchor render prop." },
          { name: "placement", type: '"bottom" | "bottom-start" | "bottom-end" | "top"', default: '"bottom-start"', description: "Alignment relative to the trigger." },
          { name: "size", type: '"sm" | "md"', default: '"md"', description: "Menu width — 176px or 240px." },
        ]} />
      </Section>
    </>
  );
}

export function VerticalTabDoc() {
  const [v, setV] = useState("general");
  return (
    <>
      <PageHeader eyebrow="Components · Navigation" title="Tab Menu Vertical" description="A left-rail navigation for settings and detail pages. Active items get a soft fill and an accent icon; counts render as pills." tags={["Counts", "Icons"]} />
      <Import names="VerticalTabMenu" />
      <Section title="Usage">
        <Showcase align="stretch" code={`<VerticalTabMenu value={tab} onChange={setTab} items={[
  { value: "general", label: "General", icon: <RiSettings3Line /> },
  { value: "members", label: "Members", icon: <RiTeamLine />, count: 12 },
]} />`}>
          <div className="grid gap-6 sm:grid-cols-[240px_1fr]">
            <VerticalTabMenu value={v} onChange={setV} items={[
              { value: "general", label: "General", icon: <RiSettings3Line /> },
              { value: "members", label: "Members", icon: <RiTeamLine />, count: 12 },
              { value: "billing", label: "Billing", icon: <RiWalletLine /> },
              { value: "notifications", label: "Notifications", icon: <RiNotification3Line />, count: 3 },
              { value: "security", label: "Security", icon: <RiShieldCheckLine /> },
              { value: "archive", label: "Archive", icon: <RiInboxLine />, disabled: true },
            ]} />
            <div className="rounded-2xl bg-surface p-5 ring-1 ring-border"><p className="text-label-md capitalize">{v}</p><p className="mt-1 text-paragraph-sm text-muted">Panel content for the {v} section.</p></div>
          </div>
        </Showcase>
      </Section>
    </>
  );
}

export function ContentDividerDoc() {
  return (
    <>
      <PageHeader eyebrow="Components · Data Display" title="Content Divider" description="Section separators for lists and feeds: a labelled band with an optional count, a centred label, and solid or dashed rules." tags={["4 variants"]} />
      <Import names="ContentDivider" />
      <Section title="Variants">
        <Showcase align="stretch" padded={false}>
          <div className="w-full">
            <ContentDivider count={3}>Today</ContentDivider>
            <div className="space-y-3 p-4">{[1, 2].map((i) => <div key={i} className="flex items-center gap-3"><Avatar name={`User ${i}`} size="sm" /><div className="h-3 w-40 rounded bg-neutral-200 dark:bg-neutral-700" /></div>)}</div>
            <ContentDivider count={12}>Yesterday</ContentDivider>
            <div className="space-y-4 p-4">
              <ContentDivider variant="solid-text">or continue with</ContentDivider>
              <ContentDivider variant="solid" />
              <ContentDivider variant="dashed" />
            </div>
          </div>
        </Showcase>
      </Section>
    </>
  );
}

export function SelectionCardDoc() {
  const [plan, setPlan] = useState("pro");
  const [addons, setAddons] = useState<string[]>(["sso"]);
  const t = (k: string) => setAddons((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k]));
  return (
    <>
      <PageHeader eyebrow="Components · Forms" title="Checkbox & Radio Card" description="Selectable cards for plans, add-ons and preferences. The whole card is the hit target; the indicator mirrors the standard checkbox and radio." tags={["Radio", "Checkbox", "Meta slot"]} />
      <Import names="SelectionCard" />
      <Section title="Radio cards">
        <Showcase align="stretch" code={`<SelectionCard type="radio" checked={plan === "pro"} onChange={() => setPlan("pro")}
  icon={<RiRocketLine />} title="Pro" description="Unlimited projects" meta="$19/mo" />`}>
          <div className="grid gap-3 sm:grid-cols-3">
            <SelectionCard type="radio" checked={plan === "starter"} onChange={() => setPlan("starter")} icon={<RiUserLine />} title="Starter" description="For individuals" meta="Free" />
            <SelectionCard type="radio" checked={plan === "pro"} onChange={() => setPlan("pro")} icon={<RiRocketLine />} title="Pro" description="For product teams" meta="$19/mo" />
            <SelectionCard type="radio" checked={plan === "ent"} onChange={() => setPlan("ent")} icon={<RiBuildingLine />} title="Enterprise" description="SSO, audit logs" meta="Custom" />
          </div>
        </Showcase>
      </Section>
      <Section title="Checkbox cards">
        <Showcase align="stretch">
          <div className="grid gap-3 sm:grid-cols-2">
            <SelectionCard checked={addons.includes("sso")} onChange={() => t("sso")} icon={<RiShieldCheckLine />} title="Single sign-on" description="SAML and OIDC providers" meta="+$4" />
            <SelectionCard checked={addons.includes("seats")} onChange={() => t("seats")} icon={<RiTeamLine />} title="Extra seats" description="Pack of 10 seats" meta="+$40" />
            <SelectionCard checked={addons.includes("audit")} onChange={() => t("audit")} icon={<RiFileTextLine />} title="Audit logs" description="90-day retention" meta="+$8" />
            <SelectionCard checked={false} onChange={() => {}} icon={<RiDashboardLine />} title="Analytics" description="Coming soon" disabled />
          </div>
        </Showcase>
      </Section>
      <Section title="Variants" description="Inline drops the card surface for list-style selection rows; card keeps the full elevated tile.">
        <Showcase align="stretch" code={`<SelectionCard variant="inline" type="radio" checked={on} onChange={() => {}} title="Monthly billing" />`}>
          <div className="grid w-full gap-4 sm:grid-cols-2">
            <div className="rounded-14 ring-1 ring-border">
              <SelectionCard variant="inline" type="radio" checked={plan === "pro"} onChange={() => setPlan("pro")} title="Monthly billing" description="Cancel anytime" />
              <SelectionCard variant="inline" type="radio" checked={plan !== "pro"} onChange={() => setPlan("starter")} title="Annual billing" description="2 months free" />
            </div>
            <div className="space-y-3">
              <SelectionCard variant="card" checked={addons.includes("sso")} onChange={() => t("sso")} icon={<RiShieldCheckLine />} title="Single sign-on" description="SAML and OIDC providers" />
              <SelectionCard variant="card" checked={addons.includes("audit")} onChange={() => t("audit")} icon={<RiFileTextLine />} title="Audit logs" description="90-day retention" />
            </div>
          </div>
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "type", type: '"checkbox" | "radio"', default: '"checkbox"', description: "Indicator kind; the native input keeps the matching role." },
          { name: "checked", type: "boolean", required: true, description: "Controlled state." },
          { name: "onChange", type: "(checked: boolean) => void", required: true, description: "Fires on toggle." },
          { name: "variant", type: '"card" | "inline"', default: '"card"', description: "Elevated tile or flat list row." },
          { name: "icon", type: "ReactNode", description: "Leading glyph in a round well." },
          { name: "meta", type: "ReactNode", description: "Trailing value, e.g. a price." },
        ]} />
      </Section>
    </>
  );
}

export function RatingDoc() {
  const [v, setV] = useState(4);
  return (
    <>
      <PageHeader eyebrow="Components · Forms" title="Rating" description="Star ratings for input and display. Hover previews the value; read-only mode renders without interaction." tags={["3 sizes", "3 tones", "Read only"]} />
      <Import names="Rating" />
      <Section title="Usage">
        <Showcase code={`<Rating value={rating} onChange={setRating} />`}>
          <Rating value={v} onChange={setV} size="sm" />
          <Rating value={v} onChange={setV} />
          <Rating value={v} onChange={setV} size="lg" />
        </Showcase>
      </Section>
      <Section title="Tones" description="Default is the classic amber; accent follows your brand; danger marks destructive or failing scores.">
        <Showcase code={`<Rating value={v} tone="danger" readOnly />`}>
          <div className="flex items-center gap-2"><Rating value={v} tone="default" readOnly /><span className="font-mono text-[11px] text-subtle">default</span></div>
          <div className="flex items-center gap-2"><Rating value={v} tone="accent" readOnly /><span className="font-mono text-[11px] text-subtle">accent</span></div>
          <div className="flex items-center gap-2"><Rating value={v} tone="danger" readOnly /><span className="font-mono text-[11px] text-subtle">danger</span></div>
        </Showcase>
      </Section>
      <Section title="Read only">
        <Showcase>
          <div className="flex items-center gap-2"><Rating value={4} readOnly size="sm" /><span className="text-paragraph-sm text-muted">4.0 · 1,284 reviews</span></div>
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "value", type: "number", required: true, description: "Current rating." },
          { name: "onChange", type: "(v: number) => void", description: "Omit for read-only display." },
          { name: "max", type: "number", default: "5", description: "Star count." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "16, 20 or 28px stars." },
          { name: "tone", type: '"default" | "accent" | "danger"', default: '"default"', description: "Filled star colour." },
        ]} />
      </Section>
    </>
  );
}

export function InputsMoreDoc() {
  const [n, setN] = useState(3);
  const [q, setQ] = useState("");
  const [t, setT] = useState("Designing systems that scale.");
  const [open, setOpen] = useState(false);
  return (
    <>
      <PageHeader eyebrow="Components · Forms" title="Number, Search & Counter" description="Three specialised fields that share the input shell: a stepper number input, a search field with clear and shortcut, and a textarea with a live character counter." tags={["Number", "Search", "Counter", "Select trigger"]} />
      <Import names="NumberInput, SearchInput, TextareaCounter, SelectTrigger" />
      <Section title="Number input">
        <Showcase code={`<NumberInput label="Seats" value={n} onChange={setN} min={1} max={50} suffix="seats" />`}>
          <NumberInput label="Seats" value={n} onChange={setN} min={1} max={50} suffix="seats" />
          <NumberInput label="Quantity" value={n} onChange={setN} min={0} size="sm" />
          <NumberInput label="Budget" value={n} onChange={setN} min={0} max={1000} size="lg" suffix="$" />
        </Showcase>
      </Section>
      <Section title="Search input">
        <Showcase align="stretch" code={`<SearchInput value={q} onChange={setQ} shortcut="⌘K" />`}>
          <div className="grid gap-3 sm:grid-cols-2">
            <SearchInput value={q} onChange={setQ} shortcut="⌘K" />
            <SearchInput value={q} onChange={setQ} size="sm" placeholder="Filter members…" />
            <SearchInput value={q} onChange={setQ} size="lg" placeholder="Command search…" shortcut="⌘K" />
            <SearchInput value={q} onChange={setQ} size="lg" disabled placeholder="Search disabled" />
          </div>
        </Showcase>
      </Section>
      <Section title="Textarea with counter">
        <Showcase align="stretch" code={`<TextareaCounter label="Bio" value={bio} onChange={setBio} maxLength={120} />`}>
          <TextareaCounter label="Bio" value={t} onChange={setT} maxLength={60} hint="Shown on your public profile." />
        </Showcase>
      </Section>
      <Section title="Select trigger" description="The visual shell of a custom select — pair it with Dropdown for a fully styled picker.">
        <Showcase align="stretch">
          <div className="grid gap-3 sm:grid-cols-2">
            <SelectTrigger label="Region" icon={<RiBuildingLine />} value="eu-west-2 · London" open={open} onClick={() => setOpen((o) => !o)} />
            <SelectTrigger label="Assignee" placeholder="Choose a teammate" icon={<RiUserLine />} />
          </div>
        </Showcase>
      </Section>
    </>
  );
}

export function ToggleGroupDoc() {
  const [fmt, setFmt] = useState<string[]>(["bold"]);
  const [align, setAlign] = useState<string[]>(["left"]);
  return (
    <>
      <PageHeader eyebrow="Components · Actions" title="Toggle Group" description="Pressed-state icon buttons for toolbars. Single-select for exclusive options like alignment; multi-select for formatting." tags={["2 variants", "Single / multiple"]} />
      <Import names="ToggleGroup" />
      <Section title="Usage">
        <Showcase code={`<ToggleGroup multiple value={fmt} onChange={setFmt} items={[
  { value: "bold", icon: <RiBold />, label: "Bold" },
  { value: "italic", icon: <RiItalic />, label: "Italic" },
]} />`}>
          <ToggleGroup multiple value={fmt} onChange={setFmt} items={[{ value: "bold", icon: <RiBold />, label: "Bold" }, { value: "italic", icon: <RiItalic />, label: "Italic" }, { value: "underline", icon: <RiUnderline />, label: "Underline" }]} />
          <ToggleGroup value={align} onChange={setAlign} items={[{ value: "left", icon: <RiAlignLeft /> }, { value: "center", icon: <RiAlignCenter /> }, { value: "right", icon: <RiAlignRight /> }]} />
          <ToggleGroup size="sm" value={align} onChange={setAlign} items={[{ value: "left", icon: <RiAlignLeft /> }, { value: "center", icon: <RiAlignCenter /> }, { value: "right", icon: <RiAlignRight /> }]} />
        </Showcase>
      </Section>
      <Section title="Variants">
        <Showcase code={`<ToggleGroup variant="outline" value={align} onChange={setAlign} items={[...]} />`}>
          <ToggleGroup variant="filled" value={align} onChange={setAlign} items={[{ value: "left", icon: <RiAlignLeft />, label: "Left" }, { value: "center", icon: <RiAlignCenter />, label: "Center" }, { value: "right", icon: <RiAlignRight />, label: "Right" }]} />
          <ToggleGroup variant="outline" value={align} onChange={setAlign} items={[{ value: "left", icon: <RiAlignLeft />, label: "Left" }, { value: "center", icon: <RiAlignCenter />, label: "Center" }, { value: "right", icon: <RiAlignRight />, label: "Right" }]} />
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "items", type: "{ value: T; icon: ReactNode; label?: string }[]", required: true, description: "label doubles as the accessible name / tooltip." },
          { name: "value", type: "T[]", required: true, description: "Selected values (controlled)." },
          { name: "variant", type: '"filled" | "outline"', default: '"filled"', description: "Surface card or hairline group." },
          { name: "size", type: '"sm" | "md"', default: '"md"', description: "32 or 40px cells." },
          { name: "multiple", type: "boolean", default: "false", description: "Exclusive selection when omitted." },
        ]} />
      </Section>
    </>
  );
}

export function WidgetBoxDoc() {
  return (
    <>
      <PageHeader eyebrow="Components · Data Display" title="Widget Box" description="The dashboard container: a titled header with an icon and action slot, a divided body and an optional footer." tags={["Dashboard", "Slots"]} />
      <Import names="WidgetBox" />
      <Section title="Usage">
        <Showcase align="stretch" code={`<WidgetBox icon={<RiDashboardLine />} title="Storage" action={<LinkButton variant="primary" size="sm">Manage</LinkButton>}>
  …
</WidgetBox>`}>
          <div className="grid gap-4 md:grid-cols-2">
            <WidgetBox icon={<RiDashboardLine />} title="Storage" action={<LinkButton variant="primary" size="sm">Manage</LinkButton>} footer={<p className="text-paragraph-xs text-subtle">Upgrade for 500 GB</p>}>
              <p className="text-title-h5 tabular-nums">38.2 <span className="text-paragraph-sm text-muted">/ 50 GB</span></p>
              <Progress value={76} size="sm" className="mt-3" tone="warning" />
              <div className="mt-3 flex flex-wrap gap-2"><Chip size="sm" variant="outline">Images 21 GB</Chip><Chip size="sm" variant="outline">Video 12 GB</Chip><Chip size="sm" variant="outline">Docs 5 GB</Chip></div>
            </WidgetBox>
            <WidgetBox icon={<RiGitCommitLine />} title="Recent deployments" action={<Button size="xs" variant="outline" tone="default" startContent={<RiFilterLine />}>Filter</Button>}>
              <ul className="space-y-3">
                {[["main@4f21ac", "completed"], ["feat/tokens@9b1c", "pending"], ["fix/ring@e77a", "failed"]].map(([n, s]) => (
                  <li key={n} className="flex items-center justify-between"><span className="font-mono text-paragraph-xs text-foreground">{n}</span><StatusBadge status={s as "completed"} size="sm" className="capitalize">{s}</StatusBadge></li>
                ))}
              </ul>
            </WidgetBox>
          </div>
        </Showcase>
      </Section>
      <Section title="Density" description="Compact tightens header, body and footer padding for dense dashboards.">
        <Showcase align="stretch" code={`<WidgetBox density="comfortable" icon={<RiDashboardLine />} title="Storage">
  …
</WidgetBox>
<WidgetBox density="compact" icon={<RiDashboardLine />} title="Storage">
  …
</WidgetBox>`}>
          <WidgetBox density="comfortable" icon={<RiDashboardLine />} title="Storage"><p className="text-paragraph-xs text-muted">Comfortable padding — header, body and footer at the standard scale.</p></WidgetBox>
          <WidgetBox density="compact" icon={<RiDashboardLine />} title="Storage" footer={<p className="text-paragraph-xs text-subtle">Footer slot also tightens</p>}><p className="text-paragraph-xs text-muted">Compact padding — tighter rows for data-heavy dashboards.</p></WidgetBox>
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "icon", type: "ReactNode", description: "20px leading icon in the header." },
          { name: "title", type: "ReactNode", required: true, description: "Header title." },
          { name: "action", type: "ReactNode", description: "Trailing header action." },
          { name: "density", type: '"comfortable" | "compact"', default: '"comfortable"', description: "Padding scale for header, body and footer." },
          { name: "footer", type: "ReactNode", description: "Optional divided footer." },
        ]} />
      </Section>
    </>
  );
}

export function ColorPickerDoc() {
  const [c, setC] = useState("#335CFF");
  return (
    <>
      <PageHeader eyebrow="Components · Forms" title="Color Picker" description="A swatch palette with a hex field and live preview, for labels, tags and brand settings." tags={["12 swatches", "Hex input"]} />
      <Import names="ColorPicker" />
      <Section title="Usage">
        <Showcase code={`<ColorPicker value={color} onChange={setColor} />`}>
          <ColorPicker value={c} onChange={setC} />
          <div className="flex flex-col items-center gap-2">
            <span className="h-16 w-16 rounded-2xl shadow-md" style={{ background: c }} />
            <span className="font-mono text-paragraph-xs text-muted">{c}</span>
          </div>
        </Showcase>
      </Section>
    </>
  );
}

export function TimelineDoc() {
  return (
    <>
      <PageHeader eyebrow="Components · Data Display" title="Timeline" description="A vertical activity log with tone-coloured dots for status changes, comments and deploy events." tags={["Tones"]} />
      <Import names="Timeline" />
      <Section title="Usage">
        <Showcase align="start" code={`<Timeline items={[
  { time: "09:42", title: "Deployment succeeded", tone: "success" },
  { time: "09:38", title: "Build started", tone: "accent" },
]} />`}>
          <Timeline items={[
            { time: "Today · 09:42", title: "Deployment succeeded", description: "v3.2.0 promoted to production by Sophia.", tone: "success" },
            { time: "Today · 09:38", title: "Build started", description: "main@4f21ac · 1,904 modules", tone: "accent" },
            { time: "Yesterday · 17:05", title: "Preview failed", description: "Module not found: ./ui/Timeline", tone: "danger" },
            { time: "Yesterday · 16:20", title: "Pull request opened", description: "feat: OKLCH ramp generator" },
          ]} />
        </Showcase>
      </Section>
    </>
  );
}

export function EmptyStateDoc() {
  return (
    <>
      <PageHeader eyebrow="Components · Feedback" title="Empty State" description="What users see before there is data. An icon in a soft ring, a plain-language title, one line of guidance and at most two actions." tags={["Actions"]} />
      <Import names="EmptyState" />
      <Section title="Usage">
        <Showcase align="stretch" padded={false} code={`<EmptyState icon={<RiInboxLine />} title="No projects yet" description="Create your first project to start deploying." actions={<Button startContent={<RiAddLine />}>New project</Button>} />`}>
          <EmptyState icon={<RiInboxLine />} title="No projects yet" description="Create your first project to start deploying previews and tracking usage." actions={<><Button startContent={<RiAddLine />}>New project</Button><Button variant="outline" tone="default">Import from GitHub</Button></>} />
        </Showcase>
      </Section>
      <Section title="Variants" description="Minimal strips the outer ring and shrinks the well for inline panels; cta enlarges the well and title for first-run screens.">
        <Showcase align="stretch" code={`<EmptyState variant="minimal" icon={<RiInboxLine />} title="No results" description="Try a different search." />
<EmptyState variant="cta" icon={<RiRocketLine />} title="Launch your first project" description="Unseen builds previews in seconds." actions={<Button startContent={<RiAddLine />}>New project</Button>} />`}>
          <div className="grid gap-4 md:grid-cols-2">
            <EmptyState variant="minimal" icon={<RiInboxLine />} title="No results" description="Try a different search or clear the filters." />
            <EmptyState variant="cta" icon={<RiRocketLine />} title="Launch your first project" description="Unseen builds previews in seconds — start with the starter template." actions={<Button startContent={<RiAddLine />}>New project</Button>} />
          </div>
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "icon", type: "ReactNode", required: true, description: "28px icon, centred in the soft ring." },
          { name: "title", type: "ReactNode", required: true, description: "Plain-language statement of what is missing." },
          { name: "variant", type: '"default" | "minimal" | "cta"', default: '"default"', description: "default: standard well · minimal: smaller, no outer ring · cta: enlarged well and title for first-run screens." },
          { name: "description", type: "ReactNode", description: "One line of guidance — what the user should do next." },
          { name: "actions", type: "ReactNode", description: "At most two actions; primary first." },
        ]} />
      </Section>
    </>
  );
}
