import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCredit, setCredit } from "../../store/actions/creditActions";
import Gradient from "../components/Wrappers/Gradient";
import MainButton from "../components/Interactive/MainButton";
import HeaderText from "../components/Texts/HeaderText";
import { BarIndicator } from "react-native-indicators";
import RNIap from "react-native-iap";

const CreditScreen = ({ navigation }) => {
  const currentCredits = useSelector(state => state.credit.credits);
  const itemSkus = ["com.credit.id", "com.creditThree.id", "com.creditFive.id"];
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const connect = async () => {
      dispatch(setCredit());
      try {
        const result = await RNIap.initConnection();
        console.log("result", result);
      } catch (e) {
        console.log(e);
      }
    };
    connect();
  }, []);

  const requestPurchase = async (sku, credits) => {
    setError(null);
    try {
      setIsLoading(true);
      const products = await RNIap.getProducts(itemSkus);
      setProductList(products);
      await RNIap.requestPurchase(sku);
      const purchases = await RNIap.getAvailablePurchases();
      console.log(purchases);
      await RNIap.finishTransactionIOS(purchases.transactionID, true);
      await dispatch(setCredit());
      await dispatch(addCredit(credits));
      setIsLoading(false);
    } catch (err) {
      console.log("request purchase error", err);
      setError(err);
      alert("Purchase cancelled or error trying to purchase.");
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Gradient>
        <BarIndicator color="white" count={5} />
      </Gradient>
    );
  }

  return (
    <Gradient>
      <HeaderText>Current Credits: {currentCredits}</HeaderText>
      <MainButton
        name={"1 Credit - $19.99"}
        onPress={() => requestPurchase(itemSkus[0], 1)}
      />
      <MainButton
        name={"3 Credits - $49.99"}
        onPress={() => requestPurchase(itemSkus[1], 3)}
      />
      <MainButton
        name={"5 Credits - $99.99"}
        onPress={() => requestPurchase(itemSkus[2], 5)}
      />
      <MainButton
        name={"Back"}
        onPress={() => navigation.navigate({ routeName: "User" })}
      />
    </Gradient>
  );
};

export default CreditScreen;
