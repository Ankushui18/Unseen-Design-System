import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  RiArrowDownSLine,
  RiAttachment2,
  RiCheckLine,
  RiCloseLine,
  RiErrorWarningFill,
  RiInformationFill,
  RiMicLine,
  RiSearchLine,
  RiSendPlane2Fill,
  RiSparkling2Line,
} from "@remixicon/react";
import { cn } from "../utils/cn";
import { Button, type Tone } from "./Button";
import { Avatar } from "./Display";
import { Modal } from "./Overlay";
import { useOnClickOutside } from "../lib/hooks";

/* -------------------------------- Button Tile ------------------------------ */

export function ButtonTile({ icon, label, description, variant = "soft", selected, onClick, disabled, badge, className }: { icon: ReactNode; label: ReactNode; description?: ReactNode; variant?: "soft" | "solid" | "outline"; selected?: boolean; onClick?: () => void; disabled?: boolean; badge?: ReactNode; className?: string }) {
  const base = {
    soft: "bg-surface ring-1 ring-border hover:-translate-y-0.5 hover:shadow-md hover:ring-border-strong",
    solid: "bg-default text-white ring-1 ring-default hover:-translate-y-0.5 hover:shadow-md dark:text-neutral-950",
    outline: "bg-transparent ring-1 ring-border hover:-translate-y-0.5 hover:bg-surface",
  }[variant];
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={cn(
        "group relative flex flex-col items-start gap-3 rounded-14 p-4 text-left transition duration-200 ease-out outline-none",
        selected ? "bg-accent text-white shadow-sm ring-2 ring-accent" : base,
        "focus-visible:shadow-ring-neutral disabled:pointer-events-none disabled:bg-surface-secondary disabled:text-disabled",
        className,
      )}
    >
      <span className={cn("flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-inset transition-colors [&_svg]:h-5 [&_svg]:w-5", selected ? "bg-accent text-white ring-accent" : variant === "solid" ? "bg-white/10 text-current ring-white/25 dark:bg-black/10" : "bg-surface-secondary text-foreground ring-border")}>{icon}</span>
      <span className="min-w-0">
        <span className={cn("block text-label-sm", variant === "solid" && !selected ? "text-current" : "text-foreground")}>{label}</span>
        {description && <span className={cn("mt-0.5 block text-paragraph-xs", variant === "solid" && !selected ? "text-white/70 dark:text-neutral-950/60" : "text-muted")}>{description}</span>}
      </span>
      {badge && <span className="absolute top-3 right-3">{badge}</span>}
      {selected && <span className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-white"><RiCheckLine size={12} /></span>}
    </button>
  );
}

/* -------------------------------- Info Label ------------------------------- */

export function InfoLabel({ label, value, hint, tone = "default", className }: { label: ReactNode; value: ReactNode; hint?: ReactNode; tone?: Tone; className?: string }) {
  const v = { accent: "text-accent", default: "text-foreground", success: "text-green-base", warning: "text-orange-base", danger: "text-red-base" }[tone];
  return (
    <div className={cn("flex flex-col gap-0.5", className)}>
      <span className="flex items-center gap-1 text-subheading-2xs uppercase text-subtle">{label}{hint && <RiInformationFill size={12} className="text-subtle/70" />}</span>
      <span className={cn("text-label-md tabular-nums", v)}>{value}</span>
      {hint && <span className="text-paragraph-xs text-subtle">{hint}</span>}
    </div>
  );
}

/* ------------------------------ Inline Message ----------------------------- */

export function InlineMessage({ children, tone = "accent", className }: { children: ReactNode; tone?: Tone; className?: string }) {
  const c = { accent: "text-accent", default: "text-muted", success: "text-green-base", warning: "text-orange-base", danger: "text-red-base" }[tone];
  const Icon = tone === "danger" || tone === "warning" ? RiErrorWarningFill : RiInformationFill;
  return (
    <p className={cn("inline-flex items-start gap-1.5 text-paragraph-xs", c, className)}>
      <Icon size={16} className="mt-px shrink-0" />
      <span className="text-foreground/80">{children}</span>
    </p>
  );
}

/* --------------------------------- List Item ------------------------------- */

export function ListItem({ leading, title, description, trailing, onClick, selected, className, meta }: { leading?: ReactNode; title: ReactNode; description?: ReactNode; trailing?: ReactNode; onClick?: () => void; selected?: boolean; className?: string; meta?: ReactNode }) {
  const Comp: "button" | "div" = onClick ? "button" : "div";
  return (
    <Comp
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 rounded-10 px-3 py-2.5 text-left transition-colors",
        onClick && "hover:bg-surface-hover focus-visible:shadow-ring-neutral outline-none",
        selected && "bg-accent-soft/50",
        className,
      )}
    >
      {leading && <span className="shrink-0 [&_svg]:h-5 [&_svg]:w-5 [&_svg]:text-muted">{leading}</span>}
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2"><span className="truncate text-label-sm text-foreground">{title}</span>{meta}</span>
        {description && <span className="block truncate text-paragraph-xs text-muted">{description}</span>}
      </span>
      {trailing && <span className="shrink-0 text-subtle [&_svg]:h-5 [&_svg]:w-5">{trailing}</span>}
    </Comp>
  );
}

/* ---------------------------------- Toolbar -------------------------------- */

export function Toolbar({ children, variant = "solid", className }: { children: ReactNode; variant?: "solid" | "floating"; className?: string }) {
  const v = variant === "floating" ? "rounded-full bg-overlay shadow-lg ring-1 ring-border-strong" : "rounded-12 bg-surface shadow-md ring-1 ring-border";
  return <div className={cn("inline-flex items-center gap-1 p-1", v, className)} role="toolbar">{children}</div>;
}
export function ToolbarButton({ icon, label, active, onClick, disabled }: { icon: ReactNode; label: string; active?: boolean; onClick?: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-pressed={active}
      title={label}
      className={cn("flex h-8 w-8 items-center justify-center rounded-8 transition-colors outline-none focus-visible:shadow-ring-neutral disabled:text-disabled [&_svg]:h-[18px] [&_svg]:w-[18px]", active ? "bg-surface-secondary text-foreground" : "text-muted hover:bg-surface-hover hover:text-foreground")}
    >
      {icon}
    </button>
  );
}
export const ToolbarSeparator = () => <span className="mx-0.5 h-5 w-px bg-separator" />;

/* -------------------------------- Hover Card ------------------------------- */

export function HoverCard({ trigger, children, className }: { trigger: ReactNode; children: ReactNode; className?: string }) {
  const [open, setOpen] = useState(false);
  const t = useRef<number | null>(null);
  const show = () => { if (t.current) window.clearTimeout(t.current); t.current = window.setTimeout(() => setOpen(true), 250); };
  const hide = () => { if (t.current) window.clearTimeout(t.current); t.current = window.setTimeout(() => setOpen(false), 150); };
  return (
    <span className="relative inline-flex" onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
      {trigger}
      {open && (
        <div className={cn("animate-pop-in absolute top-full left-0 z-50 mt-2 w-72 rounded-14 bg-overlay p-4 shadow-lg ring-1 ring-border", className)} onMouseEnter={show} onMouseLeave={hide}>
          {children}
        </div>
      )}
    </span>
  );
}

export function ProfileHoverCard({ name, handle, bio, avatarTone = "accent", stats, action }: { name: string; handle: string; bio: string; avatarTone?: Tone; stats?: [string, string][]; action?: ReactNode }) {
  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <Avatar name={name} size="lg" tone={avatarTone} />
        {action}
      </div>
      <p className="mt-3 text-label-md text-foreground">{name}</p>
      <p className="text-paragraph-xs text-subtle">{handle}</p>
      <p className="mt-2 text-paragraph-sm text-muted">{bio}</p>
      {stats && (
        <div className="mt-3 flex gap-4">
          {stats.map(([v, l]) => (
            <span key={l} className="text-paragraph-xs text-subtle"><span className="text-label-sm text-foreground">{v}</span> {l}</span>
          ))}
        </div>
      )}
    </>
  );
}

/* --------------------------------- Chat Input ------------------------------ */

export function ChatInput({ value, onChange, onSend, placeholder = "Ask anything…", suggestions, className }: { value: string; onChange: (v: string) => void; onSend?: () => void; placeholder?: string; suggestions?: string[]; className?: string }) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = Math.min(160, el.scrollHeight) + "px";
  }, [value]);
  return (
    <div className={cn("w-full max-w-2xl", className)}>
      {suggestions && suggestions.length > 0 && !value && (
        <div className="mb-2.5 flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button key={s} onClick={() => onChange(s)} className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-label-xs text-muted ring-1 ring-inset ring-border transition hover:bg-surface-hover hover:text-foreground">
              <RiSparkling2Line size={14} className="text-accent" />{s}
            </button>
          ))}
        </div>
      )}
      <div className="rounded-20 bg-surface p-2 shadow-md ring-1 ring-border transition focus-within:ring-foreground focus-within:shadow-ring-neutral">
        <textarea
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onSend?.(); } }}
          rows={1}
          placeholder={placeholder}
          className="ds-scroll block w-full resize-none bg-transparent px-2.5 pt-2 text-paragraph-sm text-foreground outline-none placeholder:text-field-placeholder"
        />
        <div className="mt-1.5 flex items-center gap-1">
          <button className="flex h-8 w-8 items-center justify-center rounded-8 text-muted transition hover:bg-surface-hover hover:text-foreground" aria-label="Attach"><RiAttachment2 size={18} /></button>
          <button className="flex h-8 w-8 items-center justify-center rounded-8 text-muted transition hover:bg-surface-hover hover:text-foreground" aria-label="Voice"><RiMicLine size={18} /></button>
          <span className="ml-1 hidden items-center gap-1 rounded-6 bg-surface-secondary px-2 py-1 text-label-xs text-muted sm:inline-flex"><RiSparkling2Line size={14} className="text-accent" /> Unseen 3.2</span>
          <div className="flex-1" />
          <span className="hidden text-paragraph-xs text-subtle sm:inline">Shift + ↵ for new line</span>
          <button onClick={onSend} disabled={!value.trim()} className="ml-2 flex h-8 w-8 items-center justify-center rounded-8 bg-neutral-950 text-white transition hover:bg-neutral-800 disabled:bg-surface-secondary disabled:text-disabled dark:bg-white dark:text-neutral-950" aria-label="Send"><RiSendPlane2Fill size={16} /></button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- Alert Dialog ------------------------------ */

export function AlertDialog({ open, onClose, onConfirm, title, description, confirmLabel = "Confirm", cancelLabel = "Cancel", tone = "danger", icon }: { open: boolean; onClose: () => void; onConfirm: () => void; title: ReactNode; description: ReactNode; confirmLabel?: string; cancelLabel?: string; tone?: "danger" | "accent" | "default"; icon: ReactNode }) {
  return (
    <Modal open={open} onClose={onClose} size="sm" icon={icon} iconTone={tone} title={title} description={description} footer={<><Button variant="outline" tone="default" onClick={onClose}>{cancelLabel}</Button><Button tone={tone} onClick={() => { onConfirm(); onClose(); }}>{confirmLabel}</Button></>} />
  );
}

/* --------------------------------- Combobox -------------------------------- */

export function Combobox<T extends { value: string; label: string; description?: string; icon?: ReactNode }>({ items, value, onChange, placeholder = "Select…", label, size = "md", className }: { items: T[]; value: string | null; onChange: (v: string) => void; placeholder?: string; label?: string; size?: "sm" | "md" | "lg"; className?: string }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [cursor, setCursor] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setOpen(false), open);
  const filtered = useMemo(() => items.filter((i) => i.label.toLowerCase().includes(q.toLowerCase())), [items, q]);
  const selected = items.find((i) => i.value === value);
  useEffect(() => setCursor(0), [q]);
  const h = { sm: "h-8 rounded-8 px-2.5", md: "h-10 rounded-10 px-3", lg: "h-12 rounded-12 px-3.5" }[size];
  return (
    <div ref={ref} className={cn("relative flex w-full flex-col gap-1.5", className)}>
      {label && <span className="text-label-sm text-foreground">{label}</span>}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={cn("flex w-full items-center gap-2 bg-field text-left shadow-xs ring-1 ring-inset ring-border transition duration-200 hover:bg-field-hover hover:shadow-none outline-none focus-visible:ring-foreground focus-visible:shadow-ring-neutral", open && "ring-foreground shadow-ring-neutral", h)}
      >
        {selected?.icon && <span className="text-muted [&_svg]:h-5 [&_svg]:w-5">{selected.icon}</span>}
        <span className={cn("flex-1 truncate text-paragraph-sm", selected ? "text-foreground" : "text-field-placeholder")}>{selected?.label ?? placeholder}</span>
        <RiArrowDownSLine size={20} className={cn("text-subtle transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="animate-pop-in absolute top-full left-0 z-50 mt-1.5 w-full overflow-hidden rounded-14 bg-overlay shadow-lg ring-1 ring-border">
          <div className="flex items-center gap-2 border-b border-separator px-3">
            <RiSearchLine size={18} className="text-subtle" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") { e.preventDefault(); setCursor((c) => Math.min(c + 1, filtered.length - 1)); }
                if (e.key === "ArrowUp") { e.preventDefault(); setCursor((c) => Math.max(c - 1, 0)); }
                if (e.key === "Enter" && filtered[cursor]) { onChange(filtered[cursor].value); setOpen(false); setQ(""); }
                if (e.key === "Escape") setOpen(false);
              }}
              placeholder="Search…"
              className="h-10 w-full bg-transparent text-paragraph-sm outline-none placeholder:text-field-placeholder"
            />
            {q && <button onClick={() => setQ("")} className="text-subtle hover:text-foreground"><RiCloseLine size={16} /></button>}
          </div>
          <ul role="listbox" className="ds-scroll max-h-56 overflow-y-auto p-1.5">
            {filtered.map((it, i) => (
              <li key={it.value}>
                <button
                  role="option"
                  aria-selected={it.value === value}
                  onMouseEnter={() => setCursor(i)}
                  onClick={() => { onChange(it.value); setOpen(false); setQ(""); }}
                  className={cn("flex w-full items-center gap-2.5 rounded-8 px-2.5 py-2 text-left text-paragraph-sm text-foreground transition-colors", i === cursor && "bg-surface-hover")}
                >
                  {it.icon && <span className="text-muted [&_svg]:h-5 [&_svg]:w-5">{it.icon}</span>}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate">{it.label}</span>
                    {it.description && <span className="block truncate text-paragraph-xs text-subtle">{it.description}</span>}
                  </span>
                  {it.value === value && <RiCheckLine size={16} className="text-accent" />}
                </button>
              </li>
            ))}
            {filtered.length === 0 && <li className="px-3 py-6 text-center text-paragraph-xs text-subtle">No results</li>}
          </ul>
        </div>
      )}
    </div>
  );
}

/* -------------------------------- Payment Card ----------------------------- */

export function PaymentCard({ brand = "visa", last4, holder, expiry, variant = "dark", className }: { brand?: "visa" | "mastercard" | "amex"; last4: string; holder: string; expiry: string; variant?: "dark" | "accent" | "light"; className?: string }) {
  const bg = {
    dark: "bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950 text-white",
    accent: "bg-gradient-to-br from-accent-500 via-accent-600 to-accent-800 text-white",
    light: "bg-gradient-to-br from-white to-neutral-100 text-neutral-950 ring-1 ring-border",
  }[variant];
  return (
    <div className={cn("relative aspect-[1.586] w-full max-w-[340px] overflow-hidden rounded-16 p-5 shadow-lg", bg, className)}>
      <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-black/10 blur-2xl" />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="h-8 w-11 rounded-6 bg-gradient-to-br from-yellow-200 to-yellow-500 opacity-90" />
          <span className="text-label-md italic tracking-wide uppercase opacity-90">
            {brand === "visa" ? "VISA" : brand === "mastercard" ? <span className="inline-flex -space-x-2.5 not-italic"><span className="h-6 w-6 rounded-full bg-red-base/90" /><span className="h-6 w-6 rounded-full bg-yellow-base/90" /></span> : "AMEX"}
          </span>
        </div>
        <p className="font-mono text-label-lg tracking-[0.18em] tabular-nums">•••• •••• •••• {last4}</p>
        <div className="flex items-end justify-between">
          <div><p className="text-subheading-2xs uppercase opacity-60">Card holder</p><p className="text-label-sm">{holder}</p></div>
          <div className="text-right"><p className="text-subheading-2xs uppercase opacity-60">Expires</p><p className="font-mono text-label-sm">{expiry}</p></div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- Wells ---------------------------------- */

export function Well({ children, variant = "default", className }: { children: ReactNode; variant?: "default" | "inset" | "dashed"; className?: string }) {
  return (
    <div className={cn("rounded-12 p-4", variant === "default" && "bg-surface-secondary ring-1 ring-inset ring-border/60", variant === "inset" && "bg-background-secondary shadow-[inset_0_1px_2px_rgb(14_18_27_/_0.06)]", variant === "dashed" && "border border-dashed border-border-strong bg-surface", className)}>
      {children}
    </div>
  );
}
