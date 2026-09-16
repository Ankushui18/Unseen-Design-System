import { Fragment, useId, useState, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { CodeBlock } from "./CodeBlock";
import { Chip } from "../ui/Display";
import { useCopy } from "../lib/hooks";
import { RiCheckLine, RiCodeSSlashLine, RiEyeLine, RiFileCopyLine, RiLink, RiRestartLine } from "@remixicon/react";

export function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/* Real module paths for the source-first docs. Every `<Import>` call below the
   page header must resolve against these — nothing points at a fake package. */
const MODULE_OF: Record<string, string> = {
  // ui/Button
  Button: "ui/Button", FancyButton: "ui/Button", ButtonGroup: "ui/Button", Spinner: "ui/Button",
  // ui/Display
  Card: "ui/Display", CardHeader: "ui/Display", CardBody: "ui/Display", CardFooter: "ui/Display",
  Chip: "ui/Display", Badge: "ui/Display", Avatar: "ui/Display", AvatarGroup: "ui/Display",
  Kbd: "ui/Display", Snippet: "ui/Display", Divider: "ui/Display", Skeleton: "ui/Display",
  Progress: "ui/Display", CircularProgress: "ui/Display", Alert: "ui/Display", Code: "ui/Display",
  ScrollShadow: "ui/Display",
  // ui/Form
  Input: "ui/Form", Textarea: "ui/Form", Select: "ui/Form", Checkbox: "ui/Form",
  RadioGroup: "ui/Form", Switch: "ui/Form", Slider: "ui/Form",
  // ui/Navigation
  Tabs: "ui/Navigation", Accordion: "ui/Navigation", Breadcrumbs: "ui/Navigation",
  Pagination: "ui/Navigation", Table: "ui/Navigation",
  // ui/Overlay
  Modal: "ui/Overlay", Drawer: "ui/Overlay", Tooltip: "ui/Overlay", Popover: "ui/Overlay",
  MenuItem: "ui/Overlay", MenuSeparator: "ui/Overlay", MenuLabel: "ui/Overlay",
  ToastProvider: "ui/Overlay", useToast: "ui/Overlay",
  // ui/Extra
  CompactButton: "ui/Extra", LinkButton: "ui/Extra", SocialButton: "ui/Extra",
  StatusBadge: "ui/Extra", Tag: "ui/Extra", SegmentedControl: "ui/Extra",
  HorizontalStepper: "ui/Extra", VerticalStepper: "ui/Extra", DotStepper: "ui/Extra",
  DigitInput: "ui/Extra", Datepicker: "ui/Extra", FileFormatIcon: "ui/Extra",
  Notification: "ui/Extra", Banner: "ui/Extra", Label: "ui/Extra", Hint: "ui/Extra",
  // ui/More
  Dropdown: "ui/More", VerticalTabMenu: "ui/More", ContentDivider: "ui/More",
  SelectionCard: "ui/More", Rating: "ui/More", NumberInput: "ui/More", SearchInput: "ui/More",
  TextareaCounter: "ui/More", ToggleGroup: "ui/More", WidgetBox: "ui/More",
  ColorPicker: "ui/More", Timeline: "ui/More", EmptyState: "ui/More", SelectTrigger: "ui/More",
  // ui/Patterns
  ButtonTile: "ui/Patterns", InfoLabel: "ui/Patterns", InlineMessage: "ui/Patterns",
  ListItem: "ui/Patterns", Toolbar: "ui/Patterns", ToolbarButton: "ui/Patterns",
  ToolbarSeparator: "ui/Patterns", HoverCard: "ui/Patterns", ProfileHoverCard: "ui/Patterns",
  ChatInput: "ui/Patterns", AlertDialog: "ui/Patterns", Combobox: "ui/Patterns",
  PaymentCard: "ui/Patterns", Well: "ui/Patterns",
  // ui/Pro
  ActivityFeed: "ui/Pro", CommandMenu: "ui/Pro", NotificationFeed: "ui/Pro",
  FileUploader: "ui/Pro", Filters: "ui/Pro", TimePicker: "ui/Pro", Calendar: "ui/Pro",
};

export function Import({ names }: { names: string }) {
  const { copy, copied } = useCopy();
  const byModule = new Map<string, string[]>();
  for (const raw of names.split(",").map((s) => s.trim()).filter(Boolean)) {
    const [name, alias] = raw.split(" as ").map((s) => s.trim());
    const spec = alias ? `${name} as ${alias}` : name;
    const source = MODULE_OF[name];
    if (!source) continue;
    const list = byModule.get(source) ?? [];
    list.push(spec);
    byModule.set(source, list);
  }
  const code = [...byModule.entries()].map(([source, specs]) => `import { ${specs.join(", ")} } from "./${source}";`).join("\n");
  return (
    <div className="import-panel">
      <pre>{code}</pre>
      <button type="button" onClick={() => copy(code)} aria-label={copied ? "Copied" : "Copy import"}>
        {copied ? <RiCheckLine size={12} className="text-success" /> : <RiFileCopyLine size={12} />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
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
    <header className="docs-page-heading">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h1>{title}</h1>
      {description && <p>{description}</p>}
      {tags && tags.length > 0 && (
        <div className="docs-heading-tags">
          {tags.map((t) => (
            <Chip key={t} size="sm" variant="soft">
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
    <section id={anchor} className="docs-section">
      <div className="docs-section-heading">
        <h2>{title}</h2>
        <button
          onClick={() => document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth", block: "start" })}
          className="section-anchor"
          aria-label={`Jump to ${title}`}
        >
          <RiLink className="h-3.5 w-3.5 text-subtle hover:text-accent" />
        </button>
      </div>
      {description && <p className="docs-section-description">{description}</p>}
      <div className="docs-section-body">{children}</div>
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
  const [revision, setRevision] = useState(0);
  const { copy, copied } = useCopy();
  const id = useId();
  return (
    <div className="showcase" data-has-code={code ? "true" : undefined}>
      {code && (
        <div className="showcase-toolbar">
          <div className="preview-tabs" role="tablist" aria-label="Example view">
          {(
            [
              ["preview", RiEyeLine, "Preview"],
              ["code", RiCodeSSlashLine, "Code"],
            ] as const
          ).map(([k, Icon, label]) => (
            <button
              key={k}
              type="button"
              role="tab"
              id={`${id}-${k}`}
              aria-selected={tab === k}
              aria-controls={`${id}-panel`}
              tabIndex={tab === k ? 0 : -1}
              onClick={() => setTab(k)}
              onKeyDown={(e) => { if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); const next = k === "preview" ? "code" : "preview"; setTab(next); document.getElementById(`${id}-${next}`)?.focus(); } }}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
          </div>
          <div className="showcase-tools">
            <button type="button" className="studio-icon-button" title="Reset preview" aria-label="Reset preview" onClick={() => setRevision((r) => r + 1)}><RiRestartLine size={14} /></button>
            <button type="button" className="studio-icon-button" title={copied ? "Copied" : "Copy example"} aria-label={copied ? "Copied" : "Copy example"} onClick={() => copy(code)}>{copied ? <RiCheckLine size={14} /> : <RiFileCopyLine size={14} />}</button>
          </div>
        </div>
      )}
      <div role={code ? "tabpanel" : undefined} id={`${id}-panel`} aria-labelledby={code ? `${id}-${tab}` : undefined}>
      {tab === "preview" ? (
          <div
            className={cn(
              "showcase-preview",
              align,
              !padded && "no-padding",
              className,
            )}
          >
            <Fragment key={revision}>{children}</Fragment>
          </div>
      ) : (
        <CodeBlock code={code!} filename="Example.tsx" maxHeight={460} />
      )}
      </div>
      {controls && <div className="showcase-controls">{controls}</div>}
    </div>
  );
}

export type PropRow = { name: string; type: string; default?: string; description: string; required?: boolean };

export function PropsTable({ rows, title = "Props" }: { rows: PropRow[]; title?: string }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-surface ring-1 ring-border shadow-xs">
      <div className="border-b border-separator bg-surface-secondary px-4 py-2.5 text-subheading-xs text-subtle uppercase">
        {title}
      </div>
      <div className="divide-y divide-separator-secondary">
        {rows.map((r) => (
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
      </div>
    </div>
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
