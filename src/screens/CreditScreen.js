import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCredit, setCredit } from "../../store/actions/creditActions";
import Gradient from "../components/Wrappers/Gradient";
import MainButton from "../components/Interactive/MainButton";
import HeaderText from "../components/Texts/HeaderText";

const CreditScreen = ({ navigation }) => {
  const currentCredits = useSelector(state => state.credit.credits);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadCredits = async () => {
      dispatch(setCredit());
    };
    loadCredits();
  }, []);

  const creditOne = async () => {
    try {
      console.log("used one credit");
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
    try {
      console.log("used five credits");
    } catch (error) {
      console.log(error);
      setError(error);
    }
    if (error === null) {
      await dispatch(setCredit());
      await dispatch(addCredit(5));
    }
  };

  const creditTen = async () => {
    try {
      console.log("used 10 credits");
    } catch (error) {
      console.log(error);
      setError(error);
    }
    if (error === null) {
      await dispatch(setCredit());
      await dispatch(addCredit(10));
    }
  };

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
