// Sample data for the pet expediente (patient record) view. Every patient
// route currently resolves to this same demo record — the patients module
// isn't wired to the backend yet (see src/app/(admin)/patients/[id]/page.tsx).

import type { AppointmentStatus } from "../content";

export const PATIENT = {
  name: "Rocky",
  species: "Perro",
  breed: "Labrador",
  sex: "Macho",
  age: "4 años",
  weight: "28.400 kg",
  microchip: "982-000412-337",
  owner: "María Torres",
  ownerPhone: "+51 987 654 321",
  vaccineDueBadge: "Vacuna vence en 5 días",
};

export type ClinicalRecord = {
  date: string;
  vet: string;
  weight: string;
  temperature: string;
  anamnesis: string;
  diagnosis: string;
  treatment: string;
  prescription: string;
};

export const CLINICAL_RECORDS: ClinicalRecord[] = [
  {
    date: "13 Jul 2026",
    vet: "Dra. Carla Vega",
    weight: "28.400 kg",
    temperature: "38.5 °C",
    anamnesis: "Dueña reporta apetito normal; acude para vacunación anual y control.",
    diagnosis: "Paciente clínicamente sano. Condición corporal 5/9.",
    treatment: "Aplicación de vacuna antirrábica. Desparasitación oral.",
    prescription: "Drontal Plus 1 tab, dosis única con alimento.",
  },
  {
    date: "02 Mar 2026",
    vet: "Dr. Iván Ramos",
    weight: "27.900 kg",
    temperature: "39.1 °C",
    anamnesis: "Rasquiña intensa en zona dorsal desde hace 4 días.",
    diagnosis: "Dermatitis alérgica por pulgas (DAPP).",
    treatment: "Pipeta antipulgas + corticoide de acción corta.",
    prescription: "Apoquel 16mg, 1/2 tab c/12h por 7 días.",
  },
  {
    date: "15 Ene 2026",
    vet: "Dra. Carla Vega",
    weight: "27.200 kg",
    temperature: "38.4 °C",
    anamnesis: "Control de rutina, sin molestias reportadas.",
    diagnosis: "Sano. Ligero sarro dental incipiente.",
    treatment: "Se recomienda profilaxis dental en 6 meses.",
    prescription: "—",
  },
];

export type WeightBarTone = "pale" | "mid" | "strong";

export type WeightBar = {
  month: string;
  kg: string;
  heightPercent: number;
  tone: WeightBarTone;
};

export const WEIGHT_BARS: WeightBar[] = [
  { month: "Sep", kg: "26.1", heightPercent: 46, tone: "pale" },
  { month: "Nov", kg: "26.8", heightPercent: 56, tone: "pale" },
  { month: "Ene", kg: "27.2", heightPercent: 62, tone: "mid" },
  { month: "Mar", kg: "27.9", heightPercent: 72, tone: "mid" },
  { month: "May", kg: "28.1", heightPercent: 76, tone: "strong" },
  { month: "Jul", kg: "28.4", heightPercent: 82, tone: "strong" },
];

export const NEXT_APPOINTMENT = {
  weekday: "Vie",
  day: "17",
  title: "Vacuna antirrábica · 10:00 a.m.",
  subtitle: "Dra. Carla Vega · Consultorio 1",
};

export type VaccineStatus = "ok" | "due" | "overdue";

const VACCINE_STATUS_STYLES: Record<VaccineStatus, { label: string; className: string }> = {
  ok: { label: "Al día", className: "bg-wv-mint-soft text-wv-teal-deep" },
  due: { label: "Por vencer", className: "bg-wv-amber-bg text-wv-amber-ink" },
  overdue: { label: "Vencida", className: "bg-wv-chaos-bg text-wv-chaos-ink" },
};

export function vaccineStatusBadge(status: VaccineStatus) {
  return VACCINE_STATUS_STYLES[status];
}

export type PatientVaccine = {
  name: string;
  batch: string;
  applied: string;
  next: string;
  status: VaccineStatus;
};

export const PATIENT_VACCINES: PatientVaccine[] = [
  { name: "Antirrábica", batch: "LT-2291", applied: "18 Jul 2025", next: "17 Jul 2026", status: "due" },
  { name: "Séxtuple (refuerzo)", batch: "LT-1904", applied: "02 Mar 2026", next: "02 Mar 2027", status: "ok" },
  { name: "Bordetella", batch: "LT-1770", applied: "15 Ene 2026", next: "15 Ene 2027", status: "ok" },
  { name: "Leptospirosis", batch: "LT-1502", applied: "10 Nov 2024", next: "10 Nov 2025", status: "overdue" },
];

export type PatientAppointment = {
  date: string;
  time: string;
  reason: string;
  vet: string;
  duration: string;
  status: AppointmentStatus;
};

export const PATIENT_APPOINTMENTS: PatientAppointment[] = [
  { date: "Vie 17 Jul 2026", time: "10:00", reason: "Vacuna antirrábica", vet: "Dra. Carla Vega", duration: "30 min", status: "confirmed" },
  { date: "Lun 02 Mar 2026", time: "16:30", reason: "Consulta dermatológica", vet: "Dr. Iván Ramos", duration: "30 min", status: "completed" },
  { date: "Jue 15 Ene 2026", time: "09:00", reason: "Control de rutina", vet: "Dra. Carla Vega", duration: "30 min", status: "completed" },
  { date: "Mar 12 Nov 2025", time: "11:30", reason: "Baño y grooming", vet: "Groomer", duration: "60 min", status: "no-show" },
];

export type OwnerPurchase = {
  date: string;
  items: string;
  total: string;
};

export const OWNER_PURCHASES: OwnerPurchase[] = [
  { date: "13 Jul 2026", items: "Consulta + vacuna antirrábica + Drontal Plus", total: "S/ 165.00" },
  { date: "02 Mar 2026", items: "Consulta dermatológica + Apoquel 16mg", total: "S/ 178.00" },
  { date: "15 Ene 2026", items: "Alimento Premium Adulto 15kg", total: "S/ 189.90" },
];
