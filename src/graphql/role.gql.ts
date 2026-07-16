import { gql } from '@apollo/client';

// pawvet-server: src/role/role.resolver.ts / src/schema.gql. All operations
// require the ROOT role (@CurrentUser([ValidRoles.ROOT])).
// roleFindAllWithMenu is a custom query (not in the original CRUD set) that
// returns each role together with its currently-assigned root menus
// (`menus { id name }`), via the RoleMenu join table — used both to render
// the roles table and to preload AssignMenusModal's checkboxes, so the
// client never needs a separate "menus for this role" round trip.

export const ROLE_FIND_ALL_WITH_MENU = gql`
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

export const ROLE_CREATE = gql`
  mutation RoleCreate($createRoleInput: CreateRoleInput!) {
    roleCreate(createRoleInput: $createRoleInput)
  }
`;

export const ROLE_UPDATE = gql`
  mutation RoleUpdate($updateRoleInput: UpdateRoleInput!) {
    roleUpdate(updateRoleInput: $updateRoleInput)
  }
`;

export const ROLE_REMOVE = gql`
  mutation RoleRemove($id: String!) {
    roleRemove(id: $id)
  }
`;

export const ROLE_ASSIGN_MENUS = gql`
  mutation RoleAssignMenus($assignMenuInput: AssignMenuInput!) {
    roleAssignMenus(assignMenuInput: $assignMenuInput)
  }
`;
