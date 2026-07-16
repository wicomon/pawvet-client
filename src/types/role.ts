// Mirrors pawvet-server's Role entity + Create/UpdateRoleInput DTOs
// (src/role/entities/role.entity.ts, src/role/dto/*.input.ts).

export interface RoleMenuSummary {
  id: string;
  name: string;
}

export interface Role {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  canRead: boolean;
  canCreate: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  isActive: boolean;
  // Only populated by `roleFindAllWithMenu` — the root menus currently
  // assigned to this role, used to preload AssignMenusModal's checkboxes.
  menus?: RoleMenuSummary[];
}

// CreateRoleInput: name/slug required, description optional; the four
// permission flags are required booleans on the backend (no default in the
// DTO itself, even though Prisma defaults them to true).
export interface CreateRoleInput {
  name: string;
  slug: string;
  description?: string;
  canRead: boolean;
  canCreate: boolean;
  canUpdate: boolean;
  canDelete: boolean;
}

export interface UpdateRoleInput extends Partial<CreateRoleInput> {
  id: string;
}

// AssignMenuInput: roleAssignMenus replaces the role's full menu set with
// this list — it deletes existing RoleMenu rows and recreates them, so a
// "save" always sends the complete desired selection, not a diff. Only
// root-level menu ids (parentId: null) are accepted by the backend.
export interface AssignMenuInput {
  roleId: string;
  menuIds: string[];
}
