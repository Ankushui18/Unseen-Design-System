import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { Datepicker } from "@/ui/Extra";

function Harness({ initial, onChange }: { initial: Date | null; onChange: (d: Date) => void }) {
  const [v, setV] = useState<Date | null>(initial);
  return (
    <Datepicker
      value={v}
      onChange={(d) => {
        setV(d);
        onChange(d);
      }}
    />
  );
}

describe("Datepicker", () => {
  it("shows the month of the current value", () => {
    render(<Datepicker value={new Date(2026, 8, 17)} onChange={() => {}} />);
    expect(screen.getByText("September 2026")).toBeInTheDocument();
    expect(screen.getByText(/17 Sep 2026|Sep 17, 2026/)).toBeInTheDocument();
  });

  it("navigates months with previous/next controls", async () => {
    const user = userEvent.setup();
    render(<Datepicker value={new Date(2026, 8, 17)} onChange={() => {}} />);

    await user.click(screen.getByRole("button", { name: "Next month" }));
    expect(screen.getByText("October 2026")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Previous month" }));
    await user.click(screen.getByRole("button", { name: "Previous month" }));
    expect(screen.getByText("August 2026")).toBeInTheDocument();
  });

  it("emits the chosen date when a day cell is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Harness initial={new Date(2026, 8, 1)} onChange={onChange} />);

    // 20 can never be a spillover day (only leading/trailing week cells spill)
    await user.click(screen.getByRole("button", { name: "20" }));
    expect(onChange).toHaveBeenCalledTimes(1);
    const picked: Date = onChange.mock.calls[0][0];
    expect([picked.getFullYear(), picked.getMonth(), picked.getDate()]).toEqual([2026, 8, 20]);
  });

  it("jumps back to today", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Harness initial={new Date(2020, 0, 10)} onChange={onChange} />);
    expect(screen.getByText("January 2020")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Today" }));
    const today: Date = onChange.mock.calls[0][0];
    const now = new Date();
    expect(today.getDate()).toBe(now.getDate());
    expect(screen.getByText(`${["January","February","March","April","May","June","July","August","September","October","November","December"][now.getMonth()]} ${now.getFullYear()}`)).toBeInTheDocument();
  });
});
