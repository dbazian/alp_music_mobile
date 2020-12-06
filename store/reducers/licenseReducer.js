import { LICENSE_INFO } from "../actions/licenseActions";

const initialState = {
  data: [],
};

const licenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case LICENSE_INFO:
      return { ...state, data: action.data };
    default:
      return state;
  }
};

export default licenseReducer;
