import React from "react";
import styled from "styled-components/native";
import { Text, Button } from "react-native";

const MainWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const HomeScreen = ({ navigation }) => {
  return (
    <MainWrapper>
      <Text>HomeScreen</Text>
      <Button
        title="Idź do Profile"
        onPress={() => {
          navigation.navigate("Profile", { name: "Jane" });
        }}
      />
    </MainWrapper>
  );
};

export default HomeScreen;
