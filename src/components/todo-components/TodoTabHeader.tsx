import React from 'react';
import { Appbar } from 'react-native-paper';

export interface TodoTabHeaderProps {}

export default function TodoTabHeader({}: TodoTabHeaderProps) {
  return (
    <Appbar.Header accessibilityStates>
      <Appbar.Content accessibilityStates title="Today" />
      <Appbar.Action accessibilityStates icon="magnify" />
      <Appbar.Action accessibilityStates icon="plus" />
    </Appbar.Header>
  );
}
