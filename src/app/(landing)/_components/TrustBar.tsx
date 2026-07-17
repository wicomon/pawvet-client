import { TRUSTED_CLINICS } from "@/content/brand";

export default function TrustBar() {
  return (
    <section className="border-y border-wv-border bg-white">
      <div className="mx-auto flex max-w-290 flex-col items-center gap-4 px-6 py-7 sm:px-8">
        <span className="text-[13px] font-bold uppercase tracking-wider text-wv-faint">
          Diseñado para las mejores clínicas y pet shops del país
        </span>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-3 opacity-75">
          {TRUSTED_CLINICS.map((name) => (
            <span
              key={name}
              className="font-heading text-[17px] font-bold text-wv-muted-2"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
