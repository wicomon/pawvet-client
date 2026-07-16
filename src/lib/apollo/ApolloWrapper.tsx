"use client";

import { useState } from "react";
import { ApolloProvider } from "@apollo/client/react";
import { makeApolloClient } from "./client";

// Scopes Apollo Client to the (admin) route group (mounted in
// src/app/(admin)/layout.tsx) instead of wrapping the whole app — every
// route outside (admin) stays server-first with raw fetch (see CLAUDE.md).
// `useState(() => ...)` keeps a single client instance stable across
// re-renders/navigations within the (admin) layout.
export default function ApolloWrapper({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => makeApolloClient());

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
