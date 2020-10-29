import React from "react";
import { View } from "react-native";
import { MaterialIndicator } from "react-native-indicators";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Colors from "../../../constants/Colors";

const SmallIndicator = () => {
  return (
    <View>
      <MaterialIndicator color={Colors.primary} size={hp("4.5%")} />
    </View>
  );
};

export default SmallIndicator;
