import { ADD_CREDIT, SET_CREDIT, USE_CREDIT } from "../actions/creditActions";

const initialState = {
  credits: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CREDIT:
      return {
        ...state,
        credits: action.credits,
      };

    case ADD_CREDIT:
      return {
        ...state,
        credits: action.credits,
      };

    case USE_CREDIT:
      return {
        ...state,
        credits: action.credits,
      };
  }
  return state;
};
