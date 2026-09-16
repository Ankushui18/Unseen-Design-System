import { useState } from "react";
import { RiCloseLine, RiSparklingLine, RiFlaskLine } from "@remixicon/react";
import { cn } from "../utils/cn";

/**
 * Preview-mode messaging. PRO features are currently open while the system is
 * being validated; this module is the single source of truth for that copy so
 * flipping to paid later is a one-file change.
 */
export const PREVIEW_MODE = true;

export const PREVIEW_COPY = {
  banner: "All PRO components are free during public preview",
  note: "No signup, no paywall. Pricing is announced at launch — everything you see now stays available to preview.",
};

/** Slim dismissible announcement bar, mounted above the navbar. */
export function PreviewBanner({ onNavigate }: { onNavigate?: (to: string) => void }) {
  const [open, setOpen] = useState(true);
  if (!open || !PREVIEW_MODE) return null;
  return (
    <div className="relative z-[60] bg-accent text-accent-foreground">
      <div className="mx-auto flex max-w-[1600px] items-center justify-center gap-2 px-4 py-2 pr-10 text-center">
        <RiFlaskLine size={15} className="shrink-0 opacity-90" />
        <p className="text-paragraph-xs">
          <span className="font-medium">PRO is free during preview.</span>{" "}
          <span className="opacity-85">{PREVIEW_COPY.note}</span>{" "}
          {onNavigate && (
            <button onClick={() => onNavigate("pricing")} className="font-medium underline underline-offset-2 hover:opacity-80">
              See pricing
            </button>
          )}
        </p>
        <button
          onClick={() => setOpen(false)}
          aria-label="Dismiss announcement"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 opacity-70 transition hover:bg-black/10 hover:opacity-100"
        >
          <RiCloseLine size={14} />
        </button>
      </div>
    </div>
  );
}

/**
 * Tier badge for component listings. During preview, PRO items render a
 * "Free preview" pill instead of a paywalled "PRO" lock.
 */
export function TierBadge({ tier = "free", size = "sm", className }: { tier?: "free" | "pro"; size?: "sm" | "xs"; className?: string }) {
  const pro = tier === "pro";
  if (!pro)
    return (
      <span className={cn("inline-flex shrink-0 items-center gap-1 rounded-full bg-surface-secondary px-1.5 py-px font-medium text-subtle ring-1 ring-inset ring-border", size === "xs" ? "text-[9px]" : "text-[10px]", className)}>
        Free
      </span>
    );
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-full bg-accent-soft font-medium text-accent-soft-foreground ring-1 ring-inset ring-accent/20",
        size === "xs" ? "px-1.5 py-px text-[9px]" : "px-2 py-px text-[10px]",
        className,
      )}
    >
      <RiSparklingLine size={size === "xs" ? 9 : 11} />
      Free preview
    </span>
  );
}

/** Inline note used on pages that surface PRO-only features. */
export function PreviewNote({ className }: { className?: string }) {
  if (!PREVIEW_MODE) return null;
  return (
    <div className={cn("flex items-start gap-2.5 rounded-xl bg-accent-soft/60 px-4 py-3 text-paragraph-xs text-accent-soft-foreground", className)}>
      <RiFlaskLine size={15} className="mt-px shrink-0" />
      <p>
        <span className="font-medium">Free during preview.</span> This is a PRO feature, temporarily open while we test
        it in public. It stays free to preview until launch pricing is announced.
      </p>
    </div>
  );
}
