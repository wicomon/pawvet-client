"use server";

import { print } from "graphql";
import { redirect } from "next/navigation";
import * as Yup from "yup";
import { CHANGE_PASSWORD, LOGIN } from "@/graphql/auth.gql";
import { createSession, deleteSession } from "@/lib/session";
import { verifySession } from "@/lib/dal";
import { BACKEND_LOGIN_TIMEOUT_MS, BACKEND_TIMEOUT_MS } from "@/lib/backendConfig";

const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Ingresa un correo válido.")
    .required("El correo es obligatorio."),
  password: Yup.string()
    .min(5, "La contraseña debe tener al menos 5 caracteres.")
    .required("La contraseña es obligatoria."),
});

export interface LoginFormState {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string;
}

export async function login(
  _state: LoginFormState | undefined,
  formData: FormData
): Promise<LoginFormState | undefined> {
  const values = {
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  };
  const remember = formData.get("remember") === "on";

  try {
    await LoginSchema.validate(values, { abortEarly: false });
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      const errors: LoginFormState["errors"] = {};
      for (const inner of err.inner) {
        const field = inner.path as "email" | "password" | undefined;
        if (!field) continue;
        errors[field] = [...(errors[field] ?? []), inner.message];
      }
      return { errors };
    }
    throw err;
  }

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    return { message: "El backend no está configurado." };
  }

  try {
    const res = await fetch(backendUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        query: print(LOGIN),
        variables: { loginInput: values },
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(BACKEND_LOGIN_TIMEOUT_MS),
    });

    const { data, errors } = await res.json();

    if (!res.ok || errors?.length || !data?.authLogin?.token) {
      return { message: "No se pudo iniciar sesión. Intenta de nuevo." };
    }

    await createSession(data.authLogin.token, { remember });
  } catch {
    return { message: "Ocurrió un error inesperado." };
  }

  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}

export type ChangePasswordResult = { ok: true } | { ok: false; message: string };

// Self-service password change for the logged-in user. Identity comes from
// the session token (authChangePassword takes no userId), so this must run
// as an authenticated request — same fetch pattern as getUser() in
// src/lib/dal.ts. Does not redirect: the caller (ChangePasswordForm) calls
// logout() itself once this resolves ok, so the user re-authenticates with
// the new password.
export async function changePassword(input: {
  currentPassword: string;
  newPassword: string;
}): Promise<ChangePasswordResult> {
  const { token } = await verifySession();

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    return { ok: false, message: "El backend no está configurado." };
  }

  try {
    const res = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: print(CHANGE_PASSWORD),
        variables: { changePasswordInput: input },
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(BACKEND_TIMEOUT_MS),
    });

    const { data, errors } = await res.json();

    if (!res.ok || errors?.length || !data?.authChangePassword) {
      return {
        ok: false,
        message: "No se pudo cambiar la contraseña. Verifica tu contraseña actual.",
      };
    }
  } catch {
    return { ok: false, message: "Ocurrió un error inesperado." };
  }

  return { ok: true };
}
