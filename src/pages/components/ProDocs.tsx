import { useEffect, useState } from "react";
import { Callout, Import, PageHeader, PropsTable, Section, Showcase } from "../../docs/Blocks";
import { Button } from "../../ui/Button";
import { Chip } from "../../ui/Display";
import { Input, Switch } from "../../ui/Form";
import {
  ActivityFeed,
  Calendar,
  CommandMenu,
  FileUploader,
  Filters,
  NotificationFeed,
  TimePicker,
  type FeedNotification,
  type UploadFile,
} from "../../ui/Pro";
import { useToast } from "../../ui/Overlay";
import {
  RiBellLine,
  RiCommandLine,
  RiEditLine,
  RiGitPullRequestLine,
  RiNotification3Line,
  RiRocketLine,
  RiTeamLine,
  RiTimeLine,
  RiUserFollowLine,
} from "@remixicon/react";

/* ------------------------------- Activity Feed ----------------------------- */

export function ActivityFeedDoc() {
  return (
    <>
      <PageHeader eyebrow="Components · PRO" title="Activity Feed" description="A live timeline of events on an entity: deployments, edits, invitations, comments. Each row pairs an actor with an action, timestamp and optional trailing metadata." tags={["Feed", "Tones", "Meta slot", "Compact"]} />
      <Import names="ActivityFeed" />
      <Section title="Usage">
        <Showcase align="stretch" code={`<ActivityFeed items={[\n  { actor: "Sophia Williams", action: "deployed", target: "v3.4.0", time: "2m ago", tone: "success", icon: <RiRocketLine /> },\n  { actor: "James Brown", action: "edited", target: "Brand guidelines", time: "26m ago", icon: <RiEditLine /> },\n]} />`}>
          <div className="w-full max-w-md">
            <ActivityFeed
              items={[
                { actor: "Sophia Williams", action: "deployed", target: "v3.4.0", time: "2m ago", tone: "success", icon: <RiRocketLine /> },
                { actor: "James Brown", action: "edited", target: "Brand guidelines", time: "26m ago", tone: "accent", icon: <RiEditLine /> },
                { actor: "Lena Müller", action: "opened pull request", target: "#482", time: "1h ago", icon: <RiGitPullRequestLine /> },
                { actor: "Arthur Taylor", action: "joined as an editor", time: "3h ago", tone: "warning", icon: <RiUserFollowLine /> },
              ]}
            />
          </div>
        </Showcase>
      </Section>
      <Section title="Meta slot" description="Attach a status chip or any trailing node to a row, leaving the body text clean.">
        <Showcase align="stretch">
          <div className="w-full max-w-md">
            <ActivityFeed
              compact
              items={[
                { actor: "Sophia", action: "approved", target: "Q3 roadmap", time: "11:42", meta: <Chip size="sm" color="green" variant="lighter">Approved</Chip> },
                { actor: "James", action: "requested changes on", target: "API types", time: "11:05", meta: <Chip size="sm" color="red" variant="lighter">Changes</Chip> },
              ]}
            />
          </div>
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "items", type: "{ actor, action, target?, time, icon?, tone?, meta? }[]", required: true, description: "Feed events in chronological order." },
          { name: "title", type: "string", default: "\"Recent activity\"", description: "Header label." },
          { name: "compact", type: "boolean", default: "false", description: "Tighter paddings for sidebar feeds." },
        ]} />
        <Callout title="Ordering">Render items newest-first and cap the list at a reasonable length — feeds are for scanning recent events, not full audit logs.</Callout>
      </Section>
    </>
  );
}

/* -------------------------------- Command Menu ----------------------------- */

export function CommandMenuDoc() {
  const [open, setOpen] = useState(false);
  const { push } = useToast();
  return (
    <>
      <PageHeader eyebrow="Components · PRO" title="Command Menu" description="A modal palette for quick actions and navigation. Fuzzy search across grouped commands, full keyboard support, and a focus-trapped dialog." tags={["Quick actions", "⌘K ready", "Fuzzy search", "Groups"]} />
      <Import names="CommandMenu" />
      <Section title="Usage">
        <Showcase code={`<CommandMenu open={open} onClose={close} groups={groups} />`}>
          <Button onClick={() => setOpen(true)} endContent={<RiCommandLine />}>Open command menu</Button>
          <CommandMenu
            open={open}
            onClose={() => setOpen(false)}
            groups={[
              {
                label: "Create",
                items: [
                  { label: "New project", hint: "Projects group deployments", icon: <RiRocketLine />, keywords: "create repo", onSelect: () => push({ title: "New project", description: "Project creation opened.", tone: "accent" }) },
                  { label: "Invite teammate", hint: "Send an email invitation", icon: <RiUserFollowLine />, onSelect: () => push({ title: "Invitation", description: "Teammate invite flow opened.", tone: "accent" }) },
                ],
              },
              {
                label: "Navigate",
                items: [
                  { label: "Activity feed", hint: "Recent events", icon: <RiTimeLine />, onSelect: () => push({ title: "Activity", description: "Opening the activity feed.", tone: "default" }) },
                  { label: "Notifications", hint: "Unread and recent", icon: <RiBellLine />, onSelect: () => push({ title: "Notifications", description: "Opening notification settings.", tone: "default" }) },
                  { label: "Team members", hint: "Roles and permissions", icon: <RiTeamLine />, onSelect: () => push({ title: "Members", description: "Opening the team directory.", tone: "default" }) },
                ],
              },
            ]}
          />
        </Showcase>
        <Callout title="Global shortcut">Bind this to <code className="font-mono text-paragraph-xs">⌘K</code> — it is the expected affordance in every modern product, and Aperture's own shell palette already uses it.</Callout>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "open", type: "boolean", required: true, description: "Controls visibility." },
          { name: "onClose", type: "() => void", required: true, description: "Fires on backdrop, Escape and selection." },
          { name: "groups", type: "{ label, items: { label, hint?, icon?, keywords?, onSelect }[] }[]", required: true, description: "Grouped commands. Filtering is fuzzy." },
          { name: "placeholder", type: "string", default: "\"Type a command or search…\"", description: "Input placeholder." },
        ]} />
      </Section>
    </>
  );
}

/* ------------------------------ Notification Feed -------------------------- */

export function NotificationFeedDoc() {
  const [items, setItems] = useState<FeedNotification[]>([
    { id: 1, title: "Sophia deployed v3.4.0", body: "Production · 1,904 modules", time: "2m", tone: "success", icon: <RiRocketLine /> },
    { id: 2, title: "Build failed", body: "Module not found: ./ui/Overlay", time: "14m", tone: "danger", icon: <RiNotification3Line /> },
    { id: 3, title: "You were mentioned", body: "James referenced you in a pull request", time: "1h", tone: "accent", icon: <RiBellLine /> },
    { id: 4, title: "Weekly digest", body: "The highlights, every Monday", time: "Yesterday", read: true, icon: <RiCommandLine /> },
  ]);
  return (
    <>
      <PageHeader eyebrow="Components · PRO" title="Notification Feed" description="A scrollable list of events with unread emphasis, per-item dismissal via tap and a mark-all-read action. Unread rows carry a soft accent fill and a dot." tags={["Unread state", "Mark all read", "Scrollable"]} />
      <Import names="NotificationFeed" />
      <Section title="Usage" description="Tap a row to mark it read. The badge count and dot update live.">
        <Showcase align="stretch" code={`<NotificationFeed items={items} onRead={(id) => markRead(id)} onReadAll={markAll} />`}>
          <div className="flex w-full max-w-sm flex-col gap-3">
            <NotificationFeed items={items} onRead={(id) => setItems((s) => s.map((n) => (n.id === id ? { ...n, read: true } : n)))} onReadAll={() => setItems((s) => s.map((n) => ({ ...n, read: true })))} className="max-h-72" />
            <Button size="sm" variant="outline" tone="default" onClick={() => setItems((s) => s.map((n) => ({ ...n, read: false })))}>Reset example</Button>
          </div>
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "items", type: "{ id, title, body?, time, tone?, read?, icon? }[]", required: true, description: "Notifications, newest first." },
          { name: "onRead", type: "(id: number) => void", description: "Fires when a row is clicked." },
          { name: "onReadAll", type: "() => void", description: "Fires from the header action." },
        ]} />
      </Section>
    </>
  );
}

/* -------------------------------- File Uploader ---------------------------- */

export function FileUploadDoc() {
  const [files, setFiles] = useState<UploadFile[]>([
    { id: 1, name: "2026-brand-guidelines.pdf", size: "4.2 MB", progress: 100, status: "done" },
    { id: 2, name: "batch-upload.png", size: "12.6 MB", progress: 62, status: "uploading" },
  ]);

  useEffect(() => {
    const timers = files
      .filter((f) => f.status === "uploading")
      .map((f) =>
        window.setInterval(() => {
          setFiles((s) =>
            s.map((x) => (x.id === f.id ? { ...x, progress: Math.min(100, x.progress + 13) } : x))
          );
        }, 400),
      );
    return () => timers.forEach((t) => window.clearInterval(t));
  }, [files.some((f) => f.status === "uploading")]);

  useEffect(() => {
    const finished = files.some((f) => f.status === "uploading" && f.progress >= 100);
    if (finished) setFiles((s) => s.map((f) => (f.status === "uploading" && f.progress >= 100 ? { ...f, status: "done" } : f)));
  }, [files]);

  return (
    <>
      <PageHeader eyebrow="Components · PRO" title="File Uploader" description="A drag-and-drop zone with browse, per-file progress and removal. Accepts any file type, caps the list, and reports state with tone-coloured rows." tags={["Drag & drop", "Progress", "Multiple"]} />
      <Import names="FileUploader" />
      <Section title="Usage">
        <Showcase align="stretch" code={`<FileUploader files={files} onAdd={add} onRemove={remove} max={8} />`}>
          <div className="w-full max-w-md">
            <FileUploader
              files={files}
              max={8}
              onAdd={(names) => setFiles((s) => [...s, ...names.map((name, i) => ({ id: Date.now() + i, name, size: `${(Math.random() * 8 + 0.1).toFixed(1)} MB`, progress: 0, status: "uploading" as const }))])}
              onRemove={(id) => setFiles((s) => s.filter((f) => f.id !== id))}
            />
          </div>
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "files", type: "{ id, name, size, progress, status? }[]", required: true, description: "Controlled file list." },
          { name: "onAdd", type: "(names: string[]) => void", required: true, description: "Fires with the names of dropped or browsed files." },
          { name: "onRemove", type: "(id: number) => void", required: true, description: "Fires when a file is removed." },
          { name: "accept", type: "string", default: "\"Any files\"", description: "Human-readable hint shown in the zone." },
          { name: "max", type: "number", default: "8", description: "Maximum number of files." },
        ]} />
        <Callout title="Validate server-side">Never trust the client. This component reports progress; persistence, scanning and size limits belong on the backend.</Callout>
      </Section>
    </>
  );
}

/* ----------------------------------- Filters ------------------------------- */

export function FiltersDoc() {
  const [selected, setSelected] = useState<Record<string, string[]>>({ Status: ["published"], Team: ["design"] });
  const update = (section: string, values: string[]) => setSelected((s) => ({ ...s, [section]: values }));
  const count = Object.values(selected).reduce((n, v) => n + v.length, 0);
  return (
    <>
      <PageHeader eyebrow="Components · PRO" title="Filters" description="A popover of grouped, multi-select facets with result counts and a live badge on the trigger. Selections are controlled and grouped by section id." tags={["Faceted", "Multi-select", "Result counts"]} />
      <Import names="Filters" />
      <Section title="Usage">
        <Showcase align="stretch" code={`<Filters\n  sections={sections}\n  selected={selected}\n  onChange={update}\n/>`}>
          <div className="flex w-full items-center gap-3">
            <Filters
              triggerLabel="Filters"
              selected={selected}
              onChange={update}
              sections={[
                {
                  id: "Status",
                  name: "Status",
                  options: [
                    { value: "draft", label: "Draft", resultCount: 4 },
                    { value: "published", label: "Published", resultCount: 21 },
                    { value: "archived", label: "Archived", resultCount: 3 },
                  ],
                },
                {
                  id: "Team",
                  name: "Team",
                  options: [
                    { value: "design", label: "Design", resultCount: 6 },
                    { value: "engineering", label: "Engineering", resultCount: 12 },
                    { value: "marketing", label: "Marketing", resultCount: 9 },
                  ],
                },
              ]}
            />
            <span role="status" className="text-paragraph-sm text-muted">{count} active {count === 1 ? "filter" : "filters"}</span>
          </div>
        </Showcase>
        <Callout title="Result counts">Facet counts should reflect the filtered result set. When a value is selected, the “Show results” action commits the search.</Callout>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "sections", type: "{ id, name, options: { value, label, resultCount? }[] }[]", required: true, description: "Facets and their values." },
          { name: "selected", type: "Record<string, string[]>", required: true, description: "Selected values keyed by section id." },
          { name: "onChange", type: "(section: string, values: string[]) => void", required: true, description: "Fires with the next value set for a section." },
          { name: "triggerLabel", type: "string", default: "\"Filters\"", description: "Trigger text." },
        ]} />
      </Section>
    </>
  );
}

/* --------------------------------- Time Picker ----------------------------- */

export function TimePickerDoc() {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("09:30 AM");
  const [format, setFormat] = useState<"12h" | "24h">("12h");
  return (
    <>
      <PageHeader eyebrow="Components · PRO" title="Time Picker" description="Picker for times with scrolling hour, minute and meridian columns. Keyboard navigable per column, so pasting and typing remain optional." tags={["Hours & minutes", "12h / 24h", "Keyboard"]} />
      <Import names="TimePicker" />
      <Section title="Usage">
        <Showcase
          code={`<TimePicker open={open} onClose={close} value={time} onChange={setTime} format="12h" />`}
          controls={
            <label className="flex items-center gap-2.5">
              <Switch checked={format === "24h"} onChange={(v) => setFormat(v ? "24h" : "12h")} size="sm" label="24-hour" />
            </label>
          }
        >
          <div className="flex w-full max-w-xs flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
              <Input size="md" value={time} readOnly wrapperClassName="flex-1" aria-label="Selected time" />
              <Button variant="outline" tone="default" onClick={() => setOpen(true)} startContent={<RiTimeLine />}>Pick</Button>
            </div>
            <TimePicker open={open} onClose={() => setOpen(false)} value={time} format={format} onChange={setTime} />
          </div>
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "open", type: "boolean", required: true, description: "Controls visibility." },
          { name: "onClose", type: "() => void", required: true, description: "Fires on backdrop, Escape and Done." },
          { name: "value", type: "string", required: true, description: "Initial time, \"09:30 AM\" or \"09:30\"." },
          { name: "onChange", type: "(time: string) => void", required: true, description: "Fires with the committed time." },
          { name: "format", type: "\"12h\" | \"24h\"", default: "\"12h\"", description: "Includes a meridian column when 12h." },
        ]} />
      </Section>
    </>
  );
}

/* ---------------------------------- Calendar ------------------------------- */

export function CalendarDoc() {
  const [date, setDate] = useState<Date | null>(new Date());
  return (
    <>
      <PageHeader eyebrow="Components · PRO" title="Calendar" description="An in-page month grid with Monday-first weeks, today emphasis, a selected day, and month navigation. Lightweight enough to embed in dashboards." tags={["Month grid", "Today", "Monday-first"]} />
      <Import names="Calendar" />
      <Section title="Usage">
        <Showcase align="stretch" code={`<Calendar value={date} onChange={setDate} />`}>
          <div className="flex flex-wrap items-start justify-center gap-6">
            <Calendar value={date} onChange={setDate} />
            <div className="flex min-w-44 flex-col gap-2 text-paragraph-sm">
              <p className="text-subheading-xs uppercase text-subtle">Selected</p>
              <p className="text-label-md text-foreground">{date ? date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }) : "None"}</p>
              <p className="text-paragraph-xs text-muted">Keyboard: ← → arrows shift months within the grid.</p>
            </div>
          </div>
        </Showcase>
      </Section>
      <Section title="With a controlled month" description="Pass month and onMonthChange to drive the grid from an external source, such as a date picker.">
        <Showcase align="stretch">
          <Calendar value={null} onChange={() => {}} month={{ year: 2026, month: 8 }} onMonthChange={() => {}} />
        </Showcase>
      </Section>
      <Section title="API">
        <PropsTable rows={[
          { name: "value", type: "Date | null", required: true, description: "Selected day." },
          { name: "onChange", type: "(d: Date) => void", required: true, description: "Fires when a day is clicked." },
          { name: "month", type: "{ year, month }", description: "Controlled visible month (month is 0-based)." },
          { name: "onMonthChange", type: "(d: Date) => void", description: "Fires when the visible month changes." },
        ]} />
      </Section>
    </>
  );
}
