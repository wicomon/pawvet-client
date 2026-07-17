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
import { Plus } from "lucide-react";
import type { ReactNode } from "react";

type DataTableProps<T> = {
  columns: ColumnDef<T>[];
  data: T[];
  getSubRows?: (row: T) => T[] | undefined;
  getRowId?: (row: T) => string;
  emptyLabel?: string;
  title: string;
  description?: string;
  createLabel?: string;
  onCreate?: () => void;
  loading?: boolean;
  error?: string | null;
  children?: ReactNode;
};

export default function DataTable<T>({
  columns,
  data,
  getSubRows,
  getRowId,
  emptyLabel = "Aún no hay información creada.",
  title,
  description,
  createLabel,
  onCreate,
  loading,
  error,
  children,
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

  return (
    <section className="flex flex-col gap-3.5 rounded-2xl border border-wv-border bg-card px-6 py-5.5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-heading text-[17px] font-bold text-wv-navy">{title}</h2>
          {description && (
            <p className="text-[13px] font-semibold text-wv-muted">{description}</p>
          )}
        </div>
        {onCreate && (
          <button
            type="button"
            onClick={onCreate}
            className="flex cursor-pointer items-center gap-1.5 rounded-[10px] bg-wv-teal px-3.5 py-2.25 text-[13px] font-extrabold text-white outline-none transition-colors duration-150 ease-out hover:bg-wv-teal-hover focus-visible:shadow-focus"
          >
            <Plus aria-hidden="true" className="h-4 w-4" strokeWidth={2.5} />
            {createLabel}
          </button>
        )}
      </div>

      {children}

      {loading ? (
        <div className="flex flex-col gap-1.5" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-13 animate-pulse rounded-[10px] bg-wv-bg-alt" />
          ))}
        </div>
      ) : error ? (
        <div
          role="alert"
          className="rounded-xl bg-danger-bg px-3.5 py-2.5 text-[13px] font-semibold text-danger"
        >
          {error}
        </div>
      ) : data.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-wv-border bg-card px-6 py-14 text-center">
          <p className="font-heading text-[15px] font-bold text-wv-navy">{emptyLabel}</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-190 border-separate border-spacing-y-1.5">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-3.5 pb-1.5 text-left text-[11.5px] font-extrabold tracking-wider text-wv-faint uppercase"
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
                const rowPad = row.depth > 0 ? "py-2.5" : "py-3.25";
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
      )}
    </section>
  );
}
