import axios from "axios";
import CartModel from "../../models/CartModel";

export const ADD_TO_CART = "ADD_TO_CART";
export const SET_CART = "SET_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";

export const addToCart = cartItems => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    await axios
      .post(
        `https://alp-music.firebaseio.com/user/${userId}/cart.json?auth=${token}`,
        {
          cartItems,
        }
      )
      .then(response => {
        dispatch({
          type: ADD_TO_CART,
          cart: {
            cid: response.data.name,
            items: cartItems,
          },
        });
      })
      .catch(error => {
        if (error.response) {
          console.log("error response data", error.response.data);
        } else if (error.request) {
          console.log("error request", error.request);
        } else {
          console.log("error message", error.message);
        }
        throw error;
      });
  };
};

export const setCart = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;

    await axios
      .get(`https://alp-music.firebaseio.com/user/${userId}/cart.json`)
      .then(response => {
        const resData = response.data;
        const loadedCart = [];
        for (const key in resData) {
          loadedCart.push(
            new CartModel(
              key,
              resData[key].cartItems.id,
              resData[key].cartItems.name,
              resData[key].cartItems.audio
            )
          );
        }
        dispatch({ type: SET_CART, fetchedCart: loadedCart });
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response.data);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("error", error.message);
        }
        throw error;
      });
  };
};

export const removeFromCart = cid => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    await axios
      .delete(
        `https://alp-music.firebaseio.com/user/${userId}/cart/${cid}.json?auth=${token}`
      )
      .then(() => {
        dispatch({ type: REMOVE_FROM_CART });
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response.data);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("error", error.message);
        }
        throw error;
      });
  };
};

export const clearCart = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    await axios
      .delete(
        `https://alp-music.firebaseio.com/user/${userId}/cart.json?auth=${token}`
      )
      .then(() => {
        dispatch({ type: CLEAR_CART });
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response.data);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("error", error.message);
        }
        throw error;
      });
  };
};
