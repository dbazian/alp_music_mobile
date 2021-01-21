import React from "react";
import { BarIndicator } from "react-native-indicators";
import Gradient from "../Wrappers/Gradient";

const FullIndicator = () => {
  return (
    <Gradient>
      <BarIndicator color="white" count={5} />
    </Gradient>
  );
};

export default FullIndicator;
