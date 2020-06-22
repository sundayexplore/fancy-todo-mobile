import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Paragraph, Button } from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={globalStyles.defaultContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
          <SignInForm />
          <View style={styles.suggestionView}>
            <Paragraph>Don't have an account?</Paragraph>
            <Button
              style={styles.suggestionButton}
              mode="text"
              accessibilityStates
              onPress={() => navigation.navigate('SignUp')}>
              Sign In
            </Button>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  suggestionView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('5%'),
  },
  suggestionButton: {
    marginLeft: wp('2%'),
  },
});
