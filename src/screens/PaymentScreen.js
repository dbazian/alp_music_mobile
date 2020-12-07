import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Text,
  Linking,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import stripe from "tipsi-stripe";
import axios from "axios";
import * as orderActions from "../../store/actions/orderActions";
import FullIndicator from "../components/Indicators/FullIndicator";
import SmallButton from "../components/Interactive/SmallButton";
import MainButton from "../components/Interactive/MainButton";
import Gradient from "../components/Wrappers/Gradient";
import CheckBox from "@react-native-community/checkbox";
import Colors from "../../constants/Colors";
import { TestKey } from "../../InitializeStripe";
import DefaultStyles from "../../constants/default-styles";
import HeaderText from "../components/Texts/HeaderText";

const PaymentScreen = props => {
  stripe.setOptions({
    publishableKey: TestKey,
  });
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
  const cartTotalAmount = useSelector(state => state.cart.totalAmount * 100);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [showCard, setShowCard] = useState(true);
  const [showTerms, setShowTerms] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const dispatch = useDispatch();

  const handleCardPayPress = async () => {
    try {
      setisLoading(true);
      setToken(null);
      const token = await stripe.paymentRequestWithCardForm({
        smsAutofillDisabled: true,
        requiredBillingAddressFields: "zip",
      });
      setToken(token.tokenId);
      setShowCard(false);
      setisLoading(false);
      Alert.alert("Your card information has been entered!");
      setShowTerms(true);
    } catch (error) {
      console.log(error);
      setisLoading(false);
    }
  };

  const handleCheckoutToggle = () => {
    setShowTerms(!showTerms);
    setShowCheckout(!showCheckout);
  };

  const handleCheckoutPress = () => {
    setisLoading(true);
    try {
      axios({
        method: "POST",
        url: "https://us-central1-alp-music.cloudfunctions.net/payWithStripe",
        data: {
          amount: cartTotalAmount,
          currency: "usd",
          token: token,
        },
      }).then(res => {
        if (res.data.code === undefined) {
          dispatch(orderActions.addOrder(cartItems, cartTotalAmount));
          Alert.alert(
            "Thank You! Navigate to User/Orders to download your file"
          );
          props.navigation.navigate({ routeName: "Cart" });
          setisLoading(false);
        } else {
          Alert.alert("There was a problem with your payment");
          props.navigation.navigate({ routeName: "Cart" });
          setisLoading(false);
        }
      });
    } catch (err) {
      setError(err);
      console.log(error);
      setisLoading(false);
    }
  };

  const handleBackToCartPress = () => {
    props.navigation.navigate({ routeName: "Cart" });
  };

  if (isLoading) {
    return <FullIndicator />;
  }

  return (
    <Gradient>
      <View style={DefaultStyles.fullCentered}>
        {showCard && (
          <View>
            <HeaderText>Step 1</HeaderText>
            <MainButton
              name={"Add Payment"}
              isLoading={isLoading}
              onPress={handleCardPayPress}
            />
          </View>
        )}
        {showTerms && (
          <View>
            <HeaderText>Step 2{"\n"}By checking you agree to our </HeaderText>
            <View style={styles.termsCheck}>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(`https://alpmusic.com/Terms.pdf`)
                }>
                <Text style={styles.link}>Terms and Conditions</Text>
              </TouchableOpacity>
              <CheckBox
                tintColors={{ true: "white", false: "white" }}
                style={{ tintColor: "white" }}
                onCheckColor={"white"}
                onTintColor={Colors.Primary}
                onChange={handleCheckoutToggle}
              />
            </View>
          </View>
        )}
        {showCheckout && (
          <View style={DefaultStyles.fullCentered}>
            <HeaderText>Step 3 - </HeaderText>
            <MainButton name={"Checkout"} onPress={handleCheckoutPress} />
            <View style={styles.buttons}>
              <SmallButton onPress={handleCheckoutToggle} name={"Back"} />
            </View>
          </View>
        )}
      </View>
      <MainButton name={"Back To Cart"} onPress={handleBackToCartPress} />
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
});

export default PaymentScreen;
