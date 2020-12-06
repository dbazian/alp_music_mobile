import { ADD_TOKEN, SET_TOKEN } from "../actions/tokenActions";

const initialState = {
  tokens: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        tokens: action.tokens,
      };

    case ADD_TOKEN: {
      alert("Your tokens have been added!");
    }
  }
  return state;
};
