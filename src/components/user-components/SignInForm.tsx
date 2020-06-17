import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  AsyncStorage,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Input,
  Button,
  Item,
  Form,
  Container,
  Content,
  Label,
  Text,
} from 'native-base';
import { useDispatch } from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { userAPI, signInCompleted } from '@/actions/userActions';
import { globalStyles } from '@/styles';

export interface ISignInFormProps {}

export default function SignInForm({}: ISignInFormProps) {
  const dispatch = useDispatch();
  const [signInData, setSignInData] = useState({
    userData: {
      userIdentifier: '',
      password: '',
    },
    isLoading: false,
    errors: {
      userIdentifier: false,
      password: false,
    },
    currentError: '',
    snackbarVisible: false,
  });
  let userIdentifierRef: any = useRef(null);
  let passwordRef: any = useRef(null);

  const handleInputFocus = (field: string) => {
    switch (field) {
      case 'userIdentifier':
        userIdentifierRef.current.focus();
        break;

      case 'password':
        passwordRef.current.focus();
        break;
    }
  };

  const reverseAllErrors = (target: boolean) => {
    const errors: any = { ...signInData.errors };
    for (const key in errors) {
      errors[key] = target;
    }
    return errors;
  };

  const handleChange = (value: string, target: string) => {
    const changeTarget: any = { ...signInData };
    changeTarget.userData[target] = value;
    setSignInData(changeTarget);
  };

  const dismissSnackbar = () => {
    setSignInData({
      ...signInData,
      snackbarVisible: false,
      currentError: '',
      errors: reverseAllErrors(false),
    });
  };

  const checkError = () => {
    const { userIdentifier, password } = signInData.userData;
    if (userIdentifier.length <= 0) {
      const checkTarget = { ...signInData };
      checkTarget.errors.userIdentifier = true;
      checkTarget.currentError = "Email or usernmae can't be empty!";
      checkTarget.snackbarVisible = true;
      setSignInData(checkTarget);
    } else if (password.length <= 0) {
      const checkTarget = { ...signInData };
      checkTarget.errors.password = true;
      checkTarget.currentError = "Password can't be empty!";
      checkTarget.snackbarVisible = true;
      setSignInData(checkTarget);
    }
  };

  const asyncError = (message: string) => {
    setSignInData({
      ...signInData,
      currentError: message,
      snackbarVisible: true,
    });
  };

  const handleSubmit = async () => {
    checkError();
    if (
      Object.values(signInData.errors).every(
        (currentValue) => currentValue === false,
      )
    ) {
      try {
        const { userIdentifier, password } = signInData.userData;
        const { data } = await userAPI.post('/signin', {
          userIdentifier,
          password,
        });
        await AsyncStorage.setItem('token', data.token);
        dispatch(signInCompleted(data));
      } catch (err) {
        asyncError(err.response.data.message);
      }
    }
  };

  const handleDismiss = () => {
    Keyboard.dismiss();
    dismissSnackbar();
  };

  return (
    <TouchableWithoutFeedback onPress={handleDismiss}>
      <Container style={[globalStyles.centerOnly, styles.container]}>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Email or Username</Label>
              <Input
                // error={signInData.errors.userIdentifier}
                style={styles.textField}
                value={signInData.userData.userIdentifier}
                onChangeText={(text) => handleChange(text, 'userIdentifier')}
                // mode="outlined"
                autoCapitalize="none"
                autoCompleteType="email"
                autoFocus
                returnKeyType="next"
                ref={userIdentifierRef}
                onSubmitEditing={() => handleInputFocus('password')}
              />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                ref={passwordRef}
                // error={signInData.errors.password}
                style={styles.textField}
                value={signInData.userData.password}
                onChangeText={(text) => handleChange(text, 'password')}
                // mode="outlined"
                secureTextEntry={true}
                autoCapitalize="none"
              />
            </Item>
            <Button
              style={styles.button}
              // mode="contained"
              onPress={handleSubmit}>
              <Text>Sign In</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  textField: {
    width: wp(75),
    margin: 15,
  },
  button: {
    margin: 20,
  },
  snackbarError: {
    backgroundColor: 'red',
  },
  container: {
    backgroundColor: '#fff',
  },
});
