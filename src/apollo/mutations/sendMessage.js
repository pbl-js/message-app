import { gql } from "@apollo/client";

const SEND_MESSAGE = gql`
  mutation SendMessage($body: String!, $roomId: ID!) {
    sendMessage(body: $body, roomId: $roomId) {
      body
      id
      insertedAt
      user {
        id
        email
        firstName
        lastName
      }
    }
  }
`;

export default SEND_MESSAGE;
