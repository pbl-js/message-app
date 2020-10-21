import { gql } from "@apollo/client";

const MESSAGES_SUBSCRIPTION = gql`
  subscription onMessageAdd($roomId: ID!) {
    messageAdded(roomId: $roomId) {
      id
      body
      insertedAt
      user {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

export default MESSAGES_SUBSCRIPTION;
