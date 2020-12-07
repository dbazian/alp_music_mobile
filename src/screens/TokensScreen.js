import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToken, setToken } from "../../store/actions/tokenActions";
import Gradient from "../components/Wrappers/Gradient";
import MainButton from "../components/Interactive/MainButton";
import Iaphub from "react-native-iaphub";
const TokensScreen = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const tokenOne = async () => {
    try {
      console.log("token one");
    } catch (error) {
      console.log(error);
      setError(error);
    }
    if (error === null) {
      await dispatch(setToken());
      await dispatch(addToken(1));
    }
  };

  const tokenFive = async () => {
    try {
      console.log("token one");
    } catch (error) {
      console.log(error);
      setError(error);
    }
    if (error === null) {
      await dispatch(setToken());
      await dispatch(addToken(5));
    }
  };

  const tokenTen = async () => {
    try {
      console.log("token one");
    } catch (error) {
      console.log(error);
      setError(error);
    }
    if (error === null) {
      await dispatch(setToken());
      await dispatch(addToken(10));
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
