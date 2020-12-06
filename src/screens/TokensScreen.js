import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToken } from "../../store/actions/tokenActions";
import Gradient from "../components/Wrappers/Gradient";
import MainButton from "../components/Interactive/MainButton";
import Iaphub from "react-native-iaphub";

const TokensScreen = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadProducts = async () => {
      setProducts(await Iaphub.getProductsForSale());
    };
    loadProducts();
  }, []);

  const tokenOne = async () => {
    try {
      console.log("token one");
      //  await Iaphub.buy("tokenOne");
    } catch (error) {
      console.log(error);
      setError(error);
    }
    if (error === null) {
      dispatch(addToken(1));
    }
  };

  const tokenFive = async () => {
    try {
      console.log("token one");

      //  await Iaphub.buy("tokenFive");
    } catch (error) {
      console.log(error);
      setError(error);
    }
    if (error === null) {
      dispatch(addToken(5));
    }
  };

  const tokenTen = async () => {
    try {
      console.log("token one");
      //   await Iaphub.buy("tokenTen");
    } catch (error) {
      console.log(error);
      setError(error);
    }
    if (error === null) {
      dispatch(addToken(10));
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
