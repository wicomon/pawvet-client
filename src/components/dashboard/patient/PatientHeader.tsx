import { PATIENT } from "./content";

export default function PatientHeader() {
  return (
    <section className="flex flex-wrap items-start gap-5.5 rounded-2xl border border-wv-border bg-card p-6">
      <div className="grid h-22 w-22 shrink-0 place-items-center rounded-[18px] border-[1.5px] border-dashed border-wv-btn-border [background:repeating-linear-gradient(45deg,var(--color-wv-bg-alt),var(--color-wv-bg-alt)_8px,var(--color-wv-mint-wash)_8px,var(--color-wv-mint-wash)_16px)]">
        <span className="font-mono text-[10.5px] text-wv-muted-2">foto</span>
      </div>

      <div className="flex min-w-60 flex-1 flex-col gap-2.5">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-heading text-[26px] font-extrabold text-wv-navy">{PATIENT.name}</h1>
          <span className="rounded-full bg-wv-mint-soft px-3 py-1 text-xs font-extrabold text-wv-teal-deep">
            Activo
          </span>
          <span className="rounded-full bg-wv-amber-bg px-3 py-1 text-xs font-extrabold text-wv-amber-ink">
            {PATIENT.vaccineDueBadge}
          </span>
        </div>

        <div className="flex flex-wrap gap-x-6.5 gap-y-4.5">
          <PatientFact label="Especie / Raza" value={`${PATIENT.species} · ${PATIENT.breed}`} />
          <PatientFact label="Sexo / Edad" value={`${PATIENT.sex} · ${PATIENT.age}`} />
          <PatientFact label="Peso actual" value={PATIENT.weight} />
          <PatientFact label="Microchip" value={PATIENT.microchip} />
          <PatientFact
            label="Dueño"
            value={`${PATIENT.owner} · ${PATIENT.ownerPhone}`}
            tone="teal"
          />
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap gap-2.5">
        <button
          type="button"
          className="cursor-pointer rounded-[10px] bg-wv-teal px-4 py-2.5 text-[13.5px] font-extrabold text-white outline-none transition-colors duration-150 ease-out hover:bg-wv-teal-hover focus-visible:shadow-focus"
        >
          + Nueva consulta
        </button>
        <button
          type="button"
          className="cursor-pointer rounded-[10px] border-[1.5px] border-wv-btn-border bg-card px-4 py-2.5 text-[13.5px] font-bold text-wv-navy outline-none transition-colors duration-150 ease-out hover:border-wv-teal focus-visible:shadow-focus"
        >
          Editar
        </button>
      </div>
    </section>
  );
}

function PatientFact({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "teal";
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[11px] font-extrabold tracking-wider text-wv-faint uppercase">
        {label}
      </span>
      <span className={`text-sm font-bold ${tone === "teal" ? "text-wv-teal" : "text-wv-navy"}`}>
        {value}
      </span>
    </div>
  );
}
