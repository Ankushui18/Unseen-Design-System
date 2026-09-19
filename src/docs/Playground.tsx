import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import {
  RiCheckLine,
  RiComputerLine,
  RiFileCopyLine,
  RiMoonLine,
  RiRestartLine,
  RiSmartphoneLine,
  RiSunLine,
  RiTabletLine,
} from "@remixicon/react";
import { cn } from "../utils/cn";
import { useCopy } from "../lib/hooks";

/**
 * Playground — the inline, live, editable example that every Tier A component
 * page leads with (WEBSITE-IA.md §5). Contract:
 *
 *  - controls ↔ code are one state: the parent derives `code` from its controls,
 *    so there is no control the code cannot express (and no second API);
 *  - the code is editable — edits re-render the preview immediately, and change
 *    the controls back only when the parent regenerates `code`;
 *  - copy copies exactly what is shown; reset returns to the parent's default;
 *  - viewport + canvas theme are part of the example, not the page;
 *  - the editor is labelled, the toolbar is keyboard-complete, and the error
 *    surface is readable text — never a blank canvas.
 *
 * It is deliberately controlled: the parent owns the axis state (and therefore
 * can persist it to the URL with useHashParams), this component owns presentation.
 */
export function Playground({
  id,
  code,
  scope,
  controls,
  imports,
  onReset,
  title = "Playground",
  description,
  className,
}: {
  /** Stable anchor id (used for #playground deep links). */
  id?: string;
  /** The code shown in the editor and rendered in the preview. */
  code: string;
  scope: Record<string, unknown>;
  /** The controls row that regenerates `code`. */
  controls?: ReactNode;
  /** Import lines prepended on copy (the editor itself stays runnable JSX). */
  imports?: string;
  /**
   * Return the example to its documented default cell (IA §5.3.4). The page owns
   * the axis state, so it owns the reset; edits are always discarded.
   */
  onReset?: () => void;
  title?: string;
  description?: ReactNode;
  className?: string;
}) {
  const [canvasTheme, setCanvasTheme] = useState<"auto" | "light" | "dark">("auto");
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [resetKey, setResetKey] = useState(0);
  const { copy, copied } = useCopy();
  const editorHost = useRef<HTMLDivElement>(null);

  /* react-live's LiveEditor forwards only className/style to a contentEditable
   * <pre> and drops every ARIA prop, so the editable region would otherwise have
   * no accessible name (IA §5.5). Label it on the node that is actually editable.
   * Re-runs when the provider remounts the editor (code / reset). */
  useEffect(() => {
    const node = editorHost.current?.querySelector<HTMLElement>("[contenteditable]");
    if (!node) return;
    node.setAttribute("role", "textbox");
    node.setAttribute("aria-multiline", "true");
    node.setAttribute("aria-label", `Edit the ${title} example code`);
    node.setAttribute("aria-describedby", "playground-editor-hint");
  }, [title, code, resetKey]);

  const viewports = useMemo(
    () => [
      { key: "desktop", label: "Desktop viewport", icon: RiComputerLine, width: "100%" },
      { key: "tablet", label: "Tablet viewport (768px)", icon: RiTabletLine, width: "768px" },
      { key: "mobile", label: "Mobile viewport (390px)", icon: RiSmartphoneLine, width: "390px" },
    ] as const,
    [],
  );
  const active = viewports.find((v) => v.key === viewport)!;

  return (
    <section id={id} className={cn("playground", className)} aria-label={title}>
      <header className="playground-toolbar">
        <div className="playground-heading">
          <span className="text-label-sm">{title}</span>
          {description && <p className="text-paragraph-xs text-muted">{description}</p>}
        </div>

        <div className="playground-tools">
          <div className="playground-segment" role="group" aria-label="Preview viewport">
            {viewports.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                type="button"
                aria-label={label}
                aria-pressed={viewport === key}
                onClick={() => setViewport(key)}
              >
                <Icon size={14} aria-hidden />
              </button>
            ))}
          </div>

          <button
            type="button"
            className="playground-icon-button"
            aria-label={`Canvas theme: ${canvasTheme}`}
            title={`Canvas: ${canvasTheme}`}
            onClick={() => setCanvasTheme((t) => (t === "auto" ? "dark" : t === "dark" ? "light" : "auto"))}
          >
            {canvasTheme === "dark" ? <RiMoonLine size={14} className="text-accent" aria-hidden /> : <RiSunLine size={14} aria-hidden />}
          </button>

          <button
            type="button"
            className="playground-icon-button"
            aria-label="Reset example"
            title="Reset example (back to the default example)"
            onClick={() => { onReset?.(); setResetKey((k) => k + 1); }}
          >
            <RiRestartLine size={14} aria-hidden />
          </button>

          <button
            type="button"
            className="playground-copy"
            onClick={() => copy(imports ? `${imports}\n\n${code}` : code)}
            aria-label={copied ? "Copied" : "Copy example code"}
          >
            {copied ? <RiCheckLine size={14} className="text-success" aria-hidden /> : <RiFileCopyLine size={14} aria-hidden />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </header>

      <LiveProvider key={`${resetKey}-${code}`} code={code} scope={scope} language="tsx" noInline={false}>
        <div
          className={cn(
            "playground-stage",
            canvasTheme === "dark" && "dark bg-surface-secondary text-foreground",
            canvasTheme === "light" && "light bg-surface text-foreground",
          )}
          data-theme={canvasTheme !== "auto" ? canvasTheme : undefined}
        >
          <div
            className="playground-frame"
            style={{ maxWidth: active.width }}
            data-viewport={viewport}
          >
            <div className="playground-preview" role="region" aria-label="Component preview" tabIndex={-1}>
              <LivePreview />
            </div>
            {/* LiveError spreads props onto a <pre> and has no role by default:
                without one a compile error is silent for screen readers. Polite,
                not assertive — the user is mid-edit, not blocked (§7.2.5). */}
            <LiveError className="playground-error" role="status" aria-live="polite" />
          </div>
        </div>

        <div className="playground-footer">
          {controls && (
            <div className="playground-controls" role="group" aria-label="Example controls">
              {controls}
            </div>
          )}
          <div className="playground-code">
            <div className="playground-code-header">
              {/* The code panel is a permanently dark surface: it uses explicit
                  dark-surface colours (the .code-panel convention), never light-theme
                  text tokens — those fail AA on #141922. */}
              <span className="font-mono text-paragraph-xs">Example.tsx</span>
              <span id="playground-editor-hint" className="text-paragraph-xs">
                {imports ? "editable · copy includes imports" : "editable — the preview follows your keystrokes"}
              </span>
            </div>
            <div ref={editorHost}>
              <LiveEditor className="playground-editor" />
            </div>
          </div>
        </div>
      </LiveProvider>
    </section>
  );
}
