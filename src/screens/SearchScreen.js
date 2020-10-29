import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Text, Alert } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { filterSong, filterGenre, filterMood } from "../../store/actions/filterActions";
import { stopPlay } from "../../store/actions/playerActions";
import SongInput from "../components/Interactive/SongInput";
import useDropdown from "../components/Interactive/Dropdown";
import MainButton from "../components/Interactive/MainButton";
import HeaderText from "../components/Texts/HeaderText";
import FullIndicator from "../components/Indicators/FullIndicator";
import Gradient from "../components/Wrappers/Gradient";

const SearchScreen = (props) => {
  const songData = useSelector((state) => state.filter.songData);
  const filteredSongs = useSelector((state) => state.filter.filteredSongs);
  const isAudioPlaying = useSelector((state) => state.player.isAudioPlaying);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, GenreDropdown, setSelectedGenre] = useDropdown("Genre", null, genres);
  const [moods, setMoods] = useState([]);
  const [selectedMood, MoodDropdown, setSelectedMood] = useDropdown("Mood", null, moods);
  const [enteredSong, setEnteredSong] = useState("");
  const [hideResultsToggle, setHideResultsToggle] = useState(true);
  const [nameList, setNameList] = useState([]);
  const [textValid, setTextValid] = useState(false);
  const [styleToggle, setStyleToggle] = useState();
  const [dropdownStyle, setDropdownStyle] = useState();
  const [inputEnabled, setInputEnabled] = useState(false);
  const [dropdownDisabled, setDropdownDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    props.navigation.addListener("didBlur", () => {
      setSelectedGenre(null);
      setSelectedMood(null);
      setEnteredSong("");
    });
    props.navigation.addListener("didFocus", () => {
      setIsLoading(true);
      if (isAudioPlaying === true) {
        dispatch(stopPlay(true));
      }
      setGenres([...new Set(songData.map((x) => x.genre))]);
      setMoods([...new Set(songData.map((x) => x.mood))]);
      setIsLoading(false);
    });
  }, []);

  // ON GENRE CHANGE
  useEffect(() => {
    if (selectedGenre === null) {
      setGenres([...new Set(songData.map((x) => x.genre))]);
    } else {
      setMoods([...new Set(filteredSongs.map((x) => x.mood))]);
    }
    if (selectedGenre === undefined || selectedGenre === null) {
      setInputEnabled(true);
      setStyleToggle();
    } else {
      setInputEnabled(false);
      setStyleToggle(styles.disabled);
    }
  }, [selectedGenre]);

  // ON MOOD CHANGE
  useEffect(() => {
    if (selectedMood === null) {
      setMoods([...new Set(songData.map((x) => x.mood))]);
    } else {
      setGenres([...new Set(filteredSongs.map((x) => x.genre))]);
    }
    if (selectedMood === undefined || selectedMood === null) {
      setInputEnabled(true);
      setStyleToggle();
    } else {
      setInputEnabled(false);
      setStyleToggle(styles.disabled);
    }
  }, [selectedMood]);

  // ON TEXT INPUT
  useEffect(() => {
    if (enteredSong.length === 0) {
      setHideResultsToggle(true);
      setDropdownDisabled(false);
      setDropdownStyle();
    } else if (enteredSong.length > 1) {
      setHideResultsToggle(false);
      setDropdownDisabled(true);
      setDropdownStyle(styles.disabled);
    }
    if (songData.some((name) => name.name === enteredSong)) {
      setTextValid(true);
    } else {
      setTextValid(false);
    }
  }, [enteredSong]);

  // CHANGE HANDLERS
  const genreValueHandler = (itemValue) => {
    setSelectedGenre(itemValue);
    dispatch(filterGenre(itemValue));
  };

  const moodValueHandler = (itemValue) => {
    setSelectedMood(itemValue);
    dispatch(filterMood(itemValue));
  };

  const songSearchHandler = (itemValue) => {
    setEnteredSong(itemValue.replace(/[^\w\s]/gi, ""));
    if (enteredSong.length === 0) {
      setNameList([...new Set(songData.map((x) => x.name))]);
      setTextValid(false);
    } else if (enteredSong.length > 0) {
      const regex = new RegExp(`${enteredSong.trim()}`, "i");
      setNameList(nameList.filter((song) => song.search(regex) >= 0).reverse());
    } else {
      setNameList([...new Set(songData.map((x) => x.name))]);
      setTextValid(false);
    }
  };

  // ON SUBMIT
  const submitPress = () => {
    if (selectedGenre === null && selectedMood === null && enteredSong.length === 0) {
      Alert.alert("Please enter a song name or choose a filter.");
    } else {
      dispatch(filterSong(enteredSong, selectedGenre, selectedMood));
      props.navigation.navigate({ routeName: "Songs" });
    }
  };

  // TRIM AND LOWERCASE ENTERED TEXT AND NAME LIST
  const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

  // ON KEYBOARD ENTER
  const onSubmitEditing = () => {
    if (textValid === true) {
      submitPress();
    } else if (textValid === false && nameList.length === 0) {
      Alert.alert("Not a valid song name, please try again.");
      setEnteredSong("");
    } else if (textValid === false && nameList.length > 0 && enteredSong.length > 0) {
      setEnteredSong(nameList[0]);
    }
    setHideResultsToggle(true);
  };

  if (isLoading) {
    return <FullIndicator />;
  }

  return (
    <Gradient>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={styles.centered}>
          <HeaderText>Song Name:</HeaderText>
          <View style={styles.search}>
            <SongInput
              keyExtractor={(item) => item.toString()}
              style={styleToggle}
              data={nameList.length === 1 && comp(enteredSong, nameList[0]) ? [] : nameList}
              value={enteredSong}
              onChangeText={songSearchHandler}
              placeholder={"Enter Song Name"}
              isEditable={inputEnabled}
              hideResults={hideResultsToggle}
              onSubmitEditing={onSubmitEditing}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => setEnteredSong(item)} style={styles.touchable}>
                  <Text style={styles.text}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <View style={styles.filter}>
            <HeaderText>Filter:</HeaderText>
            <GenreDropdown
              style={dropdownStyle}
              selectedValue={selectedGenre}
              onValueChange={genreValueHandler}
              disabled={dropdownDisabled}
            />
            <MoodDropdown
              style={dropdownStyle}
              selectedValue={selectedMood}
              onValueChange={moodValueHandler}
              disabled={dropdownDisabled}
            />
            <MainButton name={"Submit"} onPress={submitPress} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Gradient>
  );
};

const styles = StyleSheet.create({
  centered: {
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  disabled: {
    backgroundColor: "#D3D3D3",
  },
  text: {
    color: "black",
    fontSize: hp("2.5%"),
  },
  touchable: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  search: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
    zIndex: 1,
  },
  filter: {
    width: "100%",
    alignItems: "center",
    marginTop: 100,
  },
});

export default SearchScreen;
