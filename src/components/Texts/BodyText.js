import React from "react";
import { Text } from "react-native";
import DefaultStyles from "../../../constants/default-styles";

const BodyText = props => (
  <Text style={[DefaultStyles.bodyText, props.style]}>{props.children}</Text>
);

export default BodyText;
