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
  const itemSkus = ["com.credit.id", "com.creditFive.id", "com.creditTen.id"];
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
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
    if (error === null) {
      await dispatch(setCredit());
      await dispatch(addCredit(credits));
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
        name={"5 Credits - $79.99"}
        onPress={() => requestPurchase(itemSkus[1], 5)}
      />
      <MainButton
        name={"10 Credits - $139.99"}
        onPress={() => requestPurchase(itemSkus[2], 10)}
      />
      <MainButton
        name={"Back"}
        onPress={() => navigation.navigate({ routeName: "User" })}
      />
    </Gradient>
  );
};

export default CreditScreen;
