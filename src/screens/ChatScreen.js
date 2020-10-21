import React, { useState, useCallback } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { GiftedChat } from "react-native-gifted-chat";

import SEND_MESSAGE from "../apollo/mutations/sendMessage";
import GET_ROOM from "../apollo/queries/getRoom";
import transformMessages from "../helpers/transformMessages";

function ChatScreen({ route }) {
  const { id } = route.params;

  // Get room
  const { data } = useQuery(GET_ROOM, {
    variables: { id },
  });
  const messages = data && transformMessages(data.room.messages);

  // Send message
  const [text, setText] = useState("");

  const [sendMessage, { data: newMessageData }] = useMutation(SEND_MESSAGE, {
    variables: { body: text, roomId: id },
    update(cache, { data: { sendMessage } }) {
      cache.modify({
        id: cache.identify(data.room),
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

  const onSend = useCallback(() => {
    sendMessage();
  }, []);

  return (
    <GiftedChat
      messages={messages}
      text={text}
      onInputTextChanged={(text) => setText(text)}
      onSend={(messages) => onSend(messages)}
      user={
        data && {
          _id: data.room.user.id,
        }
      }
    />
  );
}

export default ChatScreen;
