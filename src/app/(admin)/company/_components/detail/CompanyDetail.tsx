"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { COMPANY_FIND_ALL } from "@/graphql/company.gql";
import {
  SUBSCRIPTION_CANCEL,
  SUBSCRIPTION_FIND_ALL,
  SUBSCRIPTION_FIND_BY_COMPANY,
  SUBSCRIPTION_PAYMENT_FIND_ALL,
} from "@/graphql/billing.gql";
import Alert from "@/components/ui/Alert";
import type { Toast } from "@/types/ui.types";
import CompanyInfoCard from "./CompanyInfoCard";
import SubscriptionSummaryCard from "./SubscriptionSummaryCard";
import PaymentHistoryTable from "./PaymentHistoryTable";
import RegisterPaymentForm from "./RegisterPaymentForm";
import AssignPlanForm from "./AssignPlanForm";
import CancelSubscriptionDialog from "./CancelSubscriptionDialog";

type CompanyDetailProps = {
  companyId: string;
};

type ModalKey = "payment" | "plan" | "cancel" | null;

// Orchestrator for the /company/[id] screen, mirroring the query-then-render
// shape of CompanyManager.tsx + CompanyTable.tsx, just with several billing
// queries instead of one. There's no companyFindOne on the backend, so the
// company record is looked up from the already-cached COMPANY_FIND_ALL list
// (same query the /company table already runs).
export default function CompanyDetail({ companyId }: CompanyDetailProps) {
  const [modal, setModal] = useState<ModalKey>(null);
  const [toast, setToast] = useState<Toast | null>(null);

  const { data: companyData, loading: companyLoading, error: companyError } =
    useQuery(COMPANY_FIND_ALL);
  const company = companyData?.companyFindAll.find((c) => c.id === companyId);

  // subscriptionFindByCompany returns a non-nullable Subscription — when a
  // company has none yet, the backend raises a GraphQL error instead of
  // returning null, so we treat any error here as "no subscription" rather
  // than a fatal fetch failure.
  const { data: subscriptionData, loading: subscriptionLoading } = useQuery(
    SUBSCRIPTION_FIND_BY_COMPANY,
    { variables: { companyId } },
  );
  const subscription = subscriptionData?.subscriptionFindByCompany ?? null;

  const {
    data: paymentsData,
    loading: paymentsLoading,
    error: paymentsError,
  } = useQuery(SUBSCRIPTION_PAYMENT_FIND_ALL, { variables: { companyId } });
  const payments = [...(paymentsData?.subscriptionPaymentFindAll ?? [])];

  const [cancelSubscription] = useMutation(SUBSCRIPTION_CANCEL, {
    refetchQueries: [
      { query: SUBSCRIPTION_FIND_BY_COMPANY, variables: { companyId } },
      { query: SUBSCRIPTION_FIND_ALL },
    ],
  });

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  const onToastSuccess = (message: string) => setToast({ kind: "success", message });
  const onToastError = (message: string) => setToast({ kind: "error", message });

  if (companyLoading) {
    return <div className="h-40 animate-pulse rounded-2xl bg-wv-bg-alt" aria-hidden="true" />;
  }

  if (companyError || !company) {
    return (
      <div role="alert" className="rounded-xl bg-danger-bg px-3.5 py-2.5 text-[13px] font-semibold text-danger">
        {companyError
          ? `No se pudo cargar la empresa. ${companyError.message}`
          : "No se encontró la empresa."}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {toast && <Alert kind={toast.kind} message={toast.message} />}

      <CompanyInfoCard company={company} />

      <SubscriptionSummaryCard
        subscription={subscriptionLoading ? undefined : subscription}
        onChangePlan={() => setModal("plan")}
        onRegisterPayment={() => setModal("payment")}
        onCancel={() => setModal("cancel")}
      />

      <PaymentHistoryTable
        payments={payments}
        loading={paymentsLoading}
        error={paymentsError ? `No se pudo cargar el historial de pagos. ${paymentsError.message}` : null}
      />

      {modal === "payment" && (
        <RegisterPaymentForm
          companyId={companyId}
          onClose={() => setModal(null)}
          onSaved={(message) => {
            setModal(null);
            onToastSuccess(message);
          }}
          onError={onToastError}
        />
      )}

      {modal === "plan" && (
        <AssignPlanForm
          companyId={companyId}
          currentPlanId={subscription?.planId}
          onClose={() => setModal(null)}
          onSaved={(message) => {
            setModal(null);
            onToastSuccess(message);
          }}
          onError={onToastError}
        />
      )}

      {modal === "cancel" && (
        <CancelSubscriptionDialog
          companyName={company.name}
          onConfirm={async () => {
            const { data } = await cancelSubscription({ variables: { companyId } });
            if (!data?.subscriptionCancel) throw new Error("El backend no confirmó la cancelación.");
            return "Suscripción cancelada.";
          }}
          onClose={() => setModal(null)}
          onCanceled={(message) => {
            setModal(null);
            onToastSuccess(message);
          }}
          onError={onToastError}
        />
      )}
    </div>
  );
}
