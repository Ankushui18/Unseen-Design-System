import { useState } from "react";
import { Callout, Import, PageHeader, PropsTable, Section, Showcase, OptionPicker } from "../../docs/Blocks";
import { Button } from "../../ui/Button";
import { Avatar, Card, Chip, Code, Divider, Kbd, Snippet } from "../../ui/Display";
import { Input, Switch } from "../../ui/Form";
import { Accordion, Breadcrumbs, Pagination, Tabs } from "../../ui/Navigation";
import { Drawer, MenuItem, MenuLabel, MenuSeparator, Modal, Popover, Tooltip, useToast } from "../../ui/Overlay";
import { RiArrowRightSLine, RiBankCardLine, RiBarChartLine, RiDeleteBinLine, RiExternalLinkLine, RiFileCopyLine, RiFolderAddLine, RiLogoutBoxLine, RiNotification3Line, RiPencilLine, RiPulseLine, RiSettings3Line, RiShareLine, RiTeamLine, RiUserAddLine } from "@remixicon/react";

/* ---------------------------------- TABS ---------------------------------- */

const TAB_VARIANTS = ["solid", "segment", "underline", "pill"] as const;

export function TabsDoc() {
  const [variant, setVariant] = useState<(typeof TAB_VARIANTS)[number]>("solid");
  const [v, setV] = useState("overview");
  return (
    <>
      <PageHeader eyebrow="Components · Navigation" title="Tabs" description="Switches between sibling views inside one context. Tabs never navigate away from the page — use links for that." tags={["4 variants", "Arrow keys", "Lazy panels"]} />
      <Import names="Tabs" />
      <Section title="Playground">
        <Showcase
          align="stretch"
          controls={<OptionPicker label="Variant" value={variant} options={TAB_VARIANTS} onChange={setVariant} />}
          code={`<Tabs
  variant="${variant}"
  value={value}
  onChange={setValue}
  items={[
    { key: "overview", label: "Overview", icon: <Activity /> },
    { key: "analytics", label: "Analytics" },
    { key: "settings", label: "Settings" },
  ]}
/>`}
        >
          <Tabs
            variant={variant}
            value={v}
            onChange={setV}
            items={[
              { key: "overview", label: "Overview", icon: <RiPulseLine />, content: <Card className="p-5 text-paragraph-sm text-muted">Traffic is up 18% week over week across all regions.</Card> },
              { key: "analytics", label: "Analytics", icon: <RiBarChartLine />, content: <Card className="p-5 text-paragraph-sm text-muted">42,108 sessions · 3m 12s average duration.</Card> },
              { key: "members", label: "Members", icon: <RiTeamLine />, badge: <Chip size="sm" tone="accent">4</Chip>, content: <Card className="p-5 text-paragraph-sm text-muted">4 members, 1 pending invitation.</Card> },
              { key: "archived", label: "Archived", disabled: true },
            ]}
          />
        </Showcase>
      </Section>
      <Section title="Sizes & full width">
        <Showcase align="stretch">
          <div className="w-full space-y-5">
            {(["sm", "md", "lg"] as const).map((s) => (
              <Tabs key={s} size={s} variant="segment" value="a" onChange={() => {}} items={[{ key: "a", label: "Active" }, { key: "b", label: "Inactive" }]} />
            ))}
            <Tabs fullWidth variant="segment" value="a" onChange={() => {}} items={[{ key: "a", label: "Monthly" }, { key: "b", label: "Annual" }]} />
          </div>
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "items", type: "{ key, label, icon?, content?, badge?, disabled? }[]", required: true, description: "Tab definitions. Content renders in the panel below." },
          { name: "value", type: "string", required: true, description: "Key of the active tab." },
          { name: "onChange", type: "(key: string) => void", required: true, description: "Fires when a tab is selected." },
          { name: "variant", type: '"solid" | "segment" | "underline" | "pill"', default: '"solid"', description: "Visual treatment of the tab list." },
          { name: "fullWidth", type: "boolean", default: "false", description: "Distributes tabs evenly across the container." },
        ]} />
      </Section>
    </>
  );
}

/* ---------------------------- TAB MENU HORIZONTAL ------------------------- */

export function HorizontalTabMenuDoc() {
  const [v, setV] = useState("overview");
  return (
    <>
      <PageHeader eyebrow="Components · Navigation" title="Tab Menu Horizontal" description="A linear row for switching between sibling sections or categories — the central navigation pattern for settings, dashboards and profile pages. Underline is the default; count badges and icons can ride along." tags={["Underline", "Full width", "Counts"]} />
      <Import names="Tabs" />
      <Section title="Menu style">
        <Showcase
          align="stretch"
          code={`<Tabs\n  variant="underline"\n  fullWidth\n  value={tab}\n  onChange={setTab}\n  items={[\n    { key: "overview", label: "Overview" },\n    { key: "analytics", label: "Analytics" },\n    { key: "members", label: "Members", badge: <Chip size="sm">4</Chip> },\n    { key: "settings", label: "Settings" },\n  ]}\n/>`}
        >
          <div className="w-full space-y-5">
            <Tabs
              variant="underline"
              fullWidth
              value={v}
              onChange={setV}
              items={[
                { key: "overview", label: "Overview", icon: <RiPulseLine /> },
                { key: "analytics", label: "Analytics", icon: <RiBarChartLine /> },
                { key: "members", label: "Members", icon: <RiTeamLine />, badge: <Chip size="sm" tone="accent">4</Chip> },
                { key: "settings", label: "Settings", icon: <RiSettings3Line /> },
              ]}
            />
            <div className="rounded-2xl bg-surface p-5 ring-1 ring-border">
              <p className="text-label-md capitalize">{v}</p>
              <p className="mt-1 text-paragraph-sm text-muted">{v === "overview" ? "Traffic is up 18% week over week across all regions." : `Panel content for the ${v} section.`}</p>
            </div>
          </div>
        </Showcase>
      </Section>
      <Section title="Menu variants" description="The same Tabs primitive renders pill, segment and filled menus — keep one component, switch the surface.">
        <Showcase align="stretch">
          <div className="w-full space-y-5">
            {([("underline" as const), ("pill" as const), ("segment" as const), ("solid" as const)]).map((variant) => (
              <Tabs key={variant} variant={variant} value={"a"} onChange={() => {}} items={[{ key: "a", label: "Monthly" }, { key: "b", label: "Annual" }, { key: "c", label: "Custom" }]} />
            ))}
          </div>
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "items", type: "{ key, label, icon?, badge?, disabled? }[]", required: true, description: "Menu entries. Prefer short, scannable labels." },
          { name: "value", type: "string", required: true, description: "Key of the active entry." },
          { name: "onChange", type: "(key: string) => void", required: true, description: "Fires when an entry is selected." },
          { name: "variant", type: '"solid" | "segment" | "underline" | "pill"', default: '"solid"', description: "Use underline or pill for menu-style navigation." },
          { name: "fullWidth", type: "boolean", default: "false", description: "Stretches entries evenly across the row." },
        ]} />
      </Section>
    </>
  );
}

/* -------------------------------- ACCORDION ------------------------------- */

export function AccordionDoc() {
  return (
    <>
      <PageHeader eyebrow="Components · Navigation" title="Accordion" description="Progressive disclosure for long, scannable content. The height transition uses a CSS grid trick, so it animates correctly at any content size." tags={["3 variants", "Multiple open", "Animated"]} />
      <Import names="Accordion" />
      <Section title="Variants">
        <Showcase align="stretch" code={`<Accordion
  variant="bordered"
  defaultOpen={["a"]}
  items={[
    { key: "a", title: "What is a design token?", content: "…" },
  ]}
/>`}>
          <div className="w-full space-y-5">
            {(["bordered", "split", "flush"] as const).map((variant) => (
              <div key={variant}>
                <p className="mb-2 font-mono text-[11px] text-subtle">{variant}</p>
                <Accordion
                  variant={variant}
                  defaultOpen={variant === "bordered" ? ["a"] : []}
                  items={[
                    { key: "a", title: "What is a design token?", subtitle: "Foundations", content: "A named entity that stores a visual design decision. Tokens replace hard-coded values so a single change propagates everywhere at once." },
                    { key: "b", title: "How do I override the accent color?", content: "Set --accent-h and --accent-c on :root. The full eleven-step ramp and every semantic alias regenerate automatically." },
                    { key: "c", title: "Does it support server components?", content: "Yes. Static components render on the server; interactive ones are marked \"use client\" inside the package." },
                  ]}
                />
              </div>
            ))}
          </div>
        </Showcase>
      </Section>
      <Section title="Multiple open">
        <Showcase align="stretch">
          <Accordion
            multiple
            variant="split"
            defaultOpen={["1", "2"]}
            items={[
              { key: "1", title: "Shipping", icon: <RiPulseLine />, content: "Dispatched within two business days." },
              { key: "2", title: "Returns", icon: <RiShareLine />, content: "Thirty-day window, no questions asked." },
              { key: "3", title: "Warranty", icon: <RiSettings3Line />, content: "Two years against manufacturing defects." },
            ]}
          />
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "items", type: "{ key, title, subtitle?, content, icon?, disabled? }[]", required: true, description: "Disclosure panels." },
          { name: "variant", type: '"bordered" | "split" | "flush"', default: '"bordered"', description: "Container treatment." },
          { name: "multiple", type: "boolean", default: "false", description: "Allows more than one panel open at a time." },
          { name: "defaultOpen", type: "string[]", default: "[]", description: "Keys open on first render." },
        ]} />
      </Section>
    </>
  );
}

/* ------------------------------- BREADCRUMBS ------------------------------ */

export function BreadcrumbsDoc() {
  return (
    <>
      <PageHeader eyebrow="Components · Navigation" title="Breadcrumbs" description="Shows the position of the current page within a hierarchy and provides one-click escape upward. The last item is the current page and is never a link." tags={["Hierarchy", "Truncating"]} />
      <Import names="Breadcrumbs" />
      <Section title="Usage">
        <Showcase align="stretch" code={`<Breadcrumbs
  items={[
    { label: "Home", href: "#/" },
    { label: "Components", href: "#/components/button" },
    { label: "Breadcrumbs" },
  ]}
/>`}>
          <div className="w-full space-y-4">
            <Breadcrumbs items={[{ label: "Home", href: "#/" }, { label: "Components", href: "#/components/button" }, { label: "Breadcrumbs" }]} />
            <Divider />
            <Breadcrumbs items={[{ label: "acme-inc", href: "#/" }, { label: "production", href: "#/" }, { label: "services", href: "#/" }, { label: "api-gateway" }]} />
          </div>
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[{ name: "items", type: "{ label: ReactNode; href?: string }[]", required: true, description: "Ordered path. The final item renders as plain text." }]} />
      </Section>
    </>
  );
}

/* ------------------------------- PAGINATION ------------------------------- */

export function PaginationDoc() {
  const [p, setP] = useState(5);
  return (
    <>
      <PageHeader eyebrow="Components · Navigation" title="Pagination" description="Navigates a large result set page by page. Ellipses collapse distant pages while always keeping the first, last and current page reachable." tags={["Ellipsis", "Compact mode"]} />
      <Import names="Pagination" />
      <Section title="Usage">
        <Showcase align="stretch" code={`<Pagination page={page} total={20} onChange={setPage} />`}>
          <div className="flex w-full flex-col items-center gap-5">
            <Pagination page={p} total={20} onChange={setP} />
            <Pagination page={p} total={20} onChange={setP} compact />
            <Pagination page={p} total={20} onChange={setP} siblings={2} />
            <p className="text-paragraph-xs text-muted">Page <span className="font-mono text-foreground">{p}</span> of 20</p>
          </div>
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "page", type: "number", required: true, description: "Current 1-based page." },
          { name: "total", type: "number", required: true, description: "Total number of pages." },
          { name: "onChange", type: "(page: number) => void", required: true, description: "Fires with the requested page." },
          { name: "siblings", type: "number", default: "1", description: "Pages rendered either side of the current page." },
          { name: "compact", type: "boolean", default: "false", description: "Hides the first/last jump controls." },
        ]} />
      </Section>
    </>
  );
}

/* ---------------------------------- MODAL --------------------------------- */

export function ModalDoc() {
  const [open, setOpen] = useState(false);
  const [danger, setDanger] = useState(false);
  const [form, setForm] = useState(false);
  return (
    <>
      <PageHeader eyebrow="Components · Overlays" title="Modal" description="Interrupts the user to confirm, collect or warn. Modals trap focus, lock body scroll, close on Escape and restore focus to the trigger on exit." tags={["Focus trap", "Escape", "5 sizes"]} />
      <Import names="Modal" />
      <Section title="Usage">
        <Showcase code={`<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Invite teammates"
  description="They'll receive an email invitation."
  footer={<><Button variant="ghost" tone="default">Cancel</Button><Button>Send</Button></>}
>
  <Input label="Email addresses" />
</Modal>`}>
          <Button onClick={() => setOpen(true)}>Open modal</Button>
          <Button variant="outline" tone="default" onClick={() => setForm(true)}>Form modal</Button>
          <Button variant="soft" tone="danger" onClick={() => setDanger(true)}>Destructive</Button>

          <Modal open={open} onClose={() => setOpen(false)} icon={<RiUserAddLine />} iconTone="accent" title="Invite teammates" description="They'll receive an email invitation to join this workspace." footer={<><Button variant="ghost" tone="default" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={() => setOpen(false)}>Send invites</Button></>}>
            <p>Anyone with an <Code>@acme.io</Code> address can join without approval.</p>
          </Modal>

          <Modal open={form} onClose={() => setForm(false)} size="lg" icon={<RiFolderAddLine />} title="Create project" description="Projects group deployments, environments and members." footer={<><Button variant="ghost" tone="default" onClick={() => setForm(false)}>Cancel</Button><Button onClick={() => setForm(false)}>Create project</Button></>}>
            <div className="space-y-4">
              <Input label="Project name" placeholder="acme-web" />
              <Input label="Repository" placeholder="github.com/acme/web" startContent={<RiExternalLinkLine />} />
              <Switch checked onChange={() => {}} label="Enable preview deployments" description="Build every pull request automatically." />
            </div>
          </Modal>

          <Modal open={danger} onClose={() => setDanger(false)} size="sm" icon={<RiDeleteBinLine />} iconTone="danger" title="Delete workspace?" description="This permanently removes 18 projects and 42 members. This action cannot be undone." footer={<><Button variant="ghost" tone="default" onClick={() => setDanger(false)}>Cancel</Button><Button tone="danger" onClick={() => setDanger(false)}>Delete forever</Button></>}>
            <Input label="Type acme-inc to confirm" placeholder="acme-inc" />
          </Modal>
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "open", type: "boolean", required: true, description: "Controls visibility." },
          { name: "onClose", type: "() => void", required: true, description: "Fires on backdrop click, Escape and close button." },
          { name: "size", type: '"sm" | "md" | "lg" | "xl" | "full"', default: '"md"', description: "Maximum dialog width." },
          { name: "placement", type: '"center" | "top"', default: '"center"', description: "Vertical anchoring." },
          { name: "footer", type: "ReactNode", description: "Two-column action row — buttons stretch to equal width." },
          { name: "icon", type: "ReactNode", description: "Leading icon rendered in a 40px ring." },
          { name: "iconTone", type: "Tone", default: '"default"', description: "Ring and icon colour." },
        ]} />
        <Callout title="Confirm destructive actions with friction">
          Destructive modals should require typing a confirmation value, and the confirm button must be the danger tone
          while the cancel button stays low emphasis.
        </Callout>
      </Section>
    </>
  );
}

/* --------------------------------- DRAWER --------------------------------- */

export function DrawerDoc() {
  const [side, setSide] = useState<"left" | "right" | "bottom">("right");
  const [open, setOpen] = useState(false);
  return (
    <>
      <PageHeader eyebrow="Components · Overlays" title="Drawer" description="A panel that slides in from an edge for secondary tasks: filters, details, settings. Keeps the underlying context visible." tags={["3 edges", "Focus trap", "Scrollable"]} />
      <Import names="Drawer" />
      <Section title="Usage">
        <Showcase
          controls={<OptionPicker label="Side" value={side} options={["left", "right", "bottom"] as const} onChange={setSide} />}
          code={`<Drawer open={open} onClose={close} side="${side}" title="Filters">
  …
</Drawer>`}
        >
          <Button onClick={() => setOpen(true)}>Open {side} drawer</Button>
          <Drawer
            open={open}
            onClose={() => setOpen(false)}
            side={side}
            title="Filters"
            footer={<><Button variant="ghost" tone="default" onClick={() => setOpen(false)}>Reset</Button><Button onClick={() => setOpen(false)}>Apply</Button></>}
          >
            <div className="space-y-4">
              <Input label="Search" placeholder="Filter by name…" />
              <Switch checked onChange={() => {}} label="Only active" />
              <Switch checked={false} onChange={() => {}} label="Include archived" />
              <Divider label="Advanced" />
              <Input label="Created after" type="date" />
              <p className="text-paragraph-xs">Filters persist per workspace and apply to every saved view.</p>
            </div>
          </Drawer>
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "open", type: "boolean", required: true, description: "Controls visibility." },
          { name: "onClose", type: "() => void", required: true, description: "Fires on backdrop click, Escape and close button." },
          { name: "side", type: '"left" | "right" | "bottom"', default: '"right"', description: "Edge the panel slides from." },
          { name: "width", type: "number", default: "400", description: "Panel width in pixels for left/right." },
          { name: "footer", type: "ReactNode", description: "Pinned action row." },
        ]} />
      </Section>
    </>
  );
}

/* --------------------------------- TOOLTIP -------------------------------- */

export function TooltipDoc() {
  return (
    <>
      <PageHeader eyebrow="Components · Overlays" title="Tooltip" description="A short, non-essential hint shown on hover or focus. Never put an action or critical information in a tooltip — touch users may never see it." tags={["Hover + focus", "4 placements", "Delay"]} />
      <Import names="Tooltip" />
      <Section title="Placements">
        <Showcase code={`<Tooltip content="Copy to clipboard" placement="top">
  <Button iconOnly aria-label="Copy"><Copy /></Button>
</Tooltip>`}>
          {(["top", "bottom", "left", "right"] as const).map((p) => (
            <Tooltip key={p} content={`Placed ${p}`} placement={p}>
              <Button variant="outline" tone="default" size="sm" className="capitalize">{p}</Button>
            </Tooltip>
          ))}
        </Showcase>
      </Section>
      <Section title="On icon buttons" description="The most common use. Pair it with an aria-label — the tooltip alone is not an accessible name.">
        <Showcase>
          {([[RiFileCopyLine, "Copy"], [RiPencilLine, "Rename"], [RiShareLine, "Share"], [RiDeleteBinLine, "Delete"]] as const).map(([Icon, label], i) => (
            <Tooltip key={i} content={label}>
              <Button iconOnly variant="ghost" tone={label === "Delete" ? "danger" : "default"} aria-label={label}>
                <Icon className="h-4 w-4" />
              </Button>
            </Tooltip>
          ))}
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "content", type: "ReactNode", required: true, description: "Tooltip body. Keep it under eight words." },
          { name: "placement", type: '"top" | "bottom" | "left" | "right"', default: '"top"', description: "Position relative to the trigger." },
          { name: "delay", type: "number", default: "120", description: "Milliseconds before the tooltip appears." },
        ]} />
      </Section>
    </>
  );
}

/* ---------------------------------- MENU ---------------------------------- */

export function MenuDoc() {
  return (
    <>
      <PageHeader eyebrow="Components · Overlays" title="Menu" description="A floating list of actions anchored to a trigger. Closes on selection, outside click and Escape. Built on the Popover primitive." tags={["Popover", "Keyboard", "Sections"]} />
      <Import names="Popover, MenuItem, MenuSeparator, MenuLabel" />
      <Section title="Usage">
        <Showcase code={`<Popover
  placement="bottom-start"
  trigger={({ toggle }) => <Button onClick={toggle}>Account</Button>}
>
  {(close) => (
    <>
      <MenuLabel>Signed in as ada@acme.io</MenuLabel>
      <MenuItem icon={<Settings />} shortcut="⌘,">Settings</MenuItem>
      <MenuSeparator />
      <MenuItem icon={<LogOut />} tone="danger">Sign out</MenuItem>
    </>
  )}
</Popover>`}>
          <Popover
            placement="bottom-start"
            trigger={({ toggle, open }) => (
              <Button variant="outline" tone="default" onClick={toggle} endContent={<RiArrowRightSLine className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-90" : ""}`} />}>
                Account
              </Button>
            )}
          >
            {(close) => (
              <>
                <MenuLabel>Signed in as ada@acme.io</MenuLabel>
                <MenuItem icon={<RiSettings3Line />} shortcut="⌘," onClick={close}>Settings</MenuItem>
                <MenuItem icon={<RiBankCardLine />} shortcut="⌘B" onClick={close}>Billing</MenuItem>
                <MenuItem icon={<RiNotification3Line />} onClick={close}>Notifications</MenuItem>
                <MenuSeparator />
                <MenuItem icon={<RiLogoutBoxLine />} tone="danger" onClick={close}>Sign out</MenuItem>
              </>
            )}
          </Popover>

          <Popover
            placement="bottom"
            trigger={({ toggle }) => <Button iconOnly variant="ghost" tone="default" aria-label="Row actions" onClick={toggle}><RiSettings3Line className="h-4 w-4" /></Button>}
          >
            {(close) => (
              <>
                <MenuItem icon={<RiFileCopyLine />} onClick={close}>Duplicate</MenuItem>
                <MenuItem icon={<RiPencilLine />} onClick={close}>Rename</MenuItem>
                <MenuItem icon={<RiShareLine />} onClick={close}>Share</MenuItem>
                <MenuSeparator />
                <MenuItem icon={<RiDeleteBinLine />} tone="danger" onClick={close}>Delete</MenuItem>
              </>
            )}
          </Popover>

          <Popover
            placement="bottom-end"
            className="w-64 p-0"
            trigger={({ toggle }) => <Button variant="soft" onClick={toggle} startContent={<Avatar name="Ada L" size="xs" tone="accent" />}>Ada Lovelace</Button>}
          >
            <div className="p-3">
              <div className="flex items-center gap-3">
                <Avatar name="Ada Lovelace" tone="accent" />
                <div className="min-w-0">
                  <p className="truncate text-label-sm">Ada Lovelace</p>
                  <p className="truncate text-paragraph-xs text-muted">ada@acme.io</p>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <Button size="sm" fullWidth>Profile</Button>
                <Button size="sm" variant="outline" tone="default" fullWidth>Switch</Button>
              </div>
            </div>
          </Popover>
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "trigger", type: "({ open, toggle }) => ReactNode", required: true, description: "Render prop for the anchor element." },
          { name: "children", type: "ReactNode | ((close) => ReactNode)", required: true, description: "Menu content. The function form receives a close callback." },
          { name: "placement", type: '"bottom" | "bottom-start" | "bottom-end" | "top"', default: '"bottom"', description: "Anchor alignment." },
        ]} />
        <PropsTable
          title="MenuItem props"
          rows={[
            { name: "icon", type: "ReactNode", description: "Leading 16px icon." },
            { name: "shortcut", type: "string", description: "Right-aligned keyboard hint." },
            { name: "tone", type: '"default" | "danger"', default: '"default"', description: "Destructive items use the danger tone." },
            { name: "active", type: "boolean", default: "false", description: "Marks the item as currently selected." },
          ]}
        />
      </Section>
    </>
  );
}

/* --------------------------------- POPOVER -------------------------------- */

export function PopoverDoc() {
  return (
    <>
      <PageHeader eyebrow="Components · Overlays" title="Popover" description="A floating layer anchored to a trigger — click to open, outside-click or Escape to close. The foundation for dropdowns, menus, custom select and helper content. Never use it to hide a critical path." tags={["Anchored", "Outside click", "Arrow keys"]} />
      <Import names="Popover" />
      <Section title="Usage">
        <Showcase
          code={`<Popover\n  placement="bottom"\n  trigger={({ toggle }) => <Button onClick={toggle}>Open popover</Button>}\n>\n  {(close) => (\n    <div className="p-3">\n      <p className="text-label-sm">Ready to launch</p>\n      <p className="text-paragraph-xs text-muted">Deploy main to production?</p>\n      <Button size="sm" onClick={close}>Launch</Button>\n    </div>\n  )}\n</Popover>`}
        >
          <Popover
            placement="bottom"
            trigger={({ toggle }) => <Button onClick={toggle}>Open popover</Button>}
          >
            {(close) => (
              <div className="w-56 p-3">
                <p className="text-label-sm">Ready to launch</p>
                <p className="text-paragraph-xs text-muted">Deploy main@4f21ac to production?</p>
                <Button size="sm" fullWidth className="mt-2.5" onClick={close}>Launch</Button>
              </div>
            )}
          </Popover>

          <Popover
            placement="bottom-end"
            trigger={({ toggle }) => <Button variant="outline" tone="default" onClick={toggle} endContent={<RiArrowRightSLine className="h-3.5 w-3.5" />}>Raise a flag</Button>}
            className="w-64 p-0"
          >
            {(close) => (
              <div>
                <MenuLabel>Flag reason</MenuLabel>
                <MenuItem icon={<RiNotification3Line />} onClick={close}>Needs design review</MenuItem>
                <MenuItem icon={<RiFileCopyLine />} onClick={close}>Duplicate of another issue</MenuItem>
                <MenuSeparator />
                <MenuItem icon={<RiDeleteBinLine />} tone="danger" onClick={close}>Report abuse</MenuItem>
              </div>
            )}
          </Popover>
        </Showcase>
      </Section>
      <Section title="With a hint" description="Popovers can carry non-essential helper content — but copy that users need later belongs in a Tooltip's sibling, not behind a click.">
        <Showcase>
          <Popover
            placement="bottom-start"
            trigger={({ toggle }) => <Button variant="ghost" tone="default" onClick={toggle} endContent={<RiArrowRightSLine className="h-3.5 w-3.5" />}>How is usage metered?</Button>}
          >
            <div className="max-w-64 p-3">
              <p className="text-label-sm">Usage metering</p>
              <p className="mt-1 text-paragraph-xs text-muted">Bandwidth is billed in gigabyte-hours and reset at the start of each UTC month.</p>
            </div>
          </Popover>
        </Showcase>
      </Section>
      <Section title="Keyboard">
        <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-surface p-4 ring-1 ring-border shadow-xs text-paragraph-sm text-muted">
          <span className="flex items-center gap-1.5"><Kbd>Tab</Kbd> focus the content</span>
          <Divider orientation="vertical" className="h-4" />
          <span className="flex items-center gap-1.5"><Kbd>Esc</Kbd> close</span>
          <Divider orientation="vertical" className="h-4" />
          <span>click outside to dismiss</span>
        </div>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "trigger", type: "({ open, toggle }) => ReactNode", required: true, description: "Render prop for the anchor element." },
          { name: "children", type: "ReactNode | ((close: () => void) => ReactNode)", required: true, description: "Popover content. The function form receives a close callback." },
          { name: "placement", type: '"bottom" | "top" | "bottom-start" | "bottom-end"', default: '"bottom"', description: "Anchor alignment relative to the trigger." },
          { name: "className", type: "string", description: "Overrides the floating panel's default width and padding." },
        ]} />
        <Callout>
          Compose richer overlays on top of Popover — Dropdown, Menu and the custom select picker are all built from it.
        </Callout>
      </Section>
    </>
  );
}

/* ---------------------------------- TOAST --------------------------------- */

export function ToastDoc() {
  const { push } = useToast();
  return (
    <>
      <PageHeader eyebrow="Components · Feedback" title="Toast" description="A transient confirmation that does not interrupt the flow. Toasts stack, auto-dismiss and never carry information the user must read." tags={["Auto dismiss", "Stacked", "Portal"]} />
      <Import names="ToastProvider, useToast" />
      <Section title="Usage">
        <Showcase code={`const { push } = useToast();

push({
  title: "Deployment queued",
  description: "Your build will start in a moment.",
  tone: "success",
});`}>
          <Button onClick={() => push({ title: "Deployment queued", description: "Your build will start in a moment.", tone: "accent" })}>Default</Button>
          <Button tone="success" onClick={() => push({ title: "Saved", description: "All changes were written.", tone: "success" })}>Success</Button>
          <Button tone="warning" onClick={() => push({ title: "Approaching limit", description: "9 of 10 seats used.", tone: "warning" })}>Warning</Button>
          <Button tone="danger" onClick={() => push({ title: "Build failed", description: "Module not found: ./ui/Overlay", tone: "danger" })}>Danger</Button>
          <Button variant="outline" tone="default" onClick={() => { ["One", "Two", "Three"].forEach((n, i) => setTimeout(() => push({ title: `Event ${n}`, tone: "default" }), i * 260)); }}>Stack three</Button>
        </Showcase>
      </Section>
      <Section title="Setup" description="Mount the provider once, near the root of your tree.">
        <Snippet symbol="">{`<ToastProvider><App /></ToastProvider>`}</Snippet>
      </Section>
      <Section title="API">
        <PropsTable
          title="push(options)"
          rows={[
            { name: "title", type: "string", required: true, description: "Short confirmation, ideally under five words." },
            { name: "description", type: "string", description: "One supporting line of detail." },
            { name: "tone", type: "Tone", default: '"default"', description: "Icon and accent color." },
            { name: "duration", type: "number", default: "3800", description: "Milliseconds before auto-dismiss." },
          ]}
        />
        <Callout tone="warning" title="Never put actions users need in a toast">
          Toasts vanish. If the user must act, use an Alert or a Modal. A single undo affordance is the only acceptable
          exception, and it must also exist elsewhere.
        </Callout>
      </Section>
      <Section title="Keyboard">
        <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-surface ring-1 ring-border shadow-xs p-4 text-paragraph-sm text-muted">
          <span className="flex items-center gap-1.5"><Kbd>Tab</Kbd> focus the dismiss button</span>
          <Divider orientation="vertical" className="h-4" />
          <span className="flex items-center gap-1.5"><Kbd>Enter</Kbd> dismiss</span>
        </div>
      </Section>
    </>
  );
}
