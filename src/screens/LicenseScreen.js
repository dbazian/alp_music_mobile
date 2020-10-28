import React, { useEffect } from "react";
import { View, Text, StyleSheet, Alert, Linking } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { stopPlay } from "../../store/actions/playerActions";
import * as cartActions from "../../store/actions/cartActions";
import LicenseData from "../../data/LicenseData";

import RadioForm from "react-native-simple-radio-button";
import SmallButton from "../components/Interactive/SmallButton";
import Gradient from "../components/Wrappers/Gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const LicenseScreen = (props) => {
  const isAudioPlaying = useSelector((state) => state.player.isAudioPlaying);
  const songId = useSelector((state) => state.license.data);
  const dispatch = useDispatch();
  const { goBack } = props.navigation;

  useEffect(() => {
    props.navigation.addListener("didFocus", () => {
      if (isAudioPlaying) {
        dispatch(stopPlay(true));
      }
    });
  }, []);

  const selectedSong = useSelector((state) =>
    state.filter.songData.find((song) => song.id === songId)
  );

  const purchaseSelector = (value, label) => {
    if (label === 0) {
      Alert.alert("Add To Shopping Cart?", "Proceed to cart to checkout", [
        {
          text: "Back To Songs",
          onPress: () => handleBackToSongsPress(),
        },
        {
          text: "To Checkout",
          onPress: () => handleToCartPress(),
        },
        {
          text: "Cancel",
          onPress: () => props.navigation.navigate({ routeName: "Songs" }),
        },
      ]);
    } else {
      Linking.openURL(
        `https://alpmusic.sourceaudio.com/#!details?id=${songId}`
      );
      props.navigation.navigate({ routeName: "Songs" });
    }
  };

  const handleBackToSongsPress = () => {
    dispatch(cartActions.addToCart(selectedSong));
    props.navigation.navigate({ routeName: "Songs" });
  };

  const handleToCartPress = async () => {
    dispatch(cartActions.addToCart(selectedSong));
    props.navigation.navigate({ routeName: "Songs" });
    props.navigation.navigate({ routeName: "Cart" });
  };

  return (
    <Gradient>
      <View style={styles.container}>
        <Text style={styles.text}>What will you be using this song for?</Text>
        <RadioForm
          animation={true}
          buttonColor={"white"}
          radio_props={LicenseData}
          initial={-1}
          onPress={purchaseSelector}
          radioStyle={{
            alignItems: "center",
            marginHorizontal: wp("8%"),
          }}
          buttonSize={hp("3%")}
          labelStyle={{
            fontSize: wp("4.7%"),
            padding: hp("1.5%"),
            color: "white",
          }}
        />
        <View style={styles.bottomButton}>
          <SmallButton name={"Back"} onPress={() => goBack()} />
        </View>
      </View>
    </Gradient>
  );
};

const styles = StyleSheet.create({
  container: {
    opacity: 0.92,
    height: hp("100%"),
    width: wp("100%"),
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: hp("2.7%"),
    marginBottom: hp("8%"),
  },
  bottomButton: {
    margin: hp("10%"),
    width: wp("35%"),
  },
});

export default LicenseScreen;
