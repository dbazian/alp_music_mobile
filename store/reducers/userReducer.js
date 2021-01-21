import { GET_USER_NAME } from "../actions/userActions";

const initialState = {
  firstName: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_NAME:
      return {
        firstName: action.firstName,
      };
  }
  return state;
};
