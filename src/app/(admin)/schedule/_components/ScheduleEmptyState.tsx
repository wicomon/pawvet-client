export default function ScheduleEmptyState() {
  return (
    <section className="flex flex-col items-center gap-2 rounded-2xl border border-wv-border bg-card px-6 py-12">
      <span className="font-heading text-[17px] font-bold text-wv-navy">Sin citas este día</span>
      <span className="text-[13.5px] font-semibold text-wv-muted-2">
        La clínica está cerrada los domingos.
      </span>
    </section>
  );
}
