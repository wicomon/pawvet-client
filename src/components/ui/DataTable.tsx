"use client";

// Generic table wrapper around @tanstack/react-table (headless — no styles of
// its own), themed with our wv-* design tokens instead of Tailwind's default
// palette. This is the default building block for any admin table in the
// app: screens define `columns` + `data`, they don't hand-roll markup.
//
// Row expansion (`getSubRows`) is opt-in: pass it when rows can nest (e.g.
// menu -> submenus). The toggle control itself lives in a column cell (see
// src/components/menus/menuColumns.tsx), not here, so callers decide where
// the chevron sits in the row.

import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import type { ReactNode } from "react";

type DataTableProps<T> = {
  columns: ColumnDef<T>[];
  data: T[];
  getSubRows?: (row: T) => T[] | undefined;
  getRowId?: (row: T) => string;
  emptyState?: ReactNode;
};

export default function DataTable<T>({
  columns,
  data,
  getSubRows,
  getRowId,
  emptyState,
}: DataTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...(getSubRows
      ? { getSubRows, getExpandedRowModel: getExpandedRowModel() }
      : {}),
    getRowId,
  });

  if (data.length === 0 && emptyState) {
    return <>{emptyState}</>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] border-separate border-spacing-y-1.5">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-3.5 pb-1.5 text-left text-[11.5px] font-extrabold tracking-[0.05em] text-wv-faint uppercase"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            const cells = row.getVisibleCells();
            const rowBg = row.depth > 0 ? "border-wv-row-border/70 bg-wv-bg-alt" : "border-wv-row-border";
            const rowPad = row.depth > 0 ? "py-[10px]" : "py-[13px]";
            return (
              <tr key={row.id}>
                {cells.map((cell, i) => (
                  <td
                    key={cell.id}
                    className={`border-y px-3.5 ${rowPad} ${rowBg} ${
                      i === 0 ? "rounded-l-[10px] border-l" : ""
                    } ${i === cells.length - 1 ? "rounded-r-[10px] border-r" : ""}`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
