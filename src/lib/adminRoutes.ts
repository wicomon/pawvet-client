// Prefijos de URL del panel admin (src/app/(admin)/) protegidos por el
// chequeo optimista del proxy (src/proxy.ts). Mantener en sync con las rutas
// enabled/disabled de NAV_ITEMS en src/components/dashboard/content.ts —
// cada entrada del nav debe tener su prefijo protegido aquí, incluso si la
// página aún no existe.
export const ADMIN_ROUTE_PREFIXES = [
  "/dashboard",
  "/schedule",
  "/patients",
  "/clientes",
  "/caja",
  "/inventario",
  "/recordatorios",
  "/reportes",
  "/configuracion",
];
