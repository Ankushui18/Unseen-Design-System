import { useMemo, useState } from "react";
import { COMPONENT_GROUPS } from "../docs/nav";
import { PageHeader } from "../docs/Blocks";
import { PREVIEWS } from "../docs/previews";
import { SiteFooter } from "../docs/Shell";
import { cn } from "../utils/cn";
import { RiArrowRightLine, RiCloseLine, RiSearchLine } from "@remixicon/react";

export function ComponentsIndex({ navigate }: { navigate: (t: string) => void }) {
  const [q, setQ] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const total = useMemo(() => COMPONENT_GROUPS.reduce((n, g) => n + g.items.length, 0), []);
  const categories = useMemo(() => ["All", ...COMPONENT_GROUPS.map((g) => g.title)], []);

  const groups = useMemo(() => {
    return COMPONENT_GROUPS.map((g) => ({
      ...g,
      items: g.items.filter((i) => {
        const matchesCategory = activeCategory === "All" || g.title === activeCategory;
        const matchesQuery = !q.trim() || `${i.title} ${g.title} ${i.keywords ?? ""}`.toLowerCase().includes(q.trim().toLowerCase());
        return matchesCategory && matchesQuery;
      }),
    })).filter((g) => g.items.length);
  }, [q, activeCategory]);

  const matchedCount = useMemo(() => groups.reduce((n, g) => n + g.items.length, 0), [groups]);

  return (
    <main id="main" className="components-index-page" tabIndex={-1}>
      <div className="home-container">
        <PageHeader
          eyebrow="Component Library · React 19 & Tailwind v4"
          title="Every component. At real size."
          description="The pieces of a cohesive, accessible interface. Explore working examples, inspect the TypeScript props API, and copy source directly."
          tags={[`${total} documented components`, "100% Free & Open Source", "Zero runtime lock-in"]}
        />

        {/* Category Filters Bar */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-separator pb-4">
          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter components by category">
            {categories.map((c) => {
              const isSelected = activeCategory === c;
              const count = c === "All" ? total : COMPONENT_GROUPS.find((g) => g.title === c)?.items.length ?? 0;
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setActiveCategory(c)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium transition-all",
                    isSelected
                      ? "bg-accent text-accent-foreground shadow-xs"
                      : "bg-surface-secondary text-muted hover:text-foreground hover:bg-surface-hover"
                  )}
                >
                  <span>{c}</span>
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.2 text-[9px] font-mono",
                      isSelected ? "bg-black/25 text-white" : "bg-surface text-subtle"
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted">
              <RiSearchLine size={15} />
            </div>
            <input
              id="component-search-input"
              aria-label="Search component library"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search components..."
              className="w-full rounded-10 border border-border bg-surface pl-9 pr-8 py-1.5 text-paragraph-xs text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent"
            />
            {q && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setQ("")}
                className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-subtle hover:text-foreground"
              >
                <RiCloseLine size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Results Count Strip */}
        <div className="py-3 flex items-center justify-between text-[11px] font-mono text-subtle">
          <span>{matchedCount} {matchedCount === 1 ? "component available" : "components available"}</span>
          <span>Category: {activeCategory}</span>
        </div>

        {/* Component Groups */}
        <div className="space-y-12 pb-16">
          {groups.map((g) => (
            <section key={g.title} className="component-index-group text-left">
              <div className="component-index-group-heading flex items-center justify-between border-b border-separator pb-2 mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-label-md font-medium text-foreground">{g.title}</h2>
                  <span className="rounded-full bg-surface-secondary px-2 py-0.5 text-[10px] font-mono text-subtle">
                    {g.items.length}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-subtle">OKLCH Tokens</span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {g.items.map((it) => (
                  <article
                    key={it.href}
                    className="card-specular-glow flex flex-col justify-between overflow-hidden p-4 group"
                  >
                    <div
                      className="component-thumbnail mb-3 flex items-center justify-center min-h-[110px] rounded-8 bg-surface-secondary/60 p-3 ring-1 ring-border/50 transition-colors group-hover:bg-surface-secondary"
                      inert
                      aria-hidden="true"
                    >
                      {PREVIEWS[it.href]?.() ?? <span className="text-[11px] text-subtle">Preview</span>}
                    </div>

                    <a
                      href={`#/${it.href}`}
                      className="flex items-center justify-between text-label-xs font-medium text-foreground group-hover:text-accent transition-colors pt-1"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(it.href);
                      }}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>{it.title}</span>
                        {it.badge && (
                          <span className="rounded-full bg-accent-soft px-1.5 py-0.2 text-[9px] font-mono font-medium text-accent-soft-foreground">
                            {it.badge}
                          </span>
                        )}
                      </div>
                      <RiArrowRightLine size={14} className="transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </article>
                ))}
              </div>
            </section>
          ))}

          {!groups.length && (
            <div className="rounded-14 border border-border bg-surface p-12 text-center my-8">
              <RiSearchLine size={28} className="mx-auto text-muted mb-2" />
              <h3 className="text-label-md font-medium text-foreground">No components match "{q}"</h3>
              <p className="text-paragraph-xs text-muted mt-1">Try another keyword or reset the category filter.</p>
              <button
                type="button"
                onClick={() => { setQ(""); setActiveCategory("All"); }}
                className="mt-4 inline-flex items-center gap-1 text-label-xs font-medium text-accent hover:underline"
              >
                Clear all filters <RiArrowRightLine size={13} />
              </button>
            </div>
          )}
        </div>
      </div>
      <SiteFooter navigate={navigate} />
    </main>
  );
}
