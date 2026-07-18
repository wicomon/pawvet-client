import "server-only";
import { cache } from "react";
import { print } from "graphql";
import { redirect } from "next/navigation";
import { isLogged } from "@/lib/isLogged";
import { getSessionToken } from "@/lib/session";
import { AUTH_USER_INFO } from "@/graphql/auth.gql";
import type { ContextUser } from "@/types/user";
import { BACKEND_TIMEOUT_MS } from "@/lib/backendConfig";

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

  // Fetch failures are caught here, but redirect() below must run outside
  // this try/catch — it throws Next.js's internal NEXT_REDIRECT signal,
  // which a wrapping catch{} would otherwise swallow. This is a
  // defense-in-depth path: verifySession() should already have redirected
  // on an invalid/expired token, but if authUserInfo fails independently
  // (e.g. the token expires between the two backend calls), the layout
  // can't render anything useful without a user — redirecting is safer
  // than falling back to an empty sidebar.
  let json: { data?: { authUserInfo?: ContextUser }; errors?: unknown[] } | null = null;
  try {
    const res = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query: print(AUTH_USER_INFO) }),
      cache: "no-store",
      signal: AbortSignal.timeout(BACKEND_TIMEOUT_MS),
    });

    if (res.ok) json = await res.json();
  } catch {
    json = null;
  }

  const user = json?.data?.authUserInfo;
  if (!user || (json?.errors?.length ?? 0) > 0) {
    redirect("/login");
  }

  return user;
});
