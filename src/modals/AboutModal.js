import React from "react";
import { View, Modal, Linking } from "react-native";
import BodyText from "../components/Texts/BodyText";
import MainButton from "../components/Interactive/MainButton";
import Gradient from "../components/Wrappers/Gradient";
import EmailLink from "../components/Texts/EmailLink";
import DefaultStyles from "../../constants/default-styles";
import LogoText from "../components/Logos/LogoText";
import Logo from "../components/Logos/Logo";

const AboutModal = props => {
  return (
    <Modal visible={props.visible} animationType="slide" transparent={true}>
      <Gradient>
        <LogoText />
        <BodyText>
          ALP Music is a music library and music licensing company, that is
          providing custom audio for content creators.
        </BodyText>
        <BodyText>
          ALP Music allows content creators to filter and search through our
          catalog of music and find the right song for their project.
        </BodyText>
        <BodyText>
          To learn more about ALP Music and to see our full catalog please
          visit:
        </BodyText>
        <EmailLink
          title={"www.alpmusic.com"}
          onPress={() => Linking.openURL(`https://alpmusic.com`)}
        />
        <View style={DefaultStyles.buttonContainer}>
          <MainButton name={"Back"} onPress={props.onPress} />
        </View>
        <Logo />
      </Gradient>
    </Modal>
  );
};

export default AboutModal;
