// Shape returned by vdemia-server's `ContextUser` GraphQL type (src/common/entities/ContextUser.ts).
// Keep this in sync with the SDL in vdemia-server/src/schema.gql.

export interface OrganizationSummary {
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
  organization: OrganizationSummary;
  role: RoleSummary;
  menus: MenuSummary[];
}
