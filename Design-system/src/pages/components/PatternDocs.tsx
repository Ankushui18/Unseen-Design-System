import { useState } from "react";
import {
  RiAlignCenter,
  RiAlignLeft,
  RiAlignRight,
  RiArrowRightSLine,
  RiBankCardLine,
  RiBold,
  RiBuildingLine,
  RiCodeLine,
  RiDeleteBinLine,
  RiFileTextLine,
  RiFolderLine,
  RiGlobalLine,
  RiImageLine,
  RiItalic,
  RiLink,
  RiRocketLine,
  RiShieldCheckLine,
  RiTeamLine,
  RiUnderline,
  RiWalletLine,
} from "@remixicon/react";
import { OptionPicker, PageHeader, PropsTable, Section, Showcase } from "../../docs/Blocks";
import { Button, FancyButton } from "../../ui/Button";
import { Avatar, Chip, Snippet, type BadgeColor, type BadgeVariant } from "../../ui/Display";
import { Input } from "../../ui/Form";
import { LinkButton, StatusBadge } from "../../ui/Extra";
import { AlertDialog, ButtonTile, ChatInput, Combobox, HoverCard, InfoLabel, InlineMessage, ListItem, PaymentCard, ProfileHoverCard, Toolbar, ToolbarButton, ToolbarSeparator, Well } from "../../ui/Patterns";

const Import = ({ names }: { names: string }) => <Snippet symbol="">{`import { ${names} } from "@aperture/react";`}</Snippet>;

const COLORS: BadgeColor[] = ["gray", "blue", "orange", "red", "green", "yellow", "purple", "sky", "pink", "teal"];
const VARIANTS: BadgeVariant[] = ["filled", "light", "lighter", "stroke"];

/* --------------------------- Button (AlignUI spec) -------------------------- */

export function ButtonSpecDoc() {
  const [mode, setMode] = useState<"solid" | "outline" | "soft" | "ghost">("solid");
  const [size, setSize] = useState<"md" | "sm" | "xs" | "xxs">("md");
  return (
    <>
      <PageHeader eyebrow="Components · Actions" title="Button" description="The base action. Four modes — filled, stroke, lighter and ghost — across five intents and four sizes. Regular buttons are flat; use Fancy Button for bevelled marketing CTAs." tags={["40 / 36 / 32 / 28", "4 modes", "Double focus ring"]} />
      <Import names="Button, FancyButton, ButtonGroup" />
      <Section title="Playground">
        <Showcase
          controls={<><OptionPicker label="Mode" value={mode} options={["solid", "outline", "soft", "ghost"] as const} onChange={setMode} /><OptionPicker label="Size" value={size} options={["md", "sm", "xs", "xxs"] as const} onChange={setSize} /></>}
          code={`<Button variant="${mode}" tone="accent" size="${size}">Button</Button>`}
        >
          {(["accent", "default", "danger"] as const).map((t) => (
            <Button key={t} variant={mode} tone={t} size={size} startContent={<RiRocketLine />} className="capitalize">{t === "accent" ? "Primary" : t === "default" ? "Neutral" : "Error"}</Button>
          ))}
          <Button variant={mode} tone="default" size={size} iconOnly aria-label="Icon"><RiRocketLine /></Button>
          <Button variant={mode} tone="default" size={size} disabled>Disabled</Button>
        </Showcase>
      </Section>
      <Section title="Matrix" description="Every intent × mode pair. Stroke neutral carries the xs shadow; hovering removes it and flips to the weak fill.">
        <Showcase align="stretch">
          <div className="grid gap-3">
            {(["solid", "outline", "soft", "ghost"] as const).map((m) => (
              <div key={m} className="flex flex-wrap items-center gap-2">
                <span className="w-16 font-mono text-[11px] text-subtle">{m === "solid" ? "filled" : m === "outline" ? "stroke" : m === "soft" ? "lighter" : m}</span>
                {(["accent", "default", "success", "warning", "danger"] as const).map((t) => <Button key={t} variant={m} tone={t} size="sm" className="capitalize">{t}</Button>)}
              </div>
            ))}
          </div>
        </Showcase>
      </Section>
      <Section title="Fancy Button" description="Bevel highlight, 1px ring shadow and a soft drop. Reserved for the single most important CTA on a marketing surface.">
        <Showcase code={`<FancyButton>Get all-access</FancyButton>
<FancyButton tone="default">Neutral</FancyButton>
<FancyButton tone="stroke">Stroke</FancyButton>`}>
          <FancyButton>Get all-access</FancyButton>
          <FancyButton tone="default">Neutral</FancyButton>
          <FancyButton tone="danger">Delete</FancyButton>
          <FancyButton tone="stroke">Stroke</FancyButton>
          <FancyButton tone="default" iconOnly aria-label="Launch"><RiRocketLine /></FancyButton>
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "variant", type: '"solid" | "outline" | "soft" | "ghost" | "link"', default: '"solid"', description: "Mode. Maps to AlignUI filled / stroke / lighter / ghost." },
          { name: "tone", type: '"accent" | "default" | "success" | "warning" | "danger"', default: '"accent"', description: "Intent colour." },
          { name: "size", type: '"md" | "sm" | "xs" | "xxs" | "lg"', default: '"md"', description: "40 · 36 · 32 · 28 · 48px." },
          { name: "startContent / endContent", type: "ReactNode", description: "20px icon slots, pulled in by −4px." },
          { name: "loading", type: "boolean", default: "false", description: "Swaps the leading slot for a spinner." },
        ]} />
      </Section>
    </>
  );
}

/* ------------------------------ Badge (10 colours) -------------------------- */

export function BadgeSpecDoc() {
  return (
    <>
      <PageHeader eyebrow="Components · Data Display" title="Badge" description="Ten colours × four variants × two sizes. Small is 16px uppercase; medium is 20px label. Dot and icon slots pull in so the pill stays visually balanced." tags={["10 colours", "4 variants", "Dot", "Square"]} />
      <Import names="Chip as Badge" />
      <Section title="Matrix">
        <Showcase align="stretch">
          <div className="space-y-3">
            {VARIANTS.map((v) => (
              <div key={v} className="flex flex-wrap items-center gap-2">
                <span className="w-14 font-mono text-[11px] text-subtle">{v}</span>
                {COLORS.map((c) => <Chip key={c} color={c} variant={v} className="capitalize">{c}</Chip>)}
              </div>
            ))}
          </div>
        </Showcase>
      </Section>
      <Section title="Sizes, dot, square, disabled">
        <Showcase code={`<Chip color="green" size="sm" dot>Active</Chip>
<Chip color="blue" square>8</Chip>`}>
          <Chip color="green" size="sm" dot>Active</Chip>
          <Chip color="green" dot>Active</Chip>
          <Chip color="blue" variant="filled" square>8</Chip>
          <Chip color="red" variant="light" square size="sm">99+</Chip>
          <Chip color="purple" variant="stroke" startContent={<RiRocketLine />}>Beta</Chip>
          <Chip color="blue" disabled>Disabled</Chip>
        </Showcase>
      </Section>
    </>
  );
}

/* --------------------------------- Patterns -------------------------------- */

export function ButtonTileDoc() {
  const [sel, setSel] = useState("web");
  return (
    <>
      <PageHeader eyebrow="Components · Actions" title="Button Tile" description="A large, icon-led selectable tile for onboarding choices and project types." tags={["Selectable", "Badge slot"]} />
      <Import names="ButtonTile" />
      <Section title="Usage">
        <Showcase align="stretch" code={`<ButtonTile icon={<RiGlobalLine />} label="Web app" description="Next.js, Remix, Vite" selected={sel === "web"} onClick={() => setSel("web")} />`}>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <ButtonTile icon={<RiGlobalLine />} label="Web app" description="Next.js, Remix, Vite" selected={sel === "web"} onClick={() => setSel("web")} />
            <ButtonTile icon={<RiCodeLine />} label="API service" description="Node, Go, Rust" selected={sel === "api"} onClick={() => setSel("api")} />
            <ButtonTile icon={<RiFileTextLine />} label="Docs site" description="MDX, Docusaurus" selected={sel === "docs"} onClick={() => setSel("docs")} badge={<Chip size="sm" color="blue">New</Chip>} />
            <ButtonTile icon={<RiImageLine />} label="Static" description="HTML & assets" disabled />
          </div>
        </Showcase>
      </Section>
    </>
  );
}

export function InfoLabelDoc() {
  return (
    <>
      <PageHeader eyebrow="Components · Data Display" title="Info Label & Inline Message" description="Small metadata primitives: a caption/value pair for stats and a one-line iconised message for inline feedback." tags={["Tones"]} />
      <Import names="InfoLabel, InlineMessage" />
      <Section title="Info Label">
        <Showcase align="stretch">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            <InfoLabel label="MRR" value="$28,914" hint="+6.2% vs last month" tone="success" />
            <InfoLabel label="Churn" value="1.4%" tone="danger" />
            <InfoLabel label="Seats" value="42 / 50" />
            <InfoLabel label="Renews" value="Mar 12" tone="accent" />
          </div>
        </Showcase>
      </Section>
      <Section title="Inline Message">
        <Showcase align="stretch">
          <div className="space-y-2">
            <InlineMessage tone="accent">Changes are saved automatically.</InlineMessage>
            <InlineMessage tone="success">Domain verified successfully.</InlineMessage>
            <InlineMessage tone="warning">Your trial ends in 3 days.</InlineMessage>
            <InlineMessage tone="danger">Password must include a number.</InlineMessage>
          </div>
        </Showcase>
      </Section>
    </>
  );
}

export function ListItemDoc() {
  const [sel, setSel] = useState(1);
  return (
    <>
      <PageHeader eyebrow="Components · Data Display" title="List Item" description="The universal row: leading avatar or icon, title, description, meta badge and a trailing slot. Optionally interactive." tags={["Selectable"]} />
      <Import names="ListItem" />
      <Section title="Usage">
        <Showcase align="stretch" code={`<ListItem leading={<Avatar name="Sophia" size="sm" />} title="Sophia Williams" description="Product Designer" trailing={<RiArrowRightSLine />} onClick={…} />`}>
          <div className="w-full max-w-md rounded-2xl bg-surface p-1.5 ring-1 ring-border">
            {[["Sophia Williams", "Product Designer", "Owner"], ["James Brown", "Engineer", "Admin"], ["Lena Müller", "Design Ops", "Member"]].map(([n, d, r], i) => (
              <ListItem key={n} leading={<Avatar name={n} size="sm" tone={(["accent", "success", "warning"] as const)[i]} />} title={n} description={d} meta={<Chip size="sm" color={i === 0 ? "blue" : "gray"} variant="lighter">{r}</Chip>} trailing={<RiArrowRightSLine />} selected={sel === i} onClick={() => setSel(i)} />
            ))}
          </div>
          <div className="w-full max-w-md rounded-2xl bg-surface p-1.5 ring-1 ring-border">
            <ListItem leading={<RiFolderLine />} title="Design tokens" description="Updated 2h ago" trailing={<StatusBadge status="completed" size="sm">Synced</StatusBadge>} />
            <ListItem leading={<RiFileTextLine />} title="Brand guidelines.pdf" description="2.4 MB" trailing={<LinkButton variant="primary" size="sm">Open</LinkButton>} />
          </div>
        </Showcase>
      </Section>
    </>
  );
}

export function ToolbarDoc() {
  const [fmt, setFmt] = useState<string[]>(["bold"]);
  const [al, setAl] = useState("left");
  const t = (k: string) => setFmt((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k]));
  return (
    <>
      <PageHeader eyebrow="Components · Actions" title="Toolbar" description="A floating formatting bar with pressed-state buttons and separators." tags={["Floating", "Pressed"]} />
      <Import names="Toolbar, ToolbarButton, ToolbarSeparator" />
      <Section title="Usage">
        <Showcase code={`<Toolbar>
  <ToolbarButton icon={<RiBold />} label="Bold" active />
  <ToolbarSeparator />
  <ToolbarButton icon={<RiLink />} label="Link" />
</Toolbar>`}>
          <Toolbar>
            <ToolbarButton icon={<RiBold />} label="Bold" active={fmt.includes("bold")} onClick={() => t("bold")} />
            <ToolbarButton icon={<RiItalic />} label="Italic" active={fmt.includes("italic")} onClick={() => t("italic")} />
            <ToolbarButton icon={<RiUnderline />} label="Underline" active={fmt.includes("underline")} onClick={() => t("underline")} />
            <ToolbarSeparator />
            <ToolbarButton icon={<RiAlignLeft />} label="Align left" active={al === "left"} onClick={() => setAl("left")} />
            <ToolbarButton icon={<RiAlignCenter />} label="Align center" active={al === "center"} onClick={() => setAl("center")} />
            <ToolbarButton icon={<RiAlignRight />} label="Align right" active={al === "right"} onClick={() => setAl("right")} />
            <ToolbarSeparator />
            <ToolbarButton icon={<RiLink />} label="Link" />
            <ToolbarButton icon={<RiImageLine />} label="Image" disabled />
          </Toolbar>
        </Showcase>
      </Section>
    </>
  );
}

export function HoverCardDoc() {
  return (
    <>
      <PageHeader eyebrow="Components · Overlays" title="Hover Card" description="A rich preview that opens on hover or focus, with a short delay so it never flickers while the pointer passes by." tags={["Delay", "Focusable"]} />
      <Import names="HoverCard, ProfileHoverCard" />
      <Section title="Usage">
        <Showcase code={`<HoverCard trigger={<LinkButton variant="black">@sophia</LinkButton>}>
  <ProfileHoverCard name="Sophia Williams" handle="@sophia" bio="…" />
</HoverCard>`}>
          <p className="text-paragraph-sm text-muted">
            Reviewed by{" "}
            <HoverCard trigger={<LinkButton variant="black" underline>@sophia</LinkButton>}>
              <ProfileHoverCard name="Sophia Williams" handle="@sophia · Product Designer" bio="Designing systems that scale. Previously at Linear and Vercel." stats={[["4,812", "followers"], ["312", "following"]]} action={<Button size="xs" tone="default">Follow</Button>} />
            </HoverCard>{" "}
            and{" "}
            <HoverCard trigger={<LinkButton variant="black" underline>@james</LinkButton>}>
              <ProfileHoverCard name="James Brown" handle="@james · Engineer" bio="Builds the token pipeline and the Figma sync." avatarTone="success" stats={[["3.1k", "followers"], ["210", "following"]]} action={<Button size="xs" variant="outline" tone="default">Following</Button>} />
            </HoverCard>
            .
          </p>
        </Showcase>
      </Section>
    </>
  );
}

export function ChatInputDoc() {
  const [v, setV] = useState("");
  const [log, setLog] = useState<string[]>([]);
  return (
    <>
      <PageHeader eyebrow="Components · Forms" title="Chat Input" description="An AI-style composer: auto-growing textarea, attachment and voice actions, model chip, suggestion pills and Enter-to-send." tags={["AI", "Auto-grow", "Suggestions"]} />
      <Import names="ChatInput" />
      <Section title="Usage">
        <Showcase align="stretch" code={`<ChatInput value={v} onChange={setV} onSend={send} suggestions={["Summarise this page", "Generate a palette"]} />`}>
          <div className="mx-auto w-full max-w-2xl space-y-3">
            {log.map((m, i) => <div key={i} className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-md bg-neutral-950 px-4 py-2.5 text-paragraph-sm text-white dark:bg-white dark:text-neutral-950">{m}</div>)}
            <ChatInput value={v} onChange={setV} onSend={() => { if (v.trim()) { setLog((l) => [...l, v.trim()]); setV(""); } }} suggestions={["Summarise this page", "Generate an accent palette", "Explain the token layers"]} />
          </div>
        </Showcase>
      </Section>
    </>
  );
}

export function AlertDialogDoc() {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  return (
    <>
      <PageHeader eyebrow="Components · Overlays" title="Alert Dialog" description="A focused confirmation built on Modal: tone-tinted icon, one sentence of consequence and two equal-width actions." tags={["Confirm", "Destructive"]} />
      <Import names="AlertDialog" />
      <Section title="Usage">
        <Showcase code={`<AlertDialog open={open} onClose={close} onConfirm={remove} tone="danger" icon={<RiDeleteBinLine />}
  title="Delete project?" description="All deployments and logs will be permanently removed." confirmLabel="Delete" />`}>
          <Button tone="danger" variant="outline" onClick={() => setOpen(true)} startContent={<RiDeleteBinLine />}>Delete project</Button>
          {done && <InlineMessage tone="success">Project deleted.</InlineMessage>}
          <AlertDialog open={open} onClose={() => setOpen(false)} onConfirm={() => setDone(true)} tone="danger" icon={<RiDeleteBinLine />} title="Delete project?" description="All deployments, environment variables and logs will be permanently removed. This cannot be undone." confirmLabel="Delete project" />
        </Showcase>
      </Section>
    </>
  );
}

export function ComboboxDoc() {
  const [v, setV] = useState<string | null>("euw2");
  const [u, setU] = useState<string | null>(null);
  return (
    <>
      <PageHeader eyebrow="Components · Forms" title="Combobox" description="A searchable select with keyboard navigation, icons, descriptions and a selected checkmark." tags={["Search", "Keyboard"]} />
      <Import names="Combobox" />
      <Section title="Usage">
        <Showcase align="stretch" code={`<Combobox label="Region" value={v} onChange={setV} items={[{ value: "euw2", label: "eu-west-2", description: "London", icon: <RiBuildingLine /> }]} />`}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Combobox label="Region" value={v} onChange={setV} items={[
              { value: "use1", label: "us-east-1", description: "N. Virginia", icon: <RiBuildingLine /> },
              { value: "usw2", label: "us-west-2", description: "Oregon", icon: <RiBuildingLine /> },
              { value: "euw2", label: "eu-west-2", description: "London", icon: <RiBuildingLine /> },
              { value: "euc1", label: "eu-central-1", description: "Frankfurt", icon: <RiBuildingLine /> },
              { value: "aps1", label: "ap-south-1", description: "Mumbai", icon: <RiBuildingLine /> },
            ]} />
            <Combobox label="Assignee" placeholder="Choose a teammate" value={u} onChange={setU} items={[
              { value: "s", label: "Sophia Williams", description: "Owner", icon: <RiTeamLine /> },
              { value: "j", label: "James Brown", description: "Admin", icon: <RiTeamLine /> },
              { value: "l", label: "Lena Müller", description: "Member", icon: <RiTeamLine /> },
            ]} />
          </div>
        </Showcase>
      </Section>
    </>
  );
}

export function PaymentCardDoc() {
  return (
    <>
      <PageHeader eyebrow="Components · Data Display" title="Payment Card" description="A stylised card visual for billing screens, in dark, accent and light finishes." tags={["3 finishes"]} />
      <Import names="PaymentCard" />
      <Section title="Usage">
        <Showcase code={`<PaymentCard brand="visa" last4="4242" holder="Sophia Williams" expiry="09/28" />`}>
          <PaymentCard brand="visa" last4="4242" holder="Sophia Williams" expiry="09/28" />
          <PaymentCard brand="mastercard" last4="8210" holder="James Brown" expiry="02/27" variant="accent" />
          <PaymentCard brand="amex" last4="1007" holder="Lena Müller" expiry="11/29" variant="light" />
        </Showcase>
      </Section>
      <Section title="In a billing form">
        <Showcase align="stretch">
          <div className="grid items-start gap-6 md:grid-cols-[340px_1fr]">
            <PaymentCard brand="visa" last4="4242" holder="Sophia Williams" expiry="09/28" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Card number" placeholder="4242 4242 4242 4242" startContent={<RiBankCardLine />} wrapperClassName="sm:col-span-2" />
              <Input label="Expiry" placeholder="MM / YY" />
              <Input label="CVC" placeholder="•••" endContent={<RiShieldCheckLine />} />
              <Input label="Amount" prefixAffix="$" suffixAffix="USD" placeholder="0.00" wrapperClassName="sm:col-span-2" />
            </div>
          </div>
        </Showcase>
      </Section>
    </>
  );
}

export function WellDoc() {
  return (
    <>
      <PageHeader eyebrow="Components · Data Display" title="Well" description="A recessed container for secondary content: code previews, summaries and grouped settings." tags={["3 variants"]} />
      <Import names="Well" />
      <Section title="Variants">
        <Showcase align="stretch">
          <div className="grid gap-4 sm:grid-cols-3">
            <Well><p className="text-label-sm">Default</p><p className="mt-1 text-paragraph-xs text-muted">Weak fill with a faint inset ring.</p></Well>
            <Well variant="inset"><p className="text-label-sm">Inset</p><p className="mt-1 text-paragraph-xs text-muted">Inner shadow, no ring.</p></Well>
            <Well variant="dashed"><p className="text-label-sm">Dashed</p><p className="mt-1 text-paragraph-xs text-muted">For drop zones and placeholders.</p></Well>
          </div>
          <Well className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3"><RiWalletLine size={20} className="text-muted" /><div><p className="text-label-sm">Order summary</p><p className="text-paragraph-xs text-muted">3 items · ships Friday</p></div></div>
            <span className="text-label-md tabular-nums">$248.00</span>
          </Well>
        </Showcase>
      </Section>
    </>
  );
}
