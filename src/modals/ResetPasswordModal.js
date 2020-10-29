import React, { useState } from "react";
import { Modal, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import firebase from "../../InitializeFirebase";
import HeaderText from "../components/Texts/HeaderText";
import BodyText from "../components/Texts/BodyText";
import MainButton from "../components/Interactive/MainButton";
import AuthInput from "../components/Interactive/AuthInput";
import Gradient from "../components/Wrappers/Gradient";

const ResetPasswordModal = (props) => {
  const { control, handleSubmit, errors } = useForm();
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    setError(null);
    try {
      await firebase.auth().sendPasswordResetEmail(data.email);
    } catch (e) {
      setError(e);
      console.log(error);
    }
    Alert.alert("If your email is in our system, you will receive instructions on how to reset.", [
      {
        text: "Ok",
        onPress: () => props.onPress,
      },
    ]);
  };

  return (
    <Modal visible={props.visible} animationType="slide" transparent={true}>
      <Gradient>
        <HeaderText>Reset Password:</HeaderText>
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
        {errors.email && <BodyText>Invalid Email!</BodyText>}
        <MainButton name={"Submit"} onPress={handleSubmit(onSubmit)} />
        <MainButton name="Back" onPress={props.onPress} />
      </Gradient>
    </Modal>
  );
};

export default ResetPasswordModal;
