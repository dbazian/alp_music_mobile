import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const OrderCard = (props) => {
  return <View style={styles.container}>{props.children}</View>;
};

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.primary,
    borderWidth: 3,
    marginVertical: 10,
    width: wp("98%"),
    justifyContent: "space-evenly",
    flexDirection: "row",
    padding: 10,
    shadowColor: "white",
    shadowOffset: { width: 1.5, height: 1 },
    borderRadius: 12,
    backgroundColor: "black",
  },
});

export default OrderCard;
