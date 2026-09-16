import { useState } from "react";
import { Archive, Bell, Copy, ExternalLink, Folder, Pencil, Share2, Trash2, Users } from "lucide-react";
import { Callout, PageHeader, PropsTable, Section, Showcase } from "../../docs/Blocks";
import { Button } from "../../ui/Button";
import {
  Alert,
  Avatar,
  AvatarGroup,
  Badge,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  CircularProgress,
  Code,
  Divider,
  Kbd,
  Progress,
  ScrollShadow,
  Skeleton,
  Snippet,
} from "../../ui/Display";
import { Spinner } from "../../ui/Button";
import { Table } from "../../ui/Navigation";

const Import = ({ names }: { names: string }) => <Snippet symbol="">{`import { ${names} } from "@aperture/react";`}</Snippet>;
const TONES = ["accent", "default", "success", "warning", "danger"] as const;

/* ---------------------------------- CARD ---------------------------------- */

export function CardDoc() {
  return (
    <>
      <PageHeader eyebrow="Components · Data Display" title="Card" description="A surface that groups related content. Cards express hierarchy through the surface ladder and elevation tokens, never through color." tags={["5 elevations", "Composable slots"]} />
      <Import names="Card, CardHeader, CardBody, CardFooter" />

      <Section title="Anatomy">
        <Showcase code={`<Card elevation={2}>
  <CardHeader>
    <h3 className="text-label-md">Deploy preview</h3>
    <p className="text-paragraph-sm text-muted">main@4f21ac</p>
  </CardHeader>
  <CardBody>Built in 42s · 1.2 MB transferred</CardBody>
  <CardFooter>
    <Button size="sm">Promote</Button>
  </CardFooter>
</Card>`}>
          <Card className="w-full max-w-sm">
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-label-md">Deploy preview</h3>
                <Chip size="sm" tone="success" dot>Ready</Chip>
              </div>
              <p className="font-mono text-paragraph-xs text-muted">main@4f21ac</p>
            </CardHeader>
            <CardBody>Built in 42s · 1.2 MB transferred · 0 warnings.</CardBody>
            <CardFooter>
              <Button size="sm">Promote</Button>
              <Button size="sm" variant="ghost" tone="default">Inspect</Button>
            </CardFooter>
          </Card>
        </Showcase>
      </Section>

      <Section title="Elevation" description="Resting cards use e2. Raise to e3 only on hover for interactive cards.">
        <Showcase>
          {([0, 1, 2, 3, 4] as const).map((e) => (
            <Card key={e} elevation={e} className="flex h-20 w-28 items-center justify-center font-mono text-paragraph-xs text-muted">
              e{e}
            </Card>
          ))}
        </Showcase>
      </Section>

      <Section title="Interactive" description="Adds a lift transition, accent border on hover and a pointer cursor.">
        <Showcase>
          {[
            { i: Folder, t: "Projects", d: "18 active" },
            { i: Users, t: "Members", d: "42 seats" },
            { i: Archive, t: "Archive", d: "310 items" },
          ].map((c) => (
            <Card key={c.t} interactive className="w-44 p-4">
              <c.i className="mb-2.5 h-4.5 w-4.5 text-accent" />
              <p className="text-label-sm">{c.t}</p>
              <p className="text-paragraph-xs text-muted">{c.d}</p>
            </Card>
          ))}
        </Showcase>
      </Section>

      <Section title="API">
        <PropsTable rows={[
          { name: "elevation", type: "0 | 1 | 2 | 3 | 4", default: "1", description: "Shadow step from the elevation ladder. Keep resting content quiet; increase elevation for floating surfaces." },
          { name: "interactive", type: "boolean", default: "false", description: "Adds hover lift, accent border and pointer cursor." },
          { name: "children", type: "ReactNode", description: "Usually CardHeader / CardBody / CardFooter." },
        ]} />
      </Section>
    </>
  );
}

/* ---------------------------------- TABLE --------------------------------- */

type Row = { name: string; role: string; status: string; usage: number };
const ROWS: Row[] = [
  { name: "Ada Lovelace", role: "Owner", status: "Active", usage: 92 },
  { name: "Grace Hopper", role: "Admin", status: "Active", usage: 64 },
  { name: "Alan Turing", role: "Member", status: "Invited", usage: 0 },
  { name: "Katherine Johnson", role: "Member", status: "Active", usage: 38 },
];

export function TableDoc() {
  const [striped, setStriped] = useState(false);
  return (
    <>
      <PageHeader eyebrow="Components · Data Display" title="Table" description="Tabular data with semantic header styling, hover affordance, optional striping and a built-in empty state. Numeric columns use tabular figures." tags={["Tabular figures", "Empty state", "Responsive"]} />
      <Import names="Table" />
      <Section title="Usage">
        <Showcase
          align="stretch"
          controls={<Button size="sm" variant="soft" onClick={() => setStriped((s) => !s)}>{striped ? "Disable" : "Enable"} striping</Button>}
          code={`<Table
  striped={${striped}}
  columns={[
    { key: "name", header: "Member" },
    { key: "role", header: "Role" },
    { key: "usage", header: "Usage", align: "right" },
  ]}
  rows={rows}
/>`}
        >
          <Table
            striped={striped}
            caption="4 members · seat limit 10"
            columns={[
              { key: "name", header: "Member", render: (r) => <span className="flex items-center gap-2.5"><Avatar name={r.name} size="xs" tone="accent" /><span className="font-medium">{r.name}</span></span> },
              { key: "role", header: "Role", render: (r) => <span className="text-muted">{r.role}</span> },
              { key: "status", header: "Status", render: (r) => <Chip size="sm" tone={r.status === "Active" ? "success" : "warning"} variant="soft">{r.status}</Chip> },
              { key: "usage", header: "Usage", align: "right", render: (r) => <span className="font-mono text-paragraph-xs tabular-nums">{r.usage}%</span> },
            ]}
            rows={ROWS}
          />
        </Showcase>
      </Section>
      <Section title="Empty state">
        <Showcase align="stretch">
          <Table columns={[{ key: "name", header: "Member" }, { key: "role", header: "Role" }]} rows={[]} />
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "columns", type: "Column<T>[]", required: true, description: "Column definitions with key, header, align, width and optional render." },
          { name: "rows", type: "T[]", required: true, description: "Row data. Renders the empty state when length is 0." },
          { name: "striped", type: "boolean", default: "false", description: "Tints alternating rows with surface-secondary." },
          { name: "hoverable", type: "boolean", default: "true", description: "Highlights the row under the pointer." },
          { name: "caption", type: "ReactNode", description: "Descriptive caption above the header row." },
        ]} />
      </Section>
    </>
  );
}

/* --------------------------------- AVATAR --------------------------------- */

export function AvatarDoc() {
  return (
    <>
      <PageHeader eyebrow="Components · Data Display" title="Avatar" description="Represents a person or entity. Falls back to initials on a tinted surface when no image is available, and never renders a broken image." tags={["5 sizes", "Status dot", "Group"]} />
      <Import names="Avatar, AvatarGroup" />
      <Section title="Sizes">
        <Showcase code={`<Avatar name="Ada Lovelace" size="md" />`}>
          {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => <Avatar key={s} name="Ada Lovelace" size={s} tone="accent" />)}
        </Showcase>
      </Section>
      <Section title="Tones & shape">
        <Showcase>
          {TONES.map((t) => <Avatar key={t} name={t.slice(0, 2)} tone={t} />)}
          <Divider orientation="vertical" />
          {TONES.slice(0, 3).map((t) => <Avatar key={t} name={t.slice(0, 2)} tone={t} square />)}
        </Showcase>
      </Section>
      <Section title="Status">
        <Showcase>
          <Avatar name="Ada L" status="online" tone="accent" />
          <Avatar name="Grace H" status="busy" tone="success" />
          <Avatar name="Alan T" status="offline" tone="warning" />
        </Showcase>
      </Section>
      <Section title="Group" description="Overlaps avatars and collapses the overflow into a counter.">
        <Showcase code={`<AvatarGroup max={4} items={members} />`}>
          <AvatarGroup items={[{ name: "Ada L" }, { name: "Grace H" }, { name: "Alan T" }, { name: "Kat J" }, { name: "Lin C" }, { name: "Ray B" }]} />
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "name", type: "string", description: "Used for initials and the accessible name." },
          { name: "src", type: "string", description: "Image URL. Falls back to initials when absent." },
          { name: "size", type: '"xs" | "sm" | "md" | "lg" | "xl"', default: '"md"', description: "Avatar dimensions." },
          { name: "square", type: "boolean", default: "false", description: "Uses a rounded square instead of a circle." },
          { name: "status", type: '"online" | "offline" | "busy"', description: "Presence indicator in the lower-right corner." },
        ]} />
      </Section>
    </>
  );
}

/* ---------------------------------- CHIP ---------------------------------- */

export function ChipDoc() {
  const [tags, setTags] = useState(["design", "system", "tokens", "oklch"]);
  return (
    <>
      <PageHeader eyebrow="Components · Data Display" title="Chip" description="A compact label for status, metadata or a removable selection. Chips are not buttons — if it triggers an action, use a Button." tags={["3 variants", "Removable", "Dot"]} />
      <Import names="Chip" />
      <Section title="Variants & tones">
        <Showcase align="stretch">
          {(["solid", "soft", "outline"] as const).map((v) => (
            <div key={v} className="flex flex-wrap items-center gap-2">
              <span className="w-16 font-mono text-[11px] text-subtle">{v}</span>
              {TONES.map((t) => <Chip key={t} variant={v} tone={t} className="capitalize">{t}</Chip>)}
            </div>
          ))}
        </Showcase>
      </Section>
      <Section title="With a dot" description="A leading dot makes status readable without relying on hue alone.">
        <Showcase code={`<Chip tone="success" dot>Operational</Chip>`}>
          <Chip tone="success" dot>Operational</Chip>
          <Chip tone="warning" dot>Degraded</Chip>
          <Chip tone="danger" dot>Outage</Chip>
          <Chip tone="default" dot>Unknown</Chip>
        </Showcase>
      </Section>
      <Section title="Removable">
        <Showcase code={`<Chip onClose={() => remove(tag)}>{tag}</Chip>`}>
          {tags.map((t) => <Chip key={t} tone="accent" onClose={() => setTags((s) => s.filter((x) => x !== t))}>{t}</Chip>)}
          {tags.length === 0 && <Button size="sm" variant="soft" onClick={() => setTags(["design", "system", "tokens", "oklch"])}>Reset</Button>}
        </Showcase>
      </Section>
      <Section title="Sizes">
        <Showcase>{(["sm", "md", "lg"] as const).map((s) => <Chip key={s} size={s} tone="accent">{s}</Chip>)}</Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "variant", type: '"solid" | "soft" | "outline"', default: '"soft"', description: "Fill treatment." },
          { name: "tone", type: "Tone", default: '"default"', description: "Semantic color." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Height and padding." },
          { name: "dot", type: "boolean", default: "false", description: "Shows a leading status dot." },
          { name: "onClose", type: "() => void", description: "Renders a remove button and fires on click." },
        ]} />
      </Section>
    </>
  );
}

/* --------------------------------- BADGE ---------------------------------- */

export function BadgeDoc() {
  return (
    <>
      <PageHeader eyebrow="Components · Data Display" title="Badge" description="Overlays a count or a dot on another element. Reserve badges for information that changes — static labels belong in a Chip." tags={["Counter", "Dot", "4 placements"]} />
      <Import names="Badge" />
      <Section title="Usage">
        <Showcase code={`<Badge content="8" tone="danger">
  <Button iconOnly aria-label="Action" variant="outline" tone="default"><Bell /></Button>
</Badge>`}>
          <Badge content="8" tone="danger"><Button iconOnly variant="outline" tone="default" aria-label="Notifications"><Bell /></Button></Badge>
          <Badge content="99+" tone="accent"><Button iconOnly variant="outline" tone="default" aria-label="Messages"><Share2 className="h-4 w-4" /></Button></Badge>
          <Badge dot tone="success"><Avatar name="Ada L" tone="default" /></Badge>
          <Badge dot tone="warning" placement="bottom-right"><Avatar name="Grace H" tone="default" square /></Badge>
        </Showcase>
      </Section>
      <Section title="Placement">
        <Showcase>
          {(["top-right", "top-left", "bottom-right", "bottom-left"] as const).map((p) => (
            <Badge key={p} content="3" placement={p} tone="accent">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-surface text-[10px] text-muted">{p.split("-")[0][0]}{p.split("-")[1][0]}</span>
            </Badge>
          ))}
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "content", type: "ReactNode", description: "Value rendered inside the badge." },
          { name: "dot", type: "boolean", default: "false", description: "Renders a small dot without content." },
          { name: "tone", type: "Tone", default: '"danger"', description: "Badge fill color." },
          { name: "placement", type: '"top-right" | "top-left" | "bottom-right" | "bottom-left"', default: '"top-right"', description: "Corner anchor." },
        ]} />
      </Section>
    </>
  );
}

/* -------------------------------- PROGRESS -------------------------------- */

export function ProgressDoc() {
  const [v, setV] = useState(64);
  return (
    <>
      <PageHeader eyebrow="Components · Data Display" title="Progress" description="Communicates completion of a determinate task. Linear for inline context, circular for compact dashboards." tags={["Linear", "Circular", "Indeterminate"]} />
      <Import names="Progress, CircularProgress" />
      <Section title="Linear">
        <Showcase
          align="stretch"
          controls={<div className="flex gap-2"><Button size="sm" variant="soft" onClick={() => setV((x) => Math.max(0, x - 15))}>−15</Button><Button size="sm" variant="soft" onClick={() => setV((x) => Math.min(100, x + 15))}>+15</Button></div>}
          code={`<Progress value={${v}} label="Uploading" showValue />`}
        >
          <div className="w-full max-w-md space-y-5">
            <Progress value={v} label="Uploading assets" showValue />
            {TONES.slice(0, 4).map((t) => <Progress key={t} value={v} tone={t} size="sm" />)}
            <Progress indeterminate label="Syncing…" />
          </div>
        </Showcase>
      </Section>
      <Section title="Circular">
        <Showcase code={`<CircularProgress value={${v}} size={64} />`}>
          <CircularProgress value={v} size={44} stroke={4} />
          <CircularProgress value={v} size={64} tone="success" />
          <CircularProgress value={v} size={84} stroke={7} tone="warning" />
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "value", type: "number", description: "Completion from 0 to 100." },
          { name: "indeterminate", type: "boolean", default: "false", description: "Animates continuously when progress is unknown." },
          { name: "showValue", type: "boolean", default: "false", description: "Renders a numeric readout beside the label." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Track thickness (linear only)." },
          { name: "tone", type: "Tone", default: '"accent"', description: "Fill color." },
        ]} />
      </Section>
    </>
  );
}

/* -------------------------------- SKELETON -------------------------------- */

export function SkeletonDoc() {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <PageHeader eyebrow="Components · Data Display" title="Skeleton" description="A shimmering placeholder that mirrors the shape of incoming content. Skeletons prevent layout shift — match the real dimensions exactly." tags={["No layout shift", "Shimmer"]} />
      <Import names="Skeleton" />
      <Section title="Usage">
        <Showcase
          align="stretch"
          controls={<Button size="sm" variant="soft" onClick={() => setLoading((l) => !l)}>{loading ? "Show content" : "Show skeleton"}</Button>}
          code={`{loading ? <Skeleton className="h-4 w-48" /> : <p>Ada Lovelace</p>}`}
        >
          <Card className="w-full max-w-sm p-5">
            {loading ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2"><Skeleton className="h-3.5 w-32" /><Skeleton className="h-3 w-20" /></div>
                </div>
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
                <Skeleton className="h-8 w-28 rounded-lg" />
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar name="Ada Lovelace" tone="accent" />
                  <div><p className="text-label-sm">Ada Lovelace</p><p className="text-paragraph-xs text-muted">Owner</p></div>
                </div>
                <p className="text-paragraph-sm text-muted">First to recognise that a machine could do more than calculate.</p>
                <Button size="sm">View profile</Button>
              </div>
            )}
          </Card>
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[{ name: "className", type: "string", description: "Size and radius utilities that match the final content." }]} />
      </Section>
    </>
  );
}

/* --------------------------------- SNIPPET -------------------------------- */

export function SnippetDoc() {
  return (
    <>
      <PageHeader eyebrow="Components · Data Display" title="Snippet" description="A one-line code block with a copy affordance. Used for install commands, IDs and tokens." tags={["Clipboard", "Monospace"]} />
      <Import names="Snippet, Code" />
      <Section title="Usage">
        <Showcase align="stretch" code={`<Snippet>npm install @aperture/react</Snippet>
<Snippet symbol="">npx aperture init</Snippet>`}>
          <div className="w-full space-y-3">
            <Snippet>npm install @aperture/react</Snippet>
            <Snippet symbol="">wk_live_51H8xQ2eZvKYlo2C</Snippet>
            <Snippet symbol="›">git commit -m "feat: token pipeline"</Snippet>
          </div>
        </Showcase>
      </Section>
      <Section title="Inline code" description="Use Code for identifiers inside a sentence.">
        <Showcase>
          <p className="text-paragraph-sm text-muted">
            Override <Code tone="accent">--accent-h</Code> on <Code>:root</Code> and every component follows.
          </p>
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "children", type: "string", required: true, description: "Text copied to the clipboard." },
          { name: "symbol", type: "string", default: '"$"', description: "Leading prompt symbol. Pass an empty string to hide." },
        ]} />
      </Section>
    </>
  );
}

/* ----------------------------------- KBD ---------------------------------- */

export function KbdDoc() {
  return (
    <>
      <PageHeader eyebrow="Components · Data Display" title="Keyboard Key" description="Renders a keyboard key with a physical, slightly raised appearance. Used in menus, tooltips and shortcut reference tables." tags={["Semantic kbd"]} />
      <Import names="Kbd" />
      <Section title="Usage">
        <Showcase code={`<Kbd>⌘</Kbd><Kbd>K</Kbd>`}>
          <span className="flex items-center gap-1"><Kbd>⌘</Kbd><Kbd>K</Kbd></span>
          <span className="flex items-center gap-1"><Kbd>Ctrl</Kbd><Kbd>Shift</Kbd><Kbd>P</Kbd></span>
          <span className="flex items-center gap-1"><Kbd>↑</Kbd><Kbd>↓</Kbd></span>
          <span className="flex items-center gap-1"><Kbd>esc</Kbd></span>
        </Showcase>
      </Section>
      <Section title="In context">
        <Showcase align="stretch">
          <div className="w-full max-w-sm divide-y divide-separator-secondary overflow-hidden rounded-2xl bg-surface ring-1 ring-border shadow-xs">
            {[[<Copy key="c" />, "Copy", "⌘C"], [<Pencil key="p" />, "Rename", "F2"], [<Trash2 key="t" />, "Delete", "⌫"]].map(([icon, label, k], i) => (
              <div key={i} className="flex items-center gap-3 px-3.5 py-2.5 text-paragraph-sm">
                <span className="text-subtle [&_svg]:h-4 [&_svg]:w-4">{icon as React.ReactNode}</span>
                <span className="flex-1">{label as string}</span>
                <Kbd>{k as string}</Kbd>
              </div>
            ))}
          </div>
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[{ name: "children", type: "ReactNode", required: true, description: "Key glyph or label." }]} />
      </Section>
    </>
  );
}

/* --------------------------------- SPINNER -------------------------------- */

export function SpinnerDoc() {
  return (
    <>
      <PageHeader eyebrow="Components · Feedback" title="Spinner" description="An indeterminate loading indicator for waits under three seconds. Longer waits should use a Progress bar or a Skeleton." tags={["Indeterminate", "Inherits color"]} />
      <Import names="Spinner" />
      <Section title="Usage">
        <Showcase code={`<Spinner className="h-5 w-5 text-accent" />`}>
          <Spinner className="h-4 w-4 text-muted" />
          <Spinner className="h-5 w-5 text-accent" />
          <Spinner className="h-7 w-7 text-success" />
          <Spinner className="h-9 w-9 text-danger" />
        </Showcase>
      </Section>
      <Section title="In buttons">
        <Showcase>
          <Button loading>Saving</Button>
          <Button loading variant="soft">Uploading</Button>
          <Button loading variant="outline" tone="default" size="sm">Verifying</Button>
        </Showcase>
      </Section>
      <Section title="Loading surfaces">
        <Showcase align="stretch">
          <ScrollShadow maxHeight={150} className="rounded-2xl bg-surface ring-1 ring-border shadow-xs">
            <div className="space-y-2 p-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 text-paragraph-sm text-muted">
                  <Spinner className="h-3.5 w-3.5 text-accent" />
                  Compiling module {i + 1} of 8
                </div>
              ))}
            </div>
          </ScrollShadow>
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[{ name: "className", type: "string", description: "Size and color utilities. The spinner inherits currentColor." }]} />
      </Section>
    </>
  );
}

/* ---------------------------------- ALERT --------------------------------- */

export function AlertDoc() {
  const [open, setOpen] = useState(true);
  return (
    <>
      <PageHeader eyebrow="Components · Feedback" title="Alert" description="A persistent, inline message about the state of a page or a region. For transient confirmations use a Toast instead." tags={["3 variants", "Dismissible", "Action slot"]} />
      <Import names="Alert" />
      <Section title="Tones">
        <Showcase align="stretch" code={`<Alert tone="success" title="Deployment complete">
  Version 3.2.0 is live in production.
</Alert>`}>
          <div className="w-full space-y-3">
            <Alert tone="accent" title="New version available">Aperture 3.2 adds the Theme Studio and nine components.</Alert>
            <Alert tone="success" title="Deployment complete">Version 3.2.0 is live in production.</Alert>
            <Alert tone="warning" title="Approaching seat limit">You are using 9 of 10 seats.</Alert>
            <Alert tone="danger" title="Build failed">Module not found: <Code>@aperture/icons</Code>.</Alert>
          </div>
        </Showcase>
      </Section>
      <Section title="Variants">
        <Showcase align="stretch">
          <div className="w-full space-y-3">
            {(["soft", "outline", "solid"] as const).map((v) => (
              <Alert key={v} variant={v} tone="accent" title={`${v} variant`}>Tone and variant compose independently.</Alert>
            ))}
          </div>
        </Showcase>
      </Section>
      <Section title="Actions & dismissal">
        <Showcase align="stretch">
          <div className="w-full space-y-3">
            {open && (
              <Alert tone="warning" title="Payment method expires soon" onClose={() => setOpen(false)} action={<Button size="sm" variant="soft" tone="warning" startContent={<ExternalLink className="h-3.5 w-3.5" />}>Update card</Button>}>
                Visa ending 4242 expires next month.
              </Alert>
            )}
            {!open && <Button size="sm" variant="soft" onClick={() => setOpen(true)}>Restore alert</Button>}
          </div>
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "tone", type: "Tone", default: '"accent"', description: "Semantic intent and icon." },
          { name: "variant", type: '"soft" | "outline" | "solid"', default: '"soft"', description: "Fill treatment." },
          { name: "title", type: "ReactNode", description: "Bold heading line." },
          { name: "action", type: "ReactNode", description: "Action slot rendered under the body." },
          { name: "onClose", type: "() => void", description: "Renders a dismiss button." },
        ]} />
        <Callout tone="warning" title="Don't stack alerts">
          More than two stacked alerts become invisible. Aggregate them into a single summary with a link to detail.
        </Callout>
      </Section>
    </>
  );
}
