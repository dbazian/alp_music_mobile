import React from "react";
import { View, Image, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const LogoText = () => {
  return (
    <View style={styles.logoContainer}>
      <Image
        source={require("../../../assets/logo-text.png")}
        style={styles.logoText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logoText: {
    resizeMode: "contain",
    width: wp("100%"),
    height: hp("15%"),
  },
  logoContainer: {
    width: "100%",
  },
});

export default LogoText;
