"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronsUpDown, KeyRound, LogOut } from "lucide-react";
import BrandIcon from "@/components/brand/BrandIcon";
import { BRAND } from "@/content/brand";
import { logout } from "@/app/actions/auth";
import { resolveMenuIcon } from "@/lib/menuIcons";
import type { MenuSummary } from "@/types/user";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  onChangePassword: () => void;
  userName: string;
  userInitials: string;
  companyName: string;
  menus: MenuSummary[];
};

// Client Component: needs usePathname() for the active nav state (see
// node_modules/next/dist/docs/01-app/03-api-reference/04-functions/use-pathname.md
// — reading the current URL is only supported in a Client Component).
export default function Sidebar({
  isOpen,
  onClose,
  onChangePassword,
  userName,
  userInitials,
  companyName,
  menus,
}: SidebarProps) {
  const pathname = usePathname();
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  // Close the account popover on outside click / Escape. It's only wired up
  // while open, since it's a lightweight, always-listening handler otherwise.
  useEffect(() => {
    if (!accountMenuOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (!accountMenuRef.current?.contains(event.target as Node)) {
        setAccountMenuOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setAccountMenuOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [accountMenuOpen]);

  return (
    <aside
      data-screen-label="Sidebar"
      className={`fixed inset-y-0 left-0 z-70 flex h-dvh w-66 flex-col gap-5 bg-wv-navy p-3.5 transition-transform duration-250 ease-out lg:sticky lg:top-0 lg:z-auto lg:h-dvh lg:w-58 lg:translate-x-0 lg:gap-6 ${
        isOpen ? "translate-x-0 shadow-[0_0_40px_rgba(0,0,0,0.35)]" : "translate-x-[-105%]"
      }`}
    >
      <Link href="/dashboard" className="flex items-center gap-2.5 px-2.5 py-1" onClick={onClose}>
        <span className="grid h-8 w-8 place-items-center rounded-[9px] bg-wv-mint">
          <BrandIcon size={18} tone="navy" />
        </span>
        <span className="font-heading text-lg font-bold text-white">{BRAND}</span>
      </Link>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
        {menus.map((item) => {
          // "/dashboard" itself must match exactly — every nested route
          // also starts with it and would otherwise keep it highlighted
          // everywhere.
          const active =
            item.path === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.path);
          const Icon = resolveMenuIcon(item.icon);

          return (
            <Link
              key={item.id}
              href={item.path}
              onClick={onClose}
              aria-current={active ? "page" : undefined}
              className={`flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-bold outline-none transition-colors duration-150 ease-out focus-visible:shadow-focus ${
                active
                  ? "bg-wv-mint/[0.14] text-white"
                  : "text-wv-sidebar-muted hover:bg-white/8"
              }`}
            >
              <Icon
                aria-hidden="true"
                className="h-5 w-5 shrink-0"
                color={active ? "var(--color-wv-mint)" : "var(--color-wv-sidebar-muted)"}
                strokeWidth={2}
              />
              <span className="flex-1 text-left">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-3 border-t border-wv-navy-line pt-3">
        <div className="flex flex-col gap-1 rounded-xl border border-wv-navy-line bg-wv-navy-panel px-3.5 py-3">
          <span className="text-[11px] font-extrabold tracking-wider text-wv-mint uppercase">
            Plan Clínica Pro
          </span>
          <span className="text-[12.5px] leading-[1.45] text-wv-sidebar-muted">
            Prueba: quedan 9 días
          </span>
        </div>

        {/* Account menu: avatar + name is the trigger for a popover holding
            "Cambiar contraseña" and "Cerrar sesión", so neither is always
            visible in the sidebar. Opens upward (bottom-full) since it sits
            at the foot of the sidebar. */}
        <div ref={accountMenuRef} className="relative">
          {accountMenuOpen && (
            <div
              role="menu"
              aria-label="Cuenta"
              className="absolute right-0 bottom-full left-0 z-10 mb-2 flex flex-col overflow-hidden rounded-xl border border-wv-navy-line bg-wv-navy-panel py-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.35)]"
            >
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setAccountMenuOpen(false);
                  onChangePassword();
                  onClose();
                }}
                className="flex w-full items-center gap-3 px-3.5 py-2.5 text-left text-sm font-bold text-wv-sidebar-muted outline-none transition-colors duration-150 ease-out hover:bg-white/8 hover:text-white focus-visible:shadow-focus hover:cursor-pointer"
              >
                <KeyRound aria-hidden="true" className="h-4.5 w-4.5 shrink-0" strokeWidth={2} />
                Cambiar contraseña
              </button>

              <form
                action={logout}
                className="border-t border-wv-navy-line"
                onSubmit={() => setAccountMenuOpen(false)}
              >
                <button
                  type="submit"
                  role="menuitem"
                  className="flex w-full items-center gap-3 px-3.5 py-2.5 text-left text-sm font-bold text-wv-sidebar-muted outline-none transition-colors duration-150 ease-out hover:bg-white/8 hover:text-white focus-visible:shadow-focus hover:cursor-pointer"
                >
                  <LogOut aria-hidden="true" className="h-4.5 w-4.5 shrink-0" strokeWidth={2} />
                  Cerrar sesión
                </button>
              </form>
            </div>
          )}

          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={accountMenuOpen}
            onClick={() => setAccountMenuOpen((open) => !open)}
            className="flex w-full items-center gap-2.5 rounded-[10px] px-2.5 py-2 outline-none transition-colors duration-150 ease-out hover:bg-white/8 focus-visible:shadow-focus hover:cursor-pointer"
          >
            <div className="grid h-8.5 w-8.5 shrink-0 place-items-center rounded-full bg-wv-mint-soft font-heading text-[13px] font-bold text-wv-teal-deep">
              {userInitials}
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-px text-left">
              <span className="truncate text-[13.5px] font-bold text-white">{userName}</span>
              <span className="truncate text-[11.5px] text-wv-sidebar-muted">
                {companyName}
              </span>
            </div>
            <ChevronsUpDown
              aria-hidden="true"
              className="h-4 w-4 shrink-0 text-wv-sidebar-muted"
              strokeWidth={2}
            />
          </button>
        </div>
      </div>
    </aside>
  );
}
