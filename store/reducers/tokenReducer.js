import { ActionSheetIOS } from "react-native";
import { ADD_TOKEN, SET_TOKEN, USE_TOKEN } from "../actions/tokenActions";

const initialState = {
  tokens: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        tokens: action.tokens,
      };

    case ADD_TOKEN:
      return {
        ...state,
        tokens: action.tokens,
      };

    case USE_TOKEN:
      return {
        ...state,
        tokens: action.tokens,
      };
  }
  return state;
};
