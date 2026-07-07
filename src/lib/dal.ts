import "server-only";
import { cache } from "react";
import { print } from "graphql";
import { redirect } from "next/navigation";
import { isLogged } from "@/lib/isLogged";
import { getSessionToken } from "@/lib/session";
import { AUTH_USER_INFO } from "@/graphql/auth.gql";
import type { ContextUser } from "@/types/user";

// Data Access Layer: centralizes session verification and data requests
// (see node_modules/next/dist/docs/01-app/02-guides/authentication.md,
// "Creating a Data Access Layer (DAL)"). `cache()` memoizes the result for
// the lifetime of a single render pass.
export const verifySession = cache(async () => {
  const token = await getSessionToken();

  if (!token || !(await isLogged(token))) {
    redirect("/login");
  }

  return { isAuth: true, token };
});

export const getUser = cache(async (): Promise<ContextUser | null> => {
  const { token } = await verifySession();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) return null;

  try {
    const res = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query: print(AUTH_USER_INFO) }),
      cache: "no-store",
    });

    if (!res.ok) return null;

    const { data, errors } = await res.json();
    if (errors?.length) return null;

    return (data?.authUserInfo as ContextUser) ?? null;
  } catch {
    return null;
  }
});
