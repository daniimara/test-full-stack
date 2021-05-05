import gql from "graphql-tag";

export const queryGetUserByName = gql`
  query getUserByName($userName: String!) {
    getUserByName(userName: $userName) {
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
