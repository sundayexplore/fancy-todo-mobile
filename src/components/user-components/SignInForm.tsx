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
import { TextInput } from 'react-native-paper';
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
  const [signInErrors, setSignInErrors] = useState<ISignInValidation>({
    userIdentifier: false,
    password: false,
  });
  const [signInErrorMessages, setSignInErrorMessages] = useState<
    ISignInValidation
  >({
    userIdentifier: '',
    password: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [signInButtonDisabled, setSignInButtonDisabled] = useState<boolean>(
    true,
  );
  const userIdentifierTextInputRef = useRef<TextInputType>(null);
  const passwordTextInputRef = useRef<TextInputType>(null);

  useEffect(() => {}, []);

  const handleTextInputFocus = (field: string) => {
    checkErrors();
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
    const changeTarget: any = { ...signInData };
    changeTarget.userData[target] = value;
    setSignInData(changeTarget);
  };

  const checkErrors = (): boolean => {
    const { userIdentifier, password } = signInData;
    const errorMessages: ISignInValidation = {
      userIdentifier: CustomValidator.userIdentifier(userIdentifier),
      password: CustomValidator.password(password),
    };

    let result = true;

    for (const errorKey in errorMessages) {
      if (errorMessages[errorKey] as string) {
        setSignInErrors({
          ...signInErrors,
          [errorKey]: true,
        });
        setSignInErrorMessages({
          ...signInErrorMessages,
          [errorKey]: errorMessages[errorKey],
        });
        result = false;
      } else {
        setSignInErrors({
          ...signInErrors,
          [errorKey]: false,
        });
        setSignInErrorMessages({
          ...signInErrorMessages,
          [errorKey]: '',
        });
        result = true;
      }
    }

    return result;
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
        await AsyncStorage.setItem('token', data.token);
        dispatch(signIn(data));
        setLoading(false);
      } catch (err) {
        console.log({
          err,
        });
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.wrapper}>
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
        />
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
          style={styles.textInput}
        />
        <Button
          title="Sign In"
          style={styles.button}
          onPress={handleSignIn}
          loading={loading}
          disabled={signInButtonDisabled}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  textInput: {
    width: wp('70%'),
    marginVertical: hp('3%'),
  },
  button: {
    // margin: 20,
  },
  wrapper: {
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
