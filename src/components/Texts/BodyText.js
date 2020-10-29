import React from "react";
import { Text } from "react-native";
import DefaultStyles from "../../../constants/default-styles";

const BodyText = (props) => (
  <Text numberOfLines={2} style={DefaultStyles.bodyText}>
    {props.children}
  </Text>
);

export default BodyText;
