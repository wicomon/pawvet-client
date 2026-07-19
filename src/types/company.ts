// Mirrors pawvet-server's Company entity + Create/UpdateCompanyInput DTOs
// (src/company/entities/company.entity.ts, src/company/dto/*.input.ts).
// Broader than CompanySummary (src/types/user.ts), which only carries the
// `id`/`name` the sidebar needs from authUserInfo — this type also carries
// contact/legal fields and isActive for the /company admin table.

import type { Subscription, SubscriptionPayment } from "@/types/billing";

export interface Company {
  id: string;
  name: string;
  slug?: string | null;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  ruc?: string | null;
  website?: string | null;
  isActive?: boolean | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  // Nested billing data resolved straight from Prisma's select
  // (@SelectFields()) whenever the query asks for it.
  subscription?: Subscription | null;
  subscriptionPayments?: SubscriptionPayment[] | null;
}

// CreateCompanyInput: name/slug/planId required; the rest optional.
// planId/trialDays/isComplimentary drive the Subscription created alongside
// the Company in the same backend transaction (see company.service.ts).
export interface CreateCompanyInput {
  name: string;
  slug: string;
  planId: string;
  address?: string;
  phone?: string;
  email?: string;
  ruc?: string;
  website?: string;
  trialDays?: number;
  isComplimentary?: boolean;
}

export interface UpdateCompanyInput extends Partial<CreateCompanyInput> {
  id: string;
}
