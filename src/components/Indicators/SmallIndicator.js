import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialIndicator } from "react-native-indicators";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Colors from "../../../constants/Colors";

const SmallIndicator = () => {
  return (
    <View style={styles.user}>
      <MaterialIndicator color={Colors.primary} size={hp("4.5%")} />
    </View>
  );
};

const styles = StyleSheet.create({
  user: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SmallIndicator;
