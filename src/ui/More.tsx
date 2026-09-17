import { useId, useState, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from "react";
import {
  RiAddLine,
  RiArrowDownSLine,
  RiCheckLine,
  RiCloseLine,
  RiSearchLine,
  RiStarFill,
  RiSubtractLine,
} from "@remixicon/react";
import { cn } from "../utils/cn";
import type { Tone } from "./Button";
import { Popover } from "./Overlay";
import { Avatar, Kbd } from "./Display";
import { CompactButton } from "./Extra";

/* --------------------------------- Dropdown -------------------------------- */

export type DropdownEntry =
  | { type?: "item"; label: ReactNode; icon?: ReactNode; shortcut?: string; sub?: ReactNode; danger?: boolean; onSelect?: () => void; disabled?: boolean }
  | { type: "checkbox"; label: ReactNode; checked: boolean; onChange: (v: boolean) => void; icon?: ReactNode }
  | { type: "label"; label: ReactNode }
  | { type: "divider" }
  | { type: "user"; name: string; email: string; avatar?: string };

export function Dropdown({
  entries,
  trigger,
  placement = "bottom-start",
  className,
}: {
  entries: DropdownEntry[];
  trigger: (p: { open: boolean; toggle: () => void }) => ReactNode;
  placement?: "bottom" | "bottom-start" | "bottom-end" | "top";
  className?: string;
}) {
  return (
    <Popover placement={placement} trigger={trigger} className={cn("w-60 p-0", className)}>
      {(close) => (
        <div className="py-1.5">
          {entries.map((e, i) => {
            if (e.type === "divider") return <div key={i} className="my-1.5 h-px bg-separator" />;
            if (e.type === "label") return <div key={i} className="px-3 pt-2 pb-1 text-subheading-2xs uppercase text-subtle">{e.label}</div>;
            if (e.type === "user")
              return (
                <div key={i} className="flex items-center gap-3 px-3 py-2">
                  <Avatar name={e.name} src={e.avatar} size="sm" tone="accent" />
                  <div className="min-w-0">
                    <p className="truncate text-label-sm text-foreground">{e.name}</p>
                    <p className="truncate text-paragraph-xs text-subtle">{e.email}</p>
                  </div>
                </div>
              );
            if (e.type === "checkbox")
              return (
                <button key={i} onClick={() => e.onChange(!e.checked)} className="mx-1.5 flex w-[calc(100%-12px)] items-center gap-2.5 rounded-8 px-2 py-2 text-left text-paragraph-sm text-foreground transition-colors hover:bg-surface-hover">
                  {e.icon && <span className="text-subtle [&_svg]:h-5 [&_svg]:w-5">{e.icon}</span>}
                  <span className="flex-1">{e.label}</span>
                  <span className={cn("flex h-4 w-4 items-center justify-center rounded-4 transition-colors", e.checked ? "bg-accent text-white" : "ring-1 ring-inset ring-border-strong")}>
                    {e.checked && <RiCheckLine size={12} />}
                  </span>
                </button>
              );
            return (
              <button
                key={i}
                disabled={e.disabled}
                onClick={() => { e.onSelect?.(); close(); }}
                className={cn(
                  "mx-1.5 flex w-[calc(100%-12px)] items-center gap-2.5 rounded-8 px-2 py-2 text-left text-paragraph-sm transition-colors disabled:pointer-events-none disabled:opacity-[var(--disabled-opacity)]",
                  e.danger ? "text-danger hover:bg-danger-soft" : "text-foreground hover:bg-surface-hover",
                )}
              >
                {e.icon && <span className={cn("[&_svg]:h-5 [&_svg]:w-5", e.danger ? "text-danger" : "text-subtle")}>{e.icon}</span>}
                <span className="min-w-0 flex-1">
                  <span className="block truncate">{e.label}</span>
                  {e.sub && <span className="block truncate text-paragraph-xs text-subtle">{e.sub}</span>}
                </span>
                {e.shortcut && <Kbd>{e.shortcut}</Kbd>}
              </button>
            );
          })}
        </div>
      )}
    </Popover>
  );
}

/* ----------------------------- Vertical Tab Menu --------------------------- */

export function VerticalTabMenu<T extends string>({
  items,
  value,
  onChange,
  className,
}: {
  items: { value: T; label: ReactNode; icon?: ReactNode; count?: number; disabled?: boolean }[];
  value: T;
  onChange: (v: T) => void;
  className?: string;
}) {
  return (
    <nav className={cn("flex w-full max-w-[240px] flex-col gap-0.5", className)}>
      {items.map((it) => {
        const active = it.value === value;
        return (
          <button
            key={it.value}
            disabled={it.disabled}
            onClick={() => onChange(it.value)}
            className={cn(
              "flex items-center gap-2.5 rounded-8 px-3 py-2 text-left text-label-sm transition-colors disabled:pointer-events-none disabled:opacity-[var(--disabled-opacity)]",
              active ? "bg-surface-secondary text-foreground" : "text-muted hover:bg-surface-hover hover:text-foreground",
            )}
          >
            {it.icon && <span className={cn("[&_svg]:h-5 [&_svg]:w-5", active ? "text-accent" : "text-subtle")}>{it.icon}</span>}
            <span className="flex-1 truncate">{it.label}</span>
            {typeof it.count === "number" && <span className={cn("rounded-full px-1.5 py-px text-[11px] tabular-nums", active ? "bg-accent text-white" : "bg-default text-muted")}>{it.count}</span>}
          </button>
        );
      })}
    </nav>
  );
}

/* ------------------------------ Content Divider ---------------------------- */

export function ContentDivider({ children, variant = "text", count, className }: { children?: ReactNode; variant?: "text" | "solid" | "solid-text" | "dashed"; count?: number; className?: string }) {
  if (variant === "solid") return <div className={cn("h-px w-full bg-separator", className)} />;
  if (variant === "dashed") return <div className={cn("h-px w-full border-t border-dashed border-border", className)} />;
  if (variant === "solid-text")
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <span className="h-px flex-1 bg-separator" />
        <span className="text-subheading-xs uppercase text-subtle">{children}</span>
        <span className="h-px flex-1 bg-separator" />
      </div>
    );
  return (
    <div className={cn("flex items-center gap-2.5 bg-surface-secondary/70 px-4 py-1.5", className)}>
      <span className="text-subheading-xs uppercase text-subtle">{children}</span>
      {typeof count === "number" && <span className="rounded-full bg-default px-1.5 text-[11px] tabular-nums text-muted">{count}</span>}
    </div>
  );
}

/* ------------------------------ Selection Card ----------------------------- */

export function SelectionCard({
  type = "checkbox",
  checked,
  onChange,
  title,
  description,
  icon,
  meta,
  disabled,
  className,
}: {
  type?: "checkbox" | "radio";
  checked: boolean;
  onChange: (v: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  meta?: ReactNode;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <label
      className={cn(
        "group flex cursor-pointer items-start gap-3.5 rounded-14 bg-surface p-4 transition-all",
        checked ? "shadow-sm ring-2 ring-accent" : "ring-1 ring-border hover:ring-border-strong hover:shadow-xs",
        disabled && "pointer-events-none opacity-[var(--disabled-opacity)]",
        className,
      )}
    >
      <input type={type} className="sr-only" checked={checked} disabled={disabled} onChange={(e) => onChange(e.target.checked)} />
      {icon && <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-secondary text-foreground ring-1 ring-border [&_svg]:h-5 [&_svg]:w-5">{icon}</span>}
      <span className="min-w-0 flex-1">
        <span className="block text-label-sm text-foreground">{title}</span>
        {description && <span className="mt-0.5 block text-paragraph-xs text-muted">{description}</span>}
      </span>
      {meta && <span className="text-label-sm tabular-nums text-foreground">{meta}</span>}
      <span
        className={cn(
          "mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center transition-all",
          type === "radio" ? "rounded-full" : "rounded-6",
          checked ? "bevel bg-accent text-white shadow-fancy-accent" : "bg-surface ring-1 ring-inset ring-border-strong group-hover:bg-surface-hover",
        )}
      >
        {checked && (type === "radio" ? <span className="h-[7px] w-[7px] rounded-full bg-white" /> : <RiCheckLine size={12} />)}
      </span>
    </label>
  );
}

/* ---------------------------------- Rating --------------------------------- */

export function Rating({ value, onChange, max = 5, size = "md", readOnly, className }: { value: number; onChange?: (v: number) => void; max?: number; size?: "sm" | "md" | "lg"; readOnly?: boolean; className?: string }) {
  const [hover, setHover] = useState(0);
  const px = { sm: 16, md: 20, lg: 28 }[size];
  const shown = hover || value;
  return (
    <div className={cn("inline-flex items-center gap-0.5", className)} onMouseLeave={() => setHover(0)} role={readOnly ? "img" : "radiogroup"} aria-label={`${value} of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) => (
        <button
          key={i}
          type="button"
          disabled={readOnly}
          onMouseEnter={() => !readOnly && setHover(i + 1)}
          onClick={() => onChange?.(i + 1)}
          className={cn("transition-transform disabled:cursor-default", !readOnly && "hover:scale-110")}
          aria-label={`${i + 1} stars`}
        >
          <RiStarFill size={px} className={cn("transition-colors", shown >= i + 1 ? "text-warning" : "text-neutral-200 dark:text-neutral-700")} />
        </button>
      ))}
    </div>
  );
}

/* ------------------------------- Number Input ------------------------------ */

export function NumberInput({ value, onChange, min = -Infinity, max = Infinity, step = 1, label, suffix, size = "md", className }: { value: number; onChange: (v: number) => void; min?: number; max?: number; step?: number; label?: string; suffix?: string; size?: "sm" | "md"; className?: string }) {
  const id = useId();
  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  const h = size === "sm" ? "h-8" : "h-10";
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && <label htmlFor={id} className="text-label-sm text-foreground">{label}</label>}
      <div className={cn("inline-flex items-stretch overflow-hidden rounded-10 bg-field shadow-xs ring-1 ring-inset ring-border transition-all focus-within:ring-foreground focus-within:shadow-ring-neutral", h)}>
        <button type="button" onClick={() => onChange(clamp(value - step))} disabled={value <= min} className="flex w-10 items-center justify-center border-r border-border text-muted transition-colors hover:bg-surface-hover hover:text-foreground disabled:pointer-events-none disabled:text-disabled" aria-label="Decrease"><RiSubtractLine size={18} /></button>
        <div className="flex items-center gap-1 px-2">
          <input id={id} type="number" value={value} min={min} max={max} step={step} onChange={(e) => onChange(clamp(Number(e.target.value)))} className="w-14 bg-transparent text-center text-paragraph-sm tabular-nums text-foreground outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" />
          {suffix && <span className="text-paragraph-xs text-subtle">{suffix}</span>}
        </div>
        <button type="button" onClick={() => onChange(clamp(value + step))} disabled={value >= max} className="flex w-10 items-center justify-center border-l border-border text-muted transition-colors hover:bg-surface-hover hover:text-foreground disabled:pointer-events-none disabled:text-disabled" aria-label="Increase"><RiAddLine size={18} /></button>
      </div>
    </div>
  );
}

/* ------------------------------- Search Input ------------------------------ */

export function SearchInput({ value, onChange, placeholder = "Search…", shortcut, size = "md", className, ...props }: Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange" | "value"> & { value: string; onChange: (v: string) => void; shortcut?: string; size?: "sm" | "md" | "lg" }) {
  const h = { sm: "h-8 px-2.5", md: "h-10 px-3", lg: "h-12 px-3.5" }[size];
  return (
    <div className={cn("group flex items-center gap-2 rounded-10 bg-field shadow-xs ring-1 ring-inset ring-border transition-all hover:bg-field-hover hover:ring-border-strong focus-within:bg-field-focus focus-within:ring-foreground focus-within:shadow-ring-neutral", h, className)}>
      <RiSearchLine size={20} className="shrink-0 text-subtle group-focus-within:text-muted" />
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="min-w-0 flex-1 bg-transparent text-paragraph-sm text-foreground outline-none placeholder:text-field-placeholder" {...props} />
      {value ? (
        <button onClick={() => onChange("")} className="rounded-full bg-default p-0.5 text-muted hover:text-foreground" aria-label="Clear"><RiCloseLine size={14} /></button>
      ) : (
        shortcut && <Kbd>{shortcut}</Kbd>
      )}
    </div>
  );
}

/* --------------------------- Textarea with counter ------------------------- */

export function TextareaCounter({ label, maxLength = 200, value, onChange, hint, className, ...props }: Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange" | "value"> & { label?: string; value: string; onChange: (v: string) => void; hint?: ReactNode }) {
  const id = useId();
  const over = value.length > maxLength;
  return (
    <div className={cn("flex w-full flex-col gap-1.5", className)}>
      {label && <label htmlFor={id} className="text-label-sm text-foreground">{label}</label>}
      <div className={cn("rounded-10 bg-field shadow-xs ring-1 ring-inset ring-border transition-all hover:bg-field-hover hover:ring-border-strong focus-within:bg-field-focus focus-within:ring-foreground focus-within:shadow-ring-neutral", over && "ring-danger focus-within:ring-danger focus-within:shadow-ring-danger")}>
        <textarea id={id} value={value} onChange={(e) => onChange(e.target.value)} rows={3} className="ds-scroll w-full resize-none bg-transparent px-3 pt-2.5 text-paragraph-sm text-foreground outline-none placeholder:text-field-placeholder" {...props} />
        <div className="flex items-center justify-between px-3 pb-2">
          <span className="text-paragraph-xs text-subtle">{hint}</span>
          <span className={cn("font-mono text-[11px] tabular-nums", over ? "text-danger" : "text-subtle")}>{value.length}/{maxLength}</span>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- Toggle Group ----------------------------- */

export function ToggleGroup<T extends string>({ items, value, onChange, multiple, size = "md", className }: { items: { value: T; icon: ReactNode; label?: string }[]; value: T[]; onChange: (v: T[]) => void; multiple?: boolean; size?: "sm" | "md"; className?: string }) {
  const toggle = (v: T) => {
    if (multiple) onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);
    else onChange(value.includes(v) ? [] : [v]);
  };
  return (
    <div className={cn("inline-flex items-center rounded-10 bg-surface shadow-fancy-stroke", className)} role="group">
      {items.map((it, i) => {
        const on = value.includes(it.value);
        return (
          <button
            key={it.value}
            aria-pressed={on}
            aria-label={it.label ?? String(it.value)}
            title={it.label}
            onClick={() => toggle(it.value)}
            className={cn(
              "flex items-center justify-center transition-colors first:rounded-l-10 last:rounded-r-10 [&_svg]:h-[18px] [&_svg]:w-[18px]",
              size === "sm" ? "h-8 w-8" : "h-10 w-10",
              i > 0 && "border-l border-border",
              on ? "bg-surface-secondary text-foreground" : "text-muted hover:bg-surface-hover hover:text-foreground",
            )}
          >
            {it.icon}
          </button>
        );
      })}
    </div>
  );
}

/* -------------------------------- Widget Box ------------------------------- */

export function WidgetBox({ icon, title, action, children, footer, className }: { icon?: ReactNode; title: ReactNode; action?: ReactNode; children: ReactNode; footer?: ReactNode; className?: string }) {
  return (
    <section className={cn("flex flex-col rounded-20 bg-surface ring-1 ring-border shadow-xs", className)}>
      <header className="flex items-center gap-2.5 px-5 py-4">
        {icon && <span className="text-muted [&_svg]:h-5 [&_svg]:w-5">{icon}</span>}
        <h3 className="flex-1 text-label-sm text-foreground">{title}</h3>
        {action}
      </header>
      <div className="h-px bg-separator" />
      <div className="flex-1 px-5 py-4">{children}</div>
      {footer && <div className="border-t border-separator px-5 py-3">{footer}</div>}
    </section>
  );
}

/* -------------------------------- Color Picker ----------------------------- */

const SWATCHES = ["#335CFF", "#7D52F4", "#E255F2", "#FB3748", "#FF8447", "#F6B51E", "#1FC16B", "#22D3BB", "#47C2FF", "#525866", "#0E121B", "#FFFFFF"];

export function ColorPicker({ value, onChange, className }: { value: string; onChange: (hex: string) => void; className?: string }) {
  const [hex, setHex] = useState(value);
  const commit = (v: string) => {
    setHex(v);
    if (/^#[0-9a-f]{6}$/i.test(v)) onChange(v.toUpperCase());
  };
  return (
    <div className={cn("w-64 rounded-20 bg-surface p-4 ring-1 ring-border shadow-lg", className)}>
      <div className="grid grid-cols-6 gap-2">
        {SWATCHES.map((c) => (
          <button
            key={c}
            onClick={() => commit(c)}
            className={cn("flex aspect-square items-center justify-center rounded-6 ring-1 ring-inset ring-black/10 transition-transform hover:scale-105 dark:ring-white/10", value.toUpperCase() === c && "ring-2 ring-foreground ring-offset-2 ring-offset-surface")}
            style={{ background: c }}
            aria-label={c}
          >
            {value.toUpperCase() === c && <RiCheckLine size={14} className={c === "#FFFFFF" || c === "#F6B51E" ? "text-neutral-950" : "text-white"} />}
          </button>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2">
        <span className="h-10 w-10 shrink-0 rounded-8 ring-1 ring-inset ring-black/10 dark:ring-white/10" style={{ background: value }} />
        <div className="flex h-10 flex-1 items-center rounded-10 bg-field px-3 font-mono text-paragraph-sm shadow-xs ring-1 ring-inset ring-border focus-within:ring-foreground focus-within:shadow-ring-neutral">
          <span className="text-subtle">#</span>
          <input aria-label="Hex colour" value={hex.replace("#", "")} onChange={(e) => commit("#" + e.target.value.replace(/[^0-9a-f]/gi, "").slice(0, 6))} className="w-full bg-transparent uppercase outline-none" />
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- Timeline -------------------------------- */

export function Timeline({ items, className }: { items: { time: string; title: ReactNode; description?: ReactNode; tone?: Tone; icon?: ReactNode }[]; className?: string }) {
  const dot = { accent: "bg-accent", default: "bg-neutral-400", success: "bg-success", warning: "bg-warning", danger: "bg-danger" };
  return (
    <ol className={cn("flex flex-col", className)}>
      {items.map((it, i) => (
        <li key={i} className="flex gap-4">
          <div className="flex flex-col items-center">
            <span className={cn("mt-1.5 flex h-2.5 w-2.5 shrink-0 items-center justify-center rounded-full ring-4 ring-surface", dot[it.tone ?? "default"])} />
            {i < items.length - 1 && <span className="my-1 w-px flex-1 bg-border" />}
          </div>
          <div className={cn("min-w-0 pb-6", i === items.length - 1 && "pb-0")}>
            <p className="text-paragraph-xs text-subtle">{it.time}</p>
            <p className="mt-0.5 text-label-sm text-foreground">{it.title}</p>
            {it.description && <p className="mt-0.5 text-paragraph-sm text-muted">{it.description}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}

/* -------------------------------- Empty State ------------------------------ */

export function EmptyState({ icon, title, description, actions, className }: { icon: ReactNode; title: ReactNode; description?: ReactNode; actions?: ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center px-6 py-12 text-center", className)}>
      <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-surface-secondary text-muted ring-1 ring-border [&_svg]:h-7 [&_svg]:w-7">
        <span className="absolute -inset-2 rounded-full ring-1 ring-border/50" />
        {icon}
      </span>
      <p className="mt-5 text-label-md text-foreground">{title}</p>
      {description && <p className="mt-1 max-w-sm text-paragraph-sm text-muted">{description}</p>}
      {actions && <div className="mt-5 flex flex-wrap items-center justify-center gap-2">{actions}</div>}
    </div>
  );
}

/* -------------------------------- Select Trigger --------------------------- */

export function SelectTrigger({ label, value, placeholder = "Select…", icon, open, onClick, size = "md", className }: { label?: string; value?: ReactNode; placeholder?: string; icon?: ReactNode; open?: boolean; onClick?: () => void; size?: "sm" | "md" | "lg"; className?: string }) {
  const h = { sm: "h-8 px-2.5", md: "h-10 px-3", lg: "h-12 px-3.5" }[size];
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && <span className="text-label-sm text-foreground">{label}</span>}
      <button
        type="button"
        onClick={onClick}
        aria-expanded={open}
        className={cn("flex w-full items-center gap-2 rounded-10 bg-field text-left shadow-xs ring-1 ring-inset ring-border transition-all hover:bg-field-hover hover:ring-border-strong focus-visible:ring-foreground focus-visible:shadow-ring-neutral", open && "ring-foreground shadow-ring-neutral", h)}
      >
        {icon && <span className="text-subtle [&_svg]:h-5 [&_svg]:w-5">{icon}</span>}
        <span className={cn("flex-1 truncate text-paragraph-sm", value ? "text-foreground" : "text-field-placeholder")}>{value ?? placeholder}</span>
        <RiArrowDownSLine size={20} className={cn("text-subtle transition-transform", open && "rotate-180")} />
      </button>
    </div>
  );
}

export { CompactButton };
