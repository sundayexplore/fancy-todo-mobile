import React from "react";
import { View, KeyboardAvoidingView, Platform, Button } from "react-native";
import { SignInForm } from "../../components";

import { Props } from "../../components";

import styles from "../../styles";

export default ({ navigation, route }: Props) => {
  return (
    <View style={styles.defaultContainer}>
      <KeyboardAvoidingView
        // style={{ flex: 1 }}
        // behavior={Platform.OS == "ios" ? "padding" : "height"}
        // contentContainerStyle={{flexGrow: 1}}
      >
        <SignInForm navigation={navigation} route={route} />
      </KeyboardAvoidingView>
    </View>
  );
};
