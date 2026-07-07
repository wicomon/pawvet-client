// Raw fetch helper used by proxy.ts (edge runtime — no Apollo Client there) and
// by the DAL (src/lib/dal.ts) to verify a session token server-side.
// Verifies the JWT against vdemia-server's `authValidateToken` query.
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
    });

    if (!res.ok) return false;

    const { data, errors } = await res.json();
    if (errors?.length) return false;

    return Boolean(data?.authValidateToken);
  } catch {
    return false;
  }
}
