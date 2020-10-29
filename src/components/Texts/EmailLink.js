import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const EmailLink = (props) => {
  return (
    <View style={styles.section}>
      <TouchableOpacity onPress={props.onPress}>
        <Text style={styles.link}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginVertical: 10,
    alignItems: "center",
  },
  link: {
    color: "white",
    fontSize: hp("2.3%"),
    padding: 2,
    fontStyle: "italic",
    textDecorationLine: "underline",
  },
});

export default EmailLink;
