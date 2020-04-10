import React, { useState } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage,
  StyleSheet
} from "react-native";
import { useDispatch } from "react-redux";
import {
  TextInput,
  Button,
  Card,
  Snackbar,
  Subheading
} from "react-native-paper";
import { responsiveWidth } from "react-native-responsive-dimensions";

import { Props } from "../";
import styles from "../../styles";
import { userAPI, signInCompleted } from "../../actions/userActions";

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
  let firstNameRef: any = null;
  let lastNameRef: any = null;
  let usernameRef: any = null;
  let emailRef: any = null;
  let passwordRef: any = null;

  const handleTextInputRefs = (field: string, targetRef: any) => {
    switch (field) {
      case "firstName":
        firstNameRef = targetRef;
        break;

      case "lastName":
        lastNameRef = targetRef;
        break;

      case "username":
        usernameRef = targetRef;
        break;

      case "email":
        emailRef = targetRef;
        break;

      case "password":
        passwordRef = targetRef;
        break;
    }
  };

  const handleTextInputFocus = (field: string) => {
    switch (field) {
      case "firstName":
        firstNameRef.focus();
        break;

      case "lastName":
        lastNameRef.focus();
        break;

      case "username":
        usernameRef.focus();
        break;

      case "email":
        emailRef.focus();
        break;

      case "password":
        passwordRef.focus();
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
        (currentValue) => currentValue === false
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
      <View style={[styles.centerOnly, customStyles.container]}>
        <Snackbar
          visible={signUpData.snackbarVisible}
          onDismiss={dismissSnackbar}
        >
          {signUpData.currentError}
        </Snackbar>
        <TextInput
          label="First Name"
          error={signUpData.errors.firstName}
          onChangeText={(text) => handleChange(text, "firstName")}
          style={customStyles.textField}
          value={signUpData.userData.firstName}
          mode="outlined"
          autoCompleteType="name"
          autoFocus={true}
          returnKeyType="next"
          ref={ref => handleTextInputRefs('firstName', ref)}
          onSubmitEditing={() => handleTextInputFocus('lastName')}
        />
        <TextInput
          label="Last Name"
          onChangeText={(text) => handleChange(text, "lastName")}
          style={customStyles.textField}
          value={signUpData.userData.lastName}
          mode="outlined"
          autoCompleteType="name"
          returnKeyType="next"
          ref={ref => handleTextInputRefs('lastName', ref)}
          onSubmitEditing={() => handleTextInputFocus('username')}
        />
        <TextInput
          label="Username"
          error={signUpData.errors.username}
          onChangeText={(text) => handleChange(text, "username")}
          style={customStyles.textField}
          value={signUpData.userData.username}
          mode="outlined"
          autoCapitalize="none"
          autoCompleteType="username"
          returnKeyType="next"
          ref={ref => handleTextInputRefs('username', ref)}
          onSubmitEditing={() => handleTextInputFocus('email')}
        />
        <TextInput
          label="Email"
          error={signUpData.errors.email}
          onChangeText={(text) => handleChange(text, "email")}
          style={customStyles.textField}
          value={signUpData.userData.email}
          mode="outlined"
          autoCapitalize="none"
          autoCompleteType="email"
          returnKeyType="next"
          ref={ref => handleTextInputRefs('email', ref)}
          onSubmitEditing={() => handleTextInputFocus('password')}
        />
        <TextInput
          label="Password"
          error={signUpData.errors.password}
          onChangeText={(text) => handleChange(text, "password")}
          style={customStyles.textField}
          value={signUpData.userData.password}
          mode="outlined"
          secureTextEntry={true}
          autoCapitalize="none"
          ref={ref => handleTextInputRefs('password', ref)}
        />
        <Button
          style={customStyles.button}
          mode="contained"
          onPress={handleSubmit}
        >
          Sign Up
        </Button>
        <View>
          <Subheading
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            Have an account? Sign In
          </Subheading>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const customStyles = StyleSheet.create({
  textField: {
    width: responsiveWidth(75),
    margin: 15
  },
  container: {
    backgroundColor: "#fff"
  },
  button: {
    margin: 20
  }
});
