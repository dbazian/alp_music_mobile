import React from "react";
import { View, Modal, StyleSheet, Text, Linking } from "react-native";
import HeaderText from "../components/Texts/HeaderText";
import MainButton from "../components/Interactive/MainButton";
import Gradient from "../components/Wrappers/Gradient";
import EmailLink from "../components/Texts/EmailLink";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const HelpModal = (props) => {
  return (
    <Modal visible={props.visible} animationType="slide" transparent={true}>
      <Gradient>
        <HeaderText>Help</HeaderText>
        <View style={styles.textBox}>
          <Text style={styles.listItem}>
            For help with payments please email:
          </Text>
          <EmailLink
            title={"billing@alpmusic.com"}
            onPress={() =>
              Linking.openURL("mailto:billing@alpmusic.com?subject=Billing")
            }
          />
          <Text style={styles.listItem}>
            For general comments, questions, or inquiries please email:
          </Text>
          <EmailLink
            title={"info@alpmusic.com"}
            onPress={() => Linking.openURL("mailto:info@alpmusic.com")}
          />
          <Text style={styles.listItem}>
            To learn more about ALP Music and to see our full catalog please
            visit:
          </Text>
          <EmailLink
            title={"www.alpmusic.com"}
            onPress={() => Linking.openURL(`https://alpmusic.com`)}
          />
        </View>
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
    paddingHorizontal: 10,
  },
  buttonBox: {
    alignItems: "center",
    marginVertical: 40,
  },
  textBox: {
    paddingVertical: 20,
    alignItems: "center",
  },
});

export default HelpModal;
