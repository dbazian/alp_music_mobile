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
import PublishableKey from "../../InitializeStripe";
import * as orderActions from "../../store/actions/orderActions";
import FullIndicator from "../components/Indicators/FullIndicator";
import SmallButton from "../components/Interactive/SmallButton";
import MainButton from "../components/Interactive/MainButton";
import Gradient from "../components/Wrappers/Gradient";
import AuthInput from "../components/Interactive/AuthInput";
import CheckBox from "@react-native-community/checkbox";
import Colors from "../../constants/Colors";

const PaymentScreen = (props) => {
  stripe.setOptions({
    publishableKey: PublishableKey,
  });

  // ITEMS IN CART
  const cartItems = useSelector((state) => {
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

  const cartTotalAmount = useSelector((state) => state.cart.totalAmount * 100);

  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [value, setValue] = useState(null);

  // TOGGLES
  const [loading, setLoading] = useState(false);
  const [showCard, setShowCard] = useState(true);
  const [showEmail, setShowEmail] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const dispatch = useDispatch();

  const handleCardPayPress = async () => {
    try {
      setLoading(true);
      setToken(null);
      const token = await stripe.paymentRequestWithCardForm({
        smsAutofillDisabled: true,
        requiredBillingAddressFields: "zip",
      });
      setToken(token.tokenId);
      setShowCard(false);
      setLoading(false);
      Alert.alert("Your card information has been entered!");
      setShowTerms(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleEmailChange = (value) => {
    setValue(value);
  };

  const handleTermsToggle = () => {
    setShowTerms(!showTerms);
    setShowEmail(!showEmail);
  };

  const handleCheckoutToggle = () => {
    setShowTerms(!showTerms);
    setShowCheckout(!showCheckout);
  };

  const handleCheckoutPress = () => {
    setLoading(true);
    try {
      axios({
        method: "POST",
        url: "https://us-central1-alp-music.cloudfunctions.net/payWithStripe",
        data: {
          amount: 0,
          currency: "usd",
          token: token,
        },
      }).then((res) => {
        if (res.data.code === undefined) {
          dispatch(orderActions.addOrder(cartItems, cartTotalAmount));
          Alert.alert(
            "Thank You! Navigate to User/Orders to download your file"
          );
          props.navigation.navigate({ routeName: "Cart" });
          setLoading(false);
        } else {
          Alert.alert("There was a problem with your payment");
          props.navigation.navigate({ routeName: "Cart" });
          setLoading(false);
        }
      });
    } catch (err) {
      setError(err);
      console.log(error);
      setLoading(false);
    }
  };

  const handleBackToCartPress = () => {
    props.navigation.navigate({ routeName: "Cart" });
  };

  if (loading) {
    return <FullIndicator />;
  }

  return (
    <Gradient>
      <View style={styles.inner}>
        {/* ADD CARD */}
        {showCard && (
          <View style={styles.section}>
            <Text style={styles.instruction}>Step 1</Text>
            <MainButton
              name={"Add Payment"}
              loading={loading}
              onPress={handleCardPayPress}
            />
          </View>
        )}

        {/* ADD EMAIL 
        {showEmail && (
          <View style={styles.section}>
            <Text style={styles.instruction}>
              Step 2 - Enter email for receipt.
            </Text>
            <AuthInput
              placeholder={"Email"}
              keyboardType="email-address"
              required
              autoCapitalize="none"
              onChangeText={handleEmailChange}
              value={value}
              inititalValue=""
            />
            <MainButton name={"Next"} onPress={handleTermsToggle} />
          </View>
        )}
        */}

        {/* CHECK TERMS */}
        {showTerms && (
          <View style={styles.section}>
            <View style={styles.checkbox}>
              <Text style={styles.instruction}>
                Step 3 - By checking accept you agree to our{" "}
              </Text>
              <View style={styles.termsCheck}>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(`https://alpmusic.com/Terms.pdf`)
                  }
                >
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
            {/*}    <View style={styles.buttons}>
              <SmallButton onPress={handleTermsToggle} name={"Back"} />
                </View> */}
          </View>
        )}

        {/* CHECKOUT*/}
        {showCheckout && (
          <View style={styles.section}>
            <Text style={styles.instruction}>Step 4 - </Text>
            <MainButton name={"Checkout"} onPress={handleCheckoutPress} />
            <View style={styles.buttons}>
              <SmallButton onPress={handleCheckoutToggle} name={"Back"} />
            </View>
          </View>
        )}
      </View>

      {/* BACK TO CART */}
      <View style={styles.section}>
        <MainButton name={"To Cart"} onPress={handleBackToCartPress} />
      </View>
    </Gradient>
  );
};

const styles = StyleSheet.create({
  termsCheck: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  inner: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  section: {
    width: "100%",
    alignItems: "center",
  },
  instruction: {
    color: "white",
    fontSize: hp("2.5%"),
  },
  link: {
    color: "white",
    fontSize: hp("3%"),
    fontStyle: "italic",
    textDecorationLine: "underline",
    marginHorizontal: 20,
  },
  checkbox: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 5,
    width: "100%",
    justifyContent: "center",
  },
  buttons: {
    width: "30%",
  },
});

export default PaymentScreen;
