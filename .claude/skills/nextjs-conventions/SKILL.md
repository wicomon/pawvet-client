---
name: nextjs-conventions
description: Use whenever writing or reviewing Next.js code in this repo (routes, layouts, Server/Client Components, proxy, auth) to make sure it follows the official, version-matched Next.js conventions instead of outdated training data.
---

# Next.js conventions (vdemia-client)

This project follows the official convention Next.js ships for AI agents: version-matched docs
are bundled inside the installed `next` package, and should be consulted instead of training data,
which lags behind fast-moving APIs (e.g. `params`/`searchParams` becoming Promises, `middleware.ts`
being renamed to `proxy.ts`).

## Before writing Next.js code

1. Read the relevant doc under `node_modules/next/dist/docs/01-app/` for the feature you're
   touching (routing, layouts, data fetching, auth, etc.) — it matches the exact installed version
   (currently 16.2.10), not a generic snapshot.
2. Cross-check against the project-specific rules below, which reflect decisions already made in
   this codebase.

## Project conventions

- **Structure**: App Router lives in `src/app/`. Alias `@/*` → `src/*`. Shared code outside routing
  goes in `src/lib/`, `src/graphql/`, `src/types/`.
- **Server vs Client Components**: default to Server Components. Add `"use client"` only for
  state, effects, or browser APIs — keep it on the leaf component, not whole pages.
- **Params/searchParams**: always `Promise<...>` — `await` them, never destructure directly.
- **Proxy**: `src/proxy.ts` (not `middleware.ts`) — Next.js 16 accepts either a default export or
  a named `export function proxy(...)`. This project uses the named export.
- **Auth**: session cookie is `httpOnly`, set from the server (`src/lib/session.ts`, using
  `next/headers`). Login is a Server Action (`src/app/actions/auth.ts`), not a client-side mutation.
  Authorization checks go through the Data Access Layer (`src/lib/dal.ts`): `verifySession()` and
  `getUser()`, both memoized with React's `cache()`. `proxy.ts` only does the optimistic
  redirect — it must not be the only authorization check (see
  `node_modules/next/dist/docs/01-app/02-guides/authentication.md`).
- **GraphQL**: queries/mutations are defined with `gql` in `src/graphql/*.gql.ts` and reused by
  both server-side fetches (DAL, Server Actions) and any client Apollo usage.

## When something looks off

If existing code contradicts the bundled docs (e.g. reads `params` synchronously, sets an
auth cookie from client JS, or puts data fetching in a Client Component), treat the bundled docs
as the source of truth and flag/fix the divergence rather than copying the existing pattern.
