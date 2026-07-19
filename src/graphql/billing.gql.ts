import { gql, type TypedDocumentNode } from "@apollo/client";
import type {
  CreateSubscriptionPaymentInput,
  Plan,
  Subscription,
  SubscriptionPayment,
  UpsertSubscriptionInput,
} from "@/types/billing";

// Unlike company.gql.ts, billing mutations return the entity itself (not a
// bare boolean) — see pawvet-server src/schema.gql. Success is still checked
// with `if (!data?.xxx) throw ...`, it just has the full record to use.

const PLAN_FIELDS = `
  id
  code
  name
  description
  price
  currency
  interval
  whatsappNotifications
  electronicInvoicing
  isActive
  createdAt
  updatedAt
`;

const SUBSCRIPTION_FIELDS = `
  id
  companyId
  planId
  status
  trialEndsAt
  currentPeriodEnd
  cancelAtPeriodEnd
  canceledAt
  isComplimentary
  createdAt
  updatedAt
  plan {
    ${PLAN_FIELDS}
  }
`;

const SUBSCRIPTION_PAYMENT_FIELDS = `
  id
  companyId
  subscriptionId
  planId
  amount
  currency
  status
  method
  reference
  paidAt
  periodStart
  periodEnd
  notes
  createdAt
  updatedAt
`;

export const PLAN_FIND_ALL: TypedDocumentNode<{ planFindAll: Plan[] }, Record<string, never>> = gql`
  query PlanFindAll {
    planFindAll {
      ${PLAN_FIELDS}
    }
  }
`;

export const SUBSCRIPTION_FIND_ALL: TypedDocumentNode<
  { subscriptionFindAll: Subscription[] },
  Record<string, never>
> = gql`
  query SubscriptionFindAll {
    subscriptionFindAll {
      ${SUBSCRIPTION_FIELDS}
    }
  }
`;

export const SUBSCRIPTION_FIND_BY_COMPANY: TypedDocumentNode<
  { subscriptionFindByCompany: Subscription },
  { companyId?: string }
> = gql`
  query SubscriptionFindByCompany($companyId: String) {
    subscriptionFindByCompany(companyId: $companyId) {
      ${SUBSCRIPTION_FIELDS}
    }
  }
`;

export const SUBSCRIPTION_PAYMENT_FIND_ALL: TypedDocumentNode<
  { subscriptionPaymentFindAll: SubscriptionPayment[] },
  { companyId?: string }
> = gql`
  query SubscriptionPaymentFindAll($companyId: String) {
    subscriptionPaymentFindAll(companyId: $companyId) {
      ${SUBSCRIPTION_PAYMENT_FIELDS}
    }
  }
`;

export const SUBSCRIPTION_UPSERT: TypedDocumentNode<
  { subscriptionUpsert: Subscription },
  { upsertSubscriptionInput: UpsertSubscriptionInput }
> = gql`
  mutation SubscriptionUpsert($upsertSubscriptionInput: UpsertSubscriptionInput!) {
    subscriptionUpsert(upsertSubscriptionInput: $upsertSubscriptionInput) {
      ${SUBSCRIPTION_FIELDS}
    }
  }
`;

export const SUBSCRIPTION_CANCEL: TypedDocumentNode<
  { subscriptionCancel: Subscription },
  { companyId: string }
> = gql`
  mutation SubscriptionCancel($companyId: String!) {
    subscriptionCancel(companyId: $companyId) {
      ${SUBSCRIPTION_FIELDS}
    }
  }
`;

export const SUBSCRIPTION_PAYMENT_CREATE: TypedDocumentNode<
  { subscriptionPaymentCreate: SubscriptionPayment },
  { createSubscriptionPaymentInput: CreateSubscriptionPaymentInput }
> = gql`
  mutation SubscriptionPaymentCreate(
    $createSubscriptionPaymentInput: CreateSubscriptionPaymentInput!
  ) {
    subscriptionPaymentCreate(createSubscriptionPaymentInput: $createSubscriptionPaymentInput) {
      ${SUBSCRIPTION_PAYMENT_FIELDS}
    }
  }
`;
