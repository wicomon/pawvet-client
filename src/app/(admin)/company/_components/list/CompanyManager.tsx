"use client";

import { useQuery } from "@apollo/client/react";
import { COMPANY_FIND_ALL } from "@/graphql/company.gql";
import CompanyTable from "./CompanyTable";

// Mirrors src/app/(admin)/menus/_components/MenusManager.tsx. COMPANY_FIND_ALL
// now selects each company's subscription (+ plan) nested, so a single query
// covers the table — no separate SUBSCRIPTION_FIND_ALL to keep in sync.
export default function CompanyManager() {
  const { data, loading, error } = useQuery(COMPANY_FIND_ALL);

  const companies = [...(data?.companyFindAll ?? [])].sort((a, b) => a.createdAt!.localeCompare(b.createdAt!));

  return (
    <>
      <CompanyTable
        companies={companies}
        loading={loading}
        error={error ? `No se pudieron cargar las empresas. ${error.message}` : null}
      />
    </>
  );
}
