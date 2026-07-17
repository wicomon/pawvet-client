import { useEffect, useState } from "react";
import DataTable from "@/components/ui/DataTable";
import Alert from "@/components/ui/Alert";
import type { Role } from "@/types/role";
import type { Toast } from "@/types/ui.types";
import { buildRoleColumns } from "./roleColumns";
import RoleCreateForm from "./RoleCreateForm";
import RoleEditForm from "./RoleEditForm";
import AssignMenusForm from "./AssignMenusForm";
import ConfirmDialog from "./ConfirmDialog";

type RoleTableProps = {
  roles: Role[];
  loading?: boolean;
  error?: string | null;
};

// Wraps DataTable and also owns everything else about the Roles screen:
// the create/edit/assign-menus forms, the delete confirm dialog, and the
// toast. RolesManager only fetches the data. Mirrors
// src/components/menus/MenuTable.tsx. Roles are a flat list — no
// getSubRows, unlike the menu hierarchy.
export default function RoleTable({ roles, loading, error }: RoleTableProps) {
  const [formTarget, setFormTarget] = useState<Role | null | undefined>(undefined); // undefined = closed, null = create
  const [assignTarget, setAssignTarget] = useState<Role | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Role | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  const onToastSuccess = (message: string) => setToast({ kind: "success", message });
  const onToastError = (message: string) => setToast({ kind: "error", message });

  return (
    <>
      <DataTable
        title="Roles"
        description="Roles del sistema, sus permisos y los menús que tienen asignados."
        createLabel="Nuevo rol"
        emptyLabel="Aún no hay información creada."
        onCreate={() => setFormTarget(null)}
        loading={loading}
        error={error}
        data={roles}
        columns={buildRoleColumns({ onEdit: setFormTarget, onDelete: setDeleteTarget, onAssignMenus: setAssignTarget })}
        getRowId={(role) => role.id}
      >
        {toast && <Alert kind={toast.kind} message={toast.message} />}
      </DataTable>

      {formTarget === null && (
        <RoleCreateForm
          onClose={() => setFormTarget(undefined)}
          onSaved={(message) => {
            setFormTarget(undefined);
            onToastSuccess(message);
          }}
          onError={onToastError}
        />
      )}

      {formTarget && (
        <RoleEditForm
          role={formTarget}
          onClose={() => setFormTarget(undefined)}
          onSaved={(message) => {
            setFormTarget(undefined);
            onToastSuccess(message);
          }}
          onError={onToastError}
        />
      )}

      {assignTarget && (
        <AssignMenusForm
          role={assignTarget}
          onClose={() => setAssignTarget(null)}
          onSaved={(message) => {
            setAssignTarget(null);
            onToastSuccess(message);
          }}
          onError={onToastError}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          role={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onDeleted={(message) => {
            setDeleteTarget(null);
            onToastSuccess(message);
          }}
          onError={onToastError}
        />
      )}
    </>
  );
}
