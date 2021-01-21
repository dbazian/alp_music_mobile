import React, { useState } from "react";
import { View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import DefaultStyles from "../../../constants/default-styles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const CustomDropdown = props => {
  return (
    <View style={[DefaultStyles.formBox, props.style]}>
      <RNPickerSelect
        style={{
          inputIOS: [DefaultStyles.bodyTextBlack],
          inputAndroid: [DefaultStyles.bodyTextBlack],
          placeholder: {
            fontSize: hp("2%"),
            textAlign: "center",
            fontFamily: "Raleway-Semibold",
          },
        }}
        useNativeAndroidPickerStyle={false}
        value={props.value}
        key={props.key}
        placeholder={{ label: props.label }}
        disabled={props.disabled}
        onValueChange={props.onValueChange}
        items={props.items}
      />
    </View>
  );
};

export default CustomDropdown;
