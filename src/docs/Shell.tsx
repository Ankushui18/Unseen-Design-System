import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { ACCENT_PRESETS, RADIUS_PRESETS, useTheme } from "../lib/theme";
import { useCopy, useDialogFocus, useLockBody, useOnClickOutside } from "../lib/hooks";
import { ALL_ITEMS, NAV, findItem, siblings } from "./nav";
import { Kbd } from "../ui/Display";
import { Logo } from "../ui/Brand";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Overlay";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiArrowRightSLine,
  RiCheckLine,
  RiCloseLine,
  RiCommandLine,
  RiFileCopyLine,
  RiMenuLine,
  RiMoonLine,
  RiPaletteLine,
  RiRestartLine,
  RiSearchLine,
  RiShieldCheckLine,
  RiSunLine,
} from "@remixicon/react";
export { Logo } from "../ui/Brand";

export function GithubIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? "h-4 w-4"} aria-hidden><path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" /></svg>;
}

const MAIN_NAV = [
  { title: "Components", href: "components" },
  { title: "Blocks", href: "blocks" },
  { title: "Templates", href: "templates" },
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
    <div className="command-dialog" role="dialog" aria-modal="true" aria-label="Search Unseen" ref={dialog} tabIndex={-1}>
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
          {item.pro && <span className="sidebar-pro" title="Pro tier — included, badged, not a separate category">Pro</span>}
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
      <div className="mobile-nav-heading"><a href="#/" onClick={onClose}><Logo /><strong>Unseen</strong></a><button className="studio-icon-button" onClick={onClose} aria-label="Close navigation"><RiCloseLine size={20} /></button></div>
      <div className="mobile-primary">{MAIN_NAV.map((i) => <a key={i.href} href={`#/${i.href}`} onClick={onClose}>{i.title}<RiArrowRightLine size={15} /></a>)}</div>
      <SidebarNav route={route} navigate={navigate} onNavigate={onClose} />
    </div>
  </div>;
}

export function BrandCustomizerPopover({ open, onClose }: { open: boolean; onClose: () => void }) {
  const theme = useTheme();
  const { copy, copied } = useCopy();
  const popoverRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(popoverRef, onClose);

  if (!open) return null;

  return (
    <div
      ref={popoverRef}
      className="absolute right-0 top-full mt-2 z-50 w-80 rounded-16 ring-1 ring-border bg-overlay p-4 shadow-xl backdrop-blur-md animate-pop-in"
    >
      <div className="flex items-center justify-between border-b border-separator pb-3">
        <div>
          <h3 className="text-label-sm font-medium text-foreground">Brand & Tokens</h3>
          <p className="text-[11px] text-muted">Real-time OKLCH palette & radius</p>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={theme.reset}
            className="rounded-6 p-1 text-subtle hover:bg-surface-hover hover:text-foreground"
            title="Reset to defaults"
            aria-label="Reset theme"
          >
            <RiRestartLine size={14} />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-6 p-1 text-subtle hover:bg-surface-hover hover:text-foreground"
            title="Close"
            aria-label="Close"
          >
            <RiCloseLine size={16} />
          </button>
        </div>
      </div>

      {/* Primary Brand Color Swatches */}
      <div className="mt-3.5 space-y-2">
        <span className="text-[10px] font-medium tracking-wider text-subtle uppercase">Brand Accent Color</span>
        <div className="grid grid-cols-6 gap-2">
          {ACCENT_PRESETS.map((p) => {
            const isSelected = Math.abs(theme.accentH - p.h) < 10;
            return (
              <button
                key={p.name}
                type="button"
                onClick={() => theme.set({ accentH: p.h, accentC: p.c })}
                title={p.name}
                aria-label={`Select ${p.name} accent`}
                style={{
                  backgroundColor: `oklch(0.62 ${p.c} ${p.h})`,
                }}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full transition-transform hover:scale-110",
                  isSelected ? "ring-2 ring-foreground ring-offset-2 ring-offset-overlay shadow-xs scale-105" : "opacity-85 hover:opacity-100",
                )}
              >
                {isSelected && <RiCheckLine size={14} className="text-white drop-shadow-sm" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Corner Radius Scale */}
      <div className="mt-4 space-y-2">
        <span className="text-[10px] font-medium tracking-wider text-subtle uppercase">Corner Radius Scale</span>
        <div className="grid grid-cols-5 gap-1 rounded-10 bg-surface-secondary p-1 ring-1 ring-border">
          {RADIUS_PRESETS.map((r) => {
            const isSelected = theme.radiusScale === r.value;
            return (
              <button
                key={r.name}
                type="button"
                onClick={() => theme.set({ radiusScale: r.value })}
                className={cn(
                  "rounded-7 py-1 text-[11px] font-medium transition-all text-center",
                  isSelected ? "bg-surface text-foreground shadow-xs font-medium" : "text-muted hover:text-foreground",
                )}
              >
                {r.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Appearance Mode */}
      <div className="mt-4 space-y-2">
        <span className="text-[10px] font-medium tracking-wider text-subtle uppercase">Appearance</span>
        <div className="grid grid-cols-2 gap-1 rounded-10 bg-surface-secondary p-1 ring-1 ring-border">
          <button
            type="button"
            onClick={() => theme.set({ mode: "light" })}
            className={cn(
              "inline-flex items-center justify-center gap-1.5 rounded-7 py-1 text-paragraph-xs font-medium transition-all",
              theme.mode === "light" ? "bg-surface text-foreground shadow-xs" : "text-muted hover:text-foreground",
            )}
          >
            <RiSunLine size={13} /> Light
          </button>
          <button
            type="button"
            onClick={() => theme.set({ mode: "dark" })}
            className={cn(
              "inline-flex items-center justify-center gap-1.5 rounded-7 py-1 text-paragraph-xs font-medium transition-all",
              theme.mode === "dark" ? "bg-surface text-foreground shadow-xs" : "text-muted hover:text-foreground",
            )}
          >
            <RiMoonLine size={13} /> Dark
          </button>
        </div>
      </div>

      {/* Copy CSS Button */}
      <div className="mt-4 border-t border-separator pt-3">
        <button
          type="button"
          onClick={() => copy(theme.cssExport)}
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-8 bg-surface-secondary py-1.5 text-paragraph-xs font-medium text-foreground ring-1 ring-border hover:bg-surface-hover transition-colors"
        >
          {copied ? <RiCheckLine size={14} className="text-success" /> : <RiFileCopyLine size={14} />}
          {copied ? "Copied CSS Variables!" : "Copy Token CSS"}
        </button>
      </div>
    </div>
  );
}

export function Navbar({ route, navigate, onOpenSearch, onOpenMobile }: { route: string; navigate: (to: string) => void; onOpenSearch: () => void; onOpenMobile: () => void }) {
  const { mode, toggleMode } = useTheme();
  const [customizerOpen, setCustomizerOpen] = useState(false);

  return <header className="site-header">
    <div className="beta-announcement"><span className="beta-status-dot" /> <span>Public beta. Every component, block, and template is free to explore.</span><a href="#/pricing">About the beta <RiArrowRightLine size={13} /></a></div>
    <div className="site-nav">
      <button className="studio-icon-button mobile-menu-trigger" onClick={onOpenMobile} aria-label="Open navigation"><RiMenuLine size={20} /></button>
      <a href="#/" onClick={(e) => { e.preventDefault(); navigate(""); }} className="brand-link"><Logo size={29} /><span>Unseen<span className="brand-period">.</span></span><small>beta</small></a>
      <nav aria-label="Main" className="primary-nav">{MAIN_NAV.map((i) => <a key={i.href} href={`#/${i.href}`} aria-current={route === i.href || (i.href === "components" && route.startsWith("components/")) ? "page" : undefined}>{i.title}</a>)}</nav>
      <div className="nav-tools relative">
        <button className="nav-search-button" onClick={onOpenSearch} aria-label="Search Unseen"><RiSearchLine size={16} /><span>Search...</span><kbd>Ctrl K</kbd></button>
        <button
          type="button"
          className="studio-icon-button"
          aria-label="Customize brand and theme"
          title="Brand & Theme Configurator"
          onClick={() => setCustomizerOpen(!customizerOpen)}
        >
          <RiPaletteLine size={18} className="text-accent" />
        </button>
        <button className="studio-icon-button theme-toggle" aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`} onClick={toggleMode}>{mode === "dark" ? <RiSunLine size={18} /> : <RiMoonLine size={18} />}</button>
        <a className="nav-cta" href="#/docs/installation">Start building <RiArrowRightLine size={14} /></a>
        <BrandCustomizerPopover open={customizerOpen} onClose={() => setCustomizerOpen(false)} />
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

/* A rail holding one or two links under a large void reads as an unfinished
   column, not as navigation. Below three sections the page drops the rail and
   spends the width on its content instead. */
const RAIL_MIN_SECTIONS = 3;

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
    <div className="docs-layout" data-rail={headings.length >= RAIL_MIN_SECTIONS ? "full" : "none"}>
      <aside className="docs-sidebar ds-scroll"><SidebarNav route={route} navigate={navigate} /></aside>
      <main id="main" tabIndex={-1} className="docs-main">
        <nav className="docs-breadcrumb" aria-label="Breadcrumb"><a href="#/">Home</a><RiArrowRightSLine size={12} /><span>{item?.group ?? "Library"}</span><RiArrowRightSLine size={12} /><span aria-current="page">{item?.title ?? "Overview"}</span></nav>
        <div key={route} className="docs-content page-enter">{children}</div>
        {(prev || next) && <nav className="docs-pagination" aria-label="Previous and next pages">
          {prev ? <a href={`#/${prev.href}`}><span><RiArrowLeftLine size={14} /> Previous</span><strong>{prev.title}</strong></a> : <span />}
          {next && <a href={`#/${next.href}`}><span>Next <RiArrowRightLine size={14} /></span><strong>{next.title}</strong></a>}
        </nav>}
        <footer className="docs-footer"><span>Unseen Design System</span><a href="#/pricing">Public beta</a></footer>
      </main>
      {headings.length >= RAIL_MIN_SECTIONS && <Toc headings={headings} active={activeHeading} />}
    </div>
  </div>;
}

export function SiteFooter({ navigate }: { navigate: (to: string) => void }) {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const saveFeedback = () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify({ message: note, route: window.location.hash, viewport: `${window.innerWidth}x${window.innerHeight}`, createdAt: new Date().toISOString() }, null, 2)], { type: "application/json" }));
    const link = document.createElement("a"); link.href = url; link.download = "unseen-feedback.json"; link.click(); window.setTimeout(() => URL.revokeObjectURL(url), 1000); setSaved(true);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  return (
    <footer className="site-footer border-t border-border bg-surface text-left">
      {/* Where to go next — three real destinations, no invented handles. */}
      <div className="home-container py-12 border-b border-separator">
        <div className="mb-8">
          <span className="text-[11px] font-mono text-accent uppercase tracking-wider block mb-1">Keep going</span>
          <h3 className="text-title-h4 font-medium tracking-tight text-foreground">
            Read the source, follow the changes, ship something.
          </h3>
          <p className="text-paragraph-xs text-muted mt-1">
            Unseen is source-first: every component, block and template is yours to copy, adapt and extend.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <a
            href="https://github.com/Ankushui18/Unseen-Design-System"
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col justify-between p-5 rounded-10 border border-border bg-surface-secondary hover:border-accent hover:shadow-sm transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-8 bg-surface text-foreground group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <GithubIcon className="h-4 w-4" />
                </div>
                <span className="text-[10px] font-mono text-subtle">GitHub</span>
              </div>
              <h4 className="text-label-sm font-medium text-foreground group-hover:text-accent transition-colors">Repository</h4>
              <p className="text-[11px] text-muted mt-1 leading-relaxed">
                Inspect every primitive, open an issue, or send a pull request against the system itself.
              </p>
            </div>
            <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-medium text-accent">
              Browse repository <RiArrowRightLine size={12} />
            </span>
          </a>

          <button
            type="button"
            onClick={() => navigate("docs/changelog")}
            className="group flex flex-col justify-between p-5 rounded-10 border border-border bg-surface-secondary hover:border-accent hover:shadow-sm transition-all text-left"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-8 bg-surface text-foreground group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <RiFileCopyLine className="h-4 w-4" />
                </div>
                <span className="text-[10px] font-mono text-subtle">Changelog</span>
              </div>
              <h4 className="text-label-sm font-medium text-foreground group-hover:text-accent transition-colors">What changed</h4>
              <p className="text-[11px] text-muted mt-1 leading-relaxed">
                Every release, every breaking change, with the codemod that carries you across it.
              </p>
            </div>
            <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-medium text-accent">
              Read the changelog <RiArrowRightLine size={12} />
            </span>
          </button>

          <button
            type="button"
            onClick={() => navigate("docs/installation")}
            className="group flex flex-col justify-between p-5 rounded-10 border border-border bg-surface-secondary hover:border-accent hover:shadow-sm transition-all text-left"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-8 bg-surface text-foreground group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <RiRestartLine className="h-4 w-4" />
                </div>
                <span className="text-[10px] font-mono text-subtle">Setup</span>
              </div>
              <h4 className="text-label-sm font-medium text-foreground group-hover:text-accent transition-colors">Installation</h4>
              <p className="text-[11px] text-muted mt-1 leading-relaxed">
                Drop the tokens into an existing React 19 + Tailwind v4 project and copy your first component.
              </p>
            </div>
            <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-medium text-accent">
              Start building <RiArrowRightLine size={12} />
            </span>
          </button>
        </div>
      </div>

      {/* Newsletter */}
      <div className="home-container py-10 border-b border-separator">
        <div className="rounded-14 border border-border bg-surface-secondary p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-md">
            <span className="text-[10px] font-mono text-accent uppercase tracking-wider block mb-1">Stay Informed</span>
            <h4 className="text-title-h5 font-medium text-foreground">Subscribe to our newsletter</h4>
            <p className="text-paragraph-xs text-muted mt-1">
              Get the latest token releases, new block patterns, and template drops delivered to your inbox.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-[10px] text-subtle font-mono">
              <span className="flex items-center gap-1"><RiCheckLine size={12} className="text-success" /> Weekly releases</span>
              <span className="flex items-center gap-1"><RiCheckLine size={12} className="text-success" /> Zero spam</span>
              <span className="flex items-center gap-1"><RiCheckLine size={12} className="text-success" /> Early access</span>
            </div>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
            <input
              id="newsletter-email"
              aria-label="Email address for newsletter"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              required
              disabled={subscribed}
              className="w-full sm:w-72 rounded-10 border border-border bg-surface px-3 py-2 text-paragraph-xs text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <Button size="md" variant="solid" tone="accent" disabled={subscribed || !email.trim()} type="submit">
              {subscribed ? "Subscribed!" : "Subscribe"}
            </Button>
          </form>
        </div>
      </div>

      {/* Links & Brand Bottom */}
      <div className="home-container py-8">
        <div className="footer-top">
          <div>
            <a href="#/" className="brand-link">
              <Logo size={28} />
              <span>Unseen<span className="brand-period">.</span></span>
            </a>
            <p className="mt-1 text-paragraph-xs text-muted">Design systems engineered for speed and depth.</p>
          </div>
          <div className="footer-links">
            <button type="button" onClick={() => navigate("components")}>Components</button>
            <button type="button" onClick={() => navigate("blocks")}>Blocks</button>
            <button type="button" onClick={() => navigate("templates")}>Templates</button>
            <button type="button" onClick={() => navigate("docs/installation")}>Documentation</button>
            <button type="button" onClick={() => { setSaved(false); setFeedbackOpen(true); }}>Leave feedback</button>
          </div>
        </div>
        <div className="footer-bottom mt-6 border-t border-separator pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-subtle">
          <span>Unseen Design System · Built for React 19 & Tailwind CSS v4</span>
          <span className="flex items-center gap-1.5"><span className="beta-status-dot" /> 100% Free & Open Source during beta</span>
        </div>
      </div>

      <Modal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} title="Help refine the details" description="Describe a layout or interaction issue. Save a report locally to share with your team; no data is sent to a server." footer={<><Button variant="outline" tone="default" onClick={() => setFeedbackOpen(false)}>Close</Button><Button disabled={!note.trim()} onClick={saveFeedback}>{saved ? "Save again" : "Save feedback report"}</Button></>}>
        <label className="feedback-label" htmlFor="beta-feedback">Your feedback</label>
        <textarea id="beta-feedback" className="feedback-textarea" rows={5} placeholder="What happened, and what did you expect?" value={note} onChange={(e) => { setNote(e.target.value); setSaved(false); }} />
        {saved && <p role="status" className="feedback-confirmation"><RiShieldCheckLine size={16} /> Report downloaded. Thank you for testing.</p>}
      </Modal>
    </footer>
  );
}