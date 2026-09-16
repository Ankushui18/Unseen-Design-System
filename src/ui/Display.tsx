import { useState, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";
import type { Tone } from "./Button";
import { useCopy } from "../lib/hooks";
import { RiCheckLine, RiCheckboxCircleLine, RiCloseCircleLine, RiErrorWarningLine, RiFileCopyLine, RiInformationLine } from "@remixicon/react";

/* ---------------------------------- Card ---------------------------------- */

export function Card({
  className,
  children,
  interactive,
  elevation = 1,
  ...props
}: HTMLAttributes<HTMLDivElement> & { interactive?: boolean; elevation?: 0 | 1 | 2 | 3 | 4 }) {
  const shadow = ["", "shadow-xs", "shadow-sm", "shadow-md", "shadow-lg"][elevation];
  return (
    <div
      className={cn(
        "min-w-0 rounded-xl bg-surface text-foreground ring-1 ring-border",
        shadow,
        interactive &&
          "cursor-pointer transition-[box-shadow,transform] duration-200 ease-out-quint hover:-translate-y-0.5 hover:shadow-md hover:ring-border-strong",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export const CardHeader = ({ className, ...p }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col gap-1 p-5 pb-3", className)} {...p} />
);
export const CardBody = ({ className, ...p }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-5 pt-0 text-paragraph-sm text-muted", className)} {...p} />
);
export const CardFooter = ({ className, ...p }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-wrap items-center gap-3 border-t border-separator px-5 py-4", className)} {...p} />
);

/* ------------------------------- Chip / Badge ------------------------------ */

export type BadgeColor = "gray" | "blue" | "orange" | "red" | "green" | "yellow" | "purple" | "sky" | "pink" | "teal";
export type BadgeVariant = "filled" | "light" | "lighter" | "stroke";

const toneToColor: Record<Tone, BadgeColor> = { accent: "blue", default: "gray", success: "green", warning: "orange", danger: "red" };

const badgeColor: Record<BadgeColor, Record<BadgeVariant, string>> = {
  gray:   { filled: "bg-gray-base text-white",   light: "bg-gray-light text-gray-dark",     lighter: "bg-gray-lighter text-gray-base",     stroke: "text-gray-base ring-1 ring-inset ring-current" },
  blue:   { filled: "bg-blue-base text-white",   light: "bg-blue-light text-blue-dark",     lighter: "bg-blue-lighter text-blue-base",     stroke: "text-blue-base ring-1 ring-inset ring-current" },
  orange: { filled: "bg-orange-base text-white", light: "bg-orange-light text-orange-dark", lighter: "bg-orange-lighter text-orange-base", stroke: "text-orange-base ring-1 ring-inset ring-current" },
  red:    { filled: "bg-red-base text-white",    light: "bg-red-light text-red-dark",       lighter: "bg-red-lighter text-red-base",       stroke: "text-red-base ring-1 ring-inset ring-current" },
  green:  { filled: "bg-green-base text-white",  light: "bg-green-light text-green-dark",   lighter: "bg-green-lighter text-green-base",   stroke: "text-green-base ring-1 ring-inset ring-current" },
  yellow: { filled: "bg-yellow-base text-white", light: "bg-yellow-light text-yellow-dark", lighter: "bg-yellow-lighter text-yellow-base", stroke: "text-yellow-base ring-1 ring-inset ring-current" },
  purple: { filled: "bg-purple-base text-white", light: "bg-purple-light text-purple-dark", lighter: "bg-purple-lighter text-purple-base", stroke: "text-purple-base ring-1 ring-inset ring-current" },
  sky:    { filled: "bg-sky-base text-white",    light: "bg-sky-light text-sky-dark",       lighter: "bg-sky-lighter text-sky-base",       stroke: "text-sky-base ring-1 ring-inset ring-current" },
  pink:   { filled: "bg-pink-base text-white",   light: "bg-pink-light text-pink-dark",     lighter: "bg-pink-lighter text-pink-base",     stroke: "text-pink-base ring-1 ring-inset ring-current" },
  teal:   { filled: "bg-teal-base text-white",   light: "bg-teal-light text-teal-dark",     lighter: "bg-teal-lighter text-teal-base",     stroke: "text-teal-base ring-1 ring-inset ring-current" },
};

/* kept for internal consumers (Alert, Avatar, Badge counter) */
const chipTones: Record<Tone, { solid: string; soft: string; outline: string; dot: string }> = {
  accent:  { solid: "bg-accent text-accent-foreground", soft: "bg-accent-soft text-accent-soft-foreground", outline: "bg-surface text-accent ring-1 ring-inset ring-accent/30", dot: "bg-accent" },
  default: { solid: "bg-default text-default-foreground", soft: "bg-surface-secondary text-muted", outline: "bg-surface text-muted ring-1 ring-inset ring-border", dot: "bg-subtle" },
  success: { solid: "bg-success text-success-foreground", soft: "bg-success-soft text-success-soft-foreground", outline: "bg-surface text-success-soft-foreground ring-1 ring-inset ring-success/30", dot: "bg-success" },
  warning: { solid: "bg-warning text-warning-foreground", soft: "bg-warning-soft text-warning-soft-foreground", outline: "bg-surface text-warning-soft-foreground ring-1 ring-inset ring-warning/30", dot: "bg-warning" },
  danger:  { solid: "bg-danger text-danger-foreground", soft: "bg-danger-soft text-danger-soft-foreground", outline: "bg-surface text-danger-soft-foreground ring-1 ring-inset ring-danger/30", dot: "bg-danger" },
};

export function Chip({
  children,
  tone,
  color,
  variant = "lighter",
  size = "md",
  dot,
  square,
  disabled,
  onClose,
  startContent,
  className,
}: {
  children?: ReactNode;
  /** legacy semantic alias — maps to a colour */
  tone?: Tone;
  color?: BadgeColor;
  variant?: BadgeVariant | "solid" | "soft" | "outline";
  size?: "sm" | "md" | "lg";
  dot?: boolean;
  square?: boolean;
  disabled?: boolean;
  onClose?: () => void;
  startContent?: ReactNode;
  className?: string;
}) {
  const c: BadgeColor = color ?? (tone ? toneToColor[tone] : "gray");
  const v: BadgeVariant = variant === "solid" ? "filled" : variant === "soft" ? "lighter" : variant === "outline" ? "stroke" : variant;
  const semantic = chipTones[tone ?? "default"];
  const treatment = color ? badgeColor[c][v] : v === "filled" ? semantic.solid : v === "stroke" ? semantic.outline : semantic.soft;
  const sz = {
    sm: "min-h-5 gap-1 px-2 py-0.5 text-[11px] leading-4",
    md: "min-h-6 gap-1.5 px-2.5 py-0.5 text-label-xs",
    lg: "min-h-7 gap-1.5 px-3 py-1 text-label-xs",
  }[size];
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-md font-medium normal-case tracking-normal whitespace-nowrap transition-colors duration-150",
        sz,
        square && "aspect-square px-1",
        disabled ? "bg-transparent text-disabled ring-1 ring-inset ring-border" : treatment,
        className,
      )}
    >
      {dot && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" aria-hidden />}
      {startContent && <span className="flex shrink-0 items-center justify-center [&_svg]:h-3.5 [&_svg]:w-3.5" aria-hidden>{startContent}</span>}
      {children}
      {onClose && (
        <button type="button" disabled={disabled} onClick={onClose} className="-mr-1 ml-0.5 flex h-4 w-4 items-center justify-center rounded-sm opacity-70 transition hover:bg-black/10 hover:opacity-100 dark:hover:bg-white/15" aria-label={typeof children === "string" ? `Remove ${children}` : "Remove label"}>
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      )}
    </span>
  );
}

export const Badge_ = Chip;

/* --------------------------------- Badge ---------------------------------- */

export function Badge({
  children,
  content,
  tone = "danger",
  placement = "top-right",
  dot,
}: {
  children: ReactNode;
  content?: ReactNode;
  tone?: Tone;
  placement?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  dot?: boolean;
}) {
  const pos = {
    "top-right": "-top-1 -right-1",
    "top-left": "-top-1 -left-1",
    "bottom-right": "-bottom-1 -right-1",
    "bottom-left": "-bottom-1 -left-1",
  }[placement];
  return (
    <span className="relative inline-flex">
      {children}
      <span
        className={cn(
          "absolute z-10 flex items-center justify-center rounded-full border-2 border-background font-medium tabular-nums",
          dot ? "h-3 w-3" : "h-5 min-w-5 px-1 text-[10px]",
          chipTones[tone].solid,
          pos,
        )}
      >
        {!dot && content}
      </span>
    </span>
  );
}

/* --------------------------------- Avatar --------------------------------- */

export function Avatar({
  name,
  src,
  size = "md",
  square,
  tone = "default",
  status,
  className,
}: {
  name?: string;
  src?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  square?: boolean;
  tone?: Tone;
  status?: "online" | "offline" | "busy";
  className?: string;
}) {
  const s = { xs: "h-6 w-6 text-[10px]", sm: "h-8 w-8 text-label-xs", md: "h-10 w-10 text-label-sm", lg: "h-12 w-12 text-label-md", xl: "h-16 w-16 text-label-xl" }[size];
  const initials = (name ?? "")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span className="relative inline-flex shrink-0">
      <span
        className={cn(
          "inline-flex items-center justify-center overflow-hidden font-medium select-none",
          square ? "rounded-lg" : "rounded-full",
          s,
          chipTones[tone].soft,
          className,
        )}
      >
        {src ? <img src={src} alt={name} className="h-full w-full object-cover" /> : initials || "?"}
      </span>
      {status && (
        <span
          className={cn(
            "absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border-2 border-background",
            status === "online" && "bg-success",
            status === "offline" && "bg-subtle",
            status === "busy" && "bg-danger",
          )}
        />
      )}
    </span>
  );
}

export function AvatarGroup({ items, max = 4, size = "md" }: { items: { name: string; src?: string }[]; max?: number; size?: "xs" | "sm" | "md" | "lg" }) {
  const shown = items.slice(0, max);
  const rest = items.length - shown.length;
  return (
    <div className="flex items-center -space-x-2">
      {shown.map((it, i) => (
        <span key={i} className="rounded-full ring-2 ring-background">
          <Avatar {...it} size={size} tone={(["accent", "success", "warning", "danger", "default"] as Tone[])[i % 5]} />
        </span>
      ))}
      {rest > 0 && (
        <span className="rounded-full ring-2 ring-background">
          <Avatar name={`+${rest}`} size={size} />
        </span>
      )}
    </div>
  );
}

/* ---------------------------------- Kbd ----------------------------------- */

export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded-[5px] bg-surface px-1.5 font-mono text-[10px] font-medium text-subtle ring-1 ring-border shadow-[0_1px_0_0_var(--border)]">
      {children}
    </kbd>
  );
}

/* --------------------------------- Snippet -------------------------------- */

export function Snippet({ children, className, symbol = "$" }: { children: string; className?: string; symbol?: string }) {
  const { copied, copy } = useCopy();
  return (
    <div className={cn("group flex items-center justify-between gap-4 rounded-10 bg-surface px-3.5 py-2.5 ring-1 ring-border shadow-xs", className)}>
      <code className="overflow-x-auto font-mono text-paragraph-sm whitespace-nowrap text-foreground no-scrollbar">
        {symbol && <span className="mr-2 select-none text-subtle">{symbol}</span>}
        {children}
      </code>
      <button
        onClick={() => copy(children)}
        className="shrink-0 rounded-md p-1.5 text-subtle transition hover:bg-surface-hover hover:text-foreground"
        aria-label="Copy"
      >
        {copied ? <RiCheckLine className="h-3.5 w-3.5 text-success" /> : <RiFileCopyLine className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}

/* --------------------------------- Divider -------------------------------- */

export function Divider({ orientation = "horizontal", label, className }: { orientation?: "horizontal" | "vertical"; label?: string; className?: string }) {
  if (orientation === "vertical") return <span className={cn("inline-block w-px self-stretch bg-separator", className)} />;
  if (label)
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <span className="h-px flex-1 bg-separator" />
        <span className="text-paragraph-xs font-medium tracking-wide text-subtle uppercase">{label}</span>
        <span className="h-px flex-1 bg-separator" />
      </div>
    );
  return <hr className={cn("h-px border-0 bg-separator", className)} />;
}

/* -------------------------------- Skeleton -------------------------------- */

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("animate-shimmer rounded-md bg-surface-secondary", className)}
      style={{
        backgroundImage:
          "linear-gradient(90deg, transparent 0%, color-mix(in oklab, var(--foreground) 8%, transparent) 50%, transparent 100%)",
        backgroundSize: "200% 100%",
        backgroundColor: "var(--surface-secondary)",
      }}
    />
  );
}

/* -------------------------------- Progress -------------------------------- */

export function Progress({
  value,
  tone = "accent",
  size = "md",
  label,
  showValue,
  indeterminate,
  className,
}: {
  value?: number;
  tone?: Tone;
  size?: "sm" | "md" | "lg";
  label?: ReactNode;
  showValue?: boolean;
  indeterminate?: boolean;
  className?: string;
}) {
  const h = { sm: "h-1", md: "h-2", lg: "h-3" }[size];
  const bg = { accent: "bg-accent", default: "bg-foreground", success: "bg-success", warning: "bg-warning", danger: "bg-danger" }[tone];
  return (
    <div className={cn("flex w-full flex-col gap-1.5", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between text-paragraph-sm">
          {label && <span className="font-medium text-foreground">{label}</span>}
          {showValue && <span className="font-mono text-paragraph-xs tabular-nums text-muted">{Math.round(value ?? 0)}%</span>}
        </div>
      )}
      <div className={cn("w-full overflow-hidden rounded-full bg-default", h)}>
        <div
          className={cn("h-full rounded-full", bg, indeterminate && "w-1/4 animate-indeterminate")}
          style={indeterminate ? undefined : { width: `${Math.min(100, Math.max(0, value ?? 0))}%`, transition: "width .5s var(--ease-out-quint)" }}
        />
      </div>
    </div>
  );
}

export function CircularProgress({ value = 0, size = 56, stroke = 5, tone = "accent", label }: { value?: number; size?: number; stroke?: number; tone?: Tone; label?: ReactNode }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const color = { accent: "var(--accent)", default: "var(--foreground)", success: "var(--success)", warning: "var(--warning)", danger: "var(--danger)" }[tone];
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--default)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (c * Math.min(100, Math.max(0, value))) / 100}
          className="transition-[stroke-dashoffset] duration-500 ease-out-quint"
        />
      </svg>
      <span className="absolute font-mono text-[11px] font-medium tabular-nums">{label ?? `${Math.round(value)}%`}</span>
    </div>
  );
}

/* ---------------------------------- Alert --------------------------------- */

const alertIcons = {
  accent: RiInformationLine,
  default: RiInformationLine,
  success: RiCheckboxCircleLine,
  warning: RiErrorWarningLine,
  danger: RiCloseCircleLine,
};

export function Alert({
  title,
  children,
  tone = "accent",
  variant = "soft",
  onClose,
  action,
  className,
}: {
  title?: ReactNode;
  children?: ReactNode;
  tone?: Tone;
  variant?: "soft" | "outline" | "solid";
  onClose?: () => void;
  action?: ReactNode;
  className?: string;
}) {
  const Icon = alertIcons[tone];
  const iconColor = { accent: "text-accent", default: "text-muted", success: "text-success", warning: "text-warning", danger: "text-danger" }[tone];
  const styles = {
    soft: chipTones[tone].soft,
    outline: "bg-surface text-foreground ring-1 ring-border shadow-sm",
    solid: chipTones[tone].solid,
  }[variant];
  return (
    <div className={cn("flex items-start gap-3 rounded-xl p-3.5", styles, className)} role="alert">
      <Icon className={cn("mt-px h-5 w-5 shrink-0", variant === "outline" && iconColor)} />
      <div className="flex-1 space-y-0.5">
        {title && <p className="text-label-sm">{title}</p>}
        {children && <div className={cn("text-paragraph-sm", variant === "solid" ? "opacity-90" : variant === "outline" ? "text-muted" : "opacity-85")}>{children}</div>}
        {action && <div className="pt-2">{action}</div>}
      </div>
      {onClose && (
        <button onClick={onClose} className="rounded-md p-1 opacity-60 transition hover:bg-black/10 hover:opacity-100 dark:hover:bg-white/10" aria-label="Dismiss">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      )}
    </div>
  );
}

/* ---------------------------------- Code ---------------------------------- */

export function Code({ children, tone = "default" }: { children: ReactNode; tone?: Tone }) {
  return <code className={cn("rounded-md px-1.5 py-0.5 font-mono text-[0.85em]", chipTones[tone].soft)}>{children}</code>;
}

/* -------------------------------- ScrollShadow ----------------------------- */

export function ScrollShadow({ children, className, maxHeight = 220 }: { children: ReactNode; className?: string; maxHeight?: number }) {
  const [state, setState] = useState({ top: false, bottom: true });
  return (
    <div className="relative">
      <div
        className={cn("ds-scroll overflow-y-auto", className)}
        style={{ maxHeight }}
        onScroll={(e) => {
          const el = e.currentTarget;
          setState({ top: el.scrollTop > 4, bottom: el.scrollTop + el.clientHeight < el.scrollHeight - 4 });
        }}
      >
        {children}
      </div>
      <div className={cn("pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-surface to-transparent transition-opacity", state.top ? "opacity-100" : "opacity-0")} />
      <div className={cn("pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-surface to-transparent transition-opacity", state.bottom ? "opacity-100" : "opacity-0")} />
    </div>
  );
}
