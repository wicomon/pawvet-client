import Link from "next/link";
import { PRICE_STARTER, PRICE_PERIOD } from "./content";

const roiRows = [
  { label: "Vacuna anual + consulta", value: "S/ 140" },
  { label: "Antipulgas + alimento en tienda", value: "S/ 95" },
];

export default function Roi() {
  return (
    <section id="roi" className="bg-wv-navy">
      <div className="mx-auto grid max-w-290 items-center gap-12 px-6 py-16 sm:px-8 md:py-20 lg:grid-cols-2 lg:gap-14">
        <div className="flex flex-col gap-4">
          <span className="w-fit rounded-full bg-[rgba(23,190,154,0.14)] px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-wv-mint">
            Una ayuda real para tu caja
          </span>
          <h2 className="text-balance font-heading text-[32px] font-extrabold text-white sm:text-[38px]">
            Cada paciente que regresa suma a tu caja
          </h2>
          <p className="text-lg leading-relaxed text-[#B9CBD9]">
            Cuando un dueño vuelve por la vacuna anual de su mascota, esa
            visita suma consulta, vacuna y compras en tienda. Con unas pocas
            visitas recuperadas al mes, el costo del software se vuelve fácil
            de justificar.
          </p>
          <Link
            href="/login"
            className="mt-1.5 flex h-13 w-fit items-center rounded-xl bg-wv-mint px-6 text-base font-extrabold text-[#06231B] outline-none transition-[background-color,transform] duration-150 ease-out hover:bg-wv-mint-bright focus-visible:shadow-focus active:scale-[0.97]"
          >
            Calcula tu retorno →
          </Link>
        </div>

        <div className="flex flex-col gap-4.5 rounded-2xl border border-[#1D4A70] bg-wv-navy-panel p-8">
          <span className="text-sm font-extrabold uppercase tracking-wide text-[#9FB6C9]">
            Ejemplo referencial
          </span>
          <div className="flex flex-col gap-3">
            {roiRows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between rounded-[10px] bg-white/5 px-4 py-3.5"
              >
                <span className="text-[15px] text-[#B9CBD9]">
                  {row.label}
                </span>
                <b className="text-base text-white">{row.value}</b>
              </div>
            ))}
            <div className="flex items-center justify-between rounded-[10px] border border-[rgba(23,190,154,0.35)] bg-[rgba(23,190,154,0.14)] px-4 py-3.5">
              <span className="text-[15px] font-extrabold text-wv-mint">
                Ingreso estimado por 1 paciente que vuelve
              </span>
              <b className="text-lg text-wv-mint">S/ 235</b>
            </div>
            <div className="flex items-center justify-between px-4 pt-1">
              <span className="text-sm text-[#9FB6C9]">
                Costo mensual de WicoVet (Plan Emprendedor)
              </span>
              <span className="text-[15px] font-bold text-[#B9CBD9]">
                {PRICE_STARTER} /{PRICE_PERIOD}
              </span>
            </div>
          </div>
          <p className="border-t border-[#1D4A70] pt-3.5 text-sm leading-relaxed text-[#9FB6C9]">
            Cifras referenciales: cada clínica es distinta, pero{" "}
            <b className="text-wv-mint">
              unas pocas visitas recuperadas al mes
            </b>{" "}
            ya marcan la diferencia.
          </p>
        </div>
      </div>
    </section>
  );
}
