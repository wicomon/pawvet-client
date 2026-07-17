'use client';

import { Formik } from 'formik';
import { useMutation } from '@apollo/client/react';
import { ROLE_CREATE, ROLE_FIND_ALL_WITH_MENU } from '@/graphql/role.gql';
import FormModal from '@/components/ui/FormModal';
import {
  emptyRoleFormValues,
  roleSchema,
  toMutationInput,
} from './roleFormConfig';
import TextField from '../forms/fields/TextField';
import CheckboxField from '../forms/fields/CheckboxField';

type RoleCreateFormProps = {
  onClose: () => void;
  onSaved: (message: string) => void;
  onError: (message: string) => void;
};

// Formik + Yup form for creating a role. Mirrors RoleEditForm.tsx but without the
// isEdit branching that used to live in RoleFormModal.tsx.
export default function RoleCreateForm({
  onClose,
  onSaved,
  onError,
}: RoleCreateFormProps) {
  const [createRole] = useMutation(ROLE_CREATE, {
    refetchQueries: [ROLE_FIND_ALL_WITH_MENU],
  });

  return (
    <Formik
      initialValues={emptyRoleFormValues}
      validationSchema={roleSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const { data } = await createRole({
            variables: { createRoleInput: toMutationInput(values) },
          });
          if (!data?.roleCreate)
            throw new Error('El backend no confirmó la creación.');
          onSaved('Rol creado correctamente.');
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
          title='Nuevo rol'
          titleId='role-modal-title'
          onClose={onClose}
          dirty={dirty}
          isSubmitting={isSubmitting}
          submitLabel='Crear rol'
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
