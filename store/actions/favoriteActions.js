import axios from "axios";
import FavoriteModel from "../../models/FavoriteModel";

export const ADD_FAVORITE = "ADD_FAVORITE";
export const SET_FAVORITE = "SET_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";

export const addFavorite = favoriteItems => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    await axios
      .post(
        `https://alp-music.firebaseio.com/user/${userId}/favorites.json?auth=${token}`,
        {
          favoriteItems,
        }
      )
      .then(response => {
        dispatch({
          type: ADD_FAVORITE,
          favorites: {
            fid: response.data.name,
            items: favoriteItems,
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

export const setFavorite = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;

    await axios
      .get(`https://alp-music.firebaseio.com/user/${userId}/favorites.json`)
      .then(response => {
        const resData = response.data;
        const loadedFavorites = [];
        for (const key in resData) {
          loadedFavorites.push(
            new FavoriteModel(
              key,
              resData[key].favoriteItems.id,
              resData[key].favoriteItems.name,
              resData[key].favoriteItems.audio
            )
          );
        }
        dispatch({ type: SET_FAVORITE, fetchedFavorites: loadedFavorites });
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

export const removeFavorite = fid => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    await axios
      .delete(
        `https://alp-music.firebaseio.com/user/${userId}/favorites/${fid}.json?auth=${token}`
      )
      .then(() => {
        dispatch({ type: REMOVE_FAVORITE });
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
