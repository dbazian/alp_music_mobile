import React, { useEffect, useRef } from "react";
import AlpNavigation from "./AlpNavigation";
import { useSelector } from "react-redux";
import { NavigationActions } from "react-navigation";

const NavigationContainer = () => {
  const navRef = useRef();
  const isAuth = useSelector(state => !!state.auth.token);

  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: "Auth" })
      );
    }
  }, [isAuth]);

  return <AlpNavigation ref={navRef} />;
};

export default NavigationContainer;
