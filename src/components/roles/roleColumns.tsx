// Column definitions for the /roles admin table, consumed by DataTable
// (src/components/ui/DataTable.tsx). Mirrors src/components/menus/menuColumns.tsx.

import type { ColumnDef } from "@tanstack/react-table";
import { Check, ListChecks, Pencil, Trash2, X } from "lucide-react";
import type { Role } from "@/types/role";

function PermissionBadge({ label, granted }: { label: string; granted: boolean }) {
  return (
    <span
      title={granted ? `Puede ${label.toLowerCase()}` : `No puede ${label.toLowerCase()}`}
      className={`grid h-6 w-6 place-items-center rounded-full text-[10px] font-extrabold ${
        granted ? "bg-wv-mint-soft text-wv-teal-deep" : "bg-wv-bg-alt text-wv-faint"
      }`}
    >
      {granted ? (
        <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.5} />
      ) : (
        <X aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.5} />
      )}
    </span>
  );
}

type BuildRoleColumnsArgs = {
  onEdit: (role: Role) => void;
  onDelete: (role: Role) => void;
  onAssignMenus: (role: Role) => void;
};

export function buildRoleColumns({
  onEdit,
  onDelete,
  onAssignMenus,
}: BuildRoleColumnsArgs): ColumnDef<Role>[] {
  return [
    {
      id: "name",
      header: "Nombre",
      cell: ({ row }) => (
        <span className="truncate text-sm font-extrabold text-wv-navy">{row.original.name}</span>
      ),
    },
    {
      id: "slug",
      header: "Slug",
      cell: ({ row }) => (
        <span className="truncate text-[13px] font-bold text-wv-muted-2">{row.original.slug}</span>
      ),
    },
    {
      id: "description",
      header: "Descripción",
      cell: ({ row }) => (
        <span className="truncate text-[13px] font-semibold text-wv-muted">
          {row.original.description || "—"}
        </span>
      ),
    },
    {
      id: "permissions",
      header: "Permisos (R/C/U/D)",
      cell: ({ row }) => {
        const role = row.original;
        return (
          <div className="flex items-center gap-1.5">
            <PermissionBadge label="Leer" granted={role.canRead} />
            <PermissionBadge label="Crear" granted={role.canCreate} />
            <PermissionBadge label="Actualizar" granted={role.canUpdate} />
            <PermissionBadge label="Eliminar" granted={role.canDelete} />
          </div>
        );
      },
    },
    {
      id: "menus",
      header: "Menús asignados",
      cell: ({ row }) => {
        const count = row.original.menus?.length ?? 0;
        return (
          <span className="whitespace-nowrap rounded-full bg-wv-mint-soft px-2.5 py-1 text-[11px] font-extrabold text-wv-teal-deep">
            {count} menú{count === 1 ? "" : "s"}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: () => <span className="block text-right">Acciones</span>,
      cell: ({ row }) => {
        const role = row.original;
        return (
          <div className="flex items-center justify-end gap-1.5">
            <button
              type="button"
              onClick={() => onAssignMenus(role)}
              className="flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[10px] border border-wv-btn-border px-2.5 py-[7px] text-[12px] font-extrabold text-wv-teal outline-none transition-colors duration-150 ease-out hover:bg-wv-mint-soft focus-visible:shadow-focus"
            >
              <ListChecks aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.5} />
              Asignar menús
            </button>
            <button
              type="button"
              onClick={() => onEdit(role)}
              aria-label={`Editar ${role.name}`}
              className="grid h-9 w-9 cursor-pointer place-items-center rounded-[10px] text-wv-muted outline-none transition-colors duration-150 ease-out hover:bg-wv-mint-soft hover:text-wv-teal-deep focus-visible:shadow-focus"
            >
              <Pencil aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => onDelete(role)}
              aria-label={`Eliminar ${role.name}`}
              className="grid h-9 w-9 cursor-pointer place-items-center rounded-[10px] text-wv-muted outline-none transition-colors duration-150 ease-out hover:bg-danger-bg hover:text-danger focus-visible:shadow-focus"
            >
              <Trash2 aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={2} />
            </button>
          </div>
        );
      },
    },
  ];
}
