import React from "react";
import { View, Image, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const LogoText = () => {
  return (
    <View>
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
    width: wp("85%"),
    height: hp("15%"),
  },
});

export default LogoText;
