import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { DataTable } from "./DataTable";

const meta: Meta<typeof DataTable> = {
  title: "Components/DataTable",
  component: DataTable,
};
export default meta;

type Story = StoryObj<typeof DataTable>;

const sampleData = [
  { id: 1, name: "Alice", age: 24 },
  { id: 2, name: "Bob", age: 28 },
  { id: 3, name: "Charlie", age: 30 },
];

const sampleColumns = [
  { key: "id", title: "ID", dataIndex: "id", sortable: true },
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

export const Default: Story = {
  args: {
    data: sampleData,
    columns: sampleColumns,
    selectable: true,
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns: sampleColumns,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns: sampleColumns,
  },
};
