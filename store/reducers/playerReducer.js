import {
  AUDIO_PLAYING,
  STOP_PLAY,
  AUDIO_LOADING,
} from "../actions/playerActions";

const initialState = {
  isAudioPlaying: false,
  isAudioLoading: false,
  stopAudio: false,
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUDIO_PLAYING:
      let playSwitch = action.isAudioPlaying;
      return { ...state, isAudioPlaying: playSwitch };
    case STOP_PLAY: {
      let stopSwitch = action.stopAudio;
      return { ...state, stopAudio: stopSwitch };
    }
    case AUDIO_LOADING:
      let loadingAudio = action.loadingAudio;
      return { ...state, isAudioLoading: loadingAudio };
    default:
      return state;
  }
};

export default playerReducer;
