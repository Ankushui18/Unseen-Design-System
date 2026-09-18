import { forwardRef, cloneElement, isValidElement, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactElement, type ReactNode } from "react";
import { cn } from "../utils/cn";

/**
 * Button — matches AlignUI's button contract with full polymorphism (asChild & href support):
 *   variant (intent) : accent(primary) | default(neutral) | success | warning | danger(error)
 *   mode             : solid(filled) | outline(stroke) | soft(lighter) | ghost | link
 *   size             : md 40 · sm 36 · xs 32 · xxs 28  (+ lg 48 for marketing)
 * All sizes use text-label-sm. Icons are 20px and pull in by -mx-1 with a 12px gap.
 */
export type Variant = "solid" | "soft" | "outline" | "ghost" | "link";
export type Tone = "accent" | "default" | "success" | "warning" | "danger";
export type Size = "xxs" | "xs" | "sm" | "md" | "lg";

/* ------------------------------ vocabulary law ------------------------------
 * COMPONENT-QUALITY-SPEC.md §3: canonical props (tone/variant/size) are the API
 * of record; the display vocabulary below is human-facing (docs, playground,
 * marketing) and the AlignUI-shaped shorthand is an *alias layer* — ergonomics,
 * never new cells (variant-audit excludes `*Alias` members from cell counting).
 *
 * Precedence (total, documented in the API table, locked by unit tests):
 *   1. canonical prop              tone / variant / size
 *   2. explicit alias prop         mode  (look)
 *   3. shorthand inside `variant`  "primary" | "destructive" | … (intents)
 * Values are disjoint (`primary` can only be an intent, `solid` only a look),
 * so resolution is unambiguous and aliases never change rendered output.
 * -------------------------------------------------------------------------- */
export type IntentAlias = "primary" | "secondary" | "neutral" | "destructive" | "success" | "warning";
export type Mode = "filled" | "stroke" | "lighter" | "ghost";

/** Display labels for the canonical intents (docs/playground only). */
export const toneLabels: Record<Tone, string> = {
  accent: "Primary", default: "Secondary", success: "Success", warning: "Warning", danger: "Destructive",
};
/** Display labels for the canonical looks (docs/playground only). */
export const variantLabels: Record<Variant, string> = {
  solid: "Filled", soft: "Lighter", outline: "Stroke", ghost: "Ghost", link: "Link",
};
/** Display labels for the canonical sizes (docs/playground only). 1:1 relabel, spec §3.2. */
export const sizeLabels: Record<Size, string> = { xxs: "XS", xs: "SM", sm: "MD", md: "LG", lg: "XL" };
export const sizePixels: Record<Size, number> = { xxs: 28, xs: 32, sm: 36, md: 40, lg: 48 };

const intentAliases: Record<IntentAlias, Tone> = {
  primary: "accent", secondary: "default", neutral: "default",
  destructive: "danger", success: "success", warning: "warning",
};
const modeAliases: Record<Mode, Variant> = {
  filled: "solid", stroke: "outline", lighter: "soft", ghost: "ghost",
};
const isIntentAlias = (v: unknown): v is IntentAlias => typeof v === "string" && v in intentAliases;
const isModeAlias = (v: unknown): v is Mode => typeof v === "string" && v in modeAliases;

/**
 * Resolve the public vocabulary to the canonical pair. Exported so docs, tests
 * and future action components share one definition (never re-implement this).
 */
export function resolveButtonVocabulary(input: {
  tone?: Tone; color?: Tone; variant?: Variant | IntentAlias; mode?: Mode; size?: Size;
}): { tone: Tone; variant: Variant; size: Size } {
  const { tone, color, variant, mode, size } = input;
  const intent: Tone =
    tone ?? color ?? (isIntentAlias(variant) ? intentAliases[variant] : undefined) ?? "accent";
  /* precedence (spec §3.3): canonical prop → alias prop → shorthand inside variant */
  const look: Variant =
    variant && !isIntentAlias(variant) ? variant : isModeAlias(mode) ? modeAliases[mode] : "solid";
  return { tone: intent, variant: look, size: size ?? "md" };
}

const sizes: Record<Size, string> = {
  xxs: "h-7 gap-2.5 rounded-8 px-2 text-label-sm",
  xs: "h-8 gap-2.5 rounded-8 px-2.5 text-label-sm",
  sm: "h-9 gap-3 rounded-8 px-3 text-label-sm",
  md: "h-10 gap-3 rounded-10 px-3.5 text-label-sm",
  lg: "h-12 gap-3 rounded-12 px-5 text-label-md",
};

const iconOnlySizes: Record<Size, string> = {
  xxs: "h-7 w-7 rounded-8",
  xs: "h-8 w-8 rounded-8",
  sm: "h-9 w-9 rounded-8",
  md: "h-10 w-10 rounded-10",
  lg: "h-12 w-12 rounded-12",
};

/* filled */
const solid: Record<Tone, string> = {
  accent: "btn-accent-fill hover:text-accent-foreground focus-visible:shadow-ring-accent",
  default: "btn-neutral-fill text-white hover:text-white focus-visible:shadow-ring-neutral dark:text-neutral-950 dark:hover:text-neutral-950",
  success: "bg-success text-success-foreground hover:bg-success-hover focus-visible:shadow-ring-accent",
  warning: "bg-warning text-warning-foreground hover:bg-warning-hover focus-visible:shadow-ring-neutral",
  danger: "bg-danger text-danger-foreground hover:bg-danger-hover focus-visible:shadow-ring-danger",
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

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "prefix" | "color"> {
  /** Canonical look axis: solid | soft | outline | ghost | link. Also accepts intent shorthands (primary, destructive, …) — see resolveButtonVocabulary. */
  variant?: Variant | IntentAlias;
  /** Canonical intent axis (API of record). */
  tone?: Tone;
  /** AlignUI-shaped intent shorthand — alias for tone. */
  color?: Tone;
  /** AlignUI-shaped look shorthand — alias for variant (filled | stroke | lighter | ghost). */
  mode?: Mode;
  size?: Size;
  loading?: boolean;
  /** HeroUI alias for loading */
  isLoading?: boolean;
  iconOnly?: boolean;
  /** HeroUI alias for iconOnly */
  isIconOnly?: boolean;
  /** HeroUI alias for disabled */
  isDisabled?: boolean;
  fullWidth?: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
  asChild?: boolean;
  href?: string;
  target?: string;
  rel?: string;
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
  {
    className,
    variant: variantProp,
    tone: toneProp,
    color,
    mode,
    size: sizeProp,
    loading: baseLoading = false,
    isLoading,
    iconOnly: baseIconOnly = false,
    isIconOnly,
    fullWidth = false,
    startContent,
    endContent,
    children,
    disabled: baseDisabled,
    isDisabled,
    type = "button",
    asChild = false,
    href,
    target,
    rel,
    ...props
  },
  ref,
) {
  const { tone, variant, size } = resolveButtonVocabulary({ tone: toneProp, color, variant: variantProp, mode, size: sizeProp });
  const loading = isLoading ?? baseLoading;
  const iconOnly = isIconOnly ?? baseIconOnly;
  const disabled = isDisabled ?? baseDisabled;
  const isLink = variant === "link";
  const buttonClasses = cn(
    "group relative inline-flex shrink-0 select-none items-center justify-center whitespace-nowrap outline-none",
    "transition duration-[var(--duration-base)] ease-out active:translate-y-px motion-reduce:transition-none font-medium",
    !isLink && "disabled:pointer-events-none disabled:bg-surface-secondary disabled:text-disabled disabled:shadow-none disabled:ring-transparent",
    isLink && "disabled:pointer-events-none disabled:text-disabled",
    isLink ? "h-auto gap-1 p-0 text-label-sm" : iconOnly ? iconOnlySizes[size] : sizes[size],
    map[variant][tone],
    fullWidth && "w-full",
    className,
  );

  const innerContent = (
    <>
      {loading && <Icon><Spinner /></Icon>}
      {!iconOnly && !loading && startContent && <Icon>{startContent}</Icon>}
      {iconOnly ? !loading && <Icon>{children ?? startContent ?? endContent}</Icon> : children}
      {!iconOnly && !loading && endContent && <Icon>{endContent}</Icon>}
    </>
  );

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{ className?: string }>;
    return cloneElement(child, {
      className: cn(buttonClasses, child.props.className),
      ...props,
    });
  }

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={buttonClasses}
        aria-disabled={disabled || loading || undefined}
        {...(props as unknown as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {innerContent}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonClasses}
      {...props}
    >
      {innerContent}
    </button>
  );
});

/* ------------------------------ Fancy Button ------------------------------- */

const fancy: Record<Tone | "stroke", string> = {
  accent: "btn-accent-fill hover:text-white focus-visible:shadow-ring-accent focus-visible:filter-none",
  default: "btn-neutral-fill text-white hover:text-white focus-visible:shadow-ring-neutral dark:text-neutral-950 dark:hover:text-neutral-950",
  success: "bg-green-base text-white shadow-fancy-success hover:bg-green-dark focus-visible:shadow-ring-accent focus-visible:filter-none",
  warning: "bg-yellow-base text-warning-foreground shadow-fancy-warning hover:bg-yellow-dark focus-visible:shadow-ring-neutral focus-visible:filter-none",
  danger: "bg-red-base text-white shadow-fancy-danger hover:bg-red-dark focus-visible:shadow-ring-danger focus-visible:filter-none",
  stroke: "bg-surface text-foreground shadow-fancy-stroke hover:bg-surface-secondary focus-visible:shadow-ring-neutral",
};

export interface FancyButtonProps extends Omit<ButtonProps, "variant" | "tone"> {
  tone?: Tone | "stroke";
  /** Redeclared (same type as Button) so the size axis is visible on FancyButton itself. */
  size?: Size;
}

export const FancyButton = forwardRef<HTMLButtonElement, FancyButtonProps>(function FancyButton(
  { className, tone = "accent", size = "md", loading, iconOnly, fullWidth, startContent, endContent, children, disabled, type = "button", asChild, href, target, rel, ...props },
  ref,
) {
  const fancyClasses = cn(
    "relative inline-flex shrink-0 select-none items-center justify-center whitespace-nowrap outline-none transition duration-200 ease-out active:translate-y-px font-medium",
    "disabled:pointer-events-none disabled:bg-surface-secondary disabled:text-disabled disabled:shadow-none disabled:before:hidden",
    iconOnly ? iconOnlySizes[size] : sizes[size],
    fancy[tone],
    fullWidth && "w-full",
    className,
  );

  const innerContent = (
    <>
      {loading && <Icon><Spinner /></Icon>}
      {!iconOnly && !loading && startContent && <Icon>{startContent}</Icon>}
      {iconOnly ? !loading && <Icon>{children ?? startContent ?? endContent}</Icon> : children}
      {!iconOnly && !loading && endContent && <Icon>{endContent}</Icon>}
    </>
  );

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{ className?: string }>;
    return cloneElement(child, {
      className: cn(fancyClasses, child.props.className),
      ...props,
    });
  }

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={fancyClasses} {...(props as unknown as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {innerContent}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={fancyClasses}
      {...props}
    >
      {innerContent}
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
