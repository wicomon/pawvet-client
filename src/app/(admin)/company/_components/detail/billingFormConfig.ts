import * as Yup from "yup";
import type { CreateSubscriptionPaymentInput, UpsertSubscriptionInput } from "@/types/billing";

// Mirrors src/app/(admin)/company/_components/companyFormConfig.ts: Formik
// values are flat strings, Yup validates them, toMutationInput converts to
// the real input types (numbers, trimmed/undefined optionals).

export const PAYMENT_METHOD_OPTIONS = [
  { value: "", label: "Selecciona un método..." },
  { value: "Yape", label: "Yape" },
  { value: "Transferencia", label: "Transferencia" },
  { value: "Efectivo", label: "Efectivo" },
  { value: "Otro", label: "Otro" },
];

export interface RegisterPaymentFormValues {
  amount: string;
  months: string;
  method: string;
  reference: string;
  notes: string;
}

export const emptyRegisterPaymentFormValues: RegisterPaymentFormValues = {
  amount: "",
  months: "1",
  method: "",
  reference: "",
  notes: "",
};

export const registerPaymentSchema = Yup.object({
  amount: Yup.number()
    .typeError("Ingresa un monto válido.")
    .required("El monto es obligatorio.")
    .positive("El monto debe ser mayor a 0."),
  months: Yup.number()
    .typeError("Ingresa un número de meses válido.")
    .required("Indica cuántos meses se pagan.")
    .integer("Debe ser un número entero.")
    .min(1, "Mínimo 1 mes."),
  method: Yup.string().max(50, "Máximo 50 caracteres."),
  reference: Yup.string().max(100, "Máximo 100 caracteres."),
  notes: Yup.string().max(255, "Máximo 255 caracteres."),
});

// paidAt is left to the backend default (now) — no date picker in this form yet.
export function toRegisterPaymentInput(
  companyId: string,
  values: RegisterPaymentFormValues,
): CreateSubscriptionPaymentInput {
  return {
    companyId,
    amount: Number(values.amount),
    months: Number(values.months),
    method: values.method.trim() || undefined,
    reference: values.reference.trim() || undefined,
    notes: values.notes.trim() || undefined,
  };
}

export interface AssignPlanFormValues {
  planId: string;
  isComplimentary: boolean;
  trialDays: string;
}

export const emptyAssignPlanFormValues: AssignPlanFormValues = {
  planId: "",
  isComplimentary: false,
  trialDays: "",
};

export const assignPlanSchema = Yup.object({
  planId: Yup.string().required("Selecciona un plan."),
  isComplimentary: Yup.boolean(),
  trialDays: Yup.number().typeError("Ingresa un número de días válido.").integer().min(0),
});

export function toUpsertSubscriptionInput(
  companyId: string,
  values: AssignPlanFormValues,
): UpsertSubscriptionInput {
  return {
    companyId,
    planId: values.planId,
    // Always send the literal boolean — `false` means "turn off cortesía"
    // and must reach the backend; `|| undefined` would silently drop it.
    isComplimentary: values.isComplimentary,
    trialDays: values.trialDays ? Number(values.trialDays) : undefined,
  };
}
