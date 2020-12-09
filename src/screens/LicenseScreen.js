import React, { useEffect } from "react";
import { View, StyleSheet, Alert, Linking } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { stopPlay } from "../../store/actions/playerActions";
import * as cartActions from "../../store/actions/cartActions";
import LicenseData from "../../data/LicenseData";
import RadioForm from "react-native-simple-radio-button";
import SmallButton from "../components/Interactive/SmallButton";
import Gradient from "../components/Wrappers/Gradient";
import HeaderText from "../components/Texts/HeaderText";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DefaultStyles from "../../constants/default-styles";

const LicenseScreen = props => {
  const isAudioPlaying = useSelector(state => state.player.isAudioPlaying);
  const songId = useSelector(state => state.license.data);
  const selectedSong = useSelector(state =>
    state.filter.songData.find(song => song.id === songId)
  );
  const dispatch = useDispatch();
  const { goBack } = props.navigation;

  useEffect(() => {
    props.navigation.addListener("didFocus", () => {
      if (isAudioPlaying) {
        dispatch(stopPlay(true));
      }
    });
  }, []);
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
        `mailto:info@alpmusic.com?subject=${selectedSong.name}?body=What is the intended use for this song?`
      );
      props.navigation.navigate({ routeName: "Songs" });
    }
  };

  const handleBackToSongsPress = () => {
    dispatch(cartActions.addToCart(selectedSong));
    props.navigation.navigate({ routeName: "Songs" });
  };

  const handleToCartPress = () => {
    dispatch(cartActions.addToCart(selectedSong));
    props.navigation.navigate({ routeName: "Songs" });
    props.navigation.navigate({ routeName: "Cart" });
  };

  return (
    <Gradient>
      <View style={DefaultStyles.fullCentered}>
        <HeaderText>Choose a license type</HeaderText>
        <RadioForm
          animation={true}
          buttonColor={"white"}
          selectedButtonColor={"white"}
          radio_props={LicenseData}
          initial={-1}
          onPress={purchaseSelector}
          radioStyle={{
            alignItems: "center",
            paddingVertical: 8,
            paddingHorizontal: 20,
          }}
          buttonSize={hp("3%")}
          labelStyle={{
            paddingVertical: 10,
            paddingHorizontal: 20,
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
  bottomButton: {
    margin: hp("3%"),
    width: wp("35%"),
  },
});

export default LicenseScreen;
