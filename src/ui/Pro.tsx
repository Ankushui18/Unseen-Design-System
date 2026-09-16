/**
 * Aperture PRO Components — the premium tier of the system, built to close
 * the gap with AlignUI PRO. Everything here reuses the same token graph as
 * the base components (no private colours, no hex, no raw Tailwind scales).
 *
 * Activity Feed · Command Menu · Notification Feed · File Uploader ·
 * Filters · Time Picker · Calendar
 */
import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  RiArrowDownSLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiCheckLine,
  RiCheckboxCircleLine,
  RiCloseLine,
  RiDeleteBinLine,
  RiFileLine,
  RiFileTextLine,
  RiFilterLine,
  RiImageLine,
  RiInformationLine,
  RiNotification3Line,
  RiSearchLine,
  RiTimeLine,
  RiUploadCloudLine,
} from "@remixicon/react";
import { cn } from "../utils/cn";
import { useDialogFocus, useLockBody, useOnClickOutside } from "../lib/hooks";
import type { Tone } from "./Button";
import { Avatar, Kbd } from "./Display";

/* Shared tone helpers ------------------------------------------------------- */

const toneSoft: Record<Tone, string> = {
  accent: "bg-accent-soft text-accent",
  default: "bg-surface-secondary text-foreground",
  success: "bg-success-soft text-success-soft-foreground",
  warning: "bg-warning-soft text-warning-soft-foreground",
  danger: "bg-danger-soft text-danger-soft-foreground",
};


/* ------------------------------- Activity Feed ----------------------------- */

export type ActivityItem = {
  actor: string;
  action: ReactNode;
  target?: string;
  time: string;
  icon?: ReactNode;
  tone?: Tone;
  meta?: ReactNode;
};

export function ActivityFeed({
  items,
  title = "Recent activity",
  compact = false,
  className,
}: {
  items: ActivityItem[];
  title?: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <section className={cn("rounded-20 bg-surface ring-1 ring-border shadow-xs", className)}>
      <header className="flex items-center justify-between gap-3 border-b border-separator px-5 py-4">
        <h3 className="text-label-sm text-foreground">{title}</h3>
        <span className="rounded-full bg-default px-2 py-0.5 text-[11px] tabular-nums text-muted">{items.length}</span>
      </header>
      <ol className="divide-y divide-separator-secondary">
        {items.map((it, i) => (
          <li key={i} className={cn("flex gap-3.5", compact ? "px-4 py-3" : "px-5 py-4")}>
            <div className="flex flex-col items-center">
              {it.icon ? (
                <span className={cn("flex h-8 w-8 items-center justify-center rounded-full ring-1 ring-inset ring-border [&_svg]:h-4 [&_svg]:w-4", toneSoft[it.tone ?? "default"])}>{it.icon}</span>
              ) : (
                <span className="rounded-full ring-2 ring-surface">
                  <Avatar name={it.actor} size="sm" tone={it.tone ?? "accent"} />
                </span>
              )}
              {i < items.length - 1 && <span className="mt-2 w-px flex-1 bg-border" />}
            </div>
            <div className="min-w-0 flex-1 pb-3">
              <p className="leading-6">
                <span className="font-medium text-foreground">{it.actor}</span>{" "}
                <span className="text-muted">{it.action}</span>{" "}
                {it.target && <span className="text-accent">{it.target}</span>}
              </p>
              <p className="mt-0.5 flex items-center gap-1.5 text-paragraph-xs text-subtle">
                <RiTimeLine size={13} className="text-subtle" />
                {it.time}
              </p>
            </div>
            {it.meta && <div className="shrink-0">{it.meta}</div>}
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ------------------------------- Command Menu ------------------------------ */

export type CommandGroup = { label: string; items: CommandItem[] };
export type CommandItem = {
  label: string;
  hint?: string;
  icon?: ReactNode;
  keywords?: string;
  onSelect: () => void;
};

export function CommandMenu({
  open,
  onClose,
  groups,
  placeholder = "Type a command or search…",
}: {
  open: boolean;
  onClose: () => void;
  groups: CommandGroup[];
  placeholder?: string;
}) {
  const [q, setQ] = useState("");
  const [cursor, setCursor] = useState(0);
  const dialog = useRef<HTMLDivElement>(null);
  const listbox = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();
  useLockBody(open);
  useDialogFocus(open, dialog, onClose);

  const flat = useMemo(() => {
    const term = q.trim().toLowerCase();
    const rows = groups.flatMap((g, gi) => g.items.map((it, ii) => ({ g, gi, ii, it, idx: 0 })));
    const filtered = rows.filter((r) => !term || `${r.it.label} ${r.it.hint ?? ""} ${r.it.keywords ?? ""} ${r.g.label}`.toLowerCase().includes(term));
    return filtered.map((r, idx) => ({ ...r, idx }));
  }, [q, groups]);

  useEffect(() => {
    if (open) { setQ(""); setCursor(0); window.setTimeout(() => inputRef.current?.focus(), 0); }
  }, [open]);
  useEffect(() => {
    listbox.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  if (!open) return null;

  const activate = (item: CommandItem) => {
    onClose();
    item.onSelect();
  };

  return createPortal(
    <div className="fixed inset-0 z-[120] flex items-start justify-center p-4 pt-[12vh]">
      <div className="animate-fade-in absolute inset-0 bg-backdrop backdrop-blur-[3px]" onMouseDown={onClose} />
      <div ref={dialog} tabIndex={-1} role="dialog" aria-modal="true" aria-label="Command menu" className="animate-pop-in relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-overlay shadow-xl ring-1 ring-border dark:bg-surface">
        <div className="flex items-center gap-3 border-b border-separator px-4">
          <RiSearchLine size={20} className="shrink-0 text-subtle" aria-hidden />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => { setQ(e.target.value); setCursor(0); }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") { e.preventDefault(); setCursor((c) => Math.min(c + 1, Math.max(0, flat.length - 1))); }
              if (e.key === "ArrowUp") { e.preventDefault(); setCursor((c) => Math.max(0, c - 1)); }
              if (e.key === "Enter" && flat[cursor]) { e.preventDefault(); activate(flat[cursor].it); }
              if (e.key === "Escape") { e.preventDefault(); onClose(); }
            }}
            placeholder={placeholder}
            role="combobox"
            aria-expanded="true"
            aria-controls={id}
            aria-activedescendant={flat[cursor] ? `${id}-${flat[cursor].idx}` : undefined}
            aria-label="Search commands"
            className="h-12 min-w-0 flex-1 bg-transparent text-paragraph-sm text-foreground outline-none placeholder:text-field-placeholder"
          />
          <Kbd>Esc</Kbd>
        </div>
        <div ref={listbox} id={id} role="listbox" aria-label="Commands" className="ds-scroll max-h-[46vh] overflow-y-auto p-2">
          {flat.length === 0 && (
            <div className="flex flex-col items-center gap-2 px-6 py-10 text-center">
              <RiSearchLine size={22} className="text-subtle" />
              <p className="text-paragraph-sm text-muted">No results for “{q}”</p>
              <p className="text-paragraph-xs text-subtle">Try a different term.</p>
            </div>
          )}
          {groups.map((g, gi) => {
            const rows = flat.filter((r) => r.gi === gi);
            if (!rows.length) return null;
            return (
              <div key={g.label} className="not-first:mt-1">
                <p className="px-2.5 pt-2 pb-1 text-subheading-2xs uppercase text-subtle">{g.label}</p>
                {rows.map((r) => (
                  <button
                    key={`${gi}-${r.ii}`}
                    id={`${id}-${r.idx}`}
                    role="option"
                    aria-selected={flat[cursor] === r}
                    onMouseEnter={() => setCursor(r.idx)}
                    onClick={() => activate(r.it)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors",
                      flat[cursor] === r ? "bg-surface-secondary text-foreground" : "text-muted",
                    )}
                  >
                    {r.it.icon && <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-surface-secondary text-foreground ring-1 ring-inset ring-border [&_svg]:h-4 [&_svg]:w-4">{r.it.icon}</span>}
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-paragraph-sm">{r.it.label}</span>
                      {r.it.hint && <span className="block truncate text-paragraph-xs text-subtle">{r.it.hint}</span>}
                    </span>
                    {flat[cursor] === r && <RiArrowRightSLine size={16} className="shrink-0 text-subtle" />}
                  </button>
                ))}
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-4 border-t border-separator px-4 py-2.5">
          <span className="flex items-center gap-1.5 text-paragraph-xs text-subtle"><Kbd>↑</Kbd><Kbd>↓</Kbd> navigate</span>
          <span className="flex items-center gap-1.5 text-paragraph-xs text-subtle"><Kbd>Enter</Kbd> select</span>
        </div>
      </div>
    </div>,
    document.body,
  );
}

/* ----------------------------- Notification Feed --------------------------- */

export type FeedNotification = {
  id: number;
  title: string;
  body?: string;
  time: string;
  tone?: Tone;
  read?: boolean;
  icon?: ReactNode;
};

export function NotificationFeed({
  items,
  onRead,
  onReadAll,
  className,
}: {
  items: FeedNotification[];
  onRead?: (id: number) => void;
  onReadAll?: () => void;
  className?: string;
}) {
  const unread = items.filter((i) => !i.read).length;
  return (
    <section className={cn("flex h-full flex-col overflow-hidden rounded-20 bg-surface ring-1 ring-border shadow-xs", className)}>
      <header className="flex items-center gap-3 border-b border-separator px-5 py-4">
        <RiNotification3Line size={18} className="text-muted" aria-hidden />
        <h3 className="flex-1 text-label-sm text-foreground">Notifications</h3>
        {unread > 0 && <span className="rounded-full bg-danger text-[10px] font-medium tabular-nums text-white px-1.5 py-0.5">{unread}</span>}
        <button onClick={onReadAll} className="text-paragraph-xs text-accent transition hover:text-accent-hover">Mark all read</button>
      </header>
      <ul className="ds-scroll flex-1 divide-y divide-separator-secondary overflow-y-auto">
        {items.map((n) => (
          <li key={n.id}>
            <button
              onClick={() => onRead?.(n.id)}
              className={cn("flex w-full items-start gap-3 px-5 py-3.5 text-left transition-colors hover:bg-surface-hover", !n.read && "bg-accent-soft/40")}
            >
              <span className={cn("mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-1 ring-inset ring-border [&_svg]:h-4 [&_svg]:w-4", toneSoft[n.tone ?? "default"])}>
                {n.icon ?? <RiInformationLine size={16} />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-3">
                  <span className={cn("truncate text-paragraph-sm", !n.read ? "font-medium text-foreground" : "text-foreground")}>{n.title}</span>
                  <span className="shrink-0 text-paragraph-xs text-subtle">{n.time}</span>
                </span>
                {n.body && <span className="mt-0.5 block truncate text-paragraph-xs text-muted">{n.body}</span>}
              </span>
              {!n.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" aria-label="Unread" />}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* -------------------------------- File Uploader ---------------------------- */

export type UploadFile = { id: number; name: string; size: string; progress: number; status?: "uploading" | "done" | "error" };

const kindGlyph = (name: string) => {
  if (/\.(png|jpe?g|gif|webp|svg|avif)$/i.test(name)) return RiImageLine;
  if (/\.(mp4|mov|webm|mp3|wav)$/i.test(name)) return RiUploadCloudLine;
  if (/\.(xlsx?|csv)$/i.test(name)) return RiFileTextLine;
  return RiFileLine;
};

export function FileUploader({
  files,
  onAdd,
  onRemove,
  accept = "Any files",
  max = 8,
  className,
}: {
  files: UploadFile[];
  onAdd: (names: string[]) => void;
  onRemove: (id: number) => void;
  accept?: string;
  max?: number;
  className?: string;
}) {
  const id = useId();
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const read = (list: FileList | null) => {
    if (!list) return;
    onAdd(Array.from(list).map((f) => f.name));
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <button
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); read(e.dataTransfer.files); }}
        className={cn(
          "flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed px-6 py-9 text-center transition-colors",
          dragging ? "border-accent bg-accent-soft/40" : "border-border-strong bg-surface-secondary/50 hover:border-accent hover:bg-surface-secondary",
        )}
      >
        <span className={cn("flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-inset ring-border [&_svg]:h-5 [&_svg]:w-5", dragging ? "bg-accent-soft text-accent" : "bg-surface text-muted")}>
          <RiUploadCloudLine size={20} />
        </span>
        <span className="text-label-sm text-foreground">Drop files to upload, or <span className="text-accent">browse</span></span>
        <span className="text-paragraph-xs text-subtle">{accept} · up to {max} files</span>
      </button>
      <input ref={inputRef} id={id} type="file" multiple className="sr-only" aria-label="Choose files" onChange={(e) => { read(e.target.files); e.target.value = ""; }} disabled={files.length >= max} />

      {files.length > 0 && (
        <ul className="flex flex-col gap-1.5">
          {files.map((f) => {
            const Glyph = kindGlyph(f.name);
            const tone = f.status === "error" ? "danger" : f.status === "done" ? "success" : "accent";
            return (
              <li key={f.id} className="flex items-center gap-3 rounded-10 bg-surface px-3.5 py-2.5 ring-1 ring-border">
                <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset ring-border [&_svg]:h-4.5 [&_svg]:w-4.5", toneSoft[tone])}>
                  <Glyph size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="truncate text-paragraph-sm text-foreground">{f.name}</p>
                    <p className="shrink-0 text-paragraph-xs tabular-nums text-subtle">{f.size}</p>
                  </div>
                  {f.status !== "done" ? (
                    <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-surface-tertiary">
                      <div
                        className={cn("h-full rounded-full transition-all", f.status === "error" ? "bg-danger" : "bg-accent")}
                        style={{ width: `${f.progress}%` }}
                      />
                    </div>
                  ) : (
                    <p className="mt-0.5 flex items-center gap-1 text-paragraph-xs text-success"><RiCheckboxCircleLine size={13} /> Uploaded</p>
                  )}
                </div>
                <button onClick={() => onRemove(f.id)} className="rounded-lg p-1.5 text-subtle transition hover:bg-surface-hover hover:text-danger" aria-label={`Remove ${f.name}`}>
                  <RiDeleteBinLine size={16} />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* ----------------------------------- Filters ------------------------------- */

export type FilterOption = { value: string; label: string; resultCount?: number };
export type FilterSection = { id: string; name: string; options: FilterOption[] };

export function Filters({
  sections,
  selected,
  onChange,
  triggerLabel = "Filters",
  className,
}: {
  sections: FilterSection[];
  selected: Record<string, string[]>;
  onChange: (section: string, values: string[]) => void;
  triggerLabel?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const close = () => setOpen(false);
  useOnClickOutside(ref, close, open);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const total = Object.values(selected).reduce((n, v) => n + v.length, 0);
  const toggle = (section: string, value: string) => {
    const current = selected[section] ?? [];
    onChange(section, current.includes(value) ? current.filter((v) => v !== value) : [...current, value]);
  };

  return (
    <div className={cn("relative inline-flex", className)} ref={ref}>
      <button
        ref={buttonRef}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={cn(
          "inline-flex h-10 items-center gap-2 rounded-10 px-3 text-label-sm shadow-xs ring-1 ring-inset transition-colors",
          total > 0 ? "bg-accent-soft text-accent ring-accent/20" : "bg-surface text-muted ring-border hover:bg-surface-secondary hover:text-foreground",
        )}
      >
        <RiFilterLine size={18} className="text-current" />
        {triggerLabel}
        {total > 0 && <span className="rounded-full bg-accent px-1.5 text-[10px] font-medium tabular-nums text-white">{total}</span>}
        <RiArrowDownSLine size={18} className={cn("text-subtle transition-transform", open && "-rotate-180")} />
      </button>

      {open && (
        <div className="animate-pop-in absolute top-full left-0 z-50 mt-2 w-72 rounded-2xl bg-overlay p-2 shadow-lg ring-1 ring-border">
          {sections.map((section) => (
            <div key={section.id} className="pb-1">
              <p className="px-2.5 pt-2 pb-1 text-subheading-2xs uppercase text-subtle">{section.name}</p>
              {section.options.map((opt) => {
                const on = (selected[section.id] ?? []).includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    onClick={() => toggle(section.id, opt.value)}
                    role="checkbox"
                    aria-checked={on}
                    className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-surface-hover"
                  >
                    <span className={cn("flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-[5px] transition-colors", on ? "bg-accent text-white" : "ring-1 ring-inset ring-border-strong")}>
                      {on && <RiCheckLine size={12} />}
                    </span>
                    <span className="flex-1 text-paragraph-sm text-foreground">{opt.label}</span>
                    {typeof opt.resultCount === "number" && <span className="text-paragraph-xs tabular-nums text-subtle">{opt.resultCount}</span>}
                  </button>
                );
              })}
            </div>
          ))}
          <div className="mt-1 border-t border-separator px-2.5 py-2.5">
            <button onClick={close} className="text-paragraph-xs text-accent transition hover:text-accent-hover">Show {total > 0 ? "results" : "all results"}</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* --------------------------------- Time Picker ----------------------------- */

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

function WheelColumn({
  options,
  value,
  onChange,
  labelId,
  activeId,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  labelId: string;
  activeId: string;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const idx = Math.max(0, options.indexOf(value));
  useEffect(() => {
    const row = listRef.current?.querySelector('[data-active="true"]');
    row?.scrollIntoView({ block: "center" });
  }, [idx]);
  return (
    <div
      ref={listRef}
      role="listbox"
      aria-labelledby={labelId}
      aria-activedescendant={activeId}
      className="ds-scroll h-56 overflow-y-auto rounded-lg bg-surface-secondary/60 py-2"
      onKeyDown={(e) => {
        if (e.key === "ArrowUp") { e.preventDefault(); onChange(options[clamp(idx - 1, 0, options.length - 1)]); }
        if (e.key === "ArrowDown") { e.preventDefault(); onChange(options[clamp(idx + 1, 0, options.length - 1)]); }
      }}
      tabIndex={0}
    >
      {options.map((o) => {
        const active = o === value;
        return (
          <button
            key={o}
            id={active ? activeId : undefined}
            role="option"
            aria-selected={active}
            data-active={active || undefined}
            onClick={() => onChange(o)}
            className={cn("flex w-full items-center justify-center py-1.5 text-paragraph-sm tabular-nums transition-colors", active ? "bg-accent text-white" : "text-muted hover:bg-surface-hover hover:text-foreground")}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

export function TimePicker({
  open,
  onClose,
  value,
  onChange,
  format = "12h",
}: {
  open: boolean;
  onClose: () => void;
  value: string;
  onChange: (time: string) => void;
  format?: "12h" | "24h";
}) {
  const [draft, setDraft] = useState(value);
  const dialog = useRef<HTMLDivElement>(null);
  const id = useId();
  useLockBody(open);
  useDialogFocus(open, dialog, onClose);

  useEffect(() => { if (open) setDraft(value); }, [open, value]);

  const is12 = format !== "24h";
  const [h, m, mer] = useMemo(() => {
    if (is12) {
      const match = /^(\d{1,2}):(\d{2})\s?(AM|PM)$/i.exec(value.trim());
      return [match?.[1] ?? "09", match?.[2] ?? "00", (match?.[3] ?? "AM").toUpperCase()];
    }
    const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
    return [match?.[1] ?? "09", match?.[2] ?? "00", ""];
  }, [value, is12]);

  if (!open) return null;

  const hours: string[] = [];
  const len = is12 ? 12 : 24;
  for (let i = 1; i <= len; i++) hours.push(String(i).padStart(2, "0"));
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));
  const meridians = ["AM", "PM"];

  const setH = (v: string) => setDraft(`${v}:${m}${is12 ? " " + mer : ""}`);
  const setM = (v: string) => setDraft(`${h}:${v}${is12 ? " " + mer : ""}`);
  const setMer = (v: string) => setDraft(`${h}:${m} ${v}`);

  return createPortal(
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="animate-fade-in absolute inset-0 bg-backdrop backdrop-blur-[3px]" onMouseDown={onClose} />
      <div ref={dialog} tabIndex={-1} role="dialog" aria-modal="true" aria-label="Pick a time" className="animate-pop-in relative z-10 rounded-2xl bg-overlay p-4 shadow-xl ring-1 ring-border">
        <div className="mb-3 flex items-center justify-between gap-4 px-1">
          <p className="text-label-sm text-foreground">Select time</p>
          <button onClick={onClose} className="rounded-lg p-1 text-subtle transition hover:bg-surface-hover hover:text-foreground" aria-label="Close">
            <RiCloseLine size={16} />
          </button>
        </div>
        <div className="flex items-stretch gap-2">
          <div className="flex flex-col items-center gap-1">
            <span id={`${id}-h`} className="text-subheading-2xs uppercase text-subtle">Hour</span>
            <WheelColumn options={hours} value={h} onChange={setH} labelId={`${id}-h`} activeId={`${id}-ah`} />
          </div>
          <span className="self-center text-label-md text-subtle">:</span>
          <div className="flex flex-col items-center gap-1">
            <span id={`${id}-m`} className="text-subheading-2xs uppercase text-subtle">Min</span>
            <WheelColumn options={minutes} value={m} onChange={setM} labelId={`${id}-m`} activeId={`${id}-am`} />
          </div>
          {is12 && (
            <div className="flex flex-col items-center gap-1">
              <span id={`${id}-mer`} className="text-subheading-2xs uppercase text-subtle"> </span>
              <WheelColumn options={meridians} value={mer} onChange={setMer} labelId={`${id}-mer`} activeId={`${id}-amer`} />
            </div>
          )}
        </div>
        <div className="mt-4 flex justify-end gap-2 border-t border-separator pt-3">
          <button onClick={onClose} className="inline-flex h-9 items-center rounded-lg px-3 text-label-sm text-muted transition hover:bg-surface-hover hover:text-foreground">Cancel</button>
          <button
            onClick={() => { onChange(draft); onClose(); }}
            className="inline-flex h-9 items-center rounded-lg bg-accent px-3.5 text-label-sm text-white transition hover:bg-accent-hover"
          >
            Done
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

/* ---------------------------------- Calendar ------------------------------- */

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function calendarGrid(year: number, month: number) {
  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = (first.getDay() + 6) % 7; // Monday-first
  const cells: (number | null)[] = Array.from({ length: offset }, () => null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

const pad = (n: number) => String(n).padStart(2, "0");

export function Calendar({
  value,
  onChange,
  month: monthProp,
  onMonthChange,
  className,
}: {
  value: Date | null;
  onChange: (d: Date) => void;
  month?: { year: number; month: number };
  onMonthChange?: (d: Date) => void;
  className?: string;
}) {
  const today = new Date();
  const [view, setView] = useState({ year: (monthProp?.year ?? today.getFullYear()), month: (monthProp?.month ?? today.getMonth()) });
  useEffect(() => {
    if (monthProp) setView({ year: monthProp.year, month: monthProp.month });
  }, [monthProp?.year, monthProp?.month]);

  const weeks = calendarGrid(view.year, view.month);
  const monthName = new Date(view.year, view.month, 1).toLocaleString("en-US", { month: "long" });
  const isToday = (d: number) => today.getFullYear() === view.year && today.getMonth() === view.month && today.getDate() === d;
  const isSelected = (d: number) => value?.getFullYear() === view.year && value.getMonth() === view.month && value.getDate() === d;

  const shift = (delta: number) => {
    const next = new Date(view.year, view.month + delta, 1);
    setView({ year: next.getFullYear(), month: next.getMonth() });
    onMonthChange?.(next);
  };

  return (
    <div className={cn("w-72 rounded-20 bg-surface p-4 ring-1 ring-border shadow-lg", className)}>
      <header className="mb-2 flex items-center justify-between">
        <button onClick={() => shift(-1)} className="rounded-lg p-1.5 text-subtle transition hover:bg-surface-hover hover:text-foreground" aria-label="Previous month"><RiArrowLeftSLine size={18} /></button>
        <p className="text-label-sm text-foreground">{monthName} <span className="text-subtle">{view.year}</span></p>
        <button onClick={() => shift(1)} className="rounded-lg p-1.5 text-subtle transition hover:bg-surface-hover hover:text-foreground" aria-label="Next month"><RiArrowRightSLine size={18} /></button>
      </header>
      <div className="flex flex-col gap-1" role="grid" aria-label={`${monthName} ${view.year}`}>
        <div className="flex" role="row">
          {WEEKDAYS.map((d) => (
            <span key={d} role="columnheader" className="flex h-8 flex-1 items-center justify-center text-subheading-2xs uppercase text-subtle">{d}</span>
          ))}
        </div>
        {weeks.map((week, wi) => (
          <div key={wi} className="flex" role="row">
            {week.map((d, di) => {
              if (d === null) return <span key={di} className="h-9 flex-1" />;
              return (
                <div key={di} className="flex h-9 flex-1 items-center justify-center p-0.5" role="gridcell">
                  <button
                    onClick={() => onChange(new Date(view.year, view.month, d))}
                    aria-label={pad(d)}
                    aria-pressed={isSelected(d)}
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full text-paragraph-sm tabular-nums transition-colors",
                      isSelected(d) ? "bg-accent text-white hover:bg-accent-hover" : "text-foreground hover:bg-surface-hover",
                      !isSelected(d) && isToday(d) && "ring-1 ring-inset ring-accent text-accent",
                    )}
                  >
                    {d}
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <footer className="mt-3 flex items-center justify-between border-t border-separator pt-3">
        <button onClick={() => onChange(today)} className="text-paragraph-xs text-accent transition hover:text-accent-hover">Today</button>
        {value && <span className="text-paragraph-xs tabular-nums text-subtle">{value.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}</span>}
      </footer>
    </div>
  );
}
