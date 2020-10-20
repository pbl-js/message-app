import React from "react";
import styled from "styled-components/native";
import { Text } from "react-native";

const MainWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ChatScreen = ({ route }) => {
  return (
    <MainWrapper>
      <Text>ChatScreen</Text>
      <Text>{route.params.roomId}</Text>
    </MainWrapper>
  );
};

export default ChatScreen;
