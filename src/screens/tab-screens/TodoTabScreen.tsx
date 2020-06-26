import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FAB } from 'react-native-paper';
import BottomSheet from 'react-native-raw-bottom-sheet';

import { staticColors } from '@/styles';
import { TodoForm } from '@/components';
import TodoTodayDrawerScreen from '@/screens/drawer-screens/TodoTodayDrawerScreen';

const Drawer = createDrawerNavigator();

export interface TodoTabScreenProps {}

export default function TodoTabScreen({}: TodoTabScreenProps) {
  const todoFormRef = useRef<BottomSheet>(null);

  return (
    <>
      <Drawer.Navigator initialRouteName={'Today'}>
        <Drawer.Screen name={'Today'} component={TodoTodayDrawerScreen} />
      </Drawer.Navigator>
      <FAB
        accessibilityStates
        icon={'plus'}
        style={styles.addTodoFAB}
        onPress={() => todoFormRef.current?.open()}
        color={staticColors.white}
      />
      <TodoForm mode={'add'} bottomSheetRef={todoFormRef} />
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
