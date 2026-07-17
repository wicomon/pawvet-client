"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client/react";
import { MENU_FIND_ALL } from "@/graphql/menu.gql";
import type { Menu } from "@/types/menu";
import MenuTable from "./MenuTable";
import MenuFormModal from "./MenuFormModal";
import ConfirmDialog from "./ConfirmDialog";

type Toast = { kind: "success" | "error"; message: string };

export default function MenusManager() {
  const { data, loading, error } = useQuery(MENU_FIND_ALL);
  const [formTarget, setFormTarget] = useState<Menu | null | undefined>(undefined); // undefined = closed, null = create
  const [createParentId, setCreateParentId] = useState<string | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<Menu | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  const menus = [...(data?.menuFindAll ?? [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <section className="flex flex-col gap-3.5 rounded-2xl border border-wv-border bg-card px-6 py-5.5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-heading text-[17px] font-bold text-wv-navy">Menús</h2>
          <p className="text-[13px] font-semibold text-wv-muted">
            Menús raíz y sus submenús, mostrados en la barra lateral.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setCreateParentId(undefined);
            setFormTarget(null);
          }}
          className="cursor-pointer rounded-[10px] bg-wv-teal px-3.5 py-2.25 text-[13px] font-extrabold text-white outline-none transition-colors duration-150 ease-out hover:bg-wv-teal-hover focus-visible:shadow-focus"
        >
          + Nuevo menú
        </button>
      </div>

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={`rounded-xl px-3.5 py-2.5 text-[13px] font-semibold ${
            toast.kind === "success" ? "bg-wv-mint-soft text-wv-teal-deep" : "bg-danger-bg text-danger"
          }`}
        >
          {toast.message}
        </div>
      )}

      {loading && (
        <div className="flex flex-col gap-1.5" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-13 animate-pulse rounded-[10px] bg-wv-bg-alt" />
          ))}
        </div>
      )}

      {error && !loading && (
        <div role="alert" className="rounded-xl bg-danger-bg px-3.5 py-2.5 text-[13px] font-semibold text-danger">
          No se pudieron cargar los menús. {error.message}
        </div>
      )}

      {!loading && !error && (
        <MenuTable
          menus={menus}
          onEdit={(menu) => setFormTarget(menu)}
          onDelete={setDeleteTarget}
          onAddSubmenu={(parentId) => {
            setCreateParentId(parentId);
            setFormTarget(null);
          }}
        />
      )}

      {formTarget !== undefined && (
        <MenuFormModal
          menu={formTarget}
          menus={menus}
          presetParentId={createParentId}
          onClose={() => {
            setFormTarget(undefined);
            setCreateParentId(undefined);
          }}
          onSaved={(message) => {
            setFormTarget(undefined);
            setCreateParentId(undefined);
            setToast({ kind: "success", message });
          }}
          onError={(message) => setToast({ kind: "error", message })}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          menu={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onDeleted={(message) => {
            setDeleteTarget(null);
            setToast({ kind: "success", message });
          }}
          onError={(message) => setToast({ kind: "error", message })}
        />
      )}
    </section>
  );
}
