import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';

import { RootStackParamList, IRootState } from '@/types';
import { staticColors } from '@/styles';
import { IconWithBadge } from '@/components';
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
  const todayTodos = useSelector((state: IRootState) => state.todo.today);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Todo':
              iconName = focused
                ? 'format-list-bulleted'
                : 'format-list-checkbox';
              break;

            case 'Profile':
              iconName = focused ? 'account-circle' : 'account-circle-outline';
              break;
          }

          return (
            <IconWithBadge
              name={iconName}
              size={size}
              color={color}
              badgeCount={todayTodos.length}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: staticColors.primary,
      }}>
      <Tab.Screen
        name="Todo"
        options={{ tabBarLabel: 'Todo' }}
        component={TodoTabScreen}
      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: 'Profile',
        }}
        component={ProfileTabScreen}
      />
    </Tab.Navigator>
  );
}
