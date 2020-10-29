import React, { useState } from "react";
import { View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import DefaultStyles from "../../../constants/default-styles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const useDropdown = (label, defaultState, options) => {
  const [selectedValue, setSelectedValue] = useState(defaultState);

  const DropdownMaker = (props) => (
    <View style={DefaultStyles.formBox}>
      <RNPickerSelect
        style={{
          inputIOS: [DefaultStyles.bodyText],
          inputAndroid: [DefaultStyles.bodyText],
          placeholder: {
            fontSize: hp("2%"),
            textAlign: "center",
            fontFamily: "Raleway-Semibold",
          },
        }}
        useNativeAndroidPickerStyle={false}
        value={selectedValue}
        placeholder={{ label }}
        disabled={props.disabled}
        onValueChange={props.onValueChange}
        items={options.map((x) => ({ label: x, value: x }))}
      />
    </View>
  );
  return [selectedValue, DropdownMaker, setSelectedValue];
};

export default useDropdown;
