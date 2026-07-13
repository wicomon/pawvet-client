// Copy for the (auth) split-screen page. Ported from the "VetFlow Auth"
// design template (claude.ai/design project 7f39ab85-bce9-4495-96ad-bb4b28196c8c).
// Mode ("login" | "register") is URL state (?mode=), not component state — see
// src/app/(auth)/login/page.tsx.

export type AuthMode = "login" | "register";

export const AUTH_IMAGE = {
  src: "/auth/clinic.jpg",
  alt: "Perros felices corriendo al aire libre",
};

export const BRAND_PANEL = {
  headline: "Tu clínica ordenada. Tus pacientes que sí regresan.",
  subhead:
    "Expedientes, citas, ventas e inventario de tu veterinaria y pet shop, todo en un solo lugar.",
  badges: [
    { label: "+120 clínicas en el Perú", tone: "mint" as const },
    { label: "14 días gratis", tone: "neutral" as const },
  ],
};

const COPY: Record<
  AuthMode,
  {
    headline: string;
    subhead: string;
    footerPrompt: string;
    footerAction: string;
  }
> = {
  login: {
    headline: "Bienvenida de nuevo",
    subhead: "Ingresa para ver la agenda de hoy.",
    footerPrompt: "¿Aún no tienes cuenta?",
    footerAction: "Crea una gratis",
  },
  register: {
    headline: "Empieza tus 14 días gratis",
    subhead: "Sin tarjeta de crédito. Configura tu clínica en minutos.",
    footerPrompt: "¿Ya tienes una cuenta?",
    footerAction: "Inicia sesión",
  },
};

export function authCopy(mode: AuthMode) {
  return COPY[mode];
}
