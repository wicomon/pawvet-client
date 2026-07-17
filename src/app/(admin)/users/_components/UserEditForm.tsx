"use client";

import { Formik } from "formik";
import { useMutation, useQuery } from "@apollo/client/react";
import { USER_FIND_ALL, USER_UPDATE } from "@/graphql/user.gql";
import { COMPANY_FIND_ALL } from "@/graphql/company.gql";
import { ROLE_FIND_ALL_WITH_MENU } from "@/graphql/role.gql";
import TextField from "@/components/forms/fields/TextField";
import SelectField from "@/components/forms/fields/SelectField";
import FormModal from "@/components/ui/FormModal";
import { buildUserSchema, toMutationInput, userToFormValues } from "./userFormConfig";
import type { UpdateUserInput, User } from "@/types/user";

type UserEditFormProps = {
  user: User;
  onClose: () => void;
  onSaved: (message: string) => void;
  onError: (message: string) => void;
};

// Formik + Yup form for editing a user. Mirrors UserCreateForm.tsx, but
// `password` is optional here — leaving it blank keeps the current password
// (toMutationInput only emits it when non-empty).
export default function UserEditForm({ user, onClose, onSaved, onError }: UserEditFormProps) {
  const [updateUser] = useMutation(USER_UPDATE, {
    refetchQueries: [USER_FIND_ALL],
  });
  const { data: companyData } = useQuery(COMPANY_FIND_ALL);
  const { data: roleData } = useQuery(ROLE_FIND_ALL_WITH_MENU);

  const companyOptions = (companyData?.companyFindAll ?? []).map((company) => ({
    value: company.id,
    label: company.name,
  }));
  const roleOptions = (roleData?.roleFindAllWithMenu ?? []).map((role) => ({
    value: role.id,
    label: role.name,
  }));

  return (
    <Formik
      initialValues={userToFormValues(user)}
      validationSchema={buildUserSchema(true)}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const { password, ...rest } = toMutationInput(values);
          const updateUserInput: UpdateUserInput = {
            id: user.id,
            ...rest,
            ...(password ? { password } : {}),
          };
          const { data } = await updateUser({ variables: { updateUserInput } });
          if (!data?.userUpdate) throw new Error("El backend no confirmó la actualización.");
          onSaved("Usuario actualizado correctamente.");
        } catch (error) {
          onError(error instanceof Error ? error.message : "Ocurrió un error inesperado.");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, dirty }) => (
        <FormModal
          title="Editar usuario"
          titleId="user-modal-title"
          onClose={onClose}
          dirty={dirty}
          isSubmitting={isSubmitting}
          submitLabel="Guardar cambios"
          pendingLabel="Guardando…"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="Nombre" name="firstName" placeholder="Juan" required />
            <TextField label="Apellido" name="lastName" placeholder="Pérez" required />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="Correo" name="email" type="email" placeholder="juan@empresa.com" required />
            <TextField
              label="Contraseña"
              name="password"
              type="password"
              placeholder="Dejar en blanco para no cambiar"
            />
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
