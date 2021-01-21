import {
  ADD_TO_CART,
  SET_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
} from "../actions/cartActions";
import CartModel from "../../models/CartModel";

const initialState = {
  cart: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return {
        cart: action.fetchedCart,
      };

    case ADD_TO_CART: {
      const newCart = new CartModel(
        action.cid,
        action.cart.id,
        action.cart.name,
        action.cart.audio
      );

      return {
        ...state,
        cart: state.cart.concat(newCart),
      };
    }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(cart => cart.cid !== action.cid),
      };
    case CLEAR_CART:
      return initialState;
  }
  return state;
};
