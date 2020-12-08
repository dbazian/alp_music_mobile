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
      try {
        setIsLoading(true);
        await RNIap.initConnection();
        const products = await RNIap.getProducts(itemSkus);
        setProductList(products);
        dispatch(setCredit());
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    connect();
    return (cleanup = async () => {
      await RNIap.endConnection();
    });
  }, []);

  const creditOne = async () => {
    setError(null);
    try {
      await RNIap.requestPurchase(itemSkus[0]);
    } catch (error) {
      console.log(error);
      setError(error);
    }
    if (error === null) {
      await dispatch(setCredit());
      await dispatch(addCredit(1));
    }
  };

  const creditFive = async () => {
    setError(null);
    try {
      await RNIap.requestPurchase(itemSkus[1]);
    } catch (error) {
      setError(error);
    }
    if (error === null) {
      await dispatch(setCredit());
      await dispatch(addCredit(5));
    }
  };

  const creditTen = async () => {
    setError(null);
    try {
      await RNIap.requestPurchase(itemSkus[2]);
    } catch (error) {
      setError(error);
    }
    if (error === null) {
      await dispatch(setCredit());
      await dispatch(addCredit(10));
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
      <MainButton name={"1 Credit - $19.99"} onPress={creditOne} />
      <MainButton name={"5 Credits - $79.99"} onPress={creditFive} />
      <MainButton name={"10 Credits - $139.99"} onPress={creditTen} />
      <MainButton
        name={"Back"}
        onPress={() => navigation.navigate({ routeName: "User" })}
      />
    </Gradient>
  );
};

export default CreditScreen;
