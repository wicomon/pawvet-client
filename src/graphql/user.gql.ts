import { gql, type TypedDocumentNode } from '@apollo/client';
import type { CreateUserInput, UpdateUserInput, User } from '@/types/user';

export const USER_FIND_ALL: TypedDocumentNode<
  { userFindAll: User[] },
  Record<string, never>
> = gql`
  query UserFindAll {
    userFindAll {
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
      }
    }
  }
`;

export const USER_CREATE: TypedDocumentNode<
  { userCreate: boolean },
  { createUserInput: CreateUserInput }
> = gql`
  mutation UserCreate($createUserInput: CreateUserInput!) {
    userCreate(createUserInput: $createUserInput)
  }
`;

export const USER_UPDATE: TypedDocumentNode<
  { userUpdate: boolean },
  { updateUserInput: UpdateUserInput }
> = gql`
  mutation UserUpdate($updateUserInput: UpdateUserInput!) {
    userUpdate(updateUserInput: $updateUserInput)
  }
`;

export const USER_REMOVE: TypedDocumentNode<{ userRemove: boolean }, { id: string }> = gql`
  mutation UserRemove($id: String!) {
    userRemove(id: $id)
  }
`;
