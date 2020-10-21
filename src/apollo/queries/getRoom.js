import { gql } from "@apollo/client";

export const GET_ROOM = gql`
  query GetRoom($id: ID!) {
    room(id: $id) {
      id
      name
      messages {
        id
        body
        insertedAt
        user {
          id
          firstName
          lastName
        }
      }
      user {
        firstName
        lastName
        id
      }
    }
  }
`;
