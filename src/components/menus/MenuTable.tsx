import DataTable from "@/components/ui/DataTable";
import type { Menu } from "@/types/menu";
import { buildMenuColumns } from "./menuColumns";

type MenuTableProps = {
  menus: Menu[];
  onEdit: (menu: Menu) => void;
  onDelete: (menu: Menu) => void;
  onAddSubmenu: (parentId: string) => void;
};

export default function MenuTable({ menus, onEdit, onDelete, onAddSubmenu }: MenuTableProps) {
  const emptyState = (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-wv-border bg-card px-6 py-14 text-center">
      <p className="font-heading text-[15px] font-bold text-wv-navy">Aún no hay menús</p>
      <p className="text-[13.5px] font-semibold text-wv-muted">
        Crea el primer menú raíz con el botón &quot;Nuevo menú&quot;.
      </p>
    </div>
  );

  return (
    <DataTable
      data={menus}
      columns={buildMenuColumns({ onEdit, onDelete, onAddSubmenu })}
      getRowId={(menu) => menu.id}
      getSubRows={(menu) =>
        menu.subMenu
          ?.filter((child) => child.isActive !== false)
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      }
      emptyState={emptyState}
    />
  );
}
