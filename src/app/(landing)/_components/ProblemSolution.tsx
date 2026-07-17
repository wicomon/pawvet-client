import PawMark from "./PawMark";
import { BRAND } from "@/content/brand";

const chaosItems = [
  {
    title: "Cuadernos perdidos:",
    text: "historiales incompletos y letra ilegible cuando más los necesitas.",
  },
  {
    title: "Excel desordenado:",
    text: "versiones duplicadas, fórmulas rotas y stock que nunca cuadra.",
  },
  {
    title: "Dueños que olvidan las vacunas:",
    text: "pacientes que no regresan e ingresos que se van a la competencia.",
  },
  {
    title: "Multas contables:",
    text: "comprobantes manuales y errores de caja que terminan en sanciones.",
  },
];

const orderItems = [
  {
    title: "Expedientes en 3 clics:",
    text: "historial completo, evoluciones y peso de cada paciente al instante.",
  },
  {
    title: "WhatsApp automático:",
    text: "recordatorios de vacunas y citas que llenan tu agenda solos.",
    soon: true,
  },
  {
    title: "Inventario y caja sin errores:",
    text: "control estricto de stock y ventas cuadradas al centavo.",
  },
  {
    title: "Facturación tranquila:",
    text: "comprobantes electrónicos listos para SUNAT, sin sustos.",
    soon: true,
  },
];

export default function ProblemSolution() {
  return (
    <section className="bg-wv-bg">
      <div className="mx-auto max-w-290 px-6 py-16 sm:px-8 md:py-20">
        <div className="mx-auto mb-12 flex max-w-160 flex-col items-center gap-3.5 text-center">
          <PawMark
            size={18}
            color="var(--color-wv-teal)"
            className="rotate-[-8deg]"
          />
          <h2 className="text-balance font-heading text-[32px] font-extrabold text-wv-navy sm:text-[38px]">
            Del caos del papel al orden de la nube
          </h2>
          <p className="text-lg leading-relaxed text-wv-muted">
            Si tu clínica vive en cuadernos y hojas de cálculo, cada día
            pierdes citas, stock e ingresos sin darte cuenta.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-5 rounded-2xl border border-wv-chaos-border bg-white p-8 pb-9">
            <span className="w-fit rounded-full bg-wv-chaos-bg px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-wv-chaos-ink">
              El caos de antes
            </span>
            <div className="flex flex-col gap-4">
              {chaosItems.map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <span className="grid h-5.5 w-5.5 shrink-0 place-items-center rounded-full bg-wv-chaos-bg text-[13px] font-extrabold text-wv-chaos-ink">
                    ✕
                  </span>
                  <p className="text-[15.5px] leading-relaxed text-wv-muted">
                    <b className="text-wv-navy">{item.title}</b> {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5 rounded-2xl bg-wv-navy p-8 pb-9 shadow-[0_20px_48px_rgba(11,43,69,0.22)]">
            <span className="w-fit rounded-full bg-[rgba(23,190,154,0.14)] px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-wv-mint">
              El orden con {BRAND}
            </span>
            <div className="flex flex-col gap-4">
              {orderItems.map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <span className="grid h-5.5 w-5.5 shrink-0 place-items-center rounded-full bg-[rgba(23,190,154,0.18)] text-[13px] font-extrabold text-wv-mint">
                    ✓
                  </span>
                  <p className="text-[15.5px] leading-relaxed text-[#B9CBD9]">
                    <b className="text-white">{item.title}</b> {item.text}{" "}
                    {item.soon && (
                      <span className="text-xs font-extrabold text-[#F5C761]">
                        Próximamente
                      </span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
