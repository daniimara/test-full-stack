import gql from "graphql-tag";

export const mutationCreateUser = gql`
  mutation createUser($user: UserInput!) {
    createUser(user: $user) {
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
