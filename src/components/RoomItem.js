import React from "react";
import styled from "styled-components";
import { Text, View } from "react-native";

const MainWrapper = styled.View`
  padding: 30px;
  background-color: white;
  border-radius: 20px;
  margin-bottom: 20px;
`;

const RoomItem = ({ roomData }) => {
  return (
    <MainWrapper>
      <Text>{roomData.name}</Text>
    </MainWrapper>
  );
};

export default RoomItem;
