<!-- BEGIN:nextjs-agent-rules -->

# Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`.
Your training data is outdated — the docs are the source of truth.

<!-- END:nextjs-agent-rules -->

# pawvet-client conventions

- App Router under `src/app/`, path alias `@/*` → `src/*`.
- Server Components by default; add `"use client"` only for interactivity (state, effects,
  browser APIs).
- Auth: session cookie is `httpOnly`, set from the server via `next/headers` (`src/lib/session.ts`).
  Login runs as a Server Action (`src/app/actions/auth.ts`). Session/role checks go through the
  Data Access Layer in `src/lib/dal.ts` (`verifySession`, `getUser`, memoized with React's `cache`).
  `src/proxy.ts` only does the optimistic redirect — real authorization happens in the DAL.
- GraphQL talks to pawvet-server; queries/mutations live in `src/graphql/*.gql.ts`.
- Route params and `searchParams` are Promises in this Next.js version — always `await` them.
- Tables: use `@tanstack/react-table` via the shared wrapper `src/components/ui/DataTable.tsx`
  (headless — styled with `wv-*` tokens, not a component library). Define a `ColumnDef<T>[]` for
  the screen and pass it with `data`; don't hand-roll table markup. See
  `src/components/menus/menuColumns.tsx` + `MenuTable.tsx` for the reference usage, including
  nested rows via `getSubRows`.
