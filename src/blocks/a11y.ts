/**
 * Per-block accessibility notes — `/blocks/{key}` (WEBSITE-IA.md §4.3).
 *
 * These are hand-written because they say *why* a block is built the way it is,
 * which no parser can extract. Two rules keep them from becoming decoration:
 *
 *   1. Every claim here is one the gates can back. "Every control has an
 *      accessible name" is true because axe runs on this block's route in both
 *      themes and the build fails otherwise; "arrow keys move the highlight" is
 *      true because the block's own `onKeyDown` does it.
 *   2. Where something is *not* handled, the note says so and names the fix.
 *      A page that only lists strengths is a brochure.
 *
 * `tests/block-manifest.test.ts` fails if a block has no entry, so adding a
 * block without thinking about this is not possible.
 */
export const BLOCK_A11Y: Record<string, string[]> = {
  /* -------------------------------------------------- authentication */
  auth: [
    "Email and password are real inputs bound to real labels; the password reveal is a labelled button that reports its state with aria-pressed, so a screen reader announces the toggle rather than a stray icon.",
    "The social buttons are labelled (“Continue with Google”) and are visual only — wire them to your provider.",
    "Sign-in failure has no error surface in the example. Give the form a role=\"alert\" region and move focus to it before you ship.",
  ],
  verify: [
    "Six single-character inputs, each labelled “Digit 1”…“Digit 6”, so the code can be typed, pasted or read field by field.",
    "Arrow keys move between digits and Backspace walks back, matching the behaviour people expect from a one-time-code field.",
    "The resend action is a real button; it should also announce when the code was sent (role=\"status\").",
  ],
  onboarding: [
    "The stepper is a real ordered list with the current step marked, so progress is announced rather than implied by colour.",
    "Team-size options are a radio group — one choice, arrow-key navigable — not a row of toggle buttons.",
    "Step changes swap the panel; keep the heading in sync with the step (the block does) so the change is audible.",
  ],

  /* --------------------------------------------------------- dashboard */
  stats: [
    "Each metric is a definition-like pair: label, then value, so the number is never announced without its meaning.",
    "Trend chips pair an arrow icon with text and a label — colour is never the only carrier of “up” or “down”.",
    "Static; no focusable elements, so nothing here can trap a keyboard user.",
  ],
  table: [
    "A real <table> with <th> cells. Selection is a checkbox column: “Select all rows” in the header, “Select row N” per row.",
    "The bulk-action bar appears only when something is selected and should be announced (role=\"status\") — see PatternDocs for the reference implementation.",
    "Row overflow actions are labelled buttons; the menu they open must return focus to the trigger on close.",
  ],
  command: [
    "The search field is labelled “Command search”. Arrow keys move the highlighted row, Enter runs it, Escape clears the query.",
    "The highlight is visual only: the list is not exposed as a listbox and there is no aria-activedescendant. If you surface this as a combobox, add both — a screen-reader user currently gets the input but not the cursor position.",
    "The ⌘K hint is decoration (a Kbd chip), not the shortcut itself; bind the real shortcut at app level, as the docs shell does.",
  ],
  profile: [
    "The avatar is decorative — the name beside it carries the identity — and the follow control is a labelled button whose state is announced on press.",
    "Statistics are text, not images, so they reflow under 200% zoom and translate.",
  ],
  notification: [
    "Unread state is marked in markup (not only by a coloured dot), and each row’s dismiss control is a labelled button.",
    "The list is static markup; if you make it live, wrap it in a region with a heading so the count is announced once.",
  ],
  upload: [
    "A hidden but labelled file input (\"Choose files\") does the real work — drag and drop is an addition, never the only route, because it is unreachable by keyboard.",
    "Rejected files report through role=\"alert\"; each attached file has a labelled remove button.",
    "Progress is a real progress element with a value, so it is announced as it moves.",
  ],
  usage: [
    "Progress is conveyed with a numeric value as well as the bar, so it survives high contrast and monochrome.",
    "The quota figure and its caption are adjacent text, not a tooltip.",
  ],
  settings: [
    "Sections are grouped with headings and hairline rules; toggles are switches, not checkboxes, because the change applies immediately.",
    "The tab strip uses real tab semantics with arrow-key movement between tabs.",
    "Destructive actions sit apart from the routine ones and keep their label when disabled.",
  ],
  rating: [
    "Five real buttons labelled “1 star”…“5 stars” with aria-pressed for the current choice, so the control is operable by keyboard and announced by value.",
    "The confirmation message is a live region (role=\"status\"), so submitting is not silent.",
  ],
  pricing: [
    "Plan cards are a comparison, not a form: hidden content is disclosed with a real button, and the popular tier is marked with text as well as styling.",
    "Billing period is a segmented control with aria-pressed buttons; the price change is announced through the live total, not only by the switch.",
    "The comparison table is a real table with a header row, so it can be navigated cell by cell.",
  ],

  /* --------------------------------------------------------- marketing */
  hero: [
    "The heading is the page's h1 and the actions are buttons — the two things assistive technology needs first.",
    "Decorative background meshes are aria-hidden, so the ambient layer adds nothing to the reading order.",
    "One primary action per hero; the secondary stays visibly secondary for keyboard users who never see the hover state.",
  ],
  "hero-lit": [
    "The ambient glow is decorative and hidden from assistive technology.",
    "The social-proof row is text, not an image of avatars, and the pill's link has a label.",
    "The primary action is a button with a visible focus ring against the glow — verify focus contrast if you deepen the background.",
  ],
  "hero-split": [
    "The deployment panel is a real form: labelled inputs, a switch with a label, and a submit that reports success in a live region.",
    "Two columns become one below the breakpoint, so the reading order survives at 200% zoom.",
  ],
  "hero-inverse": [
    "Dark surfaces keep the token contrast pairs, so text passes AA on the inverse background rather than being eyeballed.",
    "The metric cards pair each figure with its label; nothing is conveyed by brightness alone.",
  ],
  logos: [
    "The wordmarks are decorative and hidden from assistive technology: a wall of brand names read aloud one after another adds noise, so the accessible name sits on the section heading instead.",
    "If your logos carry meaning (client attribution), give each one its own text label.",
  ],
  features: [
    "Each feature is a heading plus body, so the section is navigable by heading — the fastest way through a long marketing page.",
    "Icons are decorative and hidden; the copy carries the meaning.",
  ],
  "features-bento": [
    "The bento tiles are ordered so the reading order matches the visual importance, not the grid position.",
    "Interactive tiles (theme swatches, shortcut rows) are real buttons with names; the code sample is text, so it is selectable and readable.",
  ],
  metrics: [
    "Each figure is paired with its unit and label in the same text node, so a value is never read without context.",
    "The band is static markup with no focusable children.",
  ],
  testimonials: [
    "Quotes are marked up as blockquotes with attribution, so the relationship between words and author is in the markup.",
    "Avatar images take the person's name as alt text; decorative repetitions are hidden.",
  ],
  cta: [
    "One action, one label, in a section with its own heading — the closing call to action is reachable by heading navigation.",
    "The success message is a live region, so submitting the inline form is announced.",
  ],
  faq: [
    "An accordion of real buttons with aria-expanded and aria-controls; the panel is linked back to its trigger.",
    "Answers are text in the DOM while collapsed (hidden, not removed), so in-page search finds them — panels that unmount are a known trap.",
  ],
  "how-it-works": [
    "Steps are activating buttons in an ordered sequence, with the active step marked in markup rather than by colour.",
    "The code sample beside each step is real text, so it can be zoomed, selected and read by a screen reader.",
  ],
  integrations: [
    "Connections are switches with labels, and the status chip carries text — never colour alone.",
    "Category filters are toggle buttons with aria-pressed; the filtered count is announced when it changes.",
  ],
  newsletter: [
    "A labelled email input with type=\"email\" so mobile keyboards and browser validation do the first pass.",
    "Validation errors are announced and focus moves to the field; the privacy note sits with the control.",
  ],

  /* --------------------------------------------------------- templates */
  "template-ai": [
    "The message stream is a live region, so a new completion is announced once rather than re-reading the transcript.",
    "The prompt field is a labelled textarea with a visible send button; the model picker and the parameter sliders all keep their labels when the panel collapses.",
    "Streaming state is announced in words (generating, done), not by the caret animation alone.",
  ],
  "template-analytics": [
    "Landmarks are real: one main region, a navigation list, and a table with headers — the page can be jumped through rather than read.",
    "The table is horizontally scrollable inside a labelled region instead of clipping, so no column becomes unreachable at narrow widths.",
    "Chart series are drawn with accessible values in the DOM; the visual chart is decorative.",
  ],
  "template-settings": [
    "Settings are grouped into labelled sections with a save affordance per group, so a change is never ambiguous about its scope.",
    "The timezone and language selectors are real selects with associated labels.",
    "Destructive actions are separated visually and keep their accessible name when disabled.",
  ],
  "template-billing": [
    "Payment details are read as text with labels, not as an image of a card.",
    "Invoices are a table with header cells and per-row download controls that name the invoice they belong to.",
    "The plan change flow says what happens before it happens.",
  ],
  "template-team": [
    "The member table has header cells, labelled row selection and a bulk-action bar that appears with the selection.",
    "The invite dialog traps focus, closes on Escape, and returns focus to the button that opened it.",
    "Role and status are text; the avatar is decorative beside the name.",
  ],
};
