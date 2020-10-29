import React from "react";
import { View, Modal, Linking } from "react-native";
import HeaderText from "../components/Texts/HeaderText";
import BodyText from "../components/Texts/BodyText";
import MainButton from "../components/Interactive/MainButton";
import Gradient from "../components/Wrappers/Gradient";
import EmailLink from "../components/Texts/EmailLink";
import DefaultStyles from "../../constants/default-styles";

const HelpModal = (props) => {
  return (
    <Modal visible={props.visible} animationType="slide" transparent={true}>
      <Gradient>
        <HeaderText>Help</HeaderText>
        <BodyText>For help with payments please email:</BodyText>
        <EmailLink
          title={"billing@alpmusic.com"}
          onPress={() => Linking.openURL("mailto:billing@alpmusic.com?subject=Billing")}
        />
        <BodyText>For general comments, questions, or inquiries please email:</BodyText>
        <EmailLink title={"info@alpmusic.com"} onPress={() => Linking.openURL("mailto:info@alpmusic.com")} />
        <BodyText>To learn more about ALP Music and to see our full catalog please visit:</BodyText>
        <EmailLink title={"www.alpmusic.com"} onPress={() => Linking.openURL(`https://alpmusic.com`)} />
        <View style={DefaultStyles.buttonContainer}>
          <MainButton name={"Back"} onPress={props.onPress} />
        </View>
      </Gradient>
    </Modal>
  );
};

export default HelpModal;
