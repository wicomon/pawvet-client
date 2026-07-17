import Link from "next/link";
import { getUser } from "@/lib/dal";
import UsersManager from "./_components/UsersManager";

export default async function UsersPage() {
  const user = await getUser();
  const isRoot = user?.role.slug === "root";

  if (!isRoot) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-2xl border border-wv-border bg-card px-6 py-14 text-center">
        <p className="font-heading text-base font-bold text-wv-navy">Sin acceso</p>
        <p className="text-[13.5px] font-semibold text-wv-muted">
          Esta sección solo está disponible para el rol ROOT.
        </p>
        <Link
          href="/dashboard"
          className="mt-1 font-extrabold text-wv-teal outline-none transition-colors duration-150 ease-out hover:text-wv-teal-hover focus-visible:shadow-focus"
        >
          ← Volver al panel
        </Link>
      </div>
    );
  }

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
        <span className="text-wv-navy">Usuarios</span>
      </div>

      <UsersManager />
    </>
  );
}
