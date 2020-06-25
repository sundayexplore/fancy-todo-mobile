import React from 'react';
import { View } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import LottieView from 'lottie-react-native';

import { globalStyles } from '@/styles';
import { TodoList, TodoTabHeader } from '@/components';
import { TodoDrawerParamList, IRootState } from '@/types';

export type TodoTodayDrawerScreenNavigationProp = DrawerNavigationProp<
  TodoDrawerParamList,
  'Today'
>;

export interface TodoTodayDrawerScreenProps {
  navigation: TodoTodayDrawerScreenNavigationProp;
}

export default function TodoTodayDrawerScreen({
  navigation,
}: TodoTodayDrawerScreenProps) {
  const todayTodos = useSelector((state: IRootState) => state.todo.today);
  const _handleDrawer = (action: 'open' | 'close') => {
    switch (action) {
      case 'open':
        navigation.openDrawer();
        break;
      case 'close':
        navigation.closeDrawer();
        break;
    }
  };

  return (
    <>
      <TodoTabHeader category="Today" handleDrawer={_handleDrawer} />
      {todayTodos.length > 0 ? (
        <TodoList todos={todayTodos} />
      ) : (
        <View style={globalStyles.noTodosView}>
          <LottieView
            source={require('@/assets/lotties/no-todo-lottie.json')}
            autoPlay
            loop
          />
        </View>
      )}
    </>
  );
}
