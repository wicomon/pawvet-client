'use client';

import { Formik } from 'formik';
import { useMutation } from '@apollo/client/react';
import { ROLE_FIND_ALL_WITH_MENU, ROLE_UPDATE } from '@/graphql/role.gql';
import FormModal from '@/components/ui/FormModal';
import {
  roleSchema,
  roleToFormValues,
  toMutationInput,
} from './roleFormConfig';
import type { Role, UpdateRoleInput } from '@/types/role';
import TextField from '../forms/fields/TextField';
import CheckboxField from '../forms/fields/CheckboxField';

type RoleEditFormProps = {
  role: Role;
  onClose: () => void;
  onSaved: (message: string) => void;
  onError: (message: string) => void;
};

// Formik + Yup form for editing a role. Mirrors RoleCreateForm.tsx but without the
// isEdit branching that used to live in RoleFormModal.tsx.
export default function RoleEditForm({
  role,
  onClose,
  onSaved,
  onError,
}: RoleEditFormProps) {
  const [updateRole] = useMutation(ROLE_UPDATE, {
    refetchQueries: [ROLE_FIND_ALL_WITH_MENU],
  });

  return (
    <Formik
      initialValues={roleToFormValues(role)}
      validationSchema={roleSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const updateRoleInput: UpdateRoleInput = {
            id: role.id,
            ...toMutationInput(values),
          };
          const { data } = await updateRole({ variables: { updateRoleInput } });
          if (!data?.roleUpdate)
            throw new Error('El backend no confirmó la actualización.');
          onSaved('Rol actualizado correctamente.');
        } catch (error) {
          onError(
            error instanceof Error
              ? error.message
              : 'Ocurrió un error inesperado.',
          );
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, dirty }) => (
        <FormModal
          title='Editar rol'
          titleId='role-modal-title'
          onClose={onClose}
          dirty={dirty}
          isSubmitting={isSubmitting}
          submitLabel='Guardar cambios'
          pendingLabel='Guardando…'
        >
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <TextField
              label='Nombre'
              name='name'
              placeholder='Recepcionista'
              required
            />
            <TextField
              label='Slug'
              name='slug'
              placeholder='receptionist'
              required
            />
          </div>
          <TextField
            label='Descripción'
            name='description'
            placeholder='Opcional'
            helperText='Se muestra en la tabla de roles.'
          />

          <div>
            <p className='mb-2 text-[13px] font-extrabold text-wv-navy'>
              Permisos
            </p>
            <div className='grid grid-cols-1 gap-2.5 sm:grid-cols-2'>
              <CheckboxField label='Leer' name='canRead' />
              <CheckboxField label='Crear' name='canCreate' />
              <CheckboxField label='Actualizar' name='canUpdate' />
              <CheckboxField label='Eliminar' name='canDelete' />
            </div>
          </div>
        </FormModal>
      )}
    </Formik>
  );
}
