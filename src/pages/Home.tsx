import { useState } from "react";
import { ArrowRight, Bell, Blocks, Check, Code2, Copy, Eye, Layers, Mail, Palette, Plus, RotateCcw, Ruler, Settings2, ShieldCheck, Sun, Sparkles } from "lucide-react";
import { Button, FancyButton } from "../ui/Button";
import { Avatar, Chip, Progress, Snippet } from "../ui/Display";
import { Input, Switch } from "../ui/Form";
import { Accordion, Breadcrumbs, Tabs } from "../ui/Navigation";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import { Modal, useToast } from "../ui/Overlay";
import { AuthCardBlock, BLOCKS } from "../blocks";
import { Logo } from "../docs/Shell";
import { CodeBlock } from "../docs/CodeBlock";
import { COMPONENT_GROUPS } from "../docs/nav";
import { PREVIEWS } from "../docs/previews";
import { ACCENT_PRESETS, useTheme } from "../lib/theme";
import { useCopy } from "../lib/hooks";
import { getBlockSource } from "../docs/block-source";

const COMPONENT_COUNT = COMPONENT_GROUPS.reduce((count, group) => count + group.items.length, 0);
const noop = () => {};

function PreferenceDemo() {
  const [email, setEmail] = useState(true);
  const [push, setPush] = useState(false);
  const [digest, setDigest] = useState(true);
  return <div className="mini-demo">
    <div className="mini-demo-title"><Bell size={17} /><h3>Your notifications</h3></div>
    <p>Choose what makes it to your inbox.</p>
    <div className="preference-item"><div><strong>Product updates</strong><span>A little news, occasionally.</span></div><Switch checked={email} onChange={setEmail} size="sm" label={<span className="sr-only">Product updates</span>} /></div>
    <div className="preference-item"><div><strong>Push notifications</strong><span>Stay in the loop, in real time.</span></div><Switch checked={push} onChange={setPush} size="sm" label={<span className="sr-only">Push notifications</span>} /></div>
    <div className="preference-item"><div><strong>Weekly digest</strong><span>The highlights, every Monday.</span></div><Switch checked={digest} onChange={setDigest} size="sm" label={<span className="sr-only">Weekly digest</span>} /></div>
    <div className="mini-demo-footer"><Check size={13} /> Preferences updated locally</div>
  </div>;
}

function TeamDemo() {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [members, setMembers] = useState([
    { name: "Olivia Rhye", email: "olivia@studio.design", role: "Owner" },
    { name: "Phoenix Baker", email: "phoenix@studio.design", role: "Editor" },
    { name: "Lana Steiner", email: "lana@studio.design", role: "Viewer" },
  ]);
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  return <div className="mini-demo team-demo">
    <div className="mini-demo-title"><h3>People make the project.</h3><Chip variant="outline" size="sm">{members.length} members</Chip></div>
    <p>A small team, building something good.</p>
    <div className="team-member-list">{members.map((m, i) => <div className="team-member" key={m.email}>
      <Avatar name={m.name} size="sm" tone={i % 2 === 0 ? "accent" : "default"} />
      <div><strong>{m.name}</strong><span>{m.email}</span></div>
      {i === 0 ? <span className="team-owner">Owner</span> : <select aria-label={`Role for ${m.name}`} value={m.role} onChange={(e) => setMembers((items) => items.map((item, j) => j === i ? { ...item, role: e.target.value } : item))}><option>Editor</option><option>Viewer</option></select>}
    </div>)}</div>
    <Button fullWidth variant="outline" tone="default" size="sm" startContent={<Plus />} onClick={() => setInviteOpen(true)}>Invite a teammate</Button>
    <Modal open={inviteOpen} onClose={() => setInviteOpen(false)} title="Invite a teammate" description="This adds a teammate to the local preview. No email is sent." footer={<><Button variant="outline" tone="default" onClick={() => setInviteOpen(false)}>Cancel</Button><Button disabled={!valid || members.some((m) => m.email === email)} onClick={() => { setMembers((m) => [...m, { name: email.split("@")[0], email, role: "Viewer" }]); setEmail(""); setInviteOpen(false); }}>Add teammate</Button></>}>
      <Input label="Email address" type="email" placeholder="teammate@company.com" startContent={<Mail />} value={email} onChange={(e) => setEmail(e.target.value)} />
    </Modal>
  </div>;
}

function ActionsDemo() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const { push } = useToast();
  return <div className="mini-demo action-demo">
    <div className="mini-demo-title"><h3>The right amount of emphasis.</h3></div><p>Clear choices, from primary to quiet.</p>
    <div className="action-demo-buttons"><Button size="sm" loading={saving} onClick={() => { setSaving(true); window.setTimeout(() => { setSaving(false); setSaved(true); }, 700); }}>{saved ? "Saved" : "Save changes"}</Button><Button size="sm" variant="outline" tone="default" onClick={() => { setSaved(false); push({ title: "Changes discarded", tone: "default" }); }}>Cancel</Button><Button size="sm" variant="ghost" tone="default" iconOnly aria-label="More settings" onClick={() => push({ title: "Settings preview", description: "Explore the complete menu component in the library.", tone: "accent" })}><Settings2 /></Button></div>
    <div className="action-demo-statuses"><Chip tone="success" variant="soft" dot>Published</Chip><Chip tone="warning" variant="soft" dot>In review</Chip><Chip variant="outline" dot>Draft</Chip></div>
  </div>;
}

function ThemeDemo() {
  const { accentH, accentC, set } = useTheme();
  const swatches = [ACCENT_PRESETS[0], ACCENT_PRESETS[1], ACCENT_PRESETS[4], ACCENT_PRESETS[9], ACCENT_PRESETS[7]];
  return <div className="mini-demo palette-demo">
    <div className="mini-demo-title"><Palette size={17} /><h3>Make it yours.</h3></div><p>One accent. An entirely different feel.</p>
    <div className="palette-demo-swatches">{swatches.map((p) => <button key={p.name} aria-label={`Use ${p.name} theme`} aria-pressed={accentH === p.h && accentC === p.c} style={{ background: `oklch(.58 ${p.c} ${p.h})` }} onClick={() => set({ accentH: p.h, accentC: p.c })}>{accentH === p.h && <Check size={16} />}</button>)}</div>
    <div className="palette-demo-bottom"><code>--accent</code><span>Applied across the entire system</span></div>
  </div>;
}

/* ------------------------------- Hero editor ------------------------------- */

const HERO_IMPORTS = `import { FancyButton } from "./ui/Button";
import { Input } from "./ui/Form";
import { Switch } from "./ui/Form";
import { Chip } from "./ui/Display";`;

const HERO_CODE = `function Example() {
  const [plan, setPlan] = React.useState(false);

  return (
    <div style={{ width: "100%", maxWidth: 340, textAlign: "left" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          padding: 22,
          border: "1px solid var(--border)",
          borderRadius: "calc(14px * var(--radius-scale))",
          background: "var(--surface)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Chip tone="accent" variant="soft" dot size="sm">Public beta</Chip>
        </div>
        <div style={{ textAlign: "center" }}>
          <h3 style={{ fontSize: 20, fontWeight: 600, letterSpacing: -0.5 }}>Your workspace</h3>
          <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
            Create a workspace and start building.
          </p>
        </div>
        <Input
          size="md"
          label="Workspace name"
          placeholder="Acme, Inc."
          defaultValue="Acme"
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 13, color: "var(--muted)" }}>
            Annual billing
          </span>
          <Switch size="sm" checked={plan} onChange={setPlan} />
        </div>
        <FancyButton tone="accent" size="lg" fullWidth>
          Create workspace
        </FancyButton>
      </div>
    </div>
  );
}`;

const HERO_SCOPE = { Button, FancyButton, Input, Switch, Chip };

function HeroEditor() {
  const [view, setView] = useState<"preview" | "code">("preview");
  const [resetKey, setResetKey] = useState(0);
  const { copy, copied } = useCopy();
  const copySource = `import React from "react";\n${HERO_IMPORTS}\n\nexport default ${HERO_CODE}`;
  return (
    <div className="hero-editor" aria-label="Interactive hero editor">
      <div className="hero-editor-toolbar">
        <span className="hero-editor-filename"><Layers size={13} /> workspace-card.tsx</span>
        <div className="hero-editor-actions">
          <span className="hero-editor-tabs" role="tablist" aria-label="Hero editor view">
            <button role="tab" aria-selected={view === "preview"} onClick={() => setView("preview")}><Eye size={13} /> Preview</button>
            <button role="tab" aria-selected={view === "code"} onClick={() => setView("code")}><Code2 size={13} /> Code</button>
          </span>
          <button className="hero-editor-iconbtn" title="Reset example" aria-label="Reset example" onClick={() => setResetKey((n) => n + 1)}><RotateCcw size={13} /></button>
          <button className="hero-editor-iconbtn" title={copied ? "Copied" : "Copy source"} aria-label={copied ? "Copied" : "Copy source"} onClick={() => copy(copySource)}>{copied ? <Check size={13} /> : <Copy size={13} />}</button>
        </div>
      </div>
      <LiveProvider code={HERO_CODE} scope={HERO_SCOPE} language="jsx" noInline={false}>
        <div className="hero-editor-body">
          {view === "preview" ? (
            <div className="hero-editor-preview"><LivePreview key={resetKey} /></div>
          ) : (
            <LiveEditor key={`code-${resetKey}`} className="hero-editor-source" aria-label="Edit the workspace card example" />
          )}
        </div>
        <div aria-live="polite"><LiveError className="hero-editor-error" /></div>
      </LiveProvider>
      <div className="hero-editor-footer">
        <span><span className="beta-status-dot" /> Live React — edit the code and watch it render</span>
        <span>React 19 · Tailwind CSS v4 · TypeScript</span>
      </div>
    </div>
  );
}

/* ------------------------------ Coverage strip ----------------------------- */

const COVERAGE = [
  { icon: Layers, label: `${COMPONENT_COUNT} docs pages`, note: "Components" },
  { icon: Blocks, label: `${BLOCKS.length} blocks`, note: "Composed examples" },
  { icon: Ruler, label: "7 foundations", note: "Color to motion" },
  { icon: Sun, label: "Light & dark", note: "One token graph" },
  { icon: Sparkles, label: "Theme Studio", note: "Brand your own" },
  { icon: ShieldCheck, label: "Keyboard first", note: "ARIA + focus" },
];

function CoverageStrip() {
  return (
    <div className="coverage-strip" role="list" aria-label="What the system covers">
      {COVERAGE.map((c) => (
        <div className="coverage-cell" role="listitem" key={c.label}>
          <c.icon size={18} aria-hidden />
          <span>
            <strong>{c.label}</strong>
            <em>{c.note}</em>
          </span>
        </div>
      ))}
    </div>
  );
}

/* ----------------------------- Component directory -------------------------- */

function HomeDirectory({ navigate }: { navigate: (to: string) => void }) {
  const [group, setGroup] = useState(COMPONENT_GROUPS[0].title);
  const active = COMPONENT_GROUPS.find((g) => g.title === group) ?? COMPONENT_GROUPS[0];
  const items = active.items.slice(0, 8);
  return (
    <section className="home-section home-container" aria-label="Component directory">
      <div className="home-section-heading">
        <div>
          <span className="section-number">Library, at real size</span>
          <h2>Every component.<br />A working preview.</h2>
        </div>
        <div>
          <p>No scaled-down screenshots. Each tile renders the actual component at native size — filter by category, then open a page for the API and editable examples.</p>
          <a href="#/components" className="text-action">Browse the full library <ArrowRight size={16} /></a>
        </div>
      </div>
      <div className="directory-tabs" role="tablist" aria-label="Component categories">
        {COMPONENT_GROUPS.map((g) => (
          <button key={g.title} role="tab" aria-selected={group === g.title} onClick={() => setGroup(g.title)}>
            {g.title}
            <span>{g.items.length}</span>
          </button>
        ))}
      </div>
      <div className="directory-grid" role="tabpanel" aria-label={`${active.title} components`}>
        {items.map((it) => (
          <a key={it.href} href={`#/${it.href}`} onClick={(e) => { e.preventDefault(); navigate(it.href); }} className="directory-tile">
            <span className="directory-tile-stage" inert aria-hidden="true">{PREVIEWS[it.href]?.() ?? <span className="text-paragraph-xs text-subtle">Open the interactive example</span>}</span>
            <span className="directory-tile-label">{it.title}<ArrowRight size={14} /></span>
          </a>
        ))}
      </div>
      <div className="directory-more">
        <Button size="sm" variant="outline" tone="default" endContent={<ArrowRight />} onClick={() => navigate("components")}>See all {COMPONENT_COUNT} components</Button>
      </div>
    </section>
  );
}

function WorkspaceShowcase() {
  const [view, setView] = useState("preview");
  const [revision, setRevision] = useState(0);
  const { copied, copy } = useCopy();
  return <section className="workspace-showcase" aria-label="Interactive component collection">
    <div className="workspace-toolbar"><div className="preview-tabs" role="tablist" aria-label="Workspace preview"><button role="tab" aria-selected={view === "preview"} onClick={() => setView("preview")}><Eye size={14} /> Components in use</button><button role="tab" aria-selected={view === "code"} onClick={() => setView("code")}><Code2 size={14} /> Auth source</button></div><div className="workspace-toolbar-actions"><span>Try the controls</span><button className="studio-icon-button" aria-label="Reset component examples" title="Reset examples" onClick={() => setRevision((r) => r + 1)}><RotateCcw size={14} /></button><button className="studio-icon-button" aria-label={copied ? "Source copied" : "Copy authentication source"} onClick={() => copy(getBlockSource("auth"))}>{copied ? <Check size={14} /> : <Copy size={14} />}</button></div></div>
    {view === "code" ? <CodeBlock code={getBlockSource("auth")} filename="blocks/AuthCardBlock.tsx" maxHeight={580} /> : <div key={revision} className="workspace-grid page-enter">
      <div className="workspace-column"><AuthCardBlock /></div>
      <div className="workspace-column"><ActionsDemo /><PreferenceDemo /></div>
      <div className="workspace-column"><TeamDemo /><ThemeDemo /></div>
    </div>}
    <div className="workspace-caption"><span className="beta-status-dot" /><span>Real components, shared tokens. No scaled screenshots.</span><span>React + TypeScript + Tailwind CSS</span></div>
  </section>;
}

export default function Home({ navigate }: { navigate: (to: string) => void }) {
  return <main id="main" tabIndex={-1} className="home-page">
    <section className="home-hero page-enter">
      <p className="home-eyebrow">The design system for considered interfaces</p>
      <h1>Every detail.<br />One system<span>.</span></h1>
      <p className="home-intro">Thoughtful React components, useful patterns, and the foundations that bring them together — with a live editor, not screenshots. All free during public beta.</p>
      <div className="home-hero-actions"><Button size="lg" tone="default" endContent={<ArrowRight />} onClick={() => navigate("components")}>Explore components</Button><Button size="lg" variant="outline" tone="default" onClick={() => navigate("theme")}>Open Theme Studio</Button></div>
    </section>

    <div className="home-container"><div className="hero-showcase page-enter"><HeroEditor /></div><CoverageStrip /></div>

    <HomeDirectory navigate={navigate} />

    <div className="home-container"><WorkspaceShowcase /></div>

    <section className="home-section home-container">
      <div className="home-section-heading"><div><span className="section-number">01 / Blocks</span><h2>Less assembling.<br />More creating.</h2></div><div><p>{COMPONENT_COUNT} documented component pages and {BLOCKS.length} composed examples. Consistent sizing, shared states, and source you can inspect.</p><a href="#/blocks" className="text-action">Explore the blocks <ArrowRight size={16} /></a></div></div>
      <div className="library-category-grid">
        {COMPONENT_GROUPS.slice(0, 6).map((group, i) => <a href={`#/${group.items[0].href}`} key={group.title} className="library-category">
          <span className="category-index">{String(i + 1).padStart(2, "0")}</span><h3>{group.title}</h3><p>{group.items.slice(0, 3).map((it) => it.title).join(", ")}</p><div><span>{group.items.length} component pages</span><ArrowRight size={15} /></div>
        </a>)}
      </div>
    </section>

    <section className="home-section home-container">
      <div className="home-section-heading"><div><span className="section-number">02 / Foundations</span><h2>Consistency starts<br />below the surface.</h2></div><p>Intentional spacing. A useful radius scale. Color that follows your brand. The small decisions, made once.</p></div>
      <div className="foundation-link-grid">
        <a href="#/foundations/spacing" className="foundation-link"><div className="foundation-link-art spacing-art" aria-hidden>{[8,16,24,32,48,64].map((n) => <span key={n} style={{ height: n }} />)}</div><h3>Spacing & layout <ArrowRight size={16} /></h3><p>A rhythm for your entire interface.</p></a>
        <a href="#/foundations/elevation" className="foundation-link"><div className="foundation-link-art radius-art" aria-hidden>{[4,12,24].map((n) => <span key={n} style={{ borderRadius: n }} />)}</div><h3>Radius & elevation <ArrowRight size={16} /></h3><p>Character without the visual noise.</p></a>
        <a href="#/foundations/color" className="foundation-link"><div className="foundation-link-art color-art" aria-hidden>{[100,200,400,600,800].map((n) => <span key={n} style={{ background: `var(--accent-${n})` }} />)}</div><h3>Color system <ArrowRight size={16} /></h3><p>Semantic by default. Yours by design.</p></a>
      </div>
    </section>

    <section className="home-section home-container">
      <div className="home-section-heading"><div><span className="section-number">03 / Visual language</span><h2>The primitives.<br />All in one place.</h2></div><p>Buttons, chips, badges, inputs, and the interactions that bind them. One visual vocabulary across every surface.</p></div>
      <div className="visual-language-grid">
        <div className="visual-language-panel">
          <p className="visual-language-label">Actions</p>
          <div className="visual-language-items">
            <Button size="sm">Primary</Button>
            <Button size="sm" variant="soft">Soft</Button>
            <Button size="sm" variant="outline" tone="default">Stroke</Button>
            <Button size="sm" variant="ghost" tone="default">Ghost</Button>
            <Button size="sm" tone="danger">Danger</Button>
          </div>
        </div>
        <div className="visual-language-panel">
          <p className="visual-language-label">Status</p>
          <div className="visual-language-items">
            <Chip tone="success" variant="soft" dot>Active</Chip>
            <Chip tone="warning" variant="soft" dot>In review</Chip>
            <Chip variant="outline" dot>Draft</Chip>
            <Chip tone="danger" variant="soft">Overdue</Chip>
          </div>
        </div>
        <div className="visual-language-panel">
          <p className="visual-language-label">Inputs</p>
          <div className="visual-language-items" style={{ maxWidth: 200 }}>
            <Input size="sm" placeholder="Workspace name" wrapperClassName="w-full" />
            <div className="flex items-center gap-2"><Switch checked onChange={() => {}} size="sm" /><span className="text-paragraph-xs text-muted">Enable</span></div>
          </div>
        </div>
        <div className="visual-language-panel">
          <p className="visual-language-label">Data</p>
          <div className="visual-language-items" style={{ maxWidth: 200 }}>
            <div className="flex items-center gap-2.5"><Avatar name="Alex" size="sm" tone="accent" /><div className="min-w-0"><p className="text-label-xs text-foreground truncate">Alex Morgan</p><p className="text-[10px] text-subtle">Product Design</p></div></div>
            <div className="flex items-center gap-2.5"><Avatar name="B" size="xs" tone="success" square /><span className="text-paragraph-xs text-subtle">Payment Card</span></div>
          </div>
        </div>
        <div className="visual-language-panel">
          <p className="visual-language-label">Navigation</p>
          <div className="visual-language-items">
            <Tabs size="sm" variant="segment" value="tab1" onChange={noop} items={[{ key: "tab1", label: "Overview" }, { key: "tab2", label: "Activity" }]} />
            <Breadcrumbs items={[{ label: "Home", href: "#" }, { label: "Settings", href: "#" }, { label: "General" }]} />
          </div>
        </div>
        <div className="visual-language-panel">
          <p className="visual-language-label">Feedback</p>
          <div className="visual-language-items">
            <Progress value={64} size="sm" />
            <Snippet className="w-full py-1.5 text-paragraph-xs">npm install @aperture/react</Snippet>
          </div>
        </div>
      </div>
      <div className="visual-language-footer">
        <p>{COMPONENT_COUNT} components, {BLOCKS.length} blocks, and product patterns — all sharing the same tokens.</p>
        <div className="flex gap-2"><Button size="sm" variant="outline" tone="default" onClick={() => navigate("patterns")} endContent={<ArrowRight />}>Product patterns</Button><Button size="sm" variant="ghost" tone="default" onClick={() => navigate("components")}>All components</Button></div>
      </div>
    </section>

    <section className="home-section home-faq-section"><div className="home-container home-faq-grid"><div><span className="section-number">A few good questions</span><h2>Clear from<br />the start.</h2><p>We are building in public. Here is what is available today.</p></div><Accordion variant="flush" multiple items={[
      { key: "free", title: "Is everything really free in beta?", content: "Yes. All components and block examples currently included in this app are unlocked. No checkout, credit card, or account is needed to explore them." },
      { key: "source", title: "Can I use the component source?", content: "The source tabs show the actual local implementations. Start with the installation guide, copy the component and its supporting files, and adapt it to your project." },
      { key: "stack", title: "What is the supported stack?", content: "This preview uses React 19, TypeScript, and Tailwind CSS v4. CSS variables power the themes. Vue and Svelte component adapters are not included." },
      { key: "figma", title: "Is a Figma library available?", content: "A downloadable Figma library is not part of this preview. The live foundations pages are the current reference for color, spacing, typography, and shape." },
      { key: "production", title: "Is the beta production certified?", content: "Not yet. Please evaluate keyboard support, responsive behavior, and color contrast in the context of your own application. The beta is for testing and refinement, not a claim of accessibility certification." },
    ]} /></div></section>
    <SiteFooter navigate={navigate} />
  </main>;
}

export function SiteFooter({ navigate }: { navigate: (to: string) => void }) {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);
  const saveFeedback = () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify({ message: note, route: window.location.hash, viewport: `${window.innerWidth}x${window.innerHeight}`, createdAt: new Date().toISOString() }, null, 2)], { type: "application/json" }));
    const link = document.createElement("a"); link.href = url; link.download = "aperture-beta-feedback.json"; link.click(); window.setTimeout(() => URL.revokeObjectURL(url), 1000); setSaved(true);
  };
  return <footer className="site-footer">
    <div className="home-container">
      <div className="footer-top"><div><a href="#/" className="brand-link"><Logo size={28} /><span>Aperture<span className="brand-period">.</span></span></a><p>Good interfaces are built on good foundations.</p></div><div className="footer-links"><button onClick={() => navigate("components")}>Components</button><button onClick={() => navigate("blocks")}>Blocks</button><button onClick={() => navigate("docs/installation")}>Documentation</button><button onClick={() => { setSaved(false); setFeedbackOpen(true); }}>Leave feedback</button></div></div>
      <div className="footer-bottom"><span>Aperture Design System</span><span><span className="beta-status-dot" /> Public beta. Free to explore.</span></div>
    </div>
    <Modal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} title="Help refine the details" description="Describe a layout or interaction issue. Save a report locally to share with your team; no data is sent to a server." footer={<><Button variant="outline" tone="default" onClick={() => setFeedbackOpen(false)}>Close</Button><Button disabled={!note.trim()} onClick={saveFeedback}>{saved ? "Save again" : "Save feedback report"}</Button></>}>
      <label className="feedback-label" htmlFor="beta-feedback">Your feedback</label><textarea id="beta-feedback" className="feedback-textarea" rows={5} placeholder="What happened, and what did you expect?" value={note} onChange={(e) => { setNote(e.target.value); setSaved(false); }} />
      {saved && <p role="status" className="feedback-confirmation"><ShieldCheck size={16} /> Report downloaded. Thank you for testing.</p>}
    </Modal>
  </footer>;
}
