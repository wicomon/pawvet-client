import Link from "next/link";

const TABS = [
  { key: "historial", label: "Historial clínico" },
  { key: "vacunas", label: "Vacunas" },
  { key: "citas", label: "Citas" },
  { key: "compras", label: "Compras" },
] as const;

export type PatientTabKey = (typeof TABS)[number]["key"];
export const PATIENT_TAB_KEYS: PatientTabKey[] = TABS.map((tab) => tab.key);

type PatientTabNavProps = {
  patientId: string;
  activeTab: PatientTabKey;
};

// Tab selection is URL state (?tab=...), same rationale as DaySelector in the
// schedule view — deep-linkable, no client component needed for tab switching.
export default function PatientTabNav({ patientId, activeTab }: PatientTabNavProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {TABS.map((tab) => {
        const active = tab.key === activeTab;
        return (
          <Link
            key={tab.key}
            href={`/dashboard/patients/${patientId}?tab=${tab.key}`}
            aria-current={active ? "page" : undefined}
            className={`rounded-[10px] border-[1.5px] px-[18px] py-2.5 text-sm font-bold outline-none focus-visible:shadow-focus ${
              active
                ? "border-wv-teal bg-wv-teal text-white"
                : "border-wv-btn-border bg-card text-wv-muted-2"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
