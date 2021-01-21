import React, { useState, useEffect } from "react";
import {
  FlatList,
  Alert,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Linking,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../store/actions/cartActions";
import { stopPlay } from "../../store/actions/playerActions";
import { addOrder } from "../../store/actions/orderActions";
import { useCredit, setCredit } from "../../store/actions/creditActions";
import CheckBox from "@react-native-community/checkbox";
import Songs from "../components/Items/Songs";
import BodyText from "../components/Texts/BodyText";
import HeaderText from "../components/Texts/HeaderText";
import MainButton from "../components/Interactive/MainButton";
import Gradient from "../components/Wrappers/Gradient";
import Colors from "../../constants/Colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const CartScreen = props => {
  const isAudioPlaying = useSelector(state => state.player.isAudioPlaying);
  const myCredits = useSelector(state => state.credit.credits);
  const cartItems = useSelector(state => state.cart.cart);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [styleSwitch, setStyleSwitch] = useState(styles.disabled);
  const dispatch = useDispatch();
  useEffect(() => {
    props.navigation.addListener("didBlur", () => {
      if (isAudioPlaying) {
        dispatch(stopPlay(true));
      }
    });
    props.navigation.addListener("didFocus", () => {
      setButtonDisabled(true);
      setStyleSwitch(styles.disabled);
      setToggleCheckBox(false);
    });
  });

  useEffect(() => {
    if (buttonDisabled === true) {
      setStyleSwitch(styles.disabled);
    } else {
      setStyleSwitch("");
    }
  }, [buttonDisabled]);

  const handlePurchasePress = () => {
    if (isAudioPlaying) {
      dispatch(stopPlay(true));
    }
    if (myCredits >= cartItems.length) {
      Alert.alert(
        `You are about to use ${cartItems.length} credits`,
        "Would you like to proceed",
        [
          {
            text: "Ok",
            onPress: async () => {
              try {
                await dispatch(useCredit(cartItems.length));
                await dispatch(addOrder(cartItems));
                await dispatch(clearCart());
                await dispatch(setCredit());
              } catch (err) {
                console.log("error purchasing song", err);
                alert(
                  "There was a problem purchasing your song, please try again."
                );
              }
              Alert.alert(
                `You have used ${cartItems.length} credits`,
                "Proceed to orders screen to download?",
                [
                  {
                    text: "Ok",
                    onPress: () =>
                      props.navigation.navigate({ routeName: "Orders" }),
                  },
                  {
                    text: "Cancel",
                    onPress: () => console.log("stay on cart page"),
                  },
                ]
              );
            },
          },
          {
            text: "Cancel",
            onPress: () => console.log("cancelled purchase"),
          },
        ]
      );
    } else {
      Alert.alert(
        "Not enough credits to purchase.",
        "Proceed to purchase credits?",
        [
          {
            text: "Ok",
            onPress: () => props.navigation.navigate({ routeName: "Credits" }),
          },
          {
            text: "Cancel",
            onPress: () => console.log("cancelled going to orders"),
          },
        ]
      );
    }
  };

  const handleTerms = () => {
    if (buttonDisabled === true) {
      setToggleCheckBox(true);
    } else {
      setToggleCheckBox(false);
      alert(
        "You must agree to the terms and conditions to proceed to purchase."
      );
    }
    setButtonDisabled(!buttonDisabled);
  };
  if (cartItems.length === 0) {
    return (
      <Gradient>
        <HeaderText> Your cart is empty. </HeaderText>
        <BodyText>Credits: {myCredits}</BodyText>
      </Gradient>
    );
  }
  return (
    <Gradient>
      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={itemData => <Songs items={itemData.item} deletable />}
        style={styles.list}
      />
      <View style={styles.creditView}>
        <BodyText>Credits: {myCredits}</BodyText>
        <BodyText> Credits Needed: {cartItems.length}</BodyText>
      </View>
      <View>
        <HeaderText>By checking you agree to our </HeaderText>
        <View style={styles.termsCheck}>
          <TouchableOpacity
            onPress={() => Linking.openURL(`https://alpmusic.com/Terms.pdf`)}>
            <Text style={styles.link}>Terms and Conditions</Text>
          </TouchableOpacity>
          <CheckBox
            tintColors={{ true: "white", false: "white" }}
            style={{ tintColor: "white" }}
            onCheckColor={"white"}
            onTintColor={Colors.Primary}
            onChange={handleTerms}
            value={toggleCheckBox}
          />
        </View>
      </View>
      <MainButton
        name={"Purchase"}
        onPress={handlePurchasePress}
        disabled={buttonDisabled}
        style={styleSwitch}
      />
    </Gradient>
  );
};

const styles = StyleSheet.create({
  list: { marginTop: 25 },
  termsCheck: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  link: {
    color: "white",
    fontSize: hp("3%"),
    fontStyle: "italic",
    textDecorationLine: "underline",
    marginHorizontal: 20,
  },
  buttons: {
    width: "30%",
  },
  disabled: {
    backgroundColor: "gray",
  },
  creditView: {
    width: "94%",
  },
});

export default CartScreen;
