import { gql } from "@apollo/client";

const ROOM = gql`
  query GetRoom($id: ID!) {
    room(id: $id) {
      id
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

export default ROOM;
