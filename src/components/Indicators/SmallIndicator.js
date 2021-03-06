import React from "react";
import { View } from "react-native";
import { MaterialIndicator } from "react-native-indicators";
import Colors from "../../../constants/Colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const SmallIndicator = props => {
  return (
    <View>
      <MaterialIndicator
        color={Colors.primary}
        animating={props.animating}
        size={hp("4.5%")}
      />
    </View>
  );
};

export default SmallIndicator;
