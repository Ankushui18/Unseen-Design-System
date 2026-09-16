import { Fragment, useMemo, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { useCopy } from "../lib/hooks";
import { RiCheckLine, RiFileCopyLine, RiTerminalLine } from "@remixicon/react";

const KEYWORDS =
  "import|from|export|default|const|let|var|function|return|if|else|for|while|new|class|extends|async|await|type|interface|as|of|in|true|false|null|undefined|this|typeof|satisfies";

const TOKEN = new RegExp(
  [
    "(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)", // 1 comment
    "(\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*'|`(?:[^`\\\\]|\\\\.)*`)", // 2 string
    `\\b(${KEYWORDS})\\b`, // 3 keyword
    "(<\\/?[A-Z][\\w.]*|<\\/?[a-z][\\w-]*)", // 4 tag
    "\\b(\\d+(?:\\.\\d+)?)\\b", // 5 number
    "([A-Za-z_$][\\w$-]*)(?=\\s*=)", // 6 attribute
    "([{}()\\[\\]<>/=;:,.+\\-*!?&|]+)", // 7 punctuation
  ].join("|"),
  "g",
);

const CLS = [
  "",
  "text-[var(--syn-comment)] italic",
  "text-[var(--syn-string)]",
  "text-[var(--syn-keyword)] font-medium",
  "text-[var(--syn-tag)]",
  "text-[var(--syn-number)]",
  "text-[var(--syn-attr)]",
  "text-[var(--syn-punct)]",
];

function highlight(code: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  TOKEN.lastIndex = 0;
  let k = 0;
  while ((m = TOKEN.exec(code))) {
    if (m.index > last) out.push(<Fragment key={k++}>{code.slice(last, m.index)}</Fragment>);
    let gi = 0;
    for (let i = 1; i <= 7; i++) if (m[i] !== undefined) { gi = i; break; }
    out.push(
      <span key={k++} className={CLS[gi]}>
        {m[0]}
      </span>,
    );
    last = m.index + m[0].length;
  }
  if (last < code.length) out.push(<Fragment key={k++}>{code.slice(last)}</Fragment>);
  return out;
}

export function CodeBlock({
  code,
  language = "tsx",
  filename,
  showLineNumbers = true,
  className,
  maxHeight,
}: {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  className?: string;
  maxHeight?: number;
}) {
  const { copied, copy, copyError } = useCopy();
  const trimmed = code.trim();
  const lines = useMemo(() => trimmed.split("\n"), [trimmed]);

  return (
    <div className={cn("code-panel", className)}>
      {(filename || language) && (
        <div className="code-panel-header">
          <span>
            <RiTerminalLine className="h-3.5 w-3.5" />
            <span className="font-mono">{filename ?? language}</span>
          </span>
          <button
            onClick={() => copy(trimmed)}
            type="button"
            className="code-copy"
            aria-label={copied ? "Code copied" : "Copy code"}
          >
            {copied ? <RiCheckLine className="h-3 w-3 text-success" /> : <RiFileCopyLine className="h-3 w-3" />}
            {copied ? "Copied" : copyError ? "Select to copy" : "Copy code"}
          </button>
        </div>
      )}
      <div className="code-body ds-scroll" style={{ maxHeight }}>
        <pre>
          <code>
            {showLineNumbers
              ? lines.map((ln, i) => (
                  <span key={i} className="code-line">
                    <span className="code-line-number" aria-hidden="true">{i + 1}</span>
                    <span>{highlight(ln)}</span>
                  </span>
                ))
              : highlight(trimmed)}
          </code>
        </pre>
      </div>
    </div>
  );
}
