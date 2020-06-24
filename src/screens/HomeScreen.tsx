import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { RootStackParamList } from '@/types';
import TodoTabScreen from './tab-screens/TodoTabScreen';
import ProfileTabScreen from './tab-screens/ProfileTabScreen';

const Tab = createBottomTabNavigator();

export type IHomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

export type IHomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

export interface IHomeScreenProps {
  // navigation: IHomeScreenNavigationProp;
  // route: IHomeScreenRouteProp;
}

export default function HomeScreen({}: /*navigation, route*/ IHomeScreenProps) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="todo"
        options={{ tabBarLabel: 'Todo' }}
        component={TodoTabScreen}
      />
      <Tab.Screen
        name="profile"
        options={{
          tabBarLabel: 'Profile',
        }}
        component={ProfileTabScreen}
      />
    </Tab.Navigator>
  );
}
