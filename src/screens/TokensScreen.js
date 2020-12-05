import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Gradient from "../components/Wrappers/Gradient";
import MainButton from "../components/Interactive/MainButton";
import Iaphub from "react-native-iaphub";

const TokensScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      setProducts(await Iaphub.getProductsForSale());
    };
    loadProducts();
  }, []);

  const tokenOne = async () => {
    try {
      await Iaphub.buy("tokenOne");
    } catch (error) {
      console.log(error);
    }
  };

  const tokenFive = async () => {
    try {
      await Iaphub.buy("tokenFive");
    } catch (error) {
      console.log(error);
    }
  };

  const tokenTen = async () => {
    try {
      await Iaphub.buy("tokenTen");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Gradient>
      <MainButton name={"Purchase 1 Token"} onPress={tokenOne} />
      <MainButton name={"Purchase 5 Tokens"} onPress={tokenFive} />
      <MainButton name={"Purchase 10 Tokens"} onPress={tokenTen} />
      <MainButton name={"Back"} />
    </Gradient>
  );
};

export default TokensScreen;
