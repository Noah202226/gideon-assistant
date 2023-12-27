import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";

const StackLayout = () => {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "tomato",
      secondary: "yellow",
    },
  };
  return (
    <PaperProvider theme={theme}>
      <StatusBar style="dark" />

      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, statusBarColor: "black" }}
        />
        <Stack.Screen
          name="tasks/[id]"
          options={{ headerTitle: "Task Item" }}
        />
      </Stack>
    </PaperProvider>
  );
};

export default StackLayout;
