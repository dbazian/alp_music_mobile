import SONGMODEL from "../../models/SongModel";

export const FILTER_SONG = "FILTER_SONG";
export const FILTER_GENRE = "FILTER_GENRE";
export const FILTER_MOOD = "FILTER_MOOD";
export const RESET_FILTERS = "RESET_FILTERS";
export const GET_SONGS = "SET_SONGS";

export const filterSong = (enteredSong, selectedGenre, selectedMood) => {
  return {
    type: FILTER_SONG,
    enteredSong,
    selectedGenre,
    selectedMood,
  };
};

export const filterGenre = (selectedGenre) => {
  return {
    type: FILTER_GENRE,
    selectedGenre,
  };
};

export const filterMood = (selectedMood) => {
  return {
    type: FILTER_MOOD,
    selectedMood,
  };
};

export const resetFilters = () => {
  return {
    type: RESET_FILTERS,
  };
};

export const getSongs = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://alp-music.firebaseio.com/songs.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await response.json();
      const loadedSongs = [];
      for (const key in resData) {
        loadedSongs.push(
          new SONGMODEL(
            key,
            resData[key].id,
            resData[key].name,
            resData[key].genre,
            resData[key].mood,
            resData[key].audio,
            resData[key].price,
            resData[key].licenseType
          )
        );
      }
      dispatch({ type: GET_SONGS, fetchedSongs: loadedSongs });
    } catch (err) {
      throw err;
    }
  };
};
