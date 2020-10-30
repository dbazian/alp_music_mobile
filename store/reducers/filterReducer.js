import { FILTER_SONG, FILTER_GENRE, RESET_FILTERS, FILTER_MOOD, GET_SONGS } from "../actions/filterActions";

const initialState = {
  songData: [],
  filteredSongs: [],
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SONGS:
      return {
        songData: action.fetchedSongs,
        filteredSongs: action.fetchedSongs,
      };

    case RESET_FILTERS: {
      state = initialState;
    }

    case FILTER_SONG: {
      const selectedGenre = action.selectedGenre;
      const selectedMood = action.selectedMood;
      const enteredSong = action.enteredSong;
      const filterSongs = state.songData.filter((song) => {
        if (selectedGenre != song.genre && selectedGenre != null) {
          return false;
        }
        if (selectedMood != song.mood && selectedMood != null) {
          return false;
        }
        if (enteredSong != song.name && selectedMood === null && selectedGenre == null) {
          return false;
        }
        {
          return true;
        }
      });
      return { ...state, filteredSongs: filterSongs };
    }

    case FILTER_GENRE: {
      const selectedGenre = action.selectedGenre;
      const filterGenre = state.songData.filter((song) => {
        if (selectedGenre != song.genre) {
          return false;
        }
        {
          return true;
        }
      });
      return { ...state, filteredSongs: filterGenre };
    }

    case FILTER_MOOD: {
      const selectedMood = action.selectedMood;
      const filterMood = state.songData.filter((song) => {
        if (selectedMood != song.mood) {
          return false;
        }
        {
          return true;
        }
      });
      return { ...state, filteredSongs: filterMood };
    }
    default:
      return state;
  }
};
export default filterReducer;
