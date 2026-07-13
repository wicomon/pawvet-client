import { PATIENT_VACCINES, vaccineStatusBadge } from "./content";

export default function VaccineTable() {
  return (
    <section className="flex flex-col gap-3.5 rounded-2xl border border-wv-border bg-card px-6 py-[22px]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-heading text-[17px] font-bold text-wv-navy">Carnet de vacunas</h2>
        <button
          type="button"
          className="cursor-pointer rounded-[10px] bg-wv-teal px-3.5 py-[9px] text-[13px] font-extrabold text-white outline-none transition-colors duration-150 ease-out hover:bg-wv-teal-hover focus-visible:shadow-focus"
        >
          + Registrar vacuna
        </button>
      </div>

      <div className="overflow-x-auto">
        <div className="flex min-w-[620px] flex-col gap-1.5">
          <div className="grid grid-cols-[1.3fr_1fr_1fr_1fr_auto] gap-3 px-3.5 pb-1.5 text-[11.5px] font-extrabold tracking-[0.05em] text-wv-faint uppercase">
            <span>Vacuna</span>
            <span>Lote</span>
            <span>Aplicada</span>
            <span>Próxima dosis</span>
            <span>Estado</span>
          </div>
          {PATIENT_VACCINES.map((vaccine) => {
            const badge = vaccineStatusBadge(vaccine.status);
            return (
              <div
                key={vaccine.batch}
                className="grid grid-cols-[1.3fr_1fr_1fr_1fr_auto] items-center gap-3 rounded-[10px] border border-wv-row-border px-3.5 py-[13px]"
              >
                <span className="text-sm font-extrabold text-wv-navy">{vaccine.name}</span>
                <span className="text-[13px] font-semibold text-wv-muted-2">{vaccine.batch}</span>
                <span className="text-[13px] font-bold text-wv-muted-2">{vaccine.applied}</span>
                <span className="text-[13px] font-bold text-wv-muted-2">{vaccine.next}</span>
                <span
                  className={`w-fit whitespace-nowrap rounded-full px-2.5 py-1 text-[11.5px] font-extrabold ${badge.className}`}
                >
                  {badge.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
