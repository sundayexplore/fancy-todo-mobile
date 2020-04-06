import React from "react";
import { StyleSheet } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

import { SignInScreen, SignUpScreen } from './src/screens';

import store from "./src/stores";

const Stack = createStackNavigator();

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SignIn">
            <Stack.Screen 
              name="SignIn"
              component={SignInScreen}
              options={{headerTitle: "Sign In"}}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{headerTitle: "Sign Up"}}
            />
          </Stack.Navigator> 
        </NavigationContainer>
      </PaperProvider>
    </ReduxProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
