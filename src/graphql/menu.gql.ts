import { gql, type TypedDocumentNode } from '@apollo/client';
import type { CreateMenuInput, Menu, UpdateMenuInput } from '@/types/menu';

export const MENU_FIND_ALL: TypedDocumentNode<
  { menuFindAll: Menu[] },
  Record<string, never>
> = gql`
  query MenuFindAll {
    menuFindAll {
      id
      code
      name
      type
      position
      description
      path
      icon
      order
      parentId
      isActive
      createdAt
      updatedAt
      createdBy
      updatedBy
      subMenu {
        id
        code
        name
        type
        position
        description
        path
        icon
        order
        parentId
        isActive
        createdAt
        updatedAt
        createdBy
        updatedBy
        subMenu {
          id
          code
          name
          type
          position
          description
          path
          icon
          order
          parentId
          isActive
          createdAt
          updatedAt
          createdBy
          updatedBy
        }
      }
    }
  }
`;

export const MENU_FIND_BY_ID: TypedDocumentNode<
  { menuFindById: Menu },
  { menuFindByIdId: string }
> = gql`
  query MenuFindById($menuFindByIdId: String!) {
    menuFindById(id: $menuFindByIdId) {
      id
      code
      name
      type
      position
      description
      path
      icon
      order
      parentId
      isActive
      createdAt
      updatedAt
      createdBy
      updatedBy
      subMenu {
        id
        code
        name
        type
        position
        description
        path
        icon
        order
        parentId
        isActive
        createdAt
        updatedAt
        createdBy
        updatedBy
        subMenu {
          id
          code
          name
          type
          position
          description
          path
          icon
          order
          parentId
          isActive
          createdAt
          updatedAt
          createdBy
          updatedBy
        }
      }
    }
  }
`;

export const MENU_CREATE: TypedDocumentNode<
  { menuCreate: boolean },
  { createMenuInput: CreateMenuInput }
> = gql`
  mutation MenuCreate($createMenuInput: CreateMenuInput!) {
    menuCreate(createMenuInput: $createMenuInput)
  }
`;

export const MENU_UPDATE: TypedDocumentNode<
  { menuUpdate: boolean },
  { updateMenuInput: UpdateMenuInput }
> = gql`
  mutation MenuUpdate($updateMenuInput: UpdateMenuInput!) {
    menuUpdate(updateMenuInput: $updateMenuInput)
  }
`;

export const MENU_REMOVE: TypedDocumentNode<{ menuRemove: boolean }, { id: string }> = gql`
  mutation MenuRemove($id: String!) {
    menuRemove(id: $id)
  }
`;
