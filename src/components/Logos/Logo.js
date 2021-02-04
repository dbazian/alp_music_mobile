import React from "react";
import { View, Image, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Logo = () => {
  return (
    <View>
      <Image
        source={require("../../../assets/logo-image.png")}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
    width: wp("40%"),
    height: hp("25%"),
  },
});

export default Logo;
