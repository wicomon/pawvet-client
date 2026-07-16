import { gql } from "@apollo/client";

// vdemia-server: src/auth/auth.resolver.ts / src/schema.gql
export const LOGIN = gql`
  mutation AuthLogin($loginInput: LoginInput!) {
    authLogin(loginInput: $loginInput) {
      token
    }
  }
`;

export const AUTH_USER_INFO = gql`
  query AuthUserInfo {
    authUserInfo {
      id
      email
      firstName
      lastName
      isActive
      organization {
        id
        name
      }
      role {
        id
        name
        slug
        canCreate
        canRead
        canUpdate
        canDelete
      }
      menus {
        id
        name
        code
        path
        type
        position
        order
        icon
        description
        subMenu {
          id
          name
          code
          path
          type
          position
          order
          icon
          description
        }
      }
    }
  }
`;
