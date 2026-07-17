import { RECENT_SALES, saleStatusBadge } from "@/content/dashboard";

export default function RecentSales() {
  return (
    <section className="flex flex-col gap-3.5 rounded-2xl border border-wv-border bg-card px-6 py-5.5">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-[17px] font-bold text-wv-navy">Últimas ventas</h2>
        <a
          href="#"
          className="text-[13.5px] font-extrabold text-wv-teal outline-none transition-colors duration-150 ease-out hover:text-wv-teal-hover focus-visible:shadow-focus"
        >
          Ir a caja →
        </a>
      </div>

      <div className="overflow-x-auto">
        <div className="flex min-w-160 flex-col gap-1.5">
          <div className="grid grid-cols-[90px_1fr_1fr_auto_auto] gap-3 px-3.5 pb-1.5 text-[11.5px] font-extrabold tracking-wider text-wv-faint uppercase">
            <span>Hora</span>
            <span>Cliente</span>
            <span>Detalle</span>
            <span>Estado</span>
            <span className="text-right">Total</span>
          </div>

          {RECENT_SALES.map((sale) => {
            const badge = saleStatusBadge(sale.status);
            return (
              <div
                key={`${sale.time}-${sale.client}`}
                className="grid grid-cols-[90px_1fr_1fr_auto_auto] items-center gap-3 rounded-[10px] border border-wv-row-border px-3.5 py-3"
              >
                <span className="text-[13px] font-bold text-wv-muted-2">{sale.time}</span>
                <span className="text-[13.5px] font-extrabold text-wv-navy">{sale.client}</span>
                <span className="text-[13px] font-semibold text-wv-muted-2">{sale.items}</span>
                <span
                  className={`w-fit rounded-full px-2.5 py-1 text-[11.5px] font-extrabold ${badge.className}`}
                >
                  {badge.label}
                </span>
                <span className="font-heading text-sm font-bold text-wv-navy text-right">
                  {sale.total}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
