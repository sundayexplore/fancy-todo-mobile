import React from "react";
import { StyleSheet } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import store from "@/stores";

import { MainScreen } from "@/screens";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <MainScreen />
        </NavigationContainer>
      </PaperProvider>
    </ReduxProvider>
  )
}
