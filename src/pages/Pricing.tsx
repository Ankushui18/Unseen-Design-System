import { Button } from "../ui/Button";
import { Accordion } from "../ui/Navigation";
import { COMPONENT_GROUPS } from "../docs/nav";
import { BLOCKS } from "../blocks";
import { SiteFooter } from "./Home";
import { RiArrowRightLine, RiCheckLine, RiCodeSSlashLine, RiPaletteLine, RiStackLine } from "@remixicon/react";

export function PricingPage({ navigate }: { navigate: (to: string) => void }) {
  const count = COMPONENT_GROUPS.reduce((n, g) => n + g.items.length, 0);
  return <main id="main" tabIndex={-1} className="beta-page">
    <div className="home-container">
      <header className="beta-page-heading page-enter"><span className="beta-page-label"><span className="beta-status-dot" /> Public beta</span><h1>Everything here.<br />Free to explore.</h1><p>We are refining Unseen in public. Try the components, test the interactions, and help us get the details right before a paid launch.</p><Button size="lg" tone="default" onClick={() => navigate("components")} endContent={<RiArrowRightLine />}>Explore the library</Button></header>
      <div className="beta-access-list">
        {[{ icon: RiCodeSSlashLine, title: `${count} component documentation pages`, description: "Examples, API references, and an editable React playground.", href: "components" }, { icon: RiStackLine, title: `${BLOCKS.length} composed block examples`, description: "Actual-size previews and copyable implementation source.", href: "blocks" }, { icon: RiPaletteLine, title: "Foundations & token reference", description: "OKLCH color, type, radii and elevation — every variable documented.", href: "foundations/tokens" }].map((item) => <a href={`#/${item.href}`} key={item.href}><item.icon size={20} /><div><h2>{item.title}</h2><p>{item.description}</p></div><RiCheckLine size={17} /></a>)}
      </div>
      <section className="beta-page-faq"><h2>No surprises.</h2><Accordion variant="flush" items={[
        { key: "price", title: "Is there a payment or sign-up requirement?", content: "No. Every component, source example, and block currently included in this preview is accessible without payment or account creation." },
        { key: "future", title: "Will Unseen become paid?", content: "The core components will always remain 100% free and open-source under the MIT license. Pro block expansions and sectoral flows are included free during the public beta." },
        { key: "included", title: "Are templates and Figma assets included?", content: "Yes! 5 full sectoral templates (AI, HR, Finance, Marketing, Crypto) and OKLCH token foundations are available to inspect and copy." },
        { key: "feedback", title: "How can I report an issue?", content: "Use Leave feedback in the footer to create a local issue report. You can download it and share it with the team. The preview does not send reports or email addresses to a server." },
      ]} /></section>
    </div>
    <SiteFooter navigate={navigate} />
  </main>;
}