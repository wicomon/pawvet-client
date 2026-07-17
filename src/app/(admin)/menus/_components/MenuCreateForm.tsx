"use client";

import { Formik } from "formik";
import { useMutation } from "@apollo/client/react";
import { MENU_CREATE, MENU_FIND_ALL } from "@/graphql/menu.gql";
import TextField from "@/components/forms/fields/TextField";
import SelectField from "@/components/forms/fields/SelectField";
import FormModal from "@/components/ui/FormModal";
import {
  ICON_SELECT_OPTIONS,
  POSITION_SELECT_OPTIONS,
  TYPE_SELECT_OPTIONS,
  buildParentOptions,
  emptyMenuFormValues,
  menuSchema,
  toMutationInput,
} from "./menuFormConfig";
import type { Menu } from "@/types/menu";

type MenuCreateFormProps = {
  menus: Menu[]; // full root-menu list, used to populate the "parent" picker
  presetParentId?: string; // set when opened via a parent row's "+ Submenú" button
  onClose: () => void;
  onSaved: (message: string) => void;
  onError: (message: string) => void;
};

// Formik + Yup form for creating a menu. Mirrors MenuEditForm.tsx but
// without the isEdit branching that used to live in MenuFormModal.tsx.
export default function MenuCreateForm({
  menus,
  presetParentId,
  onClose,
  onSaved,
  onError,
}: MenuCreateFormProps) {
  const isPresetChild = Boolean(presetParentId);
  const [createMenu] = useMutation(MENU_CREATE, {
    refetchQueries: [MENU_FIND_ALL],
  });

  const initialValues = { ...emptyMenuFormValues, parentId: presetParentId ?? "" };
  const parentOptions = buildParentOptions(menus);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={menuSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const { data } = await createMenu({
            variables: { createMenuInput: toMutationInput(values) },
          });
          if (!data?.menuCreate) throw new Error("El backend no confirmó la creación.");
          onSaved(values.parentId ? "Submenú creado correctamente." : "Menú creado correctamente.");
        } catch (error) {
          onError(error instanceof Error ? error.message : "Ocurrió un error inesperado.");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, dirty }) => (
        <FormModal
          title={isPresetChild ? "Nuevo submenú" : "Nuevo menú"}
          titleId="menu-modal-title"
          onClose={onClose}
          dirty={dirty}
          isSubmitting={isSubmitting}
          submitLabel={isPresetChild ? "Crear submenú" : "Crear menú"}
          pendingLabel="Guardando…"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="Código" name="code" placeholder="dashboard" required />
            <TextField label="Nombre" name="name" placeholder="Panel" required />
          </div>
          <TextField label="Ruta" name="path" placeholder="/dashboard" required />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SelectField label="Tipo" name="type" options={TYPE_SELECT_OPTIONS} required />
            <SelectField
              label="Posición"
              name="position"
              options={POSITION_SELECT_OPTIONS}
              required
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SelectField label="Ícono" name="icon" options={ICON_SELECT_OPTIONS} />
            <TextField label="Orden" name="order" type="number" placeholder="1" />
          </div>
          <SelectField label="Menú padre" name="parentId" options={parentOptions} />
          {parentOptions.length === 1 && (
            <p className="-mt-2.5 text-[12.5px] font-semibold text-wv-faint">
              Solo los menús de tipo &quot;Desplegable&quot; pueden ser padre. Crea uno primero
              para poder anidar este menú.
            </p>
          )}
          <TextField
            label="Descripción"
            name="description"
            placeholder="Opcional"
            helperText="Se muestra como texto de apoyo en el menú."
          />
        </FormModal>
      )}
    </Formik>
  );
}
