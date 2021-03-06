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
    fontSize: hp("2.5%"),
    fontFamily: "Raleway-Medium",
  },
  bodyText: {
    fontFamily: "Raleway-Medium",
    fontSize: hp("2%"),
    color: "white",
    textAlign: "center",
    padding: 5,
  },
  bodyTextBlack: {
    fontFamily: "Raleway-Medium",
    fontSize: hp("2%"),
    color: "black",
    textAlign: "center",
  },
  SongText: {
    fontFamily: "Raleway-Medium",
    fontSize: hp("1.8%"),
    color: "white",
  },
  cardIconContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  cardTextContainer: {
    flex: 2,
    flexDirection: "row",
  },
  cardInnerContainer: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  buttonContainer: {
    alignItems: "center",
    marginVertical: 40,
  },
  fullCentered: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
