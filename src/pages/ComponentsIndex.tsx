import { useMemo, useState } from "react";
import { COMPONENT_GROUPS } from "../docs/nav";
import { PageHeader } from "../docs/Blocks";
import { Input } from "../ui/Form";
import { PREVIEWS } from "../docs/previews";
import { RiArrowRightLine, RiSearchLine } from "@remixicon/react";

export function ComponentsIndex({ navigate }: { navigate: (t: string) => void }) {
  const [q, setQ] = useState("");
  const total = useMemo(() => COMPONENT_GROUPS.reduce((n, g) => n + g.items.length, 0), []);
  const groups = useMemo(
    () => COMPONENT_GROUPS.map((g) => ({ ...g, items: g.items.filter((i) => (i.title + " " + (i.keywords ?? "")).toLowerCase().includes(q.toLowerCase())) })).filter((g) => g.items.length),
    [q],
  );
  return (
    <>
      <PageHeader
        title="Component library"
        description="The pieces of a cohesive interface. Explore examples, inspect the API, and try the interactions in each component's documentation."
        tags={[`${total} documentation pages`, "Free during beta"]}
      />
      <div className="component-index-filter">
        <Input aria-label="Filter components" placeholder="Find a component..." startContent={<RiSearchLine />} value={q} onChange={(e) => setQ(e.target.value)} />
        <span role="status">{groups.reduce((n, g) => n + g.items.length, 0)} results</span>
      </div>
      {groups.map((g) => (
        <section key={g.title} className="component-index-group">
          <div className="component-index-group-heading">
            <h2>{g.title}</h2>
            <span>{g.items.length}</span>
          </div>
          <div className="component-index-grid">
            {g.items.map((it) => (
              <article key={it.href} className="component-index-item">
                <div className="component-thumbnail" inert aria-hidden="true">
                  <div>{PREVIEWS[it.href]?.() ?? <span className="text-paragraph-xs text-subtle">Open the interactive example</span>}</div>
                </div>
                <a href={`#/${it.href}`} className="component-index-link" onClick={(e) => { e.preventDefault(); navigate(it.href); }}>
                  <span>{it.title}</span>
                  <RiArrowRightLine size={15} />
                </a>
              </article>
            ))}
          </div>
        </section>
      ))}
      {!groups.length && (
        <div className="search-empty">
          <RiSearchLine size={24} />
          <h2>No components found</h2>
          <p>Try another component name or clear the filter.</p>
          <button className="text-action" onClick={() => setQ("")}>Clear search</button>
        </div>
      )}
    </>
  );
}
