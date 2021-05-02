import gql from "graphql-tag";

export const queryGetUserById = gql`
  query getUserById($userId: String!) {
    getUserById(userId: $userId) {
      id
      name
      dob
      address
      description
      imageUrl
      createdAt
      updatedAt
    }
  }
`;
