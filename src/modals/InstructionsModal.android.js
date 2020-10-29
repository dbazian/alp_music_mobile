import React from "react";
import { View, Modal } from "react-native";
import HeaderText from "../components/Texts/HeaderText";
import BodyText from "../components/Texts/BodyText";
import MainButton from "../components/Interactive/MainButton";
import Gradient from "../components/Wrappers/Gradient";
import DefaultStyles from "../../constants/default-styles";

const InstructionsModal = (props) => {
  return (
    <Modal visible={props.visible} animationType="slide" transparent={true}>
      <Gradient>
        <HeaderText>Download Instructions</HeaderText>
        <BodyText>1.) After purchasing a song go to the user screen and click orders.</BodyText>
        <BodyText>2.) Go to the order that has the song you would like to download.</BodyText>
        <BodyText>3.) Click show details</BodyText>
        <BodyText>4.) Click on the download icon next to the song.</BodyText>
        <BodyText>5.) Once you recieve the alert your song will be available to use.</BodyText>
        <BodyText>6.) Access the audio track from your files/audio folder</BodyText>
        <View style={DefaultStyles.buttonContainer}>
          <MainButton name={"Back"} onPress={props.onPress} />
        </View>
      </Gradient>
    </Modal>
  );
};

export default InstructionsModal;
