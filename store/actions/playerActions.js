export const AUDIO_PLAYING = "AUDIO_PLAYING";
export const STOP_PLAY = "STOP_PLAY";
export const AUDIO_LOADING = "AUDIO_LOADING";

export const audioPlaying = (isAudioPlaying) => {
  return {
    type: AUDIO_PLAYING,
    isAudioPlaying,
  };
};

export const stopPlay = (stopAudio) => {
  return {
    type: STOP_PLAY,
    stopAudio,
  };
};

export const audioLoading = (loadingAudio) => {
  return {
    type: AUDIO_LOADING,
    loadingAudio,
  };
};
