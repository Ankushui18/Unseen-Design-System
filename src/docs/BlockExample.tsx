import { Fragment, useId, useState } from "react";
import { Check, Code2, Copy, Eye, RotateCcw } from "lucide-react";
import type { BlockDef } from "../blocks";
import { useCopy } from "../lib/hooks";
import { CodeBlock } from "./CodeBlock";
import { blockFilename, getBlockSource } from "./block-source";

export function BlockExample({ block }: { block: BlockDef }) {
  const [view, setView] = useState("preview");
  const [revision, setRevision] = useState(0);
  const { copy, copied } = useCopy();
  const id = useId();
  const source = getBlockSource(block.key);
  return <article className="block-example">
    <div className="showcase-toolbar">
      <div className="preview-tabs" role="tablist" aria-label={`${block.title} view`}>
        {[{ key: "preview", label: "Preview", icon: Eye }, { key: "code", label: "Source", icon: Code2 }].map((t) => <button key={t.key} id={`${id}-${t.key}`} role="tab" aria-selected={view === t.key} aria-controls={`${id}-panel`} onClick={() => setView(t.key)}><t.icon size={14} />{t.label}</button>)}
      </div>
      <div className="showcase-tools"><button className="studio-icon-button" onClick={() => setRevision((r) => r + 1)} aria-label={`Reset ${block.title}`} title="Reset example"><RotateCcw size={14} /></button><button className="block-copy-button" onClick={() => copy(source)}>{copied ? <Check size={13} /> : <Copy size={13} />}{copied ? "Copied" : "Copy source"}</button></div>
    </div>
    <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-${view}`}>
      {view === "code" ? <CodeBlock code={source} filename={`blocks/${blockFilename(block.key)}`} maxHeight={540} /> : <div className="block-stage"><div className="block-preview-inner" style={{ maxWidth: block.width ?? 440 }}><Fragment key={revision}>{block.render()}</Fragment></div></div>}
    </div>
    <footer className="block-example-footer"><span><h3>{block.title}</h3><p>{block.description}</p></span><span>{block.category}</span></footer>
  </article>;
}