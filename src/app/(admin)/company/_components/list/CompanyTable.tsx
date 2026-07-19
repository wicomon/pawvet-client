import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client/react";
import DataTable from "@/components/ui/DataTable";
import Alert from "@/components/ui/Alert";
import ConfirmDeleteDialog from "@/components/ui/ConfirmDeleteDialog";
import { COMPANY_FIND_ALL, COMPANY_REMOVE } from "@/graphql/company.gql";
import type { Company } from "@/types/company";
import type { Toast } from "@/types/ui.types";
import { buildCompanyColumns } from "./companyColumns";
import CompanyCreateForm from "./CompanyCreateForm";
import CompanyEditForm from "./CompanyEditForm";

type CompanyTableProps = {
  companies: Company[];
  loading?: boolean;
  error?: string | null;
};

export default function CompanyTable({ companies, loading, error }: CompanyTableProps) {
  const [formTarget, setFormTarget] = useState<Company | null | undefined>(undefined); // undefined = closed, null = create
  const [deleteTarget, setDeleteTarget] = useState<Company | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);
  const [removeCompany] = useMutation(COMPANY_REMOVE, {
    refetchQueries: [COMPANY_FIND_ALL],
  });

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  const onToastSuccess = (message: string) => setToast({ kind: "success", message });
  const onToastError = (message: string) => setToast({ kind: "error", message });

  return (
    <>
      <DataTable
        title="Empresas"
        description="Empresas registradas en la plataforma."
        createLabel="Nueva empresa"
        emptyLabel="Aún no hay información creada."
        onCreate={() => setFormTarget(null)}
        loading={loading}
        error={error}
        data={companies}
        columns={buildCompanyColumns({
          onEdit: setFormTarget,
          onDelete: setDeleteTarget,
        })}
        getRowId={(company) => company.id}
      >
        {toast && <Alert kind={toast.kind} message={toast.message} />}
      </DataTable>

      {formTarget === null && (
        <CompanyCreateForm
          onClose={() => setFormTarget(undefined)}
          onSaved={(message) => {
            setFormTarget(undefined);
            onToastSuccess(message);
          }}
          onError={onToastError}
        />
      )}

      {formTarget && (
        <CompanyEditForm
          company={formTarget}
          onClose={() => setFormTarget(undefined)}
          onSaved={(message) => {
            setFormTarget(undefined);
            onToastSuccess(message);
          }}
          onError={onToastError}
        />
      )}

      {deleteTarget && (
        <ConfirmDeleteDialog
          title="Eliminar empresa"
          titleId="company-delete-title"
          entityLabel="la empresa"
          entityName={deleteTarget.name}
          onConfirm={async () => {
            const { data } = await removeCompany({ variables: { id: deleteTarget.id } });
            if (!data?.companyRemove) throw new Error("El backend no confirmó la eliminación.");
            return `Empresa "${deleteTarget.name}" eliminada.`;
          }}
          onClose={() => setDeleteTarget(null)}
          onDeleted={(message) => {
            setDeleteTarget(null);
            onToastSuccess(message);
          }}
          onError={onToastError}
        />
      )}
    </>
  );
}
