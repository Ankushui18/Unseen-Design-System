import { Fragment, useId, useState } from "react";
import type { BlockDef } from "../blocks";
import { useCopy } from "../lib/hooks";
import { CodeBlock } from "./CodeBlock";
import { blockFilename, getBlockSource } from "./block-source";
import { RiArrowRightLine, RiCheckLine, RiCodeSSlashLine, RiComputerLine, RiEyeLine, RiFileCopyLine, RiRestartLine, RiSmartphoneLine, RiTabletLine } from "@remixicon/react";

/**
 * The preview + source frame used by the gallery and by `/blocks/{key}`.
 *
 * `blockHref` adds the link to the block's own page — the gallery passes it,
 * the block page itself does not (you are already there).
 */
export function BlockExample({ block, blockHref }: { block: BlockDef; blockHref?: string }) {
  const [view, setView] = useState("preview");
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [revision, setRevision] = useState(0);
  const { copy, copied } = useCopy();
  const id = useId();
  const source = getBlockSource(block.key);

  return (
    <article className="block-example">
      <div className="showcase-toolbar">
        <div className="preview-tabs" role="tablist" aria-label={`${block.title} view`}>
          {[
            { key: "preview", label: "Preview", icon: RiEyeLine },
            { key: "code", label: "Source", icon: RiCodeSSlashLine },
          ].map((t) => (
            <button
              key={t.key}
              id={`${id}-${t.key}`}
              role="tab"
              aria-selected={view === t.key}
              aria-controls={`${id}-panel`}
              onClick={() => setView(t.key)}
            >
              <t.icon size={14} />
              {t.label}
            </button>
          ))}
        </div>
        <div className="showcase-tools">
          {view === "preview" && (
            <div className="viewport-switcher" role="group" aria-label="Preview viewport">
              <button
                type="button"
                aria-pressed={viewport === "desktop"}
                aria-label="Desktop viewport"
                title="Desktop (100%)"
                onClick={() => setViewport("desktop")}
              >
                <RiComputerLine size={13} />
              </button>
              <button
                type="button"
                aria-pressed={viewport === "tablet"}
                aria-label="Tablet viewport (768px)"
                title="Tablet (768px)"
                onClick={() => setViewport("tablet")}
              >
                <RiTabletLine size={13} />
              </button>
              <button
                type="button"
                aria-pressed={viewport === "mobile"}
                aria-label="Mobile viewport (390px)"
                title="Mobile (390px)"
                onClick={() => setViewport("mobile")}
              >
                <RiSmartphoneLine size={13} />
              </button>
            </div>
          )}
          <button
            className="studio-icon-button"
            onClick={() => setRevision((r) => r + 1)}
            aria-label={`Reset ${block.title}`}
            title="Reset example"
          >
            <RiRestartLine size={14} />
          </button>
          <button className="block-copy-button" onClick={() => copy(source)}>
            {copied ? <RiCheckLine size={13} /> : <RiFileCopyLine size={13} />}
            {copied ? "Copied" : "Copy source"}
          </button>
        </div>
      </div>
      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-${view}`}>
        {view === "code" ? (
          <CodeBlock code={source} filename={`blocks/${blockFilename(block.key)}`} maxHeight={540} />
        ) : (
          <div className="block-stage flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
            {viewport === "desktop" ? (
              <div
                className="w-full min-w-0 transition-all duration-[var(--duration-slow)]"
                style={{ maxWidth: block.width ? `${block.width}px` : "100%" }}
              >
                <Fragment key={revision}>{block.render()}</Fragment>
              </div>
            ) : viewport === "tablet" ? (
              <div className="w-full max-w-[768px] mx-auto rounded-16 border border-border/80 bg-surface shadow-xl overflow-hidden transition-all duration-[var(--duration-slow)] ring-1 ring-black/5 dark:ring-white/10">
                <div className="flex items-center justify-between border-b border-separator/80 bg-surface-secondary/70 px-4 py-2 text-[10px] font-mono text-subtle select-none">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-border-strong" />
                    <span className="h-2 w-2 rounded-full bg-border-strong" />
                  </div>
                  <span className="font-medium text-foreground/80">768 × 1024 · Tablet Viewport</span>
                  <span className="text-[9px] uppercase tracking-wider">100%</span>
                </div>
                <div className="w-full min-w-0 transition-all duration-[var(--duration-base)] overflow-x-auto p-4 sm:p-6">
                  <Fragment key={revision}>{block.render()}</Fragment>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-[390px] mx-auto rounded-20 border border-border/80 bg-surface shadow-2xl overflow-hidden transition-all duration-[var(--duration-slow)] ring-1 ring-black/10 dark:ring-white/10">
                <div className="flex items-center justify-between border-b border-separator/80 bg-surface-secondary/70 px-3.5 py-2 text-[10px] font-mono text-subtle select-none">
                  <span className="text-[10px] font-medium text-foreground/90">9:41</span>
                  <div className="h-3 w-16 rounded-full bg-foreground/20" />
                  <div className="flex items-center gap-1 text-[9px]">
                    <span className="font-medium text-foreground/80">390px</span>
                  </div>
                </div>
                <div className="w-full min-w-0 transition-all duration-[var(--duration-base)] overflow-x-auto p-3.5 sm:p-4">
                  <Fragment key={revision}>{block.render()}</Fragment>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <footer className="block-example-footer">
        <span>
          {blockHref ? (
            <h3>
              <a className="block-example-title-link" href={`#/${blockHref}`}>
                {block.title}
                <RiArrowRightLine size={14} aria-hidden />
              </a>
            </h3>
          ) : (
            <h3>{block.title}</h3>
          )}
          <p>{block.description}</p>
        </span>
        <span>{blockHref ? <a className="block-example-open" href={`#/${blockHref}`}>Open block page</a> : block.category}</span>
      </footer>
    </article>
  );
}
