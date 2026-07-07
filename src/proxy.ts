import { NextRequest, NextResponse } from "next/server";

// Routes that require an authenticated session.
const PROTECTED_PREFIXES = ["/dashboard"];

// Optimistic check only: Proxy runs on every route, including prefetched
// ones, so it must only read the session cookie and never hit the backend
// (see node_modules/next/dist/docs/01-app/02-guides/authentication.md,
// "Optimistic checks with Proxy"). The real authorization boundary is the
// DAL's verifySession() (src/lib/dal.ts), which validates the token against
// the backend on every render.
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const token = request.cookies.get("session")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
