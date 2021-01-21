import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Platform, StyleSheet } from "react-native";
import { addCredit, setCredit } from "../../store/actions/creditActions";
import RNIap, {
  purchaseErrorListener,
  purchaseUpdatedListener,
} from "react-native-iap";
import MainButton from "../components/Interactive/MainButton";
import HeaderText from "../components/Texts/HeaderText";
import Gradient from "../components/Wrappers/Gradient";
import WaveIndicator from "../components/Indicators/WaveIndicator";

const CreditScreen = ({ navigation }) => {
  const products = useSelector(state => state.iap.products);
  const currentCredits = useSelector(state => state.credit.credits);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [buttonStyle, setButtonStyle] = useState(null);
  const itemSkus = Platform.select({
    ios: ["com.credit.id", "com.creditsThree.id", "com.creditFive.id"],
    android: ["com.credit.id", "com.creditsthree.id", "com.creditsfive.id"],
  });
  let purchaseUpdateSubscription = null;
  let purchaseErrorSubscription = null;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCredit());
  }, [currentCredits]);

  useEffect(() => {
    if (products.length > 0) {
      console.log("products loaded");
    } else {
      setButtonDisabled(true);
      setButtonStyle(styles.disabled);
      alert("problem loading purchases, please try again later.");
    }
  }, []);

  useEffect(() => {
    const loadIAP = async () => {
      RNIap.initConnection();
      RNIap.flushFailedPurchasesCachedAsPendingAndroid();
      purchaseUpdateSubscription = purchaseUpdatedListener(async purchase => {
        const receipt = purchase.transactionReceipt;
        const token = purchase.purchaseToken;
        if (receipt) {
          if (purchase.productId === "com.credit.id") {
            dispatch(addCredit(1));
          } else if (
            purchase.productId === "com.creditsthree.id" ||
            purchase.productId === "com.creditsThree.id"
          ) {
            dispatch(addCredit(3));
          } else if (
            purchase.productId === "com.creditsfive.id" ||
            purchase.productId === "com.creditFive.id"
          ) {
            dispatch(addCredit(5));
          } else {
            console.log("error adding credits");
          }
          dispatch(setCredit());
          Platform.OS === "android"
            ? await RNIap.consumePurchaseAndroid(token)
            : await RNIap.finishTransaction(purchase, true);
        }
      });
    };
    loadIAP();
    purchaseErrorSubscription = purchaseErrorListener(error => {
      console.log("purchaseErrorListener", error);
    });
    return function cleanup() {
      if (purchaseUpdateSubscription) {
        purchaseUpdateSubscription.remove();
        purchaseUpdateSubscription = null;
      }
      if (purchaseErrorSubscription) {
        purchaseErrorSubscription.remove();
        purchaseErrorSubscription = null;
      }
    };
  }, []);

  const requestPurchase = async sku => {
    try {
      setIsLoading(true);
      await RNIap.requestPurchase(sku, false);
    } catch (error) {
      console.log("error in request", error.code, error.message);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <Gradient>
        <WaveIndicator />
      </Gradient>
    );
  }

  return (
    <Gradient>
      <HeaderText>Current Credits: {currentCredits}</HeaderText>
      <MainButton
        name={"1 Credit - $19.99"}
        onPress={() => requestPurchase(itemSkus[0])}
        disabled={buttonDisabled}
        style={buttonStyle}
      />
      <MainButton
        name={"3 Credits - $49.99"}
        onPress={() => requestPurchase(itemSkus[1])}
        disabled={buttonDisabled}
        style={buttonStyle}
      />
      <MainButton
        name={"5 Credits - $79.99"}
        onPress={() => requestPurchase(itemSkus[2])}
        disabled={buttonDisabled}
        style={buttonStyle}
      />
      <MainButton
        name={"Back"}
        onPress={() => navigation.navigate({ routeName: "User" })}
      />
    </Gradient>
  );
};

const styles = StyleSheet.create({
  disabled: {
    backgroundColor: "gray",
  },
});

export default CreditScreen;
