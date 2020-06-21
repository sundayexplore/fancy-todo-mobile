import React from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

import { IRootState } from '@/types';
import SignInScreen from './auth-screens/SignInScreen';
import SignUpScreen from './auth-screens/SignUpScreen';
import HomeScreen from './HomeScreen';

const Stack = createStackNavigator();

export default () => {
  const signedIn = useSelector((state: IRootState) => state.user.signedIn);

  return (
    <Stack.Navigator>
      {signedIn ? (
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
      ) : (
        <>
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{
              title: 'Sign In',
              animationTypeForReplace: 'pop',
              headerShown: false
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              title: 'Sign Up',
              animationTypeForReplace: 'pop',
              headerShown: false
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
