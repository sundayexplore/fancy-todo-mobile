import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, Searchbar } from 'react-native-paper';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { staticColors } from '@/styles';

export interface TodoTabHeaderProps {
  handleDrawer: (action: 'open' | 'close') => void;
  category: string;
}

export default function TodoTabHeader({
  handleDrawer,
  category,
}: TodoTabHeaderProps) {
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <Appbar.Header accessibilityStates>
      {searchActive ? (
        <>
          <Appbar.BackAction
            accessibilityStates
            onPress={() => setSearchActive(false)}
            color={staticColors.white}
          />
          <Searchbar
            accessibilityStates
            placeholder="Search Todo"
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
            style={styles.searchBar}
            autoCapitalize="sentences"
            autoFocus
            clearTextOnFocus
          />
        </>
      ) : (
        <>
          <Appbar.Action
            accessibilityStates
            icon="menu"
            color={staticColors.white}
            onPress={() => handleDrawer('open')}
          />
          <Appbar.Content accessibilityStates title={category} />
          <Appbar.Action
            accessibilityStates
            icon="magnify"
            onPress={() => setSearchActive(true)}
            color={staticColors.white}
          />
          <Appbar.Action
            accessibilityStates
            icon="plus"
            color={staticColors.white}
          />
        </>
      )}
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    width: wp('85%'),
  },
});
