// Shared billing display helpers — status labels/badge colors and
// money/date formatting used by both the /company list columns and the
// /company/[id] detail screen, so the mapping only lives in one place.

import type { PaymentStatus, PlanInterval, Subscription } from "@/types/billing";

// `status` (TRIAL | FULL) no longer indicates validity — it only labels
// "trial" vs "paid plan". Whether a subscription is usable is derived
// entirely from currentPeriodEnd (+ isComplimentary, which bypasses the date
// check; + cancelAtPeriodEnd, which keeps access until the period ends even
// though it's been canceled). See pawvet-server's billing module.
export type SubscriptionStateKey = "COMPLIMENTARY" | "EXPIRED" | "CANCELING" | "TRIAL" | "ACTIVE";

export interface SubscriptionState {
  key: SubscriptionStateKey;
  label: string; // short, for the badge
  badge: string; // tailwind wv-* classes
  note?: string; // date detail, for the summary card
}

export function getSubscriptionState(subscription: Subscription): SubscriptionState {
  const isExpired = new Date(subscription.currentPeriodEnd).getTime() < Date.now();

  if (subscription.isComplimentary) {
    return { key: "COMPLIMENTARY", label: "Cortesía", badge: "bg-wv-mint-soft text-wv-teal-deep" };
  }
  if (isExpired) {
    return {
      key: "EXPIRED",
      label: "Vencida",
      badge: "bg-danger-bg text-danger",
      note: `Venció el ${formatDate(subscription.currentPeriodEnd)}`,
    };
  }
  if (subscription.cancelAtPeriodEnd) {
    return {
      key: "CANCELING",
      label: "Cancelada",
      badge: "bg-wv-amber-bg text-wv-amber-ink",
      note: `Activa hasta ${formatDate(subscription.currentPeriodEnd)}`,
    };
  }
  if (subscription.status === "TRIAL") {
    return {
      key: "TRIAL",
      label: "Prueba",
      badge: "bg-wv-mint-soft text-wv-teal-deep",
      note: `Hasta ${formatDate(subscription.trialEndsAt ?? subscription.currentPeriodEnd)}`,
    };
  }
  return {
    key: "ACTIVE",
    label: "Activa",
    badge: "bg-wv-mint-soft text-wv-teal-deep",
    note: `Vigente hasta ${formatDate(subscription.currentPeriodEnd)}`,
  };
}

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
