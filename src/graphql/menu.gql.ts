import { gql, type TypedDocumentNode } from '@apollo/client';
import type { CreateMenuInput, Menu, UpdateMenuInput } from '@/types/menu';

// pawvet-server: src/menu/menu.resolver.ts / src/schema.gql. All five
// operations require the ROOT role (@CurrentUser([ValidRoles.ROOT])).
// menuFindAll only returns top-level menus (service filters parentId: null);
// requesting `subMenu` below pulls their children in the same call, since
// the resolver builds its Prisma `select` from whatever fields the query
// asks for (@SelectFields() in menu.resolver.ts, recursive over the
// selection set) — no backend change needed for one level of nesting.

const MENU_FIELDS = gql`
  fragment MenuFields on Menu {
    id
    code
    name
    path
    type
    position
    description
    icon
    order
    parentId
    isActive
  }
`;

// Documents are typed as TypedDocumentNode so useQuery/useMutation can infer
// their result/variables instead of taking manual generics (Apollo Client 4
// deprecated the manual-generics overload — see useQuery.d.ts).
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
