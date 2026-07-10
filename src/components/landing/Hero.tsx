import Link from "next/link";
import PawMark from "./PawMark";
import { BRAND, TRIAL_DAYS } from "./content";

const weightBars = [
  { month: "Ene", height: 34, tone: "bg-[#CFE9E0]" },
  { month: "Mar", height: 42, tone: "bg-[#CFE9E0]" },
  { month: "May", height: 50, tone: "bg-[#9BD6C4]" },
  { month: "Jul", height: 58, tone: "bg-wv-mint" },
];

export default function Hero() {
  return (
    <section className="overflow-hidden bg-gradient-to-b from-wv-bg to-wv-bg-alt">
      <div className="mx-auto grid max-w-[1160px] items-center gap-12 px-6 py-16 sm:px-8 md:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <div className="flex flex-col gap-5 animate-[rise_400ms_var(--ease-out-strong)_both]">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-wv-mint-soft px-3.5 py-1.5 text-[13px] font-bold tracking-wide text-wv-teal-hover">
            <PawMark size={13} color="var(--color-wv-mint)" />
            Hecho para veterinarias y pet shops del Perú
          </div>

          <h1 className="text-balance font-heading text-[38px] font-extrabold leading-[1.12] text-wv-navy sm:text-[46px] lg:text-[52px]">
            Tu clínica ordenada. Tus pacientes que sí regresan.
          </h1>

          <p className="max-w-[480px] text-lg leading-relaxed text-wv-muted">
            Deja el Excel y los cuadernos. {BRAND} gestiona expedientes, citas
            y caja en la nube — y trae de vuelta a cada paciente con
            recordatorios automáticos por WhatsApp.
          </p>

          <div className="mt-1.5 flex flex-wrap gap-3.5">
            <Link
              href="/login"
              className="flex h-[54px] items-center rounded-xl bg-wv-teal px-7 text-[17px] font-extrabold text-white shadow-[0_8px_24px_rgba(14,140,111,0.28)] outline-none transition-[background-color,transform] duration-150 ease-out hover:bg-wv-teal-hover focus-visible:shadow-focus active:scale-[0.97]"
            >
              Prueba gratis por {TRIAL_DAYS} días
            </Link>
            <a
              href="#modulos"
              className="flex h-[54px] items-center rounded-xl border-[1.5px] border-wv-border bg-white px-7 text-[17px] font-bold text-wv-navy outline-none transition-colors duration-200 ease-out hover:border-wv-teal focus-visible:shadow-focus"
            >
              Ver demo
            </a>
          </div>

          <div className="flex flex-wrap gap-4 text-sm font-semibold text-wv-muted-2">
            <span>Sin tarjeta de crédito</span>
            <span aria-hidden="true">·</span>
            <span>Configuración en 1 día</span>
            <span aria-hidden="true">·</span>
            <span>Soporte en español</span>
          </div>
        </div>

        {/* Dashboard mockup */}
        <div className="relative animate-[rise_400ms_var(--ease-out-strong)_80ms_both]">
          <div className="overflow-hidden rounded-[18px] border border-wv-border bg-white shadow-[0_24px_60px_rgba(11,43,69,0.14)]">
            <div className="flex h-10 items-center gap-1.5 bg-wv-navy px-4">
              <span className="h-[9px] w-[9px] rounded-full bg-[#274A68]" />
              <span className="h-[9px] w-[9px] rounded-full bg-[#274A68]" />
              <span className="h-[9px] w-[9px] rounded-full bg-[#274A68]" />
              <span className="ml-3 text-xs font-semibold text-[#9FB6C9]">
                wicovet.pe/dashboard
              </span>
            </div>

            <div className="flex flex-col gap-3.5 bg-[#F4F8F6] p-4">
              {/* WhatsApp reminder card */}
              <div className="flex items-start gap-3 rounded-xl border border-wv-border bg-white p-3.5">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-wv-mint-soft font-heading text-[13px] font-bold text-wv-teal-hover">
                  WA
                </div>
                <div className="flex flex-1 flex-col gap-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[13px] font-extrabold text-wv-navy">
                      Recordatorio automático · WhatsApp
                    </span>
                    <span className="whitespace-nowrap rounded-full bg-wv-amber-bg px-2 py-0.5 text-[11px] font-extrabold text-wv-amber-ink">
                      Próximamente
                    </span>
                  </div>
                  <div className="rounded-[10px] rounded-bl-sm bg-[#EAF7F1] px-3 py-2.5 text-[12.5px] leading-snug text-[#21463C]">
                    Hola María 🐾 A <b>Rocky</b> le toca su vacuna antirrábica
                    este viernes. ¿Confirmamos su cita de las 10:00 a.m.?
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-[1.15fr_1fr]">
                {/* Weight chart card */}
                <div className="flex flex-col gap-2.5 rounded-xl border border-wv-border bg-white p-3.5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[13px] font-extrabold text-wv-navy">
                      Rocky · Control de peso
                    </span>
                    <span className="text-xs font-bold text-wv-teal">
                      28.4 kg
                    </span>
                  </div>
                  <div className="flex h-[74px] items-end gap-2">
                    {weightBars.map((bar) => (
                      <div
                        key={bar.month}
                        className="flex flex-1 flex-col items-center gap-1"
                      >
                        <div
                          className={`w-full rounded-t-[5px] ${bar.tone}`}
                          style={{ height: bar.height }}
                        />
                        <span className="text-[10px] font-semibold text-wv-faint">
                          {bar.month}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* POS card */}
                <div className="flex flex-col gap-2.5 rounded-xl border border-wv-border bg-white p-3.5">
                  <span className="text-[13px] font-extrabold text-wv-navy">
                    Caja · POS
                  </span>
                  <div className="flex flex-col gap-1.5 text-xs text-wv-muted">
                    <div className="flex justify-between">
                      <span>Consulta general</span>
                      <b>S/ 80.00</b>
                    </div>
                    <div className="flex justify-between">
                      <span>Vacuna antirrábica</span>
                      <b>S/ 60.00</b>
                    </div>
                    <div className="flex justify-between border-t border-dashed border-wv-border pt-1.5">
                      <span className="font-extrabold text-wv-navy">
                        Total
                      </span>
                      <b className="text-wv-navy">S/ 140.00</b>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-lg border border-[#F0DFB6] bg-wv-amber-bg px-2.5 py-1.5 text-[11.5px] font-extrabold text-wv-amber-ink">
                    <span className="h-[7px] w-[7px] rounded-full bg-[#E4B54B]" />
                    Factura SUNAT · Próximamente
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-[30px] -right-[30px] h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(23,190,154,0.18),transparent_70%)]"
          />

          {/* Decorative floating paws */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-4 -top-12 hidden items-end gap-5 sm:flex"
          >
            <PawMark
              size={22}
              color="var(--color-wv-teal)"
              className="rotate-[-22deg] opacity-[0.16] animate-[float-paw_5s_ease-in-out_infinite]"
            />
            <PawMark
              size={22}
              color="var(--color-wv-teal)"
              className="-translate-y-3 rotate-[-8deg] opacity-[0.28] animate-[float-paw_5s_ease-in-out_infinite_400ms]"
            />
            <PawMark
              size={22}
              color="var(--color-wv-teal)"
              className="rotate-[8deg] opacity-40 animate-[float-paw_5s_ease-in-out_infinite_800ms]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
