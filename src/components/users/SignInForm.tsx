import React, { useState } from "react";
import {
  View,
  StyleSheet,
  AsyncStorage,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { TextInput, Button, Card, Snackbar } from "react-native-paper";
import { useDispatch } from "react-redux";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

import { userAPI, signInCompleted } from "../../actions/userActions";
import styles from "../../styles";

export default (props: any) => {
  const dispatch = useDispatch();
  const [signInData, setSignInData] = useState({
    userIdentifier: "",
    password: "",
    isLoading: false,
    error: [false, false],
    currentError: "",
    snackbarVisible: false,
  });

  const dismissSnackbar = () => {
    setSignInData({
      ...signInData,
      snackbarVisible: false,
      currentError: "",
      error: [false, false],
    });
  };

  const checkError = () => {
    const { userIdentifier, password } = signInData;
    if (userIdentifier.length <= 0) {
      setSignInData({
        ...signInData,
        error: [true, false],
        currentError: "Email or username cannot be empty!",
        snackbarVisible: true,
      });
    } else if (password.length <= 0) {
      setSignInData({
        ...signInData,
        error: [false, true],
        currentError: "Password cannot be empty!",
        snackbarVisible: true,
      });
    } else if (userIdentifier.length <= 0 && password.length <= 0) {
      setSignInData({
        ...signInData,
        error: [true, true],
        currentError: "Please fill all fields!",
        snackbarVisible: true,
      });
    }
  };

  const asyncError = (message: string) => {
    setSignInData({
      ...signInData,
      currentError: message,
      snackbarVisible: true,
    });
  };

  const handleUserIdentifier = (text: string) => {
    setSignInData({ ...signInData, userIdentifier: text });
  };

  const handlePassword = (text: string) => {
    setSignInData({ ...signInData, password: text });
  };

  const handleSubmit = async () => {
    checkError();
    if (signInData.error.every((currentValue) => currentValue === false)) {
      console.log("lolos");

      try {
        const { userIdentifier, password } = signInData;
        const { data } = await userAPI.post("/signin", {
          userIdentifier,
          password,
        });
        console.log(data);
        // await AsyncStorage.setItem('token', data.token);
        // await dispatch(signInCompleted(data));
      } catch (err) {
        console.log(err.response.data.message);
        // asyncError(err.response.message);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.centerOnly, customStyles.container]}>
        <Snackbar
          visible={signInData.snackbarVisible}
          onDismiss={dismissSnackbar}
          style={customStyles.snackbarError}
        >
          {signInData.currentError}
        </Snackbar>
        <TextInput
          error={signInData.error[0]}
          style={customStyles.textField}
          label="Email or Username"
          value={signInData.userIdentifier}
          onChangeText={(text) => handleUserIdentifier(text)}
          mode="outlined"
          autoFocus={true}
        />
        <TextInput
          error={signInData.error[1]}
          style={customStyles.textField}
          label="Password"
          value={signInData.password}
          onChangeText={(text) => handlePassword(text)}
          mode="outlined"
          autoFocus={true}
        />
        <Button
          style={customStyles.button}
          mode="contained"
          onPress={handleSubmit}
        >
          Sign In
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

const customStyles = StyleSheet.create({
  textField: {
    width: responsiveWidth(75),
    margin: 15,
  },
  button: {
    margin: 20,
  },
  snackbarError: {
    backgroundColor: "red",
  },
  container: {
    backgroundColor: "#fff",
  },
});
