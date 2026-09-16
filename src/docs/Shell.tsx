import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { useTheme } from "../lib/theme";
import { useDialogFocus, useLockBody } from "../lib/hooks";
import { ALL_ITEMS, NAV, findItem, siblings } from "./nav";
import { Kbd } from "../ui/Display";
import { Logo } from "../ui/Brand";
import { RiArrowLeftLine, RiArrowRightLine, RiArrowRightSLine, RiCloseLine, RiCommandLine, RiMenuLine, RiMoonLine, RiSearchLine, RiSunLine } from "@remixicon/react";
export { Logo } from "../ui/Brand";

export function GithubIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? "h-4 w-4"} aria-hidden><path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" /></svg>;
}

export function DiscordIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? "h-4 w-4"} aria-hidden><path d="m19.7 4.5-4.2-1.3-.5 1.1a19 19 0 0 0-6 0l-.5-1.1-4.2 1.3C1.6 8.4.8 12.6 1.2 17a17 17 0 0 0 5.1 2.6l1-1.7-1.6-.8.5-.4a14 14 0 0 0 11.6 0l.5.4-1.6.8 1 1.7a17 17 0 0 0 5.1-2.6c.4-4.4-.4-8.6-3.1-12.5ZM8 14.6c-1 0-1.8-1-1.8-2.1s.8-2 1.8-2 1.8.9 1.8 2S9 14.6 8 14.6Zm8 0c-1 0-1.8-1-1.8-2.1s.8-2 1.8-2 1.8.9 1.8 2-.8 2.1-1.8 2.1Z" /></svg>;
}

export function XIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? "h-4 w-4"} aria-hidden><path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z" /></svg>;
}

const MAIN_NAV = [
  { title: "Components", href: "components" },
  { title: "Blocks", href: "blocks" },
  { title: "Foundations", href: "foundations/spacing" },
  { title: "Icons", href: "foundations/icons" },
];

export function CommandPalette({ open, onClose, navigate }: { open: boolean; onClose: () => void; navigate: (to: string) => void }) {
  const [q, setQ] = useState("");
  const [cursor, setCursor] = useState(0);
  const dialog = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const id = useId();
  useLockBody(open);
  useDialogFocus(open, dialog, onClose);
  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    const items = [{ title: "Component library", href: "components", group: "Explore", keywords: "library" }, { title: "Blocks", href: "blocks", group: "Explore", keywords: "patterns" }, ...ALL_ITEMS];
    return items.filter((it) => !term || `${it.title} ${it.group} ${it.keywords ?? ""}`.toLowerCase().includes(term)).slice(0, 12);
  }, [q]);
  useEffect(() => { if (open) { setQ(""); setCursor(0); } }, [open]);
  useEffect(() => { list.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" }); }, [cursor]);
  if (!open) return null;
  return <div className="command-backdrop" onMouseDown={(e) => { if (e.currentTarget === e.target) onClose(); }}>
    <div className="command-dialog" role="dialog" aria-modal="true" aria-label="Search Aperture" ref={dialog} tabIndex={-1}>
      <div className="command-search">
        <RiSearchLine size={20} aria-hidden />
        <input ref={input} aria-label="Search documentation" role="combobox" aria-autocomplete="list" aria-expanded="true" aria-controls={id} aria-activedescendant={results[cursor] ? `${id}-${cursor}` : undefined} placeholder="Search components, foundations, and guides..." value={q} onChange={(e) => { setQ(e.target.value); setCursor(0); }} onKeyDown={(e) => {
          if (e.key === "ArrowDown") { e.preventDefault(); setCursor((c) => Math.min(c + 1, Math.max(0, results.length - 1))); }
          if (e.key === "ArrowUp") { e.preventDefault(); setCursor((c) => Math.max(0, c - 1)); }
          if (e.key === "Enter" && results[cursor]) { e.preventDefault(); navigate(results[cursor].href); onClose(); }
        }} />
        <button className="studio-icon-button" onClick={onClose} aria-label="Close search"><RiCloseLine size={18} /></button>
      </div>
      <div id={id} role="listbox" aria-label="Search results" ref={list} className="command-results ds-scroll">
        <p className="command-caption">{q ? `${results.length} results` : "Quick navigation"}</p>
        {results.map((r, i) => <button id={`${id}-${i}`} key={`${r.href}-${i}`} role="option" aria-selected={i === cursor} className="command-result" onMouseEnter={() => setCursor(i)} onClick={() => { navigate(r.href); onClose(); }}>
          <span>{r.title}</span><small>{r.group}</small><RiArrowRightSLine size={14} />
        </button>)}
        {!results.length && <div className="search-empty"><RiSearchLine size={24} /><p>No results for "{q}"</p><span>Try a component name, such as button or input.</span></div>}
      </div>
      <div className="command-footer"><span><Kbd>Enter</Kbd> to open</span><span><Kbd>Esc</Kbd> to close</span></div>
    </div>
  </div>;
}

export function SidebarNav({ route, navigate, onNavigate }: { route: string; navigate: (t: string) => void; onNavigate?: () => void }) {
  const [q, setQ] = useState("");
  const groups = NAV.map((g) => ({ ...g, items: g.items.filter((i) => `${g.title} ${i.title}`.toLowerCase().includes(q.toLowerCase())) })).filter((g) => g.items.length);
  return <>
    <label className="sidebar-search"><RiSearchLine size={15} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter navigation..." aria-label="Filter navigation" /></label>
    <nav aria-label="Documentation" className="sidebar-nav">
      <a href="#/components" className={cn("sidebar-overview", route === "components" && "is-active")} onClick={(e) => { e.preventDefault(); navigate("components"); onNavigate?.(); }}><RiCommandLine size={16} /> Library overview <RiArrowRightSLine size={14} /></a>
      {groups.map((g) => <div className="sidebar-group" key={g.title}>
        <h2>{g.title}</h2>
        {g.items.map((item) => <a href={`#/${item.href}`} key={item.href} aria-current={route === item.href ? "page" : undefined} onClick={(e) => { e.preventDefault(); navigate(item.href); onNavigate?.(); }} className="sidebar-item">
          <span>{item.title}</span>
          {item.badge === "Updated" && <span className="sidebar-update" title="Updated">Updated</span>}
        </a>)}
      </div>)}
      {!groups.length && <p className="sidebar-empty">No matching pages.</p>}
    </nav>
  </>;
}

export function MobileNavigation({ open, onClose, route, navigate }: { open: boolean; onClose: () => void; route: string; navigate: (to: string) => void }) {
  const dialog = useRef<HTMLDivElement>(null);
  useLockBody(open);
  useDialogFocus(open, dialog, onClose);
  if (!open) return null;
  return <div className="mobile-nav-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
    <div className="mobile-nav-panel ds-scroll" role="dialog" aria-modal="true" aria-label="Navigation" tabIndex={-1} ref={dialog}>
      <div className="mobile-nav-heading"><a href="#/" onClick={onClose}><Logo /><strong>Aperture</strong></a><button className="studio-icon-button" onClick={onClose} aria-label="Close navigation"><RiCloseLine size={20} /></button></div>
      <div className="mobile-primary">{MAIN_NAV.map((i) => <a key={i.href} href={`#/${i.href}`} onClick={onClose}>{i.title}<RiArrowRightLine size={15} /></a>)}</div>
      <SidebarNav route={route} navigate={navigate} onNavigate={onClose} />
    </div>
  </div>;
}

export function Navbar({ route, navigate, onOpenSearch, onOpenMobile }: { route: string; navigate: (to: string) => void; onOpenSearch: () => void; onOpenMobile: () => void }) {
  const { mode, toggleMode } = useTheme();
  return <header className="site-header">
    <div className="beta-announcement"><span className="beta-status-dot" /> <span>Public beta. Every component and block is free to explore.</span><a href="#/pricing">About the beta <RiArrowRightLine size={13} /></a></div>
    <div className="site-nav">
      <button className="studio-icon-button mobile-menu-trigger" onClick={onOpenMobile} aria-label="Open navigation"><RiMenuLine size={20} /></button>
      <a href="#/" onClick={(e) => { e.preventDefault(); navigate(""); }} className="brand-link"><Logo size={29} /><span>Aperture<span className="brand-period">.</span></span><small>beta</small></a>
      <nav aria-label="Main" className="primary-nav">{MAIN_NAV.map((i) => <a key={i.href} href={`#/${i.href}`} aria-current={route === i.href || (i.href === "components" && route.startsWith("components/")) ? "page" : undefined}>{i.title}</a>)}</nav>
      <div className="nav-tools">
        <button className="nav-search-button" onClick={onOpenSearch} aria-label="Search Aperture"><RiSearchLine size={16} /><span>Search...</span><kbd>Ctrl K</kbd></button>
        <button className="studio-icon-button theme-toggle" aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`} onClick={toggleMode}>{mode === "dark" ? <RiSunLine size={18} /> : <RiMoonLine size={18} />}</button>
        <a className="nav-cta" href="#/docs/installation">Start building <RiArrowRightLine size={14} /></a>
      </div>
    </div>
  </header>;
}

export function Toc({ headings, active }: { headings: { id: string; title: string }[]; active: string }) {
  return <aside className="docs-toc">
    <div className="toc-sticky">
      {headings.length > 0 && <><h2>On this page</h2><nav aria-label="On this page">{headings.map((h) => <button key={h.id} className={active === h.id ? "is-active" : ""} onClick={() => document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}>{h.title}</button>)}</nav></>}
      <div className="toc-note"><span className="beta-status-dot" /><p>Free during public beta</p><small>Explore, build, and help us refine the details.</small><a href="#/pricing">Beta information <RiArrowRightLine size={12} /></a></div>
    </div>
  </aside>;
}

export function DocsLayout({ route, navigate, children, headings, activeHeading }: { route: string; navigate: (to: string) => void; children: ReactNode; headings: { id: string; title: string }[]; activeHeading: string }) {
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState(false);
  const { prev, next } = siblings(route);
  const item = findItem(route);
  useEffect(() => {
    const listener = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setSearch(true); } };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, []);
  useEffect(() => { setMobile(false); }, [route]);
  return <div className="documentation-shell">
    <a className="skip-link" href="#main" onClick={(e) => { e.preventDefault(); document.getElementById("main")?.focus(); }}>Skip to content</a>
    <Navbar route={route} navigate={navigate} onOpenSearch={() => setSearch(true)} onOpenMobile={() => setMobile(true)} />
    <CommandPalette open={search} onClose={() => setSearch(false)} navigate={navigate} />
    <MobileNavigation open={mobile} onClose={() => setMobile(false)} route={route} navigate={navigate} />
    <div className="docs-layout">
      <aside className="docs-sidebar ds-scroll"><SidebarNav route={route} navigate={navigate} /></aside>
      <main id="main" tabIndex={-1} className="docs-main">
        <nav className="docs-breadcrumb" aria-label="Breadcrumb"><a href="#/">Home</a><RiArrowRightSLine size={12} /><span>{item?.group ?? "Library"}</span><RiArrowRightSLine size={12} /><span aria-current="page">{item?.title ?? "Overview"}</span></nav>
        <div key={route} className="docs-content page-enter">{children}</div>
        {(prev || next) && <nav className="docs-pagination" aria-label="Previous and next pages">
          {prev ? <a href={`#/${prev.href}`}><span><RiArrowLeftLine size={14} /> Previous</span><strong>{prev.title}</strong></a> : <span />}
          {next && <a href={`#/${next.href}`}><span>Next <RiArrowRightLine size={14} /></span><strong>{next.title}</strong></a>}
        </nav>}
        <footer className="docs-footer"><span>Aperture Design System</span><a href="#/pricing">Public beta</a></footer>
      </main>
      <Toc headings={headings} active={activeHeading} />
    </div>
  </div>;
}