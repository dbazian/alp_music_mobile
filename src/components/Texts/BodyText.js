import React from "react";
import { Text, StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const BodyText = (props) => (
  <Text numberOfLines={2} style={styles.body}>
    {props.children}
  </Text>
);

const styles = StyleSheet.create({
  body: {
    fontFamily: "Raleway-Medium",
    fontSize: hp("2%"),
    color: "white",
  },
});

export default BodyText;
