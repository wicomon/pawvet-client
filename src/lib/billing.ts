// Shared billing display helpers — status labels/badge colors and
// money/date formatting used by both the /company list columns and the
// /company/[id] detail screen, so the mapping only lives in one place.

import type { PaymentStatus, PlanInterval, SubscriptionStatus } from "@/types/billing";

export const SUBSCRIPTION_STATUS_LABEL: Record<SubscriptionStatus, string> = {
  TRIALING: "En prueba",
  ACTIVE: "Activa",
  PAST_DUE: "Pago vencido",
  EXPIRED: "Expirada",
  CANCELED: "Cancelada",
};

// bg/text pairs from the same wv-* tokens the company `isActive` pill already
// uses (bg-wv-mint-soft/text-wv-teal-deep for "good", bg-danger-bg/text-danger
// for "bad"), plus a neutral/warning tone for in-between states.
export const SUBSCRIPTION_STATUS_BADGE: Record<SubscriptionStatus, string> = {
  TRIALING: "bg-wv-mint-soft text-wv-teal-deep",
  ACTIVE: "bg-wv-mint-soft text-wv-teal-deep",
  PAST_DUE: "bg-wv-amber-bg text-wv-amber-ink",
  EXPIRED: "bg-danger-bg text-danger",
  CANCELED: "bg-danger-bg text-danger",
};

export const PAYMENT_STATUS_LABEL: Record<PaymentStatus, string> = {
  PENDING: "Pendiente",
  PAID: "Pagado",
  FAILED: "Fallido",
  REFUNDED: "Reembolsado",
};

export const PAYMENT_STATUS_BADGE: Record<PaymentStatus, string> = {
  PENDING: "bg-wv-amber-bg text-wv-amber-ink",
  PAID: "bg-wv-mint-soft text-wv-teal-deep",
  FAILED: "bg-danger-bg text-danger",
  REFUNDED: "bg-wv-bg-alt text-wv-muted-2",
};

export const PLAN_INTERVAL_LABEL: Record<PlanInterval, string> = {
  MONTH: "Mensual",
  YEAR: "Anual",
};

export function formatMoney(amount?: number | null, currency?: string | null): string {
  if (amount == null) return "—";
  try {
    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: currency ?? "PEN",
      minimumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency ?? ""} ${amount.toFixed(2)}`.trim();
  }
}

export function formatDate(iso?: string | null): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("es-PE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}
