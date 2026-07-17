"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { ROLE_FIND_ALL_WITH_MENU, ROLE_REMOVE } from "@/graphql/role.gql";
import Modal from "@/components/ui/Modal";
import type { Role } from "@/types/role";

type ConfirmDialogProps = {
  role: Role;
  onClose: () => void;
  onDeleted: (message: string) => void;
  onError: (message: string) => void;
};

// Deletion confirmation, mirroring src/components/menus/ConfirmDialog.tsx.
export default function ConfirmDialog({ role, onClose, onDeleted, onError }: ConfirmDialogProps) {
  const [removeRole] = useMutation(ROLE_REMOVE, {
    refetchQueries: [ROLE_FIND_ALL_WITH_MENU],
  });
  const [pending, setPending] = useState(false);

  async function handleConfirm() {
    setPending(true);
    try {
      const { data } = await removeRole({ variables: { id: role.id } });
      if (!data?.roleRemove) throw new Error("El backend no confirmó la eliminación.");
      onDeleted(`Rol "${role.name}" eliminado.`);
    } catch (error) {
      onError(error instanceof Error ? error.message : "Ocurrió un error inesperado.");
    } finally {
      setPending(false);
    }
  }

  return (
    <Modal title="Eliminar rol" titleId="role-delete-title" onClose={onClose}>
      <p className="text-[14px] font-semibold text-wv-muted">
        ¿Seguro que deseas eliminar el rol <span className="font-bold text-wv-navy">{role.name}</span>
        ? Esta acción no se puede deshacer.
      </p>
      <div className="mt-1 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          disabled={pending}
          className="cursor-pointer rounded-[10px] px-3.5 py-[9px] text-[13.5px] font-extrabold text-wv-muted outline-none transition-colors duration-150 ease-out hover:bg-wv-mint-soft focus-visible:shadow-focus disabled:cursor-not-allowed"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={pending}
          className="cursor-pointer rounded-[10px] bg-danger px-3.5 py-[9px] text-[13.5px] font-extrabold text-white outline-none transition-colors duration-150 ease-out hover:opacity-90 focus-visible:shadow-focus disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? "Eliminando…" : "Eliminar"}
        </button>
      </div>
    </Modal>
  );
}
