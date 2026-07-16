import { gql } from '@apollo/client';

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

export const MENU_FIND_ALL = gql`
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

export const MENU_FIND_BY_ID = gql`
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

export const MENU_CREATE = gql`
  mutation MenuCreate($createMenuInput: CreateMenuInput!) {
    menuCreate(createMenuInput: $createMenuInput)
  }
`;

export const MENU_UPDATE = gql`
  mutation MenuUpdate($updateMenuInput: UpdateMenuInput!) {
    menuUpdate(updateMenuInput: $updateMenuInput)
  }
`;

export const MENU_REMOVE = gql`
  mutation MenuRemove($id: String!) {
    menuRemove(id: $id)
  }
`;
