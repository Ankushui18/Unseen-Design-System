import type { ReactNode } from "react";
import {
  RiAlignCenter,
  RiAlignLeft,
  RiAlignRight,
  RiArrowDownLine,
  RiArrowRightLine,
  RiArrowUpSLine,
  RiArrowDownSLine,
  RiBankCardLine,
  RiBold,
  RiCheckLine,
  RiEditLine,
  RiGlobalLine,
  RiInboxLine,
  RiItalic,
  RiLayoutGridLine,
  RiLink,
  RiListUnordered,
  RiMoreLine,
  RiNotification3Line,
  RiRocketLine,
  RiSearchLine,
  RiSettings3Line,
  RiShieldCheckLine,
  RiTeamLine,
  RiUser3Line,
  RiSparkling2Line,
} from "@remixicon/react";
import { Button, FancyButton, Spinner } from "../ui/Button";
import {
  Alert,
  Avatar,
  AvatarGroup,
  AvatarGroupCompact,
  Card,
  Chip,
  CircularProgress,
  FeaturedIcon,
  Kbd,
  Progress,
  Skeleton,
  Snippet,
} from "../ui/Display";
import {
  Checkbox,
  Input,
  RadioGroup,
  Select,
  Slider,
  Switch,
  Textarea,
} from "../ui/Form";
import { Accordion, Breadcrumbs, Pagination, Tabs } from "../ui/Navigation";
import {
  CompactButton,
  DotStepper,
  FileFormatIcon,
  HorizontalStepper,
  LinkButton,
  SegmentedControl,
  SocialButton,
  StatusBadge,
  Tag,
  DigitInput,
  Notification,
  Banner,
} from "../ui/Extra";
import {
  ContentDivider,
  EmptyState,
  NumberInput,
  Rating,
  SearchInput,
  SelectionCard,
  Timeline,
  ToggleGroup,
  VerticalTabMenu,
  WidgetBox,
} from "../ui/More";
import {
  ButtonTile,
  InfoLabel,
  InlineMessage,
  ListItem,
  PaymentCard,
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
  Well,
} from "../ui/Patterns";
import { cn } from "../utils/cn";

const noop = () => {};

/**
 * Live, in-context thumbnails for every component documentation page.
 * Engineered as precision micro-specimens strictly bounded within the card thumbnail.
 */
export const PREVIEWS: Record<string, () => ReactNode> = {
  "components/button-tile": () => (
    <div className="grid w-full max-w-[190px] grid-cols-2 gap-1.5">
      <ButtonTile icon={<RiGlobalLine size={16} />} label="Web App" selected />
      <ButtonTile icon={<RiRocketLine size={16} />} label="API SDK" />
    </div>
  ),
  "components/toolbar": () => (
    <Toolbar className="scale-95">
      <ToolbarButton icon={<RiBold size={14} />} label="Bold" active />
      <ToolbarButton icon={<RiItalic size={14} />} label="Italic" />
      <ToolbarSeparator />
      <ToolbarButton icon={<RiLink size={14} />} label="Link" />
    </Toolbar>
  ),
  "components/combobox": () => (
    <div className="w-full max-w-[190px] rounded-8 bg-surface px-2.5 py-1.5 text-[11px] font-mono shadow-xs ring-1 ring-border flex items-center justify-between">
      <span className="truncate">eu-west-2 · London</span>
      <RiArrowDownSLine size={13} className="text-subtle" />
    </div>
  ),
  "components/chat-input": () => (
    <div className="w-full max-w-[200px] rounded-10 border border-border bg-surface p-2 shadow-xs space-y-1 text-left">
      <span className="text-[10px] text-muted block">Ask anything...</span>
      <div className="flex items-center justify-between pt-1">
        <span className="text-[9px] font-mono text-subtle">GPT-4o</span>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-white">
          <RiArrowRightLine size={11} />
        </span>
      </div>
    </div>
  ),
  "components/info-label": () => (
    <div className="flex flex-col gap-1 text-left">
      <InfoLabel label="MRR Revenue" value="$12,480" tone="success" />
      <InlineMessage tone="accent">Synced automatically</InlineMessage>
    </div>
  ),
  "components/list-item": () => (
    <div className="w-full max-w-[200px] rounded-10 bg-surface p-1 ring-1 ring-border shadow-xs text-left">
      <ListItem
        leading={<Avatar name="Sophia W" size="xs" tone="accent" />}
        title="Sophia Williams"
        description="Lead Designer"
        trailing={<Chip size="sm" color="blue">Owner</Chip>}
      />
    </div>
  ),
  "components/payment-card": () => (
    <div className="w-full max-w-[190px]">
      <PaymentCard last4="4242" holder="Sophia W." expiry="09/28" className="p-2.5 [&_p]:text-[9px]" />
    </div>
  ),
  "components/well": () => (
    <Well className="w-full max-w-[190px] p-2.5 text-left">
      <p className="text-label-xs font-medium">Order Summary</p>
      <p className="text-[10px] text-subtle font-mono">3 items · $248.00</p>
    </Well>
  ),
  "components/alert-dialog": () => (
    <div className="w-full max-w-[190px] rounded-10 bg-surface p-2.5 ring-1 ring-border shadow-md text-left space-y-1.5">
      <div className="flex items-center gap-1.5">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-danger/15 text-danger">
          <RiInboxLine size={12} />
        </span>
        <span className="text-label-xs font-medium">Delete item?</span>
      </div>
      <div className="grid grid-cols-2 gap-1 pt-1">
        <Button size="xs" variant="outline" tone="default">Cancel</Button>
        <Button size="xs" tone="danger">Delete</Button>
      </div>
    </div>
  ),
  "components/hover-card": () => (
    <div className="w-full max-w-[190px] rounded-10 bg-surface p-2.5 ring-1 ring-border shadow-md text-left space-y-1.5">
      <div className="flex items-center gap-2">
        <Avatar name="Sophia W" size="xs" tone="accent" />
        <div>
          <p className="text-label-xs font-medium leading-none">Sophia W.</p>
          <p className="text-[9px] text-subtle font-mono">@sophia</p>
        </div>
      </div>
      <p className="text-[10px] text-muted">Building design systems.</p>
    </div>
  ),
  "components/fancy-button": () => (
    <div className="flex flex-col gap-1.5 w-full max-w-[170px]">
      <FancyButton size="sm" fullWidth>Specular Fancy</FancyButton>
      <FancyButton size="sm" tone="default" fullWidth>Neutral Luster</FancyButton>
    </div>
  ),
  "components/toggle-group": () => (
    <ToggleGroup
      value={["left"]}
      onChange={noop}
      items={[
        { value: "left", icon: <RiAlignLeft size={14} /> },
        { value: "center", icon: <RiAlignCenter size={14} /> },
        { value: "right", icon: <RiAlignRight size={14} /> },
      ]}
    />
  ),
  "components/selection-card": () => (
    <div className="w-full max-w-[190px]">
      <SelectionCard type="radio" checked onChange={noop} icon={<RiRocketLine size={15} />} title="Pro Tier" description="For fast teams" meta="$19/m" />
    </div>
  ),
  "components/inputs-more": () => (
    <div className="flex flex-col gap-1.5 w-full max-w-[180px]">
      <NumberInput value={3} onChange={noop} size="sm" />
      <SearchInput value="" onChange={noop} size="sm" shortcut="⌘K" />
    </div>
  ),
  "components/rating": () => <Rating value={4} readOnly size="md" />,
  "components/color-picker": () => (
    <div className="grid grid-cols-6 gap-1">
      {["#335CFF", "#7D52F4", "#E255F2", "#FB3748", "#1FC16B", "#47C2FF"].map((c) => (
        <span key={c} className="h-5 w-5 rounded-4 ring-1 ring-inset ring-black/10 shadow-xs" style={{ background: c }} />
      ))}
    </div>
  ),
  "components/widget-box": () => (
    <div className="w-full max-w-[180px]">
      <WidgetBox icon={<RiBankCardLine size={14} />} title="Net ARR">
        <p className="text-label-sm font-mono font-medium tabular-nums">$9,860.00</p>
      </WidgetBox>
    </div>
  ),
  "components/content-divider": () => (
    <div className="w-full max-w-[190px] overflow-hidden rounded-8 ring-1 ring-border">
      <ContentDivider count={3}>Today</ContentDivider>
      <div className="h-4 bg-surface" />
      <ContentDivider count={12}>Yesterday</ContentDivider>
    </div>
  ),
  "components/timeline": () => (
    <div className="w-full max-w-[180px]">
      <Timeline items={[{ time: "09:42", title: "Deployed", tone: "success" }, { time: "09:38", title: "Started", tone: "accent" }]} />
    </div>
  ),
  "components/tab-menu-vertical": () => (
    <div className="w-full max-w-[180px]">
      <VerticalTabMenu
        value="members"
        onChange={noop}
        items={[
          { value: "general", label: "General", icon: <RiSettings3Line size={13} /> },
          { value: "members", label: "Members", icon: <RiTeamLine size={13} />, count: 12 },
        ]}
      />
    </div>
  ),
  "components/dropdown": () => (
    <div className="w-full max-w-[170px] rounded-8 bg-surface py-1 ring-1 ring-border shadow-md text-left text-[11px]">
      <div className="px-2 py-1 font-medium text-foreground">Sophia Vance</div>
      <div className="my-0.5 h-px bg-separator" />
      <div className="flex items-center gap-1.5 px-2 py-1 text-muted hover:bg-surface-secondary">
        <RiUser3Line size={12} /> Profile
      </div>
      <div className="flex items-center gap-1.5 px-2 py-1 text-muted hover:bg-surface-secondary">
        <RiTeamLine size={12} /> Team
      </div>
    </div>
  ),
  "components/empty-state": () => (
    <div className="w-full max-w-[190px] text-center p-2">
      <EmptyState icon={<RiInboxLine size={20} />} title="No data yet" description="Add your first record." />
    </div>
  ),
  "components/button": () => (
    <div className="flex gap-1.5 items-center flex-wrap justify-center">
      <Button size="xs" variant="solid" tone="accent">Solid</Button>
      <Button size="xs" variant="soft" tone="accent">Soft</Button>
      <Button size="xs" variant="outline" tone="default">Stroke</Button>
    </div>
  ),
  "components/compact-button": () => (
    <div className="flex gap-1.5 items-center justify-center">
      <CompactButton aria-label="More"><RiMoreLine size={14} /></CompactButton>
      <CompactButton variant="ghost" aria-label="Settings"><RiSettings3Line size={14} /></CompactButton>
      <CompactButton fullRadius aria-label="Notifications"><RiNotification3Line size={14} /></CompactButton>
    </div>
  ),
  "components/link-button": () => (
    <div className="flex gap-3 items-center justify-center text-[11px]">
      <LinkButton variant="primary" endContent={<RiArrowRightLine size={12} />}>Learn</LinkButton>
      <LinkButton variant="gray" underline>Forgot?</LinkButton>
    </div>
  ),
  "components/social-button": () => (
    <div className="flex gap-1.5 items-center justify-center">
      <SocialButton brand="google" size="sm">Google</SocialButton>
      <SocialButton brand="github" size="sm" iconOnly aria-label="GitHub" />
    </div>
  ),
  "components/button-group": () => (
    <div className="inline-flex rounded-8 shadow-xs border border-border bg-surface overflow-hidden">
      {["Day", "Week", "Month"].map((l, i) => (
        <span key={l} className={cn("px-2 py-1 text-[10px] font-medium transition-colors", i === 0 ? "bg-accent text-white" : "text-muted hover:text-foreground")}>
          {l}
        </span>
      ))}
    </div>
  ),
  "components/input": () => (
    <Input size="sm" placeholder="Search tokens..." startContent={<RiSearchLine size={13} />} wrapperClassName="w-full max-w-[180px]" />
  ),
  "components/textarea": () => (
    <Textarea placeholder="Type message..." rows={2} className="min-h-0 w-full max-w-[180px] text-[11px]" />
  ),
  "components/select": () => (
    <div className="w-full max-w-[180px]">
      <Select size="sm" items={[{ label: "eu-west-2 (London)", value: "a" }, { label: "us-east-1", value: "b" }]} />
    </div>
  ),
  "components/checkbox": () => (
    <div className="flex gap-3 items-center justify-center">
      <Checkbox checked label="Active" onChange={noop} />
      <Checkbox indeterminate label="Mixed" onChange={noop} />
    </div>
  ),
  "components/radio-group": () => (
    <RadioGroup orientation="horizontal" value="a" onChange={noop} options={[{ value: "a", label: "Card" }, { value: "b", label: "Bank" }]} />
  ),
  "components/switch": () => (
    <div className="flex gap-2.5 items-center justify-center">
      <Switch checked onChange={noop} size="sm" aria-label="Enabled (small)" />
      <Switch checked={false} onChange={noop} size="sm" aria-label="Disabled (small)" />
      <Switch checked onChange={noop} size="md" aria-label="Enabled (medium)" />
    </div>
  ),
  "components/slider": () => (
    <div className="w-full max-w-[170px]">
      <Slider value={65} onChange={noop} />
    </div>
  ),
  "components/digit-input": () => (
    <div className="w-full max-w-[180px] flex justify-center">
      <DigitInput length={4} value="4829" onChange={noop} />
    </div>
  ),
  "components/datepicker": () => (
    <div className="grid grid-cols-7 gap-1 w-full max-w-[180px] text-center">
      {Array.from({ length: 7 }).map((_, i) => (
        <span key={i} className={cn("flex h-5 w-5 items-center justify-center rounded text-[10px] font-mono", i === 3 ? "bg-accent text-white font-medium" : "text-muted")}>
          {i + 14}
        </span>
      ))}
    </div>
  ),
  "components/label-hint": () => (
    <div className="text-left w-full max-w-[180px]">
      <p className="text-label-xs font-medium">Work Email <span className="text-accent">*</span></p>
      <p className="text-[10px] text-subtle">Never shared publicly.</p>
    </div>
  ),
  "components/card": () => (
    <Card className="w-full max-w-[180px] p-2.5 text-left border-glow">
      <div className="flex items-center gap-2">
        <Avatar name="Unseen" size="xs" tone="accent" square />
        <div>
          <p className="text-label-xs font-medium leading-none">Unseen PRO</p>
          <p className="text-[9px] text-subtle mt-0.5">Updated 2m ago</p>
        </div>
      </div>
    </Card>
  ),
  "components/featured-icon": () => (
    <div className="flex gap-2 items-center justify-center">
      <FeaturedIcon size="sm" icon={<RiRocketLine size={15} />} tone="accent" />
      <FeaturedIcon size="sm" variant="solid" icon={<RiBankCardLine size={15} />} tone="default" />
      <FeaturedIcon size="sm" icon={<RiShieldCheckLine size={15} />} tone="success" />
    </div>
  ),
  "components/table": () => (
    <div className="w-full max-w-[190px] overflow-hidden rounded-8 bg-surface ring-1 ring-border text-[10px] text-left">
      <div className="bg-surface-secondary px-2 py-1 uppercase text-subtle font-mono text-[9px]">Cluster</div>
      {["Aurora-01", "Halcyon-02"].map((n) => (
        <div key={n} className="flex items-center justify-between border-t border-separator px-2 py-1">
          <span className="font-mono">{n}</span>
          <StatusBadge status="completed" size="sm">Active</StatusBadge>
        </div>
      ))}
    </div>
  ),
  "components/data-table": () => (
    <div className="w-full max-w-[190px] overflow-hidden rounded-8 bg-surface ring-1 ring-border text-[10px] text-left">
      <div className="flex items-center justify-between border-b border-separator bg-surface-secondary px-2 py-1 font-mono text-[9px] uppercase text-subtle">
        <span>Node</span>
        <RiArrowDownLine size={10} />
      </div>
      {["Ada Lovelace", "Marcus Chen"].map((n, i) => (
        <div key={n} className="flex items-center gap-1.5 border-t border-separator px-2 py-1">
          <Avatar name={n} size="xs" tone={i === 0 ? "accent" : "default"} />
          <span className="flex-1 truncate">{n}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
        </div>
      ))}
    </div>
  ),
  "components/avatar": () => (
    <AvatarGroup items={[{ name: "Sophia W" }, { name: "Marcus C" }, { name: "Elena V" }]} />
  ),
  "components/avatar-group": () => (
    <AvatarGroupCompact size="sm" variant="stroke" items={[{ name: "Sophia W" }, { name: "Marcus C" }, { name: "Elena V" }]} />
  ),
  "components/chip": () => (
    <div className="flex gap-1 items-center flex-wrap justify-center">
      <Chip color="blue" size="sm">Beta</Chip>
      <Chip color="green" size="sm" dot>Live</Chip>
      <Chip color="gray" size="sm" variant="stroke">Draft</Chip>
    </div>
  ),
  "components/badge": () => (
    <div className="flex gap-1 items-center justify-center">
      <Chip color="blue" variant="light" size="sm">New</Chip>
      <Chip color="green" variant="light" size="sm">Stable</Chip>
      <Chip color="red" variant="light" size="sm">Urgent</Chip>
    </div>
  ),
  "components/status-badge": () => (
    <div className="flex gap-1.5 items-center justify-center">
      <StatusBadge status="completed">Done</StatusBadge>
      <StatusBadge status="pending">Review</StatusBadge>
      <StatusBadge status="failed">Error</StatusBadge>
    </div>
  ),
  "components/tag": () => (
    <div className="flex gap-1 items-center justify-center">
      <Tag onRemove={noop}>React</Tag>
      <Tag onRemove={noop}>OKLCH</Tag>
      <Tag active>Figma</Tag>
    </div>
  ),
  "components/progress": () => (
    <div className="flex items-center gap-3 w-full max-w-[180px]">
      <div className="flex-1"><Progress value={68} size="sm" tone="accent" /></div>
      <CircularProgress value={68} size={28} stroke={3} />
    </div>
  ),
  "components/skeleton": () => (
    <div className="flex w-full max-w-[170px] items-center gap-2">
      <Skeleton className="h-7 w-7 rounded-full shrink-0" />
      <div className="flex-1 space-y-1">
        <Skeleton className="h-2.5 w-full" />
        <Skeleton className="h-2 w-2/3" />
      </div>
    </div>
  ),
  "components/snippet": () => (
    <Snippet className="w-full max-w-[190px] py-1 text-[10px]">npm i @unseen/ui</Snippet>
  ),
  "components/kbd": () => (
    <div className="flex gap-1 items-center justify-center">
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </div>
  ),
  "components/file-format-icon": () => (
    <div className="flex gap-2 items-center justify-center">
      <FileFormatIcon format="pdf" size={26} />
      <FileFormatIcon format="png" size={26} />
      <FileFormatIcon format="xlsx" size={26} />
    </div>
  ),
  "components/tabs": () => (
    <Tabs size="sm" variant="segment" value="a" onChange={noop} items={[{ key: "a", label: "Overview" }, { key: "b", label: "Logs" }]} />
  ),
  "components/tab-menu-horizontal": () => (
    <div className="w-full max-w-[180px] border-b border-separator">
      <Tabs size="sm" variant="underline" value="a" onChange={noop} items={[{ key: "a", label: "Main" }, { key: "b", label: "Team" }]} />
    </div>
  ),
  "components/segmented-control": () => (
    <SegmentedControl size="sm" value="list" onChange={noop} items={[{ value: "list", icon: <RiListUnordered size={13} /> }, { value: "grid", icon: <RiLayoutGridLine size={13} /> }]} />
  ),
  "components/stepper": () => (
    <div className="flex flex-col items-center gap-1.5 w-full max-w-[180px]">
      <HorizontalStepper steps={[{ title: "Setup" }, { title: "Deploy" }]} current={1} />
      <DotStepper count={3} current={1} />
    </div>
  ),
  "components/accordion": () => (
    <div className="w-full max-w-[180px] text-[10px]">
      <Accordion items={[{ key: "a", title: "OKLCH Token Graph", content: "Perceptual color lightness." }]} defaultOpen={["a"]} />
    </div>
  ),
  "components/breadcrumbs": () => (
    <Breadcrumbs items={[{ label: "App", href: "#" }, { label: "Nodes", href: "#" }, { label: "Main" }]} />
  ),
  "components/pagination": () => <Pagination page={2} total={5} onChange={noop} compact />,
  "components/alert": () => (
    <div className="w-full max-w-[190px]">
      <Alert tone="success" title="Cluster Ready" variant="outline" className="p-2 text-[10px]">v3.4.0 is active.</Alert>
    </div>
  ),
  "components/notification": () => (
    <div className="w-full max-w-[190px]">
      <Notification title="Settings synced" description="All tokens updated." tone="success" onClose={noop} className="p-2 text-[10px]" />
    </div>
  ),
  "components/banner": () => (
    <div className="w-full max-w-[190px] overflow-hidden rounded-6">
      <Banner tone="accent">v4.0 Alpha live</Banner>
    </div>
  ),
  "components/toast": () => (
    <div className="flex w-full max-w-[180px] items-center gap-2 rounded-8 bg-surface p-2 ring-1 ring-border shadow-md text-[10px]">
      <span className="h-2 w-2 rounded-full bg-success" />
      <span>Session saved</span>
    </div>
  ),
  "components/modal": () => (
    <div className="w-full max-w-[180px] rounded-10 bg-surface p-2.5 ring-1 ring-border shadow-md text-left space-y-1">
      <p className="text-label-xs font-medium">Delete Node?</p>
      <div className="flex justify-end gap-1 pt-1">
        <Button size="xs" variant="outline" tone="default">No</Button>
        <Button size="xs" tone="danger">Yes</Button>
      </div>
    </div>
  ),
  "components/drawer": () => (
    <div className="relative h-16 w-full max-w-[180px] overflow-hidden rounded-8 bg-surface-secondary ring-1 ring-border">
      <div className="absolute inset-y-0 right-0 w-20 rounded-l-8 bg-surface p-1.5 shadow-md ring-1 ring-border">
        <div className="h-1.5 w-10 rounded bg-accent/40" />
        <div className="mt-1 h-1 w-12 rounded bg-border-strong" />
      </div>
    </div>
  ),
  "components/tooltip": () => (
    <div className="flex flex-col items-center gap-1">
      <span className="rounded-6 bg-neutral-950 px-2 py-1 text-[10px] text-white shadow-xs dark:bg-white dark:text-neutral-950">
        Copy address
      </span>
      <CompactButton aria-label="Settings"><RiSettings3Line size={13} /></CompactButton>
    </div>
  ),
  "components/popover": () => (
    <div className="relative flex flex-col items-center w-full max-w-[180px]">
      <div className="rounded-8 bg-surface p-2 ring-1 ring-border shadow-md text-left space-y-1 w-full">
        <p className="text-label-xs font-medium">Ready to Deploy</p>
        <p className="text-[9px] text-subtle font-mono">Edge cluster: FRA-1</p>
      </div>
    </div>
  ),
  "components/menu": () => (
    <div className="w-full max-w-[160px] rounded-8 bg-surface p-1 ring-1 ring-border shadow-md text-left text-[10px]">
      <div className="rounded px-2 py-1 bg-surface-secondary font-medium text-foreground">Edit Spec</div>
      <div className="rounded px-2 py-1 text-muted">Duplicate</div>
      <div className="my-0.5 h-px bg-separator" />
      <div className="rounded px-2 py-1 text-danger">Delete</div>
    </div>
  ),
  "components/spinner": () => (
    <div className="flex gap-2.5 items-center justify-center">
      <Spinner className="h-4 w-4 text-muted" />
      <Spinner className="h-5 w-5 text-accent" />
    </div>
  ),
  "components/ai-prompt-input": () => (
    <div className="w-full max-w-[190px] rounded-10 border border-border bg-surface p-2 shadow-xs space-y-1 text-left">
      <div className="flex items-center justify-between text-[9px] font-mono text-subtle">
        <span className="flex items-center gap-1 text-accent"><RiSparkling2Line size={11} /> Claude 3.5</span>
        <span>128 tkn</span>
      </div>
      <div className="flex items-center justify-between gap-1 rounded-6 bg-surface-secondary px-2 py-1 text-[10px] text-muted">
        <span className="truncate">Generate UI...</span>
        <span className="flex h-4 w-4 items-center justify-center rounded-3 bg-accent text-white">
          <RiArrowRightLine size={10} />
        </span>
      </div>
    </div>
  ),
  "components/currency-amount-input": () => (
    <div className="w-full max-w-[190px] rounded-10 border border-border bg-surface p-2 shadow-xs space-y-1 text-left">
      <div className="flex items-center justify-between text-[9px] text-subtle">
        <span>Amount</span>
        <span className="font-mono">$14,820 max</span>
      </div>
      <div className="flex items-center justify-between border-b border-separator pb-0.5">
        <span className="text-label-xs font-mono font-medium text-foreground">$ 2,450.00</span>
        <span className="rounded bg-surface-secondary px-1 py-0.2 text-[9px] font-medium text-muted">USD</span>
      </div>
      <div className="flex gap-1 pt-0.5">
        {["25%", "50%", "MAX"].map((p) => (
          <span key={p} className="flex-1 text-center rounded bg-surface-secondary py-0.5 text-[8px] font-mono text-muted">
            {p}
          </span>
        ))}
      </div>
    </div>
  ),
  "components/crypto-address-chip": () => (
    <div className="w-full max-w-[190px] space-y-1 text-left">
      <div className="flex items-center justify-between rounded-6 border border-border bg-surface px-2 py-1 text-[10px] shadow-xs">
        <span className="flex items-center gap-1 text-foreground font-mono">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />0x71C...8C41
        </span>
        <span className="text-[9px] font-mono text-subtle">ETH</span>
      </div>
      <div className="flex items-center justify-between rounded-6 border border-border bg-surface px-2 py-1 text-[10px] shadow-xs">
        <span className="flex items-center gap-1 text-foreground font-mono">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />0x34a...B2e9
        </span>
        <span className="text-[9px] font-mono text-subtle">BASE</span>
      </div>
    </div>
  ),
  "components/voice-visualizer": () => (
    <div className="w-full max-w-[190px] rounded-10 border border-border bg-surface p-2 shadow-xs text-left">
      <div className="flex items-center justify-between mb-1.5">
        <span className="flex items-center gap-1 text-[9px] font-mono text-danger">
          <span className="h-1.5 w-1.5 rounded-full bg-danger animate-pulse-soft" />00:24
        </span>
        <span className="text-[9px] font-mono text-subtle">Live Audio</span>
      </div>
      <div className="flex items-center justify-center gap-1 h-5">
        {[10, 16, 8, 20, 14, 18, 10, 16, 12, 20, 10, 14].map((h, i) => (
          <span key={i} className="w-1 rounded-full bg-accent" style={{ height: `${h}px` }} />
        ))}
      </div>
    </div>
  ),
  "components/activity-feed": () => (
    <div className="w-full max-w-[190px] rounded-10 border border-border bg-surface p-2 shadow-xs space-y-1 text-left">
      <div className="flex items-center gap-1.5">
        <span className="h-4 w-4 shrink-0 rounded-full bg-success/15 text-success flex items-center justify-center">
          <RiRocketLine size={10} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[9px] font-medium text-foreground">Sophia deployed v3.4</p>
          <p className="text-[8px] text-subtle">2m ago</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 border-t border-separator pt-1">
        <span className="h-4 w-4 shrink-0 rounded-full bg-accent/15 text-accent flex items-center justify-center">
          <RiEditLine size={10} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[9px] font-medium text-foreground">James edited Guide</p>
          <p className="text-[8px] text-subtle">26m ago</p>
        </div>
      </div>
    </div>
  ),
  "components/command-menu": () => (
    <div className="w-full max-w-[190px] rounded-10 border border-border bg-surface overflow-hidden shadow-xs text-left">
      <div className="flex items-center gap-1 border-b border-separator bg-surface-secondary px-2 py-1 text-[9px] text-muted">
        <RiSearchLine size={11} />
        <span className="flex-1 truncate">Type command...</span>
        <Kbd className="text-[8px] py-0 px-1">⌘K</Kbd>
      </div>
      <div className="p-1 space-y-0.5">
        <div className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[9px] bg-accent-soft text-accent-soft-foreground font-medium">
          <RiRocketLine size={10} />
          <span>New project</span>
        </div>
        <div className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[9px] text-muted">
          <RiTeamLine size={10} />
          <span>Invite team</span>
        </div>
      </div>
    </div>
  ),
  "components/notification-feed": () => (
    <div className="w-full max-w-[190px] rounded-10 border border-border bg-surface p-2 shadow-xs space-y-1 text-left">
      <div className="flex items-center justify-between border-b border-separator pb-1">
        <span className="text-[9px] font-medium text-foreground">Feed</span>
        <span className="h-3.5 px-1 rounded-full bg-danger text-[8px] font-mono text-white flex items-center justify-center">2</span>
      </div>
      <div className="space-y-0.5 text-[9px]">
        <div className="flex items-center justify-between">
          <span className="truncate text-foreground font-medium">Sophia deployed v3.4</span>
          <span className="text-subtle text-[8px]">2m</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="truncate text-muted">Build succeeded</span>
          <span className="text-subtle text-[8px]">14m</span>
        </div>
      </div>
    </div>
  ),
  "components/file-uploader": () => (
    <div className="w-full max-w-[190px] rounded-10 border border-dashed border-border bg-surface p-2 text-center space-y-1">
      <div className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-accent/15 text-accent">
        <RiInboxLine size={12} />
      </div>
      <p className="text-[9px] font-medium text-foreground">Drop files or <span className="text-accent underline">browse</span></p>
      <div className="rounded bg-surface-secondary px-1.5 py-0.5 text-[8px] font-mono text-subtle flex items-center justify-between">
        <span className="truncate">brand.pdf</span>
        <span className="text-success font-medium">100%</span>
      </div>
    </div>
  ),
  "components/filters": () => (
    <div className="w-full max-w-[180px] rounded-8 bg-surface p-1.5 shadow-xs ring-1 ring-border text-left">
      <p className="px-1 text-[9px] font-mono uppercase text-subtle mb-1">Status</p>
      {["Draft", "Published", "Archived"].map((l, i) => (
        <div key={l} className="flex items-center gap-1.5 rounded px-1.5 py-0.5 text-[10px]">
          <span className={cn("flex h-3 w-3 items-center justify-center rounded-2", i === 1 ? "bg-accent text-white" : "ring-1 ring-border-strong")}>
            {i === 1 && <RiCheckLine size={9} />}
          </span>
          <span className={i === 1 ? "font-medium text-foreground" : "text-muted"}>{l}</span>
        </div>
      ))}
    </div>
  ),
  "components/time-picker": () => (
    <div className="flex w-full max-w-[170px] items-center gap-1 overflow-hidden rounded-8 bg-surface-secondary ring-1 ring-border text-[11px] tabular-nums">
      <span className="flex-1 py-1 text-center font-mono text-foreground font-medium">08:30 AM</span>
      <span className="flex flex-col bg-surface px-1">
        <RiArrowUpSLine size={10} className="text-subtle" />
        <RiArrowDownSLine size={10} className="text-subtle" />
      </span>
    </div>
  ),
  "components/calendar": () => (
    <div className="grid w-full max-w-[180px] grid-cols-7 gap-0.5 rounded-8 bg-surface p-1.5 ring-1 ring-border text-center">
      {Array.from({ length: 14 }).map((_, i) => (
        <span key={i} className={cn("flex h-4 w-4 items-center justify-center rounded text-[9px] font-mono", i === 8 ? "bg-accent text-white font-medium" : "text-muted")}>
          {i + 1}
        </span>
      ))}
    </div>
  ),
};
