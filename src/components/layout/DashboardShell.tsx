"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import type { MenuSummary } from "@/types/user";

type DashboardShellProps = {
  children: React.ReactNode;
  userName: string;
  userInitials: string;
  companyName: string;
  menus: MenuSummary[];
};

// Client Component boundary for the app shell's mobile-drawer state. `children`
// is the Server Component page passed straight through — see
// node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md
// ("Passing Server Components to Client Components as props").
export default function DashboardShell({
  children,
  userName,
  userInitials,
  companyName,
  menus,
}: DashboardShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-dvh items-stretch">
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
          className="fixed inset-0 z-60 bg-wv-navy-deep/45 lg:hidden"
        />
      )}

      <Sidebar
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        userName={userName}
        userInitials={userInitials}
        companyName={companyName}
        menus={menus}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onOpenMenu={() => setMenuOpen(true)} />
        <main
          data-screen-label="Dashboard"
          className="flex flex-col gap-4.5 p-3.5 sm:p-7 sm:gap-5.5"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
