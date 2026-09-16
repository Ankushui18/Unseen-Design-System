import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { Check, ChevronDown, Minus } from "lucide-react";
import { cn } from "../utils/cn";
import type { Tone } from "./Button";

/* ------------------------------- Field shell ------------------------------ */

const fieldSizes: Record<"sm" | "md" | "lg", string> = {
  sm: "h-8 gap-1.5 px-2 rounded-lg text-paragraph-sm",
  md: "h-10 gap-2 px-3 rounded-10 text-paragraph-sm",
  lg: "h-12 gap-2 px-3.5 rounded-10 text-paragraph-md",
};

/* AlignUI input shell: hairline ring, xs shadow at rest, weak fill on hover, strong ring + double halo on focus */
const fieldShell =
  "relative bg-field text-field-foreground shadow-xs transition duration-200 ease-out " +
  "ring-1 ring-inset ring-border " +
  "hover:bg-field-hover hover:shadow-none hover:ring-transparent " +
  "focus-within:bg-field-focus focus-within:shadow-ring-neutral focus-within:ring-foreground focus-within:hover:ring-foreground " +
  "has-[:disabled]:pointer-events-none has-[:disabled]:bg-surface-secondary has-[:disabled]:text-disabled has-[:disabled]:shadow-none has-[:disabled]:ring-transparent";

function Label({ htmlFor, children, required }: { htmlFor?: string; children: ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="text-label-sm text-foreground">
      {children}
      {required && <span className="ml-0.5 text-accent">*</span>}
    </label>
  );
}

function Helper({ error, description, id }: { error?: string; description?: ReactNode; id?: string }) {
  if (!error && !description) return null;
  return (
    <p id={id} className={cn("flex items-start gap-1.5 text-paragraph-xs", error ? "text-danger" : "text-muted")}>
      {error && (
        <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 shrink-0" fill="currentColor" aria-hidden>
          <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0-11a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0V8a1 1 0 0 1 1-1Zm0 7.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z" clipRule="evenodd" />
        </svg>
      )}
      {error || description}
    </p>
  );
}

/* --------------------------------- Input --------------------------------- */

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> {
  label?: string;
  description?: ReactNode;
  error?: string;
  size?: "sm" | "md" | "lg";
  startContent?: ReactNode;
  endContent?: ReactNode;
  /** Divided prefix section, e.g. "https://" */
  prefixAffix?: ReactNode;
  /** Divided suffix section, e.g. ".com" or a unit */
  suffixAffix?: ReactNode;
  wrapperClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, description, error, size = "md", startContent, endContent, prefixAffix, suffixAffix, className, wrapperClassName, required, id: providedId, ...props },
  ref,
) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const helperId = `${id}-description`;
  const affixPad = size === "md" || size === "lg" ? "px-3" : "px-2.5";
  const inner = fieldSizes[size];
  const heightOnly = inner.split(" ").filter((c) => c.startsWith("h-") || c.startsWith("rounded") || c.startsWith("text-")).join(" ");
  const padGap = inner.split(" ").filter((c) => c.startsWith("px-") || c.startsWith("gap-")).join(" ");
  return (
    <div className={cn("flex w-full min-w-0 flex-col gap-1.5", wrapperClassName)}>
      {label && <Label htmlFor={id} required={required}>{label}</Label>}
      <div
        className={cn(
          "group flex w-full min-w-0 divide-x divide-border",
          fieldShell,
          error && "ring-red-base hover:ring-red-base focus-within:ring-red-base focus-within:shadow-ring-danger",
          heightOnly,
        )}
      >
        {prefixAffix && <span className={cn("flex shrink-0 items-center bg-surface text-paragraph-sm text-subtle group-focus-within:text-muted", affixPad)}>{prefixAffix}</span>}
        <div className={cn("flex h-full min-w-0 flex-1 items-center bg-transparent", padGap)}>
          {startContent && <span className="flex h-5 w-5 shrink-0 items-center justify-center text-subtle transition-colors group-hover:text-muted group-focus-within:text-muted [&_svg]:h-5 [&_svg]:w-5">{startContent}</span>}
          <input
            id={id}
            ref={ref}
            required={required}
            aria-invalid={!!error || undefined}
            aria-describedby={error || description ? helperId : undefined}
            className={cn(
              "h-full w-full min-w-0 flex-1 bg-transparent text-paragraph-sm text-field-foreground outline-none focus-visible:shadow-none",
              "placeholder:select-none placeholder:text-field-placeholder placeholder:transition-colors group-hover:placeholder:text-muted group-focus-within:placeholder:text-muted",
              "disabled:text-disabled disabled:placeholder:text-disabled",
              className,
            )}
            {...props}
          />
          {endContent && <span className="flex shrink-0 items-center justify-center text-subtle [&_svg]:h-5 [&_svg]:w-5">{endContent}</span>}
        </div>
        {suffixAffix && <span className={cn("flex shrink-0 items-center bg-surface text-paragraph-sm text-subtle group-focus-within:text-muted", affixPad)}>{suffixAffix}</span>}
      </div>
      <Helper id={helperId} error={error} description={description} />
    </div>
  );
});

/* -------------------------------- Textarea -------------------------------- */

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  description?: ReactNode;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, description, error, className, required, id: providedId, ...props },
  ref,
) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && <Label htmlFor={id} required={required}>{label}</Label>}
      <textarea
        id={id}
        ref={ref}
        required={required}
        className={cn(
          "ds-scroll min-h-24 w-full resize-y rounded-10 px-3 py-2.5 text-paragraph-sm text-field-foreground outline-none",
          "placeholder:text-field-placeholder",
          "ring-1 ring-inset ring-border bg-field shadow-xs transition duration-200 ease-out",
          "hover:bg-field-hover hover:shadow-none hover:ring-transparent focus:bg-field-focus focus:ring-foreground focus:shadow-ring-neutral focus:hover:ring-foreground",
          error && "ring-red-base hover:ring-red-base focus:ring-red-base focus:shadow-ring-danger",
          "disabled:pointer-events-none disabled:bg-surface-secondary disabled:text-disabled disabled:shadow-none disabled:ring-transparent",
          className,
        )}
        {...props}
      />
      <Helper error={error} description={description} />
    </div>
  );
});

/* --------------------------------- Select --------------------------------- */

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  description?: ReactNode;
  error?: string;
  size?: "sm" | "md" | "lg";
  items?: { label: string; value: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, description, error, size = "md", items, children, className, required, id: providedId, ...props },
  ref,
) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && <Label htmlFor={id} required={required}>{label}</Label>}
      <div
        className={cn(
          "flex items-center",
          fieldShell,
          error && "ring-red-base hover:ring-red-base focus-within:ring-red-base focus-within:shadow-ring-danger",
          fieldSizes[size],
        )}
      >
        <select
          id={id}
          ref={ref}
          required={required}
          className={cn("h-full w-full cursor-pointer appearance-none bg-transparent pr-6 text-field-foreground outline-none", className)}
          {...props}
        >
          {items?.map((it) => (
            <option key={it.value} value={it.value}>
              {it.label}
            </option>
          ))}
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2.5 h-5 w-5 text-subtle" />
      </div>
      <Helper error={error} description={description} />
    </div>
  );
});

/* -------------------------------- Checkbox -------------------------------- */

const toneBg: Record<Tone, string> = {
  accent: "bg-accent border-accent text-accent-foreground",
  default: "bg-foreground border-foreground text-background",
  success: "bg-success border-success text-success-foreground",
  warning: "bg-warning border-warning text-warning-foreground",
  danger: "bg-danger border-danger text-danger-foreground",
};

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: ReactNode;
  description?: ReactNode;
  tone?: Tone;
  indeterminate?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Checkbox({
  label,
  description,
  tone = "accent",
  indeterminate,
  size = "md",
  className,
  checked,
  ...props
}: CheckboxProps) {
  const box = { sm: "h-4 w-4 rounded-[4px]", md: "h-[18px] w-[18px] rounded-[5px]", lg: "h-5 w-5 rounded-md" }[size];
  const on = checked || indeterminate;
  return (
    <label
      className={cn(
        "group inline-flex cursor-pointer items-start gap-2.5 select-none",
        props.disabled && "cursor-not-allowed opacity-[var(--disabled-opacity)]",
        className,
      )}
    >
      <span className="relative flex items-center">
        <input type="checkbox" className="peer sr-only" checked={checked} {...props} />
        <span
          className={cn(
            "mt-px flex shrink-0 items-center justify-center transition-all duration-150 ease-spring",
            "peer-focus-visible:shadow-ring-accent",
            box,
            on
              ? cn("bevel border shadow-xs", toneBg[tone])
              : "border border-border-strong bg-surface shadow-xs group-hover:bg-surface-hover",
          )}
        >
          {indeterminate ? (
            <Minus className="h-3 w-3" strokeWidth={3.5} />
          ) : (
            <Check
              className={cn("h-3 w-3 transition-transform duration-150", checked ? "scale-100" : "scale-0")}
              strokeWidth={3.5}
            />
          )}
        </span>
      </span>
      {(label || description) && (
        <span className="flex flex-col gap-0.5 leading-tight">
          {label && <span className="text-paragraph-sm text-foreground">{label}</span>}
          {description && <span className="text-paragraph-xs text-muted">{description}</span>}
        </span>
      )}
    </label>
  );
}

/* --------------------------------- Radio ---------------------------------- */

export function RadioGroup<T extends string>({
  value,
  onChange,
  options,
  name,
  tone = "accent",
  orientation = "vertical",
  className,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: ReactNode; description?: ReactNode; disabled?: boolean }[];
  name?: string;
  tone?: Tone;
  orientation?: "vertical" | "horizontal";
  className?: string;
}) {
  const gid = useId();
  return (
    <div
      role="radiogroup"
      className={cn("flex gap-3", orientation === "vertical" ? "flex-col" : "flex-row flex-wrap items-center", className)}
    >
      {options.map((o) => {
        const active = o.value === value;
        return (
          <label
            key={o.value}
            className={cn(
              "group inline-flex cursor-pointer items-start gap-2.5 select-none",
              o.disabled && "cursor-not-allowed opacity-[var(--disabled-opacity)]",
            )}
          >
            <input
              type="radio"
              name={name ?? gid}
              className="peer sr-only"
              checked={active}
              disabled={o.disabled}
              onChange={() => onChange(o.value)}
            />
            <span
              className={cn(
                "mt-px flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border transition-all duration-150 shadow-xs",
                "peer-focus-visible:shadow-ring-accent",
                active
                  ? cn("bevel", { accent: "border-accent bg-accent", default: "border-foreground bg-foreground", success: "border-success bg-success", warning: "border-warning bg-warning", danger: "border-danger bg-danger" }[tone])
                  : "border-border-strong bg-surface group-hover:bg-surface-hover",
              )}
            >
              <span
                className={cn(
                  "h-[7px] w-[7px] rounded-full bg-white transition-transform duration-150 ease-spring",
                  active ? "scale-100" : "scale-0",
                  tone === "warning" && "bg-neutral-950",
                )}
              />
            </span>
            <span className="flex flex-col gap-0.5 leading-tight">
              <span className="text-paragraph-sm text-foreground">{o.label}</span>
              {o.description && <span className="text-paragraph-xs text-muted">{o.description}</span>}
            </span>
          </label>
        );
      })}
    </div>
  );
}

/* --------------------------------- Switch --------------------------------- */

export function Switch({
  checked,
  onChange,
  label,
  description,
  size = "md",
  tone = "accent",
  disabled,
  className,
  startIcon,
  endIcon,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: ReactNode;
  description?: ReactNode;
  size?: "sm" | "md" | "lg";
  tone?: Tone;
  disabled?: boolean;
  className?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}) {
  const dims = {
    sm: { track: "h-4 w-7 p-[2px]", thumb: "h-3 w-3", shift: "translate-x-3" },
    md: { track: "h-5 w-8 p-[2px]", thumb: "h-4 w-4", shift: "translate-x-3" },
    lg: { track: "h-6 w-10 p-[2px]", thumb: "h-5 w-5", shift: "translate-x-4" },
  }[size];
  const onColor = { accent: "bg-accent", default: "bg-foreground", success: "bg-success", warning: "bg-warning", danger: "bg-danger" }[tone];
  return (
    <label className={cn("group inline-flex cursor-pointer items-center gap-3 select-none", disabled && "cursor-not-allowed opacity-[var(--disabled-opacity)]", className)}>
      <span className="relative inline-flex">
        <input type="checkbox" className="peer sr-only" checked={checked} disabled={disabled} onChange={(e) => onChange(e.target.checked)} />
        <span
          className={cn(
            "relative flex shrink-0 items-center rounded-full transition-colors duration-200 ease-out-quint",
            "peer-focus-visible:shadow-ring-accent",
            dims.track,
            checked ? cn("bevel", onColor) : "bg-neutral-200 group-hover:bg-neutral-300 dark:bg-neutral-700 dark:group-hover:bg-neutral-600",
          )}
        >
          <span
            className={cn(
              "flex items-center justify-center rounded-full bg-white shadow-switch-thumb transition-transform duration-200 ease-spring",
              "text-[9px] text-neutral-950",
              dims.thumb,
              checked && dims.shift,
            )}
          >
            {checked ? endIcon : startIcon}
          </span>
        </span>
      </span>
      {(label || description) && (
        <span className="flex flex-col gap-0.5 leading-tight">
          {label && <span className="text-paragraph-sm text-foreground">{label}</span>}
          {description && <span className="text-paragraph-xs text-muted">{description}</span>}
        </span>
      )}
    </label>
  );
}

/* --------------------------------- Slider --------------------------------- */

export function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  formatValue,
  tone = "accent",
  disabled,
  className,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: ReactNode;
  formatValue?: (v: number) => string;
  tone?: Tone;
  disabled?: boolean;
  className?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  const fill = { accent: "var(--accent)", default: "var(--foreground)", success: "var(--success)", warning: "var(--warning)", danger: "var(--danger)" }[tone];
  return (
    <div className={cn("flex w-full flex-col gap-2", disabled && "opacity-[var(--disabled-opacity)]", className)}>
      {(label || formatValue) && (
        <div className="flex items-center justify-between gap-3">
          {label && <span className="text-label-sm text-foreground">{label}</span>}
          {formatValue && (
            <span className="rounded-md bg-surface-secondary px-1.5 py-0.5 font-mono text-[11px] tabular-nums text-muted">
              {" "}
              {formatValue(value)}
            </span>
          )}
        </div>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        className="ds-range h-5 w-full cursor-pointer appearance-none bg-transparent outline-none disabled:cursor-not-allowed"
        style={
          {
            background: `linear-gradient(to right, ${fill} 0%, ${fill} ${pct}%, var(--default) ${pct}%, var(--default) 100%)`,
            color: fill,
            height: "6px",
            borderRadius: "99px",
            accentColor: fill,
          } as React.CSSProperties
        }
      />
    </div>
  );
}
