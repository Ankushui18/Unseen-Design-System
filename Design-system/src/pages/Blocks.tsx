import { useMemo, useState } from "react";
import { Code2, Eye, Layers, Search } from "lucide-react";
import { BLOCKS } from "../blocks";
import { Chip } from "../ui/Display";
import { Input } from "../ui/Form";
import { CodeBlock } from "../docs/CodeBlock";
import { ScaledFrame } from "../docs/ScaledFrame";
import { cn } from "../utils/cn";

const CATEGORIES = ["All", ...Array.from(new Set(BLOCKS.map((b) => b.category)))];

function usageSnippet(key: string) {
  const name = key.charAt(0).toUpperCase() + key.slice(1) + "Block";
  return `import { ${name} } from "@aperture/blocks";

export default function Page() {
  return <${name} />;
}`;
}

export function BlocksPage() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [view, setView] = useState<Record<string, "preview" | "code">>({});

  const items = useMemo(
    () =>
      BLOCKS.filter((b) => (cat === "All" || b.category === cat) && (b.title + b.description + b.category).toLowerCase().includes(q.toLowerCase())),
    [cat, q],
  );

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-5 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <Chip tone="accent" variant="soft" size="md" startContent={<Layers className="h-3.5 w-3.5" />}>Components & Blocks</Chip>
        <h1 className="mt-5 text-title-h5 text-foreground text-balance sm:text-title-h4 lg:text-title-h3">
          Elevate your product with <span className="text-gradient">premium blocks</span>
        </h1>
        <p className="mt-4 text-paragraph-md text-muted sm:text-paragraph-lg">
          Ready-made compositions built entirely from Aperture primitives. Copy them into your project and retheme them with a single variable.
        </p>
      </div>

      <div className="sticky top-14 z-30 -mx-4 mt-10 border-y border-separator bg-background/85 px-4 py-3 backdrop-blur-xl sm:-mx-5 sm:px-5 lg:-mx-8 lg:px-8">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar sm:flex-wrap">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={cn(
                  "h-8 rounded-full px-3.5 text-label-sm transition-all",
                  cat === c ? "bevel bg-neutral-950 text-white shadow-fancy-neutral dark:bg-neutral-200 dark:text-neutral-950" : "text-muted ring-1 ring-inset ring-border hover:bg-surface-hover hover:text-foreground",
                )}
              >
                {c}
                <span className={cn("ml-1.5 text-[11px]", cat === c ? "opacity-60" : "text-subtle")}>{c === "All" ? BLOCKS.length : BLOCKS.filter((b) => b.category === c).length}</span>
              </button>
            ))}
          </div>
          <div className="ml-auto w-full sm:w-64">
            <Input size="sm" placeholder="Search blocks…" startContent={<Search />} value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {items.map((b) => {
          const mode = view[b.key] ?? "preview";
          return (
            <section
              key={b.key}
              className={cn("flex flex-col overflow-hidden rounded-20 bg-surface ring-1 ring-border shadow-xs", b.span === 2 && "lg:col-span-2", b.span === 3 && "lg:col-span-3")}
            >
              <div className="flex items-center justify-between gap-3 px-5 py-3.5">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-label-md text-foreground">{b.title}</h2>
                    <Chip size="sm" variant="outline">{b.category}</Chip>
                  </div>
                  <p className="mt-0.5 truncate text-paragraph-xs text-subtle">{b.description}</p>
                </div>
                <div className="inline-flex shrink-0 items-center rounded-10 bg-surface-secondary p-1 ring-1 ring-inset ring-border">
                  {(
                    [
                      ["preview", Eye],
                      ["code", Code2],
                    ] as const
                  ).map(([k, Icon]) => (
                    <button
                      key={k}
                      onClick={() => setView((v) => ({ ...v, [b.key]: k }))}
                      className={cn("flex h-7 w-8 items-center justify-center rounded-lg transition-all", mode === k ? "bg-surface text-foreground shadow-toggle" : "text-subtle hover:text-foreground")}
                      aria-label={k}
                    >
                      <Icon className="h-4 w-4" />
                    </button>
                  ))}
                </div>
              </div>
              {mode === "preview" ? (
                <div className="dot-grid flex min-w-0 flex-1 items-start justify-center overflow-hidden border-t border-separator bg-background-secondary/50">
                  <ScaledFrame designWidth={b.width ?? 440} innerClassName="pointer-events-none" className="w-full px-4 py-8 sm:px-6">{b.render()}</ScaledFrame>
                </div>
              ) : (
                <CodeBlock code={usageSnippet(b.key)} filename={`${b.key}.tsx`} className="rounded-none ring-0" />
              )}
            </section>
          );
        })}
        {items.length === 0 && (
          <div className="col-span-full rounded-20 bg-surface-secondary py-20 text-center text-paragraph-sm text-muted ring-1 ring-border">No blocks match “{q}”.</div>
        )}
      </div>
    </div>
  );
}
