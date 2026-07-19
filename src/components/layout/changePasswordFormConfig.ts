import * as Yup from "yup";

// Formik config for ChangePasswordForm.tsx. Mirrors the shape of
// src/app/(admin)/users/_components/userFormConfig.ts, but this is a
// self-service form (current + new + confirm) rather than an admin editing
// another user's record.
export interface ChangePasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const emptyChangePasswordValues: ChangePasswordFormValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export const changePasswordSchema = Yup.object({
  currentPassword: Yup.string().required("La contraseña actual es obligatoria."),
  newPassword: Yup.string()
    .required("La nueva contraseña es obligatoria.")
    .min(8, "Mínimo 8 caracteres.")
    .max(100, "Máximo 100 caracteres."),
  confirmPassword: Yup.string()
    .required("Confirma la nueva contraseña.")
    .oneOf([Yup.ref("newPassword")], "Las contraseñas no coinciden."),
});
