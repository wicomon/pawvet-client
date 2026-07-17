import Link from "next/link";
import { statusBadge, patientSlug } from "../content";
import {
  SCHEDULE_VETS,
  HOUR_LABELS,
  HOUR_HEIGHT_PX,
  minutesFromStart,
  formatEndTime,
  type ScheduleAppointment,
} from "./content";

type WeekGridProps = {
  appointments: ScheduleAppointment[];
};

export default function WeekGrid({ appointments }: WeekGridProps) {
  const gridHeight = HOUR_LABELS.length * HOUR_HEIGHT_PX;

  return (
    <section className="rounded-2xl border border-wv-border bg-card px-5 py-4.5">
      <div className="overflow-x-auto">
        <div className="grid min-w-180 grid-cols-[56px_repeat(3,1fr)]">
          <div />
          {SCHEDULE_VETS.map((vet, vetIndex) => {
            const count = appointments.filter((a) => a.vetIndex === vetIndex).length;
            return (
              <div
                key={vet}
                className="flex items-baseline gap-2 border-l border-wv-row-border px-2.5 pb-3"
              >
                <span className="font-heading text-sm font-bold text-wv-navy">{vet}</span>
                <span className="text-[11.5px] font-extrabold text-wv-faint">
                  {count === 1 ? "1 cita" : `${count} citas`}
                </span>
              </div>
            );
          })}

          <div className="flex flex-col">
            {HOUR_LABELS.map((hour) => (
              <div
                key={hour}
                style={{ height: HOUR_HEIGHT_PX }}
                className="-translate-y-1.5 pr-2.5 text-right text-[11px] font-extrabold text-wv-faint"
              >
                {hour}
              </div>
            ))}
          </div>

          {SCHEDULE_VETS.map((vet, vetIndex) => (
            <div
              key={vet}
              style={{
                height: gridHeight,
                backgroundImage: `repeating-linear-gradient(180deg, transparent 0, transparent ${
                  HOUR_HEIGHT_PX - 1
                }px, var(--color-wv-row-border) ${HOUR_HEIGHT_PX - 1}px, var(--color-wv-row-border) ${HOUR_HEIGHT_PX}px)`,
              }}
              className="relative border-l border-t border-wv-row-border"
            >
              {appointments
                .filter((a) => a.vetIndex === vetIndex)
                .map((appt) => {
                  const badge = statusBadge(appt.status);
                  return (
                    <Link
                      key={`${appt.time}-${appt.pet}`}
                      href={`/patients/${patientSlug(appt.pet)}`}
                      style={{
                        top: (minutesFromStart(appt.time) / 60) * HOUR_HEIGHT_PX + 1,
                        height: (appt.duration / 60) * HOUR_HEIGHT_PX - 5,
                      }}
                      className={`absolute left-1.5 right-1.5 flex flex-col gap-0.5 overflow-hidden rounded-lg border-l-[3px] border-current px-2.5 py-1.5 outline-none focus-visible:shadow-focus ${badge.className}`}
                    >
                      <span className="flex items-center justify-between gap-1.5">
                        <span className="text-[11px] font-extrabold">
                          {appt.time} – {formatEndTime(appt.time, appt.duration)}
                        </span>
                        <span className="text-[10px] font-extrabold uppercase tracking-[0.04em]">
                          {badge.label}
                        </span>
                      </span>
                      <span className="text-[13px] font-extrabold text-wv-navy">
                        {appt.pet} · {appt.species}
                      </span>
                      <span className="truncate text-[11.5px] font-semibold text-wv-muted-2">
                        {appt.reason} — {appt.owner}
                      </span>
                    </Link>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
