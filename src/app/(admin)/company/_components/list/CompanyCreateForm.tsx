"use client";

import { Formik } from "formik";
import { useMutation, useQuery } from "@apollo/client/react";
import { COMPANY_CREATE, COMPANY_FIND_ALL } from "@/graphql/company.gql";
import { PLAN_FIND_ALL } from "@/graphql/billing.gql";
import TextField from "@/components/forms/fields/TextField";
import SelectField from "@/components/forms/fields/SelectField";
import CheckboxField from "@/components/forms/fields/CheckboxField";
import FormModal from "@/components/ui/FormModal";
import { companyCreateSchema, emptyCompanyFormValues, toMutationInput } from "./companyFormConfig";
import type { CreateCompanyInput } from "@/types/company";

type CompanyCreateFormProps = {
  onClose: () => void;
  onSaved: (message: string) => void;
  onError: (message: string) => void;
};

export default function CompanyCreateForm({ onClose, onSaved, onError }: CompanyCreateFormProps) {
  const { data: planData, loading: plansLoading } = useQuery(PLAN_FIND_ALL);
  const [createCompany] = useMutation(COMPANY_CREATE, {
    refetchQueries: [COMPANY_FIND_ALL],
  });

  const planOptions = [
    { value: "", label: "Selecciona un plan..." },
    ...(planData?.planFindAll ?? []).map((plan) => ({ value: plan.id, label: plan.name })),
  ];

  return (
    <Formik
      initialValues={emptyCompanyFormValues}
      validationSchema={companyCreateSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const { data } = await createCompany({
            variables: { createCompanyInput: toMutationInput(values) as CreateCompanyInput },
          });
          if (!data?.companyCreate) throw new Error("El backend no confirmó la creación.");
          onSaved("Empresa creada correctamente.");
        } catch (error) {
          onError(error instanceof Error ? error.message : "Ocurrió un error inesperado.");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, dirty }) => (
        <FormModal
          title="Nueva empresa"
          titleId="company-modal-title"
          onClose={onClose}
          dirty={dirty}
          isSubmitting={isSubmitting}
          submitLabel="Crear empresa"
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
              required
            />
            <TextField
              label="Días de prueba"
              name="trialDays"
              type="number"
              placeholder="Opcional"
              helperText="Deja vacío para no iniciar un periodo de prueba."
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
