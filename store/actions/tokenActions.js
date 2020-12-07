import axios from "axios";

export const ADD_TOKEN = "ADD_TOKEN";
export const SET_TOKEN = "SET_TOKEN";
export const USE_TOKEN = "USE_TOKEN";

export const addToken = tokenCount => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const currentTokens = getState().token.tokens;
    await axios
      .patch(
        `https://alp-music.firebaseio.com/tokens/${userId}.json?auth=${token}`,
        {
          tokens: currentTokens + tokenCount,
        }
      )
      .then(response => {
        dispatch({
          type: ADD_TOKEN,
          tokens: currentTokens + tokenCount,
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
    alert("Thanks for your purchase");
  };
};

export const setToken = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    await axios
      .get(`https://alp-music.firebaseio.com/tokens/${userId}.json`)
      .then(response => {
        const resData = response.data;
        if (resData.tokens != null) {
          dispatch({ type: SET_TOKEN, tokens: resData.tokens });
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

export const useToken = tokenCount => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const currentTokens = getState().token.tokens;
    await axios
      .patch(
        `https://alp-music.firebaseio.com/tokens/${userId}.json?auth=${token}`,
        {
          tokens: currentTokens - tokenCount,
        }
      )
      .then(response => {
        dispatch({
          type: USE_TOKEN,
          tokens: currentTokens - tokenCount,
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
    alert(`You have used ${tokenCount} tokens`);
  };
};
