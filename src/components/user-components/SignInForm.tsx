import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  AsyncStorage,
  View,
  TextInput as TextInputType,
} from 'react-native';
import { Button } from 'react-native-elements';
import { TextInput, HelperText, Snackbar } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useNetInfo, NetInfoWifiState } from '@react-native-community/netinfo';

import { ISignIn, ISignInValidation } from '@/types';
import { signIn } from '@/actions/user-actions';
import { userAPI, CustomValidator } from '@/utils';

export interface ISignInFormProps {}

export default function SignInForm({}: ISignInFormProps) {
  const dispatch = useDispatch();
  const netInfo = useNetInfo() as NetInfoWifiState;
  const [signInData, setSignInData] = useState<ISignIn>({
    userIdentifier: '',
    password: '',
  });
  const [snackbar, setSnackbar] = useState<string>('');
  const [signInErrors, setSignInErrors] = useState<ISignInValidation>({
    userIdentifier: '',
    password: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [signInButtonDisabled, setSignInButtonDisabled] = useState<boolean>(
    true,
  );
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const userIdentifierTextInputRef = useRef<TextInputType>(null);
  const passwordTextInputRef = useRef<TextInputType>(null);

  useEffect(() => {
    if (Object.values(signInData).every((signInDataVal) => signInDataVal)) {
      setSignInButtonDisabled(false);
    } else {
      setSignInButtonDisabled(true);
    }
  }, [signInData]);

  const handleTextInputFocus = (field: string) => {
    switch (field) {
      case 'userIdentifier':
        userIdentifierTextInputRef.current?.focus();
        break;

      case 'password':
        passwordTextInputRef.current?.focus();
        break;
    }
  };

  const handleChangeText = (value: string, target: string) => {
    setSignInData({
      ...signInData,
      [target]: value,
    });
  };

  const checkErrors = (): boolean => {
    const { userIdentifier, password } = signInData;
    const errorMessages: ISignInValidation = {
      userIdentifier: CustomValidator.userIdentifier(userIdentifier) || '',
      password: CustomValidator.password(password) || '',
    };

    setSignInErrors(errorMessages);

    return Object.values(errorMessages).every((errorMessage) => !errorMessage);
  };

  const handleSignIn = async () => {
    setLoading(true);
    if (checkErrors()) {
      try {
        const { data } = await userAPI(netInfo.details.ipAddress!).post(
          '/signin',
          {
            ...signInData,
          },
        );

        await AsyncStorage.multiSet([
          ['currentUser', JSON.stringify(data.user)],
          ['act', data.tokens.accessToken],
          ['rft', data.tokens.refreshToken],
        ]);

        dispatch(signIn(data.user));

        setLoading(false);
      } catch (err) {
        /**
         * TODO: Create handler for ECONNREFUSE
         */
        const errorData = err.response.data;
        setSnackbar(errorData.message);

        if (errorData.messages) {
          const errorMessages = {} as ISignInValidation;

          for (const errorMessage of errorData.messages) {
            errorMessage[errorMessage.name] = errorMessage.message;
          }

          setSignInErrors(errorMessages);
        }

        setLoading(false);

        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.textInputView}>
        <TextInput
          ref={userIdentifierTextInputRef}
          label="Email or Username"
          placeholder="johndoe@email.com"
          value={signInData.userIdentifier}
          onChangeText={(text) => handleChangeText(text, 'userIdentifier')}
          autoCapitalize="none"
          autoCompleteType="email"
          autoFocus
          returnKeyType="next"
          onSubmitEditing={() => handleTextInputFocus('password')}
          blurOnSubmit={false}
          accessibilityStates
          error={signInErrors.userIdentifier}
          style={styles.textInput}
        />
        <HelperText type="error" visible={signInErrors.userIdentifier}>
          {signInErrors.userIdentifier}
        </HelperText>
      </View>

      <View style={styles.textInputView}>
        <TextInput
          ref={passwordTextInputRef}
          label="Password"
          placeholder="Password"
          value={signInData.password}
          onChangeText={(text) => handleChangeText(text, 'password')}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          accessibilityStates
          error={signInErrors.password}
          style={styles.textInput}
        />
        <HelperText type="error" visible={signInErrors.password}>
          {signInErrors.password}
        </HelperText>
      </View>

      <Button
        title="Sign In"
        containerStyle={styles.button}
        titleStyle={styles.buttonTitle}
        onPress={handleSignIn}
        loading={loading}
        disabled={signInButtonDisabled}
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
}

const styles = StyleSheet.create({
  textInputView: {
    width: wp('88%')
  },
  textInput: {
    backgroundColor: 'transparent'
  },
  button: {
    marginTop: hp('5%'),
  },
  buttonTitle: {
    textTransform: 'uppercase',
  },
  wrapper: {
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
