import React from "react";
import { View, StyleSheet, Text } from "react-native";

import Iaphub from "react-native-iaphub";

const PaymentScreen = props => {
  /*const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        id: state.cart.items[key].id,
        name: state.cart.items[key].name,
        genre: state.cart.items[key].genre,
        mood: state.cart.items[key].mood,
        audio: state.cart.items[key].audio,
        price: state.cart.items[key].price,
        licenseType: state.cart.items[key].licenseType,
      });
    }
    return transformedCartItems;
  });
  */

  var products = Iaphub.getProductsForSale();
  console.log("test", products);

  return (
    <Gradient>
      <Text>Test</Text>
    </Gradient>
  );
};

const styles = StyleSheet.create({});

export default PaymentScreen;
