import { BACKEND_TIMEOUT_MS } from "@/lib/backendConfig";

// Raw fetch helper used by the DAL (src/lib/dal.ts) to verify a session token
// server-side. Verifies the JWT against vdemia-server's `authValidateToken`
// query. proxy.ts intentionally does NOT call this — per Next.js docs
// (node_modules/next/dist/docs/01-app/02-guides/authentication.md,
// "Optimistic checks with Proxy"), Proxy runs on every route (including
// prefetched ones) and must only read the cookie, never hit the backend.

export async function isLogged(token: string): Promise<boolean> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) return false;

  try {
    const res = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `query AuthValidateToken { authValidateToken }`,
      }),
      signal: AbortSignal.timeout(BACKEND_TIMEOUT_MS),
    });

    if (!res.ok) return false;

    const { data, errors } = await res.json();
    if (errors?.length) return false;

    // The backend resolver types authValidateToken as String (see
    // pawvet-server/src/auth/auth.resolver.ts), so a `false` result arrives
    // as the string "false" — `Boolean("false")` would be truthy and defeat
    // this check entirely. Compare explicitly instead of coercing.
    return data?.authValidateToken === true || data?.authValidateToken === "true";
  } catch {
    return false;
  }
}
