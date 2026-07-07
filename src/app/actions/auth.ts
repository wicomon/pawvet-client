"use server";

import { print } from "graphql";
import { redirect } from "next/navigation";
import * as Yup from "yup";
import { LOGIN } from "@/graphql/auth.gql";
import { createSession, deleteSession } from "@/lib/session";

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
    });

    const { data, errors } = await res.json();

    if (!res.ok || errors?.length || !data?.authLogin?.token) {
      return { message: "No se pudo iniciar sesión. Intenta de nuevo." };
    }

    await createSession(data.authLogin.token);
  } catch {
    return { message: "Ocurrió un error inesperado." };
  }

  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
