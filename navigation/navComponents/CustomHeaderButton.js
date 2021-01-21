import React from "react";
import { StyleSheet } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";
import Colors from "../../constants/Colors";
const CustomHeaderButton = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={30}
      style={styles.header}
      color={Colors.primary}
      onPress={() => {
        props.navigation.navigate({ routeName: "Favorite" });
      }}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    marginRight: 10,
    marginBottom: 10,
  },
});

export default withNavigation(CustomHeaderButton);
