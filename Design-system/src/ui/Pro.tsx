import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import {
  RiAddLine,
  RiArrowDownLine,
  RiArrowUpDownLine,
  RiArrowUpLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiCheckLine,
  RiCloseLine,
  RiDragDropLine,
  RiDeleteBinLine,
  RiEyeLine,
  RiFileUploadLine,
  RiMoreLine,
  RiCheckDoubleLine,
  RiShuffleLine,
} from "@remixicon/react";
import { cn } from "../utils/cn";
import { Checkbox } from "./Form";
import { Button } from "./Button";
import { CompactButton, StatusBadge } from "./Extra";
import { Avatar, Chip } from "./Display";
import { Progress } from "./Display";

/* ================================ DATA TABLE ============================== */

export type SortDir = "asc" | "desc";

export type ColumnDef<T> = {
  key: string;
  header: ReactNode;
  align?: "left" | "right" | "center";
  width?: string;
  sortable?: boolean;
  hideBelow?: "sm" | "md" | "lg";
  cell: (row: T) => ReactNode;
  sortValue?: (row: T) => string | number;
};

export function DataTable<T extends { id: string | number }>({
  columns,
  rows,
  selectable,
  bulkActions,
  pageSize = 5,
  onRowClick,
  emptyState,
  toolbar,
  className,
}: {
  columns: ColumnDef<T>[];
  rows: T[];
  selectable?: boolean;
  bulkActions?: ReactNode;
  pageSize?: number;
  onRowClick?: (row: T) => void;
  emptyState?: ReactNode;
  toolbar?: ReactNode;
  className?: string;
}) {
  const [sort, setSort] = useState<{ key: string; dir: SortDir } | null>(null);
  const [selected, setSelected] = useState<(string | number)[]>([]);
  const [page, setPage] = useState(0);
  const [hidden, setHidden] = useState<string[]>([]);
  const [colsOpen, setColsOpen] = useState(false);

  const visible = columns.filter((c) => !hidden.includes(c.key));

  const sorted = useMemo(() => {
    if (!sort) return rows;
    const col = columns.find((c) => c.key === sort.key);
    const get = (r: T) => (col?.sortValue ? col.sortValue(r) : String(r[(col?.key ?? sort.key) as keyof T] ?? ""));
    return [...rows].sort((a, b) => {
      const av = get(a);
      const bv = get(b);
      const r = typeof av === "number" && typeof bv === "number" ? av - bv : String(av).localeCompare(String(bv));
      return sort.dir === "asc" ? r : -r;
    });
  }, [rows, sort, columns]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const current = sorted.slice(page * pageSize, page * pageSize + pageSize);
  const ids = current.map((r) => r.id);
  const allSelected = ids.length > 0 && ids.every((i) => selected.includes(i));
  const someSelected = ids.some((i) => selected.includes(i)) && !allSelected;

  useEffect(() => {
    if (page > pageCount - 1) setPage(0);
  }, [page, pageCount]);

  const toggleSort = (key: string) =>
    setSort((s) => (s?.key !== key ? { key, dir: "asc" } : s.dir === "asc" ? { key, dir: "desc" } : null));

  const alignCls = { left: "text-left", right: "text-right", center: "text-center" };
  const hideCls = { sm: "hidden sm:table-cell", md: "hidden md:table-cell", lg: "hidden lg:table-cell" };

  return (
    <div className={cn("overflow-hidden rounded-2xl bg-surface ring-1 ring-border shadow-xs", className)}>
      {(toolbar || selectable) && (
        <div className="flex min-w-0 flex-wrap items-center gap-3 px-4 py-3">
          {selected.length > 0 && selectable ? (
            <>
              <span className="text-label-sm text-foreground">
                <span className="text-accent">{selected.length}</span> selected
              </span>
              <div className="flex items-center gap-2">{bulkActions}</div>
              <CompactButton variant="ghost" aria-label="Clear selection" onClick={() => setSelected([])} className="ml-auto">
                <RiCloseLine />
              </CompactButton>
            </>
          ) : (
            <>
              {toolbar && <div className="flex min-w-0 flex-wrap items-center gap-2">{toolbar}</div>}
              {selectable && (
                <div className="relative ml-auto">
                  <CompactButton variant="stroke" aria-label="Toggle columns" onClick={() => setColsOpen((o) => !o)}>
                    <RiEyeLine />
                  </CompactButton>
                  {colsOpen && (
                    <div className="animate-pop-in absolute right-0 top-full z-30 mt-2 w-52 rounded-xl bg-surface p-1.5 shadow-lg ring-1 ring-border">
                      {columns.map((c) => (
                        <div key={c.key} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-paragraph-sm hover:bg-surface-hover">
                          <Checkbox
                            size="sm"
                            checked={!hidden.includes(c.key)}
                            onChange={(v) => setHidden((h) => (v ? h.filter((k) => k !== c.key) : [...h, c.key]))}
                            label={<span className="text-paragraph-xs">{typeof c.header === "string" ? c.header : c.key}</span>}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}

      <div className="ds-scroll overflow-x-auto border-t border-separator">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-surface-secondary text-subheading-xs uppercase text-subtle">
              {selectable && (
                <th className="w-10 px-4 py-2.5">
                  <Checkbox size="sm" checked={allSelected} indeterminate={someSelected} onChange={(v) => setSelected(v ? ids : [])} aria-label="Select all rows" />
                </th>
              )}
              {visible.map((c) => (
                <th key={c.key} style={{ width: c.width }} className={cn("px-3 py-2.5 font-medium", alignCls[c.align ?? "left"], c.hideBelow && hideCls[c.hideBelow])}>
                  {c.sortable ? (
                    <button onClick={() => toggleSort(c.key)} className="inline-flex items-center gap-1 uppercase transition-colors hover:text-foreground" aria-sort={sort?.key === c.key ? (sort.dir === "asc" ? "ascending" : "descending") : "none"}>
                      {c.header}
                      {sort?.key === c.key ? (
                        sort.dir === "asc" ? <RiArrowUpLine size={13} /> : <RiArrowDownLine size={13} />
                      ) : (
                        <RiArrowUpDownLine size={13} className="opacity-40" />
                      )}
                    </button>
                  ) : (
                    c.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-separator-secondary">
            {current.map((row) => {
              const isSel = selected.includes(row.id);
              return (
                <tr
                  key={row.id}
                  onClick={() => onRowClick?.(row)}
                  className={cn("transition-colors", onRowClick && "cursor-pointer", isSel ? "bg-accent-soft/45" : "hover:bg-surface-hover")}
                >
                  {selectable && (
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <Checkbox size="sm" checked={isSel} onChange={(v) => setSelected((s) => (v ? [...s, row.id] : s.filter((x) => x !== row.id)))} aria-label="Select row" />
                    </td>
                  )}
                  {visible.map((c) => (
                    <td key={c.key} className={cn("px-3 py-3 text-paragraph-sm text-foreground", alignCls[c.align ?? "left"], c.hideBelow && hideCls[c.hideBelow])}>
                      {c.cell(row)}
                    </td>
                  ))}
                </tr>
              );
            })}
            {current.length === 0 && (
              <tr>
                <td colSpan={visible.length + (selectable ? 1 : 0)} className="px-4 py-12 text-center">
                  {emptyState ?? <p className="text-paragraph-sm text-muted">No results.</p>}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {sorted.length > pageSize && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-separator px-4 py-3">
          <p className="text-paragraph-xs text-muted">
            {page * pageSize + 1}–{Math.min(sorted.length, (page + 1) * pageSize)} of {sorted.length}
          </p>
          <div className="flex items-center gap-1">
            <CompactButton variant="stroke" disabled={page === 0} onClick={() => setPage((p) => p - 1)} aria-label="Previous page">
              <RiArrowLeftSLine />
            </CompactButton>
            {Array.from({ length: pageCount }).slice(0, 5).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-current={i === page}
                className={cn("h-6 w-6 rounded-md text-paragraph-xs font-medium transition-colors", i === page ? "bg-accent text-white" : "text-muted hover:bg-surface-hover hover:text-foreground")}
              >
                {i + 1}
              </button>
            ))}
            {pageCount > 5 && <span className="px-1 text-paragraph-xs text-subtle">…</span>}
            <CompactButton variant="stroke" disabled={page >= pageCount - 1} onClick={() => setPage((p) => p + 1)} aria-label="Next page">
              <RiArrowRightSLine />
            </CompactButton>
          </div>
        </div>
      )}
    </div>
  );
}

/* =============================== FILE UPLOAD ============================== */

export type UploadedFile = { id: string; name: string; size: number; progress: number; status: "uploading" | "done" | "error"; format: string };

export function FileUpload({
  files,
  onChange,
  accept = "image/*,.pdf,.doc,.docx",
  maxSize = 10,
  multiple = true,
  className,
}: {
  files: UploadedFile[];
  onChange: (f: UploadedFile[]) => void;
  accept?: string;
  maxSize?: number;
  multiple?: boolean;
  className?: string;
}) {
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();

  const add = (list: FileList | null) => {
    if (!list) return;
    const next: UploadedFile[] = Array.from(list).map((f) => {
      const ext = f.name.split(".").pop() ?? "txt";
      return { id: `${f.name}-${f.size}-${Math.random()}`, name: f.name, size: f.size, progress: 0, status: "uploading", format: ext };
    });
    onChange(multiple ? [...files, ...next] : next.slice(0, 1));
    next.forEach((nf, i) => {
      let p = 0;
      const t = window.setInterval(() => {
        p += Math.random() * 22 + 8;
        onChange((multiple ? [...files, ...next] : next.slice(0, 1)).map((f) => (f.id === nf.id ? { ...f, progress: Math.min(100, p), status: p >= 100 ? "done" : "uploading" } : f)));
        if (p >= 100) window.clearInterval(t);
      }, 260 + i * 40);
    });
  };

  const bytes = (n: number) => (n > 1048576 ? `${(n / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`);

  return (
    <div className={cn("space-y-3", className)}>
      <label
        htmlFor={id}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); add(e.dataTransfer.files); }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed px-6 py-8 text-center transition-colors",
          drag ? "border-accent bg-accent-soft/40" : "border-border-strong bg-surface-secondary/50 hover:border-accent hover:bg-accent-soft/25",
        )}
      >
        <input ref={inputRef} id={id} type="file" accept={accept} multiple={multiple} className="sr-only" onChange={(e) => add(e.target.files)} />
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface text-muted ring-1 ring-border shadow-xs">
          {drag ? <RiCheckDoubleLine size={20} /> : <RiDragDropLine size={20} />}
        </span>
        <span className="sr-only" aria-live="polite">
          {files.some((f) => f.status === "uploading")
            ? `Uploading ${files.filter((f) => f.status === "uploading").length} file(s)`
            : drag
              ? "Drop the file to upload"
              : ""}
        </span>
        <span>
          <span className="block text-label-sm text-foreground">
            {drag ? "Drop to upload" : "Choose a file or drag & drop it here"}
          </span>
          <span className="mt-0.5 block text-paragraph-xs text-subtle">JPEG, PNG, PDF up to {maxSize} MB</span>
        </span>
        <span className="rounded-lg bg-neutral-950 px-3.5 py-2 text-label-xs text-white dark:bg-neutral-200 dark:text-neutral-950">Browse files</span>
      </label>

      {files.map((f) => (
        <div key={f.id} className="flex items-center gap-3 rounded-xl bg-surface p-3 ring-1 ring-border">
          <span className={cn("shrink-0 rounded-md px-1.5 py-1 text-[9px] font-bold uppercase text-white", f.status === "error" ? "bg-red-base" : "bg-blue-base")}>{f.format.slice(0, 4)}</span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-label-xs text-foreground">{f.name}</p>
            <p className="text-paragraph-xs text-subtle">{bytes(f.size)}</p>
            {f.status === "uploading" && <Progress value={f.progress} size="sm" className="mt-1.5" />}
          </div>
          {f.status === "done" ? (
            <StatusBadge status="completed" size="sm">Done</StatusBadge>
          ) : f.status === "uploading" ? (
            <span className="font-mono text-paragraph-xs tabular-nums text-muted">{Math.round(f.progress)}%</span>
          ) : (
            <StatusBadge status="failed" size="sm">Failed</StatusBadge>
          )}
          <CompactButton variant="ghost" aria-label={`Remove ${f.name}`} onClick={() => onChange(files.filter((x) => x.id !== f.id))}>
            <RiDeleteBinLine />
          </CompactButton>
        </div>
      ))}
    </div>
  );
}

/* ================================ CAROUSEL ================================ */

export function Carousel({ items, className }: { items: { id: string; title: string; body: string; author: string; role: string }[]; className?: string }) {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((v) => (v + d + items.length) % items.length);
  return (
    <div className={cn("w-full", className)}>
      <div className="overflow-hidden rounded-2xl bg-surface ring-1 ring-border shadow-xs">
        <div className="flex transition-transform duration-400 ease-out-quint" style={{ transform: `translateX(-${i * 100}%)` }}>
          {items.map((it) => (
            <div key={it.id} className="w-full shrink-0 p-6 sm:p-8">
              <p className="text-title-h6 text-foreground text-balance">{it.title}</p>
              <p className="mt-3 text-paragraph-sm text-muted">{it.body}</p>
              <div className="mt-5 flex items-center gap-3">
                <Avatar name={it.author} tone="accent" size="sm" />
                <div>
                  <p className="text-label-xs text-foreground">{it.author}</p>
                  <p className="text-paragraph-xs text-subtle">{it.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex gap-1.5">
          {items.map((_, n) => (
            <button key={n} onClick={() => setI(n)} aria-label={`Go to slide ${n + 1}`} className={cn("h-1.5 rounded-full transition-all duration-300", n === i ? "w-6 bg-foreground" : "w-1.5 bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-700")} />
          ))}
        </div>
        <div className="flex gap-1.5">
          <CompactButton variant="stroke" onClick={() => go(-1)} aria-label="Previous slide"><RiArrowLeftSLine /></CompactButton>
          <CompactButton variant="stroke" onClick={() => go(1)} aria-label="Next slide"><RiArrowRightSLine /></CompactButton>
        </div>
      </div>
    </div>
  );
}

/* ============================== TRANSFER LIST ============================= */

export function TransferList<T extends { id: string; label: string; meta?: string }>({
  available,
  selected,
  onChange,
  leftTitle = "Available",
  rightTitle = "Selected",
  className,
}: {
  available: T[];
  selected: T[];
  onChange: (sel: T[], avail: T[]) => void;
  leftTitle?: string;
  rightTitle?: string;
  className?: string;
}) {
  const [aPick, setAPick] = useState<string[]>([]);
  const [sPick, setSPick] = useState<string[]>([]);

  const move = (from: "a" | "s") => {
    if (from === "a") {
      const moving = available.filter((x) => aPick.includes(x.id));
      onChange([...selected, ...moving], available.filter((x) => !aPick.includes(x.id)));
      setAPick([]);
    } else {
      const moving = selected.filter((x) => sPick.includes(x.id));
      onChange(selected.filter((x) => !sPick.includes(x.id)), [...available, ...moving]);
      setSPick([]);
    }
  };

  const List = ({ items, picks, setPicks }: { items: T[]; picks: string[]; setPicks: (v: string[]) => void }) => (
    <div className="ds-scroll h-56 w-full overflow-y-auto rounded-xl bg-surface p-1.5 ring-1 ring-border">
      {items.length === 0 && <p className="py-8 text-center text-paragraph-xs text-subtle">Empty</p>}
      {items.map((it) => (
        <button
          key={it.id}
          onClick={() => setPicks(picks.includes(it.id) ? picks.filter((p) => p !== it.id) : [...picks, it.id])}
          className={cn("flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors", picks.includes(it.id) ? "bg-accent-soft text-accent-soft-foreground" : "text-foreground hover:bg-surface-hover")}
        >
          <span className={cn("flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] transition-colors", picks.includes(it.id) ? "bg-accent text-white" : "ring-1 ring-inset ring-border-strong")}>
            {picks.includes(it.id) && <RiCheckLine size={11} />}
          </span>
          <span className="min-w-0 flex-1 truncate text-paragraph-sm">{it.label}</span>
          {it.meta && <span className="text-paragraph-xs text-subtle">{it.meta}</span>}
        </button>
      ))}
    </div>
  );

  return (
    <div className={cn("grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center", className)}>
      <div className="min-w-0 space-y-2">
        <p className="text-label-xs text-muted">{leftTitle} · {available.length}</p>
        <List items={available} picks={aPick} setPicks={setAPick} />
      </div>
      <div className="flex justify-center gap-1.5">
        <CompactButton variant="stroke" disabled={!aPick.length} onClick={() => move("a")} aria-label="Move right"><RiArrowRightSLine /></CompactButton>
        <CompactButton variant="stroke" disabled={!sPick.length} onClick={() => move("s")} aria-label="Move left"><RiArrowLeftSLine /></CompactButton>
      </div>
      <div className="min-w-0 space-y-2">
        <p className="text-label-xs text-muted">{rightTitle} · {selected.length}</p>
        <List items={selected} picks={sPick} setPicks={setSPick} />
      </div>
    </div>
  );
}

/* =============================== INLINE EDIT ============================== */

export function InlineEdit({ value, onChange, className, multiline }: { value: string; onChange: (v: string) => void; className?: string; multiline?: boolean }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const ref = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editing) ref.current?.focus();
  }, [editing]);

  const commit = () => { onChange(draft.trim() || value); setEditing(false); };

  if (editing)
    return (
      <span className="inline-flex w-full items-center gap-1.5">
        {multiline ? (
          <textarea ref={ref as React.Ref<HTMLTextAreaElement>} value={draft} onChange={(e) => setDraft(e.target.value)} onBlur={commit} onKeyDown={(e) => { if (e.key === "Escape") { setDraft(value); setEditing(false); } if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); commit(); } }} rows={2} className="ds-scroll w-full rounded-lg bg-field px-2.5 py-2 text-paragraph-sm text-foreground ring-1 ring-inset ring-foreground outline-none" />
        ) : (
          <input ref={ref as React.Ref<HTMLInputElement>} value={draft} onChange={(e) => setDraft(e.target.value)} onBlur={commit} onKeyDown={(e) => { if (e.key === "Escape") { setDraft(value); setEditing(false); } if (e.key === "Enter") commit(); }} className="h-9 w-full rounded-lg bg-field px-2.5 text-paragraph-sm text-foreground ring-1 ring-inset ring-foreground outline-none" />
        )}
      </span>
    );

  return (
    <button onClick={() => { setDraft(value); setEditing(true); }} className={cn("group -mx-1.5 inline-flex w-full items-start gap-1.5 rounded-lg px-1.5 py-1 text-left transition-colors hover:bg-surface-hover", className)}>
      <span className="min-w-0 flex-1 text-paragraph-sm text-foreground">{value}</span>
      <RiMoreLine size={16} className="mt-0.5 shrink-0 text-subtle opacity-0 transition-opacity group-hover:opacity-100" />
    </button>
  );
}

/* =============================== COPY BUTTON ============================== */

export function CopyButton({ text, size = "md", variant = "stroke", label, className }: { text: string; size?: "sm" | "md" | "lg"; variant?: "stroke" | "ghost"; label?: string; className?: string }) {
  const [ok, setOk] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); } catch { /* noop */ }
    setOk(true);
    window.setTimeout(() => setOk(false), 1600);
  };
  return (
    <Button
      size={size}
      variant={ok ? "soft" : variant === "ghost" ? "ghost" : "outline"}
      tone={ok ? "success" : "default"}
      onClick={copy}
      startContent={ok ? <RiCheckLine size={18} /> : <RiFileUploadLine size={18} />}
      className={className}
      aria-label={label ?? `Copy ${text}`}
    >
      {ok ? "Copied" : (label ?? "Copy")}
    </Button>
  );
}

/* ================================ SPLIT BUTTON ============================ */

export function SplitButton({ children, items, onClick, tone = "accent" }: { children: ReactNode; items: string[]; onClick?: () => void; tone?: "accent" | "default" }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-flex">
      <span className="inline-flex overflow-hidden rounded-10 shadow-fancy-stroke ring-1 ring-inset ring-border">
        <Button tone={tone} onClick={onClick} className="rounded-none ring-0">{children}</Button>
        <button onClick={() => setOpen((o) => !o)} aria-label="More actions" aria-expanded={open} className={cn("flex w-9 items-center justify-center border-l transition-colors", tone === "accent" ? "border-black/15 bg-accent text-accent-foreground hover:bg-accent-hover" : "border-border bg-neutral-950 text-white dark:bg-neutral-200 dark:text-neutral-950")}>
          <RiMoreLine size={16} />
        </button>
      </span>
      {open && (
        <div className="animate-pop-in absolute right-0 top-full z-30 mt-1.5 w-44 rounded-xl bg-surface p-1.5 shadow-lg ring-1 ring-border">
          {items.map((it) => (
            <button key={it} onClick={() => setOpen(false)} className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-paragraph-sm text-foreground hover:bg-surface-hover">
              {it}
            </button>
          ))}
        </div>
      )}
    </span>
  );
}

/* ================================ SPEED DIAL ============================== */

export function SpeedDial({ actions, label = "Quick actions" }: { actions: { icon: ReactNode; label: string; onClick?: () => void }[]; label?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
      {open && (
        <div className="animate-pop-in flex flex-col items-end gap-2.5">
          {actions.map((a) => (
            <div key={a.label} className="flex items-center gap-2.5">
              <span className="rounded-lg bg-neutral-950 px-2.5 py-1.5 text-label-xs text-white shadow-md dark:bg-white dark:text-neutral-950">{a.label}</span>
              <button onClick={() => { a.onClick?.(); setOpen(false); }} aria-label={a.label} className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-foreground shadow-md ring-1 ring-border transition-transform hover:scale-105">
                {a.icon}
              </button>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={label}
        aria-expanded={open}
        className="bevel flex h-13 w-13 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-fancy-accent transition-transform hover:scale-105"
        style={{ height: 52, width: 52 }}
      >
        <RiAddLine size={22} className={cn("transition-transform duration-300", open && "rotate-45")} />
      </button>
    </div>
  );
}

/* ============================== COOKIE CONSENT ============================ */

export function CookieConsent({ onAccept, onDecline, className }: { onAccept?: () => void; onDecline?: () => void; className?: string }) {
  const [show, setShow] = useState(true);
  if (!show) return null;
  const close = (fn?: () => void) => { fn?.(); setShow(false); };
  return (
    <div className={cn("animate-slide-up fixed bottom-4 left-4 z-50 w-[calc(100%-2rem)] max-w-sm rounded-2xl bg-surface p-5 shadow-xl ring-1 ring-border", className)} role="dialog" aria-label="Cookie consent">
      <p className="text-label-sm text-foreground">We use cookies</p>
      <p className="mt-1.5 text-paragraph-sm text-muted">
        We use cookies to personalise content, analyse traffic and improve your experience. See our{" "}
        <a href="#" className="text-accent underline underline-offset-2">privacy policy</a>.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button size="sm" onClick={() => close(onAccept)}>Accept all</Button>
        <Button size="sm" variant="outline" tone="default" onClick={() => close(onDecline)}>Necessary only</Button>
      </div>
    </div>
  );
}

/* ================================ CHAT BUBBLE ============================= */

export function ChatBubble({
  side = "left",
  author,
  time,
  children,
  avatar,
}: {
  side?: "left" | "right";
  author?: string;
  time?: string;
  children: ReactNode;
  avatar?: string;
}) {
  const isRight = side === "right";
  return (
    <div className={cn("flex w-full gap-2.5", isRight && "flex-row-reverse")}>
      {avatar !== "" && <Avatar name={author ?? "?"} src={avatar} size="sm" tone={isRight ? "accent" : "default"} />}
      <div className={cn("flex min-w-0 max-w-[78%] flex-col", isRight ? "items-end" : "items-start")}>
        {(author || time) && (
          <div className={cn("mb-1 flex items-center gap-2", isRight && "flex-row-reverse")}>
            {author && <span className="text-label-xs text-foreground">{author}</span>}
            {time && <span className="text-paragraph-xs text-subtle">{time}</span>}
          </div>
        )}
        <div className={cn("rounded-2xl px-3.5 py-2.5 text-paragraph-sm", isRight ? "rounded-tr-sm bg-accent text-white" : "rounded-tl-sm bg-surface-secondary text-foreground ring-1 ring-border")}>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ============================== PRICING CARD ============================== */

export function PricingCard({
  name,
  price,
  period = "/mo",
  description,
  features,
  cta,
  popular,
  className,
}: {
  name: string;
  price: number | string;
  period?: string;
  description?: string;
  features: string[];
  cta: string;
  popular?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative flex flex-col rounded-2xl bg-surface p-6 ring-1 shadow-xs transition-shadow hover:shadow-md", popular ? "ring-2 ring-accent" : "ring-border", className)}>
      {popular && <Chip tone="accent" size="sm" className="absolute -top-2.5 left-6">Most popular</Chip>}
      <p className="text-label-md text-foreground">{name}</p>
      {description && <p className="mt-1 text-paragraph-xs text-muted">{description}</p>}
      <div className="mt-5 flex items-baseline gap-1">
        <span className="text-title-h3 tabular-nums text-foreground">{typeof price === "number" ? `$${price}` : price}</span>
        <span className="text-paragraph-sm text-subtle">{period}</span>
      </div>
      <Button fullWidth tone={popular ? "accent" : "default"} className="mt-5">{cta}</Button>
      <div className="my-5 h-px bg-separator" />
      <ul className="space-y-2.5">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-paragraph-sm text-muted">
            <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-success-soft text-success-soft-foreground"><RiCheckLine size={12} /></span>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ================================ STAT CARD =============================== */

export function StatCard({
  label,
  value,
  delta,
  up,
  icon,
  hint,
  className,
}: {
  label: string;
  value: string;
  delta?: string;
  up?: boolean;
  icon?: ReactNode;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0 rounded-2xl bg-surface p-5 ring-1 ring-border shadow-xs transition-shadow hover:shadow-sm", className)}>
      <div className="flex items-start justify-between gap-2">
        {icon && <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-secondary text-muted ring-1 ring-border [&_svg]:h-5 [&_svg]:w-5">{icon}</span>}
        {delta && (
          <Chip size="sm" tone={up ? "success" : "danger"} variant="soft">
            {up ? "↑" : "↓"} {delta}
          </Chip>
        )}
      </div>
      <p className="mt-4 truncate text-paragraph-sm text-muted">{label}</p>
      <p className="mt-1 text-title-h4 tabular-nums text-foreground">{value}</p>
      {hint && <p className="mt-1.5 text-paragraph-xs text-subtle">{hint}</p>}
    </div>
  );
}

/* ============================== TEAM MEMBER =============================== */

export function TeamMemberCard({ name, role, email, tone = "accent", actions }: { name: string; role: string; email?: string; tone?: "accent" | "success" | "warning" | "danger" | "default"; actions?: ReactNode }) {
  return (
    <div className="flex min-w-0 items-center gap-3.5 rounded-2xl bg-surface p-4 ring-1 ring-border shadow-xs transition-shadow hover:shadow-sm">
      <Avatar name={name} tone={tone} size="lg" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-label-sm text-foreground">{name}</p>
        <p className="truncate text-paragraph-xs text-muted">{role}</p>
        {email && <p className="truncate text-paragraph-xs text-subtle">{email}</p>}
      </div>
      {actions}
    </div>
  );
}

/* ============================== ORDER SUMMARY ============================= */

export function OrderSummary({
  items,
  subtotal,
  shipping = 0,
  tax = 0,
  currency = "$",
  cta = "Place order",
  className,
}: {
  items: { name: string; qty: number; price: number }[];
  subtotal: number;
  shipping?: number;
  tax?: number;
  currency?: string;
  cta?: string;
  className?: string;
}) {
  const total = subtotal + shipping + tax;
  const row = (l: string, v: number, strong?: boolean) => (
    <div className={cn("flex items-center justify-between", strong ? "text-label-sm text-foreground" : "text-paragraph-sm text-muted")}>
      <span>{l}</span>
      <span className="tabular-nums">{currency}{v.toFixed(2)}</span>
    </div>
  );
  return (
    <div className={cn("w-full rounded-2xl bg-surface p-5 ring-1 ring-border shadow-xs", className)}>
      <p className="text-label-md text-foreground">Order summary</p>
      <div className="mt-4 space-y-3">
        {items.map((it) => (
          <div key={it.name} className="flex items-start justify-between gap-3">
            <span className="min-w-0 flex-1 text-paragraph-sm text-foreground">
              {it.name} <span className="text-subtle">×{it.qty}</span>
            </span>
            <span className="text-paragraph-sm tabular-nums text-foreground">{currency}{(it.price * it.qty).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="my-4 h-px bg-separator" />
      <div className="space-y-2">
        {row("Subtotal", subtotal)}
        {shipping > 0 ? row("Shipping", shipping) : <div className="flex justify-between text-paragraph-sm"><span className="text-muted">Shipping</span><Chip size="sm" tone="success" variant="soft">Free</Chip></div>}
        {tax > 0 && row("Tax", tax)}
      </div>
      <div className="my-4 h-px bg-separator" />
      {row("Total", total, true)}
      <Button fullWidth className="mt-5">{cta}</Button>
      <p className="mt-3 text-center text-paragraph-xs text-subtle">Secure checkout · 30-day returns</p>
    </div>
  );
}

/* ================================ SCROLL AREA ============================= */

export function ScrollArea({ children, maxHeight = 240, className }: { children: ReactNode; maxHeight?: number; className?: string }) {
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(false);
  return (
    <div className={cn("relative rounded-xl bg-surface ring-1 ring-border", className)}>
      <div
        className="ds-scroll overflow-y-auto px-4 py-3"
        style={{ maxHeight }}
        onScroll={(e) => {
          const el = e.currentTarget;
          setAtTop(el.scrollTop <= 4);
          setAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 4);
        }}
      >
        {children}
      </div>
      <div className={cn("pointer-events-none absolute inset-x-0 top-0 h-6 rounded-t-xl bg-gradient-to-b from-surface to-transparent transition-opacity", atTop ? "opacity-0" : "opacity-100")} />
      <div className={cn("pointer-events-none absolute inset-x-0 bottom-0 h-6 rounded-b-xl bg-gradient-to-t from-surface to-transparent transition-opacity", atBottom ? "opacity-0" : "opacity-100")} />
    </div>
  );
}

/* ================================== METRE ================================= */

export function Metre({ value, max = 100, segments = 10, tone = "accent", label, className }: { value: number; max?: number; segments?: number; tone?: "accent" | "success" | "warning" | "danger"; label?: string; className?: string }) {
  const pct = Math.min(100, (value / max) * 100);
  const filled = Math.round((pct / 100) * segments);
  const bg = { accent: "bg-accent", success: "bg-success", warning: "bg-warning", danger: "bg-danger" }[tone];
  return (
    <div className={cn("flex w-full flex-col gap-1.5", className)}>
      {label && (
        <div className="flex items-center justify-between text-paragraph-xs">
          <span className="text-muted">{label}</span>
          <span className="font-mono tabular-nums text-muted">{Math.round(pct)}%</span>
        </div>
      )}
      <div className="flex gap-1" role="meter" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100}>
        {Array.from({ length: segments }).map((_, i) => (
          <span key={i} className={cn("h-2 flex-1 rounded-full transition-colors", i < filled ? bg : "bg-default")} />
        ))}
      </div>
    </div>
  );
}

/* ================================ TREE VIEW =============================== */

export type TreeNode = { id: string; label: string; children?: TreeNode[] };

export function TreeView({ nodes, defaultOpen = [], className }: { nodes: TreeNode[]; defaultOpen?: string[]; className?: string }) {
  const [open, setOpen] = useState<string[]>(defaultOpen);
  const [active, setActive] = useState<string | null>(null);

  const Row = ({ node, depth = 0 }: { node: TreeNode; depth?: number }) => {
    const hasKids = !!node.children?.length;
    const isOpen = open.includes(node.id);
    return (
      <li>
        <button
          onClick={() => (hasKids ? setOpen((o) => (isOpen ? o.filter((x) => x !== node.id) : [...o, node.id])) : setActive(node.id))}
          className={cn("flex w-full items-center gap-1.5 rounded-lg py-1.5 pr-2 text-left text-paragraph-sm transition-colors", active === node.id ? "bg-accent-soft text-accent-soft-foreground" : "text-foreground hover:bg-surface-hover")}
          style={{ paddingLeft: 8 + depth * 16 }}
        >
          {hasKids ? (
            <RiArrowRightSLine size={14} className={cn("shrink-0 text-subtle transition-transform", isOpen && "rotate-90")} />
          ) : (
            <span className="w-3.5 shrink-0" />
          )}
          <span className="truncate">{node.label}</span>
        </button>
        {hasKids && isOpen && (
          <ul>
            {node.children!.map((c) => <Row key={c.id} node={c} depth={depth + 1} />)}
          </ul>
        )}
      </li>
    );
  };

  return <ul className={cn("select-none", className)}>{nodes.map((n) => <Row key={n.id} node={n} />)}</ul>;
}

/* ============================== ERROR PAGES ============================== */

export function ErrorPage({ code = "404", title, description, action }: { code?: "404" | "500" | "403"; title?: string; description?: string; action?: ReactNode }) {
  const copy = {
    "404": { t: "Page not found", d: "The page you're looking for doesn't exist or has been moved." },
    "500": { t: "Something went wrong", d: "An unexpected error occurred. Our team has been notified." },
    "403": { t: "Access denied", d: "You don't have permission to view this page." },
  }[code];
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <span className="text-title-h1 tabular-nums text-neutral-200 dark:text-neutral-800">{code}</span>
      <p className="-mt-4 text-title-h5 text-foreground sm:text-title-h4">{title ?? copy.t}</p>
      <p className="mt-2 max-w-sm text-paragraph-sm text-muted">{description ?? copy.d}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {action ?? <Button startContent={<RiShuffleLine size={18} />}>Back to home</Button>}
      </div>
    </div>
  );
}
