"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import PawMark from "@/components/landing/PawMark";
import { logout } from "@/app/actions/auth";
import { NAV_ITEMS } from "./content";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userInitials: string;
  organizationName: string;
};

// Client Component: needs usePathname() for the active nav state (see
// node_modules/next/dist/docs/01-app/03-api-reference/04-functions/use-pathname.md
// — reading the current URL is only supported in a Client Component).
export default function Sidebar({
  isOpen,
  onClose,
  userName,
  userInitials,
  organizationName,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      data-screen-label="Sidebar"
      className={`fixed inset-y-0 left-0 z-[70] flex h-dvh w-[264px] flex-col gap-5 bg-wv-navy p-3.5 transition-transform duration-[250ms] ease-out lg:sticky lg:top-0 lg:z-auto lg:h-dvh lg:w-[232px] lg:translate-x-0 lg:gap-6 ${
        isOpen ? "translate-x-0 shadow-[0_0_40px_rgba(0,0,0,0.35)]" : "-translate-x-[105%]"
      }`}
    >
      <Link href="/dashboard" className="flex items-center gap-2.5 px-2.5 py-1" onClick={onClose}>
        <span className="grid h-8 w-8 place-items-center rounded-[9px] bg-wv-mint">
          <PawMark size={18} color="var(--color-wv-navy)" />
        </span>
        <span className="font-heading text-lg font-bold text-white">VetFlow</span>
      </Link>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          // "/dashboard" itself must match exactly — every nested route
          // (schedule, patients/[id]) also starts with it and would
          // otherwise keep it highlighted everywhere.
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          if (!item.enabled) {
            return (
              <span
                key={item.label}
                aria-disabled="true"
                title="Próximamente"
                className="flex w-full cursor-not-allowed items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-bold text-wv-sidebar-muted/50"
              >
                <Icon aria-hidden="true" className="h-5 w-5 shrink-0" strokeWidth={2} />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="rounded-full bg-white/10 px-[7px] py-0.5 text-[11px] font-extrabold text-wv-sidebar-muted">
                    {item.badge}
                  </span>
                )}
              </span>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              aria-current={active ? "page" : undefined}
              className={`flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-bold outline-none transition-colors duration-150 ease-out focus-visible:shadow-focus ${
                active
                  ? "bg-wv-mint/[0.14] text-white"
                  : "text-wv-sidebar-muted hover:bg-white/[0.08]"
              }`}
            >
              <Icon
                aria-hidden="true"
                className="h-5 w-5 shrink-0"
                color={active ? "var(--color-wv-mint)" : "var(--color-wv-sidebar-muted)"}
                strokeWidth={2}
              />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className="rounded-full bg-wv-mint px-[7px] py-0.5 text-[11px] font-extrabold text-wv-mint-ink">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1 rounded-xl border border-wv-navy-line bg-wv-navy-panel px-3.5 py-3">
          <span className="text-[11px] font-extrabold tracking-[0.05em] text-wv-mint uppercase">
            Plan Clínica Pro
          </span>
          <span className="text-[12.5px] leading-[1.45] text-wv-sidebar-muted">
            Prueba: quedan 9 días
          </span>
        </div>

        <div className="flex items-center gap-2.5 rounded-[10px] px-2.5 py-2">
          <div className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full bg-wv-mint-soft font-heading text-[13px] font-bold text-wv-teal-deep">
            {userInitials}
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-px">
            <span className="truncate text-[13.5px] font-bold text-white">{userName}</span>
            <span className="truncate text-[11.5px] text-wv-sidebar-muted">
              {organizationName}
            </span>
          </div>
          <form action={logout}>
            <button
              type="submit"
              title="Cerrar sesión"
              className="cursor-pointer rounded-md p-1.5 text-wv-sidebar-muted outline-none transition-colors duration-150 ease-out hover:bg-white/[0.08] hover:text-white focus-visible:shadow-focus"
            >
              <span className="sr-only">Cerrar sesión</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-[18px] w-[18px]"
              >
                <path
                  d="M15 17l5-5-5-5M20 12H9M12 19H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
