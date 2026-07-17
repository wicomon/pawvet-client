import Link from "next/link";
import { SCHEDULE_DAYS } from "./content";

type DaySelectorProps = {
  selectedDay: number;
};

// Plain links to ?day=N — the selected day is URL state, so the schedule is
// shareable/deep-linkable and needs no client-side state at all.
export default function DaySelector({ selectedDay }: DaySelectorProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-0.5">
      {SCHEDULE_DAYS.map((day, index) => {
        const active = index === selectedDay;
        const count = day.appointments.length;

        return (
          <Link
            key={day.name}
            href={`/schedule?day=${index}`}
            aria-current={active ? "page" : undefined}
            className={`flex min-w-21.5 shrink-0 flex-col items-center gap-0.5 rounded-xl border-[1.5px] px-3 py-2.5 outline-none focus-visible:shadow-focus ${
              active
                ? "border-wv-teal bg-wv-teal text-white"
                : "border-wv-btn-border bg-card text-wv-muted-2"
            }`}
          >
            <span className="text-[10.5px] font-extrabold uppercase tracking-[0.06em]">
              {day.name}
            </span>
            <span className="font-heading text-[19px] font-extrabold">{day.num}</span>
            <span
              className={`text-[10.5px] font-bold ${active ? "text-white/80" : "text-wv-faint"}`}
            >
              {count === 0 ? "—" : count === 1 ? "1 cita" : `${count} citas`}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
