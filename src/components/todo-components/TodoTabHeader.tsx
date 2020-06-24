import React, { useState } from 'react';
import { Appbar, Searchbar } from 'react-native-paper';

export interface TodoTabHeaderProps {}

export default function TodoTabHeader({}: TodoTabHeaderProps) {
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <Appbar.Header accessibilityStates>
      {searchActive ? (
        <>
          <Appbar.BackAction
            accessibilityStates
            onPress={() => setSearchActive(false)}
          />
          <Searchbar
            accessibilityStates
            placeholder="Search Todo"
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
          />
        </>
      ) : (
        <>
          <Appbar.Content accessibilityStates title="Today" />
          <Appbar.Action
            accessibilityStates
            icon="magnify"
            onPress={() => setSearchActive(true)}
          />
          <Appbar.Action accessibilityStates icon="plus" />
        </>
      )}
    </Appbar.Header>
  );
}
