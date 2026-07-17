"use client";

import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client/react";
import DataTable from "@/components/ui/DataTable";
import Alert from "@/components/ui/Alert";
import ConfirmDeleteDialog from "@/components/ui/ConfirmDeleteDialog";
import { USER_FIND_ALL, USER_REMOVE } from "@/graphql/user.gql";
import type { User } from "@/types/user";
import type { Toast } from "@/types/ui.types";
import { buildUserColumns, type UserGroupRow, type UserRow } from "./userColumns";
import UserCreateForm from "./UserCreateForm";
import UserEditForm from "./UserEditForm";

type UsersTableProps = {
  groups: UserGroupRow[];
  loading?: boolean;
  error?: string | null;
};

export default function UsersTable({ groups, loading, error }: UsersTableProps) {
  const [formTarget, setFormTarget] = useState<User | null | undefined>(undefined); // undefined = closed, null = create
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);
  const [removeUser] = useMutation(USER_REMOVE, {
    refetchQueries: [USER_FIND_ALL],
  });

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  const onToastSuccess = (message: string) => setToast({ kind: "success", message });
  const onToastError = (message: string) => setToast({ kind: "error", message });

  return (
    <>
      <DataTable<UserRow>
        title="Usuarios"
        description="Usuarios registrados, agrupados por empresa."
        createLabel="Nuevo usuario"
        emptyLabel="Aún no hay información creada."
        onCreate={() => setFormTarget(null)}
        loading={loading}
        error={error}
        data={groups}
        columns={buildUserColumns({
          onEdit: setFormTarget,
          onDelete: setDeleteTarget,
        })}
        getSubRows={(row) => (row.kind === "group" ? row.users.map((user) => ({ ...user, kind: "user" as const })) : undefined)}
        getRowId={(row) => row.id}
      >
        {toast && <Alert kind={toast.kind} message={toast.message} />}
      </DataTable>

      {formTarget === null && (
        <UserCreateForm
          onClose={() => setFormTarget(undefined)}
          onSaved={(message) => {
            setFormTarget(undefined);
            onToastSuccess(message);
          }}
          onError={onToastError}
        />
      )}

      {formTarget && (
        <UserEditForm
          user={formTarget}
          onClose={() => setFormTarget(undefined)}
          onSaved={(message) => {
            setFormTarget(undefined);
            onToastSuccess(message);
          }}
          onError={onToastError}
        />
      )}

      {deleteTarget && (
        <ConfirmDeleteDialog
          title="Eliminar usuario"
          titleId="user-delete-title"
          entityLabel="al usuario"
          entityName={`${deleteTarget.firstName} ${deleteTarget.lastName}`}
          onConfirm={async () => {
            const { data } = await removeUser({ variables: { id: deleteTarget.id } });
            if (!data?.userRemove) throw new Error("El backend no confirmó la eliminación.");
            return `Usuario "${deleteTarget.firstName} ${deleteTarget.lastName}" eliminado.`;
          }}
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
