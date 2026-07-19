import { gql, type TypedDocumentNode } from '@apollo/client';
import type { Company, CreateCompanyInput, UpdateCompanyInput } from '@/types/company';

// Requests the subscription nested on each Company (backend resolves it via
// @SelectFields() straight into Prisma's select) so the /company table gets
// plan/status/renewal from a single query — no separate SUBSCRIPTION_FIND_ALL
// round trip to keep in sync after companyCreate/companyUpdate.
export const COMPANY_FIND_ALL: TypedDocumentNode<
  { companyFindAll: Company[] },
  Record<string, never>
> = gql`
  query CompanyFindAll {
    companyFindAll {
      id
      name
      slug
      address
      phone
      email
      ruc
      website
      isActive
      createdAt
      updatedAt
      subscription {
        id
        planId
        status
        currentPeriodEnd
        isComplimentary
        plan {
          id
          name
        }
      }
    }
  }
`;

// companyCreate/companyUpdate now create/update the Company + Subscription in
// one backend transaction and return the Company entity (not a boolean).
export const COMPANY_CREATE: TypedDocumentNode<
  { companyCreate: Company },
  { createCompanyInput: CreateCompanyInput }
> = gql`
  mutation CompanyCreate($createCompanyInput: CreateCompanyInput!) {
    companyCreate(createCompanyInput: $createCompanyInput) {
      id
      name
      slug
      address
      phone
      email
      ruc
      website
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const COMPANY_UPDATE: TypedDocumentNode<
  { companyUpdate: Company },
  { updateCompanyInput: UpdateCompanyInput }
> = gql`
  mutation CompanyUpdate($updateCompanyInput: UpdateCompanyInput!) {
    companyUpdate(updateCompanyInput: $updateCompanyInput) {
      id
      name
      slug
      address
      phone
      email
      ruc
      website
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const COMPANY_REMOVE: TypedDocumentNode<{ companyRemove: boolean }, { id: string }> = gql`
  mutation CompanyRemove($id: String!) {
    companyRemove(id: $id)
  }
`;
