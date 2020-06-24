import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

import { IRootState, IUser } from '@/types';
import { signIn } from '@/actions/user-actions';
import SignInScreen from './auth-screens/SignInScreen';
import SignUpScreen from './auth-screens/SignUpScreen';
import HomeScreen from './HomeScreen';

const Stack = createStackNavigator();

export interface MainScreenProps {}

export default function MainScreen({}: MainScreenProps) {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: IRootState) => state.user.currentUser,
  );

  const _getCurrentUser = useCallback(async () => {
    const currentUserFromAsyncStorage: IUser | any = await AsyncStorage.getItem(
      'currentUser',
    );
    if (currentUserFromAsyncStorage) {
      dispatch(signIn(JSON.parse(currentUserFromAsyncStorage)));
    }
  }, [dispatch]);

  useEffect(() => {
    _getCurrentUser();
  }, [_getCurrentUser]);

  return (
    <Stack.Navigator>
      {Object.values(currentUser).length ? (
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <>
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{
              title: 'Sign In',
              animationTypeForReplace: 'pop',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              title: 'Sign Up',
              animationTypeForReplace: 'pop',
              headerShown: false,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
