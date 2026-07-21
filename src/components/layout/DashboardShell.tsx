"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import ChangePasswordForm from "./ChangePasswordForm";
import type { MenuSummary } from "@/types/user";

type DashboardShellProps = {
  children: React.ReactNode;
  userName: string;
  userRole: string;
  userInitials: string;
  companyName: string;
  menus: MenuSummary[];
};

export default function DashboardShell({
  children,
  userName,
  userInitials,
  companyName,
  menus,
  userRole,
}: DashboardShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

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
        onChangePassword={() => setChangePasswordOpen(true)}
        userName={userName}
        userInitials={userInitials}
        companyName={companyName}
        menus={menus}
      />

      {changePasswordOpen && (
        <ChangePasswordForm onClose={() => setChangePasswordOpen(false)} />
      )}

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
