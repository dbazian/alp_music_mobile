import React from "react";
import { Text, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const WarningText = (props) => (
  <Text style={styles.text}>{props.children}</Text>
);

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: hp("2.5%"),
  },
});

export default WarningText;
