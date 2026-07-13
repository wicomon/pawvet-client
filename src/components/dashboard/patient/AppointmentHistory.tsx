import { PATIENT_APPOINTMENTS } from "./content";
import { statusBadge } from "../content";

export default function AppointmentHistory() {
  return (
    <section className="flex flex-col gap-3.5 rounded-2xl border border-wv-border bg-card px-6 py-[22px]">
      <h2 className="font-heading text-[17px] font-bold text-wv-navy">Historial de citas</h2>
      <div className="overflow-x-auto">
        <div className="flex min-w-[560px] flex-col gap-1.5">
          {PATIENT_APPOINTMENTS.map((appt) => {
            const badge = statusBadge(appt.status);
            return (
              <div
                key={`${appt.date}-${appt.time}`}
                className="grid grid-cols-[130px_1fr_auto_auto] items-center gap-3.5 rounded-[10px] border border-wv-row-border px-3.5 py-[13px]"
              >
                <span className="font-heading text-[13.5px] font-bold text-wv-navy">
                  {appt.date}
                </span>
                <div className="flex flex-col gap-px">
                  <span className="text-sm font-extrabold text-wv-navy">{appt.reason}</span>
                  <span className="text-[12.5px] font-semibold text-wv-muted-2">
                    {appt.vet} · {appt.duration}
                  </span>
                </div>
                <span className="text-[12.5px] font-bold text-wv-muted-2">{appt.time}</span>
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
