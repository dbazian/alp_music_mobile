import React from "react";
import { View, Text, StyleSheet, Modal, Button } from "react-native";
import RadioForm from "react-native-simple-radio-button";
import SmallButton from "../components/Interactive/SmallButton";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const PurchaseModal = (props) => {
  return (
    <Modal visible={props.visible} animationType="slide" transparent={true}>
      <View style={styles.container}>
        <Text style={styles.text}>What will you be using this song for?</Text>
        <RadioForm
          animation={true}
          radio_props={props.radio_props}
          initial={-1}
          onPress={props.purchaseSelector}
          radioStyle={{
            alignItems: "center",
            marginHorizontal: hp("7%"),
          }}
          buttonSize={hp("4%")}
          labelStyle={{
            fontSize: wp("3%"),
            padding: hp("3%"),
          }}
        />
        <View style={styles.bottomButton}>
          <SmallButton name={"Back"} onPress={props.onPress} />
        </View>
      </View>
    </Modal>
  );
};

PurchaseModal.navigationOptions = { headerTitle: "Purchase Options" };

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    opacity: 0.92,
    height: hp("100%"),
    width: wp("100%"),
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "black",
    fontSize: hp("3%"),
    marginBottom: hp("8%"),
  },
  form: {
    width: "100%",
    justifyContent: "center",
  },
  bottomButton: {
    width: wp("35%"),
  },
});

export default PurchaseModal;
