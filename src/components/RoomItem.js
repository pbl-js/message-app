import React from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";

const MainWrapper = styled.TouchableOpacity`
  padding: 30px;
  background-color: white;
  border-radius: 20px;
  margin-bottom: 20px;
`;

const RoomItem = ({ roomData }) => {
  const navigation = useNavigation();

  return (
    <MainWrapper onPress={() => navigation.navigate("Chat", roomData)}>
      <Text>{roomData.name}</Text>
    </MainWrapper>
  );
};

export default RoomItem;
