import { useState, type ReactNode } from "react";
import { PageHeader, Section, Showcase } from "../docs/Blocks";
import { SiteFooter } from "../docs/Shell";
import { getBlockComponents } from "../docs/block-source";
import { RADIUS_PRESETS, ACCENT_PRESETS, useTheme } from "../lib/theme";
import { TEMPLATE_CARDS, TEMPLATE_RECIPES, type Recipe } from "./template-recipes";
import { Button } from "../ui/Button";
import { Chip } from "../ui/Display";
import { CodeBlock } from "../docs/CodeBlock";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiCheckLine,
  RiPaletteLine,
  RiResetLeftLine,
} from "@remixicon/react";

/**
 * The shared anatomy of a template page (WEBSITE-IA.md §4.3, §12 sprint 4).
 *
 * Before this, all five pages were a heading and a preview — you could look at
 * a screen and copy its source, but nothing said what it was built from or what
 * you would change to make it yours. One component renders all of it so the
 * five pages cannot drift apart, and `surface.spec` asserts they all carry the
 * same sections.
 */
export function TemplateAnatomy({
  templateKey,
  blockKey,
  eyebrow,
  title,
  description,
  tags,
  code,
  children,
}: {
  /** Key into TEMPLATE_RECIPES — the recipe set for this screen. */
  templateKey: string;
  /** Key into BLOCKS — the registered screen, for the derived manifest. */
  blockKey: string;
  eyebrow: string;
  title: string;
  description: ReactNode;
  tags: string[];
  code: string;
  children: ReactNode;
}) {
  const uses = getBlockComponents(blockKey);
  const documented = uses.filter((u) => u.href);

  /* Wraps, like the block pages: every template page offers both directions,
     so the anatomy is identical on all five and nobody hits a dead end. */
  const index = TEMPLATE_CARDS.findIndex((t) => t.key === templateKey);
  const count = TEMPLATE_CARDS.length;
  const prev = index >= 0 ? TEMPLATE_CARDS[(index - 1 + count) % count] : undefined;
  const next = index >= 0 ? TEMPLATE_CARDS[(index + 1) % count] : undefined;

  /* No <main> here: these pages render inside DocsLayout, which owns the
     landmark, so a second one would be a duplicate (WCAG 1.3.1). */
  return (
    <div className="templates-page" data-template={templateKey}>
      <div className="home-container">
        <PageHeader eyebrow={eyebrow} title={title} description={description} tags={tags} />

        <Showcase code={code} allowViewport align="stretch">
          {children}
        </Showcase>

        <Section
          title="Built with"
          description="Every component this screen renders, read out of its own source — the same list you would need if you were rebuilding it."
        >
          <div className="block-uses" role="list">
            {uses.map((u) =>
              u.href ? (
                <a key={u.name} role="listitem" className="block-use" href={`#/${u.href}`} title={`Open the ${u.name} docs page`}>
                  {u.name}
                  <RiArrowRightLine size={13} aria-hidden />
                </a>
              ) : (
                <span key={u.name} role="listitem" className="block-use is-unlinked" title={`${u.name} has no docs page yet`}>
                  {u.name}
                </span>
              )
            )}
          </div>
          {uses.length > 0 && (
            <p className="block-uses-note">
              {documented.length} of {uses.length} are documented.{" "}
              {documented.length < uses.length
                ? "The rest are exported from src/ui without a page yet."
                : "Every one of them has a docs page."}
            </p>
          )}
        </Section>

        <MakeItYours templateKey={templateKey} />

        <nav className="block-pager" aria-label="Other templates">
          {prev && (
            <a className="block-pager-link" href={`#/${prev.href}`}>
              <span className="block-pager-dir"><RiArrowLeftLine size={14} aria-hidden /> Previous</span>
              <span className="block-pager-title">{prev.title}</span>
            </a>
          )}
          {next && (
            <a className="block-pager-link is-next" href={`#/${next.href}`}>
              <span className="block-pager-dir">Next <RiArrowRightLine size={14} aria-hidden /></span>
              <span className="block-pager-title">{next.title}</span>
            </a>
          )}
        </nav>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button variant="outline" tone="default" onClick={() => { window.location.hash = "/templates"; }}>
            All {TEMPLATE_CARDS.length} templates
          </Button>
          <Chip size="sm" variant="soft">{title}</Chip>
        </div>
      </div>
      <SiteFooter navigate={(route) => { window.location.hash = `/${route}`; }} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Make it yours                                                             */
/* -------------------------------------------------------------------------- */

function presetCss(recipe: Recipe) {
  const accent = ACCENT_PRESETS.find((p) => p.name === recipe.accent);
  const radius = RADIUS_PRESETS.find((r) => r.name === recipe.radius);
  return `/* ${recipe.name} */
:root {
  --accent-h: ${accent?.h ?? "—"};
  --accent-c: ${accent?.c ?? "—"};
  --radius-scale: ${radius?.value ?? "—"};
}${recipe.mode === "dark" ? `\n\n/* Appearance is a class on any root element. */\n<html class="dark">` : ""}`;
}

/**
 * Recipes apply through `useTheme()` — the site's real theme state, not a
 * sandboxed copy. Applying one re-themes this page (including the preview
 * above) exactly as the same tokens would in your app, and the active preset
 * in the header popover moves with it. The code shown is what you would paste
 * into your own project to get the same result without this site.
 */
function MakeItYours({ templateKey }: { templateKey: string }) {
  const theme = useTheme();
  const recipes = TEMPLATE_RECIPES[templateKey] ?? [];
  const [active, setActive] = useState<string | null>(null);

  const apply = (recipe: Recipe) => {
    const accent = ACCENT_PRESETS.find((p) => p.name === recipe.accent);
    const radius = RADIUS_PRESETS.find((r) => r.name === recipe.radius);
    if (!accent || !radius) return;
    theme.set({ accentH: accent.h, accentC: accent.c, radiusScale: radius.value, mode: recipe.mode });
    setActive(recipe.id);
  };

  /** True when the live theme already equals the recipe — no hidden state. */
  const isActive = (recipe: Recipe) => {
    const accent = ACCENT_PRESETS.find((p) => p.name === recipe.accent);
    const radius = RADIUS_PRESETS.find((r) => r.name === recipe.radius);
    return (
      active === recipe.id &&
      theme.mode === recipe.mode &&
      accent?.h === theme.accentH &&
      accent?.c === theme.accentC &&
      radius?.value === theme.radiusScale
    );
  };

  const shown = recipes.find((r) => r.id === active) ?? recipes[0];

  return (
    <Section
      title="Make it yours"
      description="Three ways this screen reads in your product, using the tokens the whole system shares. Applying one changes this page — including the preview above — because these are the real knobs, not a mock-up."
    >
      <div className="recipe-grid" role="list">
        {recipes.map((recipe) => {
          const activeNow = isActive(recipe);
          return (
            <div className="recipe" role="listitem" key={recipe.id} data-recipe={recipe.id}>
              <div className="recipe-head">
                <span className="recipe-name">{recipe.name}</span>
                {activeNow ? (
                  <span className="recipe-state is-active"><RiCheckLine size={13} aria-hidden /> Applied</span>
                ) : (
                  <button type="button" className="recipe-apply" onClick={() => apply(recipe)}>
                    <RiPaletteLine size={13} aria-hidden /> Apply
                  </button>
                )}
              </div>
              <p className="recipe-blurb">{recipe.blurb}</p>
              <dl className="recipe-tokens">
                <div><dt>Accent</dt><dd>{recipe.accent}</dd></div>
                <div><dt>Radius</dt><dd>{recipe.radius}</dd></div>
                <div><dt>Mode</dt><dd>{recipe.mode}</dd></div>
              </dl>
            </div>
          );
        })}
      </div>

      <div className="recipe-code">
        <div className="recipe-code-head">
          <span>Paste into your project</span>
          <button
            type="button"
            className="recipe-reset"
            onClick={() => { theme.reset(); setActive(null); }}
          >
            <RiResetLeftLine size={13} aria-hidden /> Reset theme
          </button>
        </div>
        <CodeBlock code={presetCss(shown)} filename="theme.css" maxHeight={280} />
      </div>

      <p className="block-uses-note">
        The whole input space — 12 accents, 5 radius presets, two appearances, plus the{" "}
        <code>tokens:export</code> that feeds Figma — is on{" "}
        <a className="text-action" href="#/foundations/themes">Foundations → Themes</a>.
      </p>
    </Section>
  );
}
