import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../../../constants/Colors";

const Input = (props) => {
  return (
    <View style={styles.viewContainer}>
      <TextInput {...props} style={[styles.formBox, props.style]} />
    </View>
  );
};

const styles = StyleSheet.create({
  formBox: {
    backgroundColor: "white",
    flex: 1,
    textAlign: "center",
    fontSize: hp("2.5%"),
    fontFamily: "Raleway-Medium",
  },
  viewContainer: {
    height: hp("7%"),
    width: wp("95%"),
    borderColor: Colors.primary,
    shadowColor: Colors.primary,
    borderWidth: 3,
    marginVertical: 8,
    shadowOpacity: 0.9,
    shadowOffset: { width: 0, height: 5 },
  },
});

export default Input;
