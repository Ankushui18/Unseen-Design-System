import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DataTable, type DataTableColumn } from "@/ui/ProductPatterns";

type Row = { id: string; name: string; seats: number };

const ROWS: Row[] = [
  { id: "1", name: "Zeta", seats: 2 },
  { id: "2", name: "Alpha", seats: 9 },
  { id: "3", name: "Mira", seats: 1 },
];

const COLUMNS: DataTableColumn<Row>[] = [
  { key: "name", header: "Name", sortable: true, sortKey: (r) => r.name, render: (r) => r.name },
  { key: "seats", header: "Seats", align: "right", sortable: true, sortKey: (r) => r.seats, render: (r) => r.seats },
];

const bodyRowText = () =>
  screen
    .getAllByRole("row")
    .slice(1)
    .map((tr) => tr.textContent);

describe("DataTable", () => {
  it("renders rows in source order by default", () => {
    render(<DataTable columns={COLUMNS} rows={ROWS} rowKey={(r) => r.id} />);
    expect(bodyRowText()).toEqual(["Zeta2", "Alpha9", "Mira1"]);
  });

  it("sorts ascending then descending, with aria-sort on the column header", async () => {
    const user = userEvent.setup();
    render(<DataTable columns={COLUMNS} rows={ROWS} rowKey={(r) => r.id} />);

    const nameHeader = screen.getByRole("columnheader", { name: /Name/ });
    expect(nameHeader).not.toHaveAttribute("aria-sort");

    await user.click(screen.getByRole("button", { name: /Name/ }));
    expect(bodyRowText()).toEqual(["Alpha9", "Mira1", "Zeta2"]);
    expect(nameHeader).toHaveAttribute("aria-sort", "ascending");

    await user.click(screen.getByRole("button", { name: /Name/ }));
    expect(bodyRowText()).toEqual(["Zeta2", "Mira1", "Alpha9"]);
    expect(nameHeader).toHaveAttribute("aria-sort", "descending");

    // switching columns moves aria-sort off the name header entirely
    await user.click(screen.getByRole("button", { name: /Seats/ }));
    expect(bodyRowText()).toEqual(["Mira1", "Zeta2", "Alpha9"]);
    expect(nameHeader).not.toHaveAttribute("aria-sort");
    expect(screen.getByRole("columnheader", { name: /Seats/ })).toHaveAttribute("aria-sort", "ascending");
  });

  it("selects rows individually and clears via the bulk bar", async () => {
    const user = userEvent.setup();
    render(<DataTable columns={COLUMNS} rows={ROWS} rowKey={(r) => r.id} selectable />);

    expect(screen.queryByText(/selected$/)).not.toBeInTheDocument();
    await user.click(screen.getAllByLabelText("Select row")[0]);
    expect(screen.getByText("1 selected")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Clear" }));
    expect(screen.queryByText("1 selected")).not.toBeInTheDocument();
  });

  it("selects all rows and passes them to bulk actions", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    render(
      <DataTable
        columns={COLUMNS}
        rows={ROWS}
        rowKey={(r) => r.id}
        selectable
        bulkActions={[{ id: "delete", label: "Delete", tone: "danger", onSelect: onDelete }]}
      />,
    );

    await user.click(screen.getByLabelText("Select all rows"));
    expect(screen.getByText("3 selected")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Delete" }));
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete.mock.calls[0][0]).toHaveLength(3);
    // selection resets after the action
    expect(screen.queryByText("3 selected")).not.toBeInTheDocument();
  });

  it("renders skeleton rows while loading instead of data", () => {
    render(<DataTable columns={COLUMNS} rows={ROWS} rowKey={(r) => r.id} loading />);
    expect(screen.queryByText("Zeta")).not.toBeInTheDocument();
    expect(screen.getAllByRole("row").length).toBeGreaterThan(3);
  });

  it("renders the empty state when there are no rows", () => {
    render(<DataTable columns={COLUMNS} rows={[]} rowKey={(r) => r.id} emptyState={<p>No teammates yet</p>} />);
    const table = screen.getByRole("table");
    expect(within(table).getByText("No teammates yet")).toBeInTheDocument();
  });

  it("shows pagination summary when configured", () => {
    const onPageChange = vi.fn();
    render(
      <DataTable columns={COLUMNS} rows={ROWS} rowKey={(r) => r.id} pagination={{ page: 2, totalPages: 5, onPageChange }} />,
    );
    expect(screen.getByText("Page 2 of 5")).toBeInTheDocument();
  });
});
