import gql from "graphql-tag";

export const mutationUpdateUser = gql`
  mutation updateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
      id
      name
      dob
      address
      description
      createdAt
      updatedAt
    }
  }
`;
