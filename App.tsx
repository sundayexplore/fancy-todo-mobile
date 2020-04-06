import React from "react";
import { StyleSheet } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { State } from "./src/reducers";
import { SignInScreen, SignUpScreen, TodoListScreen } from "./src/screens";

import store from "./src/stores";

const Stack = createStackNavigator();

export default function App() {
  const isSignedIn = useSelector(
    (state: State) => state.userReducer.isSignedIn
  );
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {isSignedIn === false ? (
              <>
                <Stack.Screen
                  name="SignIn"
                  component={SignInScreen}
                  options={{
                    title: "Sign In",
                    animationTypeForReplace: "pop"
                  }}
                />
                <Stack.Screen
                  name="SignUp"
                  component={SignUpScreen}
                  options={{
                    title: "Sign Up",
                    animationTypeForReplace: "pop"
                  }}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="TodoList"
                  component={TodoListScreen}
                  options={{ headerTitle: "Todo List" }}
                />
              </>
            )}
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
