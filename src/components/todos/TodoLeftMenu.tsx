import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { List, Provider } from "react-native-paper";

import { Props } from "..";

export default ({ navigation, route, todo, style }: Props) => {
  return (
    <Provider>
      <View style={[style, customStyles.leftMenuContainer]}>
        <List.Item
          left={props => <List.Icon {...props} icon="folder" />}
        />
      </View>
    </Provider>
  );
};

const customStyles = StyleSheet.create({
  leftMenuContainer: {
    borderWidth: 2,
    margin: 2
  }
});
