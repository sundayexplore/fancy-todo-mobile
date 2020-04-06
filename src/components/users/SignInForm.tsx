import React, { useState } from "react";
import {
  View,
  StyleSheet,
  AsyncStorage,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import {
  TextInput,
  Button,
  Card,
  Snackbar,
  Subheading
} from "react-native-paper";
import { useDispatch } from "react-redux";
import {
  responsiveHeight,
  responsiveWidth
} from "react-native-responsive-dimensions";

import { userAPI, signInCompleted } from "../../actions/userActions";
import { Props } from "../";
import styles from "../../styles";

export default ({ navigation, route }: Props) => {
  const dispatch = useDispatch();
  const [signInData, setSignInData] = useState({
    userData: {
      userIdentifier: "",
      password: ""
    },
    isLoading: false,
    errors: {
      userIdentifier: false,
      password: false
    },
    currentError: "",
    snackbarVisible: false
  });

  const reverseAllErrors = (target: boolean) => {
    const errors: any = { ...signInData.errors };
    for (const key in errors) {
      errors[key] = target;
    }
    return errors;
  };

  const handleChange = (value: string, target: string) => {
    const changeTarget: any = {...signInData};
    changeTarget.userData[target] = value;
    setSignInData(changeTarget);
  }

  const dismissSnackbar = () => {
    setSignInData({
      ...signInData,
      snackbarVisible: false,
      currentError: "",
      errors: reverseAllErrors(false)
    });
  };

  const checkError = () => {
    const { userIdentifier, password } = signInData.userData;
    if (userIdentifier.length <= 0) {
      const checkTarget = {...signInData};
      checkTarget.errors.userIdentifier = true;
      checkTarget.currentError = "Email or usernmae can't be empty!";
      checkTarget.snackbarVisible = true;
      setSignInData(checkTarget);
    } else if (password.length <= 0) {
      const checkTarget = {...signInData};
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
      snackbarVisible: true
    });
  };

  const handleSubmit = async () => {
    checkError();
    if (Object.values(signInData.errors).every((currentValue) => currentValue === false)) {
      try {
        const { userIdentifier, password } = signInData.userData;
        const { data } = await userAPI.post("/signin", {
          userIdentifier,
          password
        });
        await AsyncStorage.setItem('token', data.token);
        await dispatch(signInCompleted(data));
      } catch (err) {
        asyncError(err.response.data.message);
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
          error={signInData.errors.userIdentifier}
          style={customStyles.textField}
          label="Email or Username"
          value={signInData.userData.userIdentifier}
          onChangeText={(text) => handleChange(text, 'userIdentifier')}
          mode="outlined"
        />
        <TextInput
          error={signInData.errors.password}
          style={customStyles.textField}
          label="Password"
          value={signInData.userData.password}
          onChangeText={(text) => handleChange(text, 'password')}
          mode="outlined"
        />
        <Button
          style={customStyles.button}
          mode="contained"
          onPress={handleSubmit}
        >
          Sign In
        </Button>
        <View>
          <Subheading
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            Don't have an account? Sign Up
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
  button: {
    margin: 20
  },
  snackbarError: {
    backgroundColor: "red"
  },
  container: {
    backgroundColor: "#fff"
  }
});
