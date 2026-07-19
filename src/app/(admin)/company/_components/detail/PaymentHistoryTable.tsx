import DataTable from "@/components/ui/DataTable";
import type { SubscriptionPayment } from "@/types/billing";
import { buildPaymentColumns } from "./paymentColumns";

type PaymentHistoryTableProps = {
  payments: SubscriptionPayment[];
  loading?: boolean;
  error?: string | null;
};

export default function PaymentHistoryTable({ payments, loading, error }: PaymentHistoryTableProps) {
  return (
    <DataTable
      title="Historial de pagos"
      description="Pagos registrados para esta empresa, del más reciente al más antiguo."
      emptyLabel="Aún no hay pagos registrados."
      loading={loading}
      error={error}
      data={payments}
      columns={buildPaymentColumns()}
      getRowId={(payment) => payment.id}
    />
  );
}
