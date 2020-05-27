import React from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Button,
  ScrollView
} from "react-native";
import { SignUpForm } from "@/components";

import { Props } from "@/components";

import styles from "@/styles";

export default ({ navigation, route }: Props) => {
  return (
    <View style={styles.defaultContainer}>
      <KeyboardAvoidingView
        contentContainerStyle={{flexGrow: 1}}
      >
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <SignUpForm navigation={navigation} route={route} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
