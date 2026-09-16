import { useState, type ReactNode } from "react";
import { Code2, Eye, Link2 } from "lucide-react";
import { cn } from "../utils/cn";
import { CodeBlock } from "./CodeBlock";
import { Chip } from "../ui/Display";
import { useCopy } from "../lib/hooks";
import { RiArrowRightSLine, RiCheckLine, RiFileCopyLine } from "@remixicon/react";

export function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function PageHeader({
  eyebrow,
  title,
  description,
  tags,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  tags?: string[];
}) {
  return (
    <header className="mb-10 border-b border-separator pb-8">
      {eyebrow && <p className="mb-3 text-subheading-xs text-accent uppercase">{eyebrow}</p>}
      <h1 className="text-title-h5 text-foreground sm:text-title-h4">{title}</h1>
      {description && <p className="mt-3 max-w-2xl text-paragraph-md text-muted">{description}</p>}
      {tags && tags.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {tags.map((t) => (
            <Chip key={t} size="sm" variant="outline">
              {t}
            </Chip>
          ))}
        </div>
      )}
    </header>
  );
}

export function Section({ title, description, children, id }: { title: string; description?: ReactNode; children: ReactNode; id?: string }) {
  const anchor = id ?? slugify(title);
  return (
    <section id={anchor} className="scroll-mt-28 py-8 first:pt-0">
      <div className="group mb-4 flex items-baseline gap-2">
        <h2 className="text-title-h6 text-foreground">{title}</h2>
        <button
          onClick={() => document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth", block: "start" })}
          className="opacity-0 transition-opacity group-hover:opacity-100"
          aria-label={`Jump to ${title}`}
        >
          <Link2 className="h-3.5 w-3.5 text-subtle hover:text-accent" />
        </button>
      </div>
      {description && <p className="mb-5 max-w-2xl text-paragraph-sm text-muted">{description}</p>}
      <div className="space-y-5">{children}</div>
    </section>
  );
}

export function Showcase({
  children,
  code,
  controls,
  className,
  align = "center",
  padded = true,
}: {
  children: ReactNode;
  code?: string;
  controls?: ReactNode;
  className?: string;
  align?: "center" | "start" | "stretch";
  padded?: boolean;
}) {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const { copied, copy } = useCopy();
  return (
    <div className="group/sh relative overflow-hidden rounded-2xl bg-surface ring-1 ring-border shadow-xs">
      {code && (
        <div className="flex items-center gap-1 border-b border-separator bg-surface-secondary px-2 py-1.5">
          {(
            [
              ["preview", Eye, "Preview"],
              ["code", Code2, "Code"],
            ] as const
          ).map(([k, Icon, label]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-paragraph-xs font-medium transition-colors",
                tab === k ? "bg-surface text-foreground shadow-toggle ring-1 ring-border/60" : "text-muted hover:text-foreground",
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>
      )}
      {tab === "preview" ? (
        <>
          <div
            className={cn(
              "dot-grid relative flex min-h-[148px] min-w-0 flex-wrap gap-4 overflow-x-auto bg-background-secondary/40",
              padded && "p-4 sm:p-8",
              align === "center" && "items-center justify-center",
              align === "start" && "items-start justify-start",
              align === "stretch" && "flex-col items-stretch",
              className,
            )}
          >
            {children}
          </div>
          {code && (
            <button
              onClick={() => copy(code!)}
              className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 rounded-lg bg-surface/90 px-2 py-1.5 text-paragraph-xs font-medium text-muted opacity-0 shadow-sm ring-1 ring-border backdrop-blur transition-all hover:text-foreground focus-visible:opacity-100 group-hover/sh:opacity-100"
              aria-label="Copy JSX"
            >
              {copied ? <RiCheckLine size={13} className="text-success" /> : <RiFileCopyLine size={13} />}
              {copied ? "Copied" : "Copy JSX"}
            </button>
          )}
          {controls && (
            <div className="flex flex-wrap items-end gap-3 border-t border-separator bg-surface-secondary px-4 py-3 sm:gap-4 sm:px-5">{controls}</div>
          )}
        </>
      ) : (
        <CodeBlock code={code!} className="rounded-none border-0" maxHeight={460} />
      )}
    </div>
  );
}

export type PropRow = { name: string; type: string; default?: string; description: string; required?: boolean };

export function PropsTable({ rows, title = "Props" }: { rows: PropRow[]; title?: string }) {
  const [q, setQ] = useState("");
  const filtered = rows.filter((r) => (r.name + r.type + r.description).toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="overflow-hidden rounded-2xl bg-surface ring-1 ring-border shadow-xs">
      <div className="flex flex-wrap items-center gap-3 border-b border-separator bg-surface-secondary px-4 py-2.5">
        <span className="text-subheading-xs text-subtle uppercase">{title}</span>
        <span className="text-paragraph-xs text-subtle">{filtered.length}</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Filter props…"
          aria-label="Filter props"
          className="ml-auto h-7 w-full max-w-[180px] rounded-lg bg-surface px-2.5 text-paragraph-xs text-foreground ring-1 ring-inset ring-border outline-none placeholder:text-field-placeholder focus:ring-foreground"
        />
      </div>
      <div className="divide-y divide-separator-secondary">
        {filtered.map((r) => (
          <div key={r.name} className="grid gap-2 px-4 py-3.5 md:grid-cols-[minmax(0,180px)_1fr]">
            <div className="flex flex-col gap-1.5">
              <code className="w-fit rounded-md bg-accent-soft px-1.5 py-0.5 font-mono text-paragraph-xs font-medium text-accent-soft-foreground">
                {r.name}
                {r.required && <span className="text-danger">*</span>}
              </code>
              {r.default !== undefined && (
                <span className="font-mono text-[11px] text-subtle">
                  = <span className="text-muted">{r.default}</span>
                </span>
              )}
            </div>
            <div className="space-y-1">
              <code className="block font-mono text-paragraph-xs break-words text-[var(--syn-attr)]">{r.type}</code>
              <p className="text-paragraph-sm text-muted">{r.description}</p>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="px-4 py-8 text-center text-paragraph-sm text-muted">No props match “{q}”.</p>}
      </div>
    </div>
  );
}

/** Cross-links surfaced at the bottom of every component page, like AlignUI. */
export function RelatedComponents({ items, navigate }: { items: { title: string; href: string }[]; navigate: (t: string) => void }) {
  if (!items.length) return null;
  return (
    <section className="mt-14 border-t border-separator pt-8">
      <p className="mb-4 text-subheading-xs uppercase text-subtle">Related components</p>
      <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <button
            key={it.href}
            onClick={() => navigate(it.href)}
            className="group flex items-center justify-between gap-2 rounded-xl bg-surface px-4 py-3 text-left ring-1 ring-border shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-sm hover:ring-border-strong"
          >
            <span className="text-label-sm text-foreground">{it.title}</span>
            <RiArrowRightSLine size={16} className="text-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
          </button>
        ))}
      </div>
    </section>
  );
}

export function Callout({
  children,
  title,
  tone = "accent",
}: {
  children: ReactNode;
  title?: string;
  tone?: "accent" | "warning" | "danger" | "success";
}) {
  const styles = {
    accent: "border-accent/30 bg-accent-soft/50 text-accent-soft-foreground",
    warning: "border-warning/35 bg-warning-soft/50 text-warning-soft-foreground",
    danger: "border-danger/30 bg-danger-soft/50 text-danger-soft-foreground",
    success: "border-success/30 bg-success-soft/50 text-success-soft-foreground",
  }[tone];
  return (
    <div className={cn("rounded-xl border-l-[3px] px-4 py-3.5", styles)}>
      {title && <p className="mb-1 text-paragraph-sm font-medium">{title}</p>}
      <div className="text-paragraph-sm opacity-90">{children}</div>
    </div>
  );
}

export function Grid({ children, cols = 3, className }: { children: ReactNode; cols?: 2 | 3 | 4 | 6; className?: string }) {
  const c = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "grid-cols-2 lg:grid-cols-4", 6: "grid-cols-3 lg:grid-cols-6" }[cols];
  return <div className={cn("grid gap-3", c, className)}>{children}</div>;
}

export function ControlLabel({ children }: { children: ReactNode }) {
  return <span className="mb-1.5 block text-[10px] font-medium tracking-wider text-subtle uppercase">{children}</span>;
}

export function OptionPicker<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <ControlLabel>{label}</ControlLabel>
      <div className="inline-flex max-w-full items-center gap-0.5 overflow-x-auto rounded-10 bg-surface-secondary p-1 ring-1 ring-inset ring-border no-scrollbar">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={cn(
              "rounded-md px-2.5 py-1 text-paragraph-xs font-medium capitalize transition-colors",
              value === o ? "bg-surface text-foreground shadow-toggle ring-1 ring-border/60" : "text-muted hover:text-foreground",
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
