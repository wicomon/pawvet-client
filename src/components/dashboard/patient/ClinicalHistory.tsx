import { CLINICAL_RECORDS, WEIGHT_BARS, NEXT_APPOINTMENT, PATIENT, type WeightBarTone } from "./content";

const BAR_TONE_CLASSNAME: Record<WeightBarTone, string> = {
  pale: "bg-wv-mint-pale",
  mid: "bg-wv-mint-mid",
  strong: "bg-wv-mint",
};

export default function ClinicalHistory() {
  return (
    <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[1.55fr_1fr]">
      <section className="flex flex-col gap-3">
        {CLINICAL_RECORDS.map((record) => (
          <article
            key={record.date}
            className="flex flex-col gap-3 rounded-[14px] border border-wv-border bg-card px-5.5 py-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-wv-mint" />
                <span className="font-heading text-[15px] font-bold text-wv-navy">
                  {record.date}
                </span>
                <span className="text-[12.5px] font-bold text-wv-muted-2">· {record.vet}</span>
              </div>
              <div className="flex gap-2">
                <span className="rounded-full bg-wv-row-border px-2.5 py-0.75 text-[11.5px] font-extrabold text-wv-muted">
                  {record.weight}
                </span>
                <span className="rounded-full bg-wv-row-border px-2.5 py-0.75 text-[11.5px] font-extrabold text-wv-muted">
                  {record.temperature}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-x-5 gap-y-3 sm:grid-cols-2">
              <RecordField label="Anamnesis" value={record.anamnesis} />
              <RecordField label="Diagnóstico" value={record.diagnosis} />
              <RecordField label="Tratamiento" value={record.treatment} />
              <RecordField label="Receta" value={record.prescription} />
            </div>
          </article>
        ))}
      </section>

      <div className="flex flex-col gap-5">
        <section className="flex flex-col gap-3.5 rounded-[14px] border border-wv-border bg-card px-5.5 py-5">
          <div className="flex items-baseline justify-between">
            <h3 className="font-heading text-[15px] font-bold text-wv-navy">Curva de peso</h3>
            <span className="text-[13px] font-extrabold text-wv-teal">{PATIENT.weight}</span>
          </div>
          <div className="flex h-27.5 items-end gap-2.5">
            {WEIGHT_BARS.map((bar) => (
              <div
                key={bar.month}
                className="flex h-full flex-1 flex-col items-center justify-end gap-1.5"
              >
                <span className="text-[10px] font-bold text-wv-muted-2">{bar.kg}</span>
                <div
                  style={{ height: `${bar.heightPercent}%` }}
                  className={`w-full rounded-t-[5px] ${BAR_TONE_CLASSNAME[bar.tone]}`}
                />
                <span className="text-[10.5px] font-bold text-wv-faint">{bar.month}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3 rounded-[14px] border border-wv-border bg-card px-5.5 py-5">
          <h3 className="font-heading text-[15px] font-bold text-wv-navy">Próxima cita</h3>
          <div className="flex items-center gap-3 rounded-[10px] bg-wv-canvas px-3.5 py-3">
            <div className="flex shrink-0 flex-col items-center rounded-[10px] border border-wv-border bg-card px-3 py-1.5">
              <span className="text-[10px] font-extrabold uppercase text-wv-chaos-ink">
                {NEXT_APPOINTMENT.weekday}
              </span>
              <span className="font-heading text-lg font-extrabold text-wv-navy">
                {NEXT_APPOINTMENT.day}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[13.5px] font-extrabold text-wv-navy">
                {NEXT_APPOINTMENT.title}
              </span>
              <span className="text-xs font-semibold text-wv-muted-2">
                {NEXT_APPOINTMENT.subtitle}
              </span>
            </div>
          </div>
          <button
            type="button"
            className="cursor-pointer rounded-[10px] bg-wv-mint-soft px-3.5 py-2.5 text-[13px] font-extrabold text-wv-teal-deep outline-none transition-colors duration-150 ease-out hover:bg-wv-mint-soft/70 focus-visible:shadow-focus"
          >
            Enviar recordatorio por WhatsApp
          </button>
        </section>
      </div>
    </div>
  );
}

function RecordField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] font-extrabold tracking-wider text-wv-faint uppercase">
        {label}
      </span>
      <span className="text-[13.5px] leading-[1.5] text-wv-muted-2">{value}</span>
    </div>
  );
}
