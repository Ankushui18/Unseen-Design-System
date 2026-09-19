import { useMemo, useState } from "react";
import { PageHeader, Section } from "../docs/Blocks";
import { SiteFooter } from "../docs/Shell";
import { CodeBlock } from "../docs/CodeBlock";
import { figmaStatus } from "../docs/figma-status";
import {
  AUDIT,
  AXIS_PROP,
  EXAMPLE,
  EXAMPLE_AXES,
  TOKEN_COUNT,
  TOKEN_GROUPS,
  TOKEN_TYPES,
  VARIABLE_EXCERPT,
  VARIABLE_ROWS,
} from "../docs/figma-facts";
import { BLOCKS } from "../blocks";
import { TEMPLATE_CARDS } from "./template-recipes";
import { Button } from "../ui/Button";
import {
  RiArrowRightLine,
  RiCheckLine,
  RiErrorWarningLine,
  RiFileCopyLine,
  RiPaletteLine,
  RiSearchLine,
} from "@remixicon/react";
import { cn } from "../utils/cn";

/* ========================================================================== */
/*  /figma — the code ↔ Figma bridge (WEBSITE-IA.md §8)                      */
/*                                                                           */
/*  The page is built on three things that already exist and are verifiable:  */
/*    · the token export (tokens/tokens.json + figma-variables.csv),          */
/*    · the naming contract, derived from the components' own prop unions,    */
/*    · the component registry, for counts.                                  */
/*                                                                           */
/*  It does not describe a Figma library, because none is published. The      */
/*  status column says `none` for every component and the page says why —     */
/*  what it publishes instead is the contract such a library would have to    */
/*  match, which is the part that can be true today.                         */
/* ========================================================================== */

export function FigmaPage() {
  const [query, setQuery] = useState("");
  const [onlyWithValues, setOnlyWithValues] = useState(false);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return AUDIT.rows
      .filter((r) => (onlyWithValues ? Boolean(r.values) : true))
      .filter((r) => !q || r.name.toLowerCase().includes(q) || r.file.toLowerCase().includes(q));
  }, [query, onlyWithValues]);

  return (
    <div className="figma-page">
      <PageHeader
        eyebrow="Code ↔ Figma"
        title="One name, one value, on both sides."
        description={
          <>
            The naming contract is the bridge: a component&rsquo;s Figma name is its React export, a
            variant property is the prop name, and a variant value is the value that prop accepts. The
            token export is the other half — {TOKEN_COUNT} tokens, deterministic and diff-checked. What
            this page does <em>not</em> describe is a published Figma library, because there is not one:
            the status column below says so for every row.
          </>
        }
        tags={[
          `${TOKEN_COUNT} tokens exported`,
          `${VARIABLE_ROWS} Figma variables`,
          `${AUDIT.withAxes} components with axes`,
        ]}
      />

      <Section
        title="What ships today"
        description="Two halves of the bridge are real and in the repository: the token set, and the naming contract derived from the components themselves."
      >
        <div className="figma-split">
          <div className="figma-card">
            <span className="figma-card-icon"><RiCheckLine size={16} aria-hidden /></span>
            <h3 className="text-label-sm font-medium text-foreground">Token export</h3>
            <p className="text-paragraph-sm text-muted mt-1">
              {"`npm run tokens:export`"} writes a design-tokens 2.0 file and a Figma Variables CSV from{" "}
              <code>src/index.css</code>. CI runs <code>tokens:check</code>, so the committed file cannot
              drift from the stylesheet.
            </p>
            <ul className="figma-facts">
              <li><strong>{TOKEN_COUNT}</strong> tokens across {TOKEN_GROUPS.length} groups</li>
              <li><strong>{VARIABLE_ROWS}</strong> variable rows, light and dark columns → two Figma modes</li>
              <li><strong>{TOKEN_TYPES.length}</strong> variable types: {TOKEN_TYPES.join(", ")}</li>
            </ul>
            <div className="figma-code">
              <CodeBlock
                filename="tokens/figma-variables.csv"
                maxHeight={200}
                code={`${VARIABLE_EXCERPT}\n…`}
              />
            </div>
          </div>

          <div className="figma-card">
            <span className="figma-card-icon"><RiPaletteLine size={16} aria-hidden /></span>
            <h3 className="text-label-sm font-medium text-foreground">Naming contract</h3>
            <p className="text-paragraph-sm text-muted mt-1">
              Generated from the components&rsquo; own prop types by <code>audit:variants</code>, so it
              cannot describe a component the source does not have. Here is one row of it, in full.
            </p>
            <div className="naming-demo">
              <div className="naming-row">
                <span className="naming-side">React</span>
                <code>export function {EXAMPLE.name}(...)</code>
              </div>
              <div className="naming-row">
                <span className="naming-side">Figma</span>
                <code>{EXAMPLE.name}</code>
                <span className="naming-note">component name</span>
              </div>
              {EXAMPLE_AXES.map(({ axis, prop, values }) => (
                <div className="naming-row" key={axis}>
                  <span className="naming-side">{axis}</span>
                  <code>{values.join(" \u00b7 ")}</code>
                  <span className="naming-note">{prop} prop</span>
                </div>
              ))}
            </div>
            <p className="figma-foot">
              {EXAMPLE.name} is {EXAMPLE.cells} cells: {Object.entries(EXAMPLE.axes).map(([a, n]) => `${a} ${n}`).join(" × ")}.
            </p>
          </div>
        </div>

        <div className="figma-note is-warning">
          <RiErrorWarningLine size={16} aria-hidden />
          <span>
            <strong>No Figma library is published.</strong> Every row in the table below is{" "}
            <code>none</code>, which is what the status field holds until a kit exists to point at.
            What this page adds now is the part that can be true today: the export a kit is built from,
            and the names it must use.
          </span>
        </div>
      </Section>

      <Section
        title="Kit structure"
        description="What a Unseen Figma library would contain, sized by what is actually in the repository."
      >
        <div className="kit-grid">
          <div className="kit-item">
            <span className="kit-index">01</span>
            <h3 className="text-label-xs font-medium text-foreground">Foundations</h3>
            <p className="text-paragraph-xs text-muted mt-1">
              Imported from <code>tokens.json</code>, not redrawn: colour (light/dark modes), the type
              scale, radius, spacing, shadow and motion.
            </p>
            <span className="kit-count">{TOKEN_COUNT} tokens</span>
          </div>
          <div className="kit-item">
            <span className="kit-index">02</span>
            <h3 className="text-label-xs font-medium text-foreground">Components</h3>
            <p className="text-paragraph-xs text-muted mt-1">
              One Figma component per React export, with variant properties mirroring the axes below —
              the same names, in the same order.
            </p>
            <span className="kit-count">{AUDIT.withAxes} components</span>
          </div>
          <div className="kit-item">
            <span className="kit-index">03</span>
            <h3 className="text-label-xs font-medium text-foreground">Patterns</h3>
            <p className="text-paragraph-xs text-muted mt-1">
              The composed blocks, as instances rather than redrawn groups, so a change to the component
              propagates.
            </p>
            <span className="kit-count">{BLOCKS.length} blocks</span>
          </div>
          <div className="kit-item">
            <span className="kit-index">04</span>
            <h3 className="text-label-xs font-medium text-foreground">Templates</h3>
            <p className="text-paragraph-xs text-muted mt-1">
              The application screens, each documented on its own page with the token recipe that
              restyles it.
            </p>
            <span className="kit-count">{TEMPLATE_CARDS.length} templates</span>
          </div>
        </div>
      </Section>

      <Section
        title="Component parity"
        description="Every component with variant axes, the values each axis accepts, and whether a Figma counterpart exists. Status is a field in src/docs/figma-status.ts, not a promise in this table."
      >
        <div className="parity-toolbar">
          <label className="parity-search">
            <RiSearchLine size={15} aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter components…"
              aria-label="Filter components"
            />
          </label>
          <label className="parity-toggle">
            <input type="checkbox" checked={onlyWithValues} onChange={(e) => setOnlyWithValues(e.target.checked)} />
            Only components whose values are resolved
          </label>
          <span className="parity-count" role="status">
            {rows.length} of {AUDIT.rows.length} components
          </span>
        </div>

        <div className="parity-table-wrap" role="region" aria-label="Component parity table" tabIndex={0}>
          <table className="parity-table">
            <caption className="sr-only">
              Figma parity: React export, variant axes with their values, cell count, and kit status.
            </caption>
            <thead>
              <tr>
                <th scope="col">Component</th>
                <th scope="col">Axes and values</th>
                <th scope="col">Cells</th>
                <th scope="col">Figma</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const status = figmaStatus(row.name);
                return (
                  <tr key={row.name}>
                    <th scope="row">
                      <span className="parity-name">{row.name}</span>
                      <span className="parity-file">{row.file}</span>
                    </th>
                    <td>
                      <div className="parity-axes">
                        {Object.entries(row.axes).map(([axis, n]) => (
                          <span className="parity-axis" key={axis}>
                            <span className="parity-axis-name">{AXIS_PROP[axis] ?? axis}</span>
                            <span className="parity-axis-values">
                              {row.values?.[axis] ? row.values[axis].join(" · ") : `${n} values`}
                            </span>
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="parity-cells">{row.cells}</td>
                    <td>
                      <span className={cn("parity-status", status === "none" ? "is-none" : "is-live")}>
                        {status === "none" ? "Not published" : status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {rows.length === 0 && (
          <p className="block-uses-note">No component matches “{query}”.</p>
        )}
      </Section>

      <Section
        title="Building the kit"
        description="The order that keeps the library honest. Each step has an artifact in the repository already, which is why the kit can be generated rather than drawn twice."
      >
        <ol className="figma-steps">
          <li>
            <strong>Export the tokens.</strong> <code>npm run tokens:export</code> writes{" "}
            <code>tokens/tokens.json</code> and <code>tokens/figma-variables.csv</code>; import them with
            Tokens Studio and you get light/dark as variable modes, not duplicated palettes.
          </li>
          <li>
            <strong>Build the components to the contract.</strong> One Figma component per React export,
            variant properties named for the props (<code>tone</code>, <code>variant</code>,{" "}
            <code>size</code>) and valued with what those props accept — the table above is the
            specification.
          </li>
          <li>
            <strong>Record the status.</strong> Flip a component in{" "}
            <code>src/docs/figma-status.ts</code> when its kit lands. The page follows the field, and{" "}
            <code>tests/figma.test.ts</code> refuses a claim for a component with no axes to mirror.
          </li>
          <li>
            <strong>Keep it paired.</strong> <code>npm run audit:variants:check</code> fails when the
            committed contract drifts from the components, so the kit cannot quietly become a copy of an
            older version of the system.
          </li>
        </ol>

        <div className="figma-actions">
          <Button onClick={() => { window.location.hash = "/foundations/themes"; }} endContent={<RiArrowRightLine size={16} />}>
            Tokens and the brand engine
          </Button>
          <Button variant="outline" tone="default" onClick={() => { window.location.hash = "/foundations/tokens"; }}>
            Token reference
          </Button>
          <span className="figma-actions-note">
            <RiFileCopyLine size={14} aria-hidden /> Both pages list every variable with its value.
          </span>
        </div>
      </Section>

      <SiteFooter navigate={(route) => { window.location.hash = `/${route}`; }} />
    </div>
  );
}
