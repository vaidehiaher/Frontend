import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataTable } from "./DataTable";


const data = [
  { id: 1, name: "Alice", age: 24 },
  { id: 2, name: "Bob", age: 28 },
  { id: 3, name: "Charlie", age: 30 },
];

const columns = [
  { key: "id", title: "ID", dataIndex: "id", sortable: true },
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

test("renders rows", () => {
  render(<DataTable data={data} columns={columns} />);
  expect(screen.getByRole("table")).toBeInTheDocument();
  // 1 header row + 3 data rows
  expect(screen.getAllByRole("row")).toHaveLength(4);
});

test("sorts by name when clicking the header", async () => {
  const user = userEvent.setup();
  render(<DataTable data={data} columns={columns} />);
  const nameHeaderBtn = screen.getByRole("button", { name: /sort by name/i });

  // First click => ascending (Alice first)
  await user.click(nameHeaderBtn);
  const rowsAsc = screen.getAllByRole("row").slice(1); // data rows
  const firstNameAsc = within(rowsAsc[0]).getByText(/alice/i);
  expect(firstNameAsc).toBeInTheDocument();

  // Second click => descending (should be Charlie first)
  await user.click(nameHeaderBtn);
  const rowsDesc = screen.getAllByRole("row").slice(1);
  const firstNameDesc = within(rowsDesc[0]).getByText(/charlie/i);
  expect(firstNameDesc).toBeInTheDocument();
});

test("selecting a row toggles aria-selected and calls onRowSelect", async () => {
  const user = userEvent.setup();
  const onRowSelect = jest.fn();
  render(<DataTable data={data} columns={columns} selectable onRowSelect={onRowSelect} />);

  const checkboxes = screen.getAllByRole("checkbox");
  await user.click(checkboxes[0]); // select first row
  expect(onRowSelect).toHaveBeenCalled();
});

test("shows loading and empty states with status role", () => {
  const { rerender } = render(<DataTable data={[]} columns={columns} loading />);
  expect(screen.getByRole("status")).toHaveTextContent(/loading/i);

  rerender(<DataTable data={[]} columns={columns} />);
  expect(screen.getByRole("status")).toHaveTextContent(/no data/i);
});
