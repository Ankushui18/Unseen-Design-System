import { expect, test } from "@playwright/test";
import { goto, runAxe } from "./helpers";

/**
 * The playground contract (WEBSITE-IA.md §5.3), asserted in a real browser:
 * controls ↔ code are one state, the code is editable, reset returns to the
 * default cell, viewport/theme are part of the example, deep links restore
 * state, and copy emits the snippet WITH its imports.
 *
 * Behavioural only — no pixels — so this is environment-independent and can
 * live next to the visual baselines without touching them.
 */
test.describe.configure({ mode: "serial" });

const PAGE = "components/button";

/** The live editor: react-live renders a contentEditable <pre> inside our wrapper. */
const editor = (page: import("@playwright/test").Page) =>
  page.locator("#playground-live .playground-editor [contenteditable]");

/** The generated code for the current controls, read from the live editor. */
async function code(page: import("@playwright/test").Page) {
  return editor(page).innerText();
}

/**
 * Replace the editor's contents the way a person does. react-live's editor listens
 * for keydown/keyup/paste, so Playwright's programmatic fill() never reaches it —
 * typing is both the realistic simulation and the only one the library observes.
 */
async function typeCode(page: import("@playwright/test").Page, text: string) {
  const field = editor(page);
  await field.click();
  await page.keyboard.press("ControlOrMeta+a");
  await page.keyboard.press("Backspace");
  await field.pressSequentially(text, { delay: 5 });
}

async function previewButton(page: import("@playwright/test").Page) {
  return page.locator("#playground-live .playground-preview button").first();
}

test("controls and code are one state", async ({ page }) => {
  await goto(page, PAGE);
  const pg = page.locator("#playground-live");
  await expect(pg).toBeVisible();

  const controls = pg.getByRole("group", { name: "Example controls" });
  await controls.getByRole("button", { name: "Destructive", exact: true }).click();
  await controls.getByRole("button", { name: "Stroke", exact: true }).click();
  await controls.getByRole("button", { name: "LG", exact: true }).click();

  const src = await code(page);
  expect(src).toContain('tone="danger"');
  expect(src).toContain('variant="outline"');
  expect(src).toContain('size="md"');

  /* the preview is the component, not a picture of it */
  await expect(await previewButton(page)).toHaveText("Continue");
});

test("the alias vocabulary renders identically and emits shorthand code", async ({ page }) => {
  await goto(page, PAGE);
  const pg = page.locator("#playground-live");
  const controls = pg.getByRole("group", { name: "Example controls" });

  /* canonical form of accent + solid */
  const canonical = await (await previewButton(page)).getAttribute("class");

  await controls.getByRole("button", { name: "variant + mode" }).click();
  const src = await code(page);
  expect(src).toContain('variant="primary"');
  expect(src).toContain('mode="filled"');

  /* same component, same classes — the alias layer changed nothing (spec §3.3) */
  const aliased = await (await previewButton(page)).getAttribute("class");
  expect(aliased).toBe(canonical);
});

test("editing the code re-renders the preview", async ({ page }) => {
  await goto(page, PAGE);
  await typeCode(page, '<Button tone="success">Ship it</Button>');
  await expect(await previewButton(page)).toHaveText("Ship it");
  await expect(await previewButton(page)).toBeEnabled();
});

test("a broken edit shows a readable, announced error instead of a blank canvas", async ({ page }) => {
  await goto(page, PAGE);
  await typeCode(page, "<Button");

  const error = page.locator("#playground-live .playground-error");
  await expect(error).toBeVisible();
  await expect(error).toHaveAttribute("role", "status");
  expect((await error.innerText()).length).toBeGreaterThan(5);
  /* the rest of the page stays usable — the failure is contained */
  await expect(page.locator("#playground-live .playground-preview")).toBeVisible();
});

test("reset returns the example to the default cell and discards edits", async ({ page }) => {
  await goto(page, PAGE);
  const pg = page.locator("#playground-live");
  const controls = pg.getByRole("group", { name: "Example controls" });

  await controls.getByRole("button", { name: "Destructive", exact: true }).click();
  await controls.getByRole("button", { name: "Ghost", exact: true }).click();
  await typeCode(page, "<Button>edited away</Button>");
  expect(await code(page)).toContain("edited away");

  await pg.getByRole("button", { name: "Reset example" }).click();

  const src = await code(page);
  expect(src).toContain('tone="accent"');
  expect(src).toContain('variant="solid"');
  expect(src).not.toContain("edited away");
  /* and the hash no longer carries the abandoned state */
  expect(new URL(page.url()).hash).toBe(`#/${PAGE}`);
});

test("deep links restore the exact example", async ({ page }) => {
  await goto(page, `${PAGE}?tone=danger&mode=stroke&size=lg&icon=only&state=loading`);
  const controls = page.locator("#playground-live").getByRole("group", { name: "Example controls" });

  await expect(controls.getByRole("button", { name: "Destructive", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(controls.getByRole("button", { name: "Stroke", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(controls.getByRole("button", { name: "XL", exact: true })).toHaveAttribute("aria-pressed", "true");

  const src = await code(page);
  expect(src).toContain('tone="danger"');
  expect(src).toContain('variant="outline"');
  expect(src).toContain('size="lg"');
  expect(src).toContain("loading");
});

test("the page works with every param stripped", async ({ page }) => {
  /* unknown/invalid params must be ignored, never crash the page */
  await goto(page, `${PAGE}?tone=nonsense&size=huge&unknown=1`);
  const pg = page.locator("#playground-live");
  await expect(pg).toBeVisible();
  await expect(await previewButton(page)).toHaveText("Continue");
});

test("viewport and canvas theme are part of the example", async ({ page }) => {
  await goto(page, PAGE);
  const pg = page.locator("#playground-live");
  const frame = pg.locator(".playground-frame");

  await expect(frame).toHaveAttribute("data-viewport", "desktop");
  await pg.getByRole("button", { name: "Mobile viewport (390px)" }).click();
  await expect(frame).toHaveAttribute("data-viewport", "mobile");

  const stage = pg.locator(".playground-stage");
  await pg.getByRole("button", { name: "Canvas theme: auto" }).click();
  await expect(stage).toHaveAttribute("data-theme", "dark");
});

test("a dark canvas inside the light page is still axe-clean (contrast)", async ({ page }) => {
  await goto(page, PAGE, "light");
  const pg = page.locator("#playground-live");
  await pg.getByRole("button", { name: "Canvas theme: auto" }).click();
  await expect(pg.locator(".playground-stage")).toHaveAttribute("data-theme", "dark");

  const violations = await runAxe(page);
  const summary = violations.map((v) => `[${v.impact}] ${v.id} ×${v.nodes} (${v.example ?? ""})`).join("\n  ");
  expect(violations, `\nPlayground (dark canvas) violations:\n  ${summary}\n`).toEqual([]);
});

test("copy emits the snippet with the imports it needs", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await goto(page, PAGE);
  const pg = page.locator("#playground-live");

  await pg.getByRole("button", { name: "Copy example code" }).click();
  await expect(pg.getByRole("button", { name: "Copied" })).toBeVisible();

  const clip = await page.evaluate(() => navigator.clipboard.readText());
  expect(clip).toContain('import { Button } from "@unseen/ui"');
  expect(clip).toContain("<Button");
  /* the editor itself stays runnable JSX — imports are only added on copy */
  expect(await code(page)).not.toContain("import ");
});

test("the code editor is a labelled, multiline text field", async ({ page }) => {
  await goto(page, PAGE);
  const field = editor(page);
  await expect(field).toHaveAttribute("role", "textbox");
  await expect(field).toHaveAttribute("aria-multiline", "true");
  await expect(field).toHaveAccessibleName(/Edit the Playground example code/i);
  /* and it is reachable by keyboard, not just by mouse */
  await field.focus();
  await expect(field).toBeFocused();
});

test("the playground toolbar is keyboard-complete", async ({ page }) => {
  await goto(page, PAGE);
  const pg = page.locator("#playground-live");

  /* every toolbar control is reachable and has an accessible name */
  for (const name of ["Desktop viewport", "Tablet viewport (768px)", "Mobile viewport (390px)", "Canvas theme: auto", "Reset example", "Copy example code"]) {
    await expect(pg.getByRole("button", { name })).toHaveCount(1);
  }

  const mobile = pg.getByRole("button", { name: "Mobile viewport (390px)" });
  await mobile.focus();
  await page.keyboard.press("Enter");
  await expect(pg.locator(".playground-frame")).toHaveAttribute("data-viewport", "mobile");
});
