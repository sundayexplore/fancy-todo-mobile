import { StyleSheet } from 'react-native';
import { DefaultTheme, Theme } from 'react-native-paper';

export const globalStyles =  StyleSheet.create({
  centerOnly: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
  defaultContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  }
});

export const paperTheme: Theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2089dc'
  }
};
