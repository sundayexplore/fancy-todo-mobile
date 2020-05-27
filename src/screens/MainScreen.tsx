import React from "react";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";

import { State } from "@/reducers";
import { SignInScreen, SignUpScreen, TodoListScreen } from "@/screens";

const Stack = createStackNavigator();

export default () => {
  const isSignedIn = useSelector(
    (state: State) => state.userReducer.isSignedIn
  );

  return (
    <Stack.Navigator >
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
  );
};
