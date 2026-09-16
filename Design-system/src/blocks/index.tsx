import { useRef, useState, type ReactNode } from "react";
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
  X,
  Zap,
} from "lucide-react";
import { Button } from "../ui/Button";
import { Avatar, AvatarGroup, Card, Chip, CircularProgress, Divider, Kbd, Progress } from "../ui/Display";
import { Checkbox, Input, RadioGroup, Switch } from "../ui/Form";
import { Tabs } from "../ui/Navigation";
import { useToast } from "../ui/Overlay";
import { CompactButton, DigitInput, FileFormatIcon, Hint, HorizontalStepper, LinkButton, SegmentedControl, SocialButton, StatusBadge, Tag } from "../ui/Extra";
import { Logo } from "../ui/Brand";
import { cn } from "../utils/cn";

/* -------------------------------- Auth Card ------------------------------- */

export function AuthCardBlock() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [mode, setMode] = useState<"signin" | "register" | "recover">("signin");
  const [submitted, setSubmitted] = useState(false);
  const [finished, setFinished] = useState(false);
  const { push } = useToast();
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const changeMode = (next: typeof mode) => { setMode(next); setSubmitted(false); setFinished(false); };
  return (
    <form className="auth-demo" noValidate onSubmit={(e) => {
      e.preventDefault(); setSubmitted(true);
      if (emailValid && (mode === "recover" || password.length >= 8)) setFinished(true);
    }}>
      <div className="auth-demo-mark">
        <Logo size={38} />
      </div>
      <div className="auth-demo-heading">
        <h3>{mode === "signin" ? "Welcome back" : mode === "register" ? "Create an account" : "Reset your password"}</h3>
        <p>{mode === "recover" ? "Enter the email associated with your account." : "A little less setup. A little more creating."}</p>
      </div>
      <div className="auth-demo-fields">
        <Input label="Email address" type="email" autoComplete="email" placeholder="you@company.com" value={email} onChange={(e) => { setEmail(e.target.value); setFinished(false); }} error={submitted && !emailValid ? "Enter a valid email address." : undefined} startContent={<Mail />} />
        {mode !== "recover" && <>
          <Input label="Password" type={show ? "text" : "password"} autoComplete={mode === "register" ? "new-password" : "current-password"} placeholder="At least 8 characters" value={password} onChange={(e) => { setPassword(e.target.value); setFinished(false); }} error={submitted && password.length < 8 ? "Use at least 8 characters." : undefined} endContent={<button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? "Hide password" : "Show password"} className="text-subtle hover:text-foreground">{show ? <EyeOff /> : <Eye />}</button>} />
          <div className="auth-demo-options"><Checkbox checked={remember} label="Remember me" onChange={(e) => setRemember(e.target.checked)} size="sm" /><LinkButton type="button" variant="primary" size="sm" onClick={() => changeMode("recover")}>Forgot password?</LinkButton></div>
        </>}
      </div>
      <Button type="submit" fullWidth className="mt-5" endContent={<ArrowRight />}>{mode === "signin" ? "Sign in" : mode === "register" ? "Create account" : "Send reset link"}</Button>
      {finished && <p className="auth-demo-feedback" role="status"><Check size={14} /> Validation passed. This preview does not send account requests.</p>}
      <Divider label="or" className="my-5" />
      <div className="auth-demo-socials">
        {(["google", "apple", "github"] as const).map((brand) => <SocialButton key={brand} type="button" brand={brand} mode="stroke" iconOnly aria-label={`Continue with ${brand}`} className="w-full" onClick={() => push({ title: "Social sign-in preview", description: "Connect your own authentication provider to enable sign-in.", tone: "accent" })} />)}
      </div>
      <div className="auth-demo-switch"><span>{mode === "signin" ? "New to Aperture?" : "Already have an account?"}</span>{" "}<LinkButton type="button" variant="black" size="sm" onClick={() => changeMode(mode === "signin" ? "register" : "signin")}>{mode === "signin" ? "Create an account" : "Sign in"}</LinkButton></div>
    </form>
  );
}

/* ------------------------------ Stat Cards ------------------------------- */

export function StatsBlock({ compact }: { compact?: boolean }) {
  const stats = [
    { label: "Total revenue", value: "$128,430", delta: "+18.2%", up: true, icon: CreditCard },
    { label: "Active users", value: "14,205", delta: "+8.1%", up: true, icon: Users },
    { label: "Conversion", value: "3.42%", delta: "-0.6%", up: false, icon: Zap },
  ];
  return (
    <div className="grid w-full min-w-0 gap-4" style={{ gridTemplateColumns: compact ? "1fr" : "repeat(auto-fit, minmax(min(180px, 100%), 1fr))" }}>
      {stats.map((s) => (
        <Card key={s.label} className="group min-w-0 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:ring-border-strong sm:p-5">
          <div className="flex items-start justify-between">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-secondary ring-1 ring-border transition-colors duration-200 group-hover:bg-accent-soft group-hover:text-accent group-hover:ring-accent/30 sm:h-10 sm:w-10">
              <s.icon className="h-5 w-5" />
            </span>
            <CompactButton variant="ghost" aria-label={`${s.label} options`}><MoreHorizontal /></CompactButton>
          </div>
          <p className="mt-3 truncate text-paragraph-xs text-muted sm:mt-4 sm:text-paragraph-sm">{s.label}</p>
          <p className="mt-1 text-title-h5 tabular-nums text-foreground">{s.value}</p>
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
          {[["9.6k", "Followers"], ["842", "Following"], ["96", "Posts"]].map(([v, l]) => (
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
  const [allRead, setAllRead] = useState(false);
  const [onlyUnread, setOnlyUnread] = useState(false);
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
          <Chip size="sm" tone={allRead ? "default" : "accent"}>{allRead ? "Up to date" : "2 new"}</Chip>
        </div>
        <LinkButton variant="primary" size="sm" onClick={() => setAllRead((read) => !read)}>{allRead ? "Reset" : "Mark all read"}</LinkButton>
      </div>
      <Divider />
      <ul className="divide-y divide-separator-secondary">
        {items.filter((n) => !onlyUnread || (n.unread && !allRead)).map((n, i) => (
          <li key={n.name} className={cn("flex gap-3 px-4 py-3 transition-colors hover:bg-surface-hover", n.unread && !allRead && "bg-accent-soft/30")}>
            <Avatar name={n.name} size="sm" tone={(["accent", "success", "warning", "default"] as const)[i % 4]} />
            <div className="min-w-0 flex-1">
              <p className="text-paragraph-sm text-muted">
                <span className="text-label-sm text-foreground">{n.name}</span> {n.action} <span className="text-label-sm text-foreground">{n.target}</span>
              </p>
              <p className="mt-0.5 text-paragraph-xs text-subtle">{n.time} ago</p>
            </div>
            {n.unread && !allRead && <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />}
          </li>
        ))}
      </ul>
      {onlyUnread && allRead && <p className="p-6 text-center text-paragraph-sm text-muted">You are all caught up.</p>}
      <Divider />
      <div className="px-4 py-3">
        <Button fullWidth size="sm" variant="outline" tone="default" onClick={() => setOnlyUnread((unread) => !unread)}>{onlyUnread ? "Show all activity" : "Show unread only"}</Button>
      </div>
    </Card>
  );
}

/* -------------------------------- Pricing -------------------------------- */

export function PricingBlock() {
  const [annual, setAnnual] = useState(true);
  const { push } = useToast();
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
            <Button fullWidth variant={p.tone} tone={p.popular ? "accent" : "default"} className="mt-5" onClick={() => push({ title: `${p.name} plan selected`, description: "This is a fictional product-pricing example. Aperture's beta remains free.", tone: "accent" })}>{p.cta}</Button>
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
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const { push } = useToast();
  const groups = [
    { label: "Suggestions", items: [{ icon: FileText, label: "Create new document", k: "⌘N" }, { icon: Users, label: "Invite teammates", k: "⌘I" }, { icon: GitBranch, label: "Switch branch", k: "⌘B" }] },
    { label: "Navigate", items: [{ icon: Globe, label: "Go to dashboard", k: "G D" }, { icon: Bell, label: "Open notifications", k: "G N" }] },
  ];
  const filtered = groups.map((group) => ({ ...group, items: group.items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())) })).filter((group) => group.items.length);
  const commands = filtered.flatMap((group) => group.items);
  const run = (label: string) => push({ title: label, description: "Command selected in the local preview.", tone: "accent" });
  return (
    <Card elevation={4} className="w-full max-w-[520px] overflow-hidden">
      <div className="flex items-center gap-3 px-4">
        <Search className="h-5 w-5 text-subtle" />
        <input aria-label="Command search" className="h-12 w-full min-w-0 bg-transparent text-paragraph-sm text-foreground outline-none placeholder:text-field-placeholder" placeholder="Type a command or search..." value={query} onChange={(e) => { setQuery(e.target.value); setCursor(0); }} onKeyDown={(e) => {
          if (e.key === "Escape") { setQuery(""); setCursor(0); }
          if (e.key === "ArrowDown") { e.preventDefault(); setCursor((n) => Math.min(n + 1, Math.max(0, commands.length - 1))); }
          if (e.key === "ArrowUp") { e.preventDefault(); setCursor((n) => Math.max(0, n - 1)); }
          if (e.key === "Enter" && commands[cursor]) { e.preventDefault(); run(commands[cursor].label); }
        }} />
        <Kbd>esc</Kbd>
      </div>
      <Divider />
      <div className="p-2">
        {filtered.map((g) => (
          <div key={g.label} className="mb-1">
            <p className="px-2.5 pt-2 pb-1 text-subheading-2xs uppercase text-subtle">{g.label}</p>
            {g.items.map((it) => (
              <button key={it.label} onMouseEnter={() => setCursor(commands.indexOf(it))} onClick={() => run(it.label)} className={cn("flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-paragraph-sm text-foreground transition-colors hover:bg-surface-hover", commands[cursor] === it && "bg-surface-hover")}>
                <it.icon className="h-5 w-5 text-muted" />
                <span className="flex-1">{it.label}</span>
                <Kbd>{it.k}</Kbd>
              </button>
            ))}
          </div>
        ))}
        {!commands.length && <p className="p-4 text-paragraph-sm text-muted">No matching commands.</p>}
      </div>
      <Divider />
      <div className="flex flex-wrap items-center gap-4 bg-surface-secondary px-4 py-2.5 text-paragraph-xs text-muted">
        <span className="flex items-center gap-1.5"><Kbd>↑</Kbd><Kbd>↓</Kbd> to navigate</span>
        <span className="flex items-center gap-1.5"><Kbd>↵</Kbd> to select</span>
      </div>
    </Card>
  );
}

/* ------------------------------ File Upload ------------------------------ */

export function FileUploadBlock() {
  const input = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  const [error, setError] = useState("");
  const [files, setFiles] = useState([{ name: "brand-guidelines.pdf", size: "2.4 MB", progress: 100 }]);
  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const accepted = Array.from(list).filter((file) => /\.(png|jpe?g|pdf|mp4)$/i.test(file.name) && file.size <= 50 * 1024 * 1024);
    setError(accepted.length < list.length ? "Use JPEG, PNG, PDF, or MP4 files smaller than 50 MB." : "");
    setFiles((items) => [...items, ...accepted.map((f) => ({ name: f.name, size: `${(f.size / 1024 / 1024).toFixed(2)} MB`, progress: 100 }))]);
  };
  return (
    <Card className="w-full max-w-[420px] p-5">
      <input type="file" ref={input} accept=".jpg,.jpeg,.png,.pdf,.mp4" multiple hidden onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
      <div onDragOver={(e) => { e.preventDefault(); setOver(true); }} onDragLeave={() => setOver(false)} onDrop={(e) => { e.preventDefault(); setOver(false); addFiles(e.dataTransfer.files); }} className={cn("flex flex-col items-center justify-center rounded-xl border border-dashed border-border-strong bg-surface-secondary/60 px-6 py-8 text-center transition-colors hover:border-accent hover:bg-accent-soft/30", over && "border-accent bg-accent-soft")}>
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface ring-1 ring-border shadow-xs">
          <CloudUpload className="h-6 w-6 text-muted" />
        </span>
        <p className="mt-3 text-label-sm text-foreground">Choose a file or drag & drop it here</p>
        <p className="mt-1 text-paragraph-xs text-subtle">JPEG, PNG, PDF and MP4 formats, up to 50 MB.</p>
        <Button size="sm" variant="outline" tone="default" className="mt-4" onClick={() => input.current?.click()}>Browse files</Button>
      </div>
      {error && <p role="alert" className="mt-3 text-paragraph-xs text-danger">{error}</p>}
      <ul className="mt-4 space-y-2.5">
        {files.map((f, index) => (
          <li key={`${f.name}-${index}`} className="flex items-center gap-3 rounded-xl p-3 ring-1 ring-border">
            <FileFormatIcon format={f.name.split(".").pop() ?? "txt"} size={32} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-label-sm text-foreground">{f.name}</p>
                <Chip size="sm" tone="success" variant="soft">Selected</Chip>
              </div>
              <p className="text-paragraph-xs text-subtle">{f.size}</p>
              {f.progress < 100 && <Progress value={f.progress} size="sm" className="mt-2" />}
            </div>
            <button type="button" className="studio-icon-button" onClick={() => setFiles((items) => items.filter((_, i) => i !== index))} aria-label={`Remove ${f.name}`}><X size={14} /></button>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-paragraph-xs text-muted">Local preview only. Files are not sent to a server.</p>
    </Card>
  );
}

/* ------------------------------- Settings -------------------------------- */

export function SettingsBlock() {
  const [tab, setTab] = useState("general");
  const [vis, setVis] = useState("team");
  const [n1, setN1] = useState(true);
  const [n2, setN2] = useState(false);
  const [workspace, setWorkspace] = useState("Studio workspace");
  const [url, setUrl] = useState("studio");
  const [saved, setSaved] = useState({ workspace: "Studio workspace", url: "studio", vis: "team", n1: true, n2: false });
  const [message, setMessage] = useState("Changes stay in this preview.");
  return (
    <Card className="w-full max-w-[640px] overflow-hidden">
      <div className="px-6 pt-5">
        <p className="text-label-lg text-foreground">Workspace settings</p>
        <p className="text-paragraph-sm text-muted">Manage how your workspace appears and behaves.</p>
        <div className="mt-4">
          <Tabs variant="underline" size="sm" value={tab} onChange={setTab} items={[{ key: "general", label: "General" }, { key: "notifications", label: "Notifications" }, { key: "security", label: "Security" }]} />
        </div>
      </div>
      <div className="space-y-5 px-6 py-5">
        {tab === "general" && <>
        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(190px,100%),1fr))" }}>
          <Input label="Workspace name" value={workspace} onChange={(e) => setWorkspace(e.target.value)} />
          <Input label="Workspace URL" value={url} onChange={(e) => setUrl(e.target.value)} prefixAffix="app.io/" />
        </div>
        <Divider />
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div>
            <p className="text-label-sm text-foreground">Visibility</p>
            <p className="text-paragraph-xs text-subtle">Who can discover this workspace.</p>
          </div>
          <RadioGroup orientation="horizontal" value={vis} onChange={setVis} options={[{ value: "private", label: "Private" }, { value: "team", label: "Team" }, { value: "public", label: "Public" }]} />
        </div>
        </>}
        {tab === "notifications" && <div className="space-y-3"><h3 className="text-label-md">Choose your updates</h3><p className="text-paragraph-sm text-muted">Notification delivery is not connected in the preview.</p><Switch checked={n1} onChange={setN1} label="Email notifications" description="Receive a weekly digest of activity." /></div>}
        {tab === "security" && <div className="space-y-3"><h3 className="text-label-md">A safer workspace</h3><p className="text-paragraph-sm text-muted">This toggles a demo setting, not a real account policy.</p><Switch checked={n2} onChange={setN2} label="Two-factor authentication" description="Require a second step when signing in." /></div>}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-separator bg-surface-secondary/60 px-6 py-4">
        <span className="text-paragraph-xs text-muted" role="status">{message}</span>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" tone="default" onClick={() => { setWorkspace(saved.workspace); setUrl(saved.url); setVis(saved.vis); setN1(saved.n1); setN2(saved.n2); setMessage("Restored the last saved values."); }}>Discard</Button>
          <Button size="sm" disabled={!workspace.trim()} onClick={() => { setSaved({ workspace, url, vis, n1, n2 }); setMessage("Changes saved in this preview."); }}>Save changes</Button>
        </div>
      </div>
    </Card>
  );
}

/* --------------------------------- Rating -------------------------------- */

export function RatingBlock() {
  const [rating, setRating] = useState(4);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  return (
    <Card className="w-full max-w-[380px] p-6 text-center">
      <p className="text-label-md text-foreground">How was your experience?</p>
      <p className="mt-1 text-paragraph-sm text-muted">Your feedback helps us improve Aperture.</p>
      <div className="mt-4 flex justify-center gap-1.5" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((i) => (
          <button key={i} onMouseEnter={() => setHover(i)} onClick={() => { setRating(i); setSubmitted(false); }} className="transition-transform hover:scale-110" aria-label={`${i} stars`} aria-pressed={rating === i}>
            <Star className={cn("h-7 w-7 transition-colors", (hover || rating) >= i ? "fill-warning text-warning" : "text-neutral-300 dark:text-neutral-700")} />
          </button>
        ))}
      </div>
      <p className="mt-2 text-paragraph-xs text-subtle">{["", "Poor", "Fair", "Good", "Great", "Excellent"][hover || rating]}</p>
      <Button fullWidth className="mt-5" variant="solid" tone="default" onClick={() => setSubmitted(true)}>{submitted ? "Rating saved locally" : "Submit feedback"}</Button>
      {submitted && <p role="status" className="mt-3 text-paragraph-xs text-muted">Your preview rating is {rating} out of 5.</p>}
    </Card>
  );
}

/* ------------------------------ Team / Usage ----------------------------- */

export function UsageBlock() {
  const { push } = useToast();
  return (
    <Card className="w-full max-w-[380px] p-5">
      <div className="flex items-center justify-between">
        <p className="text-label-md text-foreground">Plan usage</p>
        <Chip size="sm" tone="accent" variant="soft">Pro</Chip>
      </div>
      <div className="mt-4 flex items-center gap-5">
        <CircularProgress value={72} size={84} stroke={7} />
        <div className="min-w-0 flex-1 space-y-3">
          <Progress label="Seats" value={80} showValue size="sm" />
          <Progress label="Storage" value={64} showValue size="sm" tone="success" />
          <Progress label="API calls" value={91} showValue size="sm" tone="warning" />
        </div>
      </div>
      <Divider className="my-4" />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <AvatarGroup items={[{ name: "Sophia W" }, { name: "James B" }, { name: "Lena M" }, { name: "Arthur T" }, { name: "Emma W" }]} size="sm" max={4} />
        <Button size="sm" variant="outline" tone="default" endContent={<ArrowRight />} onClick={() => push({ title: "Example workspace usage", description: "Seats 80%, storage 64%, API calls 91%. These are demonstration values.", tone: "accent" })}>View usage</Button>
      </div>
    </Card>
  );
}

/* ------------------------------- Onboarding ------------------------------- */

export function OnboardingBlock() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("Alex Morgan");
  const [email, setEmail] = useState("alex@studio.design");
  const [workspace, setWorkspace] = useState("");
  const [team, setTeam] = useState("2-10");
  const [invite, setInvite] = useState("");
  const [attempted, setAttempted] = useState(false);
  const next = () => {
    setAttempted(true);
    if (step === 0 && (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) return;
    if (step === 1 && !workspace.trim()) return;
    setAttempted(false); setStep((s) => Math.min(3, s + 1));
  };
  const steps = [{ title: "Account" }, { title: "Workspace" }, { title: "Invite team" }, { title: "Finish" }];
  return (
    <Card className="w-full max-w-[560px] overflow-hidden">
      <div className="border-b border-separator px-6 py-5">
        <HorizontalStepper steps={steps} current={step} />
      </div>
      <div className="px-6 py-6">
        {step === 0 && <div className="space-y-4"><h3 className="text-label-lg">A little about you</h3><Input label="Your name" value={name} onChange={(e) => setName(e.target.value)} required error={attempted && !name.trim() ? "Enter your name." : undefined} /><Input label="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required error={attempted && !email.includes("@") ? "Enter a valid email." : undefined} /></div>}
        {step === 1 && <><h3 className="text-label-lg text-foreground">Create your workspace</h3><p className="mt-1 text-paragraph-sm text-muted">A workspace is where your team's projects live.</p>
          <div className="mt-5 grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(190px,100%),1fr))" }}><Input label="Workspace name" placeholder="Studio workspace" value={workspace} onChange={(e) => setWorkspace(e.target.value)} error={attempted && !workspace.trim() ? "Name your workspace to continue." : undefined} /><Input label="Workspace URL" value={workspace.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-")} placeholder="studio" prefixAffix="app.io/" readOnly /></div>
          <div className="mt-5"><p className="mb-2 text-label-sm text-foreground">Team size</p><div className="flex flex-wrap gap-2">{[{ value: "1", label: "Just me" }, { value: "2-10", label: "2-10" }, { value: "11-50", label: "11-50" }, { value: "50+", label: "50+" }].map((size) => <Button size="sm" key={size.value} tone="default" variant={size.value === team ? "solid" : "outline"} aria-pressed={size.value === team} onClick={() => setTeam(size.value)}>{size.label}</Button>)}</div></div>
        </>}
        {step === 2 && <div className="space-y-4"><h3 className="text-label-lg">Build together</h3><p className="text-paragraph-sm text-muted">Add a teammate to the preview, or finish without an invitation.</p><Input label="Teammate email (optional)" type="email" placeholder="teammate@company.com" value={invite} onChange={(e) => setInvite(e.target.value)} /></div>}
        {step === 3 && <div className="space-y-4 text-center" role="status"><Check className="mx-auto h-8 w-8 text-success" /><h3 className="text-title-h6">{workspace || "Your workspace"} is ready</h3><p className="text-paragraph-sm text-muted">Created in the local preview for {name}. No account or invitation was sent.</p><Button variant="outline" tone="default" onClick={() => { setStep(0); setWorkspace(""); }}>Start another</Button></div>}
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-separator bg-surface-secondary/60 px-4 py-4 sm:px-6">
        <Button variant="ghost" tone="default" disabled={step === 0} onClick={() => { setAttempted(false); setStep((s) => Math.max(0, s - 1)); }}>Back</Button>
        <div className="flex items-center gap-3">
          <span className="hidden text-paragraph-xs text-subtle sm:inline">Step {step + 1} of {steps.length}</span>
          {step < 3 && <Button onClick={next} endContent={<ArrowRight />}>{step === 2 ? "Finish setup" : "Continue"}</Button>}
        </div>
      </div>
    </Card>
  );
}

/* ------------------------------ Verification ------------------------------ */

export function VerifyBlock() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  return (
    <Card elevation={3} className="w-full max-w-[400px] p-7 text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-surface-secondary ring-1 ring-border"><Mail className="h-6 w-6 text-foreground" /></span>
      <h3 className="mt-4 text-title-h6 text-foreground">Check your email</h3>
      <p className="mt-1 text-paragraph-sm text-muted">Try the four-digit verification flow. The demo code is <strong>1234</strong>.</p>
      <div className="mt-6 flex justify-center"><DigitInput length={4} value={code} error={status === "error"} onChange={(value) => { setCode(value); setStatus("idle"); }} /></div>
      <div className="mt-3 flex justify-center"><Hint>{status === "error" ? "Incorrect code. Try 1234." : status === "success" ? "Verified in this preview." : "Paste a code or enter each digit."}</Hint></div>
      <Button fullWidth className="mt-6" disabled={code.length < 4} onClick={() => setStatus(code === "1234" ? "success" : "error")}>{status === "success" ? "Verified" : "Verify"}</Button>
      <p className="mt-4 text-paragraph-sm text-muted"><LinkButton variant="black" size="sm" onClick={() => { setCode(""); setStatus("idle"); }}>Reset verification</LinkButton></p>
    </Card>
  );
}

/* --------------------------------- Registry -------------------------------- */

export type BlockDef = { key: string; title: string; category: string; description: string; render: () => ReactNode; span?: 1 | 2 | 3; width?: number; pro?: boolean };

export const BLOCKS: BlockDef[] = [
  { key: "auth", title: "Auth Card", category: "Authentication", description: "Login with social sign-in, remember me and password reveal.", render: () => <AuthCardBlock />, width: 400 },
  { key: "verify", title: "Verification", category: "Authentication", description: "OTP entry with digit inputs, paste support and validation.", render: () => <VerifyBlock />, width: 400 },
  { key: "onboarding", title: "Onboarding", category: "Forms", description: "Stepper-driven wizard with segmented team-size picker.", render: () => <OnboardingBlock />, span: 2, width: 560, pro: true },
  { key: "stats", title: "Stats & Metrics", category: "Dashboard", description: "KPI cards with delta chips and overflow actions.", render: () => <StatsBlock />, span: 2, width: 760 },
  { key: "table", title: "Data Table", category: "Dashboard", description: "Selectable rows, inline usage bars, status chips and toolbar.", render: () => <TableBlock />, span: 3, width: 980, pro: true },
  { key: "command", title: "Command Menu", category: "Navigation", description: "Grouped commands with keyboard hints.", render: () => <CommandMenuBlock />, span: 2, width: 520, pro: true },
  { key: "profile", title: "Profile Card", category: "Social", description: "Cover, verified badge, follow toggle and stat strip.", render: () => <ProfileCardBlock />, width: 360 },
  { key: "notification", title: "Notification", category: "Feedback", description: "Activity feed with unread indicators.", render: () => <NotificationBlock />, width: 400 },
  { key: "upload", title: "File Upload", category: "Forms", description: "Drop zone with in-progress and completed files.", render: () => <FileUploadBlock />, width: 420 },
  { key: "usage", title: "Plan Usage", category: "Dashboard", description: "Circular and linear progress with team avatars.", render: () => <UsageBlock />, width: 380 },
  { key: "settings", title: "Settings Form", category: "Forms", description: "Tabbed settings with radios, switches and a sticky action bar.", render: () => <SettingsBlock />, span: 2, width: 640, pro: true },
  { key: "rating", title: "Rating", category: "Feedback", description: "Five-star rating with hover preview.", render: () => <RatingBlock />, width: 380 },
  { key: "pricing", title: "Pricing", category: "Marketing", description: "Three tiers with annual toggle and highlighted plan.", render: () => <PricingBlock />, span: 3, width: 900, pro: true },
];
