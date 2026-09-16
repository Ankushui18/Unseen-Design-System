import { useMemo, useState } from "react";
import { BLOCKS } from "../blocks";
import { BlockExample } from "../docs/BlockExample";
import { SiteFooter } from "./Home";
import { RiArrowRightLine, RiCloseLine, RiSearchLine } from "@remixicon/react";

const CATEGORIES = ["All", ...new Set(BLOCKS.map((b) => b.category))];

export function BlocksPage() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => BLOCKS.filter((b) => (category === "All" || b.category === category) && `${b.title} ${b.description}`.toLowerCase().includes(query.trim().toLowerCase())), [category, query]);

  return <main id="main" className="blocks-page" tabIndex={-1}>
    <div className="home-container">
      <header className="collection-heading page-enter"><div><p>Composition, considered.</p><h1>Start with a pattern.<br />Make it your own.</h1></div><div><p>{BLOCKS.length} working compositions, made from the same components. Inspect the source, interact with the preview, and adapt the details.</p><a className="text-action" href="#/components">Browse individual components <RiArrowRightLine size={15} /></a></div></header>
      <div className="collection-filter">
        <div className="collection-categories" role="group" aria-label="Filter by category">{CATEGORIES.map((c) => <button key={c} aria-pressed={category === c} onClick={() => setCategory(c)}>{c}<span>{c === "All" ? BLOCKS.length : BLOCKS.filter((b) => b.category === c).length}</span></button>)}</div>
        <label className="collection-search"><RiSearchLine size={16} /><input type="search" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search blocks" placeholder="Search blocks..." />{query && <button aria-label="Clear search" onClick={() => setQuery("")}><RiCloseLine size={14} /></button>}</label>
      </div>
      <div className="collection-results-label" role="status"><span>{filtered.length} {filtered.length === 1 ? "example" : "examples"}</span><span>All unlocked during public beta</span></div>
      <div className="block-collection-grid">
        {filtered.map((block) => <div key={block.key} className={`block-collection-cell ${block.span && block.span > 1 ? "is-wide" : ""}`}><BlockExample block={block} /></div>)}
      </div>
      {!filtered.length && <div className="search-empty collection-empty"><RiSearchLine size={28} /><h2>No matching blocks</h2><p>Try another category or search term.</p><button className="text-action" onClick={() => { setCategory("All"); setQuery(""); }}>Clear filters <RiArrowRightLine size={14} /></button></div>}
    </div>
    <SiteFooter navigate={(route) => { window.location.hash = `/${route}`; }} />
  </main>;
}