import Link from "next/link";
import PawMark from "./PawMark";
import { TRIAL_DAYS, PRICE_STARTER, PRICE_PRO, PRICE_PERIOD } from "./content";

type Feature = { text: string; soon?: boolean };

const starterFeatures: Feature[] = [
  { text: "Expediente clínico ilimitado" },
  { text: "Agenda de citas y grooming" },
  { text: "Recordatorios por WhatsApp", soon: true },
  { text: "POS y control de inventario" },
  { text: "1 usuario médico" },
];

const proFeatures: Feature[] = [
  { text: "Todo lo de Emprendedor, más:" },
  { text: "Médicos y usuarios ilimitados" },
  { text: "Facturación electrónica SUNAT", soon: true },
  { text: "Reportes avanzados de ingresos y retención" },
  { text: "Soporte prioritario por WhatsApp" },
];

function FeatureRow({ feature }: { feature: Feature }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full text-[11px] font-extrabold ${
          feature.soon
            ? "bg-wv-amber-bg text-wv-amber-ink"
            : "bg-wv-mint-soft text-wv-teal-hover"
        }`}
      >
        {feature.soon ? "•" : "✓"}
      </span>
      <span className="flex items-center gap-2 text-[15px] text-wv-muted">
        {feature.text}
        {feature.soon && (
          <span className="rounded-full bg-wv-amber-bg px-2 py-0.5 text-[11px] font-extrabold text-wv-amber-ink">
            Pronto
          </span>
        )}
      </span>
    </div>
  );
}

export default function Pricing() {
  return (
    <section id="precios" className="bg-wv-bg">
      <div className="mx-auto max-w-290 px-6 py-16 sm:px-8 md:py-20">
        <div className="mx-auto mb-12 flex max-w-140 flex-col items-center gap-3.5 text-center">
          <PawMark
            size={18}
            color="var(--color-wv-teal)"
            className="rotate-[-8deg]"
          />
          <h2 className="font-heading text-[32px] font-extrabold text-wv-navy sm:text-[38px]">
            Precios simples, sin sorpresas
          </h2>
          <p className="text-lg leading-relaxed text-wv-muted">
            Prueba gratis {TRIAL_DAYS} días. Cancela cuando quieras.
          </p>
        </div>

        <div className="mx-auto grid max-w-215 gap-6 sm:grid-cols-2">
          {/* Emprendedor */}
          <div className="flex flex-col gap-5 rounded-[18px] border border-wv-border bg-white p-9">
            <div className="flex flex-col gap-2">
              <span className="font-heading text-xl font-bold text-wv-navy">
                Emprendedor
              </span>
              <span className="text-[14.5px] leading-relaxed text-wv-muted-2">
                Consultorio tradicional o pet shop que empieza a ordenarse.
              </span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-heading text-[42px] font-extrabold text-wv-navy sm:text-[46px]">
                {PRICE_STARTER}
              </span>
              <span className="text-[15px] font-semibold text-wv-muted-2">
                /{PRICE_PERIOD}
              </span>
            </div>
            <div className="flex flex-col gap-2.5">
              {starterFeatures.map((f) => (
                <FeatureRow key={f.text} feature={f} />
              ))}
            </div>
            <Link
              href="/login"
              className="mt-auto flex h-13 items-center justify-center rounded-xl border-[1.5px] border-wv-border text-base font-extrabold text-wv-navy outline-none transition-colors duration-200 ease-out hover:border-wv-teal focus-visible:shadow-focus active:scale-[0.97]"
            >
              Empezar prueba gratis
            </Link>
          </div>

          {/* Clínica Pro — featured plan (the section's one primary CTA) */}
          <div className="relative flex flex-col gap-5 rounded-[18px] border-2 border-wv-teal bg-white p-9 shadow-[0_20px_48px_rgba(14,140,111,0.16)]">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-wv-teal px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-white">
              Más popular
            </span>
            <div className="flex flex-col gap-2">
              <span className="font-heading text-xl font-bold text-wv-navy">
                Clínica Pro
              </span>
              <span className="text-[14.5px] leading-relaxed text-wv-muted-2">
                Clínicas con múltiples médicos que quieren crecer en serio.
              </span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-heading text-[42px] font-extrabold text-wv-navy sm:text-[46px]">
                {PRICE_PRO}
              </span>
              <span className="text-[15px] font-semibold text-wv-muted-2">
                /{PRICE_PERIOD}
              </span>
            </div>
            <div className="flex flex-col gap-2.5">
              {proFeatures.map((f, i) =>
                i === 0 ? (
                  <div key={f.text} className="flex items-center gap-2.5">
                    <span className="grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full bg-wv-mint-soft text-[11px] font-extrabold text-wv-teal-hover">
                      ✓
                    </span>
                    <span className="text-[15px] text-wv-muted">
                      <b>Todo lo de Emprendedor</b>, más:
                    </span>
                  </div>
                ) : (
                  <FeatureRow key={f.text} feature={f} />
                )
              )}
            </div>
            <Link
              href="/login"
              className="mt-auto flex h-13 items-center justify-center rounded-xl bg-wv-teal text-base font-extrabold text-white shadow-[0_8px_20px_rgba(14,140,111,0.25)] outline-none transition-[background-color,transform] duration-150 ease-out hover:bg-wv-teal-hover focus-visible:shadow-focus active:scale-[0.97]"
            >
              Empezar prueba gratis
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
