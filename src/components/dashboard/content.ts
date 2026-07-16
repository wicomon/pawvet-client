// Shared copy/data for the dashboard shell and the Dashboard view. Centralized
// here so no component redefines the same status label or sample row twice —
// mirrors src/components/landing/content.ts.
//
// Nav items are no longer defined here: the sidebar renders `user.menus` from
// `authUserInfo` (see src/components/dashboard/Sidebar.tsx and
// src/components/dashboard/menuIcons.ts for the icon-name resolver).

// Sample patient records aren't backed by the GraphQL API yet, so every
// pet name resolves to the same demo record (see components/dashboard/patient).
// Kept here — not in patient/content.ts — because both the Dashboard's
// TodaySchedule and the schedule week view link out to patient pages.
export function patientSlug(pet: string): string {
  return pet.toLowerCase();
}

export type AppointmentStatus =
  | "confirmed"
  | "scheduled"
  | "in-progress"
  | "completed"
  | "no-show"
  | "cancelled";

const STATUS_STYLES: Record<
  AppointmentStatus,
  { label: string; className: string }
> = {
  confirmed: { label: "Confirmada", className: "bg-wv-mint-soft text-wv-teal-deep" },
  scheduled: { label: "Agendada", className: "bg-wv-row-border text-wv-muted" },
  "in-progress": { label: "En consulta", className: "bg-wv-info-bg text-wv-info-ink" },
  completed: { label: "Completada", className: "bg-wv-row-border text-wv-muted-2" },
  "no-show": { label: "No asistió", className: "bg-wv-chaos-bg text-wv-chaos-ink" },
  cancelled: { label: "Cancelada", className: "bg-wv-chaos-bg text-wv-chaos-ink" },
};

export function statusBadge(status: AppointmentStatus) {
  return STATUS_STYLES[status];
}

export type Kpi = {
  label: string;
  value: string;
  delta: string;
  deltaClassName: string;
};

export const KPIS: Kpi[] = [
  {
    label: "Citas de hoy",
    value: "12",
    delta: "3 confirmadas · 1 en consulta",
    deltaClassName: "text-wv-teal",
  },
  {
    label: "Ventas de hoy",
    value: "S/ 1,240",
    delta: "+18% vs. lunes pasado",
    deltaClassName: "text-wv-teal",
  },
  {
    label: "Vacunas por vencer",
    value: "8",
    delta: "Esta semana",
    deltaClassName: "text-wv-amber-ink",
  },
  {
    label: "Stock bajo",
    value: "3",
    delta: "Requiere reposición",
    deltaClassName: "text-wv-chaos-ink",
  },
];

export type TodayAppointment = {
  time: string;
  pet: string;
  species: string;
  reason: string;
  owner: string;
  vet: string;
  status: AppointmentStatus;
};

export const TODAY_APPOINTMENTS: TodayAppointment[] = [
  {
    time: "09:00",
    pet: "Rocky",
    species: "Perro",
    reason: "Vacuna antirrábica",
    owner: "María Torres",
    vet: "Dra. Vega",
    status: "in-progress",
  },
  {
    time: "09:30",
    pet: "Misha",
    species: "Gato",
    reason: "Consulta general",
    owner: "Jorge Salas",
    vet: "Dr. Ramos",
    status: "confirmed",
  },
  {
    time: "10:00",
    pet: "Coco",
    species: "Ave",
    reason: "Control de plumaje",
    owner: "Ana Quispe",
    vet: "Dra. Vega",
    status: "confirmed",
  },
  {
    time: "11:00",
    pet: "Luna",
    species: "Perro",
    reason: "Baño y grooming",
    owner: "Pedro Díaz",
    vet: "Groomer",
    status: "scheduled",
  },
  {
    time: "12:00",
    pet: "Toby",
    species: "Conejo",
    reason: "Corte de uñas",
    owner: "Rosa Medina",
    vet: "Dr. Ramos",
    status: "scheduled",
  },
  {
    time: "15:30",
    pet: "Max",
    species: "Perro",
    reason: "Cirugía menor",
    owner: "Luis Herrera",
    vet: "Dra. Vega",
    status: "scheduled",
  },
];

export type DueVaccine = {
  initials: string;
  pet: string;
  vaccine: string;
  due: string;
  owner: string;
};

export const DUE_VACCINES: DueVaccine[] = [
  { initials: "RO", pet: "Rocky", vaccine: "Antirrábica", due: "vie 17 Jul", owner: "María Torres" },
  { initials: "LU", pet: "Luna", vaccine: "Séxtuple", due: "sáb 18 Jul", owner: "Pedro Díaz" },
  { initials: "MI", pet: "Misha", vaccine: "Triple felina", due: "dom 19 Jul", owner: "Jorge Salas" },
];

export type LowStockItem = {
  name: string;
  sku: string;
  stock: string;
};

export const LOW_STOCK: LowStockItem[] = [
  { name: "Alimento Premium Adulto 15kg", sku: "ALM-015", stock: "2 uds" },
  { name: "Vacuna antirrábica (dosis)", sku: "VAC-001", stock: "4 dosis" },
  { name: "Antipulgas pipeta 20-40kg", sku: "ANT-204", stock: "3 uds" },
];

export type SaleStatus = "paid" | "draft";

const SALE_STATUS_STYLES: Record<SaleStatus, { label: string; className: string }> = {
  paid: { label: "Pagada", className: "bg-wv-mint-soft text-wv-teal-deep" },
  draft: { label: "Borrador", className: "bg-wv-row-border text-wv-muted-2" },
};

export function saleStatusBadge(status: SaleStatus) {
  return SALE_STATUS_STYLES[status];
}

export type Sale = {
  time: string;
  client: string;
  items: string;
  status: SaleStatus;
  total: string;
};

export const RECENT_SALES: Sale[] = [
  {
    time: "12:40",
    client: "María Torres",
    items: "Consulta + vacuna antirrábica",
    status: "paid",
    total: "S/ 140.00",
  },
  {
    time: "11:55",
    client: "Cliente casual",
    items: "Alimento gatos 3kg, arena 10L",
    status: "paid",
    total: "S/ 96.50",
  },
  {
    time: "10:20",
    client: "Pedro Díaz",
    items: "Baño y grooming mediano",
    status: "paid",
    total: "S/ 55.00",
  },
  {
    time: "09:15",
    client: "Luis Herrera",
    items: "Adelanto cirugía menor",
    status: "draft",
    total: "S/ 200.00",
  },
];

export const TODAY_LABEL = "Lunes 13 Jul 2026";
