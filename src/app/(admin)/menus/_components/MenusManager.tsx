"use client";

import { useQuery } from "@apollo/client/react";
import { MENU_FIND_ALL } from "@/graphql/menu.gql";
import MenuTable from "./MenuTable";

// Mirrors src/components/roles/RolesManager.tsx.
export default function MenusManager() {
  const { data, loading, error } = useQuery(MENU_FIND_ALL);
  const menus = [...(data?.menuFindAll ?? [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <MenuTable
      menus={menus}
      loading={loading}
      error={error ? `No se pudieron cargar los menús. ${error.message}` : null}
    />
  );
}
