import Link from "next/link";
import { TODAY_APPOINTMENTS, statusBadge, patientSlug } from "./content";

export default function TodaySchedule() {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-wv-border bg-card px-6 py-[22px]">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-[17px] font-bold text-wv-navy">Agenda de hoy</h2>
        <Link
          href="/dashboard/schedule"
          className="text-[13.5px] font-extrabold text-wv-teal outline-none transition-colors duration-150 ease-out hover:text-wv-teal-hover focus-visible:shadow-focus"
        >
          Ver semana →
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        {TODAY_APPOINTMENTS.map((appt) => {
          const badge = statusBadge(appt.status);
          return (
            <div
              key={`${appt.time}-${appt.pet}`}
              className={`flex flex-wrap items-center gap-3.5 rounded-xl border border-wv-row-border px-3.5 py-3 ${
                appt.status === "in-progress" ? "bg-wv-mint-wash" : "bg-card"
              }`}
            >
              <span className="w-12 shrink-0 font-heading text-sm font-bold text-wv-navy">
                {appt.time}
              </span>
              <div className="flex min-w-40 flex-1 flex-col gap-0.5">
                <Link
                  href={`/dashboard/patients/${patientSlug(appt.pet)}`}
                  className="text-left text-[14.5px] font-extrabold text-wv-navy outline-none transition-colors duration-150 ease-out hover:text-wv-teal focus-visible:shadow-focus"
                >
                  {appt.pet} · {appt.species}
                </Link>
                <span className="text-[12.5px] font-semibold text-wv-muted-2">
                  {appt.reason} — {appt.owner}
                </span>
              </div>
              <span className="hidden text-[12.5px] font-bold text-wv-muted-2 sm:inline">
                {appt.vet}
              </span>
              <span
                className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[11.5px] font-extrabold ${badge.className}`}
              >
                {badge.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
