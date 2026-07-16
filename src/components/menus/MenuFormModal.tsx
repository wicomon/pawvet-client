"use client";

import { Form, Formik } from "formik";
import { useMutation } from "@apollo/client/react";
import { MENU_CREATE, MENU_FIND_ALL, MENU_UPDATE } from "@/graphql/menu.gql";
import TextField from "@/components/forms/fields/TextField";
import SelectField from "@/components/forms/fields/SelectField";
import SubmitButton from "@/components/forms/fields/SubmitButton";
import Modal from "@/components/ui/Modal";
import {
  ICON_SELECT_OPTIONS,
  POSITION_SELECT_OPTIONS,
  TYPE_SELECT_OPTIONS,
  buildParentOptions,
  emptyMenuFormValues,
  menuSchema,
  menuToFormValues,
  type MenuFormValues,
} from "./menuFormConfig";
import type { Menu, CreateMenuInput, UpdateMenuInput } from "@/types/menu";

type MenuFormModalProps = {
  menu: Menu | null; // null = create, otherwise edit
  menus: Menu[]; // full root-menu list, used to populate the "parent" picker
  presetParentId?: string; // set when opened via a parent row's "+ Submenú" button
  onClose: () => void;
  onSaved: (message: string) => void;
  onError: (message: string) => void;
};

function toMutationInput(values: MenuFormValues): CreateMenuInput {
  return {
    code: values.code.trim(),
    name: values.name.trim(),
    path: values.path.trim(),
    type: values.type,
    position: values.position,
    description: values.description.trim() || undefined,
    icon: values.icon || undefined,
    order: values.order === "" ? undefined : Number(values.order),
    // Sent as an explicit `null` (not omitted) so clearing the parent on an
    // edit actually clears it — parentId is `nullable: true` on both
    // Create/UpdateMenuInput in pawvet-server, and class-validator's
    // `@IsOptional()` skips validation for `null` as well as `undefined`.
    parentId: values.parentId || null,
  };
}

// Formik + Yup form, driven entirely by menuFormConfig.ts. Every field the
// mutation needs (including icon/order) lives in Formik state — the
// bfa-front reference form kept extra fields in parallel useState and
// hand-merged them in onSubmit, which this deliberately avoids.
export default function MenuFormModal({
  menu,
  menus,
  presetParentId,
  onClose,
  onSaved,
  onError,
}: MenuFormModalProps) {
  const isEdit = Boolean(menu);
  const isPresetChild = !isEdit && Boolean(presetParentId);
  const [createMenu] = useMutation<
    { menuCreate: boolean },
    { createMenuInput: CreateMenuInput }
  >(MENU_CREATE, { refetchQueries: [MENU_FIND_ALL] });
  const [updateMenu] = useMutation<
    { menuUpdate: boolean },
    { updateMenuInput: UpdateMenuInput }
  >(MENU_UPDATE, { refetchQueries: [MENU_FIND_ALL] });

  const initialValues = menu
    ? menuToFormValues(menu)
    : { ...emptyMenuFormValues, parentId: presetParentId ?? "" };
  const parentOptions = buildParentOptions(menus, menu?.id);

  function handleClose(dirty: boolean) {
    if (dirty && !window.confirm("Tienes cambios sin guardar. ¿Deseas cerrar de todas formas?")) {
      return;
    }
    onClose();
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={menuSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          if (isEdit && menu) {
            const updateMenuInput: UpdateMenuInput = { id: menu.id, ...toMutationInput(values) };
            const { data } = await updateMenu({ variables: { updateMenuInput } });
            if (!data?.menuUpdate) throw new Error("El backend no confirmó la actualización.");
            onSaved(
              values.parentId
                ? "Menú actualizado. Ahora aparece anidado bajo su menú padre."
                : "Menú actualizado correctamente."
            );
          } else {
            const { data } = await createMenu({
              variables: { createMenuInput: toMutationInput(values) },
            });
            if (!data?.menuCreate) throw new Error("El backend no confirmó la creación.");
            onSaved(values.parentId ? "Submenú creado correctamente." : "Menú creado correctamente.");
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
          title={isEdit ? "Editar menú" : isPresetChild ? "Nuevo submenú" : "Nuevo menú"}
          titleId="menu-modal-title"
          onClose={() => handleClose(dirty)}
        >
          <Form className="flex flex-col gap-4" noValidate>
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
                  label={isEdit ? "Guardar cambios" : isPresetChild ? "Crear submenú" : "Crear menú"}
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
