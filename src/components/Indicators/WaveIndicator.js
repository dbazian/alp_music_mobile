import React from "react";
import { View, StyleSheet } from "react-native";
import { BarIndicator } from "react-native-indicators";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const WaveIndicator = () => {
  return (
    <View style={styles.indicator}>
      <BarIndicator color="white" count={5} />
    </View>
  );
};

const styles = StyleSheet.create({
  indicator: {
    marginTop: 10,
    marginBottom: 20,
    justifyContent: "center",
    width: wp("60%"),
    height: hp("8%"),
    elevation: 3,
  },
});

export default WaveIndicator;
