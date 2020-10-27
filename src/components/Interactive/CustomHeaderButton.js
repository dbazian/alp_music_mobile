import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { withNavigation } from "react-navigation";

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={24}
      color={"white"}
      onPress={() => {
        props.navigation.navigate({ routeName: "Favorite" });
      }}
    />
  );
};

export default withNavigation(CustomHeaderButton);
