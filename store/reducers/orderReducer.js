import { ADD_ORDER, SET_ORDERS } from "../actions/orderActions";
import OrderModel from "../../models/OrderModel";

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        orders: action.orders,
      };

    case ADD_ORDER: {
      const newOrder = new OrderModel(action.orders.id, action.orders.items, action.orders.amount, action.orders.date);
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
    }
  }
  return state;
};
