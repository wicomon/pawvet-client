import { NextResponse } from "next/server";
import { getSessionToken } from "@/lib/session";
import { BACKEND_TIMEOUT_MS } from "@/lib/backendConfig";

// Same-origin GraphQL proxy for Client Components that use Apollo Client
// (e.g. src/components/menus/*). The `session` cookie is httpOnly (see
// src/lib/session.ts), so browser JS can never read the JWT directly — this
// route reads it server-side via getSessionToken() and forwards it as
// `Authorization: Bearer`, mirroring the same fetch pattern as
// src/lib/dal.ts:getUser(). Apollo's HttpLink points at "/api/gql" instead
// of NEXT_PUBLIC_BACKEND_URL directly, so the token never reaches the client.
export async function POST(request: Request) {
  const token = await getSessionToken();
  if (!token) {
    return NextResponse.json({ errors: [{ message: "No autenticado." }] }, { status: 401 });
  }

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    return NextResponse.json(
      { errors: [{ message: "El backend no está configurado." }] },
      { status: 500 }
    );
  }

  const body = await request.text();

  try {
    const res = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(BACKEND_TIMEOUT_MS),
    });

    const data = await res.text();
    return new NextResponse(data, {
      status: res.status,
      headers: { "content-type": "application/json" },
    });
  } catch {
    return NextResponse.json(
      { errors: [{ message: "Ocurrió un error inesperado." }] },
      { status: 502 }
    );
  }
}
