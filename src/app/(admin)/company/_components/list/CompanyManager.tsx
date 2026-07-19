"use client";

import { useQuery } from "@apollo/client/react";
import { COMPANY_FIND_ALL } from "@/graphql/company.gql";
import { SUBSCRIPTION_FIND_ALL } from "@/graphql/billing.gql";
import type { Subscription } from "@/types/billing";
import CompanyTable from "./CompanyTable";

// Mirrors src/app/(admin)/menus/_components/MenusManager.tsx. Also loads
// every company's subscription (ROOT-only query) so the table can show plan
// + renewal date without a per-row round trip.
export default function CompanyManager() {
  const { data, loading, error } = useQuery(COMPANY_FIND_ALL);
  const { data: subscriptionData } = useQuery(SUBSCRIPTION_FIND_ALL);

  const companies = [...(data?.companyFindAll ?? [])].sort((a, b) => b.id.localeCompare(a.id));

  const subscriptionsByCompanyId = new Map<string, Subscription>(
    (subscriptionData?.subscriptionFindAll ?? []).map((subscription) => [
      subscription.companyId,
      subscription,
    ]),
  );

  return (
    <>
      <CompanyTable
        companies={companies}
        subscriptionsByCompanyId={subscriptionsByCompanyId}
        loading={loading}
        error={error ? `No se pudieron cargar las empresas. ${error.message}` : null}
      />
    </>
  );
}
