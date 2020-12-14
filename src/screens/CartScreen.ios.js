import React, { useState, useEffect } from "react";
import {
  FlatList,
  Alert,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { stopPlay } from "../../store/actions/playerActions";
import { addOrder } from "../../store/actions/orderActions";
import { useCredit, setCredit } from "../../store/actions/creditActions";
import CheckBox from "@react-native-community/checkbox";
import SongItem from "../components/Items/SongItem.android";
import BodyText from "../components/Texts/BodyText";
import HeaderText from "../components/Texts/HeaderText";
import MainButton from "../components/Interactive/MainButton";
import Gradient from "../components/Wrappers/Gradient";
import Colors from "../../constants/Colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const CartScreen = props => {
  const isAudioPlaying = useSelector(state => state.player.isAudioPlaying);
  const myCredits = useSelector(state => state.credit.credits);
  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        id: state.cart.items[key].id,
        name: state.cart.items[key].name,
        genre: state.cart.items[key].genre,
        mood: state.cart.items[key].mood,
        audio: state.cart.items[key].audio,
        price: state.cart.items[key].price,
        licenseType: state.cart.items[key].licenseType,
      });
    }
    return transformedCartItems;
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [styleSwitch, setStyleSwitch] = useState(styles.disabled);
  const dispatch = useDispatch();

  useEffect(() => {
    props.navigation.addListener("didBlur", () => {
      if (isAudioPlaying) {
        dispatch(stopPlay(true));
      }
    });
  });

  useEffect(() => {
    setButtonDisabled(true);
    setStyleSwitch(styles.disabled);
  }, []);

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
                await dispatch(setCredit());
              } catch (e) {
                console.log(e);
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
      alert(
        "You have agreed to the terms and conditions, you can proceed to purchase."
      );
    } else {
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
        <BodyText> Credits Needed: {cartItems.length}</BodyText>
      </Gradient>
    );
  }

  return (
    <Gradient>
      <FlatList
        removeClippedSubviews={false}
        windowSize={100}
        maxToRenderPerBatch={15}
        initialNumToRender={8}
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        renderItem={itemData => <SongItem items={itemData.item} deletable />}
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
    borderColor: "white",
    borderWidth: 1,
    width: "94%",
  },
});

CartScreen.navigationOptions = {
  headerTitle: "Cart",
};

export default CartScreen;
