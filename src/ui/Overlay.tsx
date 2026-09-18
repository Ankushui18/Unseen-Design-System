import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../utils/cn";
import { useDialogFocus, useLockBody, useOnClickOutside } from "../lib/hooks";
import type { Tone } from "./Button";
import { RiCheckboxCircleLine, RiCloseCircleLine, RiCloseLine, RiErrorWarningLine, RiInformationLine } from "@remixicon/react";

/* --------------------------------- Modal ---------------------------------- */

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  placement = "center",
  icon,
  iconTone = "default",
}: {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  placement?: "center" | "top";
  icon?: ReactNode;
  iconTone?: Tone;
}) {
  const dialog = useRef<HTMLDivElement>(null);
  const titleId = useId();
  useLockBody(open);
  useDialogFocus(open, dialog, onClose);

  if (!open) return null;
  const w = { sm: "max-w-sm", md: "max-w-md", lg: "max-w-lg", xl: "max-w-2xl", full: "max-w-[calc(100vw-2rem)]" }[size];

  return createPortal(
    <div className={cn("fixed inset-0 z-[100] flex justify-center overflow-y-auto p-4", placement === "center" ? "items-center" : "items-start pt-[10vh]")}>
      <div className="animate-fade-in fixed inset-0 bg-backdrop backdrop-blur-[3px]" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : "Dialog"}
        ref={dialog}
        tabIndex={-1}
        className={cn("animate-pop-in relative z-10 flex max-h-[90dvh] w-full min-w-0 flex-col rounded-20 bg-overlay shadow-xl ring-1 ring-border", w)}
      >
        {(title || description || icon) && (
          <div className={cn("flex items-start gap-3.5 p-5", (children || footer) && "border-b border-separator")}>
            {icon && (
              <span
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-1 ring-inset [&_svg]:h-5 [&_svg]:w-5",
                  {
                    default: "bg-surface-secondary text-foreground ring-border",
                    accent: "bg-accent-soft text-accent ring-accent/20",
                    success: "bg-success-soft text-success ring-success/20",
                    warning: "bg-warning-soft text-warning-soft-foreground ring-warning/30",
                    danger: "bg-danger-soft text-danger ring-danger/20",
                  }[iconTone],
                )}
              >
                {icon}
              </span>
            )}
            <div className="min-w-0 flex-1 space-y-0.5">
              {title && <h2 id={titleId} className="text-label-md text-foreground">{title}</h2>}
              {description && <p className="text-paragraph-sm text-muted">{description}</p>}
            </div>
            <button onClick={onClose} className="-mt-1 -mr-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-6 text-subtle transition hover:bg-surface-hover hover:text-foreground" aria-label="Close">
              <RiCloseLine className="h-4 w-4" />
            </button>
          </div>
        )}
        {children && <div className="ds-scroll min-h-0 overflow-y-auto p-5 text-paragraph-sm text-muted" tabIndex={0}>{children}</div>}
        {footer && <div className="flex flex-wrap justify-end gap-3 border-t border-separator p-5">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}

/* --------------------------------- Drawer --------------------------------- */

const drawerSizes = { sm: 320, md: 400, lg: 560 } as const;

export function Drawer({
  open,
  onClose,
  title,
  children,
  footer,
  side = "right",
  size = "md",
  width,
}: {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  side?: "left" | "right" | "bottom";
  /** Width preset; explicit `width` in px wins when given. */
  size?: "sm" | "md" | "lg";
  width?: number;
}) {
  const dialog = useRef<HTMLDivElement>(null);
  const titleId = useId();
  useLockBody(open);
  useDialogFocus(open, dialog, onClose);
  if (!open) return null;

  const posCls =
    side === "bottom"
      ? "inset-x-0 bottom-0 rounded-t-20 border-t max-h-[80vh]"
      : side === "left"
        ? "inset-y-0 left-0 rounded-r-20 border-r"
        : "inset-y-0 right-0 rounded-l-20 border-l";

  return createPortal(
    <div className="fixed inset-0 z-[100]">
      <div className="animate-fade-in absolute inset-0 bg-backdrop backdrop-blur-[3px]" onClick={onClose} />
      <div
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={cn("absolute flex flex-col border-border bg-overlay shadow-xl", posCls)}
        style={{
          width: side === "bottom" ? undefined : Math.min(width ?? drawerSizes[size], typeof window !== "undefined" ? window.innerWidth - 32 : width ?? drawerSizes[size]),
          animation:
            side === "bottom"
              ? "slide-up .3s var(--ease-out-quint) both"
              : side === "left"
                ? "slide-in-left .3s var(--ease-out-quint) both"
                : "slide-in-right .3s var(--ease-out-quint) both",
        }}
      >
        <div className="flex items-center justify-between gap-4 border-b border-separator p-4">
          <h2 id={titleId} className="text-paragraph-sm font-medium tracking-tight">{title ?? "Details"}</h2>
          <button onClick={onClose} className="rounded-6 p-1.5 text-subtle transition hover:bg-surface-hover hover:text-foreground" aria-label="Close">
            <RiCloseLine className="h-4 w-4" />
          </button>
        </div>
        <div className="ds-scroll flex-1 overflow-y-auto p-4 text-paragraph-sm text-muted" tabIndex={0}>{children}</div>
        {footer && <div className="flex items-center justify-end gap-2 border-t border-separator p-4">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}

/* -------------------------------- Tooltip --------------------------------- */

export function Tooltip({
  content,
  children,
  placement = "top",
  delay = 120,
}: {
  content: ReactNode;
  children: ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  delay?: number;
}) {
  const [open, setOpen] = useState(false);
  const timer = useRef<number | null>(null);
  const show = () => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(true), delay);
  };
  const hide = () => {
    if (timer.current) window.clearTimeout(timer.current);
    setOpen(false);
  };
  const pos = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  }[placement];
  return (
    <span className="relative inline-flex" onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
      {children}
      {open && (
        <span
          role="tooltip"
          className={cn(
            "animate-pop-in pointer-events-none absolute z-50 rounded-8 bg-neutral-950 px-2.5 py-1.5 text-label-xs whitespace-nowrap text-white shadow-tooltip dark:bg-white dark:text-neutral-950",
            pos,
          )}
        >
          {content}
        </span>
      )}
    </span>
  );
}

/* -------------------------------- Popover --------------------------------- */

export type PopoverPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

export function Popover({
  trigger,
  children,
  placement = "bottom",
  showArrow = false,
  showClose = false,
  className,
}: {
  trigger: (props: { open: boolean; toggle: () => void }) => ReactNode;
  children: ReactNode | ((close: () => void) => ReactNode);
  placement?: PopoverPlacement;
  showArrow?: boolean;
  showClose?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useOnClickOutside(ref, close, open);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const pos: Record<PopoverPlacement, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2.5",
    "top-start": "bottom-full left-0 mb-2.5",
    "top-end": "bottom-full right-0 mb-2.5",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2.5",
    "bottom-start": "top-full left-0 mt-2.5",
    "bottom-end": "top-full right-0 mt-2.5",
    left: "right-full top-1/2 -translate-y-1/2 mr-2.5",
    "left-start": "right-full top-0 mr-2.5",
    "left-end": "right-full bottom-0 mr-2.5",
    right: "left-full top-1/2 -translate-y-1/2 ml-2.5",
    "right-start": "left-full top-0 ml-2.5",
    "right-end": "left-full bottom-0 ml-2.5",
  };

  const arrowPos: Record<PopoverPlacement, string> = {
    top: "-bottom-1.5 left-1/2 -translate-x-1/2 border-b border-r",
    "top-start": "-bottom-1.5 left-4 border-b border-r",
    "top-end": "-bottom-1.5 right-4 border-b border-r",
    bottom: "-top-1.5 left-1/2 -translate-x-1/2 border-t border-l",
    "bottom-start": "-top-1.5 left-4 border-t border-l",
    "bottom-end": "-top-1.5 right-4 border-t border-l",
    left: "-right-1.5 top-1/2 -translate-y-1/2 border-t border-r",
    "left-start": "-right-1.5 top-4 border-t border-r",
    "left-end": "-right-1.5 bottom-4 border-t border-r",
    right: "-left-1.5 top-1/2 -translate-y-1/2 border-b border-l",
    "right-start": "-left-1.5 top-4 border-b border-l",
    "right-end": "-left-1.5 bottom-4 border-b border-l",
  };

  return (
    <div className="relative inline-flex" ref={ref}>
      {trigger({ open, toggle: () => setOpen((o) => !o) })}
      {open && (
        <div
          role="dialog"
          aria-modal="false"
          className={cn(
            "animate-pop-in absolute z-50 min-w-48 rounded-16 bg-overlay p-4 shadow-xl ring-1 ring-border backdrop-blur-md",
            pos[placement],
            className
          )}
        >
          {showArrow && (
            <span
              className={cn(
                "absolute h-3 w-3 rotate-45 border-border bg-overlay pointer-events-none",
                arrowPos[placement]
              )}
              aria-hidden="true"
            />
          )}
          {showClose && (
            <button
              type="button"
              aria-label="Close popover"
              onClick={close}
              className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-6 text-subtle hover:bg-surface-hover hover:text-foreground transition-colors"
            >
              <RiCloseLine size={15} />
            </button>
          )}
          {typeof children === "function" ? children(close) : children}
        </div>
      )}
    </div>
  );
}

export function MenuItem({
  children,
  onClick,
  icon,
  shortcut,
  tone = "default",
  active,
}: {
  children: ReactNode;
  onClick?: () => void;
  icon?: ReactNode;
  shortcut?: string;
  tone?: "default" | "danger";
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-8 px-2.5 py-2 text-left text-paragraph-sm transition-colors",
        tone === "danger" ? "text-danger hover:bg-danger-soft" : "text-foreground hover:bg-surface-hover",
        active && "bg-accent-soft text-accent-soft-foreground",
      )}
    >
      {icon && <span className="shrink-0 text-subtle [&_svg]:h-4 [&_svg]:w-4">{icon}</span>}
      <span className="flex-1 truncate">{children}</span>
      {shortcut && <span className="font-mono text-[10px] text-subtle">{shortcut}</span>}
    </button>
  );
}

export const MenuSeparator = () => <div className="my-1 h-px bg-separator" />;
export const MenuLabel = ({ children }: { children: ReactNode }) => (
  <div className="px-2.5 pt-2 pb-1 text-[10px] font-medium tracking-wider text-subtle uppercase">{children}</div>
);

/* --------------------------------- Toast ---------------------------------- */

type ToastItem = { id: number; title: string; description?: string; tone: Tone; duration: number };
type ToastCtx = { push: (t: Omit<ToastItem, "id" | "tone" | "duration"> & { tone?: Tone; duration?: number }) => void };

const ToastContext = createContext<ToastCtx | null>(null);

const toastIcon = { accent: RiInformationLine, default: RiInformationLine, success: RiCheckboxCircleLine, warning: RiErrorWarningLine, danger: RiCloseCircleLine };

export function ToastProvider({ children, placement = "bottom-right" }: { children: ReactNode; placement?: "top-right" | "top-center" | "bottom-right" | "bottom-center" }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const push = useCallback<ToastCtx["push"]>((t) => {
    const id = Date.now() + Math.random();
    const item: ToastItem = { id, title: t.title, description: t.description, tone: t.tone ?? "default", duration: t.duration ?? 3800 };
    setItems((s) => [...s.slice(-3), item]);
    window.setTimeout(() => setItems((s) => s.filter((i) => i.id !== id)), item.duration);
  }, []);

  const value = useMemo(() => ({ push }), [push]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {typeof document !== "undefined" &&
        createPortal(
          <div className={cn("pointer-events-none fixed z-[200] flex w-[min(360px,calc(100vw-2rem))] flex-col gap-2", { "bottom-right": "right-4 bottom-4", "bottom-center": "left-1/2 bottom-4 -translate-x-1/2", "top-right": "right-4 top-4", "top-center": "left-1/2 top-4 -translate-x-1/2" }[placement])}>
            {items.map((t) => {
              const Icon = toastIcon[t.tone];
              const accentColor = {
                accent: "text-accent",
                default: "text-muted",
                success: "text-success",
                warning: "text-warning",
                danger: "text-danger",
              }[t.tone];
              return (
                <div key={t.id} className={cn("pointer-events-auto flex items-start gap-3 rounded-14 bg-overlay p-3.5 shadow-lg ring-1 ring-border", placement.startsWith("top") ? "animate-slide-down" : "animate-slide-up")}>
                  <Icon className={cn("mt-0.5 h-4.5 w-4.5 shrink-0", accentColor)} />
                  <div className="flex-1 space-y-0.5">
                    <p className="text-paragraph-sm leading-tight font-medium text-foreground">{t.title}</p>
                    {t.description && <p className="text-paragraph-xs text-muted">{t.description}</p>}
                  </div>
                  <button onClick={() => setItems((s) => s.filter((i) => i.id !== t.id))} className="rounded-6 p-1 text-subtle transition hover:bg-surface-hover hover:text-foreground" aria-label="Dismiss">
                    <RiCloseLine className="h-3.5 w-3.5" />
                  </button>
                </div>
              );
            })}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}
