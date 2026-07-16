import DataTable from "@/components/ui/DataTable";
import type { Role } from "@/types/role";
import { buildRoleColumns } from "./roleColumns";

type RoleTableProps = {
  roles: Role[];
  onEdit: (role: Role) => void;
  onDelete: (role: Role) => void;
  onAssignMenus: (role: Role) => void;
};

// Thin wrapper over DataTable, mirroring src/components/menus/MenuTable.tsx.
// Roles are a flat list — no getSubRows, unlike the menu hierarchy.
export default function RoleTable({ roles, onEdit, onDelete, onAssignMenus }: RoleTableProps) {
  const emptyState = (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-wv-border bg-card px-6 py-14 text-center">
      <p className="font-heading text-[15px] font-bold text-wv-navy">Aún no hay roles</p>
      <p className="text-[13.5px] font-semibold text-wv-muted">
        Crea el primer rol con el botón &quot;Nuevo rol&quot;.
      </p>
    </div>
  );

  return (
    <DataTable
      data={roles}
      columns={buildRoleColumns({ onEdit, onDelete, onAssignMenus })}
      getRowId={(role) => role.id}
      emptyState={emptyState}
    />
  );
}
