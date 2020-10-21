import React from "react";
import { useQuery, gql } from "@apollo/client";
import { FlatList, Text } from "react-native";
import RoomItem from "./RoomItem";

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

const RoomsList = () => {
  const { loading, error, data } = useQuery(USERS_ROOMS);

  if (loading) return <Text>{"Loading..."}</Text>;
  if (error) return <Text>{`Error! ${error.message}`}</Text>;

  return (
    <FlatList
      data={data.usersRooms.rooms}
      renderItem={({ item }) => <RoomItem roomData={item} key={item.id} />}
    />
  );
};

export default RoomsList;
