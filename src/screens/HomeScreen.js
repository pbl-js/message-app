import React from "react";
import styled from "styled-components/native";

import { Text, Button } from "react-native";
import RoomsList from "../components/RoomsList";

const MainWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
`;

const HomeScreen = ({ navigation }) => {
  return (
    <MainWrapper>
      <RoomsList />
    </MainWrapper>
  );
};

export default HomeScreen;
