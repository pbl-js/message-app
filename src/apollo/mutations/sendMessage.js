import { useMutation, gql } from "@apollo/client";

export const SEND_MESSAGE = gql`
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

export const useSendMessage = (text, roomId) => {
  const [sendMessage, { data }] = useMutation(SEND_MESSAGE, {
    variables: { body: text, roomId },
    update(cache, { data: { sendMessage } }) {
      cache.modify({
        id: cache.identify(roomId),
        fields: {
          messages(existingMessages) {
            const newMessage = cache.writeFragment({
              data: sendMessage,
              fragment: gql`
                fragment Message on RoomType {
                  id
                  body
                  insertedAt
                  user {
                    id
                    firstName
                    lastName
                  }
                }
              `,
            });

            return [newMessage, ...existingMessages];
          },
        },
      });
    },
  });

  return [sendMessage, data];
};
