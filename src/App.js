import "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ApolloProvider } from "@apollo/client";

import HomeScreen from "./screens/HomeScreen";
import ChatScreen from "./screens/ChatScreen";

import client from "./apollo/client";

const Stack = createStackNavigator();

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Chatly rooms" }}
          />

          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={{ title: "Chat room" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default registerRootComponent(App);
