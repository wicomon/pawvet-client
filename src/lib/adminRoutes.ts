// Prefijos de URL del panel admin (src/app/(admin)/) protegidos por el
// chequeo optimista del proxy (src/proxy.ts). El sidebar ahora renderiza
// `user.menus` (authUserInfo, vía src/components/dashboard/Sidebar.tsx) en
// vez de un array estático — mantener esta lista en sync con los `path` que
// sirva el backend, incluso si la página del cliente aún no existe.
export const ADMIN_ROUTE_PREFIXES = [
  "/dashboard",
  "/schedule",
  "/patients",
  "/menus",
  "/roles",
  "/clientes",
  "/caja",
  "/inventario",
  "/recordatorios",
  "/reportes",
  "/configuracion",
];
