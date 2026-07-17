"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { MENU_FIND_ALL } from "@/graphql/menu.gql";
import { ROLE_ASSIGN_MENUS, ROLE_FIND_ALL_WITH_MENU } from "@/graphql/role.gql";
import Modal from "@/components/ui/Modal";
import SubmitButton from "@/components/forms/fields/SubmitButton";
import type { Role } from "@/types/role";

type AssignMenusModalProps = {
  role: Role;
  onClose: () => void;
  onSaved: (message: string) => void;
  onError: (message: string) => void;
};

// roleAssignMenus only accepts root-level menu ids (parentId: null) and
// replaces the role's full assignment on every call — see
// pawvet-server/src/role/role.service.ts assignMenusToRole (deleteMany +
// createMany in a transaction). MENU_FIND_ALL's top-level results are
// already root-only (the resolver filters parentId: null server-side), so
// no client-side filtering is needed here. Checkboxes are preloaded from
// `role.menus` (returned by roleFindAllWithMenu) rather than a separate
// query, so opening this modal never needs an extra round trip.
export default function AssignMenusModal({ role, onClose, onSaved, onError }: AssignMenusModalProps) {
  const { data, loading, error } = useQuery(MENU_FIND_ALL);
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(role.menus?.map((menu) => menu.id) ?? [])
  );
  const [pending, setPending] = useState(false);
  const [assignMenus] = useMutation(ROLE_ASSIGN_MENUS, {
    refetchQueries: [ROLE_FIND_ALL_WITH_MENU],
  });

  const menus = [...(data?.menuFindAll ?? [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  function toggle(menuId: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(menuId)) next.delete(menuId);
      else next.add(menuId);
      return next;
    });
  }

  async function handleSave() {
    setPending(true);
    try {
      const { data } = await assignMenus({
        variables: { assignMenuInput: { roleId: role.id, menuIds: Array.from(selected) } },
      });
      if (!data?.roleAssignMenus) throw new Error("El backend no confirmó la asignación.");
      onSaved(`Menús actualizados para el rol "${role.name}".`);
    } catch (err) {
      onError(err instanceof Error ? err.message : "Ocurrió un error inesperado.");
    } finally {
      setPending(false);
    }
  }

  return (
    <Modal title={`Asignar menús — ${role.name}`} titleId="assign-menus-title" onClose={onClose}>
      <form
        className="flex flex-col gap-4"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          handleSave();
        }}
      >
        <p className="text-[13px] font-semibold text-wv-muted">
          Selecciona los menús raíz visibles para este rol. Guardar reemplaza toda la asignación
          anterior.
        </p>

        {loading && (
          <div className="flex flex-col gap-1.5" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-10.5 animate-pulse rounded-[10px] bg-wv-bg-alt" />
            ))}
          </div>
        )}

        {error && !loading && (
          <div
            role="alert"
            className="rounded-xl bg-danger-bg px-3.5 py-2.5 text-[13px] font-semibold text-danger"
          >
            No se pudieron cargar los menús. {error.message}
          </div>
        )}

        {!loading && !error && (
          <div className="flex max-h-80 flex-col gap-1.5 overflow-y-auto">
            {menus.map((menu) => {
              const fieldId = `assign-menu-${menu.id}`;
              return (
                <label
                  key={menu.id}
                  htmlFor={fieldId}
                  className="flex cursor-pointer items-center gap-2.5 rounded-[10px] border-[1.5px] border-wv-btn-border bg-white px-3.75 py-2.5 transition-colors duration-150 ease-out hover:bg-wv-mint-soft/40"
                >
                  <input
                    id={fieldId}
                    type="checkbox"
                    checked={selected.has(menu.id)}
                    onChange={() => toggle(menu.id)}
                    className="h-4 w-4 shrink-0 accent-wv-teal"
                  />
                  <span className="text-[13.5px] font-extrabold text-wv-navy">{menu.name}</span>
                  <span className="text-[12px] font-semibold text-wv-faint">{menu.path}</span>
                </label>
              );
            })}
          </div>
        )}

        <div className="mt-1 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            className="cursor-pointer rounded-[10px] px-3.5 py-2.25 text-[13.5px] font-extrabold text-wv-muted outline-none transition-colors duration-150 ease-out hover:bg-wv-mint-soft focus-visible:shadow-focus disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
          <div className="w-45">
            <SubmitButton label="Guardar asignación" pendingLabel="Guardando…" pending={pending} />
          </div>
        </div>
      </form>
    </Modal>
  );
}
