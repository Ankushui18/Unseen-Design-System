import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "@/ui/Button";
import { Drawer, Modal } from "@/ui/Overlay";

/** Renders a labelled trigger + open-state harness (focus starts on the trigger). */
function ModalHarness({ onClose }: { onClose: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          onClose();
        }}
        title="Invite teammates"
        description="They'll get an email."
        footer={<Button>Send invites</Button>}
      >
        <p>Body content</p>
        <Button variant="outline">Secondary action</Button>
      </Modal>
    </>
  );
}

describe("Modal", () => {
  it("renders nothing while closed, dialog with name when open", async () => {
    render(<Modal open={false} onClose={() => {}} title="Hidden" />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    render(<Modal open onClose={() => {}} title="Invite teammates" />);
    const dialog = screen.getByRole("dialog", { name: "Invite teammates" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("falls back to a generic accessible name without a title", () => {
    render(<Modal open onClose={() => {}}><p>x</p></Modal>);
    expect(screen.getByRole("dialog", { name: "Dialog" })).toBeInTheDocument();
  });

  it("moves focus inside on open and returns it on close", async () => {
    const user = userEvent.setup();
    render(<ModalHarness onClose={vi.fn()} />);
    const trigger = screen.getByRole("button", { name: "Open dialog" });
    trigger.focus();

    await user.click(trigger);
    const dialog = await screen.findByRole("dialog", { name: "Invite teammates" });
    await waitFor(() => expect(dialog).toContainElement(document.activeElement as HTMLElement));

    const close = screen.getByRole("button", { name: "Close" });
    await user.click(close);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("closes on Escape and on backdrop click", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const { rerender } = render(
      <Modal open onClose={onClose} title="Esc test" footer={<Button>ok</Button>}><p>b</p></Modal>,
    );

    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);

    rerender(
      <Modal open onClose={onClose} title="Backdrop test" footer={<Button>ok</Button>}><p>b</p></Modal>,
    );
    await user.click(document.querySelector(".bg-backdrop") as HTMLElement);
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it("traps Tab within the dialog", async () => {
    render(
      <Modal open onClose={() => {}} title="Trap" footer={<Button>Confirm</Button>}>
        <Button variant="outline">Middle</Button>
      </Modal>,
    );
    const dialog = screen.getByRole("dialog", { name: "Trap" });
    await waitFor(() => expect(dialog).toContainElement(document.activeElement as HTMLElement));

    const close = screen.getByRole("button", { name: "Close" });
    const confirm = screen.getByRole("button", { name: "Confirm" });

    // forward from the last focusable wraps to the first
    confirm.focus();
    fireEvent.keyDown(confirm, { key: "Tab" });
    expect(close).toHaveFocus();

    // shift+Tab from the first wraps to the last
    fireEvent.keyDown(close, { key: "Tab", shiftKey: true });
    expect(confirm).toHaveFocus();
  });

  it("locks body scroll while open and restores it on close", () => {
    const { rerender } = render(<Modal open onClose={() => {}} title="Lock"><p>b</p></Modal>);
    expect(document.body.style.overflow).toBe("hidden");
    rerender(<Modal open={false} onClose={() => {}} title="Lock" />);
    expect(document.body.style.overflow).toBe("");
  });
});

describe("Drawer", () => {
  it("opens on the requested side and closes on Escape", () => {
    const onClose = vi.fn();
    render(
      <Drawer open onClose={onClose} title="Filters" side="left">
        <p>facet list</p>
      </Drawer>,
    );
    const dialog = screen.getByRole("dialog", { name: "Filters" });
    expect(dialog.className).toContain("inset-y-0");
    expect(dialog.className).toContain("left-0");

    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("respects the width prop", () => {
    render(
      <Drawer open onClose={() => {}} title="Wide" width={560}>
        <p>p</p>
      </Drawer>,
    );
    expect(screen.getByRole("dialog", { name: "Wide" })).toHaveStyle({ width: "560px" });
  });
});
