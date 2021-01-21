import axios from "axios";

export const ADD_CREDIT = "ADD_CREDIT";
export const SET_CREDIT = "SET_CREDIT";
export const USE_CREDIT = "USE_CREDIT";

export const addCredit = creditCount => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const currentCredits = getState().credit.credits;
    const newCredits = currentCredits + creditCount;
    await axios
      .patch(
        `https://alp-music.firebaseio.com/user/${userId}/credits.json?auth=${token}`,
        {
          credits: newCredits,
        }
      )
      .then(response => {
        dispatch({
          type: ADD_CREDIT,
          credits: newCredits,
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

export const setCredit = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    await axios
      .get(`https://alp-music.firebaseio.com/user/${userId}/credits.json`)
      .then(response => {
        const resData = response.data;
        if (resData === null) {
          dispatch({ type: SET_CREDIT, credits: 0 });
        } else {
          dispatch({ type: SET_CREDIT, credits: resData.credits });
        }
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

export const useCredit = creditCount => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const currentCredits = getState().credit.credits;
    await axios
      .patch(
        `https://alp-music.firebaseio.com/user/${userId}/credits.json?auth=${token}`,
        {
          credits: currentCredits - creditCount,
        }
      )
      .then(response => {
        dispatch({
          type: USE_CREDIT,
          credits: currentCredits - creditCount,
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
