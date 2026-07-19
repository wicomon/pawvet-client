import type { Company } from "@/types/company";

type CompanyInfoCardProps = {
  company: Company;
};

export default function CompanyInfoCard({ company }: CompanyInfoCardProps) {
  const fields: { label: string; value: string }[] = [
    { label: "Slug", value: company.slug ?? "—" },
    { label: "RUC", value: company.ruc ?? "—" },
    { label: "Correo", value: company.email ?? "—" },
    { label: "Teléfono", value: company.phone ?? "—" },
    { label: "Sitio web", value: company.website ?? "—" },
    { label: "Dirección", value: company.address ?? "—" },
  ];

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-wv-border bg-card px-6 py-5.5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-[19px] font-bold text-wv-navy">{company.name}</h1>
          <p className="text-[13px] font-semibold text-wv-muted">Datos de la empresa.</p>
        </div>
        <span
          className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-extrabold ${
            company.isActive !== false ? "bg-wv-mint-soft text-wv-teal-deep" : "bg-danger-bg text-danger"
          }`}
        >
          {company.isActive !== false ? "Activa" : "Inactiva"}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {fields.map((field) => (
          <div key={field.label} className="flex flex-col gap-1">
            <span className="text-[11.5px] font-extrabold tracking-wider text-wv-faint uppercase">
              {field.label}
            </span>
            <span className="text-[14px] font-bold text-wv-navy">{field.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
