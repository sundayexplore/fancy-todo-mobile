import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  AsyncStorage,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput as TextInputType,
} from 'react-native';
import { Button } from 'react-native-elements';
import { TextInput, HelperText, Snackbar, Paragraph } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { ISignIn, ISignInValidation } from '@/types';
import { signIn } from '@/actions/user-actions';
import { userAPI, CustomValidator } from '@/utils';

export interface ISignInFormProps {}

export default function SignInForm({}: ISignInFormProps) {
  const dispatch = useDispatch();
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
        const { userIdentifier, password } = signInData;
        const { data } = await userAPI.post('/signin', {
          userIdentifier,
          password,
        });
        // await AsyncStorage.setItem('token', data.token);
        // dispatch(signIn(data));
        console.log({
          data
        });
        setLoading(false);
      } catch (err) {
        console.log({
          Error: err.response,
        });
        setSnackbar(err.response.message)
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
            mode="outlined"
            error={signInErrors.userIdentifier}
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
            secureTextEntry={true}
            autoCapitalize="none"
            accessibilityStates
            mode="outlined"
            error={signInErrors.password}
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
          visible={Boolean(snackbar)}
          onDismiss={() => setSnackbar('')}
          action={{
            label: 'Dismiss',
            onPress: () => setSnackbar(''),
          }}
          accessibilityStates>
          <Paragraph>{snackbar}</Paragraph>
        </Snackbar>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  textInputView: {
    width: wp('80%'),
    marginVertical: hp('1%'),
  },
  button: {
    marginTop: hp('3%'),
  },
  buttonTitle: {
    textTransform: 'uppercase',
  },
  wrapper: {
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
