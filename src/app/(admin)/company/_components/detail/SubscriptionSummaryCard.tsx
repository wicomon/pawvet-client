import type { Subscription } from "@/types/billing";
import {
  PLAN_INTERVAL_LABEL,
  SUBSCRIPTION_STATUS_BADGE,
  SUBSCRIPTION_STATUS_LABEL,
  formatDate,
  formatMoney,
} from "@/lib/billing";

type SubscriptionSummaryCardProps = {
  subscription?: Subscription | null;
  onChangePlan: () => void;
  onRegisterPayment: () => void;
  onCancel: () => void;
};

// Detail-page counterpart of the "Plan" / "Suscripción" / "Vence" columns in
// companyColumns.tsx — same labels/badges from src/lib/billing.ts, just laid
// out as a summary card instead of table cells.
export default function SubscriptionSummaryCard({
  subscription,
  onChangePlan,
  onRegisterPayment,
  onCancel,
}: SubscriptionSummaryCardProps) {
  const canCancel = subscription && subscription.status !== "CANCELED";

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-wv-border bg-card px-6 py-5.5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-heading text-[17px] font-bold text-wv-navy">Suscripción</h2>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onRegisterPayment}
            className="cursor-pointer rounded-[10px] bg-wv-teal px-3.5 py-2.25 text-[13px] font-extrabold text-white outline-none transition-colors duration-150 ease-out hover:bg-wv-teal-hover focus-visible:shadow-focus"
          >
            Registrar pago
          </button>
          <button
            type="button"
            onClick={onChangePlan}
            className="cursor-pointer rounded-[10px] border-[1.5px] border-wv-btn-border bg-white px-3.5 py-2.25 text-[13px] font-extrabold text-wv-navy outline-none transition-colors duration-150 ease-out hover:bg-wv-mint-soft focus-visible:shadow-focus"
          >
            {subscription ? "Cambiar plan" : "Asignar plan"}
          </button>
          {canCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="cursor-pointer rounded-[10px] px-3.5 py-2.25 text-[13px] font-extrabold text-danger outline-none transition-colors duration-150 ease-out hover:bg-danger-bg focus-visible:shadow-focus"
            >
              Cancelar suscripción
            </button>
          )}
        </div>
      </div>

      {subscription ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-1">
            <span className="text-[11.5px] font-extrabold tracking-wider text-wv-faint uppercase">
              Plan
            </span>
            <span className="text-[14px] font-bold text-wv-navy">
              {subscription.plan?.name ?? "—"}
            </span>
            {subscription.plan && (
              <span className="text-[12.5px] font-semibold text-wv-muted-2">
                {formatMoney(subscription.plan.price, subscription.plan.currency)} ·{" "}
                {PLAN_INTERVAL_LABEL[subscription.plan.interval]}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[11.5px] font-extrabold tracking-wider text-wv-faint uppercase">
              Estado
            </span>
            <span
              className={`w-fit whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-extrabold ${SUBSCRIPTION_STATUS_BADGE[subscription.status]}`}
            >
              {SUBSCRIPTION_STATUS_LABEL[subscription.status]}
            </span>
            {subscription.isComplimentary && (
              <span className="text-[12.5px] font-semibold text-wv-muted-2">Cuenta cortesía</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[11.5px] font-extrabold tracking-wider text-wv-faint uppercase">
              Periodo actual
            </span>
            <span className="text-[14px] font-bold text-wv-navy">
              {formatDate(subscription.currentPeriodStart)} – {formatDate(subscription.currentPeriodEnd)}
            </span>
            {subscription.cancelAtPeriodEnd && (
              <span className="text-[12.5px] font-semibold text-danger">
                Se cancelará al fin del periodo
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[11.5px] font-extrabold tracking-wider text-wv-faint uppercase">
              Prueba
            </span>
            <span className="text-[14px] font-bold text-wv-navy">
              {subscription.trialEndsAt ? formatDate(subscription.trialEndsAt) : "Sin periodo de prueba"}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-wv-border bg-card px-6 py-10 text-center">
          <p className="font-heading text-[15px] font-bold text-wv-navy">
            Esta empresa no tiene una suscripción asignada.
          </p>
          <p className="text-[13px] font-semibold text-wv-muted">
            Usa &quot;Asignar plan&quot; para crear su suscripción.
          </p>
        </div>
      )}
    </section>
  );
}
