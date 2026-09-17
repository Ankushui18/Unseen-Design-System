import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { Combobox } from "@/ui/Patterns";

const CITIES = [
  { value: "ny", label: "New York" },
  { value: "sf", label: "San Francisco" },
  { value: "la", label: "Los Angeles" },
];

function Harness({ onChange }: { onChange: (v: string) => void }) {
  const [v, setV] = useState<string | null>(null);
  return (
    <div>
      <Combobox
        items={CITIES}
        value={v}
        onChange={(nv) => {
          setV(nv);
          onChange(nv);
        }}
        label="City"
        placeholder="Pick a city…"
      />
      <button type="button">elsewhere</button>
    </div>
  );
}

describe("Combobox", () => {
  it("opens on trigger click and focuses the search input", async () => {
    const user = userEvent.setup();
    render(<Harness onChange={vi.fn()} />);

    const trigger = screen.getByRole("button", { name: /Pick a city/ });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveAttribute("aria-haspopup", "listbox");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(document.activeElement).toBe(screen.getByPlaceholderText("Search…"));
  });

  it("filters options as you type and selects with the keyboard", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Harness onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: /Pick a city/ }));
    await user.keyboard("san");

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(1);
    expect(options[0]).toHaveTextContent("San Francisco");

    await user.keyboard("{Enter}");
    expect(onChange).toHaveBeenCalledWith("sf");
    // closes, query resets, trigger reflects the selection
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /San Francisco/ })).toBeInTheDocument();
  });

  it("moves the active option with arrow keys before Enter", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Harness onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: /Pick a city/ }));
    await user.keyboard("{ArrowDown}{ArrowDown}{Enter}");
    expect(onChange).toHaveBeenCalledWith("la");
  });

  it("shows an empty state for unmatched queries", async () => {
    const user = userEvent.setup();
    render(<Harness onChange={vi.fn()} />);

    await user.click(screen.getByRole("button", { name: /Pick a city/ }));
    await user.keyboard("zzzz");
    expect(within(screen.getByRole("listbox")).getByText("No results")).toBeInTheDocument();
    expect(screen.queryByRole("option")).not.toBeInTheDocument();
  });

  it("closes on Escape and on outside pointer", async () => {
    const user = userEvent.setup();
    render(<Harness onChange={vi.fn()} />);
    const trigger = screen.getByRole("button", { name: /Pick a city/ });

    await user.click(trigger);
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    await user.click(trigger);
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await user.click(screen.getByText("elsewhere"));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("mouse-enter moves the cursor, click selects", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Harness onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: /Pick a city/ }));
    await user.hover(screen.getByRole("option", { name: /Los Angeles/ }));
    await user.keyboard("{Enter}");
    expect(onChange).toHaveBeenCalledWith("la");
  });
});
