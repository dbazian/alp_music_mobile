import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Colors from "../../../constants/Colors";
import BodyText from "../Texts/BodyText";

const SmallButton = (props) => {
  return (
    <TouchableOpacity
      style={styles.button}
      underlayColor="#fff"
      activeOpacity={0.5}
      onPress={props.onPress}
      disabled={props.disabled}>
      <BodyText>{props.name}</BodyText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: wp("9%"),
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "white",
    shadowColor: "white",
    elevation: 3,
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 5 },
  },
});

export default SmallButton;
