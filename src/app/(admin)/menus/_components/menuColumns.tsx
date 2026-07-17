// Column definitions for the /menus admin table, consumed by DataTable
// (src/components/ui/DataTable.tsx). Extracted into a factory because cells
// need row-level callbacks (edit/delete/add-submenu) that the table itself
// doesn't own.

import type { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronRight, Pencil, Trash2 } from "lucide-react";
import { resolveMenuIcon } from "@/lib/menuIcons";
import type { Menu } from "@/types/menu";

// Shared with MenuFormModal's read-only summaries would live here too if
// they ever needed these labels — for now this is the single place they're
// defined, so they can't drift the way the old MenuRow duplicate could have.
export const MENU_TYPE_LABEL: Record<string, string> = { link: "Enlace", dropdown: "Desplegable" };
export const MENU_POSITION_LABEL: Record<string, string> = {
  sidebar: "Barra lateral",
  topbar: "Barra superior",
};

type BuildMenuColumnsArgs = {
  onEdit: (menu: Menu) => void;
  onDelete: (menu: Menu) => void;
  onAddSubmenu: (parentId: string) => void;
};

export function buildMenuColumns({
  onEdit,
  onDelete,
  onAddSubmenu,
}: BuildMenuColumnsArgs): ColumnDef<Menu>[] {
  return [
    {
      id: "icon",
      header: "Ícono",
      cell: ({ row }) => {
        const menu = row.original;
        const Icon = resolveMenuIcon(menu.icon);
        const isChild = row.depth > 0;
        return (
          <div className="flex items-center gap-1.5">
            {row.getCanExpand() ? (
              <button
                type="button"
                onClick={row.getToggleExpandedHandler()}
                aria-label={row.getIsExpanded() ? "Colapsar submenús" : "Expandir submenús"}
                className="grid h-6 w-6 cursor-pointer place-items-center rounded-[8px] text-wv-muted outline-none transition-colors duration-150 ease-out hover:bg-wv-mint-soft hover:text-wv-teal-deep focus-visible:shadow-focus"
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
            <span
              className={`grid place-items-center rounded-[9px] bg-wv-mint-soft ${
                isChild ? "h-7 w-7" : "h-8 w-8"
              }`}
            >
              <Icon
                aria-hidden="true"
                className={isChild ? "h-3.5 w-3.5" : "h-4 w-4"}
                color="var(--color-wv-teal-deep)"
                strokeWidth={2}
              />
            </span>
          </div>
        );
      },
    },
    {
      id: "code",
      header: "Código",
      cell: ({ row }) => (
        <span
          className={`truncate font-bold text-wv-navy ${
            row.depth > 0 ? "text-[12.5px]" : "text-[13px]"
          }`}
        >
          {row.original.code}
        </span>
      ),
    },
    {
      id: "name",
      header: "Nombre",
      cell: ({ row }) => (
        <span
          className={`truncate font-extrabold text-wv-navy ${
            row.depth > 0 ? "text-[13px]" : "text-sm"
          }`}
        >
          {row.original.name}
        </span>
      ),
    },
    {
      id: "path",
      header: "Ruta",
      cell: ({ row }) => (
        <span className="truncate text-[13px] font-semibold text-wv-muted-2">
          {row.original.path}
        </span>
      ),
    },
    {
      id: "type",
      header: "Tipo",
      cell: ({ row }) => {
        const menu = row.original;
        return (
          <span className="text-[13px] font-bold text-wv-muted-2">
            {MENU_TYPE_LABEL[menu.type] ?? menu.type}
            <span className="block text-[11.5px] font-semibold text-wv-faint">
              {MENU_POSITION_LABEL[menu.position] ?? menu.position}
            </span>
          </span>
        );
      },
    },
    {
      id: "order",
      header: "Orden",
      cell: ({ row }) => (
        <span className="text-[13px] font-bold text-wv-muted-2">{row.original.order ?? "—"}</span>
      ),
    },
    {
      id: "actions",
      header: () => <span className="block text-right">Acciones</span>,
      cell: ({ row }) => {
        const menu = row.original;
        const children = menu.subMenu?.filter((child) => child.isActive !== false) ?? [];
        const isRootDropdown = row.depth === 0 && menu.type === "dropdown";
        return (
          <div className="flex items-center justify-end gap-1.5">
            {isRootDropdown && children.length > 0 && (
              <span className="whitespace-nowrap rounded-full bg-wv-mint-soft px-2.5 py-1 text-[11px] font-extrabold text-wv-teal-deep">
                {children.length} submenú{children.length === 1 ? "" : "s"}
              </span>
            )}
            {isRootDropdown && (
              <button
                type="button"
                onClick={() => onAddSubmenu(menu.id)}
                className="cursor-pointer whitespace-nowrap rounded-[10px] border border-wv-btn-border px-2.5 py-1.75 text-[12px] font-extrabold text-wv-teal outline-none transition-colors duration-150 ease-out hover:bg-wv-mint-soft focus-visible:shadow-focus"
              >
                + Submenú
              </button>
            )}
            <button
              type="button"
              onClick={() => onEdit(menu)}
              aria-label={`Editar ${menu.name}`}
              className="grid h-9 w-9 cursor-pointer place-items-center rounded-[10px] text-wv-muted outline-none transition-colors duration-150 ease-out hover:bg-wv-mint-soft hover:text-wv-teal-deep focus-visible:shadow-focus"
            >
              <Pencil aria-hidden="true" className="h-4.5 w-4.5" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => onDelete(menu)}
              aria-label={`Eliminar ${menu.name}`}
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
