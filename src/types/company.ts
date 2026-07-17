// Mirrors pawvet-server's Company entity + Create/UpdateCompanyInput DTOs
// (src/company/entities/company.entity.ts, src/company/dto/*.input.ts).
// Broader than CompanySummary (src/types/user.ts), which only carries the
// `id`/`name` the sidebar needs from authUserInfo — this type also carries
// contact/legal fields and isActive for the /company admin table.

export interface Company {
  id: string;
  name: string;
  slug?: string | null;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  ruc?: string | null;
  website?: string | null;
  isActive?: boolean | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

// CreateCompanyInput: name/slug required; the rest optional.
export interface CreateCompanyInput {
  name: string;
  slug: string;
  address?: string;
  phone?: string;
  email?: string;
  ruc?: string;
  website?: string;
}

export interface UpdateCompanyInput extends Partial<CreateCompanyInput> {
  id: string;
}
