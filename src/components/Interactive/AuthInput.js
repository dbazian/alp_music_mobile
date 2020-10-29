import React from "react";
import { View, TextInput } from "react-native";
import DefaultStyles from "../../../constants/default-styles";

const AuthInput = (props) => {
  return (
    <View>
      <TextInput {...props} style={DefaultStyles.formBox} />
    </View>
  );
};

export default AuthInput;
