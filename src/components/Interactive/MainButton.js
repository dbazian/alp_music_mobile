import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
import HeaderText from "../Texts/HeaderText";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const MainButton = props => {
  return (
    <TouchableOpacity
      style={[styles.button, props.style]}
      onPress={props.onPress}
      disabled={props.disabled}
      activeOpacity={0.5}
      underlayColor="#fff">
      <HeaderText>{props.name}</HeaderText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    marginBottom: 20,
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "white",
    backgroundColor: Colors.primary,
    width: wp("60%"),
    height: hp("8%"),
    shadowColor: "white",
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: wp("1%") },
    elevation: 3,
  },
});

export default MainButton;
