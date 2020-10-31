import React, { useState, useEffect } from "react";
import { TouchableOpacity, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import storage from "@react-native-firebase/storage";
import { audioPlaying, stopPlay, audioLoading } from "../../../store/actions/playerActions";
import { Audio } from "expo-av";
import SmallIndicator from "../Indicators/SmallIndicator";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlay, faPause } from "@fortawesome/pro-light-svg-icons";
import Colors from "../../../constants/Colors";

const PlayPause = (props) => {
  const task = storage().ref(props.audioFile).getDownloadURL();
  const stopAudio = useSelector((state) => state.player.stopAudio);
  const isAudioPlaying = useSelector((state) => state.player.isAudioPlaying);
  const isAudioLoading = useSelector((state) => state.player.isAudioLoading);
  const [soundObject, setSoundObject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadAudio, setloadAudio] = useState(false);
  const [iconToggle, setIconToggle] = useState(false);
  const [icon, setIcon] = useState(faPlay);
  const dispatch = useDispatch();

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
      } catch (error) {
        console.log(error);
      }
      audioSettings();
    };
    return function cleanUp() {
      try {
        audio.stopAsync();
        audio.unloadAsync();
      } catch (e) {
        console.log(e);
      }
    };
  }, []);

  useEffect(() => {
    iconToggle ? setIcon(faPause) : setIcon(faPlay);
  }, [iconToggle]);

  useEffect(() => {
    const playOrPause = async () => {
      let uri = await task;
      if (loadAudio) {
        setIsLoading(true);
        const soundObject = new Audio.Sound();
        await soundObject.loadAsync({ uri }, {}, true);
        setSoundObject(soundObject);
        soundObject.playAsync();
        setIconToggle(!iconToggle);
        setIsLoading(false);
      } else if (!loadAudio && soundObject != null) {
        soundObject.stopAsync();
        setIconToggle(!iconToggle);
      }
    };
    playOrPause();
  }, [loadAudio]);

  const handlePlayPause = () => {
    setloadAudio(!loadAudio);
  };

  if (isLoading) {
    return <SmallIndicator />;
  }

  return (
    <TouchableOpacity onPress={handlePlayPause}>
      <FontAwesomeIcon icon={icon} size={hp("5%")} color={Colors.primary} />
    </TouchableOpacity>
  );
};

export default PlayPause;
