import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  AsyncStorage,
  StyleSheet,
  TextInput as TextInputType,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { TextInput, Snackbar, HelperText } from 'react-native-paper';
import { Button } from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNetInfo, NetInfoWifiState } from '@react-native-community/netinfo';

import { ISignUp, ISignUpValidation } from '@/types';
import { signIn } from '@/actions/user-actions';
import { userAPI, CustomValidator } from '@/utils';

export interface ISignUpFormProps {}

export default ({}: ISignUpFormProps) => {
  const dispatch = useDispatch();
  const netInfo = useNetInfo() as NetInfoWifiState;
  const [signUpData, setSignUpData] = useState<ISignUp>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  });
  const [signUpErrors, setSignUpErrors] = useState<ISignUpValidation>({
    firstName: '',
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<string>('');
  const [signUpButtonDisabled, setSignUpButtonDisabled] = useState<boolean>(
    true,
  );
  const firstNameRef = useRef<TextInputType>(null);
  const lastNameRef = useRef<TextInputType>(null);
  const usernameRef = useRef<TextInputType>(null);
  const emailRef = useRef<TextInputType>(null);
  const passwordRef = useRef<TextInputType>(null);

  useEffect(() => {
    if (Object.values(signUpData).every((signUpDataVal) => signUpDataVal)) {
      setSignUpButtonDisabled(false);
    } else {
      setSignUpButtonDisabled(true);
    }
  }, [signUpData]);

  const handleInputFocus = (field: string) => {
    switch (field) {
      case 'firstName':
        firstNameRef.current?.focus();
        break;

      case 'lastName':
        lastNameRef.current?.focus();
        break;

      case 'username':
        usernameRef.current?.focus();
        break;

      case 'email':
        emailRef.current?.focus();
        break;

      case 'password':
        passwordRef.current?.focus();
        break;
    }
  };

  const handleChangeText = (value: string, target: string) => {
    setSignUpData({
      ...signUpData,
      [target]: value,
    });
  };

  const checkErrors = () => {
    const { firstName, username, email, password } = signUpData;
    const errorMessages: ISignUpValidation = {
      firstName: CustomValidator.firstName(firstName) || '',
      username: CustomValidator.username(username) || '',
      email: CustomValidator.email(email) || '',
      password: CustomValidator.password(password) || '',
    };

    setSignUpErrors(errorMessages);

    return Object.values(errorMessages).every((errorMessage) => !errorMessages);
  };

  const handleSignUp = async () => {
    setLoading(true);
    if (checkErrors()) {
      try {
        const { data } = await userAPI(netInfo.details.ipAddress!).post(
          '/signup',
          {
            ...signUpData,
          },
        );
        await AsyncStorage.multiSet([
          ['currentUser', JSON.stringify(data.user)],
          ['act', data.tokens.accessToken],
          ['rft', data.tokens.refreshToken],
        ]);
        dispatch(signIn(data.user));
        setSnackbar(data.message);
        setLoading(false);
      } catch (err) {
        /**
         * TODO: Create handler for ECONNREFUSE
         */
        const errorData = err.response.data;
        setSnackbar(errorData.message);

        if (errorData.messages) {
          const errorMessages = {} as ISignUpValidation;

          for (const errorMessage of errorData.messages) {
            errorMessage[errorMessage.name] = errorMessage.message;
          }

          setSignUpErrors(errorMessages);
        }

        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.textFieldView}>
        <TextInput
          label="First Name"
          error={signUpErrors.firstName.length > 0}
          onChangeText={(text) => handleChangeText(text, 'firstName')}
          value={signUpData.firstName}
          mode="outlined"
          autoCompleteType="name"
          autoFocus={true}
          returnKeyType="next"
          ref={firstNameRef}
          placeholder="John"
          onSubmitEditing={() => handleInputFocus('lastName')}
          accessibilityStates
          blurOnSubmit={false}
        />
        <HelperText type="error" visible={signUpErrors.firstName}>
          {signUpErrors.firstName}
        </HelperText>
      </View>

      <View style={styles.textFieldView}>
        <TextInput
          accessibilityStates
          label="Last Name"
          onChangeText={(text) => handleChangeText(text, 'lastName')}
          value={signUpData.lastName}
          mode="outlined"
          autoCompleteType="name"
          returnKeyType="next"
          ref={lastNameRef}
          onSubmitEditing={() => handleInputFocus('username')}
          placeholder="Doe"
          blurOnSubmit={false}
        />
        <HelperText></HelperText>
      </View>

      <View style={styles.textFieldView}>
        <TextInput
          accessibilityStates
          label="Username"
          error={signUpErrors.username.length > 0}
          onChangeText={(text) => handleChangeText(text, 'username')}
          value={signUpData.username}
          mode="outlined"
          autoCapitalize="none"
          autoCompleteType="username"
          returnKeyType="next"
          ref={usernameRef}
          onSubmitEditing={() => handleInputFocus('email')}
          blurOnSubmit={false}
        />
        <HelperText type="error" visible={signUpErrors.username}>
          {signUpErrors.username}
        </HelperText>
      </View>

      <View style={styles.textFieldView}>
        <TextInput
          accessibilityStates
          label="Email"
          error={signUpErrors.email.length > 0}
          onChangeText={(text) => handleChangeText(text, 'email')}
          value={signUpData.email}
          mode="outlined"
          autoCapitalize="none"
          autoCompleteType="email"
          returnKeyType="next"
          ref={emailRef}
          onSubmitEditing={() => handleInputFocus('password')}
          blurOnSubmit={false}
        />
        <HelperText type="error" visible={signUpErrors.email}>
          {signUpErrors.email}
        </HelperText>
      </View>

      <View style={styles.textFieldView}>
        <TextInput
          accessibilityStates
          label="Password"
          error={signUpErrors.password.length}
          onChangeText={(text) => handleChangeText(text, 'password')}
          value={signUpData.password}
          mode="outlined"
          secureTextEntry={true}
          autoCapitalize="none"
          ref={passwordRef}
        />
        <HelperText type="error" visible={signUpErrors.password}>
          {signUpErrors.password}
        </HelperText>
      </View>

      <Button
        style={styles.button}
        titleStyle={styles.buttonTitle}
        onPress={handleSignUp}
        loading={loading}
        title="Sign Up"
        disabled={signUpButtonDisabled}
      />

      <Snackbar
        visible={snackbar.length > 0}
        onDismiss={() => setSnackbar('')}
        action={{
          label: 'Dismiss',
          onPress: () => setSnackbar(''),
        }}
        accessibilityStates>
        {snackbar}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  textFieldView: {
    width: wp('80%'),
    marginVertical: hp('1%'),
  },
  wrapper: {
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  button: {
    marginTop: hp('1.5%'),
  },
  buttonTitle: {
    textTransform: 'uppercase',
  },
});
