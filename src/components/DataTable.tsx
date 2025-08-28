import React, { useState } from "react";

interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T | string;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  caption?: string;
}

export function DataTable<T extends { id: number | string }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  caption = "Data table",
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof T] as unknown as string | number;
      const bValue = b[sortConfig.key as keyof T] as unknown as string | number;
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const toggleRow = (row: T) => {
    const updated = selectedRows.includes(row)
      ? selectedRows.filter((r) => r !== row)
      : [...selectedRows, row];
    setSelectedRows(updated);
    onRowSelect?.(updated);
  };

  const handleSort = (key: string) => {
    setSortConfig((prev) =>
      prev && prev.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    );
  };

  // Loading / Empty states are announced politely
  if (loading)
    return (
      <div role="status" aria-live="polite" className="p-4 text-gray-500">
        ⏳ Loading…
      </div>
    );

  if (!data.length)
    return (
      <div role="status" aria-live="polite" className="p-4 text-gray-500">
        📭 No data available
      </div>
    );

  return (
    <table className="w-full border-collapse border border-gray-300" role="table" aria-rowcount={sortedData.length}>
      <caption className="sr-only">{caption}</caption>
      <thead className="bg-gray-100">
        <tr>
          {selectable && <th className="border p-2" scope="col" />}
          {columns.map((c) => {
            const isSorted = sortConfig?.key === c.dataIndex;
            const ariaSort = isSorted ? (sortConfig!.direction === "asc" ? "ascending" : "descending") : "none";
            return (
              <th key={c.key} className="border p-2" scope="col" aria-sort={ariaSort as React.AriaAttributes["aria-sort"]}>
                {c.sortable ? (
                  <button
                    type="button"
                    onClick={() => handleSort(c.dataIndex as string)}
                    className="flex items-center gap-1"
                    aria-label={`Sort by ${c.title}`}
                  >
                    {c.title}
                    <span aria-hidden="true" className="text-xs">
                      {isSorted ? (sortConfig!.direction === "asc" ? "▲" : "▼") : ""}
                    </span>
                  </button>
                ) : (
                  c.title
                )}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row) => {
          const isSelected = selectedRows.includes(row);
          return (
            <tr key={row.id} className="hover:bg-gray-50" aria-selected={isSelected}>
              {selectable && (
                <td className="border p-2 text-center">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleRow(row)}
                    aria-label={`Select row ${String(row.id)}`}
                  />
                </td>
              )}
              {columns.map((c) => (
                <td key={c.key} className="border p-2">
                  {String(row[c.dataIndex as keyof T])}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
