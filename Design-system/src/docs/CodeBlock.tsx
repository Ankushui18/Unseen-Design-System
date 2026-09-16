import { Fragment, useMemo, type ReactNode } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { cn } from "../utils/cn";
import { useCopy } from "../lib/hooks";

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

export function highlight(code: string): ReactNode[] {
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
  showLineNumbers,
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
  const { copied, copy } = useCopy();
  const trimmed = code.trim();
  const lines = useMemo(() => trimmed.split("\n"), [trimmed]);

  return (
    <div className={cn("dark group relative overflow-hidden rounded-2xl bg-background text-foreground ring-1 ring-border", className)}>
      {(filename || language) && (
        <div className="flex items-center justify-between border-b border-separator bg-background-secondary px-3.5 py-2">
          <div className="flex items-center gap-2 text-[11px] font-medium text-muted">
            <Terminal className="h-3.5 w-3.5" />
            <span className="font-mono">{filename ?? language}</span>
          </div>
          <button
            onClick={() => copy(trimmed)}
            className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium text-subtle transition hover:bg-surface-hover hover:text-foreground"
          >
            {copied ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
      <div className="ds-scroll overflow-auto" style={{ maxHeight }}>
        <pre className="p-4 font-mono text-paragraph-xs leading-[1.75]">
          <code>
            {showLineNumbers
              ? lines.map((ln, i) => (
                  <div key={i} className="table-row">
                    <span className="table-cell pr-4 text-right text-[11px] select-none text-subtle/70">{i + 1}</span>
                    <span className="table-cell whitespace-pre">{highlight(ln)}</span>
                  </div>
                ))
              : highlight(trimmed)}
          </code>
        </pre>
      </div>
    </div>
  );
}
