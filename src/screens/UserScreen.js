import React, { useState, useEffect, useCallback } from "react";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { setFavorite } from "../../store/actions/favoriteActions";
import { getSongs } from "../../store/actions/filterActions";
import * as orderActions from "../../store/actions/orderActions";
import * as authActions from "../../store/actions/authActions";
import { setCredit } from "../../store/actions/creditActions";
import { setCart } from "../../store/actions/cartActions";
import Gradient from "../components/Wrappers/Gradient";
import Logo from "../components/Logos/Logo";
import LogoText from "../components/Logos/LogoText";
import Link from "../components/Texts/Link";
import FullIndicator from "../components/Indicators/FullIndicator";
import InstructionsModal from "../modals/InstructionsModal";
import ContactModal from "../modals/AboutModal";
import RNIap from "react-native-iap";
import { setProducts } from "../../store/actions/iapActions";

const UserScreen = props => {
  const [instructionModalToggle, setInstructionModalToggle] = useState(false);
  const [contactModalToggle, setContactModalToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const itemSkus = Platform.select({
    ios: ["com.credit.id", "com.creditsThree.id", "com.creditFive.id"],
    android: ["com.credit.id", "com.creditsthree.id", "com.creditsfive.id"],
  });
  const dispatch = useDispatch();

  useEffect(() => {
    loadUser();
  }, [dispatch]);

  const instructionModal = () => {
    setInstructionModalToggle(!instructionModalToggle);
  };

  const contactModal = () => {
    setContactModalToggle(!contactModalToggle);
  };

  const loadUser = useCallback(async () => {
    try {
      setIsLoading(true);
      await loadProducts();
      await dispatch(getSongs());
      await dispatch(setCart());
      await dispatch(orderActions.setOrders());
      await dispatch(setCredit());
      await dispatch(setFavorite());
      setIsLoading(false);
    } catch (error) {
      console.log("error loading", error);
      setIsLoading(false);
    }
  });

  const loadProducts = async () => {
    await RNIap.initConnection();
    const products = await RNIap.getProducts(itemSkus);
    await dispatch(setProducts(products));
  };

  if (isLoading) {
    return <FullIndicator />;
  } else {
    return (
      <Gradient>
        <InstructionsModal
          visible={instructionModalToggle}
          onPress={instructionModal}
        />
        <ContactModal visible={contactModalToggle} onPress={contactModal} />
        <LogoText />
        <Link onPress={instructionModal} title={"Instructions"} />
        <Link
          onPress={() => props.navigation.navigate({ routeName: "Credits" })}
          title={"Purchase Credits"}
        />
        <Link
          onPress={() => props.navigation.navigate({ routeName: "Orders" })}
          title={"Orders"}
        />
        <Link
          onPress={() => props.navigation.navigate({ routeName: "Contact" })}
          title={"Contact"}
        />

        <Link onPress={contactModal} title={"About"} />
        <Link onPress={() => dispatch(authActions.logout())} title={"Logout"} />
        <TouchableOpacity
          onPress={() => props.navigation.navigate({ routeName: "Search" })}>
          <Logo />
        </TouchableOpacity>
      </Gradient>
    );
  }
};

export default UserScreen;
