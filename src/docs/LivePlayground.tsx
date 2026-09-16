import { useState } from "react";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import { Button, FancyButton } from "../ui/Button";
import { Chip } from "../ui/Display";
import { Input, Switch } from "../ui/Form";
import { useCopy } from "../lib/hooks";
import { RiCheckLine, RiCodeSSlashLine, RiFileCopyLine, RiRestartLine } from "@remixicon/react";

const EXAMPLES = {
  button: {
    label: "Button",
    imports: 'import { Button, FancyButton } from "./ui/Button";',
    code: `function Example() {
  const [saved, setSaved] = React.useState(false);

  return (
    <FancyButton
      tone="accent"
      size="md"
      onClick={() => setSaved(!saved)}
    >
      {saved ? "Changes saved" : "Save changes"}
    </FancyButton>
  );
}`,
  },
  switch: {
    label: "Switch",
    imports: 'import { Switch } from "./ui/Form";',
    code: `function Example() {
  const [enabled, setEnabled] = React.useState(true);

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      label="Email notifications"
      description="Only the updates that matter."
    />
  );
}`,
  },
  input: {
    label: "Input",
    imports: 'import { Input } from "./ui/Form";',
    code: `function Example() {
  return (
    <div style={{ width: 280, maxWidth: "100%" }}>
      <Input
        label="Workspace name"
        placeholder="Your next great project"
        description="You can change this later."
      />
    </div>
  );
}`,
  },
  badge: {
    label: "Badge",
    imports: 'import { Chip } from "./ui/Display";',
    code: `function Example() {
  return (
    <Chip tone="success" variant="soft" dot>
      Ready to deploy
    </Chip>
  );
}`,
  },
};

const SCOPE = { Button, FancyButton, Chip, Input, Switch };
const EDITOR_THEME = {
  plain: { color: "#d8e2f0", backgroundColor: "#141922" },
  styles: [
    { types: ["comment", "prolog"], style: { color: "#8492a5" } },
    { types: ["keyword", "boolean"], style: { color: "#c9a7f3" } },
    { types: ["string", "attr-value"], style: { color: "#9cdcac" } },
    { types: ["function", "tag"], style: { color: "#8fc4ed" } },
    { types: ["number"], style: { color: "#f4c898" } },
    { types: ["punctuation"], style: { color: "#98a5b7" } },
  ],
};

export function LivePlayground() {
  const [example, setExample] = useState<keyof typeof EXAMPLES>("button");
  const [code, setCode] = useState(EXAMPLES.button.code);
  const [resetKey, setResetKey] = useState(0);
  const { copy, copied } = useCopy();
  const copySource = `import React from "react";\n${EXAMPLES[example].imports}\n\nexport default ${code}`;
  const reset = () => { setCode(EXAMPLES[example].code); setResetKey((key) => key + 1); };

  return <div className="live-playground">
    <div className="live-playground-toolbar">
      <div className="live-example-tabs" role="tablist" aria-label="Editable example">
        {(Object.keys(EXAMPLES) as (keyof typeof EXAMPLES)[]).map((key) => <button key={key} role="tab" aria-selected={example === key} onClick={() => { setExample(key); setCode(EXAMPLES[key].code); setResetKey((n) => n + 1); }}>{EXAMPLES[key].label}</button>)}
      </div>
      <span className="live-playground-note"><span className="beta-status-dot" /> Editable React</span>
    </div>
    <LiveProvider code={code} scope={SCOPE} theme={EDITOR_THEME} language="jsx">
      <div className="live-playground-grid">
        <div className="live-preview-side">
          <span className="live-pane-label">Live preview</span>
          <LivePreview key={resetKey} className="live-preview-content" />
          <p>Change a prop in the editor. The preview updates as you type.</p>
        </div>
        <div className="live-editor-side">
          <div className="code-panel-header"><span><RiCodeSSlashLine size={14} /> Example.jsx</span><div className="live-editor-actions"><button className="code-copy" onClick={reset} aria-label="Reset code"><RiRestartLine size={12} /> Reset</button><button className="code-copy" onClick={() => copy(copySource)}>{copied ? <RiCheckLine size={12} /> : <RiFileCopyLine size={12} />}{copied ? "Copied" : "Copy code"}</button></div></div>
          <LiveEditor key={`${example}-${resetKey}`} onChange={setCode} className="live-code-editor" aria-label="Edit the React example" tabMode="focus" />
          <div aria-live="polite"><LiveError className="live-code-error" /></div>
        </div>
      </div>
    </LiveProvider>
  </div>;
}