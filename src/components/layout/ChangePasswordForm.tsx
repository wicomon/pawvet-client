"use client";

import { useState } from "react";
import { Formik } from "formik";
import { changePassword, logout } from "@/app/actions/auth";
import TextField from "@/components/forms/fields/TextField";
import FormModal from "@/components/ui/FormModal";
import {
  changePasswordSchema,
  emptyChangePasswordValues,
} from "./changePasswordFormConfig";

type ChangePasswordFormProps = {
  onClose: () => void;
};

// Self-service "change my password" modal, opened from the account area at
// the bottom of the Sidebar. Unlike the other Formik forms in (admin)/
// (UserEditForm, RoleEditForm, ...), this one is mounted at the shell level
// (DashboardShell), which sits *outside* ApolloWrapper — see
// src/app/(admin)/layout.tsx, where ApolloWrapper only wraps {children}, not
// DashboardShell. So this calls the changePassword Server Action instead of
// an Apollo useMutation. On success the session is intentionally ended
// (logout()) so the user re-authenticates with the new password.
export default function ChangePasswordForm({ onClose }: ChangePasswordFormProps) {
  const [backendError, setBackendError] = useState<string | null>(null);

  return (
    <Formik
      initialValues={emptyChangePasswordValues}
      validationSchema={changePasswordSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setBackendError(null);
        const result = await changePassword({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        });

        if (!result.ok) {
          setBackendError(result.message);
          setSubmitting(false);
          return;
        }

        await logout();
        // logout() redirects server-side; setSubmitting is intentionally
        // left pending so the button stays disabled until navigation happens.
      }}
    >
      {({ isSubmitting, dirty }) => (
        <FormModal
          title="Cambiar contraseña"
          titleId="change-password-title"
          onClose={onClose}
          dirty={dirty}
          isSubmitting={isSubmitting}
          submitLabel="Cambiar contraseña"
          pendingLabel="Cambiando…"
        >
          {backendError && (
            <div role="alert" className="text-[13px] font-semibold text-danger">
              {backendError}
            </div>
          )}
          <TextField
            label="Contraseña actual"
            name="currentPassword"
            type="password"
            placeholder="••••••••"
            required
          />
          <TextField
            label="Nueva contraseña"
            name="newPassword"
            type="password"
            placeholder="Mínimo 8 caracteres"
            required
          />
          <TextField
            label="Confirmar nueva contraseña"
            name="confirmPassword"
            type="password"
            placeholder="Repite la nueva contraseña"
            required
          />
        </FormModal>
      )}
    </Formik>
  );
}
