#!/usr/bin/env node
/**
 * codemod-ref — give every single-root component a transparent `ref`.
 *
 * Context: 112 of 117 exports in src/ui had no ref at all, which blocks
 * consumer-side focus management, scroll handling and measurement, and is the
 * largest counted gap in COMPONENT-QUALITY-SPEC.md (M1.ref).
 *
 * React 19 makes `ref` an ordinary prop, so the honest fix is the modern idiom —
 * accept `ref` in the props type and hand it to the element the component
 * actually renders — rather than wrapping everything in forwardRef.
 *
 * The tool works on the TypeScript AST rather than with regexes, because the
 * shapes it must reason about (destructuring defaults containing `>`, type
 * literals containing braces, `.map()` callbacks containing their own returns)
 * are exactly where regexes fail silently.
 *
 * It only rewrites a component when all of the following hold:
 *   - it is an exported `function Name(...)` (not a const arrow, not forwardRef);
 *   - props are destructured and typed;
 *   - every return belonging to the component itself is either `return null`
 *     (a pure bail-out) or the single JSX return;
 *   - that JSX return is one intrinsic element with no `ref` already;
 *   - the props type can be extended losslessly (a type literal, or an
 *     intersection appended to a named/other type).
 *
 * Everything else is reported for a human instead of guessed at.
 *
 * Usage:
 *   node scripts/codemod-ref.mjs             dry run (report only)
 *   node scripts/codemod-ref.mjs --write     apply
 *   node scripts/codemod-ref.mjs --json      machine-readable report
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import ts from "typescript";

const ROOT = new URL("../", import.meta.url).pathname;
const UI = join(ROOT, "src/ui");
const WRITE = process.argv.includes("--write");
const JSON_OUT = process.argv.includes("--json");

/** Intrinsic element → the DOM interface its ref resolves to. */
const DOM_REF = {
  a: "HTMLAnchorElement", article: "HTMLElement", aside: "HTMLElement", button: "HTMLButtonElement",
  code: "HTMLElement", div: "HTMLDivElement", dl: "HTMLDListElement", fieldset: "HTMLFieldSetElement",
  footer: "HTMLElement", form: "HTMLFormElement", h1: "HTMLHeadingElement", h2: "HTMLHeadingElement",
  h3: "HTMLHeadingElement", h4: "HTMLHeadingElement", header: "HTMLElement", hr: "HTMLHRElement",
  input: "HTMLInputElement", kbd: "HTMLElement", label: "HTMLLabelElement", li: "HTMLLIElement",
  main: "HTMLElement", nav: "HTMLElement", ol: "HTMLOListElement", p: "HTMLParagraphElement",
  pre: "HTMLPreElement", section: "HTMLElement", select: "HTMLSelectElement", small: "HTMLElement",
  span: "HTMLSpanElement", strong: "HTMLElement", table: "HTMLTableElement", textarea: "HTMLTextAreaElement",
  time: "HTMLTimeElement", ul: "HTMLUListElement",
};

const report = { refactored: [], skipped: [] };

/** Peel `( … )` so `return (\n<div/>\n)` and `return <div/>` are the same node. */
const unwrap = (node) => (ts.isParenthesizedExpression(node) ? unwrap(node.expression) : node);

/** The `<div>`/`<span>` open tag of a JSX element, or the tag itself if self-closing. */
const openTagOf = (node) => (ts.isJsxElement(node) ? node.openingElement : node);

for (const file of readdirSync(UI).filter((f) => f.endsWith(".tsx")).sort()) {
  const path = join(UI, file);
  let src = readFileSync(path, "utf8");
  const sf = ts.createSourceFile(path, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let touched = false;

  /* Descending source order: every edit lands strictly after the components we
   * have not visited yet, so their offsets from `sf` stay valid. Processing in
   * document order would invalidate each later component as soon as an earlier
   * one changed length. */
  for (const stmt of [...sf.statements].reverse()) {
    if (!ts.isFunctionDeclaration(stmt) || !stmt.name) continue;
    const name = stmt.name.text;
    if (!/^[A-Z]/.test(name)) continue;
    if (!stmt.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)) continue;
    if (!stmt.body) continue;

    const skip = (why) => report.skipped.push({ file, name, why });
    const param = stmt.parameters[0];
    if (!param || !ts.isObjectBindingPattern(param.name)) { skip("props are not destructured"); continue; }
    const typeNode = param.type;
    if (!typeNode) { skip("props have no type annotation"); continue; }
    if (/\bref\??:/.test(typeNode.getText(sf)) || param.name.elements.some((e) => e.name.getText(sf) === "ref")) {
      skip("already accepts a ref");
      continue;
    }

    /* a component that already keeps its own `ref` binding (internal textarea,
     * scroll target, …) cannot also take one from props under the same name */
    if (/\b(?:const|let|var)\s+ref\b/.test(stmt.body.getText(sf))) {
      skip("declares its own internal `ref` binding");
      continue;
    }

    /* returns belonging to THIS function — nested callbacks are not ours */
    const returns = [];
    const visit = (node) => {
      if (ts.isFunctionLike(node)) return;
      if (ts.isReturnStatement(node)) returns.push(node);
      ts.forEachChild(node, visit);
    };
    ts.forEachChild(stmt.body, visit);

    const jsxReturns = returns.filter((r) => r.expression && /^Jsx/.test(ts.SyntaxKind[unwrap(r.expression).kind]));
    const bailOuts = returns.filter((r) => !jsxReturns.includes(r));
    const impureBail = bailOuts.find((r) => !r.expression || unwrap(r.expression).kind !== ts.SyntaxKind.NullKeyword);
    if (impureBail) {
      const text = impureBail.expression ? unwrap(impureBail.expression).getText(sf).slice(0, 34).replace(/\s+/g, " ") : "(bare return)";
      skip(`returns a non-null early value: ${text}`);
      continue;
    }
    if (jsxReturns.length === 0) { skip("renders nothing (portal or no JSX)"); continue; }
    if (jsxReturns.length > 1) { skip(`${jsxReturns.length} alternative JSX roots`); continue; }

    const expr = unwrap(jsxReturns[0].expression);
    if (ts.isJsxFragment(expr)) { skip("root is a fragment"); continue; }
    const openTag = openTagOf(expr);
    const tagName = openTag.tagName.getText(sf);
    if (!/^[a-z]/.test(tagName)) { skip(`root is a component (<${tagName}>)`); continue; }
    if (openTag.attributes.properties.some((a) => a.name?.getText(sf) === "ref")) { skip("root element already receives a ref"); continue; }
    const refType = DOM_REF[tagName];
    if (!refType) { skip(`unknown DOM interface for <${tagName}>`); continue; }

    /* ---- the three edits, as exact source ranges ---- */
    const edits = [];
    const propInsertAt = param.name.getStart(sf) + 1;
    const propGap = src.slice(propInsertAt, param.name.elements[0].getStart(sf));
    edits.push({
      at: propInsertAt,
      text: propGap.includes("\n") ? "\n  ref," : " ref,",
    });

    if (ts.isTypeLiteralNode(typeNode)) {
      const memberGap = src.slice(typeNode.members.pos, typeNode.members[0].getStart(sf));
      const indent = memberGap.includes("\n") ? (memberGap.match(/\n(\s*)/)?.[1] ?? "  ") : null;
      edits.push({
        at: typeNode.end - 1,
        text: indent ? `${indent}ref?: Ref<${refType}>;\n` : `; ref?: Ref<${refType}> `,
      });
    } else {
      edits.push({ at: typeNode.end, text: ` & { ref?: Ref<${refType}> }` });
    }

    edits.push({ at: openTag.tagName.end, text: " ref={ref}" });

    /* Apply straight away, back-to-front. The offsets were measured against the
     * source as it is right now; batching them across components while also
     * rewriting the react import would shift every later offset. */
    for (const e of edits.sort((a, b) => b.at - a.at)) src = src.slice(0, e.at) + e.text + src.slice(e.at);
    touched = true;
    report.refactored.push({ file, name, refType, tag: tagName });
  }

  if (!touched) continue;

  /* `Ref` must be in scope */
  const reactImport = src.match(/import \{([^}]*)\} from "react";/);
  if (reactImport && !/\bRef\b/.test(reactImport[1])) {
    const inner = reactImport[1];
    let rebuilt;
    if (inner.includes("\n")) {
      const closeIndent = inner.slice(inner.lastIndexOf("\n") + 1);
      const head = inner.slice(0, inner.length - closeIndent.length - 1).replace(/[\s,]*$/, "");
      rebuilt = `import {${head},\n${closeIndent}  type Ref,\n${closeIndent}} from "react";`;
    } else {
      rebuilt = `import { ${inner.trim().replace(/,$/, "")}, type Ref } from "react";`;
    }
    src = src.replace(reactImport[0], rebuilt);
  }

  /* Refuse to write anything we just made unparsable. A botched codemod that
   * still type-checks somewhere else is worse than a codemod that stops. */
  const reparsed = ts.createSourceFile(path, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  if (reparsed.parseDiagnostics.length) {
    const first = reparsed.parseDiagnostics[0];
    console.error(`  !! ${file} would not parse after editing (offset ${first.start}); file left untouched`);
    process.exitCode = 1;
    continue;
  }
  if (WRITE) writeFileSync(path, src);
}

if (JSON_OUT) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log(`\ncodemod-ref ${WRITE ? "(applied)" : "(dry run)"}`);
  console.log(`  refactored: ${report.refactored.length}`);
  console.log(`  skipped:    ${report.skipped.length}`);
  const byWhy = {};
  for (const s of report.skipped) byWhy[s.why] = (byWhy[s.why] ?? 0) + 1;
  console.log("\n  skipped, by reason:");
  for (const [why, n] of Object.entries(byWhy).sort((a, b) => b[1] - a[1])) console.log(`    ${String(n).padStart(3)}  ${why}`);
  const byFile = {};
  for (const r of report.refactored) (byFile[r.file] ??= []).push(`${r.name} (${r.tag})`);
  console.log("\n  refactored now:");
  for (const [f, names] of Object.entries(byFile)) console.log(`    ${f}: ${names.length}`);
  if (!WRITE) console.log("\n  (dry run — re-run with --write to apply)");
}
