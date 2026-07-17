// Column definitions for the /users admin table, consumed by DataTable
// (src/components/ui/DataTable.tsx). Rows are grouped by company (nested
// rows, like /menus' parent -> submenu pattern) so a company row expands to
// show its users. Extracted into a factory because cells need row-level
// callbacks (edit/delete) that the table itself doesn't own.

import type { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronRight, Pencil, Trash2 } from "lucide-react";
import type { User } from "@/types/user";

// A "group" row represents one company; its `users` are exposed to DataTable
// via getSubRows so react-table can expand/collapse them. A "user" row is a
// leaf holding the actual User plus a `kind` discriminant.
export type UserGroupRow = {
  kind: "group";
  id: string;
  companyName: string;
  users: User[];
};

export type UserLeafRow = User & { kind: "user" };

export type UserRow = UserGroupRow | UserLeafRow;

type BuildUserColumnsArgs = {
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
};

export function buildUserColumns({ onEdit, onDelete }: BuildUserColumnsArgs): ColumnDef<UserRow>[] {
  return [
    {
      id: "name",
      header: "Nombre",
      cell: ({ row }) => {
        const original = row.original;
        return (
          <div className="flex items-center gap-1.5">
            {row.getCanExpand() ? (
              <button
                type="button"
                onClick={row.getToggleExpandedHandler()}
                aria-label={row.getIsExpanded() ? "Colapsar usuarios" : "Expandir usuarios"}
                className="grid h-6 w-6 cursor-pointer place-items-center rounded-lg text-wv-muted outline-none transition-colors duration-150 ease-out hover:bg-wv-mint-soft hover:text-wv-teal-deep focus-visible:shadow-focus"
              >
                {row.getIsExpanded() ? (
                  <ChevronDown aria-hidden="true" className="h-4 w-4" strokeWidth={2.5} />
                ) : (
                  <ChevronRight aria-hidden="true" className="h-4 w-4" strokeWidth={2.5} />
                )}
              </button>
            ) : (
              <span className="w-6" />
            )}
            {original.kind === "group" ? (
              <span className="truncate font-heading text-sm font-bold text-wv-navy">
                {original.companyName}{" "}
                <span className="text-[12px] font-semibold text-wv-faint">
                  ({original.users.length})
                </span>
              </span>
            ) : (
              <span className="truncate text-[13px] font-extrabold text-wv-navy">
                {original.firstName} {original.lastName}
              </span>
            )}
          </div>
        );
      },
    },
    {
      id: "email",
      header: "Correo",
      cell: ({ row }) =>
        row.original.kind === "user" ? (
          <span className="truncate text-[13px] font-semibold text-wv-muted-2">
            {row.original.email}
          </span>
        ) : null,
    },
    {
      id: "role",
      header: "Rol",
      cell: ({ row }) => {
        if (row.original.kind !== "user") return null;
        const role = row.original.role;
        return (
          <span className="whitespace-nowrap rounded-full bg-wv-mint-soft px-2.5 py-1 text-[11px] font-extrabold text-wv-teal-deep">
            {role?.name ?? role?.slug ?? "—"}
          </span>
        );
      },
    },
    {
      id: "isActive",
      header: "Estado",
      cell: ({ row }) => {
        if (row.original.kind !== "user") return null;
        const isActive = row.original.isActive !== false;
        return (
          <span
            className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-extrabold ${
              isActive ? "bg-wv-mint-soft text-wv-teal-deep" : "bg-danger-bg text-danger"
            }`}
          >
            {isActive ? "Activo" : "Inactivo"}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: () => <span className="block text-right">Acciones</span>,
      cell: ({ row }) => {
        if (row.original.kind !== "user") return null;
        const user = row.original;
        return (
          <div className="flex items-center justify-end gap-1.5">
            <button
              type="button"
              onClick={() => onEdit(user)}
              aria-label={`Editar ${user.firstName} ${user.lastName}`}
              className="grid h-9 w-9 cursor-pointer place-items-center rounded-[10px] text-wv-muted outline-none transition-colors duration-150 ease-out hover:bg-wv-mint-soft hover:text-wv-teal-deep focus-visible:shadow-focus"
            >
              <Pencil aria-hidden="true" className="h-4.5 w-4.5" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => onDelete(user)}
              aria-label={`Eliminar ${user.firstName} ${user.lastName}`}
              className="grid h-9 w-9 cursor-pointer place-items-center rounded-[10px] text-wv-muted outline-none transition-colors duration-150 ease-out hover:bg-danger-bg hover:text-danger focus-visible:shadow-focus"
            >
              <Trash2 aria-hidden="true" className="h-4.5 w-4.5" strokeWidth={2} />
            </button>
          </div>
        );
      },
    },
  ];
}
