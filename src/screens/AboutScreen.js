import React from "react";
import { View, Linking, StyleSheet } from "react-native";
import BodyText from "../components/Texts/BodyText";
import MainButton from "../components/Interactive/MainButton";
import Gradient from "../components/Wrappers/Gradient";
import EmailLink from "../components/Texts/EmailLink";
import LogoText from "../components/Logos/LogoText";

const AboutScreen = props => {
  const backToUser = () => {
    props.navigation.navigate({ routeName: "User" });
  };

  const toContactScreen = () => {
    props.navigation.navigate({ routeName: "Contact" });
  };

  return (
    <Gradient>
      <View style={styles.fullPage}>
        <LogoText />
        <BodyText>
          ALP Music is a music library and licensing company, that is providing
          custom audio for content creators.
        </BodyText>
        <BodyText>
          The ALP Music App allows you to filter and search through our catalog
          of music to find the right song for your project.
        </BodyText>
        <BodyText>
          To learn more about ALP Music and to see our full catalog please
          visit:
        </BodyText>
        <EmailLink
          title={"www.alpmusic.com"}
          onPress={() => Linking.openURL(`https://alpmusic.com`)}
        />
        <BodyText>
          All downloads through our app are in mp3 format. If you would like a
          wav version please contact us through our:
        </BodyText>
        <EmailLink title={"Contact Form"} onPress={toContactScreen} />
        <MainButton name={"Back"} onPress={backToUser} />
      </View>
    </Gradient>
  );
};

const styles = StyleSheet.create({
  fullPage: {
    alignItems: "center",
    height: "100%",
  },
});

export default AboutScreen;
