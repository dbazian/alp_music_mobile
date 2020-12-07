import axios from "axios";

export const ADD_TOKEN = "ADD_TOKEN";
export const SET_TOKEN = "SET_TOKEN";

export const addToken = tokenCount => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const currentTokens = getState().token.tokens;
    console.log(currentTokens);
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
          tokenCount,
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
