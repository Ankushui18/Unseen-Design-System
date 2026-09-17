import { useEffect, useState } from "react";
import { ThemeProvider } from "./lib/theme";
import { ToastProvider } from "./ui/Overlay";
import { useHashRoute, useScrollSpy } from "./lib/hooks";
import { CommandPalette, DocsLayout, MobileNavigation, Navbar } from "./docs/Shell";
import { findItem } from "./docs/nav";
import { ROUTES } from "./pages/registry";
import Home from "./pages/Home";
import { BlocksPage } from "./pages/Blocks";
import { PatternsPage } from "./pages/Patterns";
import { PricingPage } from "./pages/Pricing";
import { TemplatesOverviewPage } from "./pages/Templates";
import { Button } from "./ui/Button";
import { PageHeader } from "./docs/Blocks";

function Shell() {
  const { route, navigate } = useHashRoute();
  const [headings, setHeadings] = useState<{ id: string; title: string }[]>([]);
  const [search, setSearch] = useState(false);
  const [mobile, setMobile] = useState(false);
  const activeHeading = useScrollSpy(headings.map((h) => h.id));

  const isHome = route === "" || route === "/";
  const isPublicPage = isHome || route === "blocks" || route === "pricing" || route === "patterns" || route === "templates";

  useEffect(() => {
    if (!isPublicPage) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearch(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isPublicPage]);

  useEffect(() => { setMobile(false); setSearch(false); }, [route]);

  /* Route-aware document title (WCAG 2.4.2) — screen readers and browser tabs
     announce the current page, not just the product name. */
  useEffect(() => {
    const base = "Unseen Design System";
    if (isHome) {
      document.title = `${base} | Design & Development perfectly aligned`;
      return;
    }
    const staticTitles: Record<string, string> = { blocks: "Blocks", pricing: "Pricing", patterns: "Patterns", templates: "Templates" };
    const title = staticTitles[route] ?? findItem(route)?.title;
    document.title = title ? `${title} · ${base}` : base;
  }, [route, isHome]);

  useEffect(() => {
    if (isPublicPage) {
      setHeadings([]);
      return;
    }
    const id = window.setTimeout(() => {
      const found = Array.from(document.querySelectorAll<HTMLElement>("main section[id]")).map((el) => ({
        id: el.id,
        title: el.querySelector("h2")?.textContent?.trim() ?? el.id,
      }));
      setHeadings(found);
    }, 60);
    return () => window.clearTimeout(id);
  }, [route, isPublicPage]);

  if (isPublicPage) {
    return (
      <div className="min-h-screen bg-background">
        <a className="skip-link" href="#main" onClick={(e) => { e.preventDefault(); document.getElementById("main")?.focus(); }}>Skip to content</a>
        <Navbar route={route} navigate={navigate} onOpenSearch={() => setSearch(true)} onOpenMobile={() => setMobile(true)} />
        <CommandPalette open={search} onClose={() => setSearch(false)} navigate={navigate} />
        <MobileNavigation open={mobile} onClose={() => setMobile(false)} route={route} navigate={navigate} />
        {isHome ? (
          <Home navigate={navigate} />
        ) : route === "blocks" ? (
          <BlocksPage />
        ) : route === "pricing" ? (
          <PricingPage navigate={navigate} />
        ) : route === "templates" ? (
          <TemplatesOverviewPage navigate={navigate} />
        ) : (
          <PatternsPage />
        )}
      </div>
    );
  }

  const render = ROUTES[route];

  return (
    <DocsLayout route={route} navigate={navigate} headings={headings} activeHeading={activeHeading}>
      {render ? (
        render(navigate)
      ) : (
        <div>
          <PageHeader eyebrow="404" title="Page not found" description={`No documentation exists at “/${route}”. It may have moved in a recent release.`} />
          <div className="flex gap-2">
            <Button onClick={() => navigate("docs/introduction")}>Back to docs</Button>
            <Button variant="outline" tone="default" onClick={() => navigate("")}>Go home</Button>
          </div>
        </div>
      )}
    </DocsLayout>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Shell />
      </ToastProvider>
    </ThemeProvider>
  );
}
