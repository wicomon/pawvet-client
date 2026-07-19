"use client";

import { Formik } from "formik";
import { useMutation } from "@apollo/client/react";
import { COMPANY_FIND_ALL, COMPANY_UPDATE } from "@/graphql/company.gql";
import TextField from "@/components/forms/fields/TextField";
import FormModal from "@/components/ui/FormModal";
import { companySchema, companyToFormValues, toMutationInput } from "./companyFormConfig";
import type { Company, UpdateCompanyInput } from "@/types/company";

type CompanyEditFormProps = {
  company: Company;
  onClose: () => void;
  onSaved: (message: string) => void;
  onError: (message: string) => void;
};

// Formik + Yup form for editing a company. Mirrors CompanyCreateForm.tsx but
// without the isEdit branching that used to live in CompanyFormModal.tsx.
export default function CompanyEditForm({ company, onClose, onSaved, onError }: CompanyEditFormProps) {
  const [updateCompany] = useMutation(COMPANY_UPDATE, {
    refetchQueries: [COMPANY_FIND_ALL],
  });

  return (
    <Formik
      initialValues={companyToFormValues(company)}
      validationSchema={companySchema}
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
        </FormModal>
      )}
    </Formik>
  );
}
