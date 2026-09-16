import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Menu,
  Moon,
  Palette,
  Search,
  Sun,
  X,
} from "lucide-react";
import { cn } from "../utils/cn";
import { useTheme } from "../lib/theme";
import { ALL_ITEMS, NAV, siblings, findItem } from "./nav";
import { RiCloseLine, RiSparklingLine } from "@remixicon/react";
import { Kbd } from "../ui/Display";
import { useLockBody } from "../lib/hooks";

export const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
  </svg>
);

export function Logo({ size = 28 }: { size?: number }) {
  return (
    <span className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden>
        <defs>
          <linearGradient id="ap-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent-400)" />
            <stop offset="100%" stopColor="var(--accent-700)" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="30" height="30" rx="9" fill="url(#ap-g)" />
        <path d="M16 7.5 L24 24 H8 Z" fill="none" stroke="white" strokeWidth="2.1" strokeLinejoin="round" opacity="0.95" />
        <circle cx="16" cy="18.4" r="3.1" fill="white" />
      </svg>
    </span>
  );
}

/* ------------------------------ Command Palette ---------------------------- */

export function CommandPalette({
  open,
  onClose,
  navigate,
}: {
  open: boolean;
  onClose: () => void;
  navigate: (to: string) => void;
}) {
  const [q, setQ] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  useLockBody(open);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return ALL_ITEMS.slice(0, 9);
    return ALL_ITEMS.filter(
      (i) => i.title.toLowerCase().includes(term) || i.group.toLowerCase().includes(term) || (i.keywords ?? "").includes(term),
    ).slice(0, 10);
  }, [q]);

  useEffect(() => {
    if (open) {
      setQ("");
      setCursor(0);
      window.setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") { e.preventDefault(); setCursor((c) => Math.min(c + 1, results.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setCursor((c) => Math.max(c - 1, 0)); }
      if (e.key === "Enter" && results[cursor]) { navigate(results[cursor].href); onClose(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, cursor, navigate, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-start justify-center p-4 pt-[12vh]">
      <div className="animate-fade-in absolute inset-0 bg-backdrop backdrop-blur-[3px]" onClick={onClose} />
      <div className="animate-pop-in relative w-full max-w-xl overflow-hidden rounded-20 bg-overlay shadow-xl ring-1 ring-border">
        <div className="flex items-center gap-3 border-b border-separator px-4">
          <Search className="h-4 w-4 shrink-0 text-subtle" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => { setQ(e.target.value); setCursor(0); }}
            placeholder="Search components, tokens, guides…"
            className="h-12 w-full bg-transparent text-paragraph-sm text-foreground outline-none placeholder:text-field-placeholder"
          />
          <button onClick={onClose} className="rounded-md p-1 text-subtle hover:text-foreground"><X className="h-4 w-4" /></button>
        </div>
        <div className="ds-scroll max-h-[46vh] overflow-y-auto p-2">
          {results.length === 0 && <p className="px-3 py-8 text-center text-paragraph-sm text-muted">No results for “{q}”</p>}
          {results.map((r, i) => (
            <button
              key={r.href}
              onMouseEnter={() => setCursor(i)}
              onClick={() => { navigate(r.href); onClose(); }}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                i === cursor ? "bg-surface-secondary text-foreground" : "text-foreground hover:bg-surface-hover",
              )}
            >
              <span className="text-paragraph-sm font-medium">{r.title}</span>
              <span className="ml-auto text-[11px] text-subtle">{r.group}</span>
              <ChevronRight className="h-3.5 w-3.5 text-subtle" />
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-separator bg-surface-secondary px-4 py-2.5 text-[11px] text-subtle">
          <span className="flex items-center gap-1.5"><Kbd>↑</Kbd><Kbd>↓</Kbd> navigate</span>
          <span className="flex items-center gap-1.5"><Kbd>↵</Kbd> open</span>
          <span className="flex items-center gap-1.5"><Kbd>esc</Kbd> close</span>
          <span className="ml-auto font-medium">Aperture v3.2</span>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- Sidebar --------------------------------- */

function SidebarNav({ route, navigate, onNavigate }: { route: string; navigate: (t: string) => void; onNavigate?: () => void }) {
  const [q, setQ] = useState("");
  const groups = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return NAV;
    return NAV.map((g) => ({ ...g, items: g.items.filter((i) => (i.title + " " + (i.keywords ?? "")).toLowerCase().includes(t)) })).filter((g) => g.items.length);
  }, [q]);

  return (
    <nav className="space-y-6 pb-16">
      <div className="group flex h-9 items-center gap-2 rounded-lg bg-field px-2.5 shadow-xs ring-1 ring-inset ring-border transition-all focus-within:bg-field-focus focus-within:ring-foreground focus-within:shadow-ring-neutral">
        <Search size={16} className="shrink-0 text-subtle group-focus-within:text-muted" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Filter navigation…"
          aria-label="Filter navigation"
          className="min-w-0 flex-1 bg-transparent text-paragraph-xs text-foreground outline-none placeholder:text-field-placeholder"
        />
        {q && <button onClick={() => setQ("")} aria-label="Clear" className="text-subtle hover:text-foreground"><RiCloseLine size={14} /></button>}
      </div>
      {groups.length === 0 && <p className="px-3 text-paragraph-xs text-muted">No matches.</p>}
      {groups.map((group) => (
        <div key={group.title}>
          <p className="mb-2 px-3 text-subheading-2xs uppercase text-subtle">{group.title}</p>
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const active = route === item.href;
              return (
                <li key={item.href}>
                  <button
                    onClick={() => { navigate(item.href); onNavigate?.(); }}
                    className={cn(
                      "group flex w-full items-center gap-2 rounded-lg px-3 py-[7px] text-left text-paragraph-sm transition-all duration-150",
                      active
                        ? "bg-surface-secondary text-label-sm text-foreground shadow-[inset_0_0_0_1px_var(--border)]"
                        : "text-muted hover:bg-surface-hover hover:text-foreground",
                    )}
                  >
                    <span className={cn("h-1 w-1 shrink-0 rounded-full transition-colors", active ? "bg-accent" : "bg-transparent group-hover:bg-border-strong")} />
                    <span className="flex-1 truncate">{item.title}</span>
                    {item.badge && (
                      <span
                        className={cn(
                          "rounded-full px-1.5 py-px text-[9px] font-medium tracking-wide uppercase",
                          item.badge === "New" && "bg-success-soft text-success-soft-foreground",
                          item.badge === "Beta" && "bg-warning-soft text-warning-soft-foreground",
                          item.badge === "Updated" && "bg-accent-soft text-accent-soft-foreground",
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                    {item.pro && !item.badge && (
                      <span className="inline-flex shrink-0 items-center gap-0.5 rounded-full bg-accent-soft px-1.5 py-px text-[9px] font-medium text-accent-soft-foreground">
                        <RiSparklingLine size={8} />
                        Free
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

/* --------------------------------- Navbar ---------------------------------- */

export function Navbar({
  route,
  navigate,
  onOpenSearch,
  onOpenMobile,
}: {
  route: string;
  navigate: (t: string) => void;
  onOpenSearch: () => void;
  onOpenMobile: () => void;
}) {
  const { mode, toggleMode } = useTheme();
  const links = [
    { label: "Docs", href: "docs/introduction", match: "docs/", pro: false },
    { label: "Components", href: "components", match: "components", pro: false },
    { label: "Blocks", href: "blocks", match: "blocks", pro: true },
    { label: "Templates", href: "templates", match: "templates", pro: true },
    { label: "Foundations", href: "foundations/color", match: "foundations/", pro: false },
    { label: "Theme Studio", href: "theme", match: "theme", pro: false },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-separator bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[1600px] items-center gap-2 px-3 sm:gap-3 sm:px-6">
        <button onClick={onOpenMobile} className="rounded-lg p-2 text-muted transition hover:bg-surface-hover hover:text-foreground lg:hidden" aria-label="Open navigation">
          <Menu className="h-4.5 w-4.5" />
        </button>

        <button onClick={() => navigate("")} className="flex items-center gap-2.5">
          <Logo size={26} />
          <span className="text-label-md tracking-[-0.02em]">Aperture</span>
          <span className="hidden rounded-full px-1.5 py-px font-mono text-[10px] text-subtle ring-1 ring-border sm:inline">v3.2</span>
        </button>

        <nav className="ml-4 hidden items-center gap-0.5 lg:flex">
          {links.map((l) => {
            const active = route.startsWith(l.match);
            return (
              <button
                key={l.label}
                onClick={() => navigate(l.href)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-label-sm transition-colors",
                  active ? "bg-surface-secondary text-foreground" : "text-muted hover:text-foreground",
                )}
              >
                {l.label}
                {l.pro && <span className="rounded-[4px] bg-accent px-1 py-px text-[9px] font-medium tracking-wide text-accent-foreground uppercase">Pro</span>}
              </button>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <button
            onClick={onOpenSearch}
            className="group flex h-9 items-center gap-2 rounded-10 bg-surface px-2.5 text-paragraph-sm text-subtle shadow-xs ring-1 ring-border transition hover:bg-surface-hover hover:ring-border-strong sm:w-60"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Search…</span>
            <span className="ml-auto hidden items-center gap-0.5 sm:flex">
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </span>
          </button>
          <button onClick={() => navigate("theme")} className="hidden rounded-lg p-2 text-muted transition hover:bg-surface-hover hover:text-foreground sm:block" aria-label="Theme studio">
            <Palette className="h-4 w-4" />
          </button>
          <button onClick={toggleMode} className="rounded-lg p-2 text-muted transition hover:bg-surface-hover hover:text-foreground" aria-label="Toggle theme">
            {mode === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-lg p-2 text-muted transition hover:bg-surface-hover hover:text-foreground sm:flex"
            aria-label="GitHub"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <button
            onClick={() => navigate("pricing")}
            className="bevel ml-1 hidden h-9 items-center rounded-10 bg-neutral-950 px-3.5 text-label-sm text-white shadow-fancy-neutral transition hover:bg-neutral-900 sm:inline-flex dark:bg-neutral-200 dark:text-neutral-950 dark:hover:bg-white"
          >
            Pricing
          </button>
        </div>
      </div>
    </header>
  );
}

/* ----------------------------------- TOC ----------------------------------- */

export function Toc({ headings, active }: { headings: { id: string; title: string }[]; active: string }) {
  if (!headings.length) return null;
  return (
    <div className="sticky top-20 hidden w-56 shrink-0 xl:block">
      <p className="mb-3 text-subheading-2xs uppercase text-subtle">On this page</p>
      <ul className="space-y-0.5 border-l border-separator">
        {headings.map((h) => (
          <li key={h.id}>
            <button
              onClick={() => document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className={cn(
                "-ml-px block w-full border-l-2 py-1 pl-3 text-left text-paragraph-xs transition-colors",
                active === h.id ? "border-accent font-medium text-accent" : "border-transparent text-muted hover:border-border hover:text-foreground",
              )}
            >
              {h.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------------------------- Layout --------------------------------- */

export function DocsLayout({
  route,
  navigate,
  children,
  headings,
  activeHeading,
}: {
  route: string;
  navigate: (t: string) => void;
  children: ReactNode;
  headings: { id: string; title: string }[];
  activeHeading: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const { prev, next } = siblings(route);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearch(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => setMobileOpen(false), [route]);

  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[400] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-paragraph-sm focus:font-medium focus:text-accent-foreground"
      >
        Skip to content
      </a>
      <Navbar route={route} navigate={navigate} onOpenSearch={() => setSearch(true)} onOpenMobile={() => setMobileOpen(true)} />
      <CommandPalette open={search} onClose={() => setSearch(false)} navigate={navigate} />

      {mobileOpen && (
        <div className="fixed inset-0 z-[90] lg:hidden">
          <div className="animate-fade-in absolute inset-0 bg-backdrop backdrop-blur-[2px]" onClick={() => setMobileOpen(false)} />
          <aside className="ds-scroll absolute inset-y-0 left-0 w-72 overflow-y-auto border-r border-border bg-background p-4">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2"><Logo size={24} /><span className="font-medium">Aperture</span></div>
              <button onClick={() => setMobileOpen(false)} className="rounded-lg p-1.5 text-muted hover:bg-surface-hover"><X className="h-4 w-4" /></button>
            </div>
            <SidebarNav route={route} navigate={navigate} onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className="mx-auto flex max-w-[1600px] gap-8 px-4 sm:px-6">
        <aside className="ds-scroll sticky top-14 hidden h-[calc(100vh-3.5rem)] w-60 shrink-0 overflow-y-auto py-8 pr-2 lg:block">
          <SidebarNav route={route} navigate={navigate} />
        </aside>

        <main id="main" className="min-w-0 flex-1 py-8 sm:py-10">
          <div className="mx-auto max-w-3xl xl:mx-0">
            <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-1 text-paragraph-xs">
              <button onClick={() => navigate("")} className="text-muted transition-colors hover:text-foreground">Home</button>
              {(() => {
                const item = findItem(route);
                if (!item) return null;
                return (
                  <>
                    <ChevronRight className="h-3 w-3 text-subtle" />
                    <span className="text-muted">{item.group}</span>
                    <ChevronRight className="h-3 w-3 text-subtle" />
                    <span className="font-medium text-foreground">{item.title}</span>
                  </>
                );
              })()}
            </nav>
            {children}
          </div>

          {(prev || next) && (
            <div className="mx-auto mt-16 grid max-w-3xl gap-3 border-t border-separator pt-8 sm:grid-cols-2 xl:mx-0">
              {prev ? (
                <button onClick={() => navigate(prev.href)} className="group flex flex-col items-start gap-1 rounded-2xl bg-surface p-4 text-left ring-1 ring-border shadow-xs transition-all hover:shadow-md hover:ring-border-strong">
                  <span className="flex items-center gap-1.5 text-[11px] text-subtle"><ArrowLeft className="h-3 w-3" />Previous</span>
                  <span className="text-paragraph-sm font-medium text-foreground group-hover:text-accent">{prev.title}</span>
                </button>
              ) : <span />}
              {next && (
                <button onClick={() => navigate(next.href)} className="group flex flex-col items-end gap-1 rounded-2xl bg-surface p-4 text-right ring-1 ring-border shadow-xs transition-all hover:shadow-md hover:ring-border-strong sm:col-start-2">
                  <span className="flex items-center gap-1.5 text-[11px] text-subtle">Next<ArrowRight className="h-3 w-3" /></span>
                  <span className="text-paragraph-sm font-medium text-foreground group-hover:text-accent">{next.title}</span>
                </button>
              )}
            </div>
          )}
        </main>

        <Toc headings={headings} active={activeHeading} />
      </div>
    </div>
  );
}
