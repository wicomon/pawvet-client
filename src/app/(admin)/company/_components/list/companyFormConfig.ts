import * as Yup from "yup";
import type { Company, CreateCompanyInput } from "@/types/company";

// Single source of truth for the create/edit form (CompanyCreateForm.tsx +
// CompanyEditForm.tsx). Every field the mutation needs lives in Formik state.
// Mirrors src/app/(admin)/roles/_components/roleFormConfig.ts.
//
// planId/trialDays/isComplimentary mirror AssignPlanFormValues in
// detail/billingFormConfig.ts — companyCreate/companyUpdate now create or
// update the Subscription alongside the Company in one mutation.
export interface CompanyFormValues {
  id: string;
  name: string;
  slug: string;
  address: string;
  phone: string;
  email: string;
  ruc: string;
  website: string;
  planId: string;
  trialDays: string;
  isComplimentary: boolean;
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
  planId: "",
  trialDays: "",
  isComplimentary: false,
};

// company.subscription (if any) preloads the plan fields when editing.
// trialDays is intentionally left blank — it's a one-off "start a new trial"
// input, not a stored value.
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
    planId: company.subscription?.planId ?? "",
    trialDays: "",
    isComplimentary: company.subscription?.isComplimentary ?? false,
  };
}

const baseCompanySchema = {
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
  trialDays: Yup.number().typeError("Ingresa un número de días válido.").integer().min(0),
  isComplimentary: Yup.boolean(),
};

// Kept for compatibility with any remaining callers; prefer
// companyCreateSchema/companyEditSchema below.
export const companySchema = Yup.object(baseCompanySchema);

// Creating a company always creates its Subscription, so planId is required.
export const companyCreateSchema = Yup.object({
  ...baseCompanySchema,
  planId: Yup.string().required("Selecciona un plan."),
});

// Editing must not break companies that predate the Subscription model, so
// planId stays optional — leaving it blank means "don't touch the subscription".
export const companyEditSchema = Yup.object({
  ...baseCompanySchema,
  planId: Yup.string(),
});

// planId is optional here because CompanyEditForm may submit without one
// (legacy companies with no subscription yet); CompanyCreateForm's Yup schema
// guarantees it's present before this is cast to CreateCompanyInput.
export function toMutationInput(values: CompanyFormValues): Partial<CreateCompanyInput> {
  return {
    name: values.name.trim(),
    slug: values.slug.trim(),
    planId: values.planId || undefined,
    address: values.address.trim() || undefined,
    phone: values.phone.trim() || undefined,
    email: values.email.trim() || undefined,
    ruc: values.ruc.trim() || undefined,
    website: values.website.trim() || undefined,
    trialDays: values.trialDays ? Number(values.trialDays) : undefined,
    // Always send the literal boolean: unlike the text fields above, `false`
    // here is a meaningful value ("turn off cortesía"), not "leave untouched".
    // `values.isComplimentary || undefined` would silently drop `false`.
    isComplimentary: values.isComplimentary,
  };
}
