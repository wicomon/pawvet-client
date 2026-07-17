import * as Yup from "yup";
import type { CreateUserInput, User } from "@/types/user";

// Single source of truth for the create/edit form (UserCreateForm.tsx +
// UserEditForm.tsx). Mirrors src/app/(admin)/company/_components/companyFormConfig.ts.
// `password` is required on create but optional on edit — leaving it blank
// while editing means "don't change the password" (see toMutationInput).
export interface UserFormValues {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  companyId: string;
  roleId: string;
}

export const emptyUserFormValues: UserFormValues = {
  id: "",
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  companyId: "",
  roleId: "",
};

export function userToFormValues(user: User): UserFormValues {
  return {
    id: user.id,
    email: user.email,
    password: "",
    firstName: user.firstName,
    lastName: user.lastName,
    companyId: user.company.id,
    roleId: user.role.id,
  };
}

export function buildUserSchema(isEdit: boolean) {
  return Yup.object({
    firstName: Yup.string()
      .required("El nombre es obligatorio.")
      .min(2, "Mínimo 2 caracteres.")
      .max(100, "Máximo 100 caracteres."),
    lastName: Yup.string()
      .required("El apellido es obligatorio.")
      .min(2, "Mínimo 2 caracteres.")
      .max(100, "Máximo 100 caracteres."),
    email: Yup.string()
      .required("El correo es obligatorio.")
      .email("Ingresa un correo válido.")
      .max(150, "Máximo 150 caracteres."),
    password: isEdit
      ? Yup.string().min(8, "Mínimo 8 caracteres.").max(100, "Máximo 100 caracteres.")
      : Yup.string()
          .required("La contraseña es obligatoria.")
          .min(8, "Mínimo 8 caracteres.")
          .max(100, "Máximo 100 caracteres."),
    companyId: Yup.string().required("La empresa es obligatoria."),
    roleId: Yup.string().required("El rol es obligatorio."),
  });
}

export function toMutationInput(values: UserFormValues): CreateUserInput {
  return {
    email: values.email.trim(),
    password: values.password.trim(),
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim(),
    companyId: values.companyId,
    roleId: values.roleId,
  };
}
