import { StyleSheet } from 'react-native';
import { DefaultTheme, Theme } from 'react-native-paper';

export const globalStyles = StyleSheet.create({
  centerOnly: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  defaultContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  noTodosView: {
    flex: 1,
  },
});

export const paperTheme: Theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2089dc',
    accent: '#f1c40f',
  },
};

export const staticColors = {
  primary: '#2089dc',
  white: '#fff',
  accent: '#f1c40f',
};
