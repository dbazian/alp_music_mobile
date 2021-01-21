import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import {
  filterSong,
  filterGenre,
  filterMood,
} from "../../store/actions/filterActions";
import SongInput from "../components/Interactive/SongInput";
import CustomDropdown from "../components/Interactive/CustomDropdown";
import MainButton from "../components/Interactive/MainButton";
import HeaderText from "../components/Texts/HeaderText";
import FullIndicator from "../components/Indicators/FullIndicator";
import Gradient from "../components/Wrappers/Gradient";
import DefaultStyles from "../../constants/default-styles";

const SearchScreen = props => {
  const songData = useSelector(state => state.filter.songData);
  const filteredSongs = useSelector(state => state.filter.filteredSongs);
  const [genres, setGenres] = useState([]);
  const [moods, setMoods] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);
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
      setGenres([...new Set(songData.map(x => x.genre))]);
      setMoods([...new Set(songData.map(x => x.mood))]);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    selectedGenre === null
      ? setGenres([...new Set(songData.map(x => x.genre))])
      : setMoods([...new Set(filteredSongs.map(x => x.mood))]);
    if (selectedGenre === undefined || selectedGenre === null) {
      setInputEnabled(true);
      setStyleToggle();
    } else {
      setInputEnabled(false);
      setStyleToggle(styles.disabled);
    }
  }, [selectedGenre]);

  useEffect(() => {
    selectedMood === null
      ? setMoods([...new Set(songData.map(x => x.mood))])
      : setGenres([...new Set(filteredSongs.map(x => x.genre))]);
    if (selectedMood === undefined || selectedMood === null) {
      setInputEnabled(true);
      setStyleToggle();
    } else {
      setInputEnabled(false);
      setStyleToggle(styles.disabled);
    }
  }, [selectedMood]);

  useEffect(() => {
    if (enteredSong.length === 0) {
      setHideResultsToggle(true);
      setDropdownDisabled(false);
      setDropdownStyle();
    } else {
      setHideResultsToggle(false);
      setDropdownDisabled(true);
      setDropdownStyle(styles.disabled);
    }
    songData.some(name => name.name === enteredSong)
      ? setTextValid(true)
      : setTextValid(false);
  }, [enteredSong]);

  const genreValueHandler = itemValue => {
    setSelectedGenre(itemValue);
    dispatch(filterGenre(itemValue));
  };

  const moodValueHandler = itemValue => {
    setSelectedMood(itemValue);
    dispatch(filterMood(itemValue));
  };

  const songSearchHandler = itemValue => {
    setEnteredSong(itemValue.replace(/[^\w\s]/gi, ""));
    if (enteredSong.length === 0) {
      setNameList([...new Set(songData.map(x => x.name))]);
      setTextValid(false);
    } else {
      const regex = new RegExp(`${enteredSong.trim()}`, "i");
      setNameList(nameList.filter(song => song.search(regex) >= 0).reverse());
    }
  };

  const submitPress = () => {
    if (
      selectedGenre === null &&
      selectedMood === null &&
      enteredSong.length === 0
    ) {
      Alert.alert("Please enter a song name or choose a filter.");
    } else {
      dispatch(filterSong(enteredSong, selectedGenre, selectedMood));
      props.navigation.navigate({ routeName: "Songs" });
    }
  };

  const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

  const onSubmitEditing = () => {
    if (textValid) {
      submitPress();
    } else if (textValid === false && nameList.length === 0) {
      Alert.alert("Not a valid song name, please try again.");
      setEnteredSong("");
    } else if (
      textValid === false &&
      nameList.length > 0 &&
      enteredSong.length > 0
    ) {
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
              keyExtractor={item => item.toString()}
              style={styleToggle}
              data={
                nameList.length === 1 && comp(enteredSong, nameList[0])
                  ? []
                  : nameList
              }
              value={enteredSong}
              onChangeText={songSearchHandler}
              placeholder={"Enter Song Name"}
              isEditable={inputEnabled}
              hideResults={hideResultsToggle}
              onSubmitEditing={onSubmitEditing}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => setEnteredSong(item)}
                  style={styles.touchable}>
                  <Text style={DefaultStyles.bodyTextBlack}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <View style={styles.filter}>
            <HeaderText>Filter:</HeaderText>

            <CustomDropdown
              style={dropdownStyle}
              keys={selectedGenre}
              value={selectedGenre}
              onValueChange={genreValueHandler}
              disabled={dropdownDisabled}
              label={"Genre"}
              items={genres.map(x => ({ label: x, value: x }))}
            />

            <CustomDropdown
              style={dropdownStyle}
              keys={selectedMood}
              value={selectedMood}
              onValueChange={moodValueHandler}
              disabled={dropdownDisabled}
              label={"Mood"}
              items={moods.map(x => ({ label: x, value: x }))}
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
    height: "100%",
    justifyContent: "center",
    marginBottom: 100,
  },
  search: {
    alignItems: "center",
    zIndex: 1,
  },
  disabled: {
    backgroundColor: "#D3D3D3",
  },
  touchable: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  filter: {
    width: "100%",
    alignItems: "center",
    marginTop: 100,
  },
});

export default SearchScreen;
