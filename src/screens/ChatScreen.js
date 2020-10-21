import React from "react";
import { useQuery } from "@apollo/client";

import { GET_ROOM } from "../apollo/queries/getRoom";
import MESSAGES_SUBSCRIPTION from "../apollo/subscriptions/messagesSubscriptions";

import { Text } from "react-native";
import Chat from "../components/Chat";

function ChatScreen({ route }) {
  const { id } = route.params;

  const { subscribeToMore, data, loading, error } = useQuery(GET_ROOM, {
    variables: { id },
  });

  const roomData = data && data.room;

  if (loading) return <Text>{"Loading..."}</Text>;
  if (error) return <Text>{`Error! ${error.message}`}</Text>;

  return (
    <Chat
      roomData={roomData}
      subscribeToNewMessages={() => {
        subscribeToMore({
          document: MESSAGES_SUBSCRIPTION,
          variables: { roomId: id },
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;

            const newMessageItem = subscriptionData.data.messageAdded;

            return Object.assign({}, prev, {
              room: {
                messages: [newMessageItem, ...prev.room.messages],
              },
            });
          },
        });
      }}
    />
  );
}

export default ChatScreen;
