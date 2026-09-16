import type { ReactNode } from "react";

/**
 * Fictional company wordmarks for the "trusted by" strip. Each is an inline SVG
 * with a simple geometric mark + set wordmark, rendered in currentColor so the
 * marquee can tint them with one opacity rule and flip on hover.
 */
function Wordmark({ children, mark }: { children: ReactNode; mark: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-muted transition-opacity hover:opacity-100">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>{mark}</svg>
      <span className="whitespace-nowrap text-[15px] font-semibold tracking-[-0.015em]">{children}</span>
    </span>
  );
}

export const BRAND_MARKS: { name: string; node: ReactNode }[] = [
  {
    name: "Northwind",
    node: (
      <Wordmark
        mark={<path d="M4 18 9 9l3 4 4-6 4 11Z" fill="currentColor" stroke="none" opacity="0.9" />}
      >
        Northwind
      </Wordmark>
    ),
  },
  {
    name: "Vertex Labs",
    node: (
      <Wordmark
        mark={<><rect x="4" y="4" width="7" height="7" rx="1.5" fill="currentColor" /><rect x="13" y="4" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.4" /><rect x="4" y="13" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.4" /><rect x="13" y="13" width="7" height="7" rx="1.5" fill="currentColor" /></>}
      >
        Vertex Labs
      </Wordmark>
    ),
  },
  {
    name: "Corewave",
    node: (
      <Wordmark
        mark={<><path d="M3 12c2.5-4 5-4 7.5 0s5 4 7.5 0 3-3 3-3" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" /><circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none" /></>}
      >
        Corewave
      </Wordmark>
    ),
  },
  {
    name: "Lumen",
    node: (
      <Wordmark
        mark={<><circle cx="12" cy="12" r="4.2" fill="currentColor" /><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></>}
      >
        Lumen
      </Wordmark>
    ),
  },
  {
    name: "Pivotal",
    node: (
      <Wordmark
        mark={<path d="M12 3v8m0 0 6-4.5M12 11 6 6.5M12 11v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />}
      >
        Pivotal
      </Wordmark>
    ),
  },
  {
    name: "Halcyon",
    node: (
      <Wordmark
        mark={<><path d="M4 14a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><path d="M4 14h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><circle cx="12" cy="14" r="1.6" fill="currentColor" stroke="none" /></>}
      >
        Halcyon
      </Wordmark>
    ),
  },
  {
    name: "Maplewood",
    node: (
      <Wordmark
        mark={<path d="M12 3 6 10h3l-4 5h5v6h4v-6h5l-4-5h3Z" fill="currentColor" stroke="none" />}
      >
        Maplewood
      </Wordmark>
    ),
  },
  {
    name: "Ridgeline",
    node: (
      <Wordmark
        mark={<path d="M3 18 9 9l4 5 3-3 5 7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="none" />}
      >
        Ridgeline
      </Wordmark>
    ),
  },
  {
    name: "Quanta",
    node: (
      <Wordmark
        mark={<><circle cx="7" cy="12" r="3" fill="currentColor" /><circle cx="17" cy="7" r="2.2" fill="currentColor" opacity="0.55" /><circle cx="17" cy="17" r="2.2" fill="currentColor" opacity="0.55" /></>}
      >
        Quanta
      </Wordmark>
    ),
  },
  {
    name: "Sentinel",
    node: (
      <Wordmark
        mark={<><path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="none" /><path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></>}
      >
        Sentinel
      </Wordmark>
    ),
  },
];
