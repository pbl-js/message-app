import React, { useState, useEffect, useCallback } from "react";

import { GiftedChat } from "react-native-gifted-chat";
import { useSendMessage } from "../apollo/mutations/sendMessage";
import transformMessages from "../helpers/transformMessages";

const Chat = ({ roomData, subscribeToNewMessages }) => {
  const { id, messages, user } = roomData;
  const transformedMessages = transformMessages(messages);

  const [text, setText] = useState("");
  const [sendMessage] = useSendMessage(text, id);

  useEffect(() => {
    subscribeToNewMessages();
  }, []);

  const onSend = useCallback(() => {
    sendMessage();
  }, []);

  return (
    <GiftedChat
      messages={transformedMessages}
      text={text}
      onInputTextChanged={(text) => setText(text)}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: user.id,
      }}
    />
  );
};

export default Chat;
