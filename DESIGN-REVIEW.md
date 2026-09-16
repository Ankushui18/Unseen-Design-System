# Aperture / AlignUI Design Review

## Comparison Basis

This review used the current source, the screenshots supplied in the conversation,
and AlignUI's published Button and Badge implementations. Plain-text extraction
cannot establish the presence or absence of a CSS gap, shadow, or syntax color.
No numeric visual-parity score is claimed.

Sources:
- https://www.alignui.com/docs/v1.2/ui/button
- https://www.alignui.com/docs/v1.2/ui/badge
- https://github.com/dcastil/tailwind-merge/blob/v3.4.0/docs/configuration.md

## Why Aperture Felt Inconsistent

1. The default class merger did not recognize custom font-size names. A color
   utility could replace `text-label-sm`, silently changing typography.
2. Fixed-width previews were scaled as a whole. This shrank type and touch
   targets instead of making the component layout responsive.
3. Almost all containers used the same large radius and elevated shadow.
   This flattened hierarchy rather than creating useful depth.
4. The homepage accumulated unrelated marketing sections, repeated examples,
   unsupported adoption statistics, and invented testimonials.
5. Documentation chrome, headings, badge geometry, and preview controls were
   not governed by one consistent layout contract.
6. Several interactive-looking examples had no working state or action feedback.

## Implemented Direction

- Register typography, shadow, and radius tokens with `extendTailwindMerge`.
- Use 14px control labels and 12px metadata; retain 16px reading text where useful.
- Use restrained borders and resting shadows. Reserve stronger depth for overlays.
- Separate documentation chrome from the user-adjustable component radius.
- Render blocks at native size. Allow content to reflow rather than scaling it.
- Show real implementation source and provide a locally editable React example.
- Rebuild spacing and radius pages as copyable specimens with in-context controls.
- Use one responsive navigation shell with mobile navigation and searchable docs.
- Present all beta examples as free. Do not claim unshipped templates, a Figma kit,
  community membership, certifications, or a published npm package.

## Still Requires Validation

- Real-browser layout checks at 320, 375, 768, 1024, and 1440px, plus 200% zoom.
- Keyboard and screen-reader testing beyond the implemented focus patterns.
- Contrast checks for custom accents, not only the default theme.
- Long content, translations, empty datasets, error states, and touch interactions.
- Publishing, packaging, and testing a supported library distribution.
- Dedicated industry templates, Figma assets, and backend integrations.

The production build is a compilation check, not a visual or accessibility audit.

## Regression Coverage

`scripts/design-lint.mjs` now executes the actual `cn` helper and checks every
custom type token against a text-color utility. It also checks badge padding and
type-size overrides. This catches the class-merging defect that a visual class-name
scan missed. These checks have been added but require running the existing design
lint command; a Vite build does not run them automatically.