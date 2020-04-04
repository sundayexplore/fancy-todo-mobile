import React from "react";
import {
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet
} from "react-native";

import { SignInForm } from "../../components";

import { Props } from "../../components";

import styles from "../../styles";

export default ({ navigation, route }: Props) => {
  return (
    <View style={styles.centerOnly}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior='height'>
          <View style={customStyles.screenContainer}>
            <SignInForm />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};

const customStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  }
});
