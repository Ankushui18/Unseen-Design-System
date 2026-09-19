import { useState } from "react";
import { PageHeader, Showcase } from "../docs/Blocks";
import { useCopy } from "../lib/hooks";
import { Button } from "../ui/Button";
import { Avatar, AvatarGroupCompact, Card, Chip, FeaturedIcon, Progress } from "../ui/Display";
import { Input, Select, Slider } from "../ui/Form";
import { CompactButton, LinkButton, StatusBadge, Tag } from "../ui/Extra";
import { Modal, useToast } from "../ui/Overlay";
import {
  ActivityItem,
  DataTable,
  FilterBar,
  FilterChip,
  SearchBar,
  SettingsSection,
  SettingsToggle,
  type DataTableColumn,
} from "../ui/ProductPatterns";
import { PaymentCard } from "../ui/Patterns";
import { WidgetBox } from "../ui/More";
import { PricingBlock } from "../blocks";
import { SiteFooter } from "../docs/Shell";
import { cn } from "../utils/cn";
import {
  RiAddLine,
  RiArrowRightLine,
  RiArrowUpLine,
  RiAttachment2,
  RiBankCardLine,
  RiCheckLine,
  RiCheckboxCircleLine,
  RiCloseLine,
  RiDashboardLine,
  RiDownloadLine,
  RiEyeLine,
  RiFileCopyLine,
  RiFolderLine,
  RiHomeLine,
  RiLifebuoyLine,
  RiLineChartLine,
  RiLogoutBoxRLine,
  RiMailLine,
  RiMenuLine,
  RiMicLine,
  RiMoreLine,
  RiPieChartLine,
  RiRocketLine,
  RiSearchLine,
  RiSendPlane2Fill,
  RiSendPlaneLine,
  RiSettingsLine,
  RiSparkling2Line,
  RiTeamLine,
  RiUserAddLine,
} from "@remixicon/react";

/* ========================================================================== */
/*           1. ANALYTICS DASHBOARD (UNTITLED UI SIDEBAR LAYOUT)              */
/* ========================================================================== */

interface TransactionRow {
  id: string;
  customer: string;
  email: string;
  plan: "Enterprise" | "Scale" | "Growth" | "Starter";
  channel: "Direct" | "Organic" | "Partner";
  amount: string;
  status: "completed" | "pending" | "failed";
  time: string;
}

const TRANSACTIONS: TransactionRow[] = [
  { id: "tx-1", customer: "Northwind Traders", email: "billing@northwind.io", plan: "Enterprise", channel: "Direct", amount: "$8,400.00", status: "completed", time: "2m ago" },
  { id: "tx-2", customer: "Halcyon AI Labs", email: "finance@halcyon.dev", plan: "Scale", channel: "Organic", amount: "$3,850.00", status: "completed", time: "14m ago" },
  { id: "tx-3", customer: "Ridgeline Studio", email: "accounts@ridgeline.design", plan: "Growth", channel: "Partner", amount: "$1,960.00", status: "completed", time: "42m ago" },
  { id: "tx-4", customer: "Aurora Cloud Engine", email: "ops@aurora.cloud", plan: "Enterprise", channel: "Direct", amount: "$12,500.00", status: "pending", time: "1h ago" },
  { id: "tx-5", customer: "Polaris Quantum", email: "team@polaris.app", plan: "Scale", channel: "Organic", amount: "$4,640.00", status: "completed", time: "3h ago" },
  { id: "tx-6", customer: "Vanguard Synthetics", email: "treasury@vanguard.tech", plan: "Scale", channel: "Direct", amount: "$5,200.00", status: "completed", time: "4h ago" },
  { id: "tx-7", customer: "Horizon Interactive", email: "payments@horizon.co", plan: "Growth", channel: "Partner", amount: "$2,100.00", status: "completed", time: "6h ago" },
  { id: "tx-8", customer: "Kite Mobile Health", email: "dev@kitemobile.io", plan: "Starter", channel: "Organic", amount: "$790.00", status: "pending", time: "8h ago" },
];

export function AnalyticsDashboardTemplate() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeframe, setTimeframe] = useState<"12M" | "30D" | "7D" | "24H">("30D");
  const [metricMode, setMetricMode] = useState<"revenue" | "mrr">("revenue");
  const [channelFilter, setChannelFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const { push } = useToast();

  const filteredTx = TRANSACTIONS.filter((t) => {
    if (channelFilter === "direct" && t.channel !== "Direct") return false;
    if (channelFilter === "organic" && t.channel !== "Organic") return false;
    if (channelFilter === "partner" && t.channel !== "Partner") return false;
    if (searchQuery.trim() && !`${t.customer} ${t.email} ${t.plan}`.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const columns: DataTableColumn<TransactionRow>[] = [
    {
      key: "customer",
      header: "Customer",
      sortable: true,
      sortKey: (r) => r.customer,
      render: (r) => (
        <div className="flex items-center gap-2.5">
          <Avatar name={r.customer} size="sm" tone="accent" square />
          <div className="min-w-0">
            <p className="text-label-sm font-medium text-foreground truncate">{r.customer}</p>
            <p className="text-paragraph-xs text-subtle truncate">{r.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "plan",
      header: "Plan",
      render: (r) => (
        <Chip size="sm" variant="soft" tone={r.plan === "Enterprise" ? "accent" : r.plan === "Scale" ? "success" : "default"}>
          {r.plan}
        </Chip>
      ),
    },
    {
      key: "channel",
      header: "Channel",
      render: (r) => (
        <Tag variant={r.channel === "Direct" ? "gray" : "stroke"}>
          {r.channel}
        </Tag>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      alignNumeric: true,
      sortable: true,
      sortKey: (r) => parseFloat(r.amount.replace(/[^0-9.]/g, "")),
      render: (r) => <span className="font-medium text-label-sm tabular-nums text-foreground">{r.amount}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (r) => (
        <StatusBadge status={r.status} size="sm">
          {r.status === "completed" ? "Settled" : r.status === "pending" ? "In Escrow" : "Failed"}
        </StatusBadge>
      ),
    },
    {
      key: "time",
      header: "Settled",
      render: (r) => <span className="text-paragraph-xs text-muted tabular-nums">{r.time}</span>,
    },
    {
      key: "actions",
      header: "",
      render: (r) => (
        <div className="flex items-center justify-end gap-1">
          <CompactButton variant="ghost" aria-label={`View receipt for ${r.customer}`} onClick={() => push({ title: "Invoice Opened", description: `Viewing invoice for ${r.customer} (${r.amount}).`, tone: "accent" })}>
            <RiEyeLine size={14} />
          </CompactButton>
          <CompactButton variant="ghost" aria-label="More options" onClick={() => push({ title: "Quick Actions", description: `Transaction ID: ${r.id}`, tone: "default" })}>
            <RiMoreLine size={14} />
          </CompactButton>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full rounded-20 bg-surface ring-1 ring-border shadow-md overflow-hidden text-left">
      {/* App Workspace Shell: Sidebar + Main Content Layout */}
      <div className="flex flex-col lg:flex-row min-h-[780px]">
        {/* Mobile/Tablet Header with Hamburger toggle */}
        <div className="flex lg:hidden items-center justify-between border-b border-separator bg-surface-secondary/70 p-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-8 bg-accent text-accent-foreground font-medium text-label-xs shadow-xs">
              AC
            </div>
            <div className="min-w-0">
              <h4 className="text-label-sm font-medium text-foreground truncate">Acme Systems</h4>
              <p className="text-[10px] text-muted truncate">Executive Overview</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Chip size="sm" tone="success" variant="soft" dot>Online</Chip>
            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-8 w-8 items-center justify-center rounded-8 border border-border bg-surface text-muted hover:text-foreground"
            >
              {mobileMenuOpen ? <RiCloseLine size={16} /> : <RiMenuLine size={16} />}
            </button>
          </div>
        </div>

        {/* Left Vertical Sidebar (Desktop Pinned / Mobile Collapsible) */}
        <aside
          className={cn(
            "w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-separator bg-surface-secondary/50 p-4 flex-col justify-between shrink-0",
            mobileMenuOpen ? "flex" : "hidden lg:flex"
          )}
        >
          <div className="space-y-5">
            {/* Workspace Identifier */}
            <div className="hidden lg:flex items-center justify-between pb-3 border-b border-separator">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-10 bg-accent text-accent-foreground font-medium shadow-xs">
                  AC
                </div>
                <div className="min-w-0">
                  <h4 className="text-label-sm font-medium text-foreground truncate">Acme Systems</h4>
                  <p className="text-[11px] text-muted truncate">Enterprise Team</p>
                </div>
              </div>
              <Chip size="sm" tone="success" variant="soft" dot>Online</Chip>
            </div>

            {/* Quick Search */}
            <div className="relative">
              <RiSearchLine size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-subtle" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-8 border border-border bg-surface py-1.5 pl-8 pr-3 text-paragraph-xs text-foreground placeholder:text-subtle focus:border-accent focus:outline-none"
              />
            </div>

            {/* Main Navigation List */}
            <nav className="space-y-1" aria-label="Dashboard Nav">
              {[
                { id: "home", label: "Home", icon: <RiHomeLine size={16} /> },
                { id: "dashboard", label: "Dashboard", icon: <RiDashboardLine size={16} />, badge: "Active" },
                { id: "projects", label: "Projects", icon: <RiFolderLine size={16} />, count: 8 },
                { id: "tasks", label: "Tasks", icon: <RiCheckboxCircleLine size={16} />, count: 14 },
                { id: "reporting", label: "Reporting", icon: <RiPieChartLine size={16} /> },
                { id: "users", label: "Users", icon: <RiTeamLine size={16} /> },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveNav(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-8 px-3 py-2 text-label-xs font-medium transition-all",
                    activeNav === item.id
                      ? "bg-accent-soft text-accent-soft-foreground shadow-xs"
                      : "text-muted hover:bg-surface-hover hover:text-foreground"
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    {item.icon} {item.label}
                  </span>
                  {item.badge && <Chip size="sm" tone="accent" variant="soft">{item.badge}</Chip>}
                  {item.count !== undefined && <span className="text-[11px] font-mono text-subtle">{item.count}</span>}
                </button>
              ))}
            </nav>
          </div>

          {/* Bottom Support & User Profile Widget */}
          <div className="space-y-4 pt-4 border-t border-separator mt-6">
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => push({ title: "Help Center", description: "Opening developer docs.", tone: "default" })}
                className="flex w-full items-center gap-2.5 rounded-8 px-3 py-1.5 text-label-xs text-muted hover:bg-surface-hover hover:text-foreground"
              >
                <RiLifebuoyLine size={15} /> Support
              </button>
              <button
                type="button"
                onClick={() => push({ title: "Settings", description: "Navigating to settings.", tone: "default" })}
                className="flex w-full items-center gap-2.5 rounded-8 px-3 py-1.5 text-label-xs text-muted hover:bg-surface-hover hover:text-foreground"
              >
                <RiSettingsLine size={15} /> Settings
              </button>
            </div>

            {/* Storage Quota Card */}
            <div className="rounded-10 bg-surface p-3 ring-1 ring-border shadow-xs space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-medium text-foreground">Cloud Storage</span>
                <span className="text-subtle tabular-nums">16.4 / 20 GB</span>
              </div>
              <Progress value={82} size="sm" tone="accent" />
            </div>

            {/* User Profile Strip */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2.5">
                <Avatar name="Olivia Rhye" size="sm" tone="accent" />
                <div className="min-w-0">
                  <p className="text-label-xs font-medium text-foreground truncate">Olivia Rhye</p>
                  <p className="text-[10px] text-subtle truncate">olivia@acme.io</p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Log out"
                onClick={() => push({ title: "Logged Out", tone: "default" })}
                className="flex h-7 w-7 items-center justify-center rounded-md text-subtle hover:text-danger hover:bg-danger-soft"
              >
                <RiLogoutBoxRLine size={15} />
              </button>
            </div>
          </div>
        </aside>

        {/* Right Main Dashboard Workspace */}
        <div className="flex-1 p-5 sm:p-8 space-y-6 min-w-0 bg-surface">
          {/* Top Welcome Header & Actions */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-separator pb-6">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-medium text-subtle mb-1">
                <span>Dashboard</span>
                <span>/</span>
                <span className="text-accent">Executive Overview</span>
              </div>
              <h2 className="text-title-h3 font-medium text-foreground">Welcome back, Olivia 👋</h2>
              <p className="text-paragraph-xs text-muted mt-0.5">Track, manage and forecast your customer growth and order volume in real time.</p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex rounded-10 bg-surface-secondary p-1 ring-1 ring-border shadow-2xs">
                {(["24H", "7D", "30D", "12M"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTimeframe(t)}
                    className={cn(
                      "rounded-7 px-3 py-1 text-paragraph-xs font-medium transition-all",
                      timeframe === t ? "bg-surface text-foreground shadow-xs" : "text-muted hover:text-foreground"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <Button size="sm" variant="outline" tone="default" startContent={<RiDownloadLine size={14} />} onClick={() => push({ title: "Export Scheduled", description: "Full report queued for CSV export.", tone: "default" })}>
                Export
              </Button>
              <Button size="sm" tone="accent" startContent={<RiAddLine size={14} />} onClick={() => push({ title: "Add Metric", description: "Opening widget customizer drawer.", tone: "accent" })}>
                Add Metric
              </Button>
            </div>
          </div>

          {/* 3 High-Impact Metric Cards with SVG Sparkline Waves */}
          <div className="grid gap-4 sm:grid-cols-3">
            {/* Metric 1 */}
            <Card elevation={2} className="border-glow p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-label-xs font-medium text-muted">Total Customers</span>
                <FeaturedIcon icon={<RiTeamLine size={16} />} size="xs" tone="accent" />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-title-h3 font-medium tabular-nums text-foreground">2,420</span>
                <span className="inline-flex items-center gap-0.5 rounded-full bg-success-soft px-1.5 py-0.5 text-paragraph-xs font-medium text-success-soft-foreground">
                  <RiArrowUpLine size={12} /> +20%
                </span>
              </div>
              <div className="h-8 w-full">
                <svg viewBox="0 0 100 24" className="h-full w-full overflow-visible" preserveAspectRatio="none">
                  <path d="M0,20 Q25,18 50,10 T100,2" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-[11px] text-subtle">vs. 2,016 last month</p>
            </Card>

            {/* Metric 2 */}
            <Card elevation={2} className="border-glow p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-label-xs font-medium text-muted">Monthly Recurring Revenue</span>
                <FeaturedIcon icon={<RiBankCardLine size={16} />} size="xs" tone="success" />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-title-h3 font-medium tabular-nums text-foreground">$148,290</span>
                <span className="inline-flex items-center gap-0.5 rounded-full bg-success-soft px-1.5 py-0.5 text-paragraph-xs font-medium text-success-soft-foreground">
                  <RiArrowUpLine size={12} /> +18.4%
                </span>
              </div>
              <div className="h-8 w-full">
                <svg viewBox="0 0 100 24" className="h-full w-full overflow-visible" preserveAspectRatio="none">
                  <path d="M0,22 Q30,16 60,12 T100,4" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-[11px] text-subtle">+$14.2k expansion ARR</p>
            </Card>

            {/* Metric 3 */}
            <Card elevation={2} className="border-glow p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-label-xs font-medium text-muted">Active Sessions Now</span>
                <FeaturedIcon icon={<RiSparkling2Line size={16} />} size="xs" tone="warning" />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-title-h3 font-medium tabular-nums text-foreground">316</span>
                <span className="inline-flex items-center gap-0.5 rounded-full bg-success-soft px-1.5 py-0.5 text-paragraph-xs font-medium text-success-soft-foreground">
                  <RiArrowUpLine size={12} /> +8.2%
                </span>
              </div>
              <div className="h-8 w-full">
                <svg viewBox="0 0 100 24" className="h-full w-full overflow-visible" preserveAspectRatio="none">
                  <path d="M0,18 Q35,22 70,8 T100,2" fill="none" stroke="var(--warning)" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-[11px] text-subtle">Across 14 global edge clusters</p>
            </Card>
          </div>

          {/* Main Interactive Chart Box */}
          <Card elevation={2} className="p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-separator pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <FeaturedIcon icon={<RiLineChartLine size={16} />} size="xs" tone="accent" />
                  <h3 className="text-label-md font-medium text-foreground">Performance & Growth Trajectory</h3>
                </div>
                <p className="text-paragraph-xs text-muted mt-0.5">Monthly revenue volume compared against forecast cohort model.</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMetricMode("revenue")}
                  className={cn(
                    "rounded-6 px-2.5 py-1 text-paragraph-xs font-medium transition",
                    metricMode === "revenue" ? "bg-accent-soft text-accent-soft-foreground font-medium" : "text-muted hover:text-foreground"
                  )}
                >
                  Gross Billing
                </button>
                <button
                  type="button"
                  onClick={() => setMetricMode("mrr")}
                  className={cn(
                    "rounded-6 px-2.5 py-1 text-paragraph-xs font-medium transition",
                    metricMode === "mrr" ? "bg-accent-soft text-accent-soft-foreground font-medium" : "text-muted hover:text-foreground"
                  )}
                >
                  Net ARR
                </button>
              </div>
            </div>

            {/* SVG Area Chart */}
            <div className="relative h-60 w-full">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
                <div className="border-b border-separator border-dashed w-full" />
                <div className="border-b border-separator border-dashed w-full" />
                <div className="border-b border-separator border-dashed w-full" />
                <div className="border-b border-separator border-dashed w-full" />
              </div>

              <svg viewBox="0 0 600 200" className="h-full w-full overflow-visible" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="dashAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="dashSecGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--success)" stopOpacity="0.16" />
                    <stop offset="100%" stopColor="var(--success)" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                <path
                  d="M0,160 C80,150 160,135 240,120 C320,110 400,90 480,75 C540,65 580,55 600,48 L600,200 L0,200 Z"
                  fill="url(#dashSecGrad)"
                />
                <path
                  d="M0,160 C80,150 160,135 240,120 C320,110 400,90 480,75 C540,65 580,55 600,48"
                  fill="none"
                  stroke="var(--success)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />

                <path
                  d="M0,140 C80,125 160,105 240,88 C320,75 400,50 480,38 C540,24 580,15 600,8 L600,200 L0,200 Z"
                  fill="url(#dashAreaGrad)"
                />
                <path
                  d="M0,140 C80,125 160,105 240,88 C320,75 400,50 480,38 C540,24 580,15 600,8"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {[
                  { x: 0, y: 140 }, { x: 80, y: 125 }, { x: 160, y: 105 }, { x: 240, y: 88 },
                  { x: 320, y: 75 }, { x: 400, y: 50 }, { x: 480, y: 38 }, { x: 600, y: 8 }
                ].map((p, i) => (
                  <circle key={i} cx={p.x} cy={p.y} r={i === 7 ? 5 : 3.5} fill="var(--surface)" stroke="var(--accent)" strokeWidth="2.5" />
                ))}
              </svg>

              <div className="mt-2 flex justify-between text-[11px] font-medium text-subtle">
                <span>Jan</span>
                <span>Mar</span>
                <span>May</span>
                <span>Jul</span>
                <span>Sep</span>
                <span>Nov</span>
                <span>Dec (Projected)</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-separator pt-3 text-paragraph-xs text-muted">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-accent" /> Active ($148.2k)</span>
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-success opacity-80" /> Baseline ($124k)</span>
              </div>
              <span className="text-subtle font-medium">99.2% Pipeline Accuracy</span>
            </div>
          </Card>

          {/* Customer Transaction Ledger Table */}
          <Card elevation={2} className="overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-separator p-5">
              <div>
                <h3 className="text-label-md font-medium text-foreground">Recent Customer Orders</h3>
                <p className="text-paragraph-xs text-muted">Live settlements and subscription renewals.</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex rounded-8 bg-surface-secondary p-1 ring-1 ring-border">
                  {(["all", "direct", "organic", "partner"] as const).map((ch) => (
                    <button
                      key={ch}
                      type="button"
                      onClick={() => setChannelFilter(ch)}
                      className={cn(
                        "rounded-6 px-2.5 py-1 text-paragraph-xs capitalize transition",
                        channelFilter === ch ? "bg-surface text-foreground font-medium shadow-xs" : "text-muted hover:text-foreground"
                      )}
                    >
                      {ch}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-2">
              <DataTable
                columns={columns}
                rows={filteredTx}
                rowKey={(r) => r.id}
                selectable
                pagination={{ page, totalPages: 4, onPageChange: setPage }}
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/*           2. SETTINGS SCREEN (UNTITLED UI SETTINGS 01 STYLE)               */
/* ========================================================================== */

export function SettingsScreenTemplate() {
  const [activeTab, setActiveTab] = useState("profile");
  const [firstName, setFirstName] = useState("Olivia");
  const [lastName, setLastName] = useState("Rhye");
  const [email, setEmail] = useState("olivia@untitledui.com");
  const [username, setUsername] = useState("olivia");
  const [bio, setBio] = useState("Product Designer and Design Systems Architect at Acme.");
  const [country, setCountry] = useState("United States");
  const [timezone, setTimezone] = useState("PST (UTC-8)");
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [sessionInactivity, setSessionInactivity] = useState(30);
  const { push } = useToast();

  const handleSave = () => {
    push({ title: "Settings Saved", description: "Your profile preferences were updated successfully.", tone: "accent" });
  };

  const navTabs = [
    { id: "my-details", label: "My details" },
    { id: "profile", label: "Profile" },
    { id: "password", label: "Password" },
    { id: "team", label: "Team" },
    { id: "plan", label: "Plan" },
    { id: "billing", label: "Billing" },
    { id: "notifications", label: "Notifications" },
    { id: "integrations", label: "Integrations" },
    { id: "api", label: "API" },
  ];

  return (
    <div className="w-full space-y-6 text-left">
      {/* Top Header with Breadcrumb */}
      <div>
        <span className="text-subheading-xs text-accent font-medium uppercase tracking-wider">// Account Preferences</span>
        <h2 className="text-title-h3 font-medium text-foreground sm:text-title-h2">Settings</h2>
        <p className="mt-1 text-paragraph-sm text-muted">Manage your team profile and account preferences here.</p>
      </div>

      {/* Horizontal sub-navigation tabs (settings anatomy) */}
      <div className="flex gap-1 overflow-x-auto border-b border-separator pb-px no-scrollbar">
        {navTabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActiveTab(t.id)}
            className={cn(
              "px-3.5 py-2 text-paragraph-xs font-medium border-b-2 whitespace-nowrap transition-colors",
              activeTab === t.id
                ? "border-accent text-accent font-medium"
                : "border-transparent text-muted hover:text-foreground"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Personal Info Section */}
      <Card elevation={2} className="p-6 space-y-6">
        <div className="border-b border-separator pb-4">
          <h2 className="text-label-md font-medium text-foreground">Personal Info</h2>
          <p className="text-paragraph-xs text-muted">Update your photo and personal details here.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Input
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            startContent={<RiMailLine size={15} />}
          />
          <Input
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            prefixAffix="app.io/"
          />
        </div>

        {/* Photo Upload Zone */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 border-t border-separator pt-5">
          <Avatar name={`${firstName} ${lastName}`} size="lg" tone="accent" />
          <div className="flex-1 rounded-12 border-2 border-dashed border-border bg-surface-secondary/40 p-5 text-center">
            <FeaturedIcon icon={<RiUserAddLine size={18} />} size="xs" tone="accent" className="mx-auto" />
            <p className="mt-2 text-paragraph-xs text-foreground font-medium">
              <span className="text-accent cursor-pointer hover:underline">Click to upload</span> or drag and drop
            </p>
            <p className="text-[11px] text-subtle mt-0.5">SVG, PNG, JPG or GIF (max. 800×400px)</p>
          </div>
        </div>

        {/* Bio Textarea */}
        <div className="space-y-1.5 border-t border-separator pt-5">
          <label htmlFor="settings-bio" className="text-label-xs font-medium text-foreground">Bio Description</label>
          <textarea
            id="settings-bio"
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            aria-describedby="settings-bio-hint"
            className="w-full rounded-10 border border-border bg-field p-3 text-paragraph-sm text-foreground focus:border-accent focus:outline-none"
          />
          <span id="settings-bio-hint" className="text-[11px] text-subtle">275 characters left</span>
        </div>

        {/* Country & Timezone */}
        <div className="grid gap-6 md:grid-cols-2 border-t border-separator pt-5">
          <Select
            label="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            items={[
              { value: "United States", label: "United States" },
              { value: "United Kingdom", label: "United Kingdom" },
              { value: "Germany", label: "Germany" },
              { value: "Japan", label: "Japan" },
            ]}
          />
          <Select
            label="Timezone"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            items={[
              { value: "PST (UTC-8)", label: "Pacific Standard Time (PST)" },
              { value: "EST (UTC-5)", label: "Eastern Standard Time (EST)" },
              { value: "GMT (UTC+0)", label: "Greenwich Mean Time (GMT)" },
              { value: "CET (UTC+1)", label: "Central European Time (CET)" },
            ]}
          />
        </div>

        {/* Preferences Section */}
        <SettingsSection
          title="Notification Preferences"
          description="Manage how and when you receive product alerts."
        >
          <div className="space-y-4">
            <SettingsToggle
              label="Weekly Performance Digest"
              description="Get a high-level summary of workspace metrics every Monday morning."
              checked={weeklyDigest}
              onChange={setWeeklyDigest}
            />
            <SettingsToggle
              label="Real-time Push Notifications"
              description="Receive browser alerts on member invites and payment receipts."
              checked={pushNotifications}
              onChange={setPushNotifications}
            />
          </div>
        </SettingsSection>

        {/* Session Inactivity Slider */}
        <div className="border-t border-separator pt-5 space-y-3">
          <Slider
            label="Session Inactivity Timeout"
            value={sessionInactivity}
            min={5}
            max={120}
            step={5}
            formatValue={(v) => `${v} minutes`}
            onChange={setSessionInactivity}
          />
          <p className="text-paragraph-xs text-muted">Automatically lock session when inactive to ensure enterprise compliance.</p>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-end gap-3 border-t border-separator pt-5">
          <Button variant="outline" tone="default" size="sm" onClick={() => push({ title: "Changes Discarded", tone: "default" })}>
            Cancel
          </Button>
          <Button size="sm" tone="accent" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </Card>
    </div>
  );
}

/* ========================================================================== */
/*           3. BILLING PAGE (UNTITLED UI BILLING 01 STYLE)                   */
/* ========================================================================== */

interface InvoiceRow {
  id: string;
  date: string;
  amount: string;
  status: "completed" | "pending";
  plan: string;
}

const INVOICES: InvoiceRow[] = [
  { id: "INV-2026-009", date: "Sep 1, 2026", amount: "$190.00", status: "completed", plan: "Pro (10 seats)" },
  { id: "INV-2026-008", date: "Aug 1, 2026", amount: "$190.00", status: "completed", plan: "Pro (10 seats)" },
  { id: "INV-2026-007", date: "Jul 1, 2026", amount: "$190.00", status: "completed", plan: "Pro (10 seats)" },
  { id: "INV-2026-006", date: "Jun 1, 2026", amount: "$152.00", status: "completed", plan: "Pro (8 seats)" },
];

export function BillingPageTemplate() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const { push } = useToast();

  const invoiceCols: DataTableColumn<InvoiceRow>[] = [
    {
      key: "id",
      header: "Invoice",
      render: (i) => <span className="font-mono text-label-xs text-foreground">{i.id}</span>,
    },
    {
      key: "date",
      header: "Billing Date",
      render: (i) => <span className="text-paragraph-sm text-muted">{i.date}</span>,
    },
    {
      key: "plan",
      header: "Description",
      render: (i) => <span className="text-paragraph-sm text-foreground">{i.plan}</span>,
    },
    {
      key: "amount",
      header: "Amount",
      alignNumeric: true,
      render: (i) => <span className="font-medium text-label-sm tabular-nums text-foreground">{i.amount}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (i) => <StatusBadge status={i.status} size="sm">Paid</StatusBadge>,
    },
    {
      key: "download",
      header: "",
      render: (i) => (
        <Button
          size="xs"
          variant="outline"
          tone="default"
          startContent={<RiDownloadLine size={12} />}
          onClick={() => push({ title: `Receipt ${i.id}`, description: "Downloading PDF invoice statement.", tone: "accent" })}
        >
          PDF
        </Button>
      ),
    },
  ];

  return (
    <div className="w-full space-y-6 text-left">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-subheading-xs text-accent font-medium uppercase tracking-wider">// Subscription & Invoices</span>
          <h2 className="text-title-h3 font-medium text-foreground sm:text-title-h2">Billing & Plans</h2>
          <p className="mt-1 text-paragraph-sm text-muted">Manage your billing details, seats, and subscription invoices.</p>
        </div>

        <Button size="sm" variant="outline" tone="default" startContent={<RiDownloadLine size={14} />} onClick={() => push({ title: "Tax Statement", description: "Downloading 2026 tax report.", tone: "default" })}>
          Download All
        </Button>
      </div>

      {/* Active Subscription Overview Card */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card elevation={2} className="p-6 border-glow flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FeaturedIcon icon={<RiRocketLine size={18} />} tone="accent" size="sm" />
                <span className="text-label-md text-foreground font-medium">Active Plan: Pro Tier</span>
              </div>
              <Chip size="sm" tone="success" variant="soft" dot>Active</Chip>
            </div>
            <div className="mt-4 flex items-baseline gap-1.5">
              <span className="text-title-h2 tabular-nums text-foreground">$19</span>
              <span className="text-paragraph-xs text-subtle">/ seat / month · Billed annually</span>
            </div>
            <div className="mt-4 space-y-1.5">
              <div className="flex justify-between text-paragraph-xs text-muted">
                <span>Seats utilized</span>
                <span className="font-medium text-foreground">8 of 10 seats</span>
              </div>
              <Progress value={80} size="sm" tone="accent" />
            </div>
          </div>

          <div className="flex gap-2.5 pt-2">
            <Button size="sm" fullWidth onClick={() => push({ title: "Seat Manager", description: "Opening seat allocation dialog.", tone: "accent" })}>
              Add Seats
            </Button>
            <Button size="sm" variant="outline" tone="default" fullWidth onClick={() => push({ title: "Upgrade Tier", description: "Opening tier options.", tone: "default" })}>
              Change Plan
            </Button>
          </div>
        </Card>

        <Card elevation={2} className="p-6 flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-label-md text-foreground font-medium">Default Payment Method</span>
              <Chip size="sm" tone="default" variant="outline">Default</Chip>
            </div>
            <div className="mt-4 flex justify-center">
              <PaymentCard
                brand="visa"
                last4="4242"
                holder="Olivia Rhye"
                expiry="08/29"
                variant="dark"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-separator text-paragraph-xs">
            <span className="text-muted">Billed via Stripe Payments</span>
            <LinkButton variant="primary" size="sm" onClick={() => push({ title: "Payment Portal", description: "Opening card updater.", tone: "accent" })}>
              Update card
            </LinkButton>
          </div>
        </Card>
      </div>

      {/* Pricing Upgrade Tiers */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-title-h5 text-foreground">Available Plans</h3>
          <div className="inline-flex rounded-10 bg-surface-secondary p-1 ring-1 ring-border">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={cn(
                "rounded-7 px-3 py-1 text-paragraph-xs font-medium transition-all",
                billingCycle === "monthly" ? "bg-surface text-foreground shadow-xs" : "text-muted hover:text-foreground"
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("annual")}
              className={cn(
                "rounded-7 px-3 py-1 text-paragraph-xs font-medium transition-all",
                billingCycle === "annual" ? "bg-surface text-foreground shadow-xs" : "text-muted hover:text-foreground"
              )}
            >
              Annual <span className="text-accent text-[10px] ml-1">Save 20%</span>
            </button>
          </div>
        </div>
        <PricingBlock />
      </div>

      {/* Invoice History Table */}
      <div className="space-y-4">
        <h3 className="text-title-h5 text-foreground">Invoice History</h3>
        <Card elevation={2} className="overflow-hidden">
          <DataTable columns={invoiceCols} rows={INVOICES} rowKey={(i) => i.id} />
        </Card>
      </div>
    </div>
  );
}

/* ========================================================================== */
/*           4. TEAM & PEOPLE (UNTITLED UI TEAM 01 STYLE)                     */
/* ========================================================================== */

interface TeamMemberRow {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Designer" | "Developer";
  status: "active" | "invited" | "paused";
  twoFactor: boolean;
  lastActive: string;
}

const TEAM_MEMBERS: TeamMemberRow[] = [
  { id: "m-1", name: "Sophia Williams", email: "sophia@studio.design", role: "Owner", status: "active", twoFactor: true, lastActive: "Just now" },
  { id: "m-2", name: "James Brown", email: "james@studio.design", role: "Admin", status: "active", twoFactor: true, lastActive: "12m ago" },
  { id: "m-3", name: "Lena Müller", email: "lena@studio.design", role: "Designer", status: "active", twoFactor: true, lastActive: "1h ago" },
  { id: "m-4", name: "Arthur Taylor", email: "arthur@studio.design", role: "Developer", status: "active", twoFactor: false, lastActive: "3h ago" },
  { id: "m-5", name: "Emma Wright", email: "emma@studio.design", role: "Designer", status: "invited", twoFactor: false, lastActive: "Pending" },
  { id: "m-6", name: "Lucas Vance", email: "lucas@studio.design", role: "Developer", status: "paused", twoFactor: true, lastActive: "2d ago" },
];

export function TeamPeopleTemplate() {
  const [q, setQ] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [inviteModal, setInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Designer");
  const { push } = useToast();

  const filtered = TEAM_MEMBERS.filter((m) => {
    if (roleFilter !== "all" && m.role.toLowerCase() !== roleFilter.toLowerCase()) return false;
    if (q.trim() && !`${m.name} ${m.email}`.toLowerCase().includes(q.trim().toLowerCase())) return false;
    return true;
  });

  const memberCols: DataTableColumn<TeamMemberRow>[] = [
    {
      key: "name",
      header: "Member",
      sortable: true,
      sortKey: (m) => m.name,
      render: (m) => (
        <div className="flex items-center gap-3">
          <Avatar name={m.name} size="sm" tone={m.role === "Owner" ? "accent" : "default"} />
          <div className="min-w-0">
            <p className="text-label-sm font-medium text-foreground truncate">{m.name}</p>
            <p className="text-paragraph-xs text-subtle truncate">{m.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (m) => (
        <Tag variant={m.role === "Owner" ? "gray" : "stroke"}>
          {m.role}
        </Tag>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (m) => (
        <StatusBadge
          status={m.status === "active" ? "completed" : m.status === "invited" ? "pending" : "failed"}
          size="sm"
        >
          {m.status === "active" ? "Active" : m.status === "invited" ? "Invited" : "Suspended"}
        </StatusBadge>
      ),
    },
    {
      key: "twoFactor",
      header: "2FA",
      render: (m) => (
        <Chip size="sm" tone={m.twoFactor ? "success" : "default"} variant="soft">
          {m.twoFactor ? "Enabled" : "Off"}
        </Chip>
      ),
    },
    {
      key: "lastActive",
      header: "Last Active",
      render: (m) => <span className="text-paragraph-xs text-muted">{m.lastActive}</span>,
    },
    {
      key: "actions",
      header: "",
      render: (m) => (
        <CompactButton
          variant="ghost"
          aria-label={`Options for ${m.name}`}
          onClick={() => push({ title: `Managing ${m.name}`, description: "Opening member permission drawer.", tone: "accent" })}
        >
          <RiMoreLine size={14} />
        </CompactButton>
      ),
    },
  ];

  return (
    <div className="w-full space-y-6 text-left">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-subheading-xs text-accent font-medium uppercase tracking-wider">// Team & Access</span>
          <h2 className="text-title-h3 font-medium text-foreground sm:text-title-h2">Team Members</h2>
          <p className="mt-1 text-paragraph-sm text-muted">Manage your team members and their account permissions here.</p>
        </div>

        <div className="flex items-center gap-3">
          <AvatarGroupCompact
            items={TEAM_MEMBERS.map((m) => ({ name: m.name }))}
            max={4}
            size="sm"
          />
          <Button size="sm" tone="accent" startContent={<RiAddLine size={14} />} onClick={() => setInviteModal(true)}>
            Invite Teammate
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 items-start">
        <div className="lg:col-span-8 space-y-4">
          <FilterBar
            leading={<SearchBar value={q} onChange={setQ} placeholder="Filter teammates by name or email…" />}
          >
            {[
              { id: "all", label: "All", count: 6 },
              { id: "owner", label: "Owners", count: 1 },
              { id: "admin", label: "Admins", count: 1 },
              { id: "designer", label: "Designers", count: 2 },
              { id: "developer", label: "Developers", count: 2 },
            ].map((f) => (
              <FilterChip
                key={f.id}
                active={roleFilter === f.id}
                onClick={() => setRoleFilter(f.id)}
                count={f.count}
              >
                {f.label}
              </FilterChip>
            ))}
          </FilterBar>

          <Card elevation={2} className="overflow-hidden">
            <DataTable
              columns={memberCols}
              rows={filtered}
              rowKey={(m) => m.id}
              selectable
              bulkActions={[
                {
                  id: "resend",
                  label: "Resend Invites",
                  icon: <RiSendPlaneLine size={14} />,
                  onSelect: (rows) => push({ title: "Invitations resent", description: `Queued resend to ${rows.length} member(s).`, tone: "accent" }),
                },
                {
                  id: "remove",
                  label: "Remove",
                  tone: "danger",
                  onSelect: (rows) => push({ title: "Members removed", description: `Removed ${rows.length} member(s) from workspace.`, tone: "danger" }),
                },
              ]}
            />
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <WidgetBox
            icon={<RiTeamLine size={16} />}
            title="Recent Team Activity"
            action={<LinkButton variant="primary" size="sm" onClick={() => push({ title: "Full audit log", tone: "accent" })}>Audit log</LinkButton>}
          >
            <div className="divide-y divide-separator-secondary pt-1">
              <ActivityItem
                item={{
                  id: "a-1",
                  actor: { name: "Sophia Williams", tone: "accent" },
                  verb: "deployed",
                  target: "tokens v2.4",
                  time: "2m ago",
                  tone: "success",
                }}
              />
              <ActivityItem
                item={{
                  id: "a-2",
                  actor: { name: "James Brown" },
                  verb: "invited",
                  target: "emma@studio.design",
                  time: "18m ago",
                }}
              />
              <ActivityItem
                item={{
                  id: "a-3",
                  actor: { name: "Lena Müller", tone: "success" },
                  verb: "updated role for",
                  target: "Arthur Taylor",
                  time: "1h ago",
                }}
              />
              <ActivityItem
                item={{
                  id: "a-4",
                  actor: { name: "Security Audit" },
                  verb: "enforced",
                  target: "2FA policy",
                  time: "3h ago",
                  tone: "warning",
                }}
              />
            </div>
          </WidgetBox>

          <Card className="p-4 bg-surface-secondary/40 border-glow">
            <div className="flex items-center justify-between">
              <p className="text-label-sm text-foreground font-medium">Seat Allocation</p>
              <Chip size="sm" tone="accent" variant="soft">60% Occupied</Chip>
            </div>
            <p className="text-paragraph-xs text-muted mt-1">6 of 10 allocated team seats currently occupied.</p>
            <Progress value={60} size="sm" className="mt-3" tone="accent" />
          </Card>
        </div>
      </div>

      <Modal
        open={inviteModal}
        onClose={() => setInviteModal(false)}
        title="Invite a Teammate"
        description="Send an invitation to join this Unseen workspace."
        footer={
          <>
            <Button variant="outline" tone="default" onClick={() => setInviteModal(false)}>
              Cancel
            </Button>
            <Button
              disabled={!inviteEmail.includes("@")}
              onClick={() => {
                setInviteModal(false);
                push({ title: "Invitation sent", description: `Sent invite to ${inviteEmail} as ${inviteRole}.`, tone: "accent" });
                setInviteEmail("");
              }}
            >
              Send Invitation
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="colleague@company.com"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            startContent={<RiMailLine size={15} />}
          />
          <Select
            label="Access Role"
            value={inviteRole}
            onChange={(e) => setInviteRole(e.target.value)}
            items={[
              { value: "Admin", label: "Admin · Full control over settings and members" },
              { value: "Designer", label: "Designer · Edit tokens, components and block layouts" },
              { value: "Developer", label: "Developer · Inspect source and generate snippets" },
            ]}
          />
        </div>
      </Modal>
    </div>
  );
}

/* ========================================================================== */
/*                      SOURCE STRINGS FOR SHOWCASE CODE TABS                 */
/* ========================================================================== */

const ANALYTICS_CODE = `import { useState } from "react";
import { Card, Chip, Progress, DataTable, Button, Avatar, FeaturedIcon } from "./ui";

export function AnalyticsDashboard() {
  const [timeframe, setTimeframe] = useState("30D");

  return (
    <div className="w-full rounded-20 bg-surface ring-1 ring-border shadow-md overflow-hidden">
      {/* Sidebar + Canvas layout */}
      <div className="flex flex-col lg:flex-row min-h-[780px]">
        {/* Sidebar Nav */}
        <aside className="w-64 border-r border-separator bg-surface-secondary/50 p-4">
          {/* Nav Items */}
        </aside>

        {/* Main Dashboard Canvas */}
        <div className="flex-1 p-6 space-y-6">
          {/* KPI Metrics */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="p-5">
              <span className="text-label-xs text-muted">Total Customers</span>
              <h3 className="text-title-h3 font-medium">2,420</h3>
            </Card>
          </div>

          {/* Performance Chart & Transactions Table */}
        </main>
      </div>
    </div>
  );
}`;

const SETTINGS_CODE = `import { useState } from "react";
import { Card, Input, Select, Button, Avatar, FeaturedIcon } from "./ui";

export function SettingsScreen() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="space-y-6 text-left">
      <h2>Settings</h2>
      <div className="flex gap-1 border-b border-separator pb-px">
        <button className="border-b-2 border-accent text-accent">Profile</button>
      </div>
      <Card className="p-6 space-y-6">
        <Input label="First Name" defaultValue="Olivia" />
        <Input label="Last Name" defaultValue="Rhye" />
      </Card>
    </div>
  );
}`;

const BILLING_CODE = `import { Card, Progress, Button, DataTable, PaymentCard, PricingBlock } from "./ui";

export function BillingPage() {
  return (
    <div className="space-y-6 text-left">
      <h2>Billing & Plans</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <Progress value={80} />
        </Card>
        <Card className="p-6">
          <PaymentCard brand="visa" last4="4242" holder="Olivia Rhye" expiry="08/29" />
        </Card>
      </div>
      <PricingBlock />
    </div>
  );
}`;

const TEAM_CODE = `import { useState } from "react";
import { Card, DataTable, FilterBar, FilterChip, SearchBar, AvatarGroupCompact, Button } from "./ui";

export function TeamScreen() {
  return (
    <div className="space-y-6 text-left">
      <h2>Team Members</h2>
      <FilterBar leading={<SearchBar placeholder="Filter teammates..." />}>
        <FilterChip active>All</FilterChip>
      </FilterBar>
      <DataTable columns={memberCols} rows={members} selectable />
    </div>
  );
}`;

/* ========================================================================== */
/*                       TEMPLATE DOCUMENTATION PAGES                         */
/* ========================================================================== */

export function AnalyticsTemplatePage() {
  return (
    <div className="docs-page-container">
      <PageHeader
        eyebrow="Template"
        title="Analytics Dashboard"
        description="A full application screen: vertical sidebar navigation, metric cards with SVG sparklines, multi-series performance charts, and a customer transaction ledger — composed only from Unseen primitives."
        tags={["Dashboard 01", "SidebarNav", "DataTable", "Sparklines", "AreaChart"]}
      />
      <Showcase code={ANALYTICS_CODE} allowViewport align="stretch">
        <AnalyticsDashboardTemplate />
      </Showcase>
    </div>
  );
}

export function SettingsTemplatePage() {
  return (
    <div className="docs-page-container">
      <PageHeader
        eyebrow="Template"
        title="Settings Screen"
        description="A complete settings blueprint with horizontal navigation sub-tabs, avatar drop-zone uploaders, form inputs, timezone selectors, and pinned save bars."
        tags={["Settings 01", "HorizontalTabs", "AvatarUpload", "Select", "Inputs"]}
      />
      <Showcase code={SETTINGS_CODE} allowViewport align="stretch">
        <SettingsScreenTemplate />
      </Showcase>
    </div>
  );
}

export function BillingTemplatePage() {
  return (
    <div className="docs-page-container">
      <PageHeader
        eyebrow="Template"
        title="Billing & Subscription"
        description="A comprehensive SaaS billing screen featuring active tier metrics, live PaymentCard renders, annual/monthly pricing comparison, and invoice receipt tables."
        tags={["Billing 01", "PaymentCard", "PricingBlock", "Progress", "DataTable"]}
      />
      <Showcase code={BILLING_CODE} allowViewport align="stretch">
        <BillingPageTemplate />
      </Showcase>
    </div>
  );
}

export function TeamTemplatePage() {
  return (
    <div className="docs-page-container">
      <PageHeader
        eyebrow="Template"
        title="Team & Collaborators"
        description="An enterprise team management screen featuring member count chips, faceted role filters, bulk selection actions, 2FA badges, and live teammate invite modals."
        tags={["Team 01", "DataTable", "AvatarGroupCompact", "FilterBar", "Modal"]}
      />
      <Showcase code={TEAM_CODE} allowViewport align="stretch">
        <TeamPeopleTemplate />
      </Showcase>
    </div>
  );
}

/* ========================================================================== */
/*              5. AI & NEURAL STUDIO TEMPLATE (ALIGNUI BENCHMARK)            */
/* ========================================================================== */

interface AiMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  time: string;
  code?: string;
  model?: string;
}

const INITIAL_AI_MESSAGES: AiMessage[] = [
  {
    id: "m1",
    role: "assistant",
    text: "Welcome to the Unseen Neural Studio. I can assist you with OKLCH color spaces, accessibility contrast calculations, or React 19 component compositions. What interface are we building today?",
    time: "10:14 AM",
    model: "Unseen Vision-4",
  },
  {
    id: "m2",
    role: "user",
    text: "Generate a responsive 3-column stats grid with trend indicators and sparklines using OKLCH tokens.",
    time: "10:15 AM",
  },
  {
    id: "m3",
    role: "assistant",
    text: "Here is the production-ready React 19 implementation using Unseen primitives and token-based sparklines:",
    code: `import { Card, Chip } from "./ui/Display";

export function MetricGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card elevation={2} className="p-5 border-glow">
        <div className="flex items-center justify-between">
          <span className="text-label-xs text-muted">Monthly Recurring Revenue</span>
          <Chip tone="success" size="sm" variant="soft" dot>+18.4%</Chip>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <h3 className="text-title-h3 font-mono font-medium">$128,450</h3>
        </div>
      </Card>
    </div>
  );
}`,
    time: "10:15 AM",
    model: "Unseen Vision-4",
  },
];

export function AiAssistantTemplate() {
  const [messages, setMessages] = useState<AiMessage[]>(INITIAL_AI_MESSAGES);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [selectedModel, setSelectedModel] = useState("Unseen Vision-4");
  const [temperature, setTemperature] = useState(0.7);
  const [totalTokens, setTotalTokens] = useState(3840);
  const { copy, copied } = useCopy();
  const { push } = useToast();

  const handleSend = () => {
    if (!input.trim() || streaming) return;
    const userPrompt = input.trim();
    const userMsg: AiMessage = {
      id: String(Date.now()),
      role: "user",
      text: userPrompt,
      time: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setStreaming(true);

    setTimeout(() => {
      const assistantMsg: AiMessage = {
        id: String(Date.now() + 1),
        role: "assistant",
        text: `Synthesized production-grade response for: "${userPrompt}". All tokens mathematically aligned to the OKLCH color space with full WCAG AAA contrast conformance.`,
        code: `import { Card, Chip } from "./ui/Display";\nimport { FancyButton } from "./ui/Button";\n\nexport function Specimen() {\n  return (\n    <Card className="p-4 border-glow">\n      <Chip tone="accent" dot>Active Specimen</Chip>\n      <FancyButton tone="accent" size="sm" className="mt-3">Action</FancyButton>\n    </Card>\n  );\n}`,
        time: "Just now",
        model: selectedModel,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setStreaming(false);
      setTotalTokens((t) => t + 64);
      push({
        title: "Completion Synthesized",
        description: `Stream finished using ${selectedModel} (64 tokens, 42ms).`,
        tone: "accent",
      });
    }, 700);
  };

  return (
    <div className="w-full rounded-16 bg-surface ring-1 ring-border shadow-lg overflow-hidden text-left card-specular-glow">
      {/* Studio Top Control Strip */}
      <div className="border-b border-separator bg-surface-secondary/70 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-subtle">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-success animate-pulse-soft" />
          <span className="text-foreground font-medium">Neural Enclave Active</span>
          <span className="text-subtle">•</span>
          <span className="rounded bg-surface px-1.5 py-0.5 text-[10px] text-accent ring-1 ring-border">{selectedModel}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-foreground font-medium font-mono">{totalTokens.toLocaleString()} / 128,000 tkn</span>
          <span className="hidden sm:inline">P99: 38ms</span>
          <span className="rounded-full bg-success/15 px-2 py-0.5 text-[9px] font-mono font-medium text-success">OKLCH Grounded</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 min-h-[640px]">
        {/* Left Parameter Tuning Sidebar */}
        <aside className="lg:col-span-4 border-r border-separator bg-surface-secondary/30 p-5 space-y-5">
          <div className="space-y-1">
            <h3 className="text-label-sm font-medium text-foreground">Hyperparameters</h3>
            <p className="text-[11px] text-muted">Tune sampling randomness and token context window</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="ai-model-select" className="text-label-xs font-medium block text-foreground">Active Architecture</label>
              <select
                id="ai-model-select"
                aria-label="Active Model"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full rounded-10 border border-border bg-surface px-3 py-2 text-paragraph-xs text-foreground focus:outline-none focus:ring-1 focus:ring-accent shadow-xs"
              >
                <option value="Unseen Vision-4">Unseen Vision-4 (128k Flagship)</option>
                <option value="Claude-3.5-Sonnet">Claude 3.5 Sonnet (200k Context)</option>
                <option value="GPT-4o-Neural">GPT-4o Neural (Omni)</option>
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-label-xs">
                <label htmlFor="temp-slider-range" className="font-medium text-foreground">Temperature (Entropy)</label>
                <span className="font-mono text-foreground font-medium">{temperature.toFixed(2)}</span>
              </div>
              <input
                id="temp-slider-range"
                aria-label="Temperature slider"
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full h-1.5 rounded-full bg-surface-secondary accent-[var(--accent)] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-subtle">
                <span>Deterministic (0.0)</span>
                <span>Creative (1.0)</span>
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-separator">
              <span className="text-[10px] font-mono uppercase tracking-wider text-subtle block">Curated Prompt Presets</span>
              <div className="space-y-1.5">
                {[
                  { title: "Design System Architect", tag: "System" },
                  { title: "OKLCH Token Generator", tag: "Colors" },
                  { title: "Accessibility Auditor", tag: "WCAG" },
                  { title: "Tailwind v4 Bridge", tag: "Tokens" },
                ].map((preset) => (
                  <button
                    key={preset.title}
                    type="button"
                    onClick={() => {
                      setInput(`Generate guidelines for: ${preset.title}`);
                      push({ title: "Preset Loaded", description: `Loaded prompt: ${preset.title}`, tone: "default" });
                    }}
                    className="w-full text-left p-2.5 rounded-8 border border-border bg-surface hover:border-accent hover:bg-surface-secondary text-[11px] font-medium text-foreground transition-all flex items-center justify-between shadow-xs group"
                  >
                    <span>{preset.title}</span>
                    <span className="rounded bg-surface-secondary px-1.5 py-0.2 text-[9px] font-mono text-subtle group-hover:text-foreground">
                      {preset.tag}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Right Chat Stream Canvas */}
        <div className="lg:col-span-8 flex flex-col justify-between p-5 sm:p-6 bg-surface">
          {/* Message Thread */}
          <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1" role="log" aria-label="Conversation" tabIndex={0}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "p-4 rounded-14 text-paragraph-xs leading-relaxed max-w-[92%] transition-all",
                  msg.role === "user"
                    ? "ml-auto bg-accent text-accent-foreground rounded-br-none shadow-xs"
                    : "bg-surface-secondary/70 border border-border text-foreground rounded-bl-none shadow-xs"
                )}
              >
                <div className="flex items-center justify-between mb-2 text-[10px] opacity-80 border-b border-black/5 dark:border-white/10 pb-1">
                  <span className="font-medium font-mono uppercase flex items-center gap-1.5">
                    {msg.role === "user" ? (
                      <>You</>
                    ) : (
                      <>
                        <RiSparkling2Line size={12} className="text-accent" />
                        {msg.model ?? "Neural Assistant"}
                      </>
                    )}
                  </span>
                  <span className="font-mono">{msg.time}</span>
                </div>
                <p className="whitespace-pre-wrap">{msg.text}</p>
                {msg.code && (
                  <div className="mt-3 rounded-10 border border-border bg-surface overflow-hidden">
                    <div className="flex items-center justify-between border-b border-separator bg-surface-secondary px-3 py-1.5 text-[10px] font-mono text-subtle">
                      <span>React 19 Component</span>
                      <button
                        type="button"
                        onClick={() => copy(msg.code!)}
                        className="flex items-center gap-1 text-accent hover:underline font-mono"
                      >
                        {copied ? <RiCheckLine size={11} /> : <RiFileCopyLine size={11} />}
                        {copied ? "Copied" : "Copy"}
                      </button>
                    </div>
                    <pre className="p-3 font-mono text-[11px] text-foreground overflow-x-auto leading-relaxed" tabIndex={0} role="region" aria-label="Streamed response (scrollable)">
                      <code>{msg.code}</code>
                    </pre>
                  </div>
                )}
              </div>
            ))}
            {streaming && (
              <div className="p-4 rounded-14 bg-surface-secondary border border-border text-foreground max-w-[80%] rounded-bl-none animate-pulse-soft flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent animate-ping-soft" />
                <span className="text-[11px] font-mono text-muted">Streaming tokens from {selectedModel}...</span>
              </div>
            )}
          </div>

          {/* Chat Input Console */}
          <div className="pt-4 border-t border-separator mt-4">
            <div className="rounded-14 border border-border bg-surface-secondary/50 p-2.5 focus-within:ring-1 focus-within:ring-accent focus-within:border-accent transition-all shadow-xs">
              <textarea
                id="ai-prompt-console"
                aria-label="Ask neural copilot"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                rows={2}
                placeholder="Ask about design tokens, color ramps, or component APIs (Enter to send)..."
                className="w-full bg-transparent p-1.5 text-paragraph-xs text-foreground placeholder:text-muted resize-none focus:outline-none leading-relaxed"
              />
              <div className="flex items-center justify-between pt-2 border-t border-separator/60 px-1">
                <div className="flex items-center gap-2 text-muted">
                  <button type="button" aria-label="Upload document" className="p-1.5 rounded-6 hover:bg-surface text-subtle hover:text-foreground transition-colors">
                    <RiAttachment2 size={16} />
                  </button>
                  <button type="button" aria-label="Voice input" className="p-1.5 rounded-6 hover:bg-surface text-subtle hover:text-foreground transition-colors">
                    <RiMicLine size={16} />
                  </button>
                  <span className="text-[10px] font-mono text-subtle hidden sm:inline">Markdown & JSX enabled</span>
                </div>
                <Button
                  size="sm"
                  variant="solid"
                  tone="accent"
                  disabled={!input.trim() || streaming}
                  onClick={handleSend}
                  startContent={<RiSendPlane2Fill size={14} />}
                >
                  Generate
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const AI_CODE = `import { useState } from "react";
import { Card, Button, Input, Chip, Progress } from "./ui";

export function AiStudio() {
  const [model, setModel] = useState("Unseen Vision-4");

  return (
    <div className="rounded-20 bg-surface ring-1 ring-border p-6">
      {/* Parameter sidebar & streaming message thread */}
    </div>
  );
}`;

export function AiTemplatePage() {
  return (
    <div className="docs-page-container">
      <PageHeader
        eyebrow="Template"
        title="AI & Neural Assistant"
        description="A full-featured generative AI studio template with parameter tuning (Temperature, Top-P), multi-turn chat stream history, formatted code blocks, and real-time token telemetry."
        tags={["AI Studio 01", "ChatStream", "ModelParams", "CodeBlock", "Telemetry"]}
      />
      <Showcase code={AI_CODE} allowViewport align="stretch">
        <AiAssistantTemplate />
      </Showcase>
    </div>
  );
}

/* ========================================================================== */
/*                         TEMPLATES OVERVIEW PAGE                            */
/* ========================================================================== */

export const TEMPLATE_CARDS = [
  {
    key: "ai",
    title: "AI & Neural Assistant",
    href: "templates/ai",
    description: "Multi-turn generative AI messaging, model parameter tuning, token telemetry, and formatted code blocks.",
    tags: ["AI Studio 01", "ChatStream", "ModelParams", "CodeBlock"],
    badge: "New",
  },
  {
    key: "analytics",
    title: "Analytics Dashboard",
    href: "templates/analytics",
    description: "Vertical sidebar layout, MRR metrics, sparkline waves, interactive area charts, and transaction ledger.",
    tags: ["Dashboard 01", "SidebarNav", "Sparkline", "DataTable"],
    badge: "Flagship",
  },
  {
    key: "settings",
    title: "Settings Screen",
    href: "templates/settings",
    description: "Horizontal sub-tabs, photo uploader, profile inputs, prefix slugs, and timezone select.",
    tags: ["Settings 01", "SubTabs", "Profile", "Form"],
    badge: "Updated",
  },
  {
    key: "billing",
    title: "Billing & Plans",
    href: "templates/billing",
    description: "Monthly/annual toggle, active tier progress, visual payment card, and downloadable PDF invoices.",
    tags: ["Billing 01", "PaymentCard", "PricingBlock"],
    badge: "Updated",
  },
  {
    key: "team",
    title: "Team & People",
    href: "templates/team",
    description: "Faceted member directory, 2FA compliance badges, bulk operations, and invite teammate modal.",
    tags: ["Team 01", "DataTable", "AvatarStack", "Modal"],
    badge: "Updated",
  },
];

export function TemplatesOverviewPage({ navigate }: { navigate: (t: string) => void }) {
  return (
    <main id="main" className="templates-page" tabIndex={-1}>
      <div className="home-container">
        <header className="collection-heading page-enter">
          <div>
            <p>Five application screens, end to end.</p>
            <h1>Production Screens.<br />Built with Unseen.</h1>
          </div>
          <div>
            <p>
              4 complete application screens composed purely from Unseen primitives and design tokens. Vertical sidebar navigation, horizontal sub-tabs, responsive layouts, and rich tables built in.
            </p>
            <a className="text-action" href="#/blocks">
              Browse standalone blocks <RiArrowRightLine size={15} />
            </a>
          </div>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 pb-16">
          {TEMPLATE_CARDS.map((t) => (
            <Card
              key={t.key}
              className="border-glow p-6 flex flex-col justify-between transition-all duration-[var(--duration-base)] hover:-translate-y-1 hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-label-lg font-medium text-foreground">{t.title}</span>
                  <Chip size="sm" tone="accent" variant="soft">{t.badge}</Chip>
                </div>
                <p className="mt-2 text-paragraph-sm text-muted">{t.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {t.tags.map((tag) => (
                    <Tag key={tag} variant="gray">{tag}</Tag>
                  ))}
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-separator flex items-center justify-between">
                <span className="text-paragraph-xs text-subtle">Ready to inspect & copy</span>
                <Button
                  size="sm"
                  variant="outline"
                  tone="default"
                  endContent={<RiArrowRightLine size={14} />}
                  onClick={() => navigate(t.href)}
                >
                  View Showcase
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <SiteFooter navigate={navigate} />
    </main>
  );
}
