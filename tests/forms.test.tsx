import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { DigitInput } from "@/ui/Extra";
import { Slider, Switch } from "@/ui/Form";

/* ------------------------------- DigitInput ------------------------------- */

function DigitHarness({ onChange, length = 4 }: { onChange: (v: string) => void; length?: number }) {
  const [v, setV] = useState("");
  return (
    <DigitInput
      length={length}
      value={v}
      onChange={(nv) => {
        setV(nv);
        onChange(nv);
      }}
    />
  );
}

describe("DigitInput", () => {
  it("types digits, strips non-numerics and auto-advances focus", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<DigitHarness onChange={onChange} />);

    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(4);

    inputs[0].focus();
    await user.keyboard("5");
    expect(onChange).toHaveBeenLastCalledWith("5");
    expect(document.activeElement).toBe(inputs[1]);

    await user.keyboard("7");
    expect(onChange).toHaveBeenLastCalledWith("57");
    expect(document.activeElement).toBe(inputs[2]);
  });

  it("moves focus left on ArrowLeft/Backspace and right on ArrowRight", async () => {
    const user = userEvent.setup();
    render(<DigitHarness onChange={vi.fn()} />);
    const inputs = screen.getAllByRole("textbox");

    await user.keyboard("{Tab}");
    expect(document.activeElement).toBe(inputs[0]);

    await user.keyboard("{ArrowRight}");
    expect(document.activeElement).toBe(inputs[1]);
    await user.keyboard("{ArrowLeft}");
    expect(document.activeElement).toBe(inputs[0]);

    // Backspace on an empty digit jumps to the previous cell
    inputs[2].focus();
    await user.keyboard("{Backspace}");
    expect(document.activeElement).toBe(inputs[1]);
  });

  it("pastes a multi-digit code across the cells", () => {
    const onChange = vi.fn();
    render(<DigitHarness onChange={onChange} />);
    const inputs = screen.getAllByRole("textbox");

    fireEvent.paste(inputs[0], { clipboardData: { getData: () => "9a27b1" } });
    expect(onChange).toHaveBeenCalledWith("9271");
    // focus lands on the last filled cell
    expect(document.activeElement).toBe(inputs[3]);
  });

  it("labels every cell for assistive technology", () => {
    render(<DigitInput value="" onChange={() => {}} length={6} />);
    for (let i = 1; i <= 6; i++) expect(screen.getByLabelText(`Digit ${i}`)).toBeInTheDocument();
  });
});

/* ---------------------------------- Switch --------------------------------- */

describe("Switch", () => {
  it("exposes switch semantics and toggles via click", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    function Harness() {
      const [on, setOn] = useState(false);
      return (
        <Switch
          checked={on}
          onChange={(v) => {
            setOn(v);
            onChange(v);
          }}
          label="Email notifications"
        />
      );
    }
    render(<Harness />);

    const sw = screen.getByRole("switch", { name: "Email notifications" });
    expect(sw).toHaveAttribute("aria-checked", "false");

    await user.click(sw);
    expect(onChange).toHaveBeenCalledWith(true);
    expect(sw).toHaveAttribute("aria-checked", "true");
  });

  it("is nameable with aria-label when no visible label exists", () => {
    render(<Switch checked onChange={() => {}} aria-label="Annual billing" />);
    expect(screen.getByRole("switch", { name: "Annual billing" })).toBeChecked();
  });

  it("respects disabled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Switch checked={false} onChange={onChange} disabled aria-label="Nope" />);
    const sw = screen.getByRole("switch", { name: "Nope" });
    expect(sw).toBeDisabled();
    await user.click(sw);
    expect(onChange).not.toHaveBeenCalled();
  });
});

/* ---------------------------------- Slider --------------------------------- */

describe("Slider", () => {
  it("associates its visible label with the range input", () => {
    render(<Slider value={30} onChange={() => {}} label="Volume" />);
    const input = screen.getByLabelText("Volume");
    expect(input).toHaveAttribute("type", "range");
    expect(input).toHaveValue("30");
  });

  it("falls back to aria-label without a visible label", () => {
    render(<Slider value={16} onChange={() => {}} min={16} max={32} aria-label="Preview icon size" />);
    const input = screen.getByLabelText("Preview icon size");
    expect(input).toHaveAttribute("min", "16");
    expect(input).toHaveAttribute("max", "32");
  });

  it("emits numeric values on change", () => {
    const onChange = vi.fn();
    render(<Slider value={30} onChange={onChange} label="Volume" min={0} max={100} step={5} />);
    fireEvent.change(screen.getByLabelText("Volume"), { target: { value: "40" } });
    expect(onChange).toHaveBeenCalledWith(40);
  });
});
