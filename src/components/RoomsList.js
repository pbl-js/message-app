import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS_ROOMS } from "../apollo/queries/getUsersRooms";

import { FlatList, Text } from "react-native";
import RoomItem from "./RoomItem";

const RoomsList = () => {
  const { loading, error, data } = useQuery(GET_USERS_ROOMS);

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
