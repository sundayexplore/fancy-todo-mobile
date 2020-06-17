import React from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Button,
  ScrollView
} from "react-native";
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '@/types';
import { SignUpForm } from "@/components";
import { globalStyles } from "@/styles";

export type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

export type SignUpScreenRouteProp = RouteProp<RootStackParamList, 'SignUp'>;

export interface ISignUpScreenProps {
  navigation: SignUpScreenNavigationProp;
  route: SignUpScreenRouteProp;
}

export default ({ navigation, route }: ISignUpScreenProps) => {
  return (
    <View style={globalStyles.defaultContainer}>
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
