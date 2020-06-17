import React from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

import { IRootState } from '@/types';
import { SignInScreen, SignUpScreen, MainUserScreen } from '@/screens';

const Stack = createStackNavigator();

export default () => {
  const signedIn = useSelector((state: IRootState) => state.user.signedIn);

  return (
    <Stack.Navigator>
      {signedIn ? (
        <Stack.Screen
          name="Home"
          component={MainUserScreen}
        />
      ) : (
        <>
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{
              title: 'Sign In',
              animationTypeForReplace: 'pop',
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              title: 'Sign Up',
              animationTypeForReplace: 'pop',
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
