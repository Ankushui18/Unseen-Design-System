import { BLOCKS } from "../blocks";
import { BlockExample } from "../docs/BlockExample";
import { PageHeader, Section } from "../docs/Blocks";
import { SiteFooter } from "../docs/Shell";
import { getBlockComponents } from "../docs/block-source";
import { BLOCK_A11Y } from "../blocks/a11y";
import { Chip } from "../ui/Display";
import { Button } from "../ui/Button";
import { RiArrowLeftLine, RiArrowRightLine, RiLockLine } from "@remixicon/react";

/**
 * One page per composed block — `/blocks/{key}` (WEBSITE-IA.md §4.3).
 *
 * Before this, all 31 blocks shared a single gallery: you could look, and copy
 * the source, but you could not link anyone to a block, and the gallery never
 * said which components a block is made of. The page answers the four questions
 * a visitor actually has, in order: what does it look like (preview, at three
 * viewports), what is it made of (the components, linked), what is the code
 * (source, copyable), and what do I have to get right (accessibility).
 *
 * The component list is parsed from the block's own source — see
 * `getBlockComponents` — so it cannot drift from the implementation.
 */
export function BlockPage({ blockKey }: { blockKey: string }) {
  const index = BLOCKS.findIndex((b) => b.key === blockKey);
  const block = BLOCKS[index];

  if (!block) {
    return (
      <main id="main" tabIndex={-1} className="blocks-page">
        <div className="home-container">
          <PageHeader
            eyebrow="404"
            title="Block not found"
            description={`There is no block with the key “${blockKey}”. It may have been renamed in a recent release.`}
          />
          <Button onClick={() => { window.location.hash = "/blocks"; }}>All blocks</Button>
        </div>
        <SiteFooter navigate={(route) => { window.location.hash = `/${route}`; }} />
      </main>
    );
  }

  const uses = getBlockComponents(block.key);
  const documented = uses.filter((u) => u.href);
  const prev = BLOCKS[(index - 1 + BLOCKS.length) % BLOCKS.length];
  const next = BLOCKS[(index + 1) % BLOCKS.length];

  return (
    <main id="main" tabIndex={-1} className="blocks-page" data-block={block.key}>
      <div className="home-container">
        <nav className="block-breadcrumb" aria-label="Breadcrumb">
          <a href="#/blocks">Blocks</a>
          <span aria-hidden>/</span>
          <a href="#/blocks">{block.category}</a>
          <span aria-hidden>/</span>
          <span aria-current="page">{block.title}</span>
        </nav>

        <PageHeader
          eyebrow={`Composed block · ${block.category}`}
          title={block.title}
          description={block.description}
          tags={[
            block.pro ? "Pro" : "Free",
            `${documented.length} documented ${documented.length === 1 ? "component" : "components"}`,
            "Full source",
          ]}
        />

        <BlockExample block={block} />

        <Section
          title="Built with"
          description="Every component this block renders, read out of its own source — not a hand-kept list."
        >
          {uses.length === 0 && (
            <p className="block-uses-note">
              This block renders no components from <code>src/ui</code> — it is plain markup and tokens,
              which is why it stays in step with the system without a component list.
            </p>
          )}
          <div className="block-uses" role="list">
            {uses.map((u) =>
              u.href ? (
                <a
                  key={u.name}
                  role="listitem"
                  className="block-use"
                  href={`#/${u.href}`}
                  title={`Open the ${u.name} docs page`}
                >
                  {u.name}
                  <RiArrowRightLine size={13} aria-hidden />
                </a>
              ) : (
                <span
                  key={u.name}
                  role="listitem"
                  className="block-use is-unlinked"
                  title={`${u.name} is exported from src/ui and has no docs page yet`}
                >
                  {u.name}
                </span>
              )
            )}
          </div>
          {uses.length > 0 && (
            <p className="block-uses-note">
              {documented.length} of {uses.length} are documented.{" "}
              {documented.length < uses.length
                ? "The others are exported from src/ui without a page yet — named here rather than hidden."
                : "Every one of them has a docs page."}
            </p>
          )}
        </Section>

        <Section
          title="Accessibility"
          description="What this block does beyond rendering, and what it deliberately leaves to you."
        >
          <div className="block-a11y">
            <ul className="block-a11y-list">
              {(BLOCK_A11Y[block.key] ?? []).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p className="block-a11y-foot">
              <RiLockLine size={14} aria-hidden /> The whole block is covered by the site-wide gate: axe on every
              route in both themes, keyboard contracts per component, and a reduced-motion rule that collapses
              every transition on the page.
            </p>
          </div>
        </Section>

        <nav className="block-pager" aria-label="Other blocks">
          <a className="block-pager-link" href={`#/blocks/${prev.key}`}>
            <span className="block-pager-dir"><RiArrowLeftLine size={14} aria-hidden /> Previous</span>
            <span className="block-pager-title">{prev.title}</span>
          </a>
          <a className="block-pager-link is-next" href={`#/blocks/${next.key}`}>
            <span className="block-pager-dir">Next <RiArrowRightLine size={14} aria-hidden /></span>
            <span className="block-pager-title">{next.title}</span>
          </a>
        </nav>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button variant="outline" tone="default" onClick={() => { window.location.hash = "/blocks"; }}>
            All {BLOCKS.length} blocks
          </Button>
          <Chip size="sm" variant="soft">{block.category}</Chip>
        </div>
      </div>
      <SiteFooter navigate={(route) => { window.location.hash = `/${route}`; }} />
    </main>
  );
}
