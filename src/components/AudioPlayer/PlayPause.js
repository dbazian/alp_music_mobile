import React, { useState, useEffect } from "react";
import { TouchableOpacity, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import storage from "@react-native-firebase/storage";
import {
  audioPlaying,
  stopPlay,
  audioLoading,
} from "../../../store/actions/playerActions";
import { Audio } from "expo-av";
import SmallIndicator from "../Indicators/SmallIndicator";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlay, faPause } from "@fortawesome/pro-light-svg-icons";
import Colors from "../../../constants/Colors";

const PlayPause = (props) => {
  const dispatch = useDispatch();

  // LOAD FROM FIREBASE VARIABLES
  let audioFile = props.audioFile;
  const reference = storage().ref(audioFile);
  let task = reference.getDownloadURL();

  //HOOKS
  const stopAudio = useSelector((state) => state.player.stopAudio);
  const isAudioPlaying = useSelector((state) => state.player.isAudioPlaying);
  const isAudioLoading = useSelector((state) => state.player.isAudioLoading);
  const [iconSwitch, setIconSwitch] = useState(faPlay);
  const [soundObject, setSoundObject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [thisAudioPlaying, setThisAudioPlaying] = useState(false);

  // LOAD AUDIO SETTINGS
  useEffect(() => {
    const audioSettings = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          playsInSilentModeIOS: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
          shouldDuckAndroid: true,
          staysActiveInBackground: false,
          playThroughEarpieceAndroid: true,
        });
      } catch (e) {
        console.log(e);
      }
      audioSettings();
    };
  }, []);

  // STOP AUDIO ON PAGE EXIT

  useEffect(() => {
    if (stopAudio === true && soundObject != null) {
      soundObject.unloadAsync();
      dispatch(audioPlaying(false));
      setThisAudioPlaying(false);
      setIconSwitch(faPlay);
      dispatch(stopPlay(false));
    }
  }, [stopAudio]);

  // MOUNTING AND UNMOUNTING
  useEffect(() => {
    Audio.setIsEnabledAsync(true);
    return function cleanUp() {
      Audio.setIsEnabledAsync(false);
      setThisAudioPlaying(false);
      dispatch(audioPlaying(false));
      dispatch(stopPlay(false));
      dispatch(audioLoading(false));
      setSoundObject(null);
      setIconSwitch(faPlay);
    };
  }, []);

  // PLAY PAUSE TOGGLE
  const handlePlayPause = async () => {
    setIsLoading(true);
    Audio.setIsEnabledAsync(true);
    dispatch(stopPlay(false));
    let uri = await task;

    //PLAY
    if (
      isAudioPlaying === false &&
      thisAudioPlaying === false &&
      isAudioLoading === false
    ) {
      dispatch(audioLoading(true));
      const soundObject = new Audio.Sound();
      await soundObject.loadAsync({ uri }, {}, true);
      setSoundObject(soundObject);
      dispatch(audioLoading(false));
      soundObject.playAsync();
      setThisAudioPlaying(true);
      dispatch(audioPlaying(true));
      setIconSwitch(faPause);

      // PAUSE
    } else if (
      thisAudioPlaying === true &&
      isAudioPlaying === true &&
      isAudioLoading === false
    ) {
      soundObject.stopAsync();
      soundObject.unloadAsync();
      setSoundObject(null);
      dispatch(audioPlaying(false));
      setThisAudioPlaying(false);
      setIconSwitch(faPlay);

      // STOP AND PLAY
    } else if (
      isAudioPlaying === true &&
      thisAudioPlaying === false &&
      isAudioLoading === false
    ) {
      dispatch(stopPlay(true));
      dispatch(audioLoading(true));
      const soundObject = new Audio.Sound();
      await soundObject.loadAsync({ uri }, {}, true);
      dispatch(audioLoading(false));
      setSoundObject(soundObject);
      soundObject.playAsync();
      dispatch(audioPlaying(true));
      setThisAudioPlaying(true);
      setIconSwitch(faPause);

      // IF LOADING
    } else if (
      isAudioLoading === true &&
      thisAudioPlaying === false &&
      isAudioPlaying === false
    ) {
      Alert.alert(
        "Wait for audio to finish loading before playing another track"
      );
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <SmallIndicator />;
  }

  return (
    <TouchableOpacity onPress={handlePlayPause}>
      <FontAwesomeIcon
        icon={iconSwitch}
        size={hp("5%")}
        color={Colors.primary}
      />
    </TouchableOpacity>
  );
};

export default PlayPause;
