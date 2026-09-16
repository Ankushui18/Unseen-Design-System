import { useState } from "react";
import { ArrowRight, Bell, Check, Code2, Copy, Eye, Mail, Palette, Plus, RotateCcw, Settings2, ShieldCheck } from "lucide-react";
import { Button } from "../ui/Button";
import { Avatar, Chip } from "../ui/Display";
import { Input, Switch } from "../ui/Form";
import { Accordion } from "../ui/Navigation";
import { Modal, useToast } from "../ui/Overlay";
import { AuthCardBlock, BLOCKS } from "../blocks";
import { Logo } from "../docs/Shell";
import { CodeBlock } from "../docs/CodeBlock";
import { LivePlayground } from "../docs/LivePlayground";
import { COMPONENT_GROUPS } from "../docs/nav";
import { ACCENT_PRESETS, useTheme } from "../lib/theme";
import { useCopy } from "../lib/hooks";
import { getBlockSource } from "../docs/block-source";

const COMPONENT_COUNT = COMPONENT_GROUPS.reduce((count, group) => count + group.items.length, 0);

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
      <h1>Aperture<span>.</span></h1>
      <p className="home-tagline">Every detail. One system.</p>
      <p className="home-intro">Thoughtful React components, useful patterns, and the foundations that bring them together. All free during public beta.</p>
      <div className="home-hero-actions"><Button size="lg" tone="default" endContent={<ArrowRight />} onClick={() => navigate("components")}>Explore components</Button><Button size="lg" variant="outline" tone="default" onClick={() => navigate("theme")}>Open Theme Studio</Button></div>
    </section>

    <div className="home-container"><WorkspaceShowcase /></div>

    <section className="home-section home-container">
      <div className="home-section-heading"><div><span className="section-number">01 / Library</span><h2>Less assembling.<br />More creating.</h2></div><div><p>{COMPONENT_COUNT} documented component pages and {BLOCKS.length} composed examples. Consistent sizing, shared states, and source you can inspect.</p><a href="#/components" className="text-action">Explore the library <ArrowRight size={16} /></a></div></div>
      <div className="library-category-grid">
        {COMPONENT_GROUPS.slice(0, 6).map((group, i) => <a href={`#/${group.items[0].href}`} key={group.title} className="library-category">
          <span className="category-index">{String(i + 1).padStart(2, "0")}</span><h3>{group.title}</h3><p>{group.items.slice(0, 3).map((it) => it.title).join(", ")}</p><div><span>{group.items.length} component pages</span><ArrowRight size={15} /></div>
        </a>)}
      </div>
    </section>

    <section className="home-section home-editor-section">
      <div className="home-container">
        <div className="home-section-heading"><div><span className="section-number">02 / Playground</span><h2>Change the code.<br />See the difference.</h2></div><p>Not a picture of a component. Edit the JSX, try its states, and copy the example into your project.</p></div>
        <LivePlayground />
      </div>
    </section>

    <section className="home-section home-container">
      <div className="home-section-heading"><div><span className="section-number">03 / Foundations</span><h2>Consistency starts<br />below the surface.</h2></div><p>Intentional spacing. A useful radius scale. Color that follows your brand. The small decisions, made once.</p></div>
      <div className="foundation-link-grid">
        <a href="#/foundations/spacing" className="foundation-link"><div className="foundation-link-art spacing-art" aria-hidden>{[8,16,24,32,48,64].map((n) => <span key={n} style={{ height: n }} />)}</div><h3>Spacing & layout <ArrowRight size={16} /></h3><p>A rhythm for your entire interface.</p></a>
        <a href="#/foundations/elevation" className="foundation-link"><div className="foundation-link-art radius-art" aria-hidden>{[4,12,24].map((n) => <span key={n} style={{ borderRadius: n }} />)}</div><h3>Radius & elevation <ArrowRight size={16} /></h3><p>Character without the visual noise.</p></a>
        <a href="#/foundations/color" className="foundation-link"><div className="foundation-link-art color-art" aria-hidden>{[100,200,400,600,800].map((n) => <span key={n} style={{ background: `var(--accent-${n})` }} />)}</div><h3>Color system <ArrowRight size={16} /></h3><p>Semantic by default. Yours by design.</p></a>
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