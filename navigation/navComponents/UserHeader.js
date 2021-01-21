import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Colors from "../../constants/Colors";

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
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default UserHeader;
