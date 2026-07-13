import Link from "next/link";
import type { AuthMode } from "./content";

const TABS: { mode: AuthMode; label: string; href: string }[] = [
  { mode: "login", label: "Iniciar sesión", href: "/login" },
  { mode: "register", label: "Crear cuenta", href: "/login?mode=register" },
];

// Segmented login/register toggle. Mode is URL state (?mode=), so this is a
// pair of links, not client-side tab state — gives deep-linking and SSR for
// free (migrate-design-templates skill, Step 4).
export default function AuthModeTabs({ mode }: { mode: AuthMode }) {
  return (
    <div className="grid grid-cols-2 gap-1 rounded-xl border border-wv-border bg-wv-track p-1">
      {TABS.map((tab) => {
        const active = tab.mode === mode;
        return (
          <Link
            key={tab.mode}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-[9px] px-3 py-2.5 text-center text-sm font-extrabold outline-none transition-colors duration-150 focus-visible:shadow-focus ${
              active
                ? "bg-white text-wv-navy shadow-[0_2px_8px_rgba(11,43,69,0.1)]"
                : "text-wv-muted-2 hover:text-wv-navy"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
