import { useMemo, useState } from "react";
import { BLOCKS } from "../blocks";
import { BlockExample } from "../docs/BlockExample";
import { SiteFooter } from "../docs/Shell";
import { PageHeader } from "../docs/Blocks";
import { cn } from "../utils/cn";
import { RiArrowRightLine, RiCloseLine, RiSearchLine } from "@remixicon/react";

const CATEGORIES = ["All", ...new Set(BLOCKS.map((b) => b.category))];

export function BlocksPage() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      BLOCKS.filter(
        (b) =>
          (category === "All" || b.category === category) &&
          `${b.title} ${b.description}`.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [category, query]
  );

  return (
    <main id="main" className="blocks-page" tabIndex={-1}>
      <div className="home-container">
        <PageHeader
          eyebrow="Composed Blocks · React 19 & Tailwind CSS v4"
          title="Start with a pattern. Make it your own."
          description={`${BLOCKS.length} production-grade composed patterns built exclusively from Unseen primitives. Inspect the code, interact with the preview, and copy straight into your app.`}
          tags={[`${BLOCKS.length} Composed Blocks`, "Zero runtime lock-in", "MIT licensed"]}
        />

        {/* Category Filters & Search Bar */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-separator pb-4">
          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter blocks by category">
            {CATEGORIES.map((c) => {
              const isSelected = category === c;
              const count = c === "All" ? BLOCKS.length : BLOCKS.filter((b) => b.category === c).length;
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setCategory(c)}
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
              id="blocks-search-input"
              aria-label="Search blocks catalog"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search blocks..."
              className="w-full rounded-10 border border-border bg-surface pl-9 pr-8 py-1.5 text-paragraph-xs text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent"
            />
            {query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setQuery("")}
                className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-subtle hover:text-foreground"
              >
                <RiCloseLine size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Results Metadata */}
        <div className="py-3 flex items-center justify-between text-[11px] font-mono text-subtle">
          <span>{filtered.length} {filtered.length === 1 ? "pattern available" : "patterns available"}</span>
          <span>Category: {category}</span>
        </div>

        {/* Blocks Grid */}
        <div className="block-collection-grid pb-16">
          {filtered.map((block) => (
            <div
              key={block.key}
              className={cn("block-collection-cell", block.span && block.span > 1 && "is-wide")}
            >
              <BlockExample block={block} />
            </div>
          ))}
        </div>

        {!filtered.length && (
          <div className="rounded-14 border border-border bg-surface p-12 text-center my-8">
            <RiSearchLine size={28} className="mx-auto text-muted mb-2" />
            <h3 className="text-label-md font-medium text-foreground">No blocks match "{query}"</h3>
            <p className="text-paragraph-xs text-muted mt-1">Try another category or clear your search term.</p>
            <button
              type="button"
              onClick={() => { setQuery(""); setCategory("All"); }}
              className="mt-4 inline-flex items-center gap-1 text-label-xs font-medium text-accent hover:underline"
            >
              Clear all filters <RiArrowRightLine size={13} />
            </button>
          </div>
        )}
      </div>
      <SiteFooter navigate={(route) => { window.location.hash = `/${route}`; }} />
    </main>
  );
}
