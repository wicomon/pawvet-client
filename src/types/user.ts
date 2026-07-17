// Shape returned by vdemia-server's `ContextUser` GraphQL type (src/common/entities/ContextUser.ts).
// Keep this in sync with the SDL in vdemia-server/src/schema.gql.

export interface CompanySummary {
  id: string;
  name: string;
}

export interface RoleSummary {
  id: string;
  name: string;
  slug: string;
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
}

export interface MenuSummary {
  id: string;
  name: string;
  code: string;
  path: string;
  type: string;
  position: string;
  order: number;
  icon?: string | null;
  description?: string | null;
  subMenu?: MenuSummary[] | null;
}

export interface ContextUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  company: CompanySummary;
  role: RoleSummary;
  menus: MenuSummary[];
}

// Below: the admin `User` CRUD entity (pawvet-server's User entity +
// Create/UpdateUserInput DTOs, src/user/entities/user.entity.ts,
// src/user/dto/*.input.ts). Distinct from ContextUser above, which only
// carries what authUserInfo returns for the logged-in session. Reuses
// CompanySummary/RoleSummary for the nested relations. Never request/store
// `password` on the client outside a create/update mutation variable.
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive?: boolean | null;
  company: CompanySummary;
  role: RoleSummary;
  createdAt?: string | null;
  updatedAt?: string | null;
}

// CreateUserInput: all fields required by the backend.
export interface CreateUserInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  companyId: string;
  roleId: string;
}

export interface UpdateUserInput extends Partial<CreateUserInput> {
  id: string;
}
