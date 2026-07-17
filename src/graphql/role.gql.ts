import { gql, type TypedDocumentNode } from '@apollo/client';
import type { AssignMenuInput, CreateRoleInput, Role, UpdateRoleInput } from '@/types/role';

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
