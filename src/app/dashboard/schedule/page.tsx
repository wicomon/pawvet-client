import type { Metadata } from "next";
import DaySelector from "@/components/dashboard/schedule/DaySelector";
import WeekGrid from "@/components/dashboard/schedule/WeekGrid";
import ScheduleEmptyState from "@/components/dashboard/schedule/ScheduleEmptyState";
import { SCHEDULE_DAYS } from "@/components/dashboard/schedule/content";

export const metadata: Metadata = {
  title: "Agenda — VetFlow",
};

type SchedulePageProps = {
  searchParams: Promise<{ day?: string }>;
};

export default async function SchedulePage({ searchParams }: SchedulePageProps) {
  // searchParams is a Promise in this Next.js version — always await it.
  const { day } = await searchParams;
  const parsedDay = Number(day);
  const selectedDay =
    Number.isInteger(parsedDay) && parsedDay >= 0 && parsedDay < SCHEDULE_DAYS.length
      ? parsedDay
      : 0;
  const currentDay = SCHEDULE_DAYS[selectedDay];
  const count = currentDay.appointments.length;

  return (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-heading text-2xl font-extrabold text-wv-navy">Agenda</h1>
          <p className="text-[14.5px] font-semibold text-wv-muted-2">
            {count === 0 ? "Sin citas" : count === 1 ? "1 cita" : `${count} citas`} ·{" "}
            {currentDay.name} {currentDay.num} de julio
          </p>
        </div>
        <span className="text-[13px] font-extrabold text-wv-faint">
          Semana del 13 al 19 de julio
        </span>
      </div>

      <DaySelector selectedDay={selectedDay} />

      {count === 0 ? <ScheduleEmptyState /> : <WeekGrid appointments={currentDay.appointments} />}
    </>
  );
}
