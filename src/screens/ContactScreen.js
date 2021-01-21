import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { sendContactForm } from "../../store/actions/contactActions";
import AuthInput from "../components/Interactive/AuthInput";
import Gradient from "../components/Wrappers/Gradient";
import HeaderText from "../components/Texts/HeaderText";
import MainButton from "../components/Interactive/MainButton";
import BodyText from "../components/Texts/BodyText";
import WaveIndicator from "../components/Indicators/WaveIndicator";
import Colors from "../../constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ContactScreen = props => {
  const { control, handleSubmit, errors, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async data => {
    setIsLoading(true);
    try {
      await dispatch(sendContactForm(data));
      alert("Thank you for your patience, we will respond as soon as we can.");
      data.reset();
    } catch (error) {
      console.log(error);
    }
    reset();
    setIsLoading(false);
  };

  const backPress = () => {
    props.navigation.navigate({ routeName: "User" });
  };

  return (
    <Gradient>
      <View style={styles.centered}>
        <HeaderText>Contact Us</HeaderText>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <AuthInput
              placeholder={"Email"}
              style={styles.inputText}
              onBlur={onBlur}
              keyboardType="email-address"
              required
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
        {errors.email && (
          <BodyText style={styles.text}>Invalid Email!</BodyText>
        )}
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <AuthInput
              style={styles.inputText}
              placeholder={"Name"}
              onBlur={onBlur}
              required
              autoCapitalize="none"
              onChangeText={value => {
                onChange(value);
              }}
              value={value}
            />
          )}
          name="name"
          rules={{ required: true, minLength: 2 }}
          defaultValue=""
        />
        {errors.name && <BodyText style={styles.text}>Invalid Name!</BodyText>}
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <TextInput
              placeholder={"Message"}
              style={styles.box}
              onBlur={onBlur}
              multiline={true}
              required
              autoCapitalize="none"
              onChangeText={value => {
                onChange(value);
              }}
              value={value}
            />
          )}
          name="message"
          rules={{ required: true, minLength: 5 }}
          defaultValue=""
        />
        {isLoading ? (
          <WaveIndicator />
        ) : (
          <MainButton name={"Submit"} onPress={handleSubmit(onSubmit)} />
        )}
        <MainButton name={"Back"} onPress={backPress} />
      </View>
    </Gradient>
  );
};

const styles = StyleSheet.create({
  centered: {
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  box: {
    height: hp("20%"),
    backgroundColor: "white",
    borderColor: Colors.primary,
    width: wp("95%"),
    marginBottom: 20,
    borderWidth: 5,
    shadowColor: Colors.primary,
    shadowOpacity: 0.9,
    shadowOffset: { width: 0, height: 5 },
    fontSize: hp("2.5%"),
    fontFamily: "Raleway-Medium",
  },
  inputText: {
    textAlign: "left",
  },
});

export default ContactScreen;
