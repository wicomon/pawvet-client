// Shared copy/data for the WicoVet landing page. Centralized here so no
// component redefines the same string/number twice (brand name, prices,
// WhatsApp number, module copy).

export const BRAND = "PawControl";
export const BRAND_DOMAIN = "wicovet.pe";
export const SALES_EMAIL = `hola@${BRAND_DOMAIN}`;

export const TRIAL_DAYS = 14;
export const PRICE_PERIOD = "mes";
export const PRICE_STARTER = "S/ 185";
export const PRICE_PRO = "S/ 299";

export const WHATSAPP_NUMBER = "51999999999";
export const whatsappUrl = (message?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

export type ModuleContent = {
  label: string;
  tag: string;
  title: string;
  desc: string;
  points: string[];
  placeholder: string;
};

export const MODULES: ModuleContent[] = [
  {
    label: "Expediente Clínico",
    tag: "Expediente Clínico Inteligente",
    title: "Toda la historia del paciente, en 3 clics",
    desc: "Evoluciones, tratamientos, vacunas aplicadas y control gráfico de peso en kg. Nunca más un historial perdido o ilegible.",
    points: [
      "Evoluciones y tratamientos con fecha exacta",
      "Curva de peso y alertas de sobrepeso",
      "Carnet de vacunas digital",
    ],
    placeholder: "captura: ficha clínica con curva de peso",
  },
  {
    label: "Agenda y Citas",
    tag: "Agenda y Citas",
    title: "Turnos llenos para consulta y grooming",
    desc: "Agenda por médico y por servicio: consulta, cirugía y peluquería. Los recordatorios automáticos por WhatsApp llegan al final del roadmap.",
    points: [
      "Vista por día, semana y profesional",
      "Turnos separados para grooming",
      "Recordatorios por WhatsApp — próximamente",
    ],
    placeholder: "captura: agenda semanal con turnos",
  },
  {
    label: "Punto de Venta",
    tag: "Punto de Venta (POS)",
    title: "Vende, controla stock y factura sin errores",
    desc: "Cobra consultas y productos en la misma pantalla. El stock se descuenta solo y tus comprobantes quedan listos para SUNAT.",
    points: [
      "Control de inventario en tiempo real",
      "Alertas de stock mínimo",
      "Facturación electrónica SUNAT (Plan Pro)",
    ],
    placeholder: "captura: pantalla de caja / POS",
  },
];

export const TRUSTED_CLINICS = [
  "San Borja Vet",
  "PetCare Miraflores",
  "Huellitas Arequipa",
  "VetNorte Trujillo",
  "Animalia Surco",
];
