import React from 'react';
import { Appbar } from 'react-native-paper';

export interface ProfileTabHeaderProps {}

export default function ProfileTabHeader({}: ProfileTabHeaderProps) {
  return (
    <Appbar.Header accessibilityStates>
      <Appbar.Content accessibilityStates title="Profile" />
      <Appbar.Action accessibilityStates icon="dots-vertical" />
    </Appbar.Header>
  );
}
