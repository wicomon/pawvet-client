"use client";

import { Formik } from "formik";
import { useMutation } from "@apollo/client/react";
import { COMPANY_CREATE, COMPANY_FIND_ALL } from "@/graphql/company.gql";
import TextField from "@/components/forms/fields/TextField";
import FormModal from "@/components/ui/FormModal";
import { companySchema, emptyCompanyFormValues, toMutationInput } from "./companyFormConfig";

type CompanyCreateFormProps = {
  onClose: () => void;
  onSaved: (message: string) => void;
  onError: (message: string) => void;
};

export default function CompanyCreateForm({ onClose, onSaved, onError }: CompanyCreateFormProps) {
  const [createCompany] = useMutation(COMPANY_CREATE, {
    refetchQueries: [COMPANY_FIND_ALL],
  });

  return (
    <Formik
      initialValues={emptyCompanyFormValues}
      validationSchema={companySchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const { data } = await createCompany({
            variables: { createCompanyInput: toMutationInput(values) },
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
        </FormModal>
      )}
    </Formik>
  );
}
