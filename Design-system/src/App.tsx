import { useEffect, useState } from "react";
import { ThemeProvider } from "./lib/theme";
import { ToastProvider } from "./ui/Overlay";
import { useHashRoute, useScrollSpy } from "./lib/hooks";
import { CommandPalette, DocsLayout, Navbar } from "./docs/Shell";
import { PreviewBanner } from "./docs/Preview";
import { ROUTES } from "./pages/registry";
import Home from "./pages/Home";
import { BlocksPage } from "./pages/Blocks";
import { Button } from "./ui/Button";
import { PageHeader } from "./docs/Blocks";

function Shell() {
  const { route, navigate } = useHashRoute();
  const [headings, setHeadings] = useState<{ id: string; title: string }[]>([]);
  const [search, setSearch] = useState(false);
  const activeHeading = useScrollSpy(headings.map((h) => h.id));

  const isHome = route === "" || route === "/";

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

  useEffect(() => {
    if (isHome) {
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
  }, [route, isHome]);

  if (isHome || route === "blocks") {
    return (
      <div className="min-h-screen bg-background">
        <PreviewBanner onNavigate={navigate} />
        <Navbar route={route} navigate={navigate} onOpenSearch={() => setSearch(true)} onOpenMobile={() => setSearch(true)} />
        <CommandPalette open={search} onClose={() => setSearch(false)} navigate={navigate} />
        {isHome ? <Home navigate={navigate} /> : <BlocksPage />}
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
