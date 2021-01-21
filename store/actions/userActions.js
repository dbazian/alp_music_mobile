import axios from "axios";

export const SET_USER_NAME = "SET_USER_NAME";
export const GET_USER_NAME = "GET_USER_NAME";

export const setUserName = firstName => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    await axios
      .post(
        `https://alp-music.firebaseio.com/user/${userId}/name.json?auth=${token}`,
        {
          firstName,
        }
      )
      .then(response => {
        dispatch({
          type: SET_USER_NAME,
          user: {
            uid: response.data.name,
            firstName: response.data.firstName,
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

export const getUserName = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;

    await axios
      .get(`https://alp-music.firebaseio.com/user/${userId}/name.json`)
      .then(response => {
        const resData = response.data;
        let userName = "";
        for (const key in resData) {
          userName = resData[key].firstName;
        }

        dispatch({ type: GET_USER_NAME, firstName: userName });
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
