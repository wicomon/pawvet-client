import type { ColumnDef } from "@tanstack/react-table";
import type { SubscriptionPayment } from "@/types/billing";
import { PAYMENT_STATUS_BADGE, PAYMENT_STATUS_LABEL, formatDate, formatMoney } from "@/lib/billing";

export function buildPaymentColumns(): ColumnDef<SubscriptionPayment>[] {
  return [
    {
      id: "paidAt",
      header: "Fecha",
      cell: ({ row }) => (
        <span className="text-[13px] font-bold text-wv-muted-2">
          {formatDate(row.original.paidAt)}
        </span>
      ),
    },
    {
      id: "amount",
      header: "Monto",
      cell: ({ row }) => (
        <span className="text-sm font-extrabold text-wv-navy">
          {formatMoney(row.original.amount, row.original.currency)}
        </span>
      ),
    },
    {
      id: "period",
      header: "Periodo cubierto",
      cell: ({ row }) => (
        <span className="text-[13px] font-semibold text-wv-muted-2">
          {formatDate(row.original.periodStart)} – {formatDate(row.original.periodEnd)}
        </span>
      ),
    },
    {
      id: "method",
      header: "Método",
      cell: ({ row }) => (
        <span className="text-[13px] font-semibold text-wv-muted-2">
          {row.original.method ?? "—"}
        </span>
      ),
    },
    {
      id: "reference",
      header: "Referencia",
      cell: ({ row }) => (
        <span className="truncate text-[13px] font-semibold text-wv-muted-2">
          {row.original.reference ?? "—"}
        </span>
      ),
    },
    {
      id: "status",
      header: "Estado",
      cell: ({ row }) => (
        <span
          className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-extrabold ${PAYMENT_STATUS_BADGE[row.original.status]}`}
        >
          {PAYMENT_STATUS_LABEL[row.original.status]}
        </span>
      ),
    },
  ];
}
