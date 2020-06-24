import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, TextInput } from 'react-native-paper';
import {
  // heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { staticColors } from '@/styles';

export interface TodoTabHeaderProps {}

export default function TodoTabHeader({}: TodoTabHeaderProps) {
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <Appbar.Header accessibilityStates style={{ paddingVertical: 10 }}>
      {searchActive ? (
        <>
          <Appbar.BackAction
            accessibilityStates
            onPress={() => setSearchActive(false)}
            color={staticColors.white}
          />
          <TextInput
            accessibilityStates
            placeholder="Search Todo"
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
            style={styles.searchBar}
            mode="flat"
          />
        </>
      ) : (
        <>
          <Appbar.Content accessibilityStates title="Today" />
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
    width: wp('70%'),
    // backgroundColor: 'transparent',
  },
});
