import * as Yup from "yup";
import type { Role } from "@/types/role";

// Single source of truth for the create/edit form (src/components/roles/RoleFormModal.tsx),
// mirroring src/components/menus/menuFormConfig.ts.
export interface RoleFormValues {
  id: string;
  name: string;
  slug: string;
  description: string;
  canRead: boolean;
  canCreate: boolean;
  canUpdate: boolean;
  canDelete: boolean;
}

export const emptyRoleFormValues: RoleFormValues = {
  id: "",
  name: "",
  slug: "",
  description: "",
  canRead: true,
  canCreate: true,
  canUpdate: true,
  canDelete: true,
};

export function roleToFormValues(role: Role): RoleFormValues {
  return {
    id: role.id,
    name: role.name,
    slug: role.slug,
    description: role.description ?? "",
    canRead: role.canRead,
    canCreate: role.canCreate,
    canUpdate: role.canUpdate,
    canDelete: role.canDelete,
  };
}

export const roleSchema = Yup.object({
  name: Yup.string()
    .required("El nombre es obligatorio.")
    .min(2, "Mínimo 2 caracteres.")
    .max(100, "Máximo 100 caracteres."),
  slug: Yup.string()
    .required("El slug es obligatorio.")
    .matches(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Usa minúsculas, números y guiones (ej. \"receptionist\").")
    .max(50, "Máximo 50 caracteres."),
  description: Yup.string().max(255, "Máximo 255 caracteres."),
  canRead: Yup.boolean().required(),
  canCreate: Yup.boolean().required(),
  canUpdate: Yup.boolean().required(),
  canDelete: Yup.boolean().required(),
});
