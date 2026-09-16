import { useState } from "react";
import {
  RiAddLine,
  RiBankCardLine,
  RiGlobalLine,
  RiLightbulbLine,
  RiNotification3Line,

  RiSettings3Line,
  RiTeamLine,

  RiUserAddLine,
  RiFileCopyLine,
} from "@remixicon/react";
import { Callout, PageHeader, PropsTable, RelatedComponents, Section, Showcase } from "../../docs/Blocks";
import { PreviewNote } from "../../docs/Preview";
import { Button } from "../../ui/Button";
import { Avatar, Chip, Progress } from "../../ui/Display";
import { StatusBadge } from "../../ui/Extra";
import { ColumnDef, Carousel, ChatBubble, CookieConsent, CopyButton, DataTable, ErrorPage, FileUpload, InlineEdit, Metre, OrderSummary, PricingCard, ScrollArea, SpeedDial, SplitButton, StatCard, TeamMemberCard, TransferList, TreeView, UploadedFile } from "../../ui/Pro";

type Row = { id: string; name: string; owner: string; status: "Active" | "Trial" | "Churned"; plan: string; mrr: number; usage: number };

const ROWS: Row[] = [
  { id: "1", name: "Aurora Analytics", owner: "Sophia W.", status: "Active", plan: "Enterprise", mrr: 4200, usage: 82 },
  { id: "2", name: "Northwind Traders", owner: "James B.", status: "Trial", plan: "Pro", mrr: 0, usage: 34 },
  { id: "3", name: "Halcyon Labs", owner: "Lena M.", status: "Active", plan: "Pro", mrr: 960, usage: 61 },
  { id: "4", name: "Ridgeline Studio", owner: "Arthur T.", status: "Churned", plan: "Starter", mrr: 0, usage: 8 },
  { id: "5", name: "Corewave Systems", owner: "Maya C.", status: "Active", plan: "Enterprise", mrr: 5400, usage: 91 },
  { id: "6", name: "Maplewood Co.", owner: "Ivan P.", status: "Trial", plan: "Pro", mrr: 0, usage: 12 },
  { id: "7", name: "Sentinel Security", owner: "Nadia R.", status: "Active", plan: "Enterprise", mrr: 3100, usage: 47 },
  { id: "8", name: "Vertex Dynamics", owner: "Omar K.", status: "Active", plan: "Starter", mrr: 240, usage: 23 },
];

const COLUMNS: ColumnDef<Row>[] = [
  {
    key: "name",
    header: "Customer",
    sortable: true,
    cell: (r) => (
      <span className="flex items-center gap-2.5">
        <Avatar name={r.name} size="xs" tone="accent" square />
        <span className="font-medium">{r.name}</span>
      </span>
    ),
    sortValue: (r) => r.name,
  },
  { key: "owner", header: "Owner", sortable: true, hideBelow: "sm", sortValue: (r) => r.owner, cell: (r) => <span className="text-muted">{r.owner}</span> },
  { key: "status", header: "Status", sortable: true, cell: (r) => <StatusBadge status={r.status === "Active" ? "completed" : r.status === "Trial" ? "pending" : "failed"}>{r.status}</StatusBadge> },
  { key: "plan", header: "Plan", hideBelow: "md", cell: (r) => <Chip size="sm" variant="outline">{r.plan}</Chip> },
  { key: "usage", header: "Usage", sortable: true, hideBelow: "md", cell: (r) => <div className="w-24"><Progress value={r.usage} size="sm" /></div> },
  { key: "mrr", header: "MRR", sortable: true, align: "right", cell: (r) => <span className="font-mono text-paragraph-sm tabular-nums">${r.mrr.toLocaleString()}</span> },
];

const Import = ({ names }: { names: string }) => <span className="my-4 block w-fit rounded-lg bg-surface px-3.5 py-2.5 font-mono text-paragraph-xs text-[var(--syn-attr)] ring-1 ring-border">{`import { ${names} } from "@aperture/react";`}</span>;

/* ================================ DATA TABLE =============================== */

export function DataTableDoc({ navigate }: { navigate: (t: string) => void }) {
  return (
    <>
      <PageHeader eyebrow="Components · Data Display" title="Data Table" description="A production table with column sorting, row selection, a bulk-action bar, column visibility toggles and pagination. Columns can be hidden on narrow viewports so wide tables degrade gracefully." tags={["Sortable", "Selectable", "Column visibility", "Pagination"]} />
      <Import names="DataTable, ColumnDef" />
      <PreviewNote className="mb-2" />

      <Section title="Full featured" description="Sort any column, select rows to reveal bulk actions, toggle column visibility with the eye button, and page through results.">
        <Showcase align="stretch" padded={false} code={`<DataTable
  rows={rows}
  columns={columns}
  selectable
  pageSize={5}
  bulkActions={<Button size="xs" tone="danger">Delete</Button>}
  toolbar={<Input size="sm" placeholder="Search…" />}
/>`}>
          <div className="p-4 sm:p-6">
            <DataTable
              rows={ROWS}
              columns={COLUMNS}
              selectable
              pageSize={5}
              onRowClick={(r) => console.log(r)}
              bulkActions={
                <>
                  <Button size="xs" variant="outline" tone="default">Export</Button>
                  <Button size="xs" tone="danger">Delete</Button>
                </>
              }
              toolbar={<Button size="sm" startContent={<RiUserAddLine size={16} />}>Add customer</Button>}
            />
          </div>
        </Showcase>
      </Section>

      <Section title="Simple">
        <Showcase align="stretch" padded={false} code={`<DataTable rows={rows} columns={columns} pageSize={4} />`}>
          <div className="p-4 sm:p-6">
            <DataTable rows={ROWS.slice(0, 6)} columns={COLUMNS.slice(0, 4)} pageSize={4} />
          </div>
        </Showcase>
      </Section>

      <Section title="Empty state">
        <Showcase align="stretch" padded={false} code={`<DataTable rows={[]} columns={columns} emptyState={<EmptyState … />} />`}>
          <div className="p-4 sm:p-6">
            <DataTable rows={[]} columns={COLUMNS.slice(0, 3)} />
          </div>
        </Showcase>
      </Section>

      <Section title="API">
        <PropsTable rows={[
          { name: "rows", type: "T[]", required: true, description: "Row data. Each row needs a unique id." },
          { name: "columns", type: "ColumnDef<T>[]", required: true, description: "Column definitions with a cell renderer and optional sortValue." },
          { name: "selectable", type: "boolean", default: "false", description: "Adds checkboxes, select-all and a bulk-action bar." },
          { name: "bulkActions", type: "ReactNode", description: "Actions shown in the toolbar while rows are selected." },
          { name: "toolbar", type: "ReactNode", description: "Actions shown when nothing is selected." },
          { name: "pageSize", type: "number", default: "5", description: "Rows per page. Pagination appears when rows exceed this." },
          { name: "onRowClick", type: "(row: T) => void", description: "Makes rows clickable." },
          { name: "emptyState", type: "ReactNode", description: "Replaces the default no-results message." },
          { name: "ColumnDef.sortable", type: "boolean", description: "Enables the sort header for this column." },
          { name: "ColumnDef.hideBelow", type: '"sm" | "md" | "lg"', description: "Hides the column below a breakpoint." },
        ]} />
      </Section>

      <RelatedComponents navigate={navigate} items={[{ title: "Table", href: "components/table" }, { title: "Empty State", href: "components/empty-state" }, { title: "Status Badge", href: "components/status-badge" }, { title: "Pagination", href: "components/pagination" }, { title: "Avatar", href: "components/avatar" }]} />
    </>
  );
}

/* =============================== FILE UPLOAD =============================== */

export function FileUploadDoc({ navigate }: { navigate: (t: string) => void }) {
  const [files, setFiles] = useState<UploadedFile[]>([
    { id: "1", name: "brand-guidelines.pdf", size: 2516582, progress: 100, status: "done", format: "pdf" },
    { id: "2", name: "hero-illustration.png", size: 8493465, progress: 62, status: "uploading", format: "png" },
  ]);
  return (
    <>
      <PageHeader eyebrow="Components · Forms" title="File Upload" description="A drag-and-drop dropzone with per-file progress, size formatting, status badges and removal. Simulated progress is shown here so the states are visible without a real network." tags={["Drag & drop", "Progress", "Multiple"]} />
      <Import names="FileUpload, UploadedFile" />
      <PreviewNote className="mb-2" />
      <Section title="Usage">
        <Showcase align="stretch" code={`const [files, setFiles] = useState<UploadedFile[]>([]);

<FileUpload files={files} onChange={setFiles} maxSize={10} multiple />`}>
          <FileUpload files={files} onChange={setFiles} className="w-full" />
        </Showcase>
      </Section>
      <Section title="Drag state" description="Dragging a file over the dropzone tints it with the accent and swaps the icon to a check.">
        <Showcase code={`<FileUpload files={[]} onChange={setFiles} />`} align="stretch">
          <div className="flex w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-accent bg-accent-soft/40 px-6 py-8 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface text-muted ring-1 ring-border shadow-xs"><RiFileCopyLine size={20} /></span>
            <span className="text-label-sm text-foreground">Drop to upload</span>
            <span className="rounded-lg bg-neutral-950 px-3.5 py-2 text-label-xs text-white dark:bg-neutral-200 dark:text-neutral-950">Browse files</span>
          </div>
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "files", type: "UploadedFile[]", required: true, description: "Controlled file list." },
          { name: "onChange", type: "(files: UploadedFile[]) => void", required: true, description: "Fires as files are added, progressed or removed." },
          { name: "accept", type: "string", default: '"image/*,.pdf,.doc,.docx"', description: "Native file input accept filter." },
          { name: "maxSize", type: "number", default: "10", description: "Megabytes, shown in the helper copy." },
          { name: "multiple", type: "boolean", default: "true", description: "Allow more than one file." },
        ]} />
      </Section>
      <RelatedComponents navigate={navigate} items={[{ title: "File Format Icon", href: "components/file-format-icon" }, { title: "Progress", href: "components/progress" }, { title: "Button", href: "components/button" }]} />
    </>
  );
}

/* ================================ OVERFLOWS =============================== */

export function OverflowDoc({ navigate }: { navigate: (t: string) => void }) {
  const [available, setAvailable] = useState([
    { id: "a1", label: "Design review", meta: "5" },
    { id: "a2", label: "Sprint planning", meta: "12" },
    { id: "a3", label: "Bug triage", meta: "3" },
  ]);
  const [selected, setSelected] = useState([
    { id: "s1", label: "Weekly standup", meta: "8" },
  ]);

  return (
    <>
      <PageHeader eyebrow="Components · Utilities" title="Overflow Utilities" description="The components that fill real product gaps: a transfer list for dual-panel assignment, a carousel for testimonials, a tree view for hierarchical navigation, inline editing and a speed dial." tags={["Transfer", "Carousel", "Tree", "Inline edit"]} />
      <Import names="TransferList, Carousel, TreeView, InlineEdit, SpeedDial" />
      <PreviewNote className="mb-2" />

      <Section title="Transfer List" description="Move items between two panels. Selecting is per-panel; the arrow buttons move the current selection.">
        <Showcase align="stretch" code={`<TransferList
  available={available}
  selected={selected}
  onChange={(sel, avail) => { setSelected(sel); setAvailable(avail); }}
  leftTitle="Available"
  rightTitle="Assigned"
/>`}>
          <TransferList
            available={available}
            selected={selected}
            onChange={(sel, avail) => { setSelected(sel); setAvailable(avail); }}
            leftTitle="Available"
            rightTitle="Assigned"
          />
        </Showcase>
      </Section>

      <Section title="Carousel" description="Slide-based content with dots and arrow controls.">
        <Showcase align="stretch" code={`<Carousel items={testimonials} />`}>
          <Carousel
            items={[
              { id: "1", title: "“We replaced three years of accumulated CSS in a fortnight.”", body: "Designers ship tokens, engineers ship features, and nobody argues about hex codes anymore.", author: "Maya Chen", role: "Head of Design Engineering, Corewave" },
              { id: "2", title: "“The token graph is the real product.”", body: "We rebranded twice in one quarter and neither rebrand touched a component file.", author: "Ivan Petrov", role: "Staff Engineer, Vertex" },
              { id: "3", title: "“Accessibility stopped being a checklist.”", body: "Contrast and focus are decided for us, so review time goes to product decisions.", author: "Nadia Rahim", role: "Design Lead, Sentinel" },
            ]}
          />
        </Showcase>
      </Section>

      <Section title="Tree View" description="Hierarchical navigation with expandable branches.">
        <Showcase align="stretch" code={`<TreeView defaultOpen={["src"]} nodes={tree} />`}>
          <div className="w-full rounded-xl bg-surface p-2 ring-1 ring-border">
            <TreeView
              defaultOpen={["src", "ui"]}
              nodes={[
                { id: "src", label: "src", children: [
                  { id: "ui", label: "ui", children: [{ id: "b", label: "Button.tsx" }, { id: "f", label: "Form.tsx" }] },
                  { id: "docs", label: "docs", children: [{ id: "sh", label: "Shell.tsx" }] },
                  { id: "app", label: "App.tsx" },
                ] },
                { id: "pkg", label: "package.json" },
              ]}
            />
          </div>
        </Showcase>
      </Section>

      <Section title="Inline Edit" description="Click text to edit it in place. Enter commits, Escape cancels.">
        <Showcase align="stretch" code={`<InlineEdit value={title} onChange={setTitle} />`}>
          <div className="w-full max-w-sm space-y-3 rounded-xl bg-surface p-4 ring-1 ring-border">
            <InlineEdit value="Q3 Design System Audit" onChange={() => {}} />
            <InlineEdit value="Finalise the OKLCH ramp and ship the dark theme audit before the release cut." onChange={() => {}} multiline />
          </div>
        </Showcase>
      </Section>

      <Section title="Split Button & Speed Dial" description="A primary action with a nested menu, and a floating action button that expands into a vertical action list.">
        <Showcase code={`<SplitButton items={["Duplicate", "Archive", "Delete"]}>Save</SplitButton>`}>
          <SplitButton tone="accent" items={["Save as draft", "Save & publish", "Schedule"]}>Save</SplitButton>
          <SplitButton tone="default" items={["Export CSV", "Export JSON"]}>Export</SplitButton>
        </Showcase>
        <Showcase align="stretch" padded={false}>
          <div className="relative h-52 w-full overflow-hidden rounded-xl bg-background-secondary">
            <SpeedDial
              actions={[
                { icon: <RiAddLine size={18} />, label: "New project" },
                { icon: <RiUserAddLine size={18} />, label: "Invite member" },
                { icon: <RiSettings3Line size={18} />, label: "Settings" },
              ]}
            />
          </div>
        </Showcase>
      </Section>

      <RelatedComponents navigate={navigate} items={[{ title: "Dropdown", href: "components/dropdown" }, { title: "Button Group", href: "components/button-group" }, { title: "Accordion", href: "components/accordion" }]} />
    </>
  );
}

/* ============================== COMMERCE & CHAT ============================ */

export function CommerceDoc({ navigate }: { navigate: (t: string) => void }) {
  return (
    <>
      <PageHeader eyebrow="Components · Blocks" title="Commerce & Chat" description="Higher-level compositions that ship with AlignUI: pricing tiers, an order summary with totals arithmetic, team member rows, animated stat cards and a chat thread." tags={["Pricing", "Order", "Chat", "Stats"]} />
      <Import names="PricingCard, OrderSummary, TeamMemberCard, StatCard, ChatBubble" />

      <Section title="Pricing Card">
        <Showcase align="stretch" code={`<PricingCard name="Pro" price={19} popular features={[…]} cta="Get started" />`}>
          <div className="grid w-full gap-4 sm:grid-cols-3">
            <PricingCard name="Starter" price={0} description="For individuals" features={["3 projects", "Community support", "1 GB storage"]} cta="Start free" />
            <PricingCard name="Pro" price={19} popular description="For product teams" features={["Unlimited projects", "Priority support", "100 GB storage", "Custom domains"]} cta="Get started" />
            <PricingCard name="Enterprise" price="Custom" description="For organisations" features={["SSO & SAML", "Audit logs", "Dedicated CSM", "99.99% SLA"]} cta="Contact sales" />
          </div>
        </Showcase>
      </Section>

      <Section title="Order Summary">
        <Showcase align="stretch" code={`<OrderSummary
  items={[{ name: "Design system licence", qty: 1, price: 249 }]}
  subtotal={249}
  tax={19.92}
/>`}>
          <div className="mx-auto w-full max-w-sm">
            <OrderSummary
              items={[{ name: "Aperture all-access", qty: 1, price: 249 }, { name: "Figma kit", qty: 1, price: 49 }]}
              subtotal={298}
              tax={23.84}
            />
          </div>
        </Showcase>
      </Section>

      <Section title="Team Member & Stat Cards">
        <Showcase align="stretch" code={`<TeamMemberCard name="Sophia Williams" role="Design Engineer" email="sophia@acme.io" />
<StatCard label="MRR" value="$12,480" delta="12.4%" up icon={<RiBankCardLine />} />`}>
          <div className="grid w-full gap-4 lg:grid-cols-2">
            <div className="space-y-2.5">
              <TeamMemberCard name="Sophia Williams" role="Design Engineer" email="sophia@acme.io" actions={<Chip size="sm" tone="accent" variant="soft">Owner</Chip>} />
              <TeamMemberCard name="James Brook" role="Frontend Engineer" email="james@acme.io" tone="success" actions={<Button size="xs" variant="outline" tone="default">Message</Button>} />
              <TeamMemberCard name="Lena Müller" role="Product Designer" email="lena@acme.io" tone="warning" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <StatCard label="Monthly recurring revenue" value="$28,914" delta="6.2%" up icon={<RiBankCardLine />} hint="vs. last month" />
              <StatCard label="Active users" value="6,740" delta="3.4%" up icon={<RiTeamLine />} />
              <StatCard label="Churn rate" value="2.3%" delta="0.4%" up={false} icon={<RiNotification3Line />} />
              <StatCard label="NPS score" value="57" icon={<RiLightbulbLine />} hint="204 responses" />
            </div>
          </div>
        </Showcase>
      </Section>

      <Section title="Chat Bubble" description="Left-aligned for others, right-aligned and accent-filled for the current user.">
        <Showcase align="stretch" code={`<ChatBubble side="left" author="Lena" time="09:41">Morning!</ChatBubble>
<ChatBubble side="right" author="You" time="09:42" tone="accent">Morning 👋</ChatBubble>`}>
          <div className="mx-auto w-full max-w-md space-y-4 rounded-2xl bg-background-secondary p-4">
            <ChatBubble side="left" author="Lena Müller" time="09:41">Morning! Did the token migration land?</ChatBubble>
            <ChatBubble side="right" author="You" time="09:42">Yep — 312 tokens, zero component changes.</ChatBubble>
            <ChatBubble side="left" author="Lena Müller" time="09:43">Perfect. Shipping the dark audit today.</ChatBubble>
          </div>
        </Showcase>
      </Section>

      <RelatedComponents navigate={navigate} items={[{ title: "Widget Box", href: "components/widget-box" }, { title: "Progress", href: "components/progress" }, { title: "Avatar", href: "components/avatar" }, { title: "Chip", href: "components/chip" }]} />
    </>
  );
}

/* ================================ SYSTEM UI =============================== */

export function SystemUIDoc({ navigate }: { navigate: (t: string) => void }) {
  const [title, setTitle] = useState("Untitled document");
  return (
    <>
      <PageHeader eyebrow="Components · System" title="System UI" description="The unglamorous parts every product needs: copy-to-clipboard, consent, error pages, scroll masking and segmented capacity meters." tags={["Copy", "Cookie", "Errors", "Meter"]} />
      <Import names="CopyButton, CookieConsent, ErrorPage, ScrollArea, Metre" />
      <PreviewNote className="mb-2" />

      <Section title="Copy Button" description="One-click clipboard with a temporary success state — no toast needed for a simple copy.">
        <Showcase code={`<CopyButton text="npm install @aperture/react" />
<CopyButton text="…" label="Copy link" size="sm" variant="ghost" />`}>
          <CopyButton text="npm install @aperture/react" />
          <CopyButton text="https://aperture.design" label="Copy link" size="sm" variant="ghost" />
          <CopyButton text="wk_live_51H8xQ2eZvKYlo2C" label="Copy key" />
        </Showcase>
      </Section>

      <Section title="Cookie Consent" description="Appears bottom-left and dismisses on either choice.">
        <Showcase align="stretch" padded={false} code={`<CookieConsent onAccept={accept} onDecline={decline} />`}>
          <div className="relative h-56 w-full overflow-hidden bg-background-secondary">
            <CookieConsent onAccept={() => {}} onDecline={() => {}} />
          </div>
        </Showcase>
      </Section>

      <Section title="Error Pages">
        <Showcase align="stretch" padded={false} code={`<ErrorPage code="404" action={<Button>Back to home</Button>} />`}>
          <div className="w-full divide-y divide-separator">
            <ErrorPage code="404" action={<Button size="sm">Back to home</Button>} />
            <ErrorPage code="500" action={<Button size="sm" variant="outline" tone="default">Retry</Button>} />
          </div>
        </Showcase>
      </Section>

      <Section title="Scroll Area" description="Masks content at the edges so users know there is more to scroll.">
        <Showcase code={`<ScrollArea maxHeight={160}>…</ScrollArea>`}>
          <div className="w-64">
            <ScrollArea maxHeight={160}>
              <ul className="space-y-2.5">
                {["Account", "Billing", "Members", "Notifications", "Security", "Integrations", "API keys", "Webhooks", "Audit log"].map((i) => (
                  <li key={i} className="flex items-center gap-2.5 text-paragraph-sm text-foreground">
                    <RiGlobalLine size={16} className="text-subtle" />
                    {i}
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </div>
        </Showcase>
      </Section>

      <Section title="Metre" description="Segmented capacity indicator for storage, quota and battery.">
        <Showcase align="stretch" code={`<Metre value={76} label="Storage used" tone="warning" />`}>
          <div className="w-full max-w-sm space-y-4">
            <Metre value={38} label="Storage used" />
            <Metre value={76} label="API quota" tone="warning" />
            <Metre value={94} label="Seat utilisation" tone="danger" />
            <Metre value={22} label="Build minutes" tone="success" segments={20} />
          </div>
        </Showcase>
      </Section>

      <Section title="Live inline edit" description="Editing commits on Enter or blur and falls back to the original value when cleared.">
        <Showcase align="stretch" code={`<InlineEdit value={title} onChange={setTitle} />`}>
          <div className="w-full max-w-xs rounded-xl bg-surface p-4 ring-1 ring-border">
            <p className="mb-2 text-subheading-2xs uppercase text-subtle">Document title</p>
            <InlineEdit value={title} onChange={setTitle} />
            <p className="mt-3 text-paragraph-xs text-subtle">Committed value: <span className="font-mono text-foreground">{title}</span></p>
          </div>
        </Showcase>
        <Callout title="Keep inline edits discoverable">
          Always show a hover affordance. Inline edit that users cannot discover is a form field they will never find —
          pair it with a visible pencil button when the content is important.
        </Callout>
      </Section>

      <RelatedComponents navigate={navigate} items={[{ title: "Snippet", href: "components/snippet" }, { title: "Banner", href: "components/banner" }, { title: "Empty State", href: "components/empty-state" }, { title: "Progress", href: "components/progress" }]} />
    </>
  );
}
