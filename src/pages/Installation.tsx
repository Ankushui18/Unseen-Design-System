import { PageHeader, Section } from "../docs/Blocks";
import { CodeBlock } from "../docs/CodeBlock";
import { Button } from "../ui/Button";
import { Snippet } from "../ui/Display";
import { cn } from "../utils/cn";
import { RiArrowRightLine, RiDownloadLine } from "@remixicon/react";

// Eager raw imports provide a real, offline source export for the public beta.
const source = import.meta.glob<string>(["../ui/*.{ts,tsx}", "../lib/*.{ts,tsx}", "../utils/*.ts", "../styles/*.css", "../index.css"], { query: "?raw", import: "default", eager: true });

export function InstallationPage({ navigate }: { navigate: (to: string) => void }) {
  const download = () => {
    const files = Object.fromEntries(Object.entries(source).map(([name, content]) => [`src/${name.replace(/^\.\.\//, "")}`, content]));
    const data = { description: "Unseen public-beta source files. Recreate these paths in a React + Tailwind v4 project.", files };
    const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
    const a = document.createElement("a"); a.href = url; a.download = "aperture-source.json"; a.click(); window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return <>
    <PageHeader title="Start building" description="This beta is source-first. Use the local React components, their supporting utilities, and the token stylesheet in your own project." tags={["React 19", "TypeScript", "Tailwind CSS v4"]} />
    <Section title="1. Get the source" description="Download the current source as a JSON file map, or copy an individual block from its Source tab. Preserve the directory structure so relative imports resolve.">
      <div className="installation-download"><div><h3>Source available in this build</h3><p>Components, theme provider, hooks, utilities, and CSS.</p></div><Button variant="outline" tone="default" startContent={<RiDownloadLine />} onClick={download}>Download source map</Button></div>
      <p className="text-paragraph-sm text-muted">An installable <code className="font-mono">@aperture/react</code> package is not part of this preview. The examples below use the actual local exports.</p>
    </Section>
    <Section title="2. Install dependencies" description="Start with a React + TypeScript project and configure Tailwind CSS v4 for your build tool. The shared components use these dependencies:">
      <Snippet>npm install @remixicon/react clsx tailwind-merge</Snippet>
      <CodeBlock filename="src/index.css" language="css" code={`@import "tailwindcss";
/* Use the supplied token stylesheet, including its @theme bridge. */

:root {
  --accent-h: 265;
  --accent-c: 0.225;
  --radius-scale: 1;
}`} />
      <p className="text-paragraph-sm text-muted">The class-merging helper in <code className="font-mono">src/utils/cn.ts</code> is part of the system. It registers the custom font-size names so color utilities do not replace them.</p>
    </Section>
    <Section title="3. Add the providers" description="ToastProvider hosts notification previews. Add the `dark` class to a root element to switch themes — every token derives from CSS variables.">
      <CodeBlock filename="src/App.tsx" code={`import { ToastProvider } from "./ui/Overlay";
import { Button } from "./ui/Button";
import "./index.css";

export default function App() {
  return (
    <ToastProvider>
      <main className="p-8">
        <Button onClick={() => console.log("Hello")}>Start a project</Button>
      </main>
    </ToastProvider>
  );
}`} />
    </Section>
    <Section title="Check the contract" description="The helper must preserve a typography token and a text color together. This preview displays the merged class string from the actual implementation.">
      <CodeBlock filename="cn.ts / example" code={`cn("text-label-sm", "text-foreground")
// Result: ${cn("text-label-sm", "text-foreground")}`} />
      <div className="flex flex-wrap gap-3"><Button onClick={() => navigate("components/button")} endContent={<RiArrowRightLine />}>Try a component</Button><Button variant="outline" tone="default" onClick={() => navigate("foundations/tokens")}>Read the token reference</Button></div>
    </Section>
  </>;
}