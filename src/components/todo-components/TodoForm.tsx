import React, { useState, useEffect, RefObject } from 'react';
import { StyleSheet, TextInput } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
// import { Dialog, Portal } from 'react-native-paper';
import BottomSheet from 'react-native-raw-bottom-sheet';
// import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { ITodo } from '@/types';
// import { globalStyles } from '@/styles';
// import { addTodo } from '@/actions/todo-actions';
// import { todoAPI } from '@/utils';

export interface TodoFormProps {
  mode: 'add' | 'update';
  todo?: ITodo;
  bottomSheetRef: RefObject<BottomSheet>;
}

export default ({ mode, todo, bottomSheetRef }: TodoFormProps) => {
  const [localTodo, setLocalTodo] = useState<ITodo>({
    _id: null,
    name: '',
    due: null,
    position: null,
    priority: 0,
    completed: false,
  });
  // const [commandInput, setCommandInput] = useState<string>('');

  useEffect(() => {
    if (mode === 'update' && todo) {
      setLocalTodo({ ...(todo as ITodo) });
    } else if (mode === 'update' && !todo) {
      // handle here
    }
  }, [mode, todo]);

  const _handleTextChange = (
    field: 'name' | 'due' | 'priority',
    text: string | Date | number,
  ): void => {
    switch (field) {
      case 'name':
        setLocalTodo({
          ...localTodo,
          name: text as string,
        });
        break;

      case 'due':
        setLocalTodo({
          ...localTodo,
          due: text as Date,
        });
        break;

      case 'priority':
        setLocalTodo({
          ...localTodo,
          priority: text as number,
        });
        break;
    }
  };

  return (
    <BottomSheet ref={bottomSheetRef}>
      <TextInput
        autoFocus
        value={localTodo.name}
        onChangeText={(text) => _handleTextChange('name', text)}
      />
    </BottomSheet>
  );
};

// const styles = StyleSheet.create({
//   todoFormWrapper: {
//     // flex: 1,
//     backgroundColor: 'black',
//   },
// });
