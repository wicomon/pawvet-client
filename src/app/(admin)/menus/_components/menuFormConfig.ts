import * as Yup from "yup";
import { MENU_ICON_NAMES } from "@/lib/menuIcons";
import { MENU_POSITION_OPTIONS, MENU_TYPE_OPTIONS, type CreateMenuInput, type Menu } from "@/types/menu";

// Single source of truth for the create/edit form (MenuCreateForm.tsx +
// MenuEditForm.tsx). Every field the mutation needs lives in Formik state —
// unlike the bfa-front reference form, nothing (icon, order, etc.) is
// tracked in parallel useState that has to be hand-merged back in onSubmit.
export interface MenuFormValues {
  id: string;
  code: string;
  name: string;
  path: string;
  type: string;
  position: string;
  description: string;
  icon: string;
  order: number | "";
  parentId: string;
}

export const emptyMenuFormValues: MenuFormValues = {
  id: "",
  code: "",
  name: "",
  path: "",
  type: MENU_TYPE_OPTIONS[0],
  position: MENU_POSITION_OPTIONS[0],
  description: "",
  icon: "",
  order: "",
  parentId: "",
};

export function menuToFormValues(menu: Menu): MenuFormValues {
  return {
    id: menu.id,
    code: menu.code,
    name: menu.name,
    path: menu.path ?? "",
    type: menu.type,
    position: menu.position,
    description: menu.description ?? "",
    icon: menu.icon ?? "",
    order: menu.order ?? "",
    parentId: menu.parentId ?? "",
  };
}

const NO_PARENT_OPTION = { value: "", label: "Ninguno (menú raíz)" };

// Only "dropdown"-type menus can act as a parent — a plain "link" menu has
// nowhere to render children. Excludes the menu being edited so it can't
// become its own parent.
export function buildParentOptions(menus: Menu[], excludeId?: string) {
  const eligible = menus.filter((menu) => menu.type === "dropdown" && menu.id !== excludeId);
  return [NO_PARENT_OPTION, ...eligible.map((menu) => ({ value: menu.id, label: menu.name }))];
}

export const TYPE_SELECT_OPTIONS = MENU_TYPE_OPTIONS.map((value) => ({
  value,
  label: value === "link" ? "Enlace" : "Desplegable",
}));

export const POSITION_SELECT_OPTIONS = MENU_POSITION_OPTIONS.map((value) => ({
  value,
  label: value === "sidebar" ? "Barra lateral" : "Barra superior",
}));

export const ICON_SELECT_OPTIONS = [
  { value: "", label: "Sin ícono" },
  ...MENU_ICON_NAMES.map((value) => ({ value, label: value })),
];

// Real `.required()` on every mandatory field — the bfa-front reference used
// `Yup.number().label("El precio es obligatorio")` on a required field,
// which only sets a display name and never actually enforces presence.
export const menuSchema = Yup.object({
  code: Yup.string()
    .required("El código es obligatorio.")
    .min(2, "Mínimo 2 caracteres.")
    .max(50, "Máximo 50 caracteres."),
  name: Yup.string()
    .required("El nombre es obligatorio.")
    .min(2, "Mínimo 2 caracteres.")
    .max(100, "Máximo 100 caracteres."),
  path: Yup.string()
    .required("La ruta es obligatoria.")
    .matches(/^\//, 'La ruta debe empezar con "/".'),
  type: Yup.string()
    .oneOf([...MENU_TYPE_OPTIONS], "Selecciona un tipo válido.")
    .required("El tipo es obligatorio."),
  position: Yup.string()
    .oneOf([...MENU_POSITION_OPTIONS], "Selecciona una posición válida.")
    .required("La posición es obligatoria."),
  description: Yup.string().max(255, "Máximo 255 caracteres."),
  icon: Yup.string(),
  order: Yup.number()
    .transform((value, originalValue) => (originalValue === "" ? undefined : value))
    .min(1, "Debe ser mayor o igual a 1.")
    .integer("Debe ser un número entero.")
    .nullable(),
  parentId: Yup.string(),
});

export function toMutationInput(values: MenuFormValues): CreateMenuInput {
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
