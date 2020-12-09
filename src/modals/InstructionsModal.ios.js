import React from "react";
import { View, Modal } from "react-native";
import HeaderText from "../components/Texts/HeaderText";
import BodyText from "../components/Texts/BodyText";
import MainButton from "../components/Interactive/MainButton";
import Gradient from "../components/Wrappers/Gradient";
import DefaultStyles from "../../constants/default-styles";

const InstructionsModal = props => {
  return (
    <Modal visible={props.visible} animationType="slide" transparent={true}>
      <Gradient>
        <HeaderText>Instructions</HeaderText>
        <BodyText>
          1.) Navigate to the user tab and press purchase credits.
        </BodyText>
        <BodyText>
          2.)Purchase either 1, 5, or 10 credits to redeem for songs.
        </BodyText>
        <BodyText>
          3.) Add desired song to your cart, your current credits and the
          credits needed will be shown at the bottom of your cart.
        </BodyText>
        <BodyText>
          4.) Press the purchase button and your song or songs will be added to
          your order screen.
        </BodyText>
        <BodyText>5.) Go to User / Orders </BodyText>
        <BodyText>
          6.) Press the download icon and choose the location you would like to
          save your audio file.
        </BodyText>
        <BodyText>
          7.) Access the audio track from the location where it was saved.
        </BodyText>
        <View style={DefaultStyles.buttonContainer}>
          <MainButton name={"Back"} onPress={props.onPress} />
        </View>
      </Gradient>
    </Modal>
  );
};

export default InstructionsModal;
