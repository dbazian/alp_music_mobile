import React, { useState, useEffect, useCallback } from "react";
import { Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Iaphub from "react-native-iaphub";
import { getSongs } from "../../store/actions/filterActions";
import { stopPlay } from "../../store/actions/playerActions";
import * as orderActions from "../../store/actions/orderActions";
import * as authActions from "../../store/actions/authActions";
import { setToken } from "../../store/actions/tokenActions";
import Gradient from "../components/Wrappers/Gradient";
import Logo from "../components/Logos/Logo";
import LogoText from "../components/Logos/LogoText";
import Link from "../components/Texts/Link";
import FullIndicator from "../components/Indicators/FullIndicator";
import HeaderText from "../components/Texts/HeaderText";
import InstructionsModal from "../modals/InstructionsModal";
import HelpModal from "../modals/HelpModal";

const UserScreen = props => {
  const user = useSelector(state => state.auth.userId);
  const [instructionModalToggle, setInstructionModalToggle] = useState(false);
  const [helpModalToggle, setHelpModalToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    setError(null);
    setIsLoading(true);
    loadProducts();
    setIsLoading(false);
  }, [dispatch]);

  const logout = () => {
    dispatch(authActions.logout());
  };

  const orderNav = () => {
    dispatch(stopPlay());
    props.navigation.navigate({ routeName: "Orders" });
  };

  const tokenScreen = () => {
    dispatch(stopPlay());
    props.navigation.navigate({ routeName: "Tokens" });
  };

  const instructionModal = () => {
    setInstructionModalToggle(!instructionModalToggle);
  };

  const helpModal = () => {
    setHelpModalToggle(!helpModalToggle);
  };

  const loadProducts = useCallback(async () => {
    try {
      //dispatch(setToken());
      dispatch(getSongs());
      dispatch(orderActions.setOrders());
    } catch (error) {
      console.log("error loading products");
      setError(error.message);
    }
  });

  if (error) {
    return (
      <Gradient>
        <HeaderText>An error occured!</HeaderText>
        <Button
          title="Try Again"
          onPress={loadProducts}
          color={"white"}></Button>
      </Gradient>
    );
  }

  if (isLoading) {
    return <FullIndicator />;
  } else {
    return (
      <Gradient>
        <InstructionsModal
          visible={instructionModalToggle}
          onPress={instructionModal}
        />
        <HelpModal visible={helpModalToggle} onPress={helpModal} />
        <LogoText />
        <Link onPress={tokenScreen} title={"Purchase Tokens"} />
        <Link onPress={orderNav} title={"Orders"} />
        <Link onPress={instructionModal} title={"Download Instructions"} />
        <Link onPress={helpModal} title={"Help"} />
        <Link onPress={logout} title={"Logout"} />
        <Logo />
      </Gradient>
    );
  }
};

export default UserScreen;
