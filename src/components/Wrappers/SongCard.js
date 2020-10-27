import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SongCard = (props) => {
  return <View style={styles.container}>{props.children}</View>;
};

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.primary,
    borderWidth: 3,
    marginVertical: 5,
    width: wp("95%"),
    justifyContent: "space-evenly",
    padding: 10,
    shadowColor: "white",
    shadowOffset: { width: 1.5, height: 1 },
    borderRadius: 12,
    backgroundColor: "black",
    flex: 1,
    height: hp("8%"),
  },
});

export default SongCard;
