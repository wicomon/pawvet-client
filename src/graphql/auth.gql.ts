import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation AuthLogin($loginInput: LoginInput!) {
    authLogin(loginInput: $loginInput) {
      token
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation AuthChangePassword($changePasswordInput: ChangePasswordInput!) {
    authChangePassword(changePasswordInput: $changePasswordInput)
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
      company {
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
