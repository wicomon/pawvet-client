<!-- BEGIN:nextjs-agent-rules -->

# Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`.
Your training data is outdated — the docs are the source of truth.

<!-- END:nextjs-agent-rules -->

# pawvet-client conventions

- App Router under `src/app/`, path alias `@/*` → `src/*`.
- Server Components by default; add `"use client"` only for interactivity (state, effects,
  browser APIs).
- Components: page-specific components are colocated in a private `_components/` folder next to
  the `page.tsx`/`layout.tsx` that uses them (e.g. `src/app/(admin)/menus/_components/`) — Next.js
  excludes `_`-prefixed folders from routing, so these are never publicly reachable. Only
  components genuinely shared across routes live in `src/components/` (`ui/`, `forms/fields/`,
  `brand/`, `layout/` for the admin shell). Data/copy modules shared across pages live in
  `src/content/` (e.g. `src/content/brand.ts`, `src/content/dashboard.ts`); icon-name resolvers
  and other cross-cutting helpers live in `src/lib/`. Don't redefine a page's own copy in
  `src/content/` — keep it in that page's `_components/content.ts` unless another route needs it.
- Auth: session cookie is `httpOnly`, set from the server via `next/headers` (`src/lib/session.ts`).
  Login runs as a Server Action (`src/app/actions/auth.ts`). Session/role checks go through the
  Data Access Layer in `src/lib/dal.ts` (`verifySession`, `getUser`, memoized with React's `cache`).
  `src/proxy.ts` only does the optimistic redirect — real authorization happens in the DAL.
- GraphQL talks to pawvet-server; queries/mutations live in `src/graphql/*.gql.ts`. Type every
  document as `TypedDocumentNode<Data, Variables>` (from `@apollo/client`) at its definition,
  using the shared types from `src/types/*.ts`. Never pass manual generics to `useQuery`/
  `useMutation` in components — Apollo Client 4 deprecated that overload; let the typed document
  drive inference instead (`useQuery(MY_QUERY)`, not `useQuery<Data>(MY_QUERY)`). See
  `src/graphql/role.gql.ts` / `menu.gql.ts` for the pattern.
- Route params and `searchParams` are Promises in this Next.js version — always `await` them.
- Tables: use `@tanstack/react-table` via the shared wrapper `src/components/ui/DataTable.tsx`
  (headless — styled with `wv-*` tokens, not a component library). Define a `ColumnDef<T>[]` for
  the screen and pass it with `data`; don't hand-roll table markup. See
  `src/app/(admin)/menus/_components/menuColumns.tsx` + `MenuTable.tsx` for the reference usage,
  including nested rows via `getSubRows`.
