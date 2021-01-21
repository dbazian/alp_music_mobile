import React, { useState, useEffect } from "react";
import { View, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import * as authActions from "../../store/actions/authActions";
import { setUserName } from "../../store/actions/userActions";
import Link from "../components/Texts/Link";
import BodyText from "../components/Texts/BodyText";
import MainButton from "../components/Interactive/MainButton";
import AuthInput from "../components/Interactive/AuthInput";
import Gradient from "../components/Wrappers/Gradient";
import LogoText from "../components/Logos/LogoText";
import Logo from "../components/Logos/Logo";
import WaveIndicator from "../components/Indicators/WaveIndicator";
import DefaultStyles from "../../constants/default-styles";

const AuthScreen = props => {
  const { control, handleSubmit, errors } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const onSubmit = async data => {
    setError(null);
    try {
      setIsLoading(true);
      await dispatch(authActions.signup(data));
      await dispatch(setUserName(data.firstName));
      setIsLoading(false);
      props.navigation.navigate("Tab");
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <Gradient>
      <LogoText />
      <View style={DefaultStyles.fullCentered}>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <AuthInput
              placeholder={"Email"}
              onBlur={onBlur}
              keyboardType="email-address"
              required
              autoComplete={"email"}
              autoCapitalize="none"
              onChangeText={value => {
                onChange(value);
              }}
              value={value}
            />
          )}
          name="email"
          rules={{ required: true, pattern: /^\S+@\S+$/i }}
          defaultValue=""
        />
        {errors.email && <BodyText>Invalid Email!</BodyText>}
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <AuthInput
              secureTextEntry
              placeholder={"Password"}
              onBlur={onBlur}
              autoCapitalize="none"
              required
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="password"
          rules={{ required: true, minLength: 6, maxLength: 12 }}
          defaultValue=""
        />
        {errors.password && <BodyText>Invalid Password!</BodyText>}
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <AuthInput
              placeholder={"First Name"}
              onBlur={onBlur}
              required
              autoCapitalize={"words"}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="firstName"
          rules={{ required: true, minLength: 2, maxLength: 12 }}
          defaultValue=""
        />
        {errors.firstName && <BodyText>Inavlid Name!</BodyText>}
      </View>
      {isLoading ? (
        <WaveIndicator />
      ) : (
        <MainButton name={"Signup"} onPress={handleSubmit(onSubmit)} />
      )}
      <Link
        title={"Switch to login"}
        onPress={() => props.navigation.navigate({ routeName: "Auth" })}
      />
      <Logo />
    </Gradient>
  );
};

export default AuthScreen;
