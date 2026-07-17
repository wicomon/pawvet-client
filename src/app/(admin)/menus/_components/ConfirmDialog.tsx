"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { MENU_FIND_ALL, MENU_REMOVE } from "@/graphql/menu.gql";
import Modal from "@/components/ui/Modal";
import type { Menu } from "@/types/menu";

type ConfirmDialogProps = {
  menu: Menu;
  onClose: () => void;
  onDeleted: (message: string) => void;
  onError: (message: string) => void;
};

// Deletion confirmation, visually and behaviorally separated from the
// create/edit flow (per ui-ux-pro-max "destructive-emphasis" /
// "destructive-nav-separation") — its own modal, its own red primary action.
export default function ConfirmDialog({ menu, onClose, onDeleted, onError }: ConfirmDialogProps) {
  const [removeMenu] = useMutation(MENU_REMOVE, {
    refetchQueries: [MENU_FIND_ALL],
  });
  const [pending, setPending] = useState(false);

  async function handleConfirm() {
    setPending(true);
    try {
      const { data } = await removeMenu({ variables: { id: menu.id } });
      if (!data?.menuRemove) throw new Error("El backend no confirmó la eliminación.");
      onDeleted(`Menú "${menu.name}" eliminado.`);
    } catch (error) {
      onError(error instanceof Error ? error.message : "Ocurrió un error inesperado.");
    } finally {
      setPending(false);
    }
  }

  return (
    <Modal title="Eliminar menú" titleId="menu-delete-title" onClose={onClose}>
      <p className="text-[14px] font-semibold text-wv-muted">
        ¿Seguro que deseas eliminar el menú <span className="font-bold text-wv-navy">{menu.name}</span>
        ? Esta acción no se puede deshacer.
      </p>
      <div className="mt-1 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          disabled={pending}
          className="cursor-pointer rounded-[10px] px-3.5 py-2.25 text-[13.5px] font-extrabold text-wv-muted outline-none transition-colors duration-150 ease-out hover:bg-wv-mint-soft focus-visible:shadow-focus disabled:cursor-not-allowed"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={pending}
          className="cursor-pointer rounded-[10px] bg-danger px-3.5 py-2.25 text-[13.5px] font-extrabold text-white outline-none transition-colors duration-150 ease-out hover:opacity-90 focus-visible:shadow-focus disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? "Eliminando…" : "Eliminar"}
        </button>
      </div>
    </Modal>
  );
}
