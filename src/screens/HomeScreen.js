import React from "react";
import styled from "styled-components/native";
import { useQuery, gql } from "@apollo/client";
import { Text, Button } from "react-native";

const MainWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const USERS_ROOMS = gql`
  query GetUserRooms {
    usersRooms {
      rooms {
        id
        name
      }
    }
  }
`;

const HomeScreen = ({ navigation }) => {
  const { loading, error, data } = useQuery(USERS_ROOMS);

  console.log(data);
  return (
    <MainWrapper>
      <Text>Home</Text>
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
