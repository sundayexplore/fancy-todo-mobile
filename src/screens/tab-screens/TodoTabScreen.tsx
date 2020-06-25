import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FAB } from 'react-native-paper';

import { staticColors } from '@/styles';
import TodoTodayDrawerScreen from '@/screens/drawer-screens/TodoTodayDrawerScreen';

const Drawer = createDrawerNavigator();

export interface TodoTabScreenProps {}

export default function TodoTabScreen({}: TodoTabScreenProps) {
  const [openTodoForm, setOpenTodoForm] = useState<boolean>(false);

  return (
    <>
      <Drawer.Navigator initialRouteName={'Today'}>
        <Drawer.Screen name={'Today'} component={TodoTodayDrawerScreen} />
      </Drawer.Navigator>
      <FAB
        accessibilityStates
        icon={'plus'}
        style={styles.addTodoFAB}
        onPress={() => setOpenTodoForm(true)}
        color={staticColors.white}
      />
    </>
  );
}

const styles = StyleSheet.create({
  addTodoFAB: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 16,
  },
});
