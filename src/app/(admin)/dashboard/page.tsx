import type { Metadata } from "next";
import { getUser } from "@/lib/dal";
import DashboardGreeting from "@/components/dashboard/DashboardGreeting";
import KpiGrid from "@/components/dashboard/KpiGrid";
import TodaySchedule from "@/components/dashboard/TodaySchedule";
import DueVaccines from "@/components/dashboard/DueVaccines";
import LowStock from "@/components/dashboard/LowStock";
import RecentSales from "@/components/dashboard/RecentSales";

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
