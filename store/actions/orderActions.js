import axios from "axios";
import OrderModel from "../../models/OrderModel";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const addOrder = cartItems => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();
    await axios
      .post(
        `https://alp-music.firebaseio.com/user/${userId}/orders.json?auth=${token}`,
        {
          cartItems,
          date: date.toISOString(),
        }
      )
      .then(response => {
        dispatch({
          type: ADD_ORDER,
          orders: {
            id: response.data.name,
            items: cartItems,
            date: date.toISOString(),
          },
        });
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

export const setOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    await axios
      .get(`https://alp-music.firebaseio.com/user/${userId}/orders.json`)
      .then(response => {
        const resData = response.data;
        const loadedOrders = [];
        for (const key in resData) {
          loadedOrders.push(
            new OrderModel(
              key,
              resData[key].cartItems,
              new Date(resData[key].date)
            )
          );
        }
        dispatch({ type: SET_ORDERS, orders: loadedOrders });
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
