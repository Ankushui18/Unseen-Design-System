import type { ReactNode } from "react";
import { ArrowRight, Bell, Grid2x2, List, MoreHorizontal, Search, Settings } from "lucide-react";
import {
  RiAlignCenter,
  RiAlignLeft,
  RiAlignRight,
  RiBankCardLine,
  RiBold,
  RiGlobalLine,
  RiInboxLine,
  RiItalic,
  RiLink,
  RiRocketLine,
  RiSettings3Line,
  RiTeamLine,
  RiUser3Line,
} from "@remixicon/react";
import { Button, FancyButton, Spinner } from "../ui/Button";
import { Alert, Avatar, AvatarGroup, Card, Chip, CircularProgress, Kbd, Progress, Skeleton, Snippet } from "../ui/Display";
import { Checkbox, Input, RadioGroup, Select, Slider, Switch, Textarea } from "../ui/Form";
import { Accordion, Breadcrumbs, Pagination, Tabs } from "../ui/Navigation";
import { CompactButton, DotStepper, FileFormatIcon, HorizontalStepper, LinkButton, SegmentedControl, SocialButton, StatusBadge, Tag, DigitInput, Notification, Banner } from "../ui/Extra";
import { ContentDivider, EmptyState, NumberInput, Rating, SearchInput, SelectionCard, Timeline, ToggleGroup, VerticalTabMenu, WidgetBox } from "../ui/More";
import { ButtonTile, InfoLabel, InlineMessage, ListItem, PaymentCard, Toolbar, ToolbarButton, ToolbarSeparator, Well } from "../ui/Patterns";
import { cn } from "../utils/cn";

const noop = () => {};

/**
 * Live, in-context thumbnails for every component documentation page.
 * Shared by the Components index grid and the homepage directory so the
 * library is always shown at native size — never as a scaled screenshot.
 */
export const PREVIEWS: Record<string, () => ReactNode> = {
  "components/button-tile": () => <div className="grid w-56 grid-cols-2 gap-2 scale-90"><ButtonTile icon={<RiGlobalLine />} label="Web app" selected /><ButtonTile icon={<RiRocketLine />} label="API" /></div>,
  "components/toolbar": () => <Toolbar><ToolbarButton icon={<RiBold />} label="Bold" active /><ToolbarButton icon={<RiItalic />} label="Italic" /><ToolbarSeparator /><ToolbarButton icon={<RiLink />} label="Link" /></Toolbar>,
  "components/combobox": () => <div className="w-52 rounded-10 bg-field px-3 py-2.5 text-paragraph-sm shadow-xs ring-1 ring-inset ring-border">eu-west-2 · London</div>,
  "components/chat-input": () => <div className="w-64 rounded-2xl bg-surface p-2 shadow-md ring-1 ring-border"><p className="px-2 pt-1 text-paragraph-sm text-field-placeholder">Ask anything…</p><div className="mt-2 flex justify-end"><span className="h-7 w-7 rounded-lg bg-neutral-950 dark:bg-white" /></div></div>,
  "components/info-label": () => <div className="flex gap-6"><InfoLabel label="MRR" value="$12,480" tone="success" /><InlineMessage tone="accent">Saved automatically</InlineMessage></div>,
  "components/list-item": () => <div className="w-60 rounded-xl bg-surface p-1 ring-1 ring-border"><ListItem leading={<Avatar name="Sophia W" size="sm" tone="accent" />} title="Sophia Williams" description="Product Designer" trailing={<Chip size="sm" color="blue">Owner</Chip>} /></div>,
  "components/payment-card": () => <div className="w-52"><PaymentCard last4="4242" holder="Sophia W." expiry="09/28" className="p-3.5 [&_p]:text-[10px]" /></div>,
  "components/well": () => <Well className="w-52"><p className="text-label-xs">Order summary</p><p className="text-paragraph-xs text-muted">3 items · $248</p></Well>,
  "components/alert-dialog": () => <div className="w-56 rounded-2xl bg-surface p-4 ring-1 ring-border shadow-xl"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-lighter text-red-base ring-1 ring-red-base/20"><RiInboxLine size={16} /></span><p className="mt-2 text-label-xs">Delete project?</p><div className="mt-3 grid grid-cols-2 gap-2"><Button size="xxs" variant="outline" tone="default">Cancel</Button><Button size="xxs" tone="danger">Delete</Button></div></div>,
  "components/hover-card": () => <div className="w-56 rounded-2xl bg-surface p-3 ring-1 ring-border shadow-lg"><div className="flex items-center gap-2"><Avatar name="Sophia W" size="sm" tone="accent" /><div><p className="text-label-xs">Sophia Williams</p><p className="text-[10px] text-subtle">@sophia</p></div></div><p className="mt-2 text-paragraph-xs text-muted">Designing systems that scale.</p></div>,
  "components/fancy-button": () => <div className="flex gap-2"><FancyButton>Get started</FancyButton><FancyButton tone="default">Neutral</FancyButton></div>,
  "components/toggle-group": () => <ToggleGroup value={["left"]} onChange={noop} items={[{ value: "left", icon: <RiAlignLeft /> }, { value: "center", icon: <RiAlignCenter /> }, { value: "right", icon: <RiAlignRight /> }]} />,
  "components/selection-card": () => <div className="w-56 scale-95"><SelectionCard type="radio" checked onChange={noop} icon={<RiRocketLine />} title="Pro" description="For product teams" meta="$19" /></div>,
  "components/inputs-more": () => <div className="flex flex-col gap-2"><NumberInput value={3} onChange={noop} size="sm" /><SearchInput value="" onChange={noop} size="sm" shortcut="⌘K" className="w-48" /></div>,
  "components/rating": () => <Rating value={4} readOnly size="lg" />,
  "components/color-picker": () => <div className="grid grid-cols-6 gap-1.5">{["#335CFF", "#7D52F4", "#E255F2", "#FB3748", "#FF8447", "#F6B51E", "#1FC16B", "#22D3BB", "#47C2FF", "#525866", "#0E121B", "#FFFFFF"].map((c) => <span key={c} className="h-6 w-6 rounded-md ring-1 ring-inset ring-black/10" style={{ background: c }} />)}</div>,
  "components/widget-box": () => <div className="w-56 scale-90"><WidgetBox icon={<RiBankCardLine />} title="Revenue"><p className="text-title-h6 tabular-nums">$9,860</p></WidgetBox></div>,
  "components/content-divider": () => <div className="w-56 overflow-hidden rounded-lg ring-1 ring-border"><ContentDivider count={3}>Today</ContentDivider><div className="h-8 bg-surface" /><ContentDivider count={12}>Yesterday</ContentDivider></div>,
  "components/timeline": () => <div className="scale-90"><Timeline items={[{ time: "09:42", title: "Deployed", tone: "success" }, { time: "09:38", title: "Build started", tone: "accent" }]} /></div>,
  "components/tab-menu-vertical": () => <div className="w-44 scale-95"><VerticalTabMenu value="members" onChange={noop} items={[{ value: "general", label: "General", icon: <RiSettings3Line /> }, { value: "members", label: "Members", icon: <RiTeamLine />, count: 12 }]} /></div>,
  "components/dropdown": () => <div className="w-48 rounded-xl bg-surface py-1.5 ring-1 ring-border shadow-lg text-paragraph-xs"><div className="flex items-center gap-2 px-3 py-1.5"><Avatar name="Sophia W" size="xs" tone="accent" /><div><p className="text-label-xs">Sophia</p><p className="text-[10px] text-subtle">sophia@ap.io</p></div></div><div className="my-1 h-px bg-separator" />{[[RiUser3Line, "Profile"], [RiTeamLine, "Team"]].map(([I, l]) => { const Ic = I as typeof RiUser3Line; return <div key={l as string} className="flex items-center gap-2 px-3 py-1.5"><Ic size={14} className="text-subtle" />{l as string}</div>; })}</div>,
  "components/empty-state": () => <div className="scale-75"><EmptyState icon={<RiInboxLine />} title="No projects yet" description="Create your first project." /></div>,
  "components/button": () => <div className="flex gap-2"><Button size="sm">Primary</Button><Button size="sm" tone="default">Neutral</Button><Button size="sm" variant="outline" tone="default">Stroke</Button></div>,
  "components/compact-button": () => <div className="flex gap-2"><CompactButton aria-label="More"><MoreHorizontal /></CompactButton><CompactButton variant="ghost" aria-label="Settings"><Settings /></CompactButton><CompactButton fullRadius aria-label="Notifications"><Bell /></CompactButton></div>,
  "components/link-button": () => <div className="flex gap-4"><LinkButton variant="primary" endContent={<ArrowRight />}>Learn more</LinkButton><LinkButton variant="gray" underline>Forgot?</LinkButton></div>,
  "components/social-button": () => <div className="flex gap-2"><SocialButton brand="google" size="sm">Google</SocialButton><SocialButton brand="apple" size="sm" iconOnly aria-label="Apple" /><SocialButton brand="github" size="sm" iconOnly aria-label="GitHub" /></div>,
  "components/button-group": () => <div className="inline-flex rounded-10 shadow-fancy-stroke [&>*]:rounded-none [&>*]:shadow-none [&>*:first-child]:rounded-l-10 [&>*:last-child]:rounded-r-10 [&>*+*]:border-l [&>*+*]:border-border">{["Day", "Week", "Month"].map((l) => <Button key={l} size="sm" variant="outline" tone="default">{l}</Button>)}</div>,
  "components/input": () => <Input size="sm" placeholder="Search…" startContent={<Search />} wrapperClassName="w-52" />,
  "components/textarea": () => <Textarea placeholder="Write a message…" rows={2} className="min-h-0 w-52 text-paragraph-xs" />,
  "components/select": () => <div className="w-48"><Select size="sm" items={[{ label: "eu-west-2 · London", value: "a" }, { label: "us-east-1", value: "b" }]} /></div>,
  "components/checkbox": () => <div className="flex gap-4"><Checkbox checked label="Checked" onChange={noop} /><Checkbox indeterminate label="Mixed" onChange={noop} /></div>,
  "components/radio-group": () => <RadioGroup orientation="horizontal" value="a" onChange={noop} options={[{ value: "a", label: "Card" }, { value: "b", label: "Bank" }]} />,
  "components/switch": () => <div className="flex gap-4"><Switch checked onChange={noop} /><Switch checked={false} onChange={noop} /><Switch size="lg" checked onChange={noop} /></div>,
  "components/slider": () => <div className="w-48"><Slider value={62} onChange={noop} /></div>,
  "components/digit-input": () => <div className="scale-75"><DigitInput length={4} value="42" onChange={noop} /></div>,
  "components/datepicker": () => <div className="grid grid-cols-7 gap-1">{Array.from({ length: 14 }).map((_, i) => <span key={i} className={cn("flex h-7 w-7 items-center justify-center rounded-md text-[11px]", i === 9 ? "bg-neutral-950 text-white dark:bg-neutral-200 dark:text-neutral-950" : "text-muted")}>{i + 1}</span>)}</div>,
  "components/label-hint": () => <div className="text-left"><p className="text-label-sm">Email <span className="text-accent">*</span></p><p className="mt-1 text-paragraph-xs text-subtle">We'll never share this.</p></div>,
  "components/card": () => <Card className="w-52 p-3"><div className="flex items-center gap-2"><Avatar name="Aperture" size="xs" tone="accent" square /><div><p className="text-label-xs">Project</p><p className="text-paragraph-xs text-subtle">Updated 2m ago</p></div></div></Card>,
  "components/table": () => <div className="w-56 overflow-hidden rounded-lg bg-surface ring-1 ring-border text-[11px]"><div className="bg-surface-secondary px-2 py-1 text-subheading-2xs uppercase text-subtle">Name</div>{["Aurora", "Halcyon"].map((n) => <div key={n} className="flex items-center justify-between border-t border-separator-secondary px-2 py-1.5"><span>{n}</span><StatusBadge status="completed" size="sm">Active</StatusBadge></div>)}</div>,
  "components/avatar": () => <AvatarGroup items={[{ name: "Sophia W" }, { name: "James B" }, { name: "Lena M" }, { name: "Arthur T" }, { name: "Emma W" }]} />,
  "components/chip": () => <div className="flex gap-1.5"><Chip color="blue">Beta</Chip><Chip color="green" dot>Live</Chip><Chip color="gray" variant="stroke">Draft</Chip></div>,
  "components/badge": () => <div className="grid grid-cols-5 gap-1.5">{(["gray", "blue", "orange", "red", "green", "yellow", "purple", "sky", "pink", "teal"] as const).map((c) => <Chip key={c} color={c} variant="light" size="sm">{c}</Chip>)}</div>,
  "components/status-badge": () => <div className="flex gap-1.5"><StatusBadge status="completed">Done</StatusBadge><StatusBadge status="pending">Pending</StatusBadge><StatusBadge status="failed">Failed</StatusBadge></div>,
  "components/tag": () => <div className="flex gap-1.5"><Tag onRemove={noop}>React</Tag><Tag onRemove={noop}>OKLCH</Tag><Tag active>Figma</Tag></div>,
  "components/progress": () => <div className="flex items-center gap-4"><div className="w-32"><Progress value={64} size="sm" /></div><CircularProgress value={64} size={40} stroke={4} /></div>,
  "components/skeleton": () => <div className="flex w-48 items-center gap-3"><Skeleton className="h-9 w-9 rounded-full" /><div className="flex-1 space-y-2"><Skeleton className="h-3 w-3/4" /><Skeleton className="h-3 w-1/2" /></div></div>,
  "components/snippet": () => <Snippet className="w-56 py-1.5 text-paragraph-xs">npm i @aperture/react</Snippet>,
  "components/kbd": () => <div className="flex gap-1"><Kbd>⌘</Kbd><Kbd>K</Kbd></div>,
  "components/file-format-icon": () => <div className="flex gap-3"><FileFormatIcon format="pdf" size={32} /><FileFormatIcon format="png" size={32} /><FileFormatIcon format="xlsx" size={32} /></div>,
  "components/tabs": () => <Tabs size="sm" variant="segment" value="a" onChange={noop} items={[{ key: "a", label: "Overview" }, { key: "b", label: "Activity" }]} />,
  "components/segmented-control": () => <SegmentedControl size="sm" value="list" onChange={noop} items={[{ value: "list", icon: <List /> }, { value: "grid", icon: <Grid2x2 /> }]} />,
  "components/stepper": () => <div className="flex flex-col items-center gap-3"><div className="w-56 scale-90"><HorizontalStepper steps={[{ title: "Account" }, { title: "Team" }, { title: "Done" }]} current={1} /></div><DotStepper count={4} current={1} /></div>,
  "components/accordion": () => <div className="w-56 text-paragraph-xs"><Accordion items={[{ key: "a", title: "What is a token?", content: "A named design decision." }]} defaultOpen={["a"]} /></div>,
  "components/breadcrumbs": () => <Breadcrumbs items={[{ label: "Home", href: "#" }, { label: "Projects", href: "#" }, { label: "Aurora" }]} />,
  "components/pagination": () => <Pagination page={2} total={5} onChange={noop} compact />,
  "components/alert": () => <div className="w-60"><Alert tone="success" title="Deployed" variant="outline">v3.2.0 is live.</Alert></div>,
  "components/notification": () => <div className="w-64 scale-90"><Notification title="Changes saved" description="Settings updated." tone="success" onClose={noop} /></div>,
  "components/banner": () => <div className="w-64 scale-90 overflow-hidden rounded-lg"><Banner tone="accent">New version available</Banner></div>,
  "components/toast": () => <div className="flex w-56 items-center gap-2 rounded-xl bg-surface p-3 ring-1 ring-border shadow-lg text-paragraph-xs"><span className="h-2 w-2 rounded-full bg-success" />Saved successfully</div>,
  "components/modal": () => <div className="w-52 rounded-xl bg-surface p-3 ring-1 ring-border shadow-xl"><p className="text-label-xs">Delete workspace?</p><p className="text-paragraph-xs text-subtle">This can't be undone.</p><div className="mt-2 flex justify-end gap-1.5"><Button size="xs" variant="outline" tone="default">Cancel</Button><Button size="xs" tone="danger">Delete</Button></div></div>,
  "components/drawer": () => <div className="relative h-24 w-48 overflow-hidden rounded-lg bg-background-secondary ring-1 ring-border"><div className="absolute inset-y-0 right-0 w-24 rounded-l-lg bg-surface p-2 shadow-lg ring-1 ring-border"><div className="h-2 w-12 rounded bg-neutral-200 dark:bg-neutral-700" /><div className="mt-2 h-2 w-16 rounded bg-neutral-100 dark:bg-neutral-800" /></div></div>,
  "components/tooltip": () => <div className="flex flex-col items-center gap-1.5"><span className="rounded-lg bg-neutral-950 px-2.5 py-1.5 text-label-xs text-white shadow-tooltip dark:bg-white dark:text-neutral-950">Copy to clipboard</span><CompactButton aria-label="Settings"><Settings /></CompactButton></div>,
  "components/menu": () => <div className="w-44 rounded-xl bg-surface p-1 ring-1 ring-border shadow-lg text-paragraph-xs">{["Edit", "Duplicate", "Archive"].map((i) => <div key={i} className={cn("rounded-lg px-2 py-1.5", i === "Edit" && "bg-surface-hover")}>{i}</div>)}<div className="my-1 h-px bg-separator" /><div className="rounded-lg px-2 py-1.5 text-danger">Delete</div></div>,
  "components/spinner": () => <div className="flex gap-3"><Spinner className="text-muted" /><Spinner className="h-6 w-6 text-accent" /></div>,
};
