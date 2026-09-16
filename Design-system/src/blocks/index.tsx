import { useState, type ReactNode } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bell,
  Check,
  CloudUpload,
  CreditCard,
  Eye,
  EyeOff,
  FileText,
  Filter,
  GitBranch,
  Globe,
  Mail,
  MoreHorizontal,
  Search,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "../ui/Button";
import { Avatar, AvatarGroup, Card, Chip, CircularProgress, Divider, Kbd, Progress } from "../ui/Display";
import { Checkbox, Input, RadioGroup, Switch } from "../ui/Form";
import { Tabs } from "../ui/Navigation";
import { CompactButton, DigitInput, FileFormatIcon, Hint, HorizontalStepper, LinkButton, SegmentedControl, SocialButton, StatusBadge, Tag } from "../ui/Extra";
import { Logo } from "../docs/Shell";
import { cn } from "../utils/cn";

/* -------------------------------- Auth Card ------------------------------- */

export function AuthCardBlock() {
  const [show, setShow] = useState(false);
  return (
    <Card elevation={3} className="w-full max-w-[400px] p-7">
      <div className="mx-auto mb-5 flex justify-center">
        <Logo size={56} />
      </div>
      <div className="text-center">
        <h3 className="text-title-h6 text-foreground">Welcome back</h3>
        <p className="mt-1 text-paragraph-sm text-muted">Please enter your details to login.</p>
      </div>
      <div className="mt-6 flex flex-col gap-3">
        <Input label="Email Address" type="email" placeholder="hello@aperture.design" startContent={<Mail />} />
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-label-sm text-foreground">Password</span>
            <LinkButton variant="gray" size="sm">Forgot?</LinkButton>
          </div>
          <Input type={show ? "text" : "password"} placeholder="••••••••••" endContent={<button onClick={() => setShow((s) => !s)} aria-label="Toggle password" className="text-subtle hover:text-foreground">{show ? <EyeOff /> : <Eye />}</button>} />
        </div>
        <Checkbox checked label="Keep me logged in" onChange={() => {}} className="mt-1" />
      </div>
      <Button fullWidth className="mt-5">Login</Button>
      <Divider label="or" className="my-5" />
      <div className="grid grid-cols-3 gap-2">
        <SocialButton brand="google" mode="stroke" iconOnly aria-label="Google" className="w-full" />
        <SocialButton brand="apple" mode="stroke" iconOnly aria-label="Apple" className="w-full" />
        <SocialButton brand="github" mode="stroke" iconOnly aria-label="GitHub" className="w-full" />
      </div>
      <p className="mt-5 flex justify-center gap-1 text-paragraph-sm text-muted">
        Don't have an account? <LinkButton variant="black" size="sm">Register</LinkButton>
      </p>
    </Card>
  );
}

/* ------------------------------ Stat Cards ------------------------------- */

export function StatsBlock({ compact }: { compact?: boolean }) {
  const stats = [
    { label: "Total revenue", value: "$128,430", delta: "+9.7%", up: true, icon: CreditCard },
    { label: "Active users", value: "14,205", delta: "+8.1%", up: true, icon: Users },
    { label: "Conversion", value: "3.42%", delta: "-0.6%", up: false, icon: Zap },
  ];
  return (
    <div className={cn("grid w-full min-w-0 gap-3 sm:gap-4", compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-3")}>
      {stats.map((s) => (
        <Card key={s.label} className="min-w-0 p-4 sm:p-5">
          <div className="flex items-start justify-between">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-secondary ring-1 ring-border sm:h-10 sm:w-10">
              <s.icon className="h-5 w-5 text-muted" />
            </span>
            <CompactButton variant="ghost" aria-label={`${s.label} options`}><MoreHorizontal /></CompactButton>
          </div>
          <p className="mt-3 truncate text-paragraph-xs text-muted sm:mt-4 sm:text-paragraph-sm">{s.label}</p>
          <p className="mt-1 truncate text-title-h6 tabular-nums text-foreground sm:text-title-h5">{s.value}</p>
          <Chip size="sm" tone={s.up ? "success" : "danger"} className="mt-2 self-start" startContent={s.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}>
            {s.delta}
          </Chip>
        </Card>
      ))}
    </div>
  );
}

/* ------------------------------ Profile Card ------------------------------ */

export function ProfileCardBlock() {
  const [following, setFollowing] = useState(false);
  return (
    <Card className="w-full max-w-[360px] overflow-hidden">
      <div className="h-24 bg-gradient-to-br from-accent-100 via-accent-50 to-surface-secondary dark:from-accent-900 dark:via-accent-950 dark:to-surface-secondary" />
      <div className="-mt-9 px-5">
        <span className="inline-flex rounded-full ring-4 ring-surface">
          <Avatar name="Sophia Williams" size="xl" tone="accent" status="online" />
        </span>
      </div>
      <div className="px-5 pt-3 pb-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="flex items-center gap-1.5 text-label-md text-foreground">
              Sophia Williams
              <svg viewBox="0 0 20 20" className="h-4 w-4 text-accent" fill="currentColor" aria-hidden><path fillRule="evenodd" d="M10 1.5 12.4 4l3.3-.4.6 3.3 3 1.6-1.6 2.9 1.2 3.2-3.2 1L14.4 18l-3-1.5L8.5 18l-1.3-3.1-3.2-1 1.2-3.2L3.6 8l3-1.6.6-3.3 3.3.4L10 1.5Zm3.2 6.1a.8.8 0 0 0-1.1-1.1L9 9.6 7.9 8.5a.8.8 0 1 0-1.1 1.1l1.7 1.7a.8.8 0 0 0 1.1 0l3.6-3.7Z" clipRule="evenodd" /></svg>
            </p>
            <p className="text-paragraph-sm text-muted">Product Designer · San Francisco</p>
          </div>
          <Button size="sm" variant={following ? "outline" : "solid"} tone={following ? "default" : "default"} onClick={() => setFollowing((f) => !f)}>
            {following ? "Following" : "Follow"}
          </Button>
        </div>
        <p className="mt-3 text-paragraph-sm text-muted">Designing systems that scale. Previously at Linear and Vercel. Sharing notes on tokens, type and motion.</p>
        <div className="mt-4 grid grid-cols-3 divide-x divide-separator rounded-xl bg-surface-secondary py-3 text-center ring-1 ring-border">
          {[["4,812", "Followers"], ["312", "Following"], ["96", "Posts"]].map(([v, l]) => (
            <div key={l}>
              <p className="text-label-md tabular-nums text-foreground">{v}</p>
              <p className="text-paragraph-xs text-subtle">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

/* ----------------------------- Notification ------------------------------ */

export function NotificationBlock() {
  const items = [
    { name: "Emma Wright", action: "commented on", target: "Q3 Roadmap", time: "2m", unread: true },
    { name: "James Brown", action: "assigned you", target: "APT-2419", time: "18m", unread: true },
    { name: "Lena Müller", action: "approved", target: "Design tokens v3", time: "1h", unread: false },
    { name: "Arthur Taylor", action: "mentioned you in", target: "#design-system", time: "3h", unread: false },
  ];
  return (
    <Card className="w-full max-w-[400px]">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <p className="text-label-sm text-foreground">Notifications</p>
          <Chip size="sm" tone="accent">2 new</Chip>
        </div>
        <LinkButton variant="primary" size="sm">Mark all read</LinkButton>
      </div>
      <Divider />
      <ul className="divide-y divide-separator-secondary">
        {items.map((n, i) => (
          <li key={n.name} className={cn("flex gap-3 px-4 py-3 transition-colors hover:bg-surface-hover", n.unread && "bg-accent-soft/30")}>
            <Avatar name={n.name} size="sm" tone={(["accent", "success", "warning", "default"] as const)[i % 4]} />
            <div className="min-w-0 flex-1">
              <p className="text-paragraph-sm text-muted">
                <span className="text-label-sm text-foreground">{n.name}</span> {n.action} <span className="text-label-sm text-foreground">{n.target}</span>
              </p>
              <p className="mt-0.5 text-paragraph-xs text-subtle">{n.time} ago</p>
            </div>
            {n.unread && <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />}
          </li>
        ))}
      </ul>
      <Divider />
      <div className="px-4 py-3">
        <Button fullWidth size="sm" variant="outline" tone="default">View all notifications</Button>
      </div>
    </Card>
  );
}

/* -------------------------------- Pricing -------------------------------- */

export function PricingBlock() {
  const [annual, setAnnual] = useState(true);
  const plans = [
    { name: "Starter", price: annual ? 0 : 0, desc: "For individuals exploring the system.", features: ["3 projects", "Community support", "Light & dark themes"], cta: "Get started", tone: "outline" as const },
    { name: "Pro", price: annual ? 19 : 24, desc: "For product teams shipping to production.", features: ["Unlimited projects", "Figma library sync", "Theme Studio export", "Priority support"], cta: "Start 14-day trial", tone: "solid" as const, popular: true },
    { name: "Enterprise", price: annual ? 49 : 59, desc: "For organisations with compliance needs.", features: ["SSO & audit logs", "Dedicated designer", "Custom token pipeline", "SLA & onboarding"], cta: "Talk to sales", tone: "outline" as const },
  ];
  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-center gap-3">
        <SegmentedControl value={annual ? "annual" : "monthly"} onChange={(v) => setAnnual(v === "annual")} items={[{ value: "monthly", label: "Monthly" }, { value: "annual", label: "Annual" }]} />
        <Chip size="sm" tone="success" variant="soft">Save 20%</Chip>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((p) => (
          <Card key={p.name} className={cn("relative flex flex-col p-6", p.popular && "ring-2 ring-accent shadow-md")}>
            {p.popular && <Chip tone="accent" size="sm" className="absolute -top-2.5 left-6">Most popular</Chip>}
            <p className="text-label-md text-foreground">{p.name}</p>
            <p className="mt-1 text-paragraph-sm text-muted">{p.desc}</p>
            <div className="mt-5 flex items-baseline gap-1">
              <span className="text-title-h3 tabular-nums text-foreground">${p.price}</span>
              <span className="text-paragraph-sm text-subtle">/ seat / mo</span>
            </div>
            <Button fullWidth variant={p.tone} tone={p.popular ? "accent" : "default"} className="mt-5">{p.cta}</Button>
            <Divider className="my-5" />
            <ul className="space-y-2.5">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-paragraph-sm text-muted">
                  <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-success-soft text-success-soft-foreground"><Check className="h-3 w-3" strokeWidth={3} /></span>
                  {f}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------- Table --------------------------------- */

export function TableBlock() {
  const rows = [
    { name: "Aurora Analytics", owner: "Sophia W.", status: "Active", plan: "Enterprise", mrr: "$4,200", progress: 82 },
    { name: "Northwind Traders", owner: "James B.", status: "Trial", plan: "Pro", mrr: "$0", progress: 34 },
    { name: "Halcyon Labs", owner: "Lena M.", status: "Active", plan: "Pro", mrr: "$960", progress: 61 },
    { name: "Ridgeline Studio", owner: "Arthur T.", status: "Churned", plan: "Starter", mrr: "$0", progress: 8 },
  ];
  const [sel, setSel] = useState<number[]>([0, 2]);
  const toggle = (i: number) => setSel((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]));
  const all = sel.length === rows.length;
  return (
    <Card className="w-full overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-2">
          <p className="text-label-md text-foreground">Customers</p>
          <Chip size="sm" variant="outline">{rows.length}</Chip>
        </div>
        <div className="flex items-center gap-2">
          <Input size="sm" placeholder="Search…" startContent={<Search />} wrapperClassName="hidden w-44 md:flex" />
          <Button size="sm" variant="outline" tone="default" startContent={<Filter />}>Filter</Button>
          <Button size="sm">Add customer</Button>
        </div>
      </div>
      <div className="ds-scroll overflow-x-auto border-t border-separator">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-surface-secondary text-subheading-xs uppercase text-subtle">
              <th className="w-10 px-4 py-2.5"><Checkbox size="sm" checked={all} indeterminate={!all && sel.length > 0} onChange={() => setSel(all ? [] : rows.map((_, i) => i))} /></th>
              <th className="px-3 py-2.5 font-medium">Customer</th>
              <th className="px-3 py-2.5 font-medium">Status</th>
              <th className="px-3 py-2.5 font-medium">Plan</th>
              <th className="px-3 py-2.5 font-medium">Usage</th>
              <th className="px-3 py-2.5 text-right font-medium">MRR</th>
              <th className="w-10 px-3 py-2.5" />
            </tr>
          </thead>
          <tbody className="divide-y divide-separator-secondary">
            {rows.map((r, i) => (
              <tr key={r.name} className={cn("transition-colors hover:bg-surface-hover", sel.includes(i) && "bg-accent-soft/25")}>
                <td className="px-4 py-3"><Checkbox size="sm" checked={sel.includes(i)} onChange={() => toggle(i)} /></td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={r.name} size="sm" square tone={(["accent", "success", "warning", "default"] as const)[i]} />
                    <div>
                      <p className="text-label-sm text-foreground">{r.name}</p>
                      <p className="text-paragraph-xs text-subtle">{r.owner}</p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3"><StatusBadge status={r.status === "Active" ? "completed" : r.status === "Trial" ? "pending" : "failed"}>{r.status}</StatusBadge></td>
                <td className="px-3 py-3"><Tag variant="gray">{r.plan}</Tag></td>
                <td className="px-3 py-3"><div className="flex items-center gap-2"><Progress value={r.progress} size="sm" className="w-20" tone={r.progress > 70 ? "success" : "accent"} /><span className="font-mono text-[11px] tabular-nums text-subtle">{r.progress}%</span></div></td>
                <td className="px-3 py-3 text-right text-label-sm tabular-nums text-foreground">{r.mrr}</td>
                <td className="px-3 py-3"><CompactButton variant="ghost" aria-label="Row actions"><MoreHorizontal /></CompactButton></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-separator px-4 py-3 text-paragraph-xs text-subtle">
        <span>{sel.length} of {rows.length} selected</span>
        <span>Page 1 of 12</span>
      </div>
    </Card>
  );
}

/* ------------------------------ Command Menu ----------------------------- */

export function CommandMenuBlock() {
  const groups = [
    { label: "Suggestions", items: [{ icon: FileText, label: "Create new document", k: "⌘N" }, { icon: Users, label: "Invite teammates", k: "⌘I" }, { icon: GitBranch, label: "Switch branch", k: "⌘B" }] },
    { label: "Navigate", items: [{ icon: Globe, label: "Go to dashboard", k: "G D" }, { icon: Bell, label: "Open notifications", k: "G N" }] },
  ];
  return (
    <Card elevation={4} className="w-full max-w-[520px] overflow-hidden">
      <div className="flex items-center gap-3 px-4">
        <Search className="h-5 w-5 text-subtle" />
        <input aria-label="Command search" className="h-12 w-full bg-transparent text-paragraph-sm text-foreground outline-none placeholder:text-field-placeholder" placeholder="Type a command or search…" defaultValue="" />
        <Kbd>esc</Kbd>
      </div>
      <Divider />
      <div className="p-2">
        {groups.map((g) => (
          <div key={g.label} className="mb-1">
            <p className="px-2.5 pt-2 pb-1 text-subheading-2xs uppercase text-subtle">{g.label}</p>
            {g.items.map((it, i) => (
              <button key={it.label} className={cn("flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-paragraph-sm text-foreground transition-colors hover:bg-surface-hover", g.label === "Suggestions" && i === 0 && "bg-surface-hover")}>
                <it.icon className="h-5 w-5 text-muted" />
                <span className="flex-1">{it.label}</span>
                <Kbd>{it.k}</Kbd>
              </button>
            ))}
          </div>
        ))}
      </div>
      <Divider />
      <div className="flex items-center gap-4 bg-surface-secondary px-4 py-2.5 text-paragraph-xs text-subtle">
        <span className="flex items-center gap-1.5"><Kbd>↑</Kbd><Kbd>↓</Kbd> to navigate</span>
        <span className="flex items-center gap-1.5"><Kbd>↵</Kbd> to select</span>
      </div>
    </Card>
  );
}

/* ------------------------------ File Upload ------------------------------ */

export function FileUploadBlock() {
  const files = [
    { name: "brand-guidelines.pdf", size: "2.4 MB", progress: 100 },
    { name: "hero-illustration.png", size: "8.1 MB", progress: 62 },
  ];
  return (
    <Card className="w-full max-w-[420px] p-5">
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border-strong bg-surface-secondary/60 px-6 py-8 text-center transition-colors hover:border-accent hover:bg-accent-soft/30">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface ring-1 ring-border shadow-xs">
          <CloudUpload className="h-6 w-6 text-muted" />
        </span>
        <p className="mt-3 text-label-sm text-foreground">Choose a file or drag & drop it here</p>
        <p className="mt-1 text-paragraph-xs text-subtle">JPEG, PNG, PDF and MP4 formats, up to 50 MB.</p>
        <Button size="sm" variant="outline" tone="default" className="mt-4">Browse files</Button>
      </div>
      <ul className="mt-4 space-y-2.5">
        {files.map((f) => (
          <li key={f.name} className="flex items-center gap-3 rounded-xl p-3 ring-1 ring-border">
            <FileFormatIcon format={f.name.split(".").pop() ?? "txt"} size={32} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-label-sm text-foreground">{f.name}</p>
                {f.progress === 100 ? <Chip size="sm" tone="success" variant="soft">Done</Chip> : <span className="font-mono text-[11px] text-subtle">{f.progress}%</span>}
              </div>
              <p className="text-paragraph-xs text-subtle">{f.size}</p>
              {f.progress < 100 && <Progress value={f.progress} size="sm" className="mt-2" />}
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/* ------------------------------- Settings -------------------------------- */

export function SettingsBlock() {
  const [tab, setTab] = useState("general");
  const [vis, setVis] = useState("team");
  const [n1, setN1] = useState(true);
  const [n2, setN2] = useState(false);
  return (
    <Card className="w-full max-w-[640px]">
      <div className="px-6 pt-5">
        <p className="text-label-lg text-foreground">Workspace settings</p>
        <p className="text-paragraph-sm text-muted">Manage how your workspace appears and behaves.</p>
        <div className="mt-4">
          <Tabs variant="underline" size="sm" value={tab} onChange={setTab} items={[{ key: "general", label: "General" }, { key: "members", label: "Members" }, { key: "billing", label: "Billing" }, { key: "security", label: "Security" }]} />
        </div>
      </div>
      <div className="space-y-5 px-6 py-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Workspace name" defaultValue="Aperture Labs" />
          <Input label="Workspace URL" defaultValue="aperture-labs" prefixAffix={<span className="whitespace-nowrap">app.io/</span>} />
        </div>
        <Divider />
        <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
          <div>
            <p className="text-label-sm text-foreground">Visibility</p>
            <p className="text-paragraph-xs text-subtle">Who can discover this workspace.</p>
          </div>
          <RadioGroup orientation="horizontal" value={vis} onChange={setVis} options={[{ value: "private", label: "Private" }, { value: "team", label: "Team" }, { value: "public", label: "Public" }]} />
        </div>
        <Divider />
        <div className="space-y-3">
          <Switch checked={n1} onChange={setN1} label="Email notifications" description="Receive a weekly digest of activity." />
          <Switch checked={n2} onChange={setN2} label="Two-factor authentication" description="Require a second step when signing in." />
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-separator bg-surface-secondary/60 px-6 py-4">
        <span className="text-paragraph-xs text-subtle">Last saved 4 minutes ago</span>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" tone="default">Discard</Button>
          <Button size="sm">Save changes</Button>
        </div>
      </div>
    </Card>
  );
}

/* --------------------------------- Rating -------------------------------- */

export function RatingBlock() {
  const [rating, setRating] = useState(4);
  const [hover, setHover] = useState(0);
  return (
    <Card className="w-full max-w-[380px] p-6 text-center">
      <p className="text-label-md text-foreground">How was your experience?</p>
      <p className="mt-1 text-paragraph-sm text-muted">Your feedback helps us improve Aperture.</p>
      <div className="mt-4 flex justify-center gap-1.5" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((i) => (
          <button key={i} onMouseEnter={() => setHover(i)} onClick={() => setRating(i)} className="transition-transform hover:scale-110" aria-label={`${i} stars`}>
            <Star className={cn("h-7 w-7 transition-colors", (hover || rating) >= i ? "fill-warning text-warning" : "text-neutral-300 dark:text-neutral-700")} />
          </button>
        ))}
      </div>
      <p className="mt-2 text-paragraph-xs text-subtle">{["", "Poor", "Fair", "Good", "Great", "Excellent"][hover || rating]}</p>
      <Button fullWidth className="mt-5" variant="solid" tone="default">Submit feedback</Button>
    </Card>
  );
}

/* ------------------------------ Team / Usage ----------------------------- */

export function UsageBlock() {
  return (
    <Card className="w-full max-w-[380px] p-5">
      <div className="flex items-center justify-between">
        <p className="text-label-md text-foreground">Plan usage</p>
        <Chip size="sm" tone="accent" variant="soft">Pro</Chip>
      </div>
      <div className="mt-4 flex items-center gap-5">
        <CircularProgress value={72} size={84} stroke={7} />
        <div className="flex-1 space-y-3">
          <Progress label="Seats" value={80} showValue size="sm" />
          <Progress label="Storage" value={64} showValue size="sm" tone="success" />
          <Progress label="API calls" value={91} showValue size="sm" tone="warning" />
        </div>
      </div>
      <Divider className="my-4" />
      <div className="flex items-center justify-between">
        <AvatarGroup items={[{ name: "Sophia W" }, { name: "James B" }, { name: "Lena M" }, { name: "Arthur T" }, { name: "Emma W" }]} size="sm" max={4} />
        <Button size="sm" variant="outline" tone="default" endContent={<ArrowRight />}>Upgrade</Button>
      </div>
    </Card>
  );
}

/* ------------------------------- Onboarding ------------------------------- */

export function OnboardingBlock() {
  const [step, setStep] = useState(1);
  const steps = [{ title: "Account" }, { title: "Workspace" }, { title: "Invite team" }, { title: "Finish" }];
  return (
    <Card className="w-full max-w-[560px]">
      <div className="border-b border-separator px-6 py-5">
        <HorizontalStepper steps={steps} current={step} />
      </div>
      <div className="px-6 py-6">
        <p className="text-label-lg text-foreground">Create your workspace</p>
        <p className="mt-1 text-paragraph-sm text-muted">A workspace is where your team's projects live.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Input label="Workspace name" placeholder="Aperture Labs" />
          <Input label="URL" placeholder="aperture-labs" prefixAffix={<span className="whitespace-nowrap">app.io/</span>} />
        </div>
        <div className="mt-4">
          <p className="mb-2 text-label-sm text-foreground">Team size</p>
          <SegmentedControl fullWidth value="2-10" onChange={() => {}} items={[{ value: "1", label: "Just me" }, { value: "2-10", label: "2–10" }, { value: "11-50", label: "11–50" }, { value: "50+", label: "50+" }]} />
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-separator bg-surface-secondary/60 px-4 py-4 sm:px-6">
        <Button variant="ghost" tone="default" onClick={() => setStep((s) => Math.max(0, s - 1))}>Back</Button>
        <div className="flex items-center gap-3">
          <span className="hidden text-paragraph-xs text-subtle sm:inline">Step {step + 1} of {steps.length}</span>
          <Button onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))} endContent={<ArrowRight />}>Continue</Button>
        </div>
      </div>
    </Card>
  );
}

/* ------------------------------ Verification ------------------------------ */

export function VerifyBlock() {
  const [code, setCode] = useState("");
  return (
    <Card elevation={3} className="w-full max-w-[400px] p-7 text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-surface-secondary ring-1 ring-border"><Mail className="h-6 w-6 text-foreground" /></span>
      <h3 className="mt-4 text-title-h6 text-foreground">Check your email</h3>
      <p className="mt-1 text-paragraph-sm text-muted">We sent a 4-digit code to <span className="text-label-sm text-foreground">hello@aperture.design</span></p>
      <div className="mt-6 flex justify-center"><DigitInput length={4} value={code} onChange={setCode} /></div>
      <div className="mt-3 flex justify-center"><Hint>Code expires in 09:42</Hint></div>
      <Button fullWidth className="mt-6" disabled={code.length < 4}>Verify</Button>
      <p className="mt-4 text-paragraph-sm text-muted">Didn't receive it? <LinkButton variant="black" size="sm">Resend</LinkButton></p>
    </Card>
  );
}

/* --------------------------------- Registry -------------------------------- */

export type BlockDef = { key: string; title: string; category: string; description: string; render: () => ReactNode; span?: 1 | 2 | 3; width?: number };

export const BLOCKS: BlockDef[] = [
  { key: "auth", title: "Auth Card", category: "Authentication", description: "Login with social sign-in, remember me and password reveal.", render: () => <AuthCardBlock />, width: 400 },
  { key: "verify", title: "Verification", category: "Authentication", description: "OTP entry with digit inputs, expiry hint and resend.", render: () => <VerifyBlock />, width: 400 },
  { key: "onboarding", title: "Onboarding", category: "Forms", description: "Stepper-driven wizard with segmented team-size picker.", render: () => <OnboardingBlock />, span: 2, width: 560 },
  { key: "stats", title: "Stats & Metrics", category: "Dashboard", description: "KPI cards with delta chips and overflow actions.", render: () => <StatsBlock />, span: 2, width: 760 },
  { key: "table", title: "Data Table", category: "Dashboard", description: "Selectable rows, inline usage bars, status chips and toolbar.", render: () => <TableBlock />, span: 3, width: 980 },
  { key: "command", title: "Command Menu", category: "Navigation", description: "Grouped commands with keyboard hints.", render: () => <CommandMenuBlock />, span: 2, width: 520 },
  { key: "profile", title: "Profile Card", category: "Social", description: "Cover, verified badge, follow toggle and stat strip.", render: () => <ProfileCardBlock />, width: 360 },
  { key: "notification", title: "Notification", category: "Feedback", description: "Activity feed with unread indicators.", render: () => <NotificationBlock />, width: 400 },
  { key: "upload", title: "File Upload", category: "Forms", description: "Drop zone with in-progress and completed files.", render: () => <FileUploadBlock />, width: 420 },
  { key: "usage", title: "Plan Usage", category: "Dashboard", description: "Circular and linear progress with team avatars.", render: () => <UsageBlock />, width: 380 },
  { key: "settings", title: "Settings Form", category: "Forms", description: "Tabbed settings with radios, switches and a sticky action bar.", render: () => <SettingsBlock />, span: 2, width: 640 },
  { key: "rating", title: "Rating", category: "Feedback", description: "Five-star rating with hover preview.", render: () => <RatingBlock />, width: 380 },
  { key: "pricing", title: "Pricing", category: "Marketing", description: "Three tiers with annual toggle and highlighted plan.", render: () => <PricingBlock />, span: 3, width: 900 },
];
