import type { Metadata } from "next";
import { getUser } from "@/lib/dal";
import DashboardGreeting from "./_components/DashboardGreeting";
import KpiGrid from "./_components/KpiGrid";
import TodaySchedule from "./_components/TodaySchedule";
import DueVaccines from "./_components/DueVaccines";
import LowStock from "./_components/LowStock";
import RecentSales from "./_components/RecentSales";

export const metadata: Metadata = {
  title: "Panel — PawControl",
};

export default async function DashboardPage() {
  const user = await getUser();

  return (
    <>
      <DashboardGreeting firstName={user?.firstName ?? "Doctor(a)"} />

      <KpiGrid />

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[1.5fr_1fr]">
        <TodaySchedule />
        <div className="flex flex-col gap-5">
          <DueVaccines />
          <LowStock />
        </div>
      </div>

      <RecentSales />
    </>
  );
}
