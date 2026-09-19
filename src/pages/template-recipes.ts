/**
 * "Make it yours" — the token recipes for each template (WEBSITE-IA.md §4.3/§12).
 *
 * A recipe names an accent preset, a radius preset and a mode, and those names
 * are looked up in `ACCENT_PRESETS` / `RADIUS_PRESETS` — the same lists the
 * header popover and Foundations → Themes render. So a recipe cannot invent a
 * value that does not exist in the system, cannot drift from the control it
 * tells you to use, and when you apply it in the page the preset it selects is
 * the preset that lights up.
 *
 * The point is prescriptive rather than descriptive: Foundations → Themes
 * explains the whole input space, this says what *this screen* would look like
 * as a finance product instead of a developer tool, in three clicks.
 */
export type Recipe = {
  id: string;
  /** What the change is, in the visitor's terms. */
  name: string;
  /** What it does to this screen specifically. */
  blurb: string;
  /** A name from ACCENT_PRESETS. */
  accent: string;
  /** A name from RADIUS_PRESETS. */
  radius: string;
  mode: "light" | "dark";
};

export const TEMPLATE_RECIPES: Record<string, Recipe[]> = {
  analytics: [
    {
      id: "ops-room",
      name: "Ops room",
      blurb:
        "Dark, tight and cool-blue. Metric cards stop looking like marketing and start looking like something you leave open on a wall display all day.",
      accent: "Azure",
      radius: "Tight",
      mode: "dark",
    },
    {
      id: "board-report",
      name: "Board report",
      blurb:
        "Soft corners and a calmer iris accent. The same data reads as something you screenshot into a deck rather than monitor.",
      accent: "Iris",
      radius: "Soft",
      mode: "light",
    },
    {
      id: "terminal",
      name: "Terminal",
      blurb:
        "Square corners, no softness anywhere. Density first — worth it when the table is the product and nobody looks at the cards.",
      accent: "Blue",
      radius: "Sharp",
      mode: "light",
    },
  ],
  settings: [
    {
      id: "consumer-calm",
      name: "Consumer calm",
      blurb:
        "Wide radii and a warm amber accent. Settings for a product people use on a phone, where nothing should look like an admin panel.",
      accent: "Amber",
      radius: "Soft",
      mode: "light",
    },
    {
      id: "enterprise-neutral",
      name: "Enterprise neutral",
      blurb:
        "Base radius, blue accent, light. The conservative default an IT department will not complain about.",
      accent: "Blue",
      radius: "Base",
      mode: "light",
    },
    {
      id: "night-shift",
      name: "Night shift",
      blurb:
        "Dark, tight, teal. For the people who open this screen at 3am and would rather not be flashbanged.",
      accent: "Teal",
      radius: "Tight",
      mode: "dark",
    },
  ],
  billing: [
    {
      id: "trust-ledger",
      name: "Trust ledger",
      blurb:
        "Emerald and base radius — the colour language invoices have used for decades, on a screen where confidence is the feature.",
      accent: "Emerald",
      radius: "Base",
      mode: "light",
    },
    {
      id: "fintech-pill",
      name: "Fintech pill",
      blurb:
        "Maximum rounding and a magenta accent. Reads as a consumer wallet rather than an accounts-receivable tool.",
      accent: "Magenta",
      radius: "Round",
      mode: "light",
    },
    {
      id: "crypto-desk",
      name: "Crypto desk",
      blurb:
        "Dark, sharp, grape. High-contrast numerals for a screen read across a trading floor.",
      accent: "Grape",
      radius: "Sharp",
      mode: "dark",
    },
  ],
  team: [
    {
      id: "warm-social",
      name: "Warm social",
      blurb:
        "Rose accent and round corners. Turns a permissions table into something closer to a community directory.",
      accent: "Rose",
      radius: "Round",
      mode: "light",
    },
    {
      id: "people-ops",
      name: "People ops",
      blurb:
        "Soft radius with a teal accent — friendly without being playful, for HR teams handling records that matter.",
      accent: "Teal",
      radius: "Soft",
      mode: "light",
    },
    {
      id: "zero-trust",
      name: "Zero trust",
      blurb:
        "Sharp corners and dark surfaces. Reads as an access-control console, which is what it is.",
      accent: "Azure",
      radius: "Sharp",
      mode: "dark",
    },
  ],
  ai: [
    {
      id: "deep-space",
      name: "Deep space",
      blurb:
        "Dark with a violet accent. The default most AI products reach for, and it holds up because the chat surface is mostly text.",
      accent: "Iris",
      radius: "Base",
      mode: "dark",
    },
    {
      id: "lab-notebook",
      name: "Lab notebook",
      blurb:
        "Light, sharp, lime. Closer to a research tool than a consumer chat — for parameter tuning rather than conversation.",
      accent: "Lime",
      radius: "Sharp",
      mode: "light",
    },
    {
      id: "assistant-soft",
      name: "Assistant soft",
      blurb:
        "Large radii and cyan. The friendly-helper reading, for products that talk to people who never chose an LLM.",
      accent: "Cyan",
      radius: "Round",
      mode: "light",
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  The template registry                                                    */
/* -------------------------------------------------------------------------- */

/**
 * The five application screens. Lives here rather than in the page shell so
 * `TemplateAnatomy` can read it without importing the module that imports
 * `TemplateAnatomy` — a cycle that works until it does not.
 */
export const TEMPLATE_CARDS = [
  {
    key: "ai",
    title: "AI & Neural Assistant",
    href: "templates/ai",
    description: "Multi-turn generative AI messaging, model parameter tuning, token telemetry, and formatted code blocks.",
    tags: ["AI Studio 01", "ChatStream", "ModelParams", "CodeBlock"],
    badge: "New",
  },
  {
    key: "analytics",
    title: "Analytics Dashboard",
    href: "templates/analytics",
    description: "Vertical sidebar layout, MRR metrics, sparkline waves, interactive area charts, and transaction ledger.",
    tags: ["Dashboard 01", "SidebarNav", "Sparkline", "DataTable"],
    badge: "Flagship",
  },
  {
    key: "settings",
    title: "Settings Screen",
    href: "templates/settings",
    description: "Horizontal sub-tabs, photo uploader, profile inputs, prefix slugs, and timezone select.",
    tags: ["Settings 01", "SubTabs", "Profile", "Form"],
    badge: "Updated",
  },
  {
    key: "billing",
    title: "Billing & Plans",
    href: "templates/billing",
    description: "Monthly/annual toggle, active tier progress, visual payment card, and downloadable PDF invoices.",
    tags: ["Billing 01", "PaymentCard", "PricingBlock"],
    badge: "Updated",
  },
  {
    key: "team",
    title: "Team & People",
    href: "templates/team",
    description: "Faceted member directory, 2FA compliance badges, bulk operations, and invite teammate modal.",
    tags: ["Team 01", "DataTable", "AvatarStack", "Modal"],
    badge: "Updated",
  },
];
