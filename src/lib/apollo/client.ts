import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import { ServerError } from "@apollo/client/errors";
import { ErrorLink } from "@apollo/client/link/error";
import { clearSession } from "@/app/actions/auth";

// Global 401 interceptor: /api/gql (src/app/api/gql/route.ts) returns HTTP 401
// whenever the session cookie is missing, or the backend rejects the token —
// which now also happens when another login took over the account's single
// active session, or the previous one was explicitly logged out. Apollo v4
// surfaces a non-2xx JSON response as a ServerError with `.statusCode`.
// Guard against firing more than once if several queries 401 in the same tick.
let handling401 = false;

const errorLink = new ErrorLink(({ error }) => {
  if (ServerError.is(error) && error.statusCode === 401 && !handling401) {
    handling401 = true;
    // Clear the httpOnly cookie server-side, then force a hard navigation to
    // /login so the whole client state (including the Apollo cache) resets.
    void clearSession().finally(() => window.location.assign("/login"));
  }
});

// Client-side Apollo instance shared by all (admin) route group pages
// (src/app/(admin)/layout.tsx). Points at the same-origin "/api/gql" route
// handler — NOT NEXT_PUBLIC_BACKEND_URL directly — so the request carries
// the httpOnly `session` cookie automatically and the JWT never needs to
// reach browser JS. See src/app/api/gql/route.ts for the server-side token
// injection.
export function makeApolloClient() {
  return new ApolloClient({
    link: ApolloLink.from([errorLink, new HttpLink({ uri: "/api/gql" })]),
    cache: new InMemoryCache(),
  });
}
