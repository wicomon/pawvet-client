---
name: migrate-design-templates
description: Use when importing or implementing a Claude Design template (a claude.ai/design project, a `.dc.html` file, or anything reached via the `claude_design`/`DesignSync` MCP tool) into this app — e.g. "migrate this dashboard template", "implement <Name>.dc.html", "import my claude.ai/design project".
---

# Migrating a Claude Design template into pawvet-client

This codifies the exact process used to migrate `VetFlow Dashboard.dc.html` (shell + Dashboard,
Agenda, and patient-record views) into real Next.js routes and components. Follow it for any future
`.dc.html` template so results stay consistent without re-deriving these decisions each time.

## Step 0 — Load context before writing any code

1. Read the relevant doc under `node_modules/next/dist/docs/01-app/` for whatever you're about to
   touch (routing, layouts, params). Also read the `nextjs-conventions` skill — it has the
   project-specific rules (params/searchParams are Promises, DAL, Server Actions, `proxy.ts`).
   `@AGENTS.md` and `@CLAUDE.md` are the top-level references.
2. **Invoke `ui-ux-pro-max` and `emil-design-eng` — required, not optional.** Use `ui-ux-pro-max`
   for the design-system pass (style/color/typography selection, UX checklist) and
   `emil-design-eng` for interaction/polish judgment calls (states, motion intent, review format).
   Do this before writing components, not as an afterthought.
3. If the migration adds or changes any animation/transition, run it past **`review-animations`**
   before considering the view done (its companion reference is `animation-vocabulary` — consult it
   when naming/choosing a motion pattern). Purely static ports of a static mock section can skip
   this, but anything with a transition, drawer, or hover/press state should go through it.

## Step 1 — Import the template

Use the `DesignSync` tool (backed by the `claude_design` MCP):

```
DesignSync list_files  { projectId: "<uuid from the claude.ai/design/p/<uuid> URL>" }
DesignSync get_file     { projectId, path: "<Name>.dc.html" }
```

The `.dc.html` mock format:
- The `<x-dc>` markup (`sc-if`, `sc-for`, `{{ expr }}`) describes **structure and bindings**, not
  literal HTML to copy — it's a description of what varies (lists, conditionals).
- The `<script type="text/x-dc" data-dc-script>` block at the end of the file is where the real
  payload lives: sample data arrays, `statusStyles`/color maps, computed pixel sizes (e.g. hour-row
  height, icon paths). This is what becomes each page's `content.ts` — read it fully before
  starting to port components, since prop shapes and status enums come from here.

## Step 2 — Map colors to design tokens

Never introduce raw hex into a component. Open `TOKENS.md` (bundled next to this file) and:

1. Match every color the template uses to an existing `wv-*` token.
2. Only add a token for colors genuinely not covered — following the exact recipe in `TOKENS.md`
   ("Adding a new token"): both `:root` and `@theme inline` in `src/app/globals.css`, light-only
   (no `prefers-color-scheme: dark` override — every `wv-*` token today is intentionally
   light-only, matching the landing).
3. Status/badge colors go through a small helper in the page's `content.ts` that returns
   `{ label, className }` (Tailwind token classes), so components never branch on raw color.

## Step 3 — Component structure

**All folder and file names are in English — including route segments.** This is non-negotiable:
`patients`, not `pacientes`; `schedule`, not `agenda`. The only Spanish allowed anywhere in the
codebase is user-facing copy (labels, button text, page titles) — that's product content, not code.

- **Page-specific components → `src/components/pages/<page-name>/`.** Everything that belongs to
  one view (its sections, its `content.ts`, any sub-components) lives together in that folder.
  Example: `src/components/pages/schedule/{content.ts, DaySelector.tsx, WeekGrid.tsx}`,
  `src/components/pages/patient/{content.ts, PatientHeader.tsx, ClinicalHistory.tsx, ...}`.
  - *Why `pages/` and not `app/<route>/_components/`*: Next.js is explicitly unopinionated about
    this (see `01-app/01-getting-started/02-project-structure.md` — colocating in `app/` via a
    private `_folder` and keeping components outside `app/` in `components/` are both sanctioned).
    This project chose the latter. Be aware `pages/` as a name can read as a nod to the legacy
    Pages Router — that's just a naming coincidence here, not a routing mechanism.
- **Shared across 2+ pages → a shared folder, not `pages/`.** The app shell (`Sidebar`, `Topbar`)
  and reusable primitives (`PawMark`, icons) belong in something like `src/components/layout/` or
  `src/components/ui/`. If a component in `pages/<page-name>/` turns out to be needed by a second
  page, promote it out to the shared folder — don't duplicate it.
- **Component conventions** (mirrors `src/components/landing/`): one component per section,
  `export default function ComponentName()`, all copy/sample data centralized in that page's
  `content.ts` — never redefine the same string/status/price in two components. Reuse
  `src/components/landing/PawMark.tsx` for the brand mark. Icons come from `lucide-react` (already
  a dependency) — never emoji, per the UI-quality checklist in `ui-ux-pro-max`.

## Step 4 — Routes, Server/Client boundary, and view state

- Real Next.js routes with a shared layout: `src/app/<feature>/layout.tsx` does the data-fetching
  (e.g. `getUser()` from `src/lib/dal.ts`) and passes results down as props to a Client Component
  shell — see `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`
  ("Passing Server Components to Client Components as props").
- **Default to Server Components.** Add `"use client"` only on the actual interactive leaf (e.g.
  the mobile drawer's open/close state) — not on whole pages.
- **View/tab/day switching is URL state, not `useState`.** The mock drives all of this with React
  state (`this.state.view`, `petTab`, `agendaDay`); port it to `searchParams` / route params instead
  (`?day=2`, `?tab=vaccines`, or a route segment like `/patients/[id]`). Always `await` `params`/
  `searchParams` — they're Promises in this Next.js version. This gets you deep-linking and SSR for
  free and usually removes the need for a client component entirely.
- The mock's JS-computed mobile breakpoint (commonly ~820px, read from `window.innerWidth`) becomes
  a Tailwind breakpoint (e.g. `lg:`) driving a fixed sidebar above it and a drawer + overlay below —
  no resize listener needed.

## Step 5 — Styling and quality bar

- Tailwind utilities + `wv-*` tokens; arbitrary values (`text-[38px]`, `h-[54px]`) for exact px from
  the mock, same as the landing. Hand-written CSS only for what utilities genuinely can't express
  (e.g. a keyframe not expressible as a transition).
- Every clickable element: `cursor-pointer` and `focus-visible:shadow-focus`. Icon-only buttons get
  an `aria-label` or `sr-only` text. Nav items without a built route yet render as a disabled
  placeholder (`aria-disabled`, no href) instead of a dead link.
- Run the `ui-ux-pro-max` pre-delivery checklist (accessibility, touch targets, contrast) before
  calling a view done.

## Step 6 — Verify

```
pnpm exec eslint <changed paths>
pnpm exec tsc --noEmit
pnpm build   # confirm the new routes show up in the route table
```
Check responsive behavior at 375px and that the mobile drawer/overlay works without a horizontal
scrollbar.

## Checklist

- [ ] `ui-ux-pro-max` and `emil-design-eng` consulted for the design pass; `review-animations` run
      if motion was added
- [ ] Every folder/file name — including route segments — is in English
- [ ] Page-specific components live in `components/pages/<page-name>/`; shared ones promoted out
- [ ] No raw hex in components — all colors are `wv-*` tokens (new ones added per `TOKENS.md`)
- [ ] Server Components by default; `"use client"` only on the interactive leaf
- [ ] View/tab/day state lives in the URL, not `useState`
- [ ] Icons are `lucide-react` SVGs, never emoji
- [ ] `cursor-pointer`, `focus-visible:shadow-focus`, and `aria-*` on interactive elements
- [ ] `eslint`, `tsc --noEmit`, and `pnpm build` all pass clean
