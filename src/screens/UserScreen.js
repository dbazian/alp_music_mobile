import React, { useState, useEffect, useCallback } from "react";
import { Button } from "react-native";
import { useDispatch } from "react-redux";
import { getSongs } from "../../store/actions/filterActions";
import { stopPlay } from "../../store/actions/playerActions";
import * as orderActions from "../../store/actions/orderActions";
import * as authActions from "../../store/actions/authActions";
import { setCredit } from "../../store/actions/creditActions";
import Gradient from "../components/Wrappers/Gradient";
import Logo from "../components/Logos/Logo";
import LogoText from "../components/Logos/LogoText";
import Link from "../components/Texts/Link";
import FullIndicator from "../components/Indicators/FullIndicator";
import HeaderText from "../components/Texts/HeaderText";
import InstructionsModal from "../modals/InstructionsModal";
import HelpModal from "../modals/HelpModal";

const UserScreen = props => {
  const [instructionModalToggle, setInstructionModalToggle] = useState(false);
  const [helpModalToggle, setHelpModalToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    setError(null);
    setIsLoading(true);
    loadUser();
    setIsLoading(false);
  }, [dispatch]);

  const logout = () => {
    dispatch(authActions.logout());
  };

  const orderNav = () => {
    dispatch(stopPlay());
    props.navigation.navigate({ routeName: "Orders" });
  };

  const creditNav = () => {
    dispatch(stopPlay());
    props.navigation.navigate({ routeName: "Credits" });
  };

  const instructionModal = () => {
    setInstructionModalToggle(!instructionModalToggle);
  };

  const helpModal = () => {
    setHelpModalToggle(!helpModalToggle);
  };

  const loadUser = useCallback(async () => {
    try {
      await dispatch(getSongs());
      await dispatch(orderActions.setOrders());
      await dispatch(setCredit());
    } catch (error) {
      console.log("error loading products");
      setError(error.message);
    }
  });

  if (error) {
    return (
      <Gradient>
        <HeaderText>An error occured!</HeaderText>
        <Button title="Try Again" onPress={loadUser} color={"white"}></Button>
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
        <Link onPress={creditNav} title={"Purchase Credits"} />
        <Link onPress={orderNav} title={"Orders"} />
        <Link onPress={instructionModal} title={"Instructions"} />
        <Link onPress={helpModal} title={"Help"} />
        <Link onPress={logout} title={"Logout"} />
        <Logo />
      </Gradient>
    );
  }
};

export default UserScreen;
