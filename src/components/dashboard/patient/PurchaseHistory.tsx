import { OWNER_PURCHASES } from "./content";

export default function PurchaseHistory() {
  return (
    <section className="flex flex-col gap-3.5 rounded-2xl border border-wv-border bg-card px-6 py-[22px]">
      <h2 className="font-heading text-[17px] font-bold text-wv-navy">Compras del dueño</h2>
      <div className="flex flex-col gap-1.5">
        {OWNER_PURCHASES.map((purchase) => (
          <div
            key={purchase.date}
            className="flex flex-wrap items-center gap-3.5 rounded-[10px] border border-wv-row-border px-3.5 py-[13px]"
          >
            <span className="w-[110px] shrink-0 font-heading text-[13.5px] font-bold text-wv-navy">
              {purchase.date}
            </span>
            <span className="min-w-40 flex-1 text-[13.5px] font-semibold text-wv-muted-2">
              {purchase.items}
            </span>
            <span className="font-heading text-sm font-bold text-wv-navy">{purchase.total}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
