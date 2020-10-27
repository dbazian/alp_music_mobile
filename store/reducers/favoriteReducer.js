import {
  ADD_FAVORITE,
  SET_FAVORITE,
  REMOVE_FAVORITE,
} from "../actions/favoriteActions";
import FavoriteModel from "../../models/FavoriteModel";

const initialState = {
  favorites: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FAVORITE:
      return {
        favorites: action.fetchedFavorites,
      };

    case ADD_FAVORITE: {
      const newFavorite = new FavoriteModel(
        action.fid,
        action.favorites.id,
        action.favorites.name,
        action.favorites.audio
      );
      return {
        ...state,
        favorites: state.favorites.concat(newFavorite),
      };
    }
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(
          (favorite) => favorite.fid !== action.fid
        ),
      };
  }
  return state;
};
