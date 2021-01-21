import React from "react";
import { Text, StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const HeaderText = props => <Text style={styles.header}>{props.children}</Text>;

const styles = StyleSheet.create({
  header: {
    fontFamily: "Raleway-Medium",
    color: "white",
    fontSize: hp("2.8%"),
    textAlign: "center",
    padding: 10,
  },
});

export default HeaderText;
