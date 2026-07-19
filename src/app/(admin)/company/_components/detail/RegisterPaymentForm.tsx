"use client";

import { Formik } from "formik";
import { useMutation } from "@apollo/client/react";
import {
  SUBSCRIPTION_FIND_ALL,
  SUBSCRIPTION_FIND_BY_COMPANY,
  SUBSCRIPTION_PAYMENT_CREATE,
  SUBSCRIPTION_PAYMENT_FIND_ALL,
} from "@/graphql/billing.gql";
import TextField from "@/components/forms/fields/TextField";
import SelectField from "@/components/forms/fields/SelectField";
import FormModal from "@/components/ui/FormModal";
import {
  PAYMENT_METHOD_OPTIONS,
  emptyRegisterPaymentFormValues,
  registerPaymentSchema,
  toRegisterPaymentInput,
} from "./billingFormConfig";

type RegisterPaymentFormProps = {
  companyId: string;
  onClose: () => void;
  onSaved: (message: string) => void;
  onError: (message: string) => void;
};

// Mirrors src/app/(admin)/company/_components/CompanyCreateForm.tsx. Unlike
// company mutations, subscriptionPaymentCreate returns the entity, so the
// success check is `!data?.subscriptionPaymentCreate` instead of a boolean.
export default function RegisterPaymentForm({
  companyId,
  onClose,
  onSaved,
  onError,
}: RegisterPaymentFormProps) {
  const [createPayment] = useMutation(SUBSCRIPTION_PAYMENT_CREATE, {
    refetchQueries: [
      { query: SUBSCRIPTION_PAYMENT_FIND_ALL, variables: { companyId } },
      { query: SUBSCRIPTION_FIND_BY_COMPANY, variables: { companyId } },
      { query: SUBSCRIPTION_FIND_ALL },
    ],
  });

  return (
    <Formik
      initialValues={emptyRegisterPaymentFormValues}
      validationSchema={registerPaymentSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const { data } = await createPayment({
            variables: { createSubscriptionPaymentInput: toRegisterPaymentInput(companyId, values) },
          });
          if (!data?.subscriptionPaymentCreate) throw new Error("El backend no confirmó el pago.");
          onSaved("Pago registrado correctamente.");
        } catch (error) {
          onError(error instanceof Error ? error.message : "Ocurrió un error inesperado.");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, dirty }) => (
        <FormModal
          title="Registrar pago"
          titleId="payment-modal-title"
          onClose={onClose}
          dirty={dirty}
          isSubmitting={isSubmitting}
          submitLabel="Registrar pago"
          pendingLabel="Guardando…"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="Monto" name="amount" type="number" placeholder="0.00" required />
            <TextField label="Meses a pagar" name="months" type="number" placeholder="1" required />
            <SelectField label="Método" name="method" options={PAYMENT_METHOD_OPTIONS} />
          </div>
          <TextField label="Referencia" name="reference" placeholder="Opcional" />
          <TextField label="Notas" name="notes" placeholder="Opcional" />
        </FormModal>
      )}
    </Formik>
  );
}
