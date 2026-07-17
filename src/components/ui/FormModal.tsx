"use client";

import { Form } from "formik";
import Modal from "@/components/ui/Modal";
import SubmitButton from "@/components/forms/fields/SubmitButton";

type FormModalProps = {
  title: string;
  titleId: string;
  onClose: () => void;
  dirty: boolean;
  isSubmitting: boolean;
  submitLabel: string;
  pendingLabel: string;
  children: React.ReactNode;
};

// Wraps Modal with the <Formik> Form + Cancelar/Submit footer shared by every
// create/edit form modal (RoleCreateForm, RoleEditForm, MenuFormModal, …). Must be rendered
// inside a <Formik> render-prop so `dirty`/`isSubmitting` come from Formik
// state. Field markup goes in `children`; only the surrounding chrome lives
// here.
export default function FormModal({
  title,
  titleId,
  onClose,
  dirty,
  isSubmitting,
  submitLabel,
  pendingLabel,
  children,
}: FormModalProps) {
  function handleClose() {
    if (dirty && !window.confirm("Tienes cambios sin guardar. ¿Deseas cerrar de todas formas?")) {
      return;
    }
    onClose();
  }

  return (
    <Modal title={title} titleId={titleId} onClose={handleClose}>
      <Form className="flex flex-col gap-4" noValidate>
        {children}

        <div className="mt-1 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="cursor-pointer rounded-[10px] px-3.5 py-2.25 text-[13.5px] font-extrabold text-wv-muted outline-none transition-colors duration-150 ease-out hover:bg-wv-mint-soft focus-visible:shadow-focus"
          >
            Cancelar
          </button>
          <div className="w-45">
            <SubmitButton label={submitLabel} pendingLabel={pendingLabel} pending={isSubmitting} />
          </div>
        </div>
      </Form>
    </Modal>
  );
}
