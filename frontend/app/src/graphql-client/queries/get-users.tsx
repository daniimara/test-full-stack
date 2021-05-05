import gql from "graphql-tag";

export const queryListUsers = gql`
  query ListUsers($input: ListUsersInput!) {
    listUsers(input: $input) {
      exclusiveStartKey
      items {
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
  }
`;
