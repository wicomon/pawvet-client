import { gql, type TypedDocumentNode } from '@apollo/client';
import type { AssignMenuInput, CreateRoleInput, Role, UpdateRoleInput } from '@/types/role';

// pawvet-server: src/role/role.resolver.ts / src/schema.gql. All operations
// require the ROOT role (@CurrentUser([ValidRoles.ROOT])).
// roleFindAllWithMenu is a custom query (not in the original CRUD set) that
// returns each role together with its currently-assigned root menus
// (`menus { id name }`), via the RoleMenu join table — used both to render
// the roles table and to preload AssignMenusModal's checkboxes, so the
// client never needs a separate "menus for this role" round trip.

// Documents are typed as TypedDocumentNode so useQuery/useMutation can infer
// their result/variables instead of taking manual generics (Apollo Client 4
// deprecated the manual-generics overload — see useQuery.d.ts).
export const ROLE_FIND_ALL_WITH_MENU: TypedDocumentNode<
  { roleFindAllWithMenu: Role[] },
  Record<string, never>
> = gql`
  query RoleFindAllWithMenu {
    roleFindAllWithMenu {
      id
      name
      slug
      description
      canRead
      canCreate
      canUpdate
      canDelete
      isActive
      createdAt
      updatedAt
      createdBy
      updatedBy
      menus {
        id
        name
      }
    }
  }
`;

export const ROLE_CREATE: TypedDocumentNode<
  { roleCreate: boolean },
  { createRoleInput: CreateRoleInput }
> = gql`
  mutation RoleCreate($createRoleInput: CreateRoleInput!) {
    roleCreate(createRoleInput: $createRoleInput)
  }
`;

export const ROLE_UPDATE: TypedDocumentNode<
  { roleUpdate: boolean },
  { updateRoleInput: UpdateRoleInput }
> = gql`
  mutation RoleUpdate($updateRoleInput: UpdateRoleInput!) {
    roleUpdate(updateRoleInput: $updateRoleInput)
  }
`;

export const ROLE_REMOVE: TypedDocumentNode<{ roleRemove: boolean }, { id: string }> = gql`
  mutation RoleRemove($id: String!) {
    roleRemove(id: $id)
  }
`;

export const ROLE_ASSIGN_MENUS: TypedDocumentNode<
  { roleAssignMenus: boolean },
  { assignMenuInput: AssignMenuInput }
> = gql`
  mutation RoleAssignMenus($assignMenuInput: AssignMenuInput!) {
    roleAssignMenus(assignMenuInput: $assignMenuInput)
  }
`;
