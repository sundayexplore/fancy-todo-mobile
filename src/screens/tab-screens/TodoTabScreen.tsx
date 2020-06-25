import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import TodoTodayDrawerScreen from '@/screens/drawer-screens/TodoTodayDrawerScreen';

const Drawer = createDrawerNavigator();

export interface TodoTabScreenProps {}

export default function TodoTabScreen({}: TodoTabScreenProps) {
  return (
    <Drawer.Navigator initialRouteName="Today">
      <Drawer.Screen name="Today" component={TodoTodayDrawerScreen} />
    </Drawer.Navigator>
  );
}
