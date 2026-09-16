import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";

/**
 * Button — matches AlignUI's button contract:
 *   variant (intent) : accent(primary) | default(neutral) | success | warning | danger(error)
 *   mode             : solid(filled) | outline(stroke) | soft(lighter) | ghost | link
 *   size             : md 40 · sm 36 · xs 32 · xxs 28  (+ lg 48 for marketing)
 * All sizes use text-label-sm. Icons are 20px and pull in by -mx-1 with a 12px gap.
 */
export type Variant = "solid" | "soft" | "outline" | "ghost" | "link";
export type Tone = "accent" | "default" | "success" | "warning" | "danger";
export type Size = "xxs" | "xs" | "sm" | "md" | "lg";

const sizes: Record<Size, string> = {
  xxs: "h-7 gap-2.5 rounded-lg px-2 text-label-sm",
  xs: "h-8 gap-2.5 rounded-lg px-2.5 text-label-sm",
  sm: "h-9 gap-3 rounded-lg px-3 text-label-sm",
  md: "h-10 gap-3 rounded-10 px-3.5 text-label-sm",
  lg: "h-12 gap-3 rounded-10 px-5 text-label-md",
};

const iconOnlySizes: Record<Size, string> = {
  xxs: "h-7 w-7 rounded-lg",
  xs: "h-8 w-8 rounded-lg",
  sm: "h-9 w-9 rounded-lg",
  md: "h-10 w-10 rounded-10",
  lg: "h-12 w-12 rounded-10",
};

/* filled */
const solid: Record<Tone, string> = {
  accent: "bg-accent text-white hover:bg-accent-hover focus-visible:shadow-ring-accent",
  default: "bg-neutral-950 text-white hover:bg-neutral-800 focus-visible:shadow-ring-neutral dark:bg-neutral-100 dark:text-neutral-950 dark:hover:bg-white",
  success: "bg-green-base text-white hover:bg-green-dark focus-visible:shadow-ring-accent",
  warning: "bg-orange-base text-white hover:bg-orange-dark focus-visible:shadow-ring-neutral",
  danger: "bg-red-base text-white hover:bg-red-dark focus-visible:shadow-ring-danger",
};

/* stroke */
const outline: Record<Tone, string> = {
  accent: "bg-surface text-accent ring-1 ring-inset ring-accent hover:bg-accent-soft hover:ring-transparent focus-visible:shadow-ring-accent",
  default: "bg-surface text-muted shadow-xs ring-1 ring-inset ring-border hover:bg-surface-secondary hover:text-foreground hover:shadow-none hover:ring-transparent focus-visible:text-foreground focus-visible:shadow-ring-neutral focus-visible:ring-foreground",
  success: "bg-surface text-green-base ring-1 ring-inset ring-green-base hover:bg-green-lighter hover:ring-transparent focus-visible:shadow-ring-accent",
  warning: "bg-surface text-orange-base ring-1 ring-inset ring-orange-base hover:bg-orange-lighter hover:ring-transparent focus-visible:shadow-ring-neutral",
  danger: "bg-surface text-red-base ring-1 ring-inset ring-red-base hover:bg-red-lighter hover:ring-transparent focus-visible:shadow-ring-danger",
};

/* lighter */
const soft: Record<Tone, string> = {
  accent: "bg-accent-soft text-accent ring-1 ring-inset ring-transparent hover:bg-surface hover:ring-accent focus-visible:bg-surface focus-visible:ring-accent focus-visible:shadow-ring-accent",
  default: "bg-surface-secondary text-muted ring-1 ring-inset ring-transparent hover:bg-surface hover:text-foreground hover:shadow-xs hover:ring-border focus-visible:bg-surface focus-visible:text-foreground focus-visible:ring-foreground focus-visible:shadow-ring-neutral",
  success: "bg-green-lighter text-green-base ring-1 ring-inset ring-transparent hover:bg-surface hover:ring-green-base focus-visible:shadow-ring-accent",
  warning: "bg-orange-lighter text-orange-base ring-1 ring-inset ring-transparent hover:bg-surface hover:ring-orange-base focus-visible:shadow-ring-neutral",
  danger: "bg-red-lighter text-red-base ring-1 ring-inset ring-transparent hover:bg-surface hover:ring-red-base focus-visible:shadow-ring-danger",
};

/* ghost */
const ghost: Record<Tone, string> = {
  accent: "text-accent hover:bg-accent-soft focus-visible:bg-surface focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-accent focus-visible:shadow-ring-accent",
  default: "text-muted hover:bg-surface-secondary hover:text-foreground focus-visible:bg-surface focus-visible:text-foreground focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-foreground focus-visible:shadow-ring-neutral",
  success: "text-green-base hover:bg-green-lighter focus-visible:shadow-ring-accent",
  warning: "text-orange-base hover:bg-orange-lighter focus-visible:shadow-ring-neutral",
  danger: "text-red-base hover:bg-red-lighter focus-visible:shadow-ring-danger",
};

const link: Record<Tone, string> = {
  accent: "text-accent hover:text-accent-hover underline-offset-4 hover:underline",
  default: "text-muted hover:text-foreground underline-offset-4 hover:underline",
  success: "text-green-base underline-offset-4 hover:underline",
  warning: "text-orange-base underline-offset-4 hover:underline",
  danger: "text-red-base underline-offset-4 hover:underline",
};

const map = { solid, soft, outline, ghost, link };

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "prefix"> {
  variant?: Variant;
  tone?: Tone;
  size?: Size;
  loading?: boolean;
  iconOnly?: boolean;
  fullWidth?: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
}

export const Spinner = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={cn("h-5 w-5 animate-spin-slow", className)} aria-hidden>
    <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2.5" />
    <path d="M21.5 12a9.5 9.5 0 0 0-9.5-9.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const Icon = ({ children }: { children: ReactNode }) => (
  <span className="-mx-1 flex h-5 w-5 shrink-0 items-center justify-center [&_svg]:h-5 [&_svg]:w-5">{children}</span>
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "solid", tone = "accent", size = "md", loading = false, iconOnly = false, fullWidth = false, startContent, endContent, children, disabled, ...props },
  ref,
) {
  const isLink = variant === "link";
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        "group relative inline-flex shrink-0 select-none items-center justify-center whitespace-nowrap outline-none",
        "transition duration-200 ease-out",
        !isLink && "disabled:pointer-events-none disabled:bg-surface-secondary disabled:text-disabled disabled:shadow-none disabled:ring-transparent",
        isLink && "disabled:pointer-events-none disabled:text-disabled",
        isLink ? "h-auto gap-1 p-0 text-label-sm" : iconOnly ? iconOnlySizes[size] : sizes[size],
        map[variant][tone],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {loading && <Icon><Spinner /></Icon>}
      {!loading && startContent && <Icon>{startContent}</Icon>}
      {iconOnly ? !loading && <Icon>{children}</Icon> : children}
      {!loading && endContent && <Icon>{endContent}</Icon>}
    </button>
  );
});

/* ------------------------------ Fancy Button ------------------------------- */

const fancy: Record<Exclude<Tone, "success" | "warning"> | "stroke", string> = {
  accent: "bevel bg-accent text-white shadow-fancy-accent hover:bg-accent-hover focus-visible:shadow-ring-accent",
  default: "bevel bg-neutral-950 text-white shadow-fancy-neutral hover:bg-neutral-800 focus-visible:shadow-ring-neutral dark:bg-neutral-100 dark:text-neutral-950 dark:hover:bg-white",
  danger: "bevel bg-red-base text-white shadow-fancy-danger hover:bg-red-dark focus-visible:shadow-ring-danger",
  stroke: "bg-surface text-foreground shadow-fancy-stroke hover:bg-surface-secondary focus-visible:shadow-ring-neutral",
};

export interface FancyButtonProps extends Omit<ButtonProps, "variant" | "tone"> {
  tone?: "accent" | "default" | "danger" | "stroke";
}

export const FancyButton = forwardRef<HTMLButtonElement, FancyButtonProps>(function FancyButton(
  { className, tone = "accent", size = "md", loading, iconOnly, fullWidth, startContent, endContent, children, disabled, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        "relative inline-flex shrink-0 select-none items-center justify-center whitespace-nowrap outline-none transition duration-200 ease-out active:translate-y-px",
        "disabled:pointer-events-none disabled:bg-surface-secondary disabled:text-disabled disabled:shadow-none disabled:before:hidden",
        iconOnly ? iconOnlySizes[size] : sizes[size],
        fancy[tone],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {loading && <Icon><Spinner /></Icon>}
      {!loading && startContent && <Icon>{startContent}</Icon>}
      {iconOnly ? !loading && <Icon>{children}</Icon> : children}
      {!loading && endContent && <Icon>{endContent}</Icon>}
    </button>
  );
});

export function ButtonGroup({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-10 shadow-xs ring-1 ring-inset ring-border",
        "[&>*]:rounded-none [&>*]:shadow-none [&>*]:ring-0 [&>*:first-child]:rounded-l-10 [&>*:last-child]:rounded-r-10",
        "[&>*+*]:border-l [&>*+*]:border-border [&>*]:relative hover:[&>*]:z-10 focus-within:[&>*]:z-10",
        className,
      )}
      role="group"
    >
      {children}
    </div>
  );
}
