import React from "react";
import { View, Modal, StyleSheet, Text } from "react-native";
import HeaderText from "../components/Texts/HeaderText";
import MainButton from "../components/Interactive/MainButton";
import Gradient from "../components/Wrappers/Gradient";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const InstructionsModal = (props) => {
  return (
    <Modal visible={props.visible} animationType="slide" transparent={true}>
      <Gradient>
        <HeaderText>Download Instructions</HeaderText>
        <Text style={styles.listItem}>
          1.) After purchasing a song go to the user screen and click orders.
        </Text>
        <Text style={styles.listItem}>
          2.) Go to the order that has the song you would like to download.
        </Text>
        <Text style={styles.listItem}>3.) Click show details</Text>
        <Text style={styles.listItem}>
          4.) Click on the download icon next to the song.
        </Text>
        <Text style={styles.listItem}>
          5.) Choose the location you would like to save your audio file.
        </Text>
        <Text style={styles.listItem}>
          6.) Access the audio track from the location where it was saved.
        </Text>
        <View style={styles.buttonBox}>
          <MainButton name={"Back"} onPress={props.onPress} />
        </View>
      </Gradient>
    </Modal>
  );
};

const styles = StyleSheet.create({
  listItem: {
    fontFamily: "Raleway-Medium",
    fontSize: hp("2.5%"),
    color: "white",
    margin: 5,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  buttonBox: {
    alignItems: "center",
    marginVertical: 40,
  },
});

export default InstructionsModal;
