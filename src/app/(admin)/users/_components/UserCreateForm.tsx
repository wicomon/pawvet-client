"use client";

import { Formik } from "formik";
import { useMutation, useQuery } from "@apollo/client/react";
import { USER_CREATE, USER_FIND_ALL } from "@/graphql/user.gql";
import { COMPANY_FIND_ALL } from "@/graphql/company.gql";
import { ROLE_FIND_ALL_WITH_MENU } from "@/graphql/role.gql";
import TextField from "@/components/forms/fields/TextField";
import SelectField from "@/components/forms/fields/SelectField";
import FormModal from "@/components/ui/FormModal";
import { buildUserSchema, emptyUserFormValues, toMutationInput } from "./userFormConfig";

type UserCreateFormProps = {
  onClose: () => void;
  onSaved: (message: string) => void;
  onError: (message: string) => void;
};

export default function UserCreateForm({ onClose, onSaved, onError }: UserCreateFormProps) {
  const [createUser] = useMutation(USER_CREATE, {
    refetchQueries: [USER_FIND_ALL],
  });
  const { data: companyData } = useQuery(COMPANY_FIND_ALL);
  const { data: roleData } = useQuery(ROLE_FIND_ALL_WITH_MENU);

  const companyOptions = [
    { value: "", label: "Selecciona una empresa" },
    ...(companyData?.companyFindAll ?? []).map((company) => ({
      value: company.id,
      label: company.name,
    })),
  ];
  const roleOptions = [
    { value: "", label: "Selecciona un rol" },
    ...(roleData?.roleFindAllWithMenu ?? []).map((role) => ({
      value: role.id,
      label: role.name,
    })),
  ];

  return (
    <Formik
      initialValues={emptyUserFormValues}
      validationSchema={buildUserSchema(false)}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const { data } = await createUser({
            variables: { createUserInput: toMutationInput(values) },
          });
          if (!data?.userCreate) throw new Error("El backend no confirmó la creación.");
          onSaved("Usuario creado correctamente.");
        } catch (error) {
          onError(error instanceof Error ? error.message : "Ocurrió un error inesperado.");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, dirty }) => (
        <FormModal
          title="Nuevo usuario"
          titleId="user-modal-title"
          onClose={onClose}
          dirty={dirty}
          isSubmitting={isSubmitting}
          submitLabel="Crear usuario"
          pendingLabel="Guardando…"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="Nombre" name="firstName" placeholder="Juan" required />
            <TextField label="Apellido" name="lastName" placeholder="Pérez" required />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="Correo" name="email" type="email" placeholder="juan@empresa.com" required />
            <TextField label="Contraseña" name="password" type="password" placeholder="Mínimo 8 caracteres" required />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SelectField label="Empresa" name="companyId" options={companyOptions} required />
            <SelectField label="Rol" name="roleId" options={roleOptions} required />
          </div>
        </FormModal>
      )}
    </Formik>
  );
}
