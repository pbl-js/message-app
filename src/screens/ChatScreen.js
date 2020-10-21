import React, { useState, useCallback } from "react";
import { useQuery, gql } from "@apollo/client";
import { GiftedChat } from "react-native-gifted-chat";

export const ROOM = gql`
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

const ChatScreen = ({ route }) => {
  const { id, name } = route.params;

  const { data, loading, error } = useQuery(ROOM, {
    variables: { id },
  });

  const messages =
    data &&
    data.room.messages.map((message) => {
      return {
        _id: message.id,
        text: message.body,
        createdAt: message.insertedAt,
        user: {
          _id: message.user.id,
          name: `${message.user.firstName} ${message.user.lastName}`,
          avatar: "https://placeimg.com/140/140/any",
        },
      };
    });

  // Sending message
  const [message, setMessage] = useState({});

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={
        data && {
          _id: data.room.user.id,
        }
      }
    />
  );
};

export default ChatScreen;
