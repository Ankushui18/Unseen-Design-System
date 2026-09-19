import { useId, useState, type ReactNode, type Ref } from "react";
import { cn } from "../utils/cn";
import { RiArrowDownSLine, RiArrowLeftDoubleLine, RiArrowLeftSLine, RiArrowRightDoubleLine, RiArrowRightSLine, RiMoreLine } from "@remixicon/react";

/* ---------------------------------- Tabs ---------------------------------- */

export type TabItem = { key: string; label: ReactNode; icon?: ReactNode; content?: ReactNode; disabled?: boolean; badge?: ReactNode };

export function Tabs({
  ref,
  items,
  value,
  onChange,
  variant = "solid",
  size = "md",
  fullWidth,
  className,
}: {
  items: TabItem[];
  value: string;
  onChange: (k: string) => void;
  variant?: "solid" | "underline" | "pill" | "segment";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
  ref?: Ref<HTMLDivElement>;
}) {
  const id = useId();
  const pad = { sm: "h-7 px-2.5 text-paragraph-sm", md: "h-9 px-3.5 text-paragraph-sm", lg: "h-11 px-5 text-paragraph-md" }[size];

  const listCls = {
    solid: "gap-1 rounded-10 bg-segment p-1",
    segment: "gap-0 rounded-10 bg-surface-secondary p-1 ring-1 ring-inset ring-border",
    underline: "gap-1 border-b border-separator",
    pill: "gap-2",
  }[variant];

  return (
    <div ref={ref} className={cn("flex flex-col gap-4", className)}>
      <div role="tablist" className={cn("flex items-center overflow-x-auto no-scrollbar", listCls, fullWidth && "w-full")}>
        {items.map((it) => {
          const active = it.key === value;
          const base = cn("relative inline-flex shrink-0 items-center justify-center gap-2 font-medium transition-all duration-[var(--duration-base)] ease-out-quint whitespace-nowrap", pad, fullWidth && "flex-1", it.disabled && "pointer-events-none opacity-[var(--disabled-opacity)]");
          const styles = {
            solid: cn("rounded-8", active ? "bg-surface text-foreground shadow-toggle ring-1 ring-border/60" : "text-muted hover:text-foreground"),
            segment: cn("rounded-8", active ? "bg-surface text-foreground shadow-toggle" : "text-muted hover:text-foreground"),
            underline: cn("rounded-t-6 -mb-px border-b-2", active ? "border-accent text-foreground" : "border-transparent text-muted hover:text-foreground"),
            pill: cn("rounded-full", active ? "bevel bg-neutral-950 text-white shadow-fancy-neutral dark:bg-neutral-200 dark:text-neutral-950" : "text-muted hover:bg-surface-hover hover:text-foreground"),
          }[variant];
          return (
            <button
              key={it.key}
              role="tab"
              id={`${id}-${it.key}`}
              aria-selected={active}
              aria-controls={it.content ? `${id}-${it.key}-panel` : undefined}
              tabIndex={active ? 0 : -1}
              type="button"
              disabled={it.disabled}
              onClick={() => onChange(it.key)}
              onKeyDown={(e) => {
                if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
                e.preventDefault();
                const enabled = items.filter((item) => !item.disabled);
                const current = enabled.findIndex((item) => item.key === it.key);
                const index = e.key === "Home" ? 0 : e.key === "End" ? enabled.length - 1 : (current + (e.key === "ArrowRight" ? 1 : -1) + enabled.length) % enabled.length;
                const next = enabled[index];
                if (next) { onChange(next.key); document.getElementById(`${id}-${next.key}`)?.focus(); }
              }}
              className={cn(base, styles)}
            >
              {it.icon && <span className="[&_svg]:h-4 [&_svg]:w-4">{it.icon}</span>}
              {it.label}
              {it.badge}
            </button>
          );
        })}
      </div>
      {items.find((i) => i.key === value)?.content && (
        <div id={`${id}-${value}-panel`} role="tabpanel" aria-labelledby={`${id}-${value}`} className="animate-fade-in">
          {items.find((i) => i.key === value)?.content}
        </div>
      )}
    </div>
  );
}

/* -------------------------------- Accordion -------------------------------- */

export function Accordion({
  ref,
  items,
  variant = "bordered",
  multiple,
  defaultOpen = [],
}: {
  items: { key: string; title: ReactNode; subtitle?: ReactNode; content: ReactNode; icon?: ReactNode; disabled?: boolean }[];
  variant?: "bordered" | "split" | "flush";
  multiple?: boolean;
  defaultOpen?: string[];
  ref?: Ref<HTMLDivElement>;
}) {
  const [open, setOpen] = useState<string[]>(defaultOpen);
  const toggle = (k: string) =>
    setOpen((s) => (s.includes(k) ? s.filter((i) => i !== k) : multiple ? [...s, k] : [k]));

  const wrap = {
    bordered: "rounded-14 bg-surface ring-1 ring-border divide-y divide-separator overflow-hidden shadow-xs",
    split: "flex flex-col gap-2.5",
    flush: "divide-y divide-separator",
  }[variant];

  return (
    <div ref={ref} className={wrap}>
      {items.map((it) => {
        const isOpen = open.includes(it.key);
        return (
          <div key={it.key} className={cn(variant === "split" && "overflow-hidden rounded-14 bg-surface ring-1 ring-border shadow-xs", it.disabled && "opacity-[var(--disabled-opacity)]")}>
            <button
              disabled={it.disabled}
              onClick={() => toggle(it.key)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-surface-hover disabled:pointer-events-none"
            >
              {it.icon && <span className="text-muted [&_svg]:h-4 [&_svg]:w-4">{it.icon}</span>}
              <span className="flex-1">
                <span className="block text-paragraph-sm font-medium text-foreground">{it.title}</span>
                {it.subtitle && <span className="block text-paragraph-xs text-muted">{it.subtitle}</span>}
              </span>
              <RiArrowDownSLine className={cn("h-4 w-4 shrink-0 text-subtle transition-transform duration-[var(--duration-slow)] ease-out-quint", isOpen && "rotate-180")} />
            </button>
            <div className="grid transition-[grid-template-rows] duration-[var(--duration-slow)] ease-out-quint" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
              <div className="overflow-hidden">
                <div className="px-4 pb-4 text-paragraph-sm text-muted">{it.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------- Breadcrumbs ------------------------------- */

export function Breadcrumbs({ ref, items, className }: { items: { label: ReactNode; href?: string }[]; className?: string ; ref?: Ref<HTMLElement> }) {
  return (
    <nav ref={ref} aria-label="Breadcrumb" className={cn("flex items-center gap-1 text-paragraph-sm", className)}>
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <RiArrowRightSLine className="h-3.5 w-3.5 text-subtle" />}
          {it.href && i < items.length - 1 ? (
            <a href={it.href} className="rounded px-1 py-0.5 text-muted transition-colors hover:text-foreground">
              {it.label}
            </a>
          ) : (
            <span className={cn("px-1 py-0.5", i === items.length - 1 ? "font-medium text-foreground" : "text-muted")}>{it.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

/* ------------------------------- Pagination -------------------------------- */

export function Pagination({
  ref,
  page,
  total,
  onChange,
  siblings = 1,
  compact,
}: {
  page: number;
  total: number;
  onChange: (p: number) => void;
  siblings?: number;
  compact?: boolean;
  ref?: Ref<HTMLElement>;
}) {
  const pages: (number | "…")[] = [];
  const push = (n: number | "…") => pages.push(n);
  const start = Math.max(2, page - siblings);
  const end = Math.min(total - 1, page + siblings);
  push(1);
  if (start > 2) push("…");
  for (let i = start; i <= end; i++) push(i);
  if (end < total - 1) push("…");
  if (total > 1) push(total);

  const btn = "inline-flex h-9 min-w-9 items-center justify-center rounded-8 px-2 text-paragraph-sm font-medium transition-all duration-[var(--duration-fast)] disabled:pointer-events-none disabled:opacity-40";

  return (
    <nav ref={ref} className="flex items-center gap-1" aria-label="Pagination">
      {!compact && (
        <button className={cn(btn, "text-muted hover:bg-surface-hover hover:text-foreground")} disabled={page === 1} onClick={() => onChange(1)} aria-label="First page">
          <RiArrowLeftDoubleLine className="h-4 w-4" />
        </button>
      )}
      <button className={cn(btn, "text-muted hover:bg-surface-hover hover:text-foreground")} disabled={page === 1} onClick={() => onChange(page - 1)} aria-label="Previous page">
        <RiArrowLeftSLine className="h-4 w-4" />
      </button>
      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`e${i}`} className="inline-flex h-9 w-9 items-center justify-center text-subtle">
            <RiMoreLine className="h-4 w-4" />
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            aria-current={p === page ? "page" : undefined}
            className={cn(btn, p === page ? "bg-surface text-foreground shadow-fancy-stroke" : "text-muted hover:bg-surface-hover hover:text-foreground")}
          >
            {p}
          </button>
        ),
      )}
      <button className={cn(btn, "text-muted hover:bg-surface-hover hover:text-foreground")} disabled={page === total} onClick={() => onChange(page + 1)} aria-label="Next page">
        <RiArrowRightSLine className="h-4 w-4" />
      </button>
      {!compact && (
        <button className={cn(btn, "text-muted hover:bg-surface-hover hover:text-foreground")} disabled={page === total} onClick={() => onChange(total)} aria-label="Last page">
          <RiArrowRightDoubleLine className="h-4 w-4" />
        </button>
      )}
    </nav>
  );
}

/* ---------------------------------- Table ---------------------------------- */

export type Column<T> = { key: keyof T & string; header: ReactNode; align?: "left" | "right" | "center"; render?: (row: T) => ReactNode; width?: string };

export function Table<T extends Record<string, unknown>>({
  ref,
  columns,
  rows,
  striped,
  hoverable = true,
  caption,
  variant = "bordered",
  density = "comfortable",
  className,
}: {
  columns: Column<T>[];
  rows: T[];
  striped?: boolean;
  hoverable?: boolean;
  caption?: ReactNode;
  variant?: "bordered" | "split" | "flush";
  density?: "comfortable" | "compact";
  className?: string;
  ref?: Ref<HTMLDivElement>;
}) {
  const thPad = density === "compact" ? "py-1.5" : "py-2.5";
  const tdPad = density === "compact" ? "py-2" : "py-3";
  const colDiv = variant === "split" ? "border-r border-separator-secondary last:border-r-0" : "";
  return (
    <div ref={ref}
      className={cn(
        variant === "flush"
          ? "bg-surface"
          : "overflow-hidden rounded-14 bg-surface ring-1 ring-border shadow-xs",
        className,
      )}
    >
      <div className="ds-scroll overflow-x-auto">
        <table className="w-full text-left text-paragraph-sm">
          {caption && <caption className="border-b border-separator px-4 py-2.5 text-left text-paragraph-xs text-muted">{caption}</caption>}
          <thead>
            <tr className="border-b border-separator bg-surface-secondary">
              {columns.map((c) => (
                <th
                  key={c.key}
                  style={{ width: c.width }}
                  className={cn("px-4 text-subheading-xs text-subtle uppercase", thPad, colDiv, c.align === "right" && "text-right", c.align === "center" && "text-center")}
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-separator-secondary">
            {rows.map((r, i) => (
              <tr key={i} className={cn(striped && i % 2 === 1 && "bg-surface-secondary/60", hoverable && "transition-colors hover:bg-surface-hover")}>
                {columns.map((c) => (
                  <td key={c.key} className={cn("px-4 align-middle text-foreground", tdPad, colDiv, c.align === "right" && "text-right", c.align === "center" && "text-center")}>
                    {c.render ? c.render(r) : (r[c.key] as ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-10 text-center text-paragraph-sm text-muted">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
