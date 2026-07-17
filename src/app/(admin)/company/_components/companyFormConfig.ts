import * as Yup from "yup";
import type { Company, CreateCompanyInput } from "@/types/company";

// Single source of truth for the create/edit form (CompanyCreateForm.tsx +
// CompanyEditForm.tsx). Every field the mutation needs lives in Formik state.
// Mirrors src/app/(admin)/roles/_components/roleFormConfig.ts.
export interface CompanyFormValues {
  id: string;
  name: string;
  slug: string;
  address: string;
  phone: string;
  email: string;
  ruc: string;
  website: string;
}

export const emptyCompanyFormValues: CompanyFormValues = {
  id: "",
  name: "",
  slug: "",
  address: "",
  phone: "",
  email: "",
  ruc: "",
  website: "",
};

export function companyToFormValues(company: Company): CompanyFormValues {
  return {
    id: company.id,
    name: company.name,
    slug: company.slug ?? "",
    address: company.address ?? "",
    phone: company.phone ?? "",
    email: company.email ?? "",
    ruc: company.ruc ?? "",
    website: company.website ?? "",
  };
}

export const companySchema = Yup.object({
  name: Yup.string()
    .required("El nombre es obligatorio.")
    .min(2, "Mínimo 2 caracteres.")
    .max(100, "Máximo 100 caracteres."),
  slug: Yup.string()
    .required("El slug es obligatorio.")
    .matches(/^[a-z0-9-]+$/, "Solo minúsculas, números y guiones.")
    .min(2, "Mínimo 2 caracteres.")
    .max(100, "Máximo 100 caracteres."),
  address: Yup.string().max(255, "Máximo 255 caracteres."),
  phone: Yup.string().max(30, "Máximo 30 caracteres."),
  email: Yup.string().email("Ingresa un correo válido.").max(150, "Máximo 150 caracteres."),
  ruc: Yup.string().max(30, "Máximo 30 caracteres."),
  website: Yup.string().max(255, "Máximo 255 caracteres."),
});

export function toMutationInput(values: CompanyFormValues): CreateCompanyInput {
  return {
    name: values.name.trim(),
    slug: values.slug.trim(),
    address: values.address.trim() || undefined,
    phone: values.phone.trim() || undefined,
    email: values.email.trim() || undefined,
    ruc: values.ruc.trim() || undefined,
    website: values.website.trim() || undefined,
  };
}
