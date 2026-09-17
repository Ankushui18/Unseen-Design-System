import { useMemo, useState } from "react";
import { RiCheckLine, RiFileCopyLine, RiSearchLine } from "@remixicon/react";
import { ICONS, ICON_CATEGORIES } from "../lib/icons";
import { Callout, PageHeader, Section } from "../docs/Blocks";
import { CodeBlock } from "../docs/CodeBlock";
import { Input, Slider } from "../ui/Form";
import { Snippet } from "../ui/Display";
import { Button } from "../ui/Button";
import { SegmentedControl, Tag } from "../ui/Extra";
import { useCopy } from "../lib/hooks";
import { cn } from "../utils/cn";

export function IconsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [size, setSize] = useState(22);
  const [style, setStyle] = useState<"line" | "fill" | "all">("all");
  const { copied, copy } = useCopy();
  const [last, setLast] = useState("");

  const items = useMemo(() => {
    const t = q.trim().toLowerCase().replace(/\s+/g, "");
    return ICONS.filter((i) => {
      if (cat !== "All" && i.category !== cat) return false;
      if (style === "line" && !/Line$/.test(i.name)) return false;
      if (style === "fill" && !/Fill$/.test(i.name)) return false;
      return !t || i.name.toLowerCase().includes(t);
    });
  }, [q, cat, style]);

  return (
    <>
      <PageHeader
        eyebrow="Foundations"
        title="Iconography"
        description="A curated Remix Icon collection with line and fill styles on a shared 24px grid. Filter the examples below and copy an import to use the same icon in your project."
        tags={["Remix Icon 4", `${ICONS.length} curated`, "Line + Fill pairs", "24px grid"]}
      />

      <Section title="Install">
        <Snippet>npm install @remixicon/react</Snippet>
        <CodeBlock
          filename="usage.tsx"
          code={`import { RiSearchLine, RiUser3Fill } from "@remixicon/react";

// 20px inside controls, 24px standalone
<Button startContent={<RiSearchLine />}>Search</Button>
<RiUser3Fill size={24} className="text-muted" />`}
        />
      </Section>

      <Section title="Browse" description="Filter by category or name. Sizes 16, 20 and 24 are the only three used in the system.">
        <div className="sticky top-[var(--header-height)] z-20 -mx-2 space-y-3 rounded-xl bg-background/95 p-2 backdrop-blur-xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Input placeholder="Search icons…" startContent={<RiSearchLine />} value={q} onChange={(e) => setQ(e.target.value)} wrapperClassName="sm:max-w-xs" />
            <SegmentedControl size="sm" value={style} onChange={setStyle} items={[{ value: "all", label: "All" }, { value: "line", label: "Line" }, { value: "fill", label: "Fill" }]} />
            <div className="w-40 sm:ml-auto"><Slider value={size} onChange={setSize} min={16} max={32} step={2} formatValue={(v) => `${v}px`} aria-label="Preview icon size" /></div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["All", ...ICON_CATEGORIES].map((c) => (
              <button key={c} onClick={() => setCat(c)}><Tag active={cat === c} variant="gray">{c}</Tag></button>
            ))}
          </div>
        </div>

        <p className="text-paragraph-xs text-subtle">{items.length} icons {last && <span className="ml-2 inline-flex items-center gap-1 text-success-soft-foreground"><RiCheckLine size={14} /> Copied {last}</span>}</p>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
          {items.map(({ name, Icon }) => (
            <button
              key={name}
              title={name}
              onClick={async () => { if (await copy(`import { ${name} } from "@remixicon/react";`)) setLast(name); }}
              className={cn(
                "group relative flex aspect-square flex-col items-center justify-center gap-1 rounded-xl bg-surface text-foreground ring-1 ring-border transition-all hover:-translate-y-0.5 hover:shadow-md hover:ring-border-strong",
                last === name && copied && "ring-2 ring-accent",
              )}
            >
              <Icon size={size} />
              <span className="absolute inset-x-1 bottom-1 truncate rounded-md bg-neutral-950 px-1 py-0.5 text-[9px] text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-white dark:text-neutral-950">{name.replace(/^Ri/, "")}</span>
              <RiFileCopyLine size={12} className="absolute top-1.5 right-1.5 text-subtle opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          ))}
          {items.length === 0 && <p className="col-span-full py-16 text-center text-paragraph-sm text-muted">No icons match “{q}”.</p>}
        </div>
      </Section>

      <Section title="Sizing rules" description="Icon size is locked to the text size it sits beside.">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { s: 16, t: "12–13px text", u: "Chips, tags, hints, compact buttons" },
            { s: 20, t: "14–16px text", u: "Buttons, inputs, menu items, table cells" },
            { s: 24, t: "Standalone", u: "Empty states, nav rails, feature cards" },
          ].map((r) => (
            <div key={r.s} className="flex items-center gap-4 rounded-2xl bg-surface p-4 ring-1 ring-border shadow-xs">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-secondary ring-1 ring-border"><RiSearchLine size={r.s} /></span>
              <div>
                <p className="text-label-sm text-foreground">{r.s}px · {r.t}</p>
                <p className="text-paragraph-xs text-subtle">{r.u}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm" startContent={<RiSearchLine />}>Small · 16</Button>
          <Button startContent={<RiSearchLine />}>Medium · 20</Button>
          <Button size="lg" startContent={<RiSearchLine />}>Large · 20</Button>
        </div>
        <Callout title="Line for actions, Fill for state">
          Use <code className="font-mono text-paragraph-xs">*Line</code> icons for interactive controls and navigation. Switch to the matching <code className="font-mono text-paragraph-xs">*Fill</code> variant only to indicate an active or selected state — never mix styles in the same row.
        </Callout>
      </Section>
    </>
  );
}
