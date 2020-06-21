import React from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '@/types';
import { SignInForm } from '@/components';
import { globalStyles } from '@/styles';

export type SignInScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignIn'
>;

export type SignInScreenRouteProp = RouteProp<RootStackParamList, 'SignIn'>;

export interface ISignInScreenProps {
  navigation: SignInScreenNavigationProp;
  route: SignInScreenRouteProp;
}

export default function SignInScreen({
  navigation,
  route,
}: ISignInScreenProps) {
  return (
    <View style={globalStyles.defaultContainer}>
      <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <SignInForm />
      </KeyboardAvoidingView>
    </View>
  );
}
