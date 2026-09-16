import { useEffect, useMemo, useRef, useState } from "react";
import { RiRefreshLine, RiPlayLine, RiCodeSSlashLine } from "@remixicon/react";
import { cn } from "../utils/cn";
import { highlight } from "./CodeBlock";

/**
 * Live sandbox: editable JSX on the left, real rendered React on the right.
 *
 * The editor is a plain textarea overlaid on a syntax-highlighted <pre>, which
 * gives us highlighting with zero dependencies and no build step. The snippet is
 * executed by translating the JSX to a React element tree through a tiny
 * allow-listed registry of Aperture components — no eval of user imports, so a
 * sandboxed example can never reach the network or the DOM directly.
 */
export function LiveEditor({
  code: initial,
  scope,
  className,
  height = 260,
}: {
  code: string;
  /** Map of component names available to the snippet. */
  scope: Record<string, unknown>;
  className?: string;
  height?: number;
}) {
  const [code, setCode] = useState(initial.trim());
  const [running, setRunning] = useState(initial.trim());
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const taRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  // Keep the highlight layer scrolled in sync with the textarea.
  const syncScroll = () => {
    if (preRef.current && taRef.current) {
      preRef.current.scrollTop = taRef.current.scrollTop;
      preRef.current.scrollLeft = taRef.current.scrollLeft;
    }
  };

  const run = () => {
    setRunning(code);
    setTab("preview");
  };

  return (
    <div className={cn("overflow-hidden rounded-2xl bg-surface ring-1 ring-border shadow-xs", className)}>
      {/* Toolbar */}
      <div className="flex items-center gap-1 border-b border-separator bg-surface-secondary px-2 py-1.5">
        {(
          [
            ["preview", RiPlayLine, "Preview"],
            ["code", RiCodeSSlashLine, "Edit"],
          ] as const
        ).map(([k, Icon, label]) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-paragraph-xs font-medium transition-colors",
              tab === k ? "bg-surface text-foreground shadow-toggle ring-1 ring-border/60" : "text-muted hover:text-foreground",
            )}
          >
            <Icon size={13} />
            {label}
          </button>
        ))}
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-success-soft px-2 py-0.5 text-[10px] font-medium text-success-soft-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          Live
        </span>
        <button
          onClick={() => { setCode(initial.trim()); setRunning(initial.trim()); setError(null); }}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-paragraph-xs font-medium text-muted transition-colors hover:text-foreground"
          aria-label="Reset example"
        >
          <RiRefreshLine size={13} />
          Reset
        </button>
        <button
          onClick={run}
          className="bevel ml-1 inline-flex items-center gap-1.5 rounded-lg bg-accent px-2.5 py-1.5 text-paragraph-xs font-medium text-accent-foreground shadow-fancy-accent transition hover:bg-accent-hover"
        >
          <RiPlayLine size={13} />
          Run
        </button>
      </div>

      {tab === "code" ? (
        <div className="relative" style={{ height }}>
          <pre
            ref={preRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 ds-scroll overflow-auto whitespace-pre-wrap break-words p-4 font-mono text-[12.5px] leading-[1.7]"
            dangerouslySetInnerHTML={{ __html: highlight(code) + "\n" }}
          />
          <textarea
            ref={taRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onScroll={syncScroll}
            onKeyDown={(e) => {
              // Tab inserts two spaces instead of leaving the editor.
              if (e.key === "Tab") {
                e.preventDefault();
                const el = e.currentTarget;
                const { selectionStart: s, selectionEnd: en } = el;
                setCode(code.slice(0, s) + "  " + code.slice(en));
                requestAnimationFrame(() => el.setSelectionRange(s + 2, s + 2));
              }
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") { e.preventDefault(); run(); }
            }}
            spellCheck={false}
            aria-label="Editable JSX example"
            className="absolute inset-0 h-full w-full resize-none bg-transparent p-4 font-mono text-[12.5px] leading-[1.7] text-transparent caret-foreground outline-none"
          />
        </div>
      ) : (
        <div className="dot-grid ds-scroll overflow-auto bg-background-secondary/40 p-6" style={{ minHeight: height }}>
          {error ? (
            <div className="rounded-xl bg-danger-soft p-4">
              <p className="text-label-sm text-danger">Could not render example</p>
              <p className="mt-1 font-mono text-paragraph-xs text-danger-soft-foreground">{error}</p>
            </div>
          ) : (
            <PreviewScope code={running} scope={scope} onError={setError} />
          )}
        </div>
      )}
      <p className="border-t border-separator bg-surface-secondary px-4 py-2 text-paragraph-xs text-subtle">
        Editable — press <kbd className="rounded border border-border bg-surface px-1 font-mono text-[10px]">⌘</kbd>
        <kbd className="ml-0.5 rounded border border-border bg-surface px-1 font-mono text-[10px]">↵</kbd> to run, or
        click Run. Only Aperture components are available in the sandbox.
      </p>
    </div>
  );
}

/* --------------------------- tiny JSX interpreter -------------------------- */

const NAME = /[A-Za-z][\w.]*/;
type Node = { tag: string; props: Record<string, unknown>; children: PNode[] };
type PNode = Node | string;

/** Parse a restricted JSX subset to a tree. No eval, no Function constructor. */
function parseJsx(src: string): { tree: PNode[]; error?: string } {
  const tree: PNode[] = [];
  let i = 0;
  const n = src.length;
  const stack: { tag: string; props: Record<string, unknown>; children: PNode[] }[] = [];
  const push = (t: PNode) => (stack.length ? stack[stack.length - 1].children.push(t) : tree.push(t));

  const readAttrs = (): { props: Record<string, unknown>; selfClose: boolean } => {
    const props: Record<string, unknown> = {};
    let selfClose = false;
    for (;;) {
      while (i < n && /\s/.test(src[i])) i++;
      if (src[i] === "/" && src[i + 1] === ">") { i += 2; selfClose = true; return { props, selfClose }; }
      if (src[i] === ">") { i += 1; return { props, selfClose }; }
      const am = NAME.exec(src.slice(i));
      if (!am) return { props, selfClose };
      const attr = am[0];
      i += am[0].length;
      while (i < n && /\s/.test(src[i])) i++;
      if (src[i] === "=") {
        i++;
        while (i < n && /\s/.test(src[i])) i++;
        const q = src[i];
        if (q === '"' || q === "'") {
          i++;
          let v = "";
          while (i < n && src[i] !== q) v += src[i++];
          i++;
          props[attr] = v;
        } else if (src[i] === "{") {
          i++;
          let depth = 1;
          let expr = "";
          while (i < n && depth > 0) {
            if (src[i] === "{") depth++;
            else if (src[i] === "}") { depth--; if (!depth) break; }
            expr += src[i++];
          }
          i++;
          props[attr] = evalExpr(expr.trim());
        }
      } else props[attr] = true;
    }
  };

  const evalExpr = (raw: string): unknown => {
    if (raw === "true") return true;
    if (raw === "false") return false;
    if (/^-?\d+(\.\d+)?$/.test(raw)) return Number(raw);
    return raw;
  };

  try {
    while (i < n) {
      if (src.startsWith("/*", i)) { const e = src.indexOf("*/", i); i = e < 0 ? n : e + 2; continue; }
      if (src[i] === "<") {
        if (src[i + 1] === "/") {
          const em = NAME.exec(src.slice(i + 2));
          i += 2 + (em?.[0].length ?? 0);
          while (i < n && src[i] !== ">") i++;
          i++;
          const done = stack.pop();
          if (done) push(done);
          continue;
        }
        i++;
        const tm = NAME.exec(src.slice(i));
        if (!tm) return { tree: [], error: "Malformed tag near position " + i };
        const tag = tm[0];
        i += tag.length;
        const { props, selfClose } = readAttrs();
        if (selfClose) push({ tag, props, children: [] });
        else stack.push({ tag, props, children: [] });
        continue;
      }
      if (src.startsWith("{/*", i)) { const e = src.indexOf("*/}", i); i = e < 0 ? n : e + 3; continue; }
      if (src[i] === "{") {
        i++;
        let depth = 1;
        let expr = "";
        while (i < n && depth > 0) {
          if (src[i] === "{") depth++;
          else if (src[i] === "}") { depth--; if (!depth) break; }
          expr += src[i++];
        }
        i++;
        const v = evalExpr(expr.trim());
        if (v !== undefined && v !== null && v !== false && v !== true) push(String(v));
        continue;
      }
      let text = "";
      while (i < n && src[i] !== "<" && src[i] !== "{") text += src[i++];
      if (text.trim()) push(text.trim());
    }
    if (stack.length) return { tree: [], error: "Unclosed <" + stack[stack.length - 1].tag + "> tag" };
    return { tree };
  } catch (e) {
    return { tree: [], error: e instanceof Error ? e.message : "Parse error" };
  }
}

/** Render a parsed tree using only components from `scope`. */
function PreviewScope({ code, scope, onError }: { code: string; scope: Record<string, unknown>; onError: (e: string) => void }) {
  const rendered = useMemo(() => {
    const { tree, error } = parseJsx(code);
    if (error) { onError(error); return null; }
    onError("");
    const build = (nodes: PNode[], key = 0): React.ReactNode[] =>
      nodes.map((nd, idx) => {
        if (typeof nd === "string") return nd;
        const Cmp = scope[nd.tag.split(".")[0]] as React.ComponentType<Record<string, unknown>> | undefined;
        if (Cmp === undefined) {
          onError(`“${nd.tag}” is not available in this sandbox.`);
          return null;
        }
        const kids = build(nd.children, idx);
        const { key: _k, ...rest } = nd.props as Record<string, unknown>;
        return <Cmp key={`${key}-${idx}`} {...(rest as Record<string, never>)}>{kids.length ? kids : undefined}</Cmp>;
      });
    return build(tree);
  }, [code, scope, onError]);

  if (!rendered) return null;
  return <div className="flex flex-wrap items-center justify-center gap-4">{rendered}</div>;
}

/** Convenience wrapper so docs pages can pass a JSX string and get a sandbox. */
export function LiveExample({ code, scope, height }: { code: string; scope: Record<string, unknown>; height?: number }) {
  const [_, force] = useState(0);
  useEffect(() => force((n) => n + 1), [code]);
  return <LiveEditor code={code} scope={scope} height={height} />;
}
