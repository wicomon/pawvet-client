"use client";

import { Formik } from "formik";
import { useMutation, useQuery } from "@apollo/client/react";
import {
  PLAN_FIND_ALL,
  SUBSCRIPTION_FIND_ALL,
  SUBSCRIPTION_FIND_BY_COMPANY,
  SUBSCRIPTION_UPSERT,
} from "@/graphql/billing.gql";
import TextField from "@/components/forms/fields/TextField";
import SelectField from "@/components/forms/fields/SelectField";
import CheckboxField from "@/components/forms/fields/CheckboxField";
import FormModal from "@/components/ui/FormModal";
import {
  assignPlanSchema,
  emptyAssignPlanFormValues,
  toUpsertSubscriptionInput,
  type AssignPlanFormValues,
} from "./billingFormConfig";

type AssignPlanFormProps = {
  companyId: string;
  currentPlanId?: string;
  onClose: () => void;
  onSaved: (message: string) => void;
  onError: (message: string) => void;
};

// Mirrors src/app/(admin)/users/_components/UserCreateForm.tsx' pattern of
// firing an extra query (PLAN_FIND_ALL) to populate a dependent SelectField.
export default function AssignPlanForm({
  companyId,
  currentPlanId,
  onClose,
  onSaved,
  onError,
}: AssignPlanFormProps) {
  const { data: planData, loading: plansLoading } = useQuery(PLAN_FIND_ALL);
  const [upsertSubscription] = useMutation(SUBSCRIPTION_UPSERT, {
    refetchQueries: [
      { query: SUBSCRIPTION_FIND_BY_COMPANY, variables: { companyId } },
      { query: SUBSCRIPTION_FIND_ALL },
    ],
  });

  const planOptions = [
    { value: "", label: "Selecciona un plan..." },
    ...(planData?.planFindAll ?? []).map((plan) => ({ value: plan.id, label: plan.name })),
  ];

  const initialValues: AssignPlanFormValues = {
    ...emptyAssignPlanFormValues,
    planId: currentPlanId ?? "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={assignPlanSchema}
      enableReinitialize
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const { data } = await upsertSubscription({
            variables: { upsertSubscriptionInput: toUpsertSubscriptionInput(companyId, values) },
          });
          if (!data?.subscriptionUpsert) throw new Error("El backend no confirmó el cambio de plan.");
          onSaved("Plan asignado correctamente.");
        } catch (error) {
          onError(error instanceof Error ? error.message : "Ocurrió un error inesperado.");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, dirty }) => (
        <FormModal
          title="Asignar plan"
          titleId="assign-plan-modal-title"
          onClose={onClose}
          dirty={dirty}
          isSubmitting={isSubmitting}
          submitLabel="Guardar"
          pendingLabel="Guardando…"
        >
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
