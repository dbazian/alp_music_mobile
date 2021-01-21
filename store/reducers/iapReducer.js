import { SET_PRODUCTS } from "../actions/iapActions";
import RNIap from "react-native-iap";
import { Platform } from "react-native";

const initialState = {
  products: [],
};

const iapReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return { products: action.productList };
    default:
      return state;
  }
};

export default iapReducer;
