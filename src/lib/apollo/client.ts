import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

// Client-side Apollo instance shared by all (admin) route group pages
// (src/app/(admin)/layout.tsx). Points at the same-origin "/api/gql" route
// handler — NOT NEXT_PUBLIC_BACKEND_URL directly — so the request carries
// the httpOnly `session` cookie automatically and the JWT never needs to
// reach browser JS. See src/app/api/gql/route.ts for the server-side token
// injection.
export function makeApolloClient() {
  return new ApolloClient({
    link: new HttpLink({ uri: "/api/gql" }),
    cache: new InMemoryCache(),
  });
}
