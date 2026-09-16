import { useMemo, useState, type ReactNode } from "react";
import { ArrowRight, Bell, Grid2x2, List, MoreHorizontal, Search, Settings } from "lucide-react";
import { COMPONENT_GROUPS } from "../docs/nav";
import { Button } from "../ui/Button";
import { Alert, Avatar, AvatarGroup, Card, Chip, CircularProgress, Kbd, Progress, Skeleton, Snippet } from "../ui/Display";
import { Checkbox, Input, RadioGroup, Select, Slider, Switch, Textarea } from "../ui/Form";
import { Accordion, Breadcrumbs, Pagination, Tabs } from "../ui/Navigation";
import { Spinner } from "../ui/Button";
import { CompactButton, DotStepper, FileFormatIcon, HorizontalStepper, LinkButton, SegmentedControl, SocialButton, StatusBadge, Tag, DigitInput, Notification, Banner } from "../ui/Extra";
import { cn } from "../utils/cn";
import { ContentDivider, EmptyState, NumberInput, Rating, SearchInput, SelectionCard, Timeline, ToggleGroup, VerticalTabMenu, WidgetBox } from "../ui/More";
import { ChatBubble, CopyButton, Metre, ScrollArea } from "../ui/Pro";
import { RiSparklingLine } from "@remixicon/react";
import { TierBadge } from "../docs/Preview";
import {
  RiAlignCenter,
  RiAlignLeft,
  RiAlignRight,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiArrowUpDownLine,
  RiBankCardLine,
  RiBold,
  RiCheckLine,
  RiFolderLine,
  RiGlobalLine,
  RiInboxLine,
  RiItalic,
  RiLightbulbLine,
  RiLink,
  RiRocketLine,
  RiSettings3Line,
  RiTeamLine,
  RiUser3Line,
} from "@remixicon/react";
import { FancyButton } from "../ui/Button";
import { ButtonTile, InfoLabel, InlineMessage, ListItem, PaymentCard, Toolbar, ToolbarButton, ToolbarSeparator, Well } from "../ui/Patterns";

const noop = () => {};

const PREVIEWS: Record<string, () => ReactNode> = {
  "components/data-table": () => <div className="w-[340px] scale-90 overflow-hidden rounded-xl bg-surface ring-1 ring-border text-paragraph-xs"><div className="flex items-center justify-between bg-surface-secondary px-3 py-1.5 text-subheading-2xs uppercase text-subtle"><span>Customer</span><span className="flex items-center gap-0.5">MRR <RiArrowUpDownLine /></span></div>{[["Aurora Analytics", "$4,200"], ["Halcyon Labs", "$960"], ["Corewave Systems", "$5,400"]].map(([n, v]) => <div key={n} className="flex items-center justify-between border-t border-separator-secondary px-3 py-2"><span className="flex items-center gap-1.5"><Avatar name={n} size="xs" tone="accent" square />{n}</span><span className="font-mono tabular-nums">{v}</span></div>)}</div>,
  "components/file-upload": () => <div className="w-56"><div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border-strong bg-surface-secondary/60 px-4 py-5 text-center"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-surface text-muted ring-1 ring-border"><RiFolderLine size={16} /></span><span className="text-label-xs text-foreground">Drag & drop file</span><span className="rounded-md bg-neutral-950 px-2.5 py-1 text-label-xs text-white dark:bg-neutral-200 dark:text-neutral-950">Browse</span></div></div>,
  "components/transfer-list": () => <div className="flex w-64 items-center gap-1.5"><div className="flex-1 rounded-lg bg-surface p-1.5 ring-1 ring-border text-paragraph-xs">{["Design", "Sprint", "Triage"].map((i) => <div key={i} className="rounded px-2 py-1 text-muted">{i}</div>)}</div><div className="flex flex-col gap-1"><CompactButton variant="stroke"><RiArrowRightSLine size={14} /></CompactButton><CompactButton variant="stroke"><RiArrowLeftSLine size={14} /></CompactButton></div><div className="flex-1 rounded-lg bg-accent-soft p-1.5 text-paragraph-xs"><div className="rounded bg-surface px-2 py-1 text-accent-soft-foreground">Standup</div></div></div>,
  "components/carousel": () => <div className="w-64 overflow-hidden rounded-xl bg-surface ring-1 ring-border shadow-xs"><div className="p-4"><p className="text-label-xs text-foreground">“We replaced three years of CSS in a fortnight.”</p><div className="mt-3 flex items-center gap-2"><Avatar name="Maya Chen" size="xs" tone="accent" /><div><p className="text-paragraph-xs text-foreground">Maya Chen</p><p className="text-[10px] text-subtle">Corewave</p></div></div></div><div className="flex justify-between border-t border-separator px-4 py-2"><div className="flex gap-1"><span className="h-1 w-4 rounded-full bg-foreground" /><span className="h-1 w-1 rounded-full bg-neutral-300" /></div><div className="flex gap-1"><CompactButton variant="ghost"><RiArrowLeftSLine size={14} /></CompactButton><CompactButton variant="ghost"><RiArrowRightSLine size={14} /></CompactButton></div></div></div>,
  "components/tree-view": () => <div className="w-44 rounded-lg bg-surface p-1.5 ring-1 ring-border text-paragraph-xs">{[["src", true, 0], ["ui", true, 1], ["Button.tsx", false, 2], ["Form.tsx", false, 2]].map(([l, arrow, d]) => <div key={l as string} className="flex items-center gap-1 rounded py-1 text-foreground" style={{ paddingLeft: 6 + (d as number) * 12 }}>{arrow ? <RiArrowRightSLine size={13} className="text-subtle" /> : <span className="w-3" />}{l as string}</div>)}</div>,
  "components/inline-edit": () => <div className="w-52 rounded-lg bg-surface px-3 py-2 ring-1 ring-border text-paragraph-xs"><span className="text-foreground">Q3 Design Audit</span><span className="ml-1.5 text-subtle">✎</span></div>,
  "components/split-button": () => <span className="inline-flex overflow-hidden rounded-10 shadow-fancy-stroke ring-1 ring-inset ring-border"><span className="bg-accent px-3.5 py-2 text-label-xs text-white">Save</span><span className="flex w-7 items-center justify-center border-l border-black/15 bg-accent text-white"><RiArrowUpDownLine /></span></span>,
  "components/pricing-card": () => <div className="relative w-44 rounded-xl bg-surface p-4 ring-2 ring-accent shadow-sm"><Chip size="sm" tone="accent" className="absolute -top-2 left-3">Popular</Chip><p className="text-label-xs text-foreground">Pro</p><p className="mt-1 text-title-h6 tabular-nums text-foreground">$19<span className="text-paragraph-xs text-subtle">/mo</span></p><div className="mt-2.5 space-y-1">{["Unlimited", "Support"].map((f) => <p key={f} className="flex items-center gap-1 text-paragraph-xs text-muted"><RiCheckLine size={12} className="text-success" />{f}</p>)}</div></div>,
  "components/order-summary": () => <div className="w-52 rounded-xl bg-surface p-3.5 ring-1 ring-border"><p className="text-label-xs text-foreground">Order summary</p>{[["All-access", "$249"], ["Figma kit", "$49"]].map(([n, v]) => <div key={n} className="mt-1.5 flex justify-between text-paragraph-xs"><span className="text-muted">{n}</span><span className="tabular-nums text-foreground">{v}</span></div>)}<div className="my-2 h-px bg-separator" /><div className="flex justify-between text-label-xs text-foreground"><span>Total</span><span className="tabular-nums">$298.00</span></div></div>,
  "components/team-member-card": () => <div className="w-60 rounded-xl bg-surface p-3 ring-1 ring-border shadow-xs"><div className="flex items-center gap-2.5"><Avatar name="Sophia Williams" size="md" tone="accent" /><div><p className="text-label-xs text-foreground">Sophia Williams</p><p className="text-paragraph-xs text-muted">Design Engineer</p></div></div></div>,
  "components/stat-card": () => <div className="w-44 rounded-xl bg-surface p-3.5 ring-1 ring-border"><div className="flex items-start justify-between"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-secondary ring-1 ring-border"><RiBankCardLine size={15} /></span><Chip size="sm" tone="success" variant="soft">↑ 6.2%</Chip></div><p className="mt-2.5 text-paragraph-xs text-muted">MRR</p><p className="text-title-h6 tabular-nums text-foreground">$28,914</p></div>,
  "components/chat-bubble": () => <div className="w-56 space-y-2"><ChatBubble side="left" author="Lena">Morning!</ChatBubble><ChatBubble side="right" author="You">Morning 👋</ChatBubble></div>,
  "components/metre": () => <div className="w-40 space-y-2"><Metre value={38} label="Storage" /><Metre value={76} label="Quota" tone="warning" /><Metre value={94} label="Seats" tone="danger" /></div>,
  "components/scroll-area": () => <div className="w-40"><ScrollArea maxHeight={96}><ul className="space-y-1.5 text-paragraph-xs text-foreground">{["Account", "Billing", "Members", "Security", "Webhooks"].map((i) => <li key={i}>{i}</li>)}</ul></ScrollArea></div>,
  "components/error-page": () => <div className="text-center"><span className="text-title-h1 tabular-nums text-neutral-200 dark:text-neutral-800">404</span><p className="-mt-3 text-label-sm text-foreground">Page not found</p><Button size="xs" className="mt-2">Back home</Button></div>,
  "components/cookie-consent": () => <div className="w-52 rounded-xl bg-surface p-3 shadow-lg ring-1 ring-border"><p className="text-label-xs text-foreground">We use cookies</p><p className="mt-1 text-[10px] text-muted">To personalise content and analyse traffic.</p><div className="mt-2 flex gap-1.5"><Button size="xs">Accept</Button><Button size="xs" variant="outline" tone="default">Only necessary</Button></div></div>,
  "components/copy-button": () => <CopyButton text="npm install @aperture/react" size="sm" />,
  "components/overflow-utilities": () => <div className="flex flex-col items-center gap-2"><div className="rounded-lg bg-surface px-3 py-1.5 text-paragraph-xs text-foreground ring-1 ring-border">Inline edit <span className="text-subtle">✎</span></div><div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white shadow-fancy-accent"><RiLightbulbLine size={16} /></div></div>,
  "components/button-tile": () => <div className="grid w-56 grid-cols-2 gap-2 scale-90"><ButtonTile icon={<RiGlobalLine />} label="Web app" selected /><ButtonTile icon={<RiRocketLine />} label="API" /></div>,
  "components/toolbar": () => <Toolbar><ToolbarButton icon={<RiBold />} label="Bold" active /><ToolbarButton icon={<RiItalic />} label="Italic" /><ToolbarSeparator /><ToolbarButton icon={<RiLink />} label="Link" /></Toolbar>,
  "components/combobox": () => <div className="w-52 rounded-10 bg-field px-3 py-2.5 text-paragraph-sm shadow-xs ring-1 ring-inset ring-border">eu-west-2 · London</div>,
  "components/chat-input": () => <div className="w-64 rounded-2xl bg-surface p-2 shadow-md ring-1 ring-border"><p className="px-2 pt-1 text-paragraph-sm text-field-placeholder">Ask anything…</p><div className="mt-2 flex justify-end"><span className="h-7 w-7 rounded-lg bg-neutral-950 dark:bg-white" /></div></div>,
  "components/info-label": () => <div className="flex gap-6"><InfoLabel label="MRR" value="$28,914" tone="success" /><InlineMessage tone="accent">Saved automatically</InlineMessage></div>,
  "components/list-item": () => <div className="w-60 rounded-xl bg-surface p-1 ring-1 ring-border"><ListItem leading={<Avatar name="Sophia W" size="sm" tone="accent" />} title="Sophia Williams" description="Product Designer" trailing={<Chip size="sm" color="blue">Owner</Chip>} /></div>,
  "components/payment-card": () => <div className="w-52"><PaymentCard last4="4242" holder="Sophia W." expiry="09/28" className="p-3.5 [&_p]:text-[10px]" /></div>,
  "components/well": () => <Well className="w-52"><p className="text-label-xs">Order summary</p><p className="text-paragraph-xs text-muted">3 items · $248</p></Well>,
  "components/alert-dialog": () => <div className="w-56 rounded-2xl bg-surface p-4 ring-1 ring-border shadow-xl"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-lighter text-red-base ring-1 ring-red-base/20"><RiInboxLine size={16} /></span><p className="mt-2 text-label-xs">Delete project?</p><div className="mt-3 grid grid-cols-2 gap-2"><Button size="xxs" variant="outline" tone="default">Cancel</Button><Button size="xxs" tone="danger">Delete</Button></div></div>,
  "components/hover-card": () => <div className="w-56 rounded-2xl bg-surface p-3 ring-1 ring-border shadow-lg"><div className="flex items-center gap-2"><Avatar name="Sophia W" size="sm" tone="accent" /><div><p className="text-label-xs">Sophia Williams</p><p className="text-[10px] text-subtle">@sophia</p></div></div><p className="mt-2 text-paragraph-xs text-muted">Designing systems that scale.</p></div>,
  "components/fancy-button": () => <div className="flex gap-2"><FancyButton>Get started</FancyButton><FancyButton tone="default">Neutral</FancyButton></div>,
  "components/toggle-group": () => <ToggleGroup value={["left"]} onChange={noop} items={[{ value: "left", icon: <RiAlignLeft /> }, { value: "center", icon: <RiAlignCenter /> }, { value: "right", icon: <RiAlignRight /> }]} />,
  "components/selection-card": () => <div className="w-60"><SelectionCard type="radio" checked onChange={noop} icon={<RiRocketLine />} title="Pro" description="For product teams" meta="$19" /></div>,
  "components/inputs-more": () => <div className="flex flex-col gap-2"><NumberInput value={3} onChange={noop} size="sm" /><SearchInput value="" onChange={noop} size="sm" shortcut="⌘K" className="w-48" /></div>,
  "components/rating": () => <Rating value={4} readOnly size="lg" />,
  "components/color-picker": () => <div className="grid grid-cols-6 gap-1.5">{["#335CFF", "#7D52F4", "#E255F2", "#FB3748", "#FF8447", "#F6B51E", "#1FC16B", "#22D3BB", "#47C2FF", "#525866", "#0E121B", "#FFFFFF"].map((c) => <span key={c} className="h-6 w-6 rounded-md ring-1 ring-inset ring-black/10" style={{ background: c }} />)}</div>,
  "components/widget-box": () => <div className="w-56 scale-90"><WidgetBox icon={<RiBankCardLine />} title="Revenue"><p className="text-title-h6 tabular-nums">$28,914</p></WidgetBox></div>,
  "components/content-divider": () => <div className="w-56 overflow-hidden rounded-lg ring-1 ring-border"><ContentDivider count={3}>Today</ContentDivider><div className="h-8 bg-surface" /><ContentDivider count={12}>Yesterday</ContentDivider></div>,
  "components/timeline": () => <div className="scale-90"><Timeline items={[{ time: "09:42", title: "Deployed", tone: "success" }, { time: "09:38", title: "Build started", tone: "accent" }]} /></div>,
  "components/tab-menu-vertical": () => <div className="w-44 scale-95"><VerticalTabMenu value="members" onChange={noop} items={[{ value: "general", label: "General", icon: <RiSettings3Line /> }, { value: "members", label: "Members", icon: <RiTeamLine />, count: 12 }]} /></div>,
  "components/dropdown": () => <div className="w-48 rounded-xl bg-surface py-1.5 ring-1 ring-border shadow-lg text-paragraph-xs"><div className="flex items-center gap-2 px-3 py-1.5"><Avatar name="Sophia W" size="xs" tone="accent" /><div><p className="text-label-xs">Sophia</p><p className="text-[10px] text-subtle">sophia@ap.io</p></div></div><div className="my-1 h-px bg-separator" />{[["Profile", RiUser3Line], ["Team", RiTeamLine]].map(([l, I]) => { const Ic = I as typeof RiUser3Line; return <div key={l as string} className="flex items-center gap-2 px-3 py-1.5"><Ic size={14} className="text-subtle" />{l as string}</div>; })}</div>,
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

export function ComponentsIndex({ navigate }: { navigate: (t: string) => void }) {
  const [q, setQ] = useState("");
  const total = useMemo(() => COMPONENT_GROUPS.reduce((n, g) => n + g.items.length, 0), []);
  const groups = useMemo(
    () => COMPONENT_GROUPS.map((g) => ({ ...g, items: g.items.filter((i) => (i.title + " " + (i.keywords ?? "")).toLowerCase().includes(q.toLowerCase())) })).filter((g) => g.items.length),
    [q],
  );
  return (
    <>
      <header className="mb-10">
        <p className="mb-3 text-subheading-xs uppercase text-accent">Components</p>
        <h1 className="text-title-h5 text-foreground sm:text-title-h4">{total} production-ready components</h1>
        <p className="mt-3 max-w-2xl text-paragraph-md text-muted">Every primitive in the system, built on the same tokens and interaction contracts. Click any card to open its documentation, playground and API.</p>
        <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1.5 text-paragraph-xs font-medium text-accent-soft-foreground ring-1 ring-inset ring-accent/20">
          <RiSparklingLine size={13} />
          All components are free during public preview — no signup
        </div>
        <div className="mt-6 max-w-sm"><Input placeholder="Filter components…" startContent={<Search />} value={q} onChange={(e) => setQ(e.target.value)} /></div>
      </header>
      {groups.map((g) => (
        <section key={g.title} className="mb-12">
          <div className="mb-4 flex items-baseline gap-2">
            <h2 className="text-title-h6 text-foreground">{g.title}</h2>
            <span className="text-paragraph-xs text-subtle">{g.items.length}</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {g.items.map((it) => (
              <button key={it.href} onClick={() => navigate(it.href)} className="group overflow-hidden rounded-20 bg-surface text-left ring-1 ring-border shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:ring-border-strong">
                <div className="dot-grid flex h-44 items-center justify-center overflow-hidden bg-background-secondary/60 p-5">
                  <div className="pointer-events-none">{PREVIEWS[it.href]?.() ?? <span className="text-paragraph-xs text-subtle">Preview</span>}</div>
                </div>
                <div className="flex items-center justify-between border-t border-separator px-4 py-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-label-sm text-foreground">{it.title}</p>
                    {it.badge && <Chip size="sm" tone={it.badge === "New" ? "success" : "accent"} variant="soft">{it.badge}</Chip>}
                    {it.pro && <TierBadge tier="pro" size="xs" />}
                  </div>
                  <ArrowRight className="h-4 w-4 text-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
                </div>
              </button>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
