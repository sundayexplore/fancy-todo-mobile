import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as ReduxProvider } from 'react-redux';

import store from '@/stores';
import { MainScreen } from '@/screens';

export interface IAppProps {}

export default function App(props: IAppProps) {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
          <MainScreen />
      </NavigationContainer>
    </ReduxProvider>
  );
};
