// Sample data for the weekly schedule view — mirrors dashboard/content.ts's
// TODAY_APPOINTMENTS but spread across a full week, per vet/groomer column.

import type { AppointmentStatus } from "../content";

export const SCHEDULE_VETS = ["Dra. Vega", "Dr. Ramos", "Groomer"] as const;

export type ScheduleAppointment = {
  time: string;
  duration: number; // minutes
  vetIndex: number;
  pet: string;
  species: string;
  reason: string;
  owner: string;
  status: AppointmentStatus;
};

export type ScheduleDay = {
  name: string;
  num: string;
  appointments: ScheduleAppointment[];
};

export const SCHEDULE_DAYS: ScheduleDay[] = [
  {
    name: "Lun",
    num: "13",
    appointments: [
      { time: "09:00", duration: 30, vetIndex: 0, pet: "Rocky", species: "Perro", reason: "Vacuna antirrábica", owner: "María Torres", status: "in-progress" },
      { time: "09:30", duration: 30, vetIndex: 1, pet: "Misha", species: "Gato", reason: "Consulta general", owner: "Jorge Salas", status: "confirmed" },
      { time: "10:00", duration: 30, vetIndex: 0, pet: "Coco", species: "Ave", reason: "Control de plumaje", owner: "Ana Quispe", status: "confirmed" },
      { time: "11:00", duration: 60, vetIndex: 2, pet: "Luna", species: "Perro", reason: "Baño y grooming", owner: "Pedro Díaz", status: "scheduled" },
      { time: "12:00", duration: 30, vetIndex: 1, pet: "Toby", species: "Conejo", reason: "Corte de uñas", owner: "Rosa Medina", status: "scheduled" },
      { time: "15:30", duration: 90, vetIndex: 0, pet: "Max", species: "Perro", reason: "Cirugía menor", owner: "Luis Herrera", status: "scheduled" },
    ],
  },
  {
    name: "Mar",
    num: "14",
    appointments: [
      { time: "09:30", duration: 30, vetIndex: 0, pet: "Simba", species: "Gato", reason: "Control post-operatorio", owner: "Elena Ruiz", status: "confirmed" },
      { time: "10:30", duration: 60, vetIndex: 2, pet: "Bruno", species: "Perro", reason: "Baño medicado", owner: "Iris Campos", status: "scheduled" },
      { time: "11:30", duration: 30, vetIndex: 1, pet: "Kira", species: "Perro", reason: "Desparasitación", owner: "Hugo Paredes", status: "confirmed" },
      { time: "16:00", duration: 30, vetIndex: 0, pet: "Nala", species: "Gato", reason: "Vacuna triple felina", owner: "Sofía León", status: "scheduled" },
    ],
  },
  {
    name: "Mié",
    num: "15",
    appointments: [
      { time: "09:00", duration: 60, vetIndex: 0, pet: "Thor", species: "Perro", reason: "Limpieza dental", owner: "Raúl Ponce", status: "confirmed" },
      { time: "10:00", duration: 30, vetIndex: 1, pet: "Pelusa", species: "Conejo", reason: "Consulta general", owner: "Carmen Soto", status: "scheduled" },
      { time: "12:00", duration: 60, vetIndex: 2, pet: "Rocky", species: "Perro", reason: "Grooming completo", owner: "María Torres", status: "scheduled" },
      { time: "15:00", duration: 30, vetIndex: 0, pet: "Milo", species: "Gato", reason: "Control de peso", owner: "Diego Vera", status: "scheduled" },
      { time: "16:30", duration: 30, vetIndex: 1, pet: "Chispa", species: "Ave", reason: "Corte de alas", owner: "Lucía Ríos", status: "scheduled" },
    ],
  },
  {
    name: "Jue",
    num: "16",
    appointments: [
      { time: "10:00", duration: 30, vetIndex: 1, pet: "Greta", species: "Perro", reason: "Vacuna séxtuple", owner: "Marta Silva", status: "confirmed" },
      { time: "11:00", duration: 90, vetIndex: 0, pet: "Zeus", species: "Perro", reason: "Cirugía de esterilización", owner: "Óscar Nieto", status: "scheduled" },
      { time: "15:30", duration: 60, vetIndex: 2, pet: "Copo", species: "Perro", reason: "Baño y corte", owner: "Julia Mendoza", status: "scheduled" },
    ],
  },
  {
    name: "Vie",
    num: "17",
    appointments: [
      { time: "09:00", duration: 30, vetIndex: 0, pet: "Rocky", species: "Perro", reason: "Vacuna antirrábica", owner: "María Torres", status: "confirmed" },
      { time: "09:30", duration: 30, vetIndex: 1, pet: "Duque", species: "Perro", reason: "Consulta general", owner: "Felipe Rojas", status: "scheduled" },
      { time: "10:30", duration: 60, vetIndex: 2, pet: "Canela", species: "Perro", reason: "Grooming completo", owner: "Rita Flores", status: "scheduled" },
      { time: "12:00", duration: 30, vetIndex: 0, pet: "Misha", species: "Gato", reason: "Vacuna triple felina", owner: "Jorge Salas", status: "scheduled" },
      { time: "16:00", duration: 30, vetIndex: 1, pet: "Bimbo", species: "Conejo", reason: "Control de uñas", owner: "Nora Ibáñez", status: "scheduled" },
    ],
  },
  {
    name: "Sáb",
    num: "18",
    appointments: [
      { time: "09:30", duration: 30, vetIndex: 0, pet: "Luna", species: "Perro", reason: "Vacuna séxtuple", owner: "Pedro Díaz", status: "confirmed" },
      { time: "10:30", duration: 60, vetIndex: 2, pet: "Oso", species: "Perro", reason: "Baño antipulgas", owner: "Tania Cueva", status: "scheduled" },
      { time: "11:30", duration: 30, vetIndex: 1, pet: "Felix", species: "Gato", reason: "Consulta general", owner: "Abel Guzmán", status: "scheduled" },
    ],
  },
  {
    name: "Dom",
    num: "19",
    appointments: [],
  },
];

export const HOUR_LABELS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];
export const HOUR_HEIGHT_PX = 88;
const SCHEDULE_START_HOUR = 9;

export function minutesFromStart(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return (hours - SCHEDULE_START_HOUR) * 60 + minutes;
}

export function formatEndTime(time: string, duration: number): string {
  const totalMinutes = minutesFromStart(time) + duration;
  const hours = SCHEDULE_START_HOUR + Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}
