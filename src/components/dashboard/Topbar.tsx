"use client";

import { Menu, Search } from "lucide-react";
import { TODAY_LABEL } from "./content";

type TopbarProps = {
  onOpenMenu: () => void;
};

// Client Component only because of the mobile menu button's onClick — the
// rest is static markup. Kept separate from Sidebar so DashboardShell can
// compose them independently.
export default function Topbar({ onOpenMenu }: TopbarProps) {
  return (
    <header
      data-screen-label="Topbar"
      className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-wv-border bg-card px-3.5 sm:px-7"
    >
      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="Abrir menú de navegación"
        className="grid h-10.5 w-10.5 shrink-0 cursor-pointer place-items-center rounded-[10px] border-[1.5px] border-wv-btn-border bg-card outline-none focus-visible:shadow-focus lg:hidden"
      >
        <Menu aria-hidden="true" className="h-4.5 w-4.5 text-wv-navy" strokeWidth={2.25} />
      </button>

      <div className="hidden max-w-105 flex-1 items-center gap-2.5 rounded-[10px] border border-wv-border bg-wv-canvas px-3.5 py-2.5 sm:flex">
        <Search aria-hidden="true" className="h-4.5 w-4.5 shrink-0 text-wv-faint" strokeWidth={2} />
        <span className="text-sm font-semibold text-wv-faint">
          Buscar paciente, dueño o teléfono…
        </span>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <span className="hidden text-[13.5px] font-bold text-wv-muted-2 sm:inline">
          {TODAY_LABEL}
        </span>
        <button
          type="button"
          className="cursor-pointer whitespace-nowrap rounded-[10px] bg-wv-teal px-4.5 py-2.5 text-sm font-extrabold text-white shadow-[0_6px_16px_rgba(14,140,111,0.22)] outline-none transition-colors duration-150 ease-out hover:bg-wv-teal-hover focus-visible:shadow-focus"
        >
          + Nueva cita
        </button>
        <button
          type="button"
          className="hidden cursor-pointer whitespace-nowrap rounded-[10px] border-[1.5px] border-wv-btn-border bg-card px-4 py-2.5 text-sm font-bold text-wv-navy outline-none transition-colors duration-150 ease-out hover:border-wv-teal focus-visible:shadow-focus sm:inline-flex"
        >
          Nueva venta
        </button>
      </div>
    </header>
  );
}
