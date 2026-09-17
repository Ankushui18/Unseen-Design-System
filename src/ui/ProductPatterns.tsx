import { useState, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { Avatar, Skeleton } from "./Display";
import { Switch, Checkbox } from "./Form";
import { Button } from "./Button";
import { CompactButton } from "./Extra";
import { Pagination } from "./Navigation";
import { useCopy } from "../lib/hooks";
import { Popover } from "./Overlay";
import { RiArrowDownLine, RiArrowDownSLine, RiArrowRightLine, RiArrowUpDownLine, RiArrowUpLine, RiCheckLine, RiCloseLine, RiEyeOffLine, RiMoreLine, RiSearchLine } from "@remixicon/react";

/* -------------------------------------------------------------------------- */
/*                              PageHeader                                     */
/* -------------------------------------------------------------------------- */

export interface PageHeaderProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  primary?: ReactNode;
  secondary?: ReactNode;
  meta?: ReactNode;
  className?: string;
}

export function PageHeader({ eyebrow, title, description, primary, secondary, meta, className }: PageHeaderProps) {
  return (
    <header className={cn("product-page-header", className)}>
      <div className="product-page-header-main">
        {eyebrow && <p className="product-page-eyebrow">{eyebrow}</p>}
        <h1 className="product-page-title">{title}</h1>
        {description && <p className="product-page-description">{description}</p>}
      </div>
      {(primary || secondary) && (
        <div className="product-page-actions">
          {secondary && <div className="product-page-actions-secondary">{secondary}</div>}
          {primary && <div className="product-page-actions-primary">{primary}</div>}
        </div>
      )}
      {meta && <div className="product-page-meta">{meta}</div>}
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*                              SearchBar                                      */
/* -------------------------------------------------------------------------- */

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  shortcut?: string;
  onSubmit?: () => void;
  className?: string;
  autoFocus?: boolean;
}

export function SearchBar({ value, onChange, placeholder = "Search…", shortcut, onSubmit, className, autoFocus }: SearchBarProps) {
  return (
    <label className={cn("search-bar", className)}>
      <RiSearchLine size={15} aria-hidden />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter" && onSubmit) { e.preventDefault(); onSubmit(); } }}
        placeholder={placeholder}
        autoFocus={autoFocus}
        aria-label="Search"
      />
      {value ? (
        <button type="button" aria-label="Clear search" onClick={() => onChange("")} className="search-bar-clear">
          <RiCloseLine size={14} />
        </button>
      ) : (
        shortcut && <KbdShortcut value={shortcut} />
      )}
    </label>
  );
}

function KbdShortcut({ value }: { value: string }) {
  const parts = value.split("+");
  return (
    <span className="search-bar-shortcut" aria-hidden>
      {parts.map((p) => <kbd key={p}>{p}</kbd>)}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*                              FilterBar                                      */
/* -------------------------------------------------------------------------- */

export interface FilterBarProps {
  children: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  className?: string;
}

export function FilterBar({ children, leading, trailing, className }: FilterBarProps) {
  return (
    <div className={cn("filter-bar", className)} role="toolbar" aria-label="Filter">
      {leading && <div className="filter-bar-leading">{leading}</div>}
      <div className="filter-bar-main">{children}</div>
      {trailing && <div className="filter-bar-trailing">{trailing}</div>}
    </div>
  );
}

export function FilterChip({ active, onClick, children, count, className }: { active: boolean; onClick: () => void; children: ReactNode; count?: number; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn("filter-chip", active && "is-active", className)}
    >
      {children}
      {typeof count === "number" && <span className="filter-chip-count">{count}</span>}
    </button>
  );
}

export function SortMenu({ value, onChange, options, label = "Sort" }: { value: string; onChange: (value: string) => void; options: { value: string; label: string }[]; label?: string }) {
  const current = options.find((o) => o.value === value) ?? options[0];
  return (
    <Popover
      trigger={({ toggle, open }) => (
        <button type="button" onClick={toggle} className="sort-menu" aria-expanded={open}>
          <RiArrowUpDownLine size={14} />
          <span>{label}: {current.label}</span>
          <RiArrowDownSLine size={14} className={cn("sort-menu-caret", open && "is-open")} />
        </button>
      )}
      className="w-56 p-1"
    >
      {(close) => (
        <div>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => { onChange(option.value); close(); }}
              className={cn("sort-menu-item", option.value === value && "is-active")}
            >
              {option.label}
              {option.value === value && <RiCheckLine size={14} />}
            </button>
          ))}
        </div>
      )}
    </Popover>
  );
}

/* -------------------------------------------------------------------------- */
/*                              DataTable                                      */
/* -------------------------------------------------------------------------- */

export interface DataTableColumn<T> {
  key: string;
  header: ReactNode;
  align?: "left" | "right" | "center";
  width?: string;
  alignNumeric?: boolean;
  render: (row: T) => ReactNode;
  sortable?: boolean;
  sortKey?: (row: T) => string | number;
  className?: string;
}

export interface DataTableBulkAction {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  tone?: "default" | "danger" | "accent";
  onSelect: (rows: unknown[]) => void;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  selectable?: boolean;
  loading?: boolean;
  emptyState?: ReactNode;
  initialSort?: { key: string; direction: "asc" | "desc" };
  bulkActions?: DataTableBulkAction[];
  pagination?: { page: number; totalPages: number; onPageChange: (page: number) => void };
  density?: "comfortable" | "compact";
  className?: string;
}

type SortState = { key: string; direction: "asc" | "desc" } | null;

export function DataTable<T>({ columns, rows, rowKey, selectable, loading, emptyState, initialSort, bulkActions, pagination, density = "comfortable", className }: DataTableProps<T>) {
  const [sort, setSort] = useState<SortState>(initialSort ? { key: initialSort.key, direction: initialSort.direction } : null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const allKey = rows.map(rowKey);
  const allChecked = allKey.length > 0 && allKey.every((k) => selected.has(k));
  const someChecked = allKey.some((k) => selected.has(k)) && !allChecked;

  const visibleRows = sort
    ? [...rows].sort((a, b) => {
        const column = columns.find((c) => c.key === sort.key);
        if (!column || !column.sortKey) return 0;
        const av = column.sortKey(a);
        const bv = column.sortKey(b);
        const result = typeof av === "number" && typeof bv === "number" ? av - bv : String(av).localeCompare(String(bv));
        return sort.direction === "asc" ? result : -result;
      })
    : rows;

  const headerCls = (column: DataTableColumn<T>) =>
    cn("data-table-header-cell", column.align === "right" && "is-right", column.align === "center" && "is-center", column.sortable && "is-sortable", density === "compact" && "is-compact", column.className);

  const cellCls = (column: DataTableColumn<T>) =>
    cn("data-table-cell", column.align === "right" && "is-right", column.align === "center" && "is-center", column.alignNumeric && "is-numeric", density === "compact" && "is-compact", column.className);

  const toggleAll = () => {
    if (allChecked) setSelected(new Set());
    else setSelected(new Set(allKey));
  };

  const toggleOne = (key: string) => {
    const next = new Set(selected);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setSelected(next);
  };

  const selectedRows = rows.filter((row) => selected.has(rowKey(row)));

  return (
    <div className={cn("data-table", className, loading && "is-loading", density === "compact" && "is-compact")}>
      {selectable && selected.size > 0 && (
        <div className="data-table-bulk-bar" role="region" aria-live="polite">
          <span>{selected.size} selected</span>
          <div className="data-table-bulk-actions">
            {bulkActions?.map((action) => (
              <Button
                key={action.id}
                size="sm"
                variant={action.tone === "danger" ? "outline" : "ghost"}
                tone={action.tone}
                startContent={action.icon}
                onClick={() => { action.onSelect(selectedRows); setSelected(new Set()); }}
              >
                {action.label}
              </Button>
            ))}
            <Button size="sm" variant="ghost" tone="default" onClick={() => setSelected(new Set())}>Clear</Button>
          </div>
        </div>
      )}
      <div className="data-table-wrap">
        <table className="data-table-element">
          <thead>
            <tr>
              {selectable && (
                <th className={cn("data-table-header-cell is-checkbox", density === "compact" && "is-compact")}>
                  <Checkbox size="sm" checked={allChecked} indeterminate={someChecked} onChange={toggleAll} aria-label="Select all rows" />
                </th>
              )}
              {columns.map((column) => (
                <th key={column.key} className={headerCls(column)} scope="col" style={{ width: column.width }}>
                  {column.sortable ? (
                    <button
                      type="button"
                      className="data-table-sort-button"
                      onClick={() => setSort((current) => current?.key === column.key ? { key: column.key, direction: current.direction === "asc" ? "desc" : "asc" } : { key: column.key, direction: "asc" })}
                      aria-sort={sort?.key === column.key ? (sort.direction === "asc" ? "ascending" : "descending") : "none"}
                    >
                      {column.header}
                      {sort?.key === column.key ? (
                        sort.direction === "asc" ? <RiArrowUpLine size={12} /> : <RiArrowDownLine size={12} />
                      ) : (
                        <RiArrowUpDownLine size={12} className="data-table-sort-hint" />
                      )}
                    </button>
                  ) : column.header}
                </th>
              ))}
              <th className={cn("data-table-header-cell is-actions", density === "compact" && "is-compact")} />
            </tr>
          </thead>
          <tbody>
            {loading && Array.from({ length: 5 }).map((_, i) => (
              <tr key={i}>
                {selectable && <td className="data-table-cell is-checkbox is-compact"><Skeleton className="h-4 w-4 rounded-4" /></td>}
                {columns.map((column, j) => <td key={j} className={cellCls(column)}><Skeleton className="h-4 w-3/4" /></td>)}
                <td className={cellCls({ key: "actions" } as DataTableColumn<T>)} />
              </tr>
            ))}
            {!loading && visibleRows.length === 0 && (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0) + 1}>
                  {emptyState ?? <p className="data-table-empty">No results.</p>}
                </td>
              </tr>
            )}
            {!loading && visibleRows.map((row) => {
              const key = rowKey(row);
              return (
                <tr key={key} className={selected.has(key) ? "is-selected" : ""}>
                  {selectable && (
                    <td className={cn("data-table-cell is-checkbox", density === "compact" && "is-compact")}>
                      <Checkbox size="sm" checked={selected.has(key)} onChange={() => toggleOne(key)} aria-label="Select row" />
                    </td>
                  )}
                  {columns.map((column) => <td key={column.key} className={cellCls(column)}>{column.render(row)}</td>)}
                  <td className={cn("data-table-cell is-actions", density === "compact" && "is-compact")}>
                    <CompactButton variant="ghost" aria-label="Open row actions"><RiMoreLine size={16} /></CompactButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {pagination && (
        <div className="data-table-footer">
          <span className="data-table-footer-summary">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <Pagination page={pagination.page} total={pagination.totalPages} onChange={pagination.onPageChange} compact />
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              DataCard                                      */
/* -------------------------------------------------------------------------- */

export interface DataCardProps {
  label: ReactNode;
  value: ReactNode;
  trend?: { value: number; direction: "up" | "down" | "flat"; period?: string };
  description?: ReactNode;
  icon?: ReactNode;
  primary?: ReactNode;
  loading?: boolean;
  className?: string;
}

export function DataCard({ label, value, trend, description, icon, primary, loading, className }: DataCardProps) {
  if (loading) {
    return <div className={cn("data-card is-loading", className)}><Skeleton className="h-4 w-1/2" /><Skeleton className="mt-4 h-8 w-3/4" /></div>;
  }
  return (
    <div className={cn("data-card", className)}>
      <div className="data-card-header">
        <span className="data-card-label">{label}</span>
        {primary && <div className="data-card-primary">{primary}</div>}
      </div>
      <p className="data-card-value">{value}</p>
      <div className="data-card-footer">
        {trend && <TrendIndicator value={trend.value} direction={trend.direction} period={trend.period} />}
        {icon && !trend && <span className="data-card-icon">{icon}</span>}
        {description && trend && <span className="data-card-description">{description}</span>}
        {!description && !trend && description && <span className="data-card-description">{description}</span>}
      </div>
    </div>
  );
}

function TrendIndicator({ value, direction, period }: { value: number; direction: "up" | "down" | "flat"; period?: string }) {
  const positive = direction === "up";
  const negative = direction === "down";
  const sign = positive ? "+" : negative ? "" : "";
  const cls = cn(
    "trend-indicator",
    positive && "is-positive",
    negative && "is-negative",
    direction === "flat" && "is-flat",
  );
  return (
    <span className={cls}>
      {direction === "up" && <RiArrowUpLine size={12} />}
      {direction === "down" && <RiArrowDownLine size={12} />}
      {direction === "flat" && <RiArrowRightLine size={12} />}
      <span className="tabular-nums">{sign}{value}%</span>
      {period && <span className="trend-indicator-period">{period}</span>}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*                              ActivityItem                                   */
/* -------------------------------------------------------------------------- */

export interface ActivityItem {
  id: string;
  actor: { name: string; initials?: string; tone?: "accent" | "success" | "warning" | "default" | "danger" };
  verb: ReactNode;
  target?: ReactNode;
  time: ReactNode;
  tone?: "default" | "success" | "warning" | "danger";
  meta?: ReactNode;
}

export function ActivityItem({ item, density = "default" }: { item: ActivityItem; density?: "default" | "compact" }) {
  return (
    <article className={cn("activity-item", density === "compact" && "is-compact", item.tone && item.tone !== "default" && `is-${item.tone}`)}>
      <Avatar name={item.actor.name} size="sm" tone={item.actor.tone} />
      <div className="activity-item-body">
        <p className="activity-item-line">
          <strong>{item.actor.name}</strong> {item.verb} {item.target && <span className="activity-item-target">{item.target}</span>}
        </p>
        <p className="activity-item-meta">{item.time}{item.meta && <> · {item.meta}</>}</p>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Section (Forms)                              */
/* -------------------------------------------------------------------------- */

export function SettingsSection({ title, description, children, footer, className }: { title: ReactNode; description?: ReactNode; children: ReactNode; footer?: ReactNode; className?: string }) {
  return (
    <section className={cn("settings-section", className)}>
      <header className="settings-section-header">
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </header>
      <div className="settings-section-body">{children}</div>
      {footer && <div className="settings-section-footer">{footer}</div>}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                              EmptyState                                    */
/* -------------------------------------------------------------------------- */

export interface EmptyStateProps {
  icon: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function EmptyState({ icon, title, description, actions, size = "md", className }: EmptyStateProps) {
  return (
    <div className={cn("empty-state", `is-${size}`, className)}>
      <div className="empty-state-icon" aria-hidden>{icon}</div>
      <h2 className="empty-state-title">{title}</h2>
      {description && <p className="empty-state-description">{description}</p>}
      {actions && <div className="empty-state-actions">{actions}</div>}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              EmptyState variants                            */
/* -------------------------------------------------------------------------- */

export function LoadingState({ rows = 3, className }: { rows?: number; className?: string }) {
  return (
    <div className={cn("empty-state is-md", className)}>
      <div className="empty-state-icon" aria-hidden><Skeleton className="h-7 w-7 rounded-full" /></div>
      <h2 className="empty-state-title">Loading…</h2>
      <div className="empty-state-actions" style={{ flexDirection: "column", width: "100%", maxWidth: 320, gap: 8 }}>
        {Array.from({ length: rows }).map((_, i) => <Skeleton key={i} className="h-3 w-full" />)}
      </div>
    </div>
  );
}

export function ErrorState({ title, description, onRetry, className }: { title: ReactNode; description?: ReactNode; onRetry?: () => void; className?: string }) {
  return (
    <div className={cn("empty-state is-md", className)}>
      <div className="empty-state-icon" aria-hidden style={{ color: "var(--danger)" }}>!</div>
      <h2 className="empty-state-title">{title}</h2>
      {description && <p className="empty-state-description">{description}</p>}
      {onRetry && <div className="empty-state-actions"><Button tone="default" onClick={onRetry}>Try again</Button></div>}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              StatGrid                                      */
/* -------------------------------------------------------------------------- */

export function StatGrid({ children, columns = 4, className }: { children: ReactNode; columns?: 2 | 3 | 4; className?: string }) {
  return <div className={cn("stat-grid", `is-cols-${columns}`, className)}>{children}</div>;
}

/* -------------------------------------------------------------------------- */
/*                              Segment Tabs (alias for Tabs)                 */
/* -------------------------------------------------------------------------- */

export { Tabs as SegmentTabs } from "./Navigation";

/* -------------------------------------------------------------------------- */
/*                              CardGrid                                      */
/* -------------------------------------------------------------------------- */

export function CardGrid({ children, columns = 3, className }: { children: ReactNode; columns?: 2 | 3 | 4; className?: string }) {
  return <div className={cn("card-grid", `is-cols-${columns}`, className)}>{children}</div>;
}

/* -------------------------------------------------------------------------- */
/*                              SettingsToggle                              */
/* -------------------------------------------------------------------------- */

export function SettingsToggle({ label, description, checked, onChange, disabled, className }: { label: ReactNode; description?: ReactNode; checked: boolean; onChange: (value: boolean) => void; disabled?: boolean; className?: string }) {
  return (
    <div className={cn("settings-toggle", className)}>
      <div className="settings-toggle-label">
        <strong>{label}</strong>
        {description && <span>{description}</span>}
      </div>
      <Switch checked={checked} onChange={onChange} disabled={disabled} label={typeof label === "string" ? label : undefined} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              CopyField (Secret)                          */
/* -------------------------------------------------------------------------- */

export function CopyField({ value, className }: { value: string; className?: string }) {
  const { copy, copied } = useCopy();
  return (
    <button
      type="button"
      className={cn("copy-field", className)}
      onClick={() => copy(value)}
      aria-label={copied ? "Copied" : "Copy value"}
    >
      <span className="copy-field-value">{value}</span>
      <span className="copy-field-action">{copied ? <RiCheckLine size={14} /> : <RiEyeOffLine size={14} />}</span>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*                              SideNavItem                                  */
/* -------------------------------------------------------------------------- */

export function SideNavItem({ icon, label, count, active, disabled, onClick, suffix }: { icon: ReactNode; label: ReactNode; count?: number; active?: boolean; disabled?: boolean; onClick?: () => void; suffix?: ReactNode }) {
  const content = (
    <>
      {icon && <span className="side-nav-item-icon" aria-hidden>{icon}</span>}
      <span className="side-nav-item-label">{label}</span>
      {typeof count === "number" && <span className="side-nav-item-count">{count}</span>}
      {suffix && <span className="side-nav-item-suffix">{suffix}</span>}
    </>
  );
  if (onClick) {
    return (
      <button type="button" onClick={onClick} disabled={disabled} aria-current={active ? "page" : undefined} className={cn("side-nav-item", active && "is-active", disabled && "is-disabled")}>
        {content}
      </button>
    );
  }
  return (
    <a href="#" aria-current={active ? "page" : undefined} className={cn("side-nav-item", active && "is-active")}>
      {content}
    </a>
  );
}

/* -------------------------------------------------------------------------- */
/*                              TextField (alias for Input)                    */
/* -------------------------------------------------------------------------- */

export { Input as TextField } from "./Form";
