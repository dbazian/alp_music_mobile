import { StyleSheet } from "react-native";
import Colors from "./Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
  formBox: {
    backgroundColor: "white",
    borderColor: Colors.primary,
    textAlign: "center",
    height: hp("7.5%"),
    width: wp("95%"),
    marginTop: 15,
    marginBottom: 20,
    justifyContent: "center",
    borderWidth: 5,
    shadowColor: Colors.primary,
    shadowOpacity: 0.9,
    shadowOffset: { width: 0, height: 5 },
  },
  fullCentered: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
});
