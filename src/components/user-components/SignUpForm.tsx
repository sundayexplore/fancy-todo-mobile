import React, { useState, useRef } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage,
  StyleSheet,
  Text
} from "react-native";
import { useDispatch } from "react-redux";
import {
  Input,
  Button,
} from "native-base";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import { Props } from "@/components";
import { globalStyles } from "@/styles";
import { userAPI, signInCompleted } from "@/actions/userActions";

export default ({ navigation, route }: Props) => {
  const dispatch = useDispatch();
  const [signUpData, setSignUpData] = useState({
    userData: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: ""
    },
    isLoading: false,
    errors: {
      firstName: false,
      username: false,
      email: false,
      password: false
    },
    currentError: "",
    snackbarVisible: false
  });
  const firstNameRef: any = useRef(null);
  const lastNameRef: any = useRef(null);
  const usernameRef: any = useRef(null);
  const emailRef: any = useRef(null);
  const passwordRef: any = useRef(null);

  const handleInputFocus = (field: string) => {
    switch (field) {
      case "firstName":
        firstNameRef.current?.focusTextInput();
        break;

      case "lastName":
        lastNameRef.current.focus();
        break;

      case "username":
        usernameRef.current.focus();
        break;

      case "email":
        emailRef.current.focus();
        break;

      case "password":
        passwordRef.current.focus();
        break;
    }
  };

  const reverseAllErrors = (target: boolean) => {
    const errors: any = { ...signUpData.errors };
    for (const key in errors) {
      errors[key] = target;
    }
    return errors;
  };

  const dismissSnackbar = () => {
    setSignUpData({
      ...signUpData,
      snackbarVisible: false,
      currentError: "",
      errors: reverseAllErrors(false)
    });
  };

  const handleChange = (value: string, target: string) => {
    const changeTarget: any = { ...signUpData };
    changeTarget.userData[target] = value;
    setSignUpData(changeTarget);
  };

  const checkError = () => {
    const { firstName, username, email, password } = signUpData.userData;
    if (firstName.length <= 0) {
      const checkTarget = { ...signUpData };
      checkTarget.errors.firstName = true;
      checkTarget.currentError = "First name cannot be empty!";
      checkTarget.snackbarVisible = true;
      setSignUpData(checkTarget);
    } else if (username.length <= 0 || username.length < 6) {
      const checkTarget = { ...signUpData };
      checkTarget.errors.username = true;
      checkTarget.currentError =
        "Username can't be empty or less than 6 in length!";
      checkTarget.snackbarVisible = true;
      setSignUpData(checkTarget);
    } else if (email.length <= 0) {
      const checkTarget = { ...signUpData };
      checkTarget.errors.email = true;
      checkTarget.currentError = "Email can't be empty!";
      checkTarget.snackbarVisible = true;
      setSignUpData(checkTarget);
    } else if (password.length <= 0 || password.length < 6) {
      const checkTarget = { ...signUpData };
      checkTarget.errors.password = true;
      checkTarget.currentError =
        "Password can't be empty or less than 6 in length!";
      checkTarget.snackbarVisible = true;
      setSignUpData(checkTarget);
    }
  };

  const asyncError = (message: string) => {
    setSignUpData({
      ...signUpData,
      currentError: message,
      snackbarVisible: true
    });
  };

  const handleSubmit = async () => {
    checkError();
    if (
      Object.values(signUpData.errors).every(
        (currentValue: any) => currentValue === false
      )
    ) {
      try {
        await setSignUpData({ ...signUpData, isLoading: true });
        const signUpResponse = await userAPI.post("/signup", {
          ...signUpData.userData
        });
        const signInResponse = await userAPI.post("/signin", {
          userIdentifier: signUpData.userData.username,
          password: signUpData.userData.password
        });
        console.log(signInResponse.data);
        AsyncStorage.setItem("token", signInResponse.data.token);
        dispatch(signInCompleted(signInResponse.data));
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
      <View style={[globalStyles.centerOnly, styles.container]}>
        {/* <Snackbar
          visible={signUpData.snackbarVisible}
          onDismiss={dismissSnackbar}
        >
          {signUpData.currentError}
        </Snackbar> */}
        <Input
          label="First Name"
          // error={signUpData.errors.firstName}
          onChangeText={(text) => handleChange(text, "firstName")}
          style={styles.textField}
          value={signUpData.userData.firstName}
          // mode="outlined"
          autoCompleteType="name"
          autoFocus={true}
          returnKeyType="next"
          ref={firstNameRef}
          onSubmitEditing={() => handleInputFocus('lastName')}
        />
        <Input
          label="Last Name"
          onChangeText={(text) => handleChange(text, "lastName")}
          style={styles.textField}
          value={signUpData.userData.lastName}
          // mode="outlined"
          autoCompleteType="name"
          returnKeyType="next"
          ref={lastNameRef}
          onSubmitEditing={() => handleInputFocus('username')}
        />
        <Input
          label="Username"
          // error={signUpData.errors.username}
          onChangeText={(text) => handleChange(text, "username")}
          style={styles.textField}
          value={signUpData.userData.username}
          // mode="outlined"
          autoCapitalize="none"
          autoCompleteType="username"
          returnKeyType="next"
          ref={usernameRef}
          onSubmitEditing={() => handleInputFocus('email')}
        />
        <Input
          label="Email"
          // error={signUpData.errors.email}
          onChangeText={(text) => handleChange(text, "email")}
          style={styles.textField}
          value={signUpData.userData.email}
          // mode="outlined"
          autoCapitalize="none"
          autoCompleteType="email"
          returnKeyType="next"
          ref={emailRef}
          onSubmitEditing={() => handleInputFocus('password')}
        />
        <Input
          label="Password"
          // error={signUpData.errors.password}
          onChangeText={(text) => handleChange(text, "password")}
          style={styles.textField}
          value={signUpData.userData.password}
          // mode="outlined"
          secureTextEntry={true}
          autoCapitalize="none"
          ref={passwordRef}
        />
        <Button
          style={styles.button}
          // mode="contained"
          onPress={handleSubmit}
        >
          Sign Up
        </Button>
        <View>
          <Text
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            Have an account? Sign In
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  textField: {
    width: wp('75%'),
    margin: 15
  },
  container: {
    backgroundColor: "#fff"
  },
  button: {
    margin: 20
  }
});
