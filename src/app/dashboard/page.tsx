import { logout } from "@/app/actions/auth";
import { getUser } from "@/lib/dal";

export default async function DashboardPage() {
  const user = await getUser();

  return (
    <div className="min-h-screen bg-page flex items-center justify-center p-10">
      <div className="w-[520px] max-w-full rounded-card bg-card shadow-card border border-subtle p-10">
        <div className="flex items-center justify-between mb-7">
          <h1 className="font-display text-2xl font-bold text-ink m-0">
            Panel
          </h1>
          <form action={logout}>
            <button
              type="submit"
              className="text-[12.5px] font-bold text-brand cursor-pointer rounded outline-none focus-visible:shadow-focus"
            >
              Cerrar sesión
            </button>
          </form>
        </div>

        {!user && <p className="text-sm text-muted">Cargando tu información…</p>}

        {user && (
          <dl className="flex flex-col gap-4">
            <div>
              <dt className="text-[12.5px] font-bold text-label">Nombre</dt>
              <dd className="text-[14.5px] text-ink m-0">
                {user.firstName} {user.lastName}
              </dd>
            </div>
            <div>
              <dt className="text-[12.5px] font-bold text-label">Correo</dt>
              <dd className="text-[14.5px] text-ink m-0">{user.email}</dd>
            </div>
            <div>
              <dt className="text-[12.5px] font-bold text-label">
                Organización
              </dt>
              <dd className="text-[14.5px] text-ink m-0">
                {user.organization.name}
              </dd>
            </div>
            <div>
              <dt className="text-[12.5px] font-bold text-label">Rol</dt>
              <dd className="text-[14.5px] text-ink m-0">{user.role.name}</dd>
            </div>
          </dl>
        )}
      </div>
    </div>
  );
}
