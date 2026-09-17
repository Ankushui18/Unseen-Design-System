import { Fragment, useId, useState } from "react";
import type { BlockDef } from "../blocks";
import { useCopy } from "../lib/hooks";
import { CodeBlock } from "./CodeBlock";
import { blockFilename, getBlockSource } from "./block-source";
import { RiCheckLine, RiCodeSSlashLine, RiComputerLine, RiEyeLine, RiFileCopyLine, RiRestartLine, RiSmartphoneLine, RiTabletLine } from "@remixicon/react";
import { cn } from "../utils/cn";

export function BlockExample({ block }: { block: BlockDef }) {
  const [view, setView] = useState("preview");
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [revision, setRevision] = useState(0);
  const { copy, copied } = useCopy();
  const id = useId();
  const source = getBlockSource(block.key);

  const effectiveWidth =
    viewport === "mobile" ? 390 :
    viewport === "tablet" ? 768 :
    (block.width ?? "100%");

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
          <div className="block-stage">
            <div
              className={cn(
                "block-preview-inner transition-all duration-300 ease-out-quint w-full min-w-0",
                viewport === "tablet" && "max-w-[768px] mx-auto rounded-16 ring-1 ring-border shadow-lg bg-surface overflow-hidden",
                viewport === "mobile" && "max-w-[390px] mx-auto rounded-20 ring-1 ring-border shadow-xl bg-surface overflow-hidden",
              )}
              style={{ maxWidth: viewport === "desktop" ? (block.width ? `${block.width}px` : "100%") : `${effectiveWidth}px` }}
            >
              <Fragment key={revision}>{block.render()}</Fragment>
            </div>
          </div>
        )}
      </div>
      <footer className="block-example-footer">
        <span>
          <h3>{block.title}</h3>
          <p>{block.description}</p>
        </span>
        <span>{block.category}</span>
      </footer>
    </article>
  );
}
