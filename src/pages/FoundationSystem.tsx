import { useState, type CSSProperties, type ReactNode } from "react";
import { ArrowRight, Check, Copy, Grid2x2, List, Mail, Plus, RotateCcw } from "lucide-react";
import { PageHeader, Section } from "../docs/Blocks";
import { CodeBlock } from "../docs/CodeBlock";
import { useCopy } from "../lib/hooks";
import { RADIUS_PRESETS, useTheme } from "../lib/theme";
import { Button } from "../ui/Button";
import { Avatar } from "../ui/Display";
import { Input } from "../ui/Form";

const SPACING = [
  { name: "0", px: 0 }, { name: "0.5", px: 2 }, { name: "1", px: 4 }, { name: "1.5", px: 6 },
  { name: "2", px: 8 }, { name: "3", px: 12 }, { name: "4", px: 16 }, { name: "5", px: 20 },
  { name: "6", px: 24 }, { name: "8", px: 32 }, { name: "10", px: 40 }, { name: "12", px: 48 },
  { name: "16", px: 64 }, { name: "20", px: 80 }, { name: "24", px: 96 }, { name: "32", px: 128 },
];

const RADII = [
  { name: "none", px: 0, use: "Edge-to-edge regions" },
  { name: "sm", px: 4, use: "Badges and metadata" },
  { name: "md", px: 6, use: "Compact controls" },
  { name: "lg", px: 8, use: "Small buttons" },
  { name: "10", px: 10, use: "Inputs and buttons" },
  { name: "xl", px: 12, use: "Cards and panels" },
  { name: "2xl", px: 16, use: "Dialogs" },
  { name: "20", px: 20, use: "Large surfaces" },
  { name: "3xl", px: 24, use: "Feature surfaces" },
  { name: "full", px: 9999, use: "Avatars and switches" },
];

function TokenCopy({ text, children, className = "", style }: { text: string; children: ReactNode; className?: string; style?: CSSProperties }) {
  const { copy, copied } = useCopy();
  return <button type="button" className={`token-specimen ${className}`} style={style} onClick={() => copy(text)} aria-label={`Copy ${text}`}>
    <span className="token-copy-indicator">{copied ? <Check size={13} /> : <Copy size={13} />}</span>
    {children}
    <span className="sr-only" aria-live="polite">{copied ? "Copied" : ""}</span>
  </button>;
}

export function SpacingPage() {
  const [view, setView] = useState("visual");
  const [gap, setGap] = useState(16);
  const [padding, setPadding] = useState(24);
  const [columns, setColumns] = useState(4);

  return <>
    <PageHeader eyebrow="Foundations" title="Spacing & layout" description="A shared rhythm for every interface. Use a 4px base unit to keep controls, content, and layouts comfortably in step." tags={["4px base unit", "Responsive layouts", "Copyable tokens"]} />

    <Section title="Spacing scale" description="Small values bring related elements together. Larger values give sections room to breathe. Click a specimen to copy its spacing utility.">
      <div className="foundation-panel">
        <div className="foundation-panel-toolbar">
          <span className="foundation-panel-title">Base scale <span>16 values</span></span>
          <div className="preview-tabs" role="tablist" aria-label="Spacing scale view">
            <button role="tab" aria-selected={view === "visual"} onClick={() => setView("visual")}><Grid2x2 size={14} /> Visual</button>
            <button role="tab" aria-selected={view === "reference"} onClick={() => setView("reference")}><List size={14} /> Reference</button>
          </div>
        </div>
        {view === "visual" ? <div className="spacing-specimen-grid page-enter">
          {SPACING.map((token) => <TokenCopy key={token.name} text={`gap-${token.name}`}>
            <div className="spacing-measure"><span className="spacing-baseline" /><span className="spacing-bar" style={{ width: token.px }} /><span className="spacing-endline" style={{ left: `min(${token.px}px, calc(100% - 1px))` }} /></div>
            <div className="token-specimen-label"><code>{token.name}</code><span>{token.px}px</span></div>
            <small>{token.px / 16}rem</small>
          </TokenCopy>)}
        </div> : <div className="foundation-table-scroll page-enter">
          <table className="foundation-table"><thead><tr><th>Utility</th><th>Pixels</th><th>Rem</th><th>Preview</th></tr></thead><tbody>
            {SPACING.map((token) => <tr key={token.name}><td><code>gap-{token.name}</code></td><td>{token.px}px</td><td>{token.px / 16}rem</td><td><span className="spacing-reference-bar" style={{ width: token.px || 1 }} /></td></tr>)}
          </tbody></table>
        </div>}
        <div className="foundation-panel-footer">1 unit = 4px <span>Half steps support optical adjustments.</span></div>
      </div>
    </Section>

    <Section title="Space in context" description="Padding belongs inside a container. Gap belongs between its children. Adjust each independently to see the difference.">
      <div className="spacing-context">
        <div className="spacing-context-controls">
          <label>Container padding <output>{padding}px</output><input type="range" min="8" max="40" step="4" value={padding} onChange={(e) => setPadding(Number(e.target.value))} /></label>
          <label>Element gap <output>{gap}px</output><input type="range" min="4" max="32" step="4" value={gap} onChange={(e) => setGap(Number(e.target.value))} /></label>
          <button onClick={() => { setGap(16); setPadding(24); }} className="foundation-reset"><RotateCcw size={13} /> Reset to default</button>
        </div>
        <div className="spacing-context-canvas">
          <div className="spacing-context-frame" style={{ padding }}>
            <div className="spacing-context-content" style={{ gap }}>
              <div className="context-user"><Avatar name="Alex Morgan" size="sm" tone="accent" /><div><strong>Alex Morgan</strong><span>Product designer</span></div></div>
              <p>Good spacing makes a small interface feel considered.</p>
              <div className="context-cta" style={{ gap }}><span>Profile</span><span>Message</span></div>
            </div>
          </div>
          <code>padding: {padding}px; gap: {gap}px;</code>
        </div>
      </div>
    </Section>

    <Section title="Responsive composition" description="Let the available space determine the layout. Keep content readable rather than shrinking an entire interface to fit.">
      <div className="foundation-panel">
        <div className="foundation-panel-toolbar"><span className="foundation-panel-title">Column grid</span><div className="preview-tabs" role="group" aria-label="Grid columns">{[4, 8, 12].map((n) => <button key={n} aria-pressed={columns === n} onClick={() => setColumns(n)}>{n} columns</button>)}</div></div>
        <div className="responsive-grid-example" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0,1fr))` }}>{Array.from({ length: columns }, (_, i) => <div key={i}><span>{i + 1}</span></div>)}</div>
        <div className="foundation-panel-footer">24px gutter <span>16px on small screens</span></div>
      </div>
      <CodeBlock filename="Layout.tsx" code={`<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
  <ProjectDetails />
  <TeamMembers />
</div>`} />
    </Section>
  </>;
}

export function ElevationPage() {
  const { radiusScale, set } = useTheme();
  const [selectedRadius, setSelectedRadius] = useState("xl");
  const [sampleName, setSampleName] = useState("Studio workspace");
  const current = RADII.find((r) => r.name === selectedRadius)!;
  const appliedRadius = Math.min(current.px * radiusScale, 40);
  const elevations = [
    { name: "none", label: "Flat", context: "Content and grouped sections", shadow: "none" },
    { name: "xs", label: "Resting", context: "Inputs and small controls", shadow: "var(--shadow-xs)" },
    { name: "sm", label: "Raised", context: "Interactive surfaces", shadow: "var(--shadow-sm)" },
    { name: "md", label: "Floating", context: "Menus and dropdowns", shadow: "var(--shadow-md)" },
    { name: "lg", label: "Overlay", context: "Popovers and drawers", shadow: "var(--shadow-lg)" },
    { name: "xl", label: "Modal", context: "Dialogs above the canvas", shadow: "var(--shadow-xl)" },
  ];

  return <>
    <PageHeader eyebrow="Foundations" title="Radius & elevation" description="Shape establishes character. Elevation establishes hierarchy. Use both deliberately, so the interface feels cohesive without everything competing for attention." tags={["10 radius values", "5 shadow levels", "Light & dark"]} />

    <Section title="Corner radius" description="A complete scale, from edge-to-edge content to circular controls. Select a specimen to inspect it in context and copy its utility.">
      <div className="foundation-panel">
        <div className="foundation-panel-toolbar">
          <span className="foundation-panel-title">Radius scale</span>
          <label className="foundation-select-label">Multiplier <select value={radiusScale} onChange={(e) => set({ radiusScale: Number(e.target.value) })} aria-label="Global radius multiplier">{!RADIUS_PRESETS.some((p) => p.value === radiusScale) && <option value={radiusScale}>{radiusScale}x / Custom</option>}{RADIUS_PRESETS.map((p) => <option key={p.name} value={p.value}>{p.value}x / {p.name}</option>)}</select></label>
        </div>
        <div className="radius-specimen-grid">
          {RADII.map((token) => <RadiusSpecimen key={token.name} token={token} scale={radiusScale} selected={selectedRadius === token.name} onSelect={() => setSelectedRadius(token.name)} />)}
        </div>
        <div className="foundation-panel-footer">Scales with your theme <button className="foundation-reset" onClick={() => set({ radiusScale: 1 })}><RotateCcw size={12} /> Reset multiplier</button></div>
      </div>
    </Section>

    <Section title="Shape in context" description="Compare the selected radius on a real form, not just an isolated square.">
      <div className="radius-context-canvas">
        <div className="radius-context-meta"><code>rounded-{selectedRadius}</code><span>{current.use}</span><strong>{current.px === 9999 ? "Fully rounded" : `${Number((current.px * radiusScale).toFixed(1))}px`}</strong></div>
        <form className="radius-context-card" style={{ borderRadius: appliedRadius }} onSubmit={(e) => e.preventDefault()}>
          <div className="radius-context-icon"><Plus size={20} /></div>
          <h3>Your next workspace</h3><p>A little structure for your next big idea.</p>
          <Input label="Workspace name" value={sampleName} onChange={(e) => setSampleName(e.target.value)} />
          <Button fullWidth endContent={<ArrowRight size={16} />} onClick={() => setSampleName("Workspace created")}>Create workspace</Button>
        </form>
      </div>
    </Section>

    <Section title="Elevation" description="Most surfaces only need a border. Reserve stronger shadows for elements that float above the page.">
      <div className="elevation-specimen-grid">
        {elevations.map((level) => <TokenCopy key={level.name} text={level.name === "none" ? "shadow-none" : `shadow-${level.name}`} className="elevation-specimen">
          <div className="elevation-object" style={{ boxShadow: level.shadow }}><Mail size={18} /><span>{level.label}</span></div>
          <div className="token-specimen-label"><code>shadow-{level.name}</code></div><small>{level.context}</small>
        </TokenCopy>)}
      </div>
    </Section>

    <Section title="Choose by purpose" description="Consistent combinations make the system recognizable before any brand color is applied.">
      <div className="foundation-table-scroll"><table className="foundation-table"><thead><tr><th>Element</th><th>Radius</th><th>Elevation</th></tr></thead><tbody>
        <tr><td>Badge</td><td><code>rounded-md</code></td><td>None</td></tr>
        <tr><td>Input or button</td><td><code>rounded-10</code></td><td><code>shadow-xs</code></td></tr>
        <tr><td>Content panel</td><td><code>rounded-xl</code></td><td>Border only</td></tr>
        <tr><td>Floating menu</td><td><code>rounded-xl</code></td><td><code>shadow-md</code></td></tr>
        <tr><td>Dialog</td><td><code>rounded-2xl</code></td><td><code>shadow-xl</code></td></tr>
      </tbody></table></div>
      <div className="foundation-guidance"><Check size={16} /><p>Shadows and surfaces respond to light and dark mode. Use the theme toggle in the navigation to compare them.</p></div>
    </Section>
  </>;
}

function RadiusSpecimen({ token, scale, selected, onSelect }: { token: typeof RADII[number]; scale: number; selected: boolean; onSelect: () => void }) {
  const { copy, copied } = useCopy();
  const value = token.px === 9999 ? 9999 : token.px * scale;
  return <button className={`token-specimen radius-specimen ${selected ? "is-selected" : ""}`} onClick={() => { onSelect(); copy(`rounded-${token.name}`); }} aria-label={`Select and copy rounded-${token.name}`} aria-pressed={selected}>
    <span className="token-copy-indicator">{copied ? <Check size={13} /> : <Copy size={13} />}</span>
    <div className="radius-guide"><span className="radius-shape" style={{ borderRadius: value }} /></div>
    <div className="token-specimen-label"><code>{token.name}</code><span>{token.px === 9999 ? "Full" : `${Number(value.toFixed(1))}px`}</span></div>
  </button>;
}