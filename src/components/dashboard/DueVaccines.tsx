import { DUE_VACCINES } from "./content";

export default function DueVaccines() {
  return (
    <section className="flex flex-col gap-3.5 rounded-2xl border border-wv-border bg-card px-6 py-5.5">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-[17px] font-bold text-wv-navy">Vacunas por vencer</h2>
        <span className="rounded-full bg-wv-amber-bg px-2.5 py-0.75 text-[11px] font-extrabold text-wv-amber-ink">
          Esta semana
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {DUE_VACCINES.map((vaccine) => (
          <div
            key={`${vaccine.pet}-${vaccine.vaccine}`}
            className="flex flex-wrap items-center gap-3 rounded-[10px] border border-wv-row-border px-3 py-2.5"
          >
            <div className="grid h-8.5 w-8.5 shrink-0 place-items-center rounded-full bg-wv-mint-soft font-heading text-xs font-bold text-wv-teal-deep">
              {vaccine.initials}
            </div>
            <div className="flex min-w-36 flex-1 flex-col gap-px">
              <span className="text-[13.5px] font-extrabold text-wv-navy">
                {vaccine.pet} · {vaccine.vaccine}
              </span>
              <span className="text-xs font-semibold text-wv-muted-2">
                Vence {vaccine.due} — {vaccine.owner}
              </span>
            </div>
            <button
              type="button"
              className="cursor-pointer whitespace-nowrap rounded-lg bg-wv-mint-soft px-3 py-1.75 text-xs font-extrabold text-wv-teal-deep outline-none transition-colors duration-150 ease-out hover:bg-wv-mint-soft/70 focus-visible:shadow-focus"
            >
              Recordar WA
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
