import React from 'react';

import { TodoTabHeader, TodoList } from '@/components';

export interface TodoTabScreenProps {}

export default function TodoTabScreen({}: TodoListTabScreenProps) {
  return (
    <>
      <TodoTabHeader />
      <TodoList />
    </>
  );
}
