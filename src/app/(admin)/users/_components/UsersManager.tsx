"use client";

import { useQuery } from "@apollo/client/react";
import { USER_FIND_ALL } from "@/graphql/user.gql";
import type { User } from "@/types/user";
import type { UserGroupRow } from "./userColumns";
import UsersTable from "./UsersTable";

// Groups the flat userFindAll list into one row per company (id prefixed so
// it can't collide with a user id), each carrying its users sorted by name.
// Mirrors src/app/(admin)/company/_components/CompanyManager.tsx, plus the
// grouping step menuColumns' parent/submenu nesting inspired.
function groupByCompany(users: User[]): UserGroupRow[] {
  const groups = new Map<string, UserGroupRow>();

  for (const user of users) {
    const companyId = user.company.id;
    if (!groups.has(companyId)) {
      groups.set(companyId, {
        kind: "group",
        id: `company-${companyId}`,
        companyName: user.company.name,
        users: [],
      });
    }
    groups.get(companyId)!.users.push(user);
  }

  for (const group of groups.values()) {
    group.users.sort((a, b) => `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`));
  }

  return [...groups.values()].sort((a, b) => a.companyName.localeCompare(b.companyName));
}

export default function UsersManager() {
  const { data, loading, error } = useQuery(USER_FIND_ALL);
  const groups = groupByCompany(data?.userFindAll ?? []);

  return (
    <UsersTable
      groups={groups}
      loading={loading}
      error={error ? `No se pudieron cargar los usuarios. ${error.message}` : null}
    />
  );
}
