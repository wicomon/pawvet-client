# Design token reference (`wv-*`)

Source of truth: `src/app/globals.css`. Every hex value below already has a token — **reuse it
instead of writing hex in a component**. Only add a new token when a color genuinely isn't covered
(see "Adding a new token" at the end).

All `wv-*` tokens are **light-only by design** (no `prefers-color-scheme: dark` override) — this
mirrors the landing (`wv-` prefix, distinct from the app's dark-mode-aware `brand`/`page`/`ink`
tokens). Keep new dashboard/app tokens light-only too unless a page explicitly needs dark mode.

## Landing palette (`src/components/pages/landing/` equivalent — brand marketing tones)

| Hex | Token | Typical use |
|---|---|---|
| `#0e8c6f` | `wv-teal` | Primary action background |
| `#0b7a60` | `wv-teal-hover` | Primary action hover |
| `#17be9a` | `wv-mint` | Accent, active nav icon, chart "strong" tone |
| `#29d3ae` | `wv-mint-bright` | Bright accent |
| `#0b2b45` | `wv-navy` | Sidebar background, dark headings |
| `#071e31` | `wv-navy-deep` | Darkest navy (overlay scrim base) |
| `#10395c` | `wv-navy-panel` | Sidebar hover panel |
| `#f6f9f8` | `wv-bg` | Page background (marketing) |
| `#edf5f2` | `wv-bg-alt` | Alternate section background |
| `#12283a` | `wv-ink` | Body text |
| `#0b2b45` | `wv-ink-strong` | Strong/heading text |
| `#3d566b` | `wv-muted` | Secondary text |
| `#5b7286` | `wv-muted-2` | Tertiary text (labels, meta) |
| `#7a8fa1` | `wv-faint` | Faintest text (placeholders, counts) |
| `#e3ece9` | `wv-border` | Default border |
| `#dff3ec` | `wv-mint-soft` | Success/confirmed badge background |
| `#fbf0d9` | `wv-amber-bg` | Warning badge background |
| `#8a6116` | `wv-amber-ink` | Warning badge text |
| `#f8e9e4` | `wv-chaos-bg` | Danger/overdue badge background |
| `#a34b3c` | `wv-chaos-ink` | Danger/overdue badge text |
| `#e9deda` | `wv-chaos-border` | Danger badge border |
| `#7fe7cc` | `wv-mint-light` | Light mint text/badge on a dark image panel (VetFlow Auth migration) |
| `#eaf1ee` | `wv-track` | Segmented-toggle track background (VetFlow Auth migration) |

## Dashboard / app-shell palette (added for the VetFlow Dashboard migration)

| Hex | Token | Typical use |
|---|---|---|
| `#f4f8f6` | `wv-canvas` | App shell background (behind cards) |
| `#9fb6c9` | `wv-sidebar-muted` | Sidebar nav text (inactive) |
| `#1d4a70` | `wv-navy-line` | Border inside navy panels (e.g. plan card) |
| `#0b6e58` | `wv-teal-deep` | Avatar initials, badge text on `wv-mint-soft` |
| `#06231b` | `wv-mint-ink` | Text on solid `wv-mint` badges |
| `#edf3f0` | `wv-row-border` | Border between list rows inside a card |
| `#f4fbf8` | `wv-mint-wash` | Row highlight (e.g. "in progress" row) |
| `#e3eefb` | `wv-info-bg` | Info/neutral status badge background |
| `#2a5b8f` | `wv-info-ink` | Info/neutral status badge text |
| `#d4e2dd` | `wv-btn-border` | Outline button border |
| `#cfe9e0` | `wv-mint-pale` | Chart bar — lightest tone |
| `#9bd6c4` | `wv-mint-mid` | Chart bar — mid tone |

Chart "strong" tone reuses `wv-mint` (`#17be9a`) — don't add a duplicate token for it.

## Adding a new token

If a template needs a color genuinely not covered above:

1. Add it to **both** places in `src/app/globals.css`, keeping the existing grouping (landing vs.
   dashboard/app-shell):
   ```css
   :root {
     /* ...existing wv- tokens... */
     --color-wv-my-new-tone: #123456;
   }

   @theme inline {
     /* ...existing wv- mappings... */
     --color-wv-my-new-tone: var(--color-wv-my-new-tone);
   }
   ```
2. Name it semantically (`wv-info-bg`, not `wv-blue-1`) so it reads the same as the rest of the
   palette.
3. Do **not** add a `prefers-color-scheme: dark` override for it unless the page you're building
   is explicitly meant to support dark mode — every `wv-*` token today is light-only on purpose.
4. Update this file with the new row.
