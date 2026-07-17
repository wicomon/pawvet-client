import { useEffect, useState } from "react";
import DataTable from "@/components/ui/DataTable";
import Alert from "@/components/ui/Alert";
import type { Menu } from "@/types/menu";
import type { Toast } from "@/types/ui.types";
import { buildMenuColumns } from "./menuColumns";
import MenuFormModal from "./MenuFormModal";
import ConfirmDialog from "./ConfirmDialog";

type MenuTableProps = {
  menus: Menu[];
  loading?: boolean;
  error?: string | null;
};

// Wraps DataTable and also owns everything else about the Menus screen: the
// create/edit form modal, the delete confirm dialog, and the toast.
// MenusManager only fetches the data. Mirrors src/components/roles/RoleTable.tsx.
export default function MenuTable({ menus, loading, error }: MenuTableProps) {
  const [formTarget, setFormTarget] = useState<Menu | null | undefined>(undefined); // undefined = closed, null = create
  const [createParentId, setCreateParentId] = useState<string | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<Menu | null>(null);
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
        title="Menús"
        description="Menús raíz y sus submenús, mostrados en la barra lateral."
        createLabel="Nuevo menú"
        emptyLabel="Aún no hay información creada."
        onCreate={() => {
          setCreateParentId(undefined);
          setFormTarget(null);
        }}
        loading={loading}
        error={error}
        data={menus}
        columns={buildMenuColumns({
          onEdit: setFormTarget,
          onDelete: setDeleteTarget,
          onAddSubmenu: (parentId) => {
            setCreateParentId(parentId);
            setFormTarget(null);
          },
        })}
        getRowId={(menu) => menu.id}
        getSubRows={(menu) =>
          menu.subMenu
            ?.filter((child) => child.isActive !== false)
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        }
      >
        {toast && <Alert kind={toast.kind} message={toast.message} />}
      </DataTable>

      {formTarget !== undefined && (
        <MenuFormModal
          menu={formTarget}
          menus={menus}
          presetParentId={createParentId}
          onClose={() => {
            setFormTarget(undefined);
            setCreateParentId(undefined);
          }}
          onSaved={(message) => {
            setFormTarget(undefined);
            setCreateParentId(undefined);
            onToastSuccess(message);
          }}
          onError={onToastError}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          menu={deleteTarget}
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
