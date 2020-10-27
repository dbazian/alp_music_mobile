import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";

import * as authActions from "../../store/actions/authActions";

import ResetPasswordModal from "../modals/ResetPasswordModal";
import { BarIndicator } from "react-native-indicators";
import Link from "../components/Texts/Link";
import WarningText from "../components/Texts/WarningText";
import MainButton from "../components/Interactive/MainButton";
import AuthInput from "../components/Interactive/AuthInput";
import Gradient from "../components/Wrappers/Gradient";
import LogoText from "../components/Logos/LogoText";
import Logo from "../components/Logos/Logo";

const AuthScreen = (props) => {
  const { control, handleSubmit, errors } = useForm();
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalToggle, setModalToggle] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();

  const signupToggle = () => {
    setIsSignup((prevState) => !prevState);
  };
  const passwordModal = () => {
    setModalToggle(!modalToggle);
  };

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const onSubmit = async (data) => {
    let action;
    if (isSignup) {
      action = authActions.signup(data);
    } else {
      action = authActions.login(data);
    }
    setIsLoading(true);
    setError(null);
    try {
      await dispatch(action);
      props.navigation.navigate("Tab");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.authPage}>
      <Gradient>
        <ResetPasswordModal visible={modalToggle} onPress={passwordModal} />
        <LogoText />
        <View style={styles.inputs}>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <AuthInput
                placeholder={"Email"}
                onBlur={onBlur}
                keyboardType="email-address"
                required
                autoCapitalize="none"
                onChangeText={(value) => {
                  onChange(value);
                }}
                value={value}
                inititalValue=""
              />
            )}
            name="email"
            rules={{ required: true, pattern: /^\S+@\S+$/i }}
            defaultValue=""
          />
          {errors.email && <WarningText>Invalid Email!</WarningText>}
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <AuthInput
                secureTextEntry
                placeholder={"Password"}
                onBlur={onBlur}
                keyboardType="default"
                autoCapitalize="none"
                required
                onChangeText={(value) => onChange(value)}
                value={value}
                inititalValue=""
              />
            )}
            name="password"
            rules={{ required: true, minLength: 6, maxLength: 12 }}
            defaultValue=""
          />
          {errors.password && <WarningText>Invalid Password!</WarningText>}
        </View>
        {isLoading ? (
          <BarIndicator color="white" count={5} />
        ) : (
          <MainButton
            name={isSignup ? "Sign up" : "Login"}
            onPress={handleSubmit(onSubmit)}
          />
        )}
        <Link
          title={isSignup ? "Switch to log in" : "Switch to sign up."}
          onPress={signupToggle}
        />
        <Link title={"Forgot Password"} onPress={passwordModal} />
        <Logo />
      </Gradient>
    </View>
  );
};

const styles = StyleSheet.create({
  inputs: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 5,
  },
  authPage: {},
});

export default AuthScreen;
