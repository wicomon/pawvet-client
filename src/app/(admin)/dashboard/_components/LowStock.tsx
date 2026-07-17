import { LOW_STOCK } from "@/content/dashboard";

export default function LowStock() {
  return (
    <section className="flex flex-col gap-3.5 rounded-2xl border border-wv-border bg-card px-6 py-5.5">
      <h2 className="font-heading text-[17px] font-bold text-wv-navy">Stock bajo</h2>

      <div className="flex flex-col gap-2">
        {LOW_STOCK.map((item) => (
          <div
            key={item.sku}
            className="flex items-center justify-between gap-3 rounded-[10px] border border-wv-row-border px-3 py-2.5"
          >
            <div className="flex min-w-0 flex-col gap-px">
              <span className="truncate text-[13.5px] font-extrabold text-wv-navy">
                {item.name}
              </span>
              <span className="text-xs font-semibold text-wv-muted-2">SKU {item.sku}</span>
            </div>
            <span className="whitespace-nowrap rounded-full bg-wv-chaos-bg px-2.5 py-1 text-xs font-extrabold text-wv-chaos-ink">
              {item.stock}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
