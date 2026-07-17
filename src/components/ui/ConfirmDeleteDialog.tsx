"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";

type ConfirmDeleteDialogProps = {
  title: string; // "Eliminar empresa"
  titleId: string; // "company-delete-title"
  entityLabel: string; // "la empresa" | "el menú" | "el rol" (artículo + sustantivo)
  entityName: string; // nombre resaltado en negrita dentro del mensaje
  confirmLabel?: string;
  pendingLabel?: string;
  onConfirm: () => Promise<string>; // ejecuta la mutación; devuelve el mensaje de éxito; lanza si falla
  onClose: () => void;
  onDeleted: (message: string) => void;
  onError: (message: string) => void;
};

// Shared deletion-confirmation dialog, extracted after the same markup/logic
// was copy-pasted verbatim across company/menus/roles ConfirmDialog.tsx.
// Visually and behaviorally separated from the create/edit flow — its own
// modal, its own red primary action. The mutation itself stays with the
// caller (via `onConfirm`) so this component doesn't depend on any specific
// GraphQL document.
export default function ConfirmDeleteDialog({
  title,
  titleId,
  entityLabel,
  entityName,
  confirmLabel = "Eliminar",
  pendingLabel = "Eliminando…",
  onConfirm,
  onClose,
  onDeleted,
  onError,
}: ConfirmDeleteDialogProps) {
  const [pending, setPending] = useState(false);

  async function handleConfirm() {
    setPending(true);
    try {
      const message = await onConfirm();
      onDeleted(message);
    } catch (error) {
      onError(error instanceof Error ? error.message : "Ocurrió un error inesperado.");
    } finally {
      setPending(false);
    }
  }

  return (
    <Modal title={title} titleId={titleId} onClose={onClose}>
      <p className="text-[14px] font-semibold text-wv-muted">
        ¿Seguro que deseas eliminar {entityLabel}{" "}
        <span className="font-bold text-wv-navy">{entityName}</span>? Esta acción no se puede
        deshacer.
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
          {pending ? pendingLabel : confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
