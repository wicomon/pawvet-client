import "server-only";
import { cookies } from "next/headers";

// The backend (vdemia-server) issues the JWT; we don't re-sign it, we just
// store it as a stateless httpOnly session cookie. See next-doc/authentication.md
// ("Stateless Sessions") and node_modules/next/dist/docs/01-app/02-guides/authentication.md.
const SESSION_COOKIE = "session";
const SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60; // 7 days

export async function createSession(
  token: string,
  { remember = true }: { remember?: boolean } = {}
) {
  const cookieStore = await cookies();

  // When "remember me" is off, omit `expires` so the cookie is a session
  // cookie (cleared when the browser closes) instead of persisting 7 days.
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    ...(remember && {
      expires: new Date(Date.now() + SESSION_MAX_AGE_SECONDS * 1000),
    }),
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getSessionToken() {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value;
}
