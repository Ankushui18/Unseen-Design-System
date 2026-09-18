import { useMemo, useState } from "react";
import { COMPONENT_GROUPS } from "../docs/nav";
import { PageHeader } from "../docs/Blocks";
import { PREVIEWS } from "../docs/previews";
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
  const filtered = Boolean(q.trim()) || activeCategory !== "All";

  return (
    <div className="components-index-page">
      <PageHeader
          eyebrow="Component Library · React 19 & Tailwind v4"
          title="Every component. At real size."
          description="The pieces of a cohesive, accessible interface. Explore working examples, inspect the TypeScript props API, and copy source directly."
          tags={[`${total} documented components`, "100% Free & Open Source", "Zero runtime lock-in"]}
        />

        {/* Filters + search live in one band so the grid starts a single step below the hero. */}
        <div className="index-toolbar">
          <div className="index-filters" role="group" aria-label="Filter components by category">
            {categories.map((c) => {
              const isSelected = activeCategory === c;
              const count = c === "All" ? total : COMPONENT_GROUPS.find((g) => g.title === c)?.items.length ?? 0;
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setActiveCategory(c)}
                  className="index-filter"
                >
                  <span>{c}</span>
                  <span className="index-filter-count">{count}</span>
                </button>
              );
            })}
          </div>

          <div className="index-search">
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
              className="w-full h-9 rounded-10 border border-border bg-surface pl-9 pr-8 text-paragraph-xs text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent"
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

        {/* Component Groups */}
        <div className="index-groups pb-16">
          {groups.map((g) => (
            <section key={g.title} className="index-group text-left">
              <div className="index-group-heading">
                <h2>{g.title}</h2>
                <span className="index-group-count">{g.items.length}</span>
                {filtered && (
                  <span className="index-result-note" role="status">
                    {matchedCount} of {total} components
                  </span>
                )}
              </div>

              <div className="index-grid">
                {g.items.map((it) => (
                  <article
                    key={it.href}
                    className="index-card group"
                  >
                    <div
                      className="component-thumbnail"
                      inert
                      aria-hidden="true"
                    >
                      {PREVIEWS[it.href]?.() ?? <span className="text-[11px] text-subtle">Preview</span>}
                    </div>

                    <a
                      href={`#/${it.href}`}
                      className="index-card-link"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(it.href);
                      }}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>{it.title}</span>
                        {/* The commercial tier is a badge on the component, never a
                            shelf in the navigation (WEBSITE-IA.md §3.2). */}
                        {it.pro && (
                          <span
                            className="rounded-full bg-accent-soft px-1.5 py-0.2 text-[9px] font-mono font-medium text-accent-soft-foreground"
                            title="Pro tier"
                          >
                            Pro
                          </span>
                        )}
                        {it.badge && (
                          <span className="rounded-full bg-surface-secondary px-1.5 py-0.2 text-[9px] font-mono font-medium text-muted">
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
  );
}
