import { useEffect, useMemo, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";
import type { Tone } from "./Button";
import { RiArrowLeftSLine, RiArrowRightSLine, RiCheckLine, RiCheckboxCircleLine, RiCloseCircleLine, RiCloseLine, RiErrorWarningLine, RiInformationLine } from "@remixicon/react";

/* ------------------------------ Compact Button ----------------------------- */

export function CompactButton({
  variant = "stroke",
  size = "md",
  fullRadius,
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "stroke" | "ghost" | "white"; size?: "sm" | "md" | "lg"; fullRadius?: boolean }) {
  const s = { sm: "h-5 w-5 [&_svg]:h-3.5 [&_svg]:w-3.5", md: "h-6 w-6 [&_svg]:h-4 [&_svg]:w-4", lg: "h-7 w-7 [&_svg]:h-[18px] [&_svg]:w-[18px]" }[size];
  const v = {
    stroke: "bg-surface text-muted ring-1 ring-inset ring-border shadow-xs hover:bg-surface-hover hover:text-foreground",
    ghost: "text-subtle hover:bg-surface-hover hover:text-foreground",
    white: "bg-surface text-muted shadow-sm hover:text-foreground",
  }[variant];
  return (
    <button
      className={cn("inline-flex shrink-0 items-center justify-center transition-all outline-none focus-visible:shadow-ring-neutral disabled:pointer-events-none disabled:opacity-[var(--disabled-opacity)]", fullRadius ? "rounded-full" : "rounded-6", s, v, className)}
      {...props}
    >
      {children}
    </button>
  );
}

/* -------------------------------- Link Button ------------------------------ */

export function LinkButton({
  variant = "gray",
  size = "md",
  underline,
  className,
  children,
  startContent,
  endContent,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "gray" | "black" | "primary" | "error"; size?: "sm" | "md"; underline?: boolean; startContent?: ReactNode; endContent?: ReactNode }) {
  const v = {
    gray: "text-muted hover:text-foreground",
    black: "text-foreground hover:text-muted",
    primary: "text-accent hover:text-accent-hover",
    error: "text-danger hover:text-danger-hover",
  }[variant];
  return (
    <button
      className={cn(
        "inline-flex items-center gap-1 transition-colors outline-none focus-visible:rounded-6 focus-visible:shadow-ring-neutral disabled:pointer-events-none disabled:text-disabled",
        size === "sm" ? "text-label-xs [&_svg]:h-4 [&_svg]:w-4" : "text-label-sm [&_svg]:h-5 [&_svg]:w-5",
        underline && "underline decoration-current/40 underline-offset-[3px] hover:decoration-current",
        v,
        className,
      )}
      {...props}
    >
      {startContent}
      {children}
      {endContent}
    </button>
  );
}

/* ------------------------------ Social Button ------------------------------ */

const Brand = {
  google: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.5 5.5 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8Z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.2v3.1A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.2a12 12 0 0 0 0 10.8l4.1-3.1Z" />
      <path fill="#EA4335" d="M12 4.7c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.2 6.6l4.1 3.1c.9-2.9 3.6-5 6.7-5Z" />
    </svg>
  ),
  apple: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.8 1.3 10.3.9 1.2 1.9 2.6 3.3 2.6 1.3-.1 1.8-.9 3.4-.9s2 .9 3.4.8c1.4 0 2.3-1.3 3.2-2.5 1-1.4 1.4-2.8 1.4-2.9-.1 0-2.9-1.1-3-4.1ZM13.9 4.9c.7-.9 1.2-2.1 1.1-3.3-1 0-2.3.7-3 1.6-.7.8-1.2 2-1.1 3.2 1.1.1 2.3-.6 3-1.5Z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M18.2 2H21.5l-7.3 8.4L22.8 22h-6.7l-5.3-6.9L4.7 22H1.4l7.8-8.9L1 2h6.9l4.8 6.3L18.2 2Zm-1.2 18h1.9L7 3.9H5L17 20Z" />
    </svg>
  ),
} as const;

const brandStyles = {
  google: { brand: "bg-white text-neutral-950 ring-1 ring-inset ring-border shadow-xs hover:bg-neutral-50", stroke: "" },
  apple: { brand: "bg-black text-white hover:bg-neutral-800", stroke: "" },
  github: { brand: "bg-[#24292f] text-white hover:bg-[#1b1f24]", stroke: "" },
  x: { brand: "bg-black text-white hover:bg-neutral-800", stroke: "" },
};

export function SocialButton({
  brand,
  mode = "brand",
  size = "md",
  iconOnly,
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { brand: keyof typeof Brand; mode?: "brand" | "stroke"; size?: "sm" | "md" | "lg"; iconOnly?: boolean }) {
  const s = { sm: "h-8 px-2.5 text-label-sm gap-2 rounded-8", md: "h-10 px-3.5 text-label-sm gap-2.5 rounded-10", lg: "h-12 px-4 text-label-md gap-3 rounded-12" }[size];
  const w = { sm: "w-8", md: "w-10", lg: "w-12" }[size];
  const v = mode === "brand" ? brandStyles[brand].brand : "bg-surface text-foreground ring-1 ring-inset ring-border shadow-xs hover:bg-surface-hover";
  return (
    <button aria-label={iconOnly ? `Continue with ${brand === "x" ? "X" : brand[0].toUpperCase() + brand.slice(1)}` : undefined} className={cn("inline-flex shrink-0 items-center justify-center transition-all outline-none focus-visible:shadow-ring-neutral", s, iconOnly && cn(w, "px-0"), v, className)} {...props}>
      {Brand[brand]}
      {!iconOnly && children}
    </button>
  );
}

/* ------------------------------ Status Badge ------------------------------- */

export function StatusBadge({
  children,
  status = "completed",
  variant = "stroke",
  size = "md",
  className,
}: {
  children: ReactNode;
  status?: "completed" | "pending" | "failed" | "disabled" | "info";
  variant?: "stroke" | "light";
  size?: "sm" | "md";
  className?: string;
}) {
  const dot = { completed: "bg-success", pending: "bg-warning", failed: "bg-danger", disabled: "bg-subtle", info: "bg-accent" }[status];
  const light = { completed: "bg-success-soft text-success-soft-foreground", pending: "bg-warning-soft text-warning-soft-foreground", failed: "bg-danger-soft text-danger-soft-foreground", disabled: "bg-default text-muted", info: "bg-accent-soft text-accent-soft-foreground" }[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-6 whitespace-nowrap", size === "sm" ? "h-5 px-1.5 text-label-xs" : "h-6 px-2 text-label-xs", variant === "stroke" ? "bg-surface text-muted ring-1 ring-inset ring-border" : light, className)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", dot)} />
      {children}
    </span>
  );
}

/* ----------------------------------- Tag ----------------------------------- */

export function Tag({
  children,
  variant = "stroke",
  onRemove,
  startContent,
  active,
  className,
}: {
  children: ReactNode;
  variant?: "stroke" | "gray";
  onRemove?: () => void;
  startContent?: ReactNode;
  active?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1.5 rounded-6 pl-2 text-label-xs transition-colors",
        onRemove ? "pr-1" : "pr-2",
        variant === "stroke" ? "bg-surface text-muted ring-1 ring-inset ring-border hover:bg-surface-hover" : "bg-default text-muted hover:bg-default-hover",
        active && "bg-neutral-950 text-white ring-0 hover:bg-neutral-900 dark:bg-neutral-200 dark:text-neutral-950",
        className,
      )}
    >
      {startContent && <span className="[&_svg]:h-3.5 [&_svg]:w-3.5">{startContent}</span>}
      {children}
      {onRemove && (
        <button onClick={onRemove} className="rounded-4 p-0.5 opacity-60 hover:bg-black/10 hover:opacity-100 dark:hover:bg-white/15" aria-label="Remove">
          <RiCloseLine className="h-3 w-3" strokeWidth={2.5} />
        </button>
      )}
    </span>
  );
}

/* ---------------------------- Segmented Control ---------------------------- */

export function SegmentedControl<T extends string>({
  value,
  onChange,
  items,
  size = "md",
  fullWidth,
  className,
}: {
  value: T;
  onChange: (v: T) => void;
  items: { value: T; label?: ReactNode; icon?: ReactNode; disabled?: boolean }[];
  size?: "sm" | "md";
  fullWidth?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [ind, setInd] = useState<{ left: number; width: number } | null>(null);
  useEffect(() => {
    const el = ref.current?.querySelector<HTMLElement>(`[data-value="${CSS.escape(value)}"]`);
    if (el) setInd({ left: el.offsetLeft, width: el.offsetWidth });
  }, [value, items.length]);
  return (
    <div ref={ref} role="tablist" className={cn("relative inline-flex items-center rounded-10 bg-surface-secondary p-1 ring-1 ring-inset ring-border", fullWidth && "flex w-full", className)}>
      {ind && (
        <span
          className="absolute top-1 bottom-1 rounded-8 bg-surface shadow-toggle ring-1 ring-border/60 transition-all duration-300 ease-out-quint"
          style={{ left: ind.left, width: ind.width }}
        />
      )}
      {items.map((it) => (
        <button
          key={it.value}
          role="tab"
          data-value={it.value}
          aria-selected={it.value === value}
          aria-label={typeof it.label === "string" ? it.label : String(it.value)}
          disabled={it.disabled}
          onClick={() => onChange(it.value)}
          className={cn(
            "relative z-10 inline-flex items-center justify-center gap-1.5 rounded-8 px-3 transition-colors whitespace-nowrap",
            size === "sm" ? "h-7 text-label-xs" : "h-8 text-label-sm",
            "[&_svg]:h-4 [&_svg]:w-4",
            it.value === value ? "text-foreground" : "text-muted hover:text-foreground",
            it.disabled && "pointer-events-none opacity-[var(--disabled-opacity)]",
            fullWidth && "flex-1",
            !it.label && "px-2",
          )}
        >
          {it.icon}
          {it.label}
        </button>
      ))}
    </div>
  );
}

/* --------------------------------- Steppers -------------------------------- */

export type Step = { title: string; description?: string };

function StepIcon({ i, state }: { i: number; state: "done" | "active" | "todo" }) {
  return (
    <span
      className={cn(
        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-label-xs transition-colors",
        state === "done" && "bg-success text-white",
        state === "active" && "bevel bg-accent text-accent-foreground shadow-fancy-accent",
        state === "todo" && "bg-surface text-subtle ring-1 ring-inset ring-border",
      )}
    >
      {state === "done" ? <RiCheckLine className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
    </span>
  );
}

export function HorizontalStepper({ steps, current, className }: { steps: Step[]; current: number; className?: string }) {
  return (
    <ol className={cn("horizontal-stepper", className)}>
      {steps.map((s, i) => {
        const state = i < current ? "done" : i === current ? "active" : "todo";
        return (
          <li key={s.title} aria-current={state === "active" ? "step" : undefined}>
            <div className="stepper-label">
              <StepIcon i={i} state={state} />
              <div className="min-w-0">
                <p className={cn("text-label-xs", state === "todo" ? "text-muted" : "text-foreground")}>{s.title}</p>
                {s.description && <p className="text-paragraph-xs text-muted">{s.description}</p>}
              </div>
            </div>
            {i < steps.length - 1 && <span className={cn("stepper-connector", i < current ? "bg-success" : "bg-border")} />}
          </li>
        );
      })}
    </ol>
  );
}

export function VerticalStepper({ steps, current, className }: { steps: Step[]; current: number; className?: string }) {
  return (
    <ol className={cn("flex flex-col", className)}>
      {steps.map((s, i) => {
        const state = i < current ? "done" : i === current ? "active" : "todo";
        return (
          <li key={s.title} className="flex gap-3">
            <div className="flex flex-col items-center">
              <StepIcon i={i} state={state} />
              {i < steps.length - 1 && <span className={cn("my-1 w-px flex-1", i < current ? "bg-success" : "bg-border")} />}
            </div>
            <div className={cn("pb-6", i === steps.length - 1 && "pb-0")}>
              <p className={cn("text-label-sm", state === "todo" ? "text-subtle" : "text-foreground")}>{s.title}</p>
              {s.description && <p className="mt-0.5 text-paragraph-xs text-muted">{s.description}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function DotStepper({ count, current, onChange, className }: { count: number; current: number; onChange?: (i: number) => void; className?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-1.5", className)} role="tablist">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          role="tab"
          aria-selected={i === current}
          onClick={() => onChange?.(i)}
          className={cn("h-1.5 rounded-full transition-all duration-300 ease-out-quint", i === current ? "w-6 bg-foreground" : "w-1.5 bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-700")}
          aria-label={`Step ${i + 1}`}
        />
      ))}
    </div>
  );
}

/* -------------------------------- Digit Input ------------------------------ */

export function DigitInput({ length = 4, value, onChange, error, className }: { length?: number; value: string; onChange: (v: string) => void; error?: boolean; className?: string }) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = useMemo(() => Array.from({ length }, (_, i) => value[i] ?? ""), [value, length]);
  const setAt = (i: number, d: string) => {
    const next = digits.slice();
    next[i] = d;
    onChange(next.join(""));
  };
  return (
    <div className={cn("digit-input-group", className)}>
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          inputMode="numeric"
          aria-label={`Digit ${i + 1}`}
          maxLength={1}
          value={d}
          onChange={(e) => {
            const v = e.target.value.replace(/\D/g, "").slice(-1);
            setAt(i, v);
            if (v && i < length - 1) refs.current[i + 1]?.focus();
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !d && i > 0) refs.current[i - 1]?.focus();
            if (e.key === "ArrowLeft" && i > 0) refs.current[i - 1]?.focus();
            if (e.key === "ArrowRight" && i < length - 1) refs.current[i + 1]?.focus();
          }}
          onPaste={(e) => {
            const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
            if (text) { e.preventDefault(); onChange(text); refs.current[Math.min(text.length, length) - 1]?.focus(); }
          }}
          className={cn(
            "min-w-0 flex-1 h-12 w-10 max-w-14 rounded-10 bg-field text-center text-title-h5 text-foreground shadow-xs ring-1 ring-inset ring-border outline-none transition-all",
            "hover:bg-field-hover hover:ring-border-strong focus:bg-field-focus focus:ring-foreground focus:shadow-ring-neutral",
            d && "ring-border-strong",
            error && "ring-danger focus:ring-danger focus:shadow-ring-danger",
          )}
        />
      ))}
    </div>
  );
}

/* -------------------------------- Datepicker ------------------------------- */

const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function Datepicker({ value, onChange, className }: { value: Date | null; onChange: (d: Date) => void; className?: string }) {
  const [view, setView] = useState(() => new Date((value ?? new Date()).getFullYear(), (value ?? new Date()).getMonth(), 1));
  const today = new Date();
  const first = new Date(view.getFullYear(), view.getMonth(), 1);
  const offset = (first.getDay() + 6) % 7;
  const days = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  const prevDays = new Date(view.getFullYear(), view.getMonth(), 0).getDate();
  const cells: { d: number; m: number }[] = [];
  for (let i = offset - 1; i >= 0; i--) cells.push({ d: prevDays - i, m: -1 });
  for (let i = 1; i <= days; i++) cells.push({ d: i, m: 0 });
  while (cells.length % 7 !== 0) cells.push({ d: cells.length - offset - days + 1, m: 1 });
  const same = (a: Date | null, y: number, m: number, d: number) => !!a && a.getFullYear() === y && a.getMonth() === m && a.getDate() === d;

  return (
    <div className={cn("w-full max-w-[320px] rounded-14 bg-surface p-4 ring-1 ring-border shadow-sm", className)}>
      <div className="flex items-center justify-between">
        <CompactButton variant="stroke" onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))} aria-label="Previous month"><RiArrowLeftSLine /></CompactButton>
        <p className="text-label-sm text-foreground">{MONTHS[view.getMonth()]} {view.getFullYear()}</p>
        <CompactButton variant="stroke" onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))} aria-label="Next month"><RiArrowRightSLine /></CompactButton>
      </div>
      <div className="mt-4 grid grid-cols-7 gap-y-1">
        {DAYS.map((d) => <span key={d} className="py-1 text-center text-subheading-2xs uppercase text-subtle">{d}</span>)}
        {cells.map((c, i) => {
          const m = view.getMonth() + c.m;
          const date = new Date(view.getFullYear(), m, c.d);
          const selected = same(value, date.getFullYear(), date.getMonth(), date.getDate());
          const isToday = same(today, date.getFullYear(), date.getMonth(), date.getDate());
          return (
            <button
              key={i}
              onClick={() => onChange(date)}
              className={cn(
                "mx-auto flex h-9 w-full max-w-9 items-center justify-center rounded-8 text-paragraph-sm transition-colors",
                c.m !== 0 ? "text-disabled" : "text-foreground hover:bg-surface-hover",
                isToday && !selected && "ring-1 ring-inset ring-border text-label-sm",
                selected && "bevel bg-neutral-950 text-white shadow-fancy-neutral hover:bg-neutral-900 dark:bg-neutral-200 dark:text-neutral-950",
              )}
            >
              {c.d}
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-separator pt-3">
        <LinkButton variant="gray" size="sm" onClick={() => { onChange(today); setView(new Date(today.getFullYear(), today.getMonth(), 1)); }}>Today</LinkButton>
        <span className="text-paragraph-xs text-subtle">{value ? value.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" }) : "No date selected"}</span>
      </div>
    </div>
  );
}

/* ----------------------------- File Format Icon ---------------------------- */

const FORMAT_COLORS: Record<string, string> = {
  pdf: "#fb3748", doc: "#335cff", docx: "#335cff", xls: "#1fc16b", xlsx: "#1fc16b", csv: "#1fc16b", ppt: "#ff8447", pptx: "#ff8447",
  png: "#7d52f4", jpg: "#7d52f4", jpeg: "#7d52f4", svg: "#f6b51e", gif: "#f6b51e", mp4: "#e255f2", mp3: "#47c2ff", zip: "#717784", txt: "#99a0ae", fig: "#a259ff", json: "#f6b51e", ts: "#3178c6", tsx: "#3178c6",
};

export function FileFormatIcon({ format, size = 40, className }: { format: string; size?: number; className?: string }) {
  const color = FORMAT_COLORS[format.toLowerCase()] ?? "#99a0ae";
  const h = size * 1.25;
  return (
    <span className={cn("relative inline-flex shrink-0", className)} style={{ width: size, height: h }}>
      <svg width={size} height={h} viewBox="0 0 32 40" aria-hidden>
        <path d="M4 0h16l12 12v24a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4Z" fill="var(--surface)" stroke="var(--border)" strokeWidth="1" />
        <path d="M20 0v8a4 4 0 0 0 4 4h8L20 0Z" fill="var(--surface-tertiary)" />
      </svg>
      <span
        className="absolute bottom-[14%] left-[-8%] rounded-4 px-1 py-px text-[8px] leading-[11px] font-bold tracking-wide text-white uppercase"
        style={{ background: color, fontSize: Math.max(7, size * 0.2) }}
      >
        {format.slice(0, 4)}
      </span>
    </span>
  );
}

/* ------------------------------- Notification ------------------------------ */

const notifIcon = { accent: RiInformationLine, default: RiInformationLine, success: RiCheckboxCircleLine, warning: RiErrorWarningLine, danger: RiCloseCircleLine };

export function Notification({
  title,
  description,
  tone = "default",
  variant = "stroke",
  actions,
  onClose,
  className,
}: {
  title: ReactNode;
  description?: ReactNode;
  tone?: Tone;
  variant?: "stroke" | "filled" | "light";
  actions?: ReactNode;
  onClose?: () => void;
  className?: string;
}) {
  const Icon = notifIcon[tone];
  const color = { accent: "text-accent", default: "text-muted", success: "text-success", warning: "text-warning", danger: "text-danger" }[tone];
  const light = { accent: "bg-accent-soft text-accent-soft-foreground", default: "bg-default text-foreground", success: "bg-success-soft text-success-soft-foreground", warning: "bg-warning-soft text-warning-soft-foreground", danger: "bg-danger-soft text-danger-soft-foreground" }[tone];
  const filled = { accent: "bg-accent text-accent-foreground", default: "bg-neutral-950 text-white dark:bg-neutral-200 dark:text-neutral-950", success: "bg-success text-white", warning: "bg-warning text-neutral-950", danger: "bg-danger text-white" }[tone];
  return (
    <div className={cn("flex w-full max-w-[400px] items-start gap-3 rounded-14 p-4", variant === "stroke" && "bg-surface ring-1 ring-border shadow-lg", variant === "light" && light, variant === "filled" && filled, className)} role="status">
      <Icon className={cn("mt-px h-5 w-5 shrink-0", variant === "stroke" && color)} />
      <div className="min-w-0 flex-1">
        <p className="text-label-sm">{title}</p>
        {description && <p className={cn("mt-0.5 text-paragraph-sm", variant === "stroke" ? "text-muted" : "opacity-85")}>{description}</p>}
        {actions && <div className="mt-3 flex items-center gap-3">{actions}</div>}
      </div>
      {onClose && (
        <button onClick={onClose} className="-mt-1 -mr-1 rounded-6 p-1 opacity-60 transition hover:bg-black/10 hover:opacity-100 dark:hover:bg-white/10" aria-label="Dismiss">
          <RiCloseLine className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

/* ---------------------------------- Banner --------------------------------- */

export function Banner({ children, tone = "accent", variant = "filled", action, onClose, className }: { children: ReactNode; tone?: Tone; variant?: "filled" | "light" | "stroke"; action?: ReactNode; onClose?: () => void; className?: string }) {
  const Icon = notifIcon[tone];
  const filled = { accent: "bg-accent text-accent-foreground", default: "bg-neutral-950 text-white", success: "bg-success text-white", warning: "bg-warning text-neutral-950", danger: "bg-danger text-white" }[tone];
  const light = { accent: "bg-accent-soft text-accent-soft-foreground", default: "bg-default text-foreground", success: "bg-success-soft text-success-soft-foreground", warning: "bg-warning-soft text-warning-soft-foreground", danger: "bg-danger-soft text-danger-soft-foreground" }[tone];
  return (
    <div className={cn("flex w-full items-center gap-3 px-4 py-2.5 text-paragraph-sm", variant === "filled" && filled, variant === "light" && light, variant === "stroke" && "bg-surface text-foreground ring-1 ring-border", className)}>
      <Icon className="h-5 w-5 shrink-0" />
      <div className="flex-1">{children}</div>
      {action}
      {onClose && <button onClick={onClose} className="rounded-6 p-1 opacity-70 hover:opacity-100" aria-label="Dismiss"><RiCloseLine className="h-4 w-4" /></button>}
    </div>
  );
}

/* ------------------------------- Label + Hint ------------------------------ */

export function Label({ children, required, optional, sub, htmlFor, className }: { children: ReactNode; required?: boolean; optional?: boolean; sub?: ReactNode; htmlFor?: string; className?: string }) {
  return (
    <label htmlFor={htmlFor} className={cn("inline-flex items-center gap-1 text-label-sm text-foreground", className)}>
      {children}
      {required && <span className="text-accent">*</span>}
      {optional && <span className="text-paragraph-sm text-subtle">(Optional)</span>}
      {sub && <span className="text-paragraph-xs text-subtle">{sub}</span>}
    </label>
  );
}

export function Hint({ children, tone = "default", className }: { children: ReactNode; tone?: "default" | "error" | "success"; className?: string }) {
  const Icon = tone === "error" ? RiCloseCircleLine : tone === "success" ? RiCheckboxCircleLine : RiInformationLine;
  return (
    <p className={cn("flex items-center gap-1 text-paragraph-xs", tone === "error" ? "text-danger" : tone === "success" ? "text-success-soft-foreground" : "text-subtle", className)}>
      <Icon className="h-4 w-4" />
      {children}
    </p>
  );
}
