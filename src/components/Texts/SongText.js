import React from "react";
import { Text } from "react-native";
import DefaultStyles from "../../../constants/default-styles";

const SongText = (props) => (
  <Text numberOfLines={2} style={DefaultStyles.SongText}>
    {props.children}
  </Text>
);

export default SongText;
