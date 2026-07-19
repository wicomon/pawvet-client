"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";

type CancelSubscriptionDialogProps = {
  companyName: string;
  onConfirm: () => Promise<string>;
  onClose: () => void;
  onCanceled: (message: string) => void;
  onError: (message: string) => void;
};

// Sibling of src/components/ui/ConfirmDeleteDialog.tsx, kept separate because
// "cancel" isn't a destructive delete — the copy and tone differ (no "esta
// acción no se puede deshacer", since cancelAtPeriodEnd keeps access until
// the period ends).
export default function CancelSubscriptionDialog({
  companyName,
  onConfirm,
  onClose,
  onCanceled,
  onError,
}: CancelSubscriptionDialogProps) {
  const [pending, setPending] = useState(false);

  async function handleConfirm() {
    setPending(true);
    try {
      const message = await onConfirm();
      onCanceled(message);
    } catch (error) {
      onError(error instanceof Error ? error.message : "Ocurrió un error inesperado.");
    } finally {
      setPending(false);
    }
  }

  return (
    <Modal title="Cancelar suscripción" titleId="cancel-subscription-title" onClose={onClose}>
      <p className="text-[14px] font-semibold text-wv-muted">
        ¿Seguro que deseas cancelar la suscripción de{" "}
        <span className="font-bold text-wv-navy">{companyName}</span>? La empresa mantendrá acceso
        hasta el fin del periodo actual.
      </p>
      <div className="mt-1 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          disabled={pending}
          className="cursor-pointer rounded-[10px] px-3.5 py-2.25 text-[13.5px] font-extrabold text-wv-muted outline-none transition-colors duration-150 ease-out hover:bg-wv-mint-soft focus-visible:shadow-focus disabled:cursor-not-allowed"
        >
          Volver
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={pending}
          className="cursor-pointer rounded-[10px] bg-danger px-3.5 py-2.25 text-[13.5px] font-extrabold text-white outline-none transition-colors duration-150 ease-out hover:opacity-90 focus-visible:shadow-focus disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? "Cancelando…" : "Cancelar suscripción"}
        </button>
      </div>
    </Modal>
  );
}
