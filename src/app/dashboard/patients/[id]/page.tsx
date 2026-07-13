import type { Metadata } from "next";
import Link from "next/link";
import PatientHeader from "@/components/dashboard/patient/PatientHeader";
import PatientTabNav, {
  PATIENT_TAB_KEYS,
  type PatientTabKey,
} from "@/components/dashboard/patient/PatientTabNav";
import ClinicalHistory from "@/components/dashboard/patient/ClinicalHistory";
import VaccineTable from "@/components/dashboard/patient/VaccineTable";
import AppointmentHistory from "@/components/dashboard/patient/AppointmentHistory";
import PurchaseHistory from "@/components/dashboard/patient/PurchaseHistory";
import { PATIENT } from "@/components/dashboard/patient/content";

export const metadata: Metadata = {
  title: "Expediente de mascota — VetFlow",
};

type PatientPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
};

export default async function PatientPage({ params, searchParams }: PatientPageProps) {
  // Route params and searchParams are Promises in this Next.js version.
  const { id } = await params;
  const { tab } = await searchParams;
  const activeTab: PatientTabKey = PATIENT_TAB_KEYS.includes(tab as PatientTabKey)
    ? (tab as PatientTabKey)
    : "historial";

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 text-[13.5px] font-bold text-wv-faint">
        <Link
          href="/dashboard"
          className="font-extrabold text-wv-teal outline-none transition-colors duration-150 ease-out hover:text-wv-teal-hover focus-visible:shadow-focus"
        >
          ← Dashboard
        </Link>
        <span>/</span>
        <span>Pacientes</span>
        <span>/</span>
        <span className="text-wv-navy">{PATIENT.name}</span>
      </div>

      <PatientHeader />

      <PatientTabNav patientId={id} activeTab={activeTab} />

      {activeTab === "historial" && <ClinicalHistory />}
      {activeTab === "vacunas" && <VaccineTable />}
      {activeTab === "citas" && <AppointmentHistory />}
      {activeTab === "compras" && <PurchaseHistory />}
    </>
  );
}
