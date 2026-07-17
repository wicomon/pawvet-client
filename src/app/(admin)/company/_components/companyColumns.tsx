import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import type { Company } from "@/types/company";

type BuildCompanyColumnsArgs = {
  onEdit: (company: Company) => void;
  onDelete: (company: Company) => void;
};

export function buildCompanyColumns({
  onEdit,
  onDelete,
}: BuildCompanyColumnsArgs): ColumnDef<Company>[] {
  return [
    {
      id: "name",
      header: "Nombre",
      cell: ({ row }) => (
        <span className="truncate text-sm font-extrabold text-wv-navy">{row.original.name}</span>
      ),
    },
    {
      id: "slug",
      header: "Slug",
      cell: ({ row }) => (
        <span className="truncate text-[13px] font-semibold text-wv-muted-2">
          {row.original.slug ?? "—"}
        </span>
      ),
    },
    {
      id: "ruc",
      header: "RUC",
      cell: ({ row }) => (
        <span className="truncate text-[13px] font-semibold text-wv-muted-2">
          {row.original.ruc ?? "—"}
        </span>
      ),
    },
    {
      id: "contact",
      header: "Contacto",
      cell: ({ row }) => {
        const company = row.original;
        return (
          <span className="text-[13px] font-bold text-wv-muted-2">
            {company.email ?? "—"}
            <span className="block text-[11.5px] font-semibold text-wv-faint">
              {company.phone ?? "—"}
            </span>
          </span>
        );
      },
    },
    {
      id: "isActive",
      header: "Estado",
      cell: ({ row }) => {
        const isActive = row.original.isActive !== false;
        return (
          <span
            className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-extrabold ${
              isActive ? "bg-wv-mint-soft text-wv-teal-deep" : "bg-danger-bg text-danger"
            }`}
          >
            {isActive ? "Activa" : "Inactiva"}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: () => <span className="block text-right">Acciones</span>,
      cell: ({ row }) => {
        const company = row.original;
        return (
          <div className="flex items-center justify-end gap-1.5">
            <button
              type="button"
              onClick={() => onEdit(company)}
              aria-label={`Editar ${company.name}`}
              className="grid h-9 w-9 cursor-pointer place-items-center rounded-[10px] text-wv-muted outline-none transition-colors duration-150 ease-out hover:bg-wv-mint-soft hover:text-wv-teal-deep focus-visible:shadow-focus"
            >
              <Pencil aria-hidden="true" className="h-4.5 w-4.5" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => onDelete(company)}
              aria-label={`Eliminar ${company.name}`}
              className="grid h-9 w-9 cursor-pointer place-items-center rounded-[10px] text-wv-muted outline-none transition-colors duration-150 ease-out hover:bg-danger-bg hover:text-danger focus-visible:shadow-focus"
            >
              <Trash2 aria-hidden="true" className="h-4.5 w-4.5" strokeWidth={2} />
            </button>
          </div>
        );
      },
    },
  ];
}
