import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const MainButton = (props) => {
  return (
    <TouchableOpacity
      style={styles.loginScreenButton}
      onPress={props.onPress}
      disabled={props.disabled}
      activeOpacity={0.5}
      underlayColor="#fff"
    >
      <Text style={styles.loginText}>{props.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loginScreenButton: {
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
  loginText: {
    color: "white",
    textAlign: "center",
    fontSize: hp("3%"),
    fontFamily: "Raleway-Medium",
  },
});

export default MainButton;
