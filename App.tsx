import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';

import store from '@/stores';
import { MainScreen } from '@/screens';
import { paperTheme } from '@/styles';

export interface IAppProps {}

export default function App(props: IAppProps) {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <PaperProvider theme={paperTheme}>
          <MainScreen />
        </PaperProvider>
      </NavigationContainer>
    </ReduxProvider>
  );
}
