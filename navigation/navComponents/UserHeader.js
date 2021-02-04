import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const UserHeader = () => {
  const userName = useSelector(state => state.user.firstName);
  return (
    <View>
      <Text style={styles.header}>Hello {userName}!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    color: Colors.primary,
    fontSize: hp("2.5%"),
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default UserHeader;
