import { ActionSheetIOS } from "react-native";

export const SET_PRODUCTS = "SET_PRODUCTS";

export const setProducts = productList => {
  return {
    type: SET_PRODUCTS,
    productList: productList,
  };
};
