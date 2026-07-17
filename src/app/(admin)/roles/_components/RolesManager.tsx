"use client";

import { useQuery } from "@apollo/client/react";
import { ROLE_FIND_ALL_WITH_MENU } from "@/graphql/role.gql";
import RoleTable from "./RoleTable";

// Mirrors src/components/menus/MenusManager.tsx.
export default function RolesManager() {
  const { data, loading, error } = useQuery(ROLE_FIND_ALL_WITH_MENU);
  const roles = [...(data?.roleFindAllWithMenu ?? [])].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <RoleTable
        roles={roles}
        loading={loading}
        error={error ? `No se pudieron cargar los roles. ${error.message}` : null}
      />
    </>
  );
}
