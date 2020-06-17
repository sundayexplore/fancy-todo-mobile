import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { RootStackParamList } from '@/types';
import { TodoList } from '@/components';

const Tab = createBottomTabNavigator();

export type IHomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

export type IHomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

export interface IHomeScreenProps {
  navigation: IHomeScreenNavigationProp;
  route: IHomeScreenRouteProp;
}

export default function HomeScreen({ navigation, route }: IHomeScreenProps) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="TodoList"
        options={{ tabBarLabel: 'TodoList' }}
        component={TodoList}
      />
    </Tab.Navigator>
  );
}
