import { gql, type TypedDocumentNode } from '@apollo/client';
import type { Company, CreateCompanyInput, UpdateCompanyInput } from '@/types/company';

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
    }
  }
`;

export const COMPANY_CREATE: TypedDocumentNode<
  { companyCreate: boolean },
  { createCompanyInput: CreateCompanyInput }
> = gql`
  mutation CompanyCreate($createCompanyInput: CreateCompanyInput!) {
    companyCreate(createCompanyInput: $createCompanyInput)
  }
`;

export const COMPANY_UPDATE: TypedDocumentNode<
  { companyUpdate: boolean },
  { updateCompanyInput: UpdateCompanyInput }
> = gql`
  mutation CompanyUpdate($updateCompanyInput: UpdateCompanyInput!) {
    companyUpdate(updateCompanyInput: $updateCompanyInput)
  }
`;

export const COMPANY_REMOVE: TypedDocumentNode<{ companyRemove: boolean }, { id: string }> = gql`
  mutation CompanyRemove($id: String!) {
    companyRemove(id: $id)
  }
`;
