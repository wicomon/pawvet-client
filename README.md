# vdemia-client

Web client for vdemia, built with Next.js (App Router) on top of a GraphQL API served by the
sibling `vdemia-server` repo.

## Stack

- **Next.js 16.2** (App Router, Turbopack) — React 19, TypeScript 5
- **Tailwind CSS v4** — design tokens as CSS custom properties, exposed via `@theme inline`
- **GraphQL** — `gql` tagged templates (`@apollo/client`'s tag only) + `print()` from `graphql`,
  consumed with raw `fetch`. There is no Apollo Client (or other GraphQL client) instance wired
  into the app.
- **Formik + Yup** — form state and validation
- **pnpm** — package manager

## Getting started

Requires a running instance of `vdemia-server`. Create `.env.local` with:

```bash
NEXT_PUBLIC_BACKEND_URL=http://localhost:4030/gql
```

Everything server-side (DAL, Server Actions, `proxy.ts`) reads this variable directly with
`fetch` — there's no client abstraction layer to configure.

```bash
pnpm dev              # start dev server (Turbopack) on :3000
pnpm build            # production build
pnpm start            # run a production build
pnpm lint             # eslint (flat config, eslint-config-next)
pnpm exec eslint <path>  # lint a single file
```

There is no test suite configured in this repo (no test script/framework in `package.json`).

## Project structure

```
src/
  app/
    actions/auth.ts    # Server Actions: login, logout
    dashboard/         # protected route (Server Component, no client-side fetching)
    login/             # login form (Client Component, useActionState)
    layout.tsx          # root layout, next/font setup
    globals.css          # design tokens (CSS vars + Tailwind v4 @theme)
  lib/
    dal.ts              # Data Access Layer — the real authorization boundary
    session.ts          # server-only cookie helpers
    isLogged.ts         # raw fetch against authValidateToken
  graphql/
    auth.gql.ts         # gql tagged templates (queries/mutations)
  types/
    user.ts
  proxy.ts               # edge-runtime optimistic auth redirect
```

## Auth infrastructure

Auth is split across several layers with distinct responsibilities:

- **`src/proxy.ts`** — edge-runtime optimistic check. Redirects to `/login` if the `session`
  cookie is missing or `isLogged()` rejects it. This is *not* the real authorization boundary.
- **`src/lib/isLogged.ts`** — raw `fetch` against the backend's `authValidateToken` query. Used
  both by `proxy.ts` (edge runtime, no heavier client available there) and by the DAL.
- **`src/lib/session.ts`** — `server-only`. Sets/reads/deletes the `session` cookie (`httpOnly`,
  `secure` in prod, `sameSite: lax`). The cookie value *is* the backend-issued JWT; it isn't
  re-signed or re-encrypted client-side.
- **`src/lib/dal.ts`** — `server-only` Data Access Layer, the **real authorization boundary**.
  `verifySession()` and `getUser()` are both memoized per-render with React's `cache()`.
  `verifySession()` redirects to `/login` itself if the token is missing/invalid, so callers can
  assume a valid session once it resolves.
- **`src/app/actions/auth.ts`** — `"use server"` Server Actions `login`/`logout`. `login`
  validates with Yup, calls the backend `authLogin` mutation via raw `fetch`, then
  `createSession()` and `redirect("/dashboard")`. `logout` calls `deleteSession()` and redirects
  to `/login`.
- **`src/app/login/page.tsx`** — Client Component using `useActionState(login, ...)` against a
  plain `<form action={...}>` (progressive-enhancement pattern, no client GraphQL/cookie
  libraries involved).
- **`src/app/dashboard/page.tsx`** — Server Component; calls `getUser()` from the DAL directly
  and renders a `<form action={logout}>` button. No client-side data fetching.

Net effect: nothing under `/dashboard` fetches data or checks auth on the client. If you add a
new protected route or a new piece of user data, **extend the DAL** (`src/lib/dal.ts`) rather
than re-implementing session/token handling elsewhere.

## GraphQL

Queries/mutations are plain `gql` tagged templates in `src/graphql/*.gql.ts` (e.g.
`auth.gql.ts`). They're consumed by printing them with `print()` from the `graphql` package and
POSTing to `NEXT_PUBLIC_BACKEND_URL` with raw `fetch` — there is currently no Apollo Client (or
other GraphQL client) instance in the app; `@apollo/client` is only used for its `gql` tag.

## Design tokens

`src/app/globals.css` defines the color/shadow/radius system as CSS custom properties on `:root`
(light) and inside a `prefers-color-scheme: dark` override, then re-exposes them to Tailwind v4
via an `@theme inline` block. Components use the semantic utility names this generates
(`bg-page`, `text-ink`, `bg-brand`, `rounded-card`, `shadow-card`, etc.) instead of Tailwind's
default palette. Fonts (`Plus_Jakarta_Sans` as `--font-jakarta`/`font-display`, `Inter` as
`--font-inter`/`font-sans`) are loaded in `src/app/layout.tsx` via `next/font/google` and mapped
the same way.

## Next.js conventions

- Read the relevant doc in `node_modules/next/dist/docs/` before making Next.js-specific
  changes — training data on Next.js APIs tends to be outdated; the docs are the source of
  truth.
- App Router under `src/app/`, path alias `@/*` → `src/*`.
- Server Components by default; add `"use client"` only for interactivity (state, effects,
  browser APIs).
- Auth/session checks go through the Data Access Layer (`src/lib/dal.ts`), not ad-hoc cookie
  reads or client-side fetches.
- GraphQL queries/mutations live in `src/graphql/*.gql.ts`.
- Route `params` and `searchParams` are Promises in this Next.js version — always `await` them.
