import { KPIS } from "@/content/dashboard";

export default function KpiGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {KPIS.map((kpi) => (
        <div
          key={kpi.label}
          className="flex flex-col gap-2 rounded-[14px] border border-wv-border bg-card px-5 py-4.5"
        >
          <span className="text-[12.5px] font-extrabold tracking-[0.04em] text-wv-faint uppercase">
            {kpi.label}
          </span>
          <span className="font-heading text-[28px] font-extrabold text-wv-navy">
            {kpi.value}
          </span>
          <span className={`text-[12.5px] font-bold ${kpi.deltaClassName}`}>{kpi.delta}</span>
        </div>
      ))}
    </div>
  );
}
