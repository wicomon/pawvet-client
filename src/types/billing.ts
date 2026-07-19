// Mirrors pawvet-server's billing module (src/billing/plan, src/billing/subscription):
// Plan / Subscription / SubscriptionPayment entities + their mutation input DTOs
// (src/billing/**/entities/*.entity.ts, src/billing/**/dto/*.input.ts).

export const PLAN_INTERVAL_OPTIONS = ["MONTH", "YEAR"] as const;
export type PlanInterval = (typeof PLAN_INTERVAL_OPTIONS)[number];

export const SUBSCRIPTION_STATUS_OPTIONS = [
  "TRIALING",
  "ACTIVE",
  "PAST_DUE",
  "EXPIRED",
  "CANCELED",
] as const;
export type SubscriptionStatus = (typeof SUBSCRIPTION_STATUS_OPTIONS)[number];

export const PAYMENT_STATUS_OPTIONS = ["PENDING", "PAID", "FAILED", "REFUNDED"] as const;
export type PaymentStatus = (typeof PAYMENT_STATUS_OPTIONS)[number];

export interface Plan {
  id: string;
  code: string;
  name: string;
  description?: string | null;
  price: number;
  currency: string;
  interval: PlanInterval;
  whatsappNotifications: boolean;
  electronicInvoicing: boolean;
  isActive: boolean;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface Subscription {
  id: string;
  companyId: string;
  planId: string;
  status: SubscriptionStatus;
  trialEndsAt?: string | null;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  canceledAt?: string | null;
  isComplimentary: boolean;
  createdAt?: string | null;
  updatedAt?: string | null;
  plan?: Plan | null;
}

export interface SubscriptionPayment {
  id: string;
  companyId: string;
  subscriptionId: string;
  planId?: string | null;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method?: string | null;
  reference?: string | null;
  paidAt?: string | null;
  periodStart?: string | null;
  periodEnd?: string | null;
  notes?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

// UpsertSubscriptionInput: creates or reassigns a company's subscription
// (change plan, mark complimentary, or start a trial).
export interface UpsertSubscriptionInput {
  companyId: string;
  planId: string;
  isComplimentary?: boolean;
  trialDays?: number;
  currentPeriodEnd?: string;
  status?: SubscriptionStatus;
}

// CreateSubscriptionPaymentInput: manual payment registration (Yape/transfer/cash).
export interface CreateSubscriptionPaymentInput {
  companyId: string;
  amount: number;
  method?: string;
  reference?: string;
  notes?: string;
  paidAt?: string;
}

// CreatePlanInput / UpdatePlanInput are not wired into the client yet — plan
// catalog management (planCreate/planUpdate) is a platform-admin feature the
// /company screen doesn't expose in this iteration.
