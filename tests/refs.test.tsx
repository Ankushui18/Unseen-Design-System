import { createRef, type RefObject } from "react";
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Alert, Avatar, Badge, Card, Chip, CircularProgress, Code, Kbd, Progress, Skeleton } from "@/ui/Display";
import { Hint, Label, StatusBadge, Tag } from "@/ui/Extra";
import { Button } from "@/ui/Button";
import { Checkbox, Switch } from "@/ui/Form";
import { SearchInput, Timeline, WidgetBox } from "@/ui/More";
import { Pagination } from "@/ui/Navigation";
import { MenuItem } from "@/ui/Overlay";
import { Well } from "@/ui/Patterns";

/**
 * Ref transparency — the promise behind M1.ref.
 *
 * Declaring `ref?: Ref<HTMLElement>` in a props type is not evidence that the
 * ref reaches anything: a component can accept the prop and never use it, and
 * nothing else in the pipeline would notice. These tests mount the component
 * and assert the ref resolves to the component's OWN root node — not an inner
 * element, not null.
 *
 * Each case carries its own ref, typed to the interface that component
 * promises. That is deliberate: the generic argument turns the test list into a
 * compile-time assertion as well, so a component that stops accepting (or
 * narrows) its `ref` prop fails the build, not just this file.
 *
 * The sample spans every root shape scripts/codemod-ref.mjs rewrites —
 * div / span / label / kbd / code / p / ol / nav / section / button.
 */

/* one ref per case, each typed as the component declares it */
const card = createRef<HTMLDivElement>();
const chip = createRef<HTMLSpanElement>();
const badge = createRef<HTMLSpanElement>();
const tag = createRef<HTMLSpanElement>();
const statusBadge = createRef<HTMLSpanElement>();
const avatar = createRef<HTMLSpanElement>();
const skeleton = createRef<HTMLDivElement>();
const alert = createRef<HTMLDivElement>();
const progress = createRef<HTMLDivElement>();
const circular = createRef<HTMLDivElement>();
const kbd = createRef<HTMLElement>();
const code = createRef<HTMLElement>();
const label = createRef<HTMLLabelElement>();
const hint = createRef<HTMLParagraphElement>();
const switchRef = createRef<HTMLLabelElement>();
const checkbox = createRef<HTMLLabelElement>();
const searchInput = createRef<HTMLDivElement>();
const well = createRef<HTMLDivElement>();
const widgetBox = createRef<HTMLElement>();
const menuItem = createRef<HTMLButtonElement>();
const pagination = createRef<HTMLElement>();
const timeline = createRef<HTMLOListElement>();

type Case = {
  name: string;
  element: React.ReactElement;
  node: RefObject<HTMLElement | null>;
  /** the component's root, as a tag name */
  root: string;
};

const cases: Case[] = [
  { name: "Card", element: <Card ref={card} />, node: card, root: "DIV" },
  { name: "Chip", element: <Chip ref={chip} />, node: chip, root: "SPAN" },
  { name: "Badge", element: <Badge ref={badge}>New</Badge>, node: badge, root: "SPAN" },
  { name: "Tag", element: <Tag ref={tag}>Beta</Tag>, node: tag, root: "SPAN" },
  { name: "StatusBadge", element: <StatusBadge ref={statusBadge}>Done</StatusBadge>, node: statusBadge, root: "SPAN" },
  { name: "Avatar", element: <Avatar ref={avatar} name="Ada Lovelace" />, node: avatar, root: "SPAN" },
  { name: "Skeleton", element: <Skeleton ref={skeleton} />, node: skeleton, root: "DIV" },
  { name: "Alert", element: <Alert ref={alert} title="Heads up">Body</Alert>, node: alert, root: "DIV" },
  { name: "Progress", element: <Progress ref={progress} value={40} />, node: progress, root: "DIV" },
  { name: "CircularProgress", element: <CircularProgress ref={circular} value={40} />, node: circular, root: "DIV" },
  { name: "Kbd", element: <Kbd ref={kbd}>K</Kbd>, node: kbd, root: "KBD" },
  { name: "Code", element: <Code ref={code}>npm i</Code>, node: code, root: "CODE" },
  { name: "Label", element: <Label ref={label}>Email</Label>, node: label, root: "LABEL" },
  { name: "Hint", element: <Hint ref={hint}>Optional</Hint>, node: hint, root: "P" },
  { name: "Switch", element: <Switch ref={switchRef} checked={false} onChange={() => {}} />, node: switchRef, root: "LABEL" },
  { name: "Checkbox", element: <Checkbox ref={checkbox} label="Accept" />, node: checkbox, root: "LABEL" },
  { name: "SearchInput", element: <SearchInput ref={searchInput} value="" onChange={() => {}} />, node: searchInput, root: "DIV" },
  { name: "Well", element: <Well ref={well}>Body</Well>, node: well, root: "DIV" },
  { name: "WidgetBox", element: <WidgetBox ref={widgetBox} title="Usage">Body</WidgetBox>, node: widgetBox, root: "SECTION" },
  { name: "MenuItem", element: <MenuItem ref={menuItem}>Rename</MenuItem>, node: menuItem, root: "BUTTON" },
  { name: "Pagination", element: <Pagination ref={pagination} page={1} total={3} onChange={() => {}} />, node: pagination, root: "NAV" },
  { name: "Timeline", element: <Timeline ref={timeline} items={[{ time: "now", title: "Shipped" }]} />, node: timeline, root: "OL" },
];

describe("components forward refs to their own root", () => {
  for (const { name, element, node, root } of cases) {
    it(`${name}`, () => {
      const { container, unmount } = render(element);
      const el = node.current;
      expect(el, `${name} left the ref unset`).not.toBeNull();
      expect(el).toBeInstanceOf(HTMLElement);
      expect(el!.tagName).toBe(root);
      expect(el).toBe(container.firstElementChild);
      unmount();
      expect(node.current, `${name} left a stale ref after unmount`).toBeNull();
    });
  }

  it("hands back a focusable root for components that should have one", () => {
    const buttonRef = createRef<HTMLButtonElement>();
    render(<Button ref={buttonRef}>Save</Button>);
    const el = buttonRef.current!;
    expect(el.tagName).toBe("BUTTON");
    el.focus();
    expect(document.activeElement).toBe(el);
  });

  it("points at the real element, so consumers can measure it", () => {
    /* the failure this guards against is a ref that silently resolves to some
     * inner node: measuring would still "work", on the wrong box — so
     * identity, not presence, is the assertion */
    const { container } = render(<Card ref={card}>Body</Card>);
    const el = card.current!;
    expect(container.firstElementChild).toBe(el);
    expect(el.isConnected).toBe(true);
    expect(el.textContent).toBe("Body");
  });
});
