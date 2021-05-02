import gql from "graphql-tag";

export const mutationDeleteUser = gql`
  mutation deleteUser($userId: String!) {
    deleteUser(userId: $userId)
  }
`;
