"use client";

import { Formik } from "formik";
import { useMutation, useQuery } from "@apollo/client/react";
import { COMPANY_FIND_ALL, COMPANY_UPDATE } from "@/graphql/company.gql";
import { PLAN_FIND_ALL } from "@/graphql/billing.gql";
import TextField from "@/components/forms/fields/TextField";
import SelectField from "@/components/forms/fields/SelectField";
import CheckboxField from "@/components/forms/fields/CheckboxField";
import FormModal from "@/components/ui/FormModal";
import { companyEditSchema, companyToFormValues, toMutationInput } from "./companyFormConfig";
import type { Company, UpdateCompanyInput } from "@/types/company";

type CompanyEditFormProps = {
  company: Company;
  onClose: () => void;
  onSaved: (message: string) => void;
  onError: (message: string) => void;
};

// Formik + Yup form for editing a company. Mirrors CompanyCreateForm.tsx but
// without the isEdit branching that used to live in CompanyFormModal.tsx.
// Preloads plan/isComplimentary from company.subscription (if any) so
// companyUpdate can change them in the same mutation.
export default function CompanyEditForm({ company, onClose, onSaved, onError }: CompanyEditFormProps) {
  const { data: planData, loading: plansLoading } = useQuery(PLAN_FIND_ALL);
  const [updateCompany] = useMutation(COMPANY_UPDATE, {
    refetchQueries: [COMPANY_FIND_ALL],
  });

  const planOptions = [
    { value: "", label: "Selecciona un plan..." },
    ...(planData?.planFindAll ?? []).map((plan) => ({ value: plan.id, label: plan.name })),
  ];

  return (
    <Formik
      initialValues={companyToFormValues(company)}
      validationSchema={companyEditSchema}
      enableReinitialize
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const updateCompanyInput: UpdateCompanyInput = {
            id: company.id,
            ...toMutationInput(values),
          };
          const { data } = await updateCompany({ variables: { updateCompanyInput } });
          if (!data?.companyUpdate) throw new Error("El backend no confirmó la actualización.");
          onSaved("Empresa actualizada correctamente.");
        } catch (error) {
          onError(error instanceof Error ? error.message : "Ocurrió un error inesperado.");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, dirty }) => (
        <FormModal
          title="Editar empresa"
          titleId="company-modal-title"
          onClose={onClose}
          dirty={dirty}
          isSubmitting={isSubmitting}
          submitLabel="Guardar cambios"
          pendingLabel="Guardando…"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="Nombre" name="name" placeholder="Clínica San Roque" required />
            <TextField label="Slug" name="slug" placeholder="clinica-san-roque" required />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="RUC" name="ruc" placeholder="Opcional" />
            <TextField label="Correo" name="email" type="email" placeholder="Opcional" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="Teléfono" name="phone" placeholder="Opcional" />
            <TextField label="Sitio web" name="website" placeholder="Opcional" />
          </div>
          <TextField label="Dirección" name="address" placeholder="Opcional" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SelectField
              label={plansLoading ? "Cargando planes…" : "Plan"}
              name="planId"
              options={planOptions}
            />
            <TextField
              label="Días de prueba"
              name="trialDays"
              type="number"
              placeholder="Opcional"
              helperText="Deja vacío para no iniciar un nuevo periodo de prueba."
            />
          </div>
          <CheckboxField
            label="Cuenta de cortesía"
            name="isComplimentary"
            helperText="La suscripción no vencerá mientras esté marcada."
          />
        </FormModal>
      )}
    </Formik>
  );
}
