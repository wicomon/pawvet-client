"use client";

import { Form, Formik } from "formik";
import { useMutation } from "@apollo/client/react";
import { ROLE_CREATE, ROLE_FIND_ALL_WITH_MENU, ROLE_UPDATE } from "@/graphql/role.gql";
import TextField from "@/components/forms/fields/TextField";
import CheckboxField from "@/components/forms/fields/CheckboxField";
import SubmitButton from "@/components/forms/fields/SubmitButton";
import Modal from "@/components/ui/Modal";
import {
  emptyRoleFormValues,
  roleSchema,
  roleToFormValues,
  type RoleFormValues,
} from "./roleFormConfig";
import type { Role, CreateRoleInput, UpdateRoleInput } from "@/types/role";

type RoleFormModalProps = {
  role: Role | null; // null = create, otherwise edit
  onClose: () => void;
  onSaved: (message: string) => void;
  onError: (message: string) => void;
};

function toMutationInput(values: RoleFormValues): CreateRoleInput {
  return {
    name: values.name.trim(),
    slug: values.slug.trim(),
    description: values.description.trim() || undefined,
    canRead: values.canRead,
    canCreate: values.canCreate,
    canUpdate: values.canUpdate,
    canDelete: values.canDelete,
  };
}

// Formik + Yup form, mirroring src/components/menus/MenuFormModal.tsx.
export default function RoleFormModal({ role, onClose, onSaved, onError }: RoleFormModalProps) {
  const isEdit = Boolean(role);
  const [createRole] = useMutation<
    { roleCreate: boolean },
    { createRoleInput: CreateRoleInput }
  >(ROLE_CREATE, { refetchQueries: [ROLE_FIND_ALL_WITH_MENU] });
  const [updateRole] = useMutation<
    { roleUpdate: boolean },
    { updateRoleInput: UpdateRoleInput }
  >(ROLE_UPDATE, { refetchQueries: [ROLE_FIND_ALL_WITH_MENU] });

  const initialValues = role ? roleToFormValues(role) : emptyRoleFormValues;

  function handleClose(dirty: boolean) {
    if (dirty && !window.confirm("Tienes cambios sin guardar. ¿Deseas cerrar de todas formas?")) {
      return;
    }
    onClose();
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={roleSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          if (isEdit && role) {
            const updateRoleInput: UpdateRoleInput = { id: role.id, ...toMutationInput(values) };
            const { data } = await updateRole({ variables: { updateRoleInput } });
            if (!data?.roleUpdate) throw new Error("El backend no confirmó la actualización.");
            onSaved("Rol actualizado correctamente.");
          } else {
            const { data } = await createRole({
              variables: { createRoleInput: toMutationInput(values) },
            });
            if (!data?.roleCreate) throw new Error("El backend no confirmó la creación.");
            onSaved("Rol creado correctamente.");
          }
        } catch (error) {
          onError(error instanceof Error ? error.message : "Ocurrió un error inesperado.");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, dirty }) => (
        <Modal
          title={isEdit ? "Editar rol" : "Nuevo rol"}
          titleId="role-modal-title"
          onClose={() => handleClose(dirty)}
        >
          <Form className="flex flex-col gap-4" noValidate>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TextField label="Nombre" name="name" placeholder="Recepcionista" required />
              <TextField label="Slug" name="slug" placeholder="receptionist" required />
            </div>
            <TextField
              label="Descripción"
              name="description"
              placeholder="Opcional"
              helperText="Se muestra en la tabla de roles."
            />

            <div>
              <p className="mb-2 text-[13px] font-extrabold text-wv-navy">Permisos</p>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                <CheckboxField label="Leer" name="canRead" />
                <CheckboxField label="Crear" name="canCreate" />
                <CheckboxField label="Actualizar" name="canUpdate" />
                <CheckboxField label="Eliminar" name="canDelete" />
              </div>
            </div>

            <div className="mt-1 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => handleClose(dirty)}
                className="cursor-pointer rounded-[10px] px-3.5 py-[9px] text-[13.5px] font-extrabold text-wv-muted outline-none transition-colors duration-150 ease-out hover:bg-wv-mint-soft focus-visible:shadow-focus"
              >
                Cancelar
              </button>
              <div className="w-[180px]">
                <SubmitButton
                  label={isEdit ? "Guardar cambios" : "Crear rol"}
                  pendingLabel="Guardando…"
                  pending={isSubmitting}
                />
              </div>
            </div>
          </Form>
        </Modal>
      )}
    </Formik>
  );
}
