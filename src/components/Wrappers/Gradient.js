import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Gradient = props => {
  return (
    <LinearGradient colors={["#00202a", "#00BFFF", "black"]}>
      <View style={styles.full}>{props.children}</View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  full: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Gradient;
