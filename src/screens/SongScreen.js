import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { stopPlay } from "../../store/actions/playerActions";
import SongItem from "../components/Items/SongItem";
import MainButton from "../components/Interactive/MainButton";
import HeaderText from "../components/Texts/HeaderText";
import Gradient from "../components/Wrappers/Gradient";

const SongScreen = (props) => {
  const filteredSongs = useSelector((state) => state.filter.filteredSongs);
  const isAudioPlaying = useSelector((state) => state.player.isAudioPlaying);
  const { goBack } = props.navigation;
  const dispatch = useDispatch();
  const backPress = () => {
    if (isAudioPlaying) {
      dispatch(stopPlay(true));
    }
    goBack();
  };

  useEffect(() => {
    props.navigation.addListener("didBlur", () => {
      if (isAudioPlaying) {
        dispatch(stopPlay(true));
      }
    });
  });

  const toCart = () => {
    props.navigation.navigate({ routeName: "Cart" });
  };

  if (filteredSongs.length === 0 || filteredSongs === undefined) {
    return (
      <Gradient>
        <HeaderText>No songs that match your search.</HeaderText>
        <MainButton name={"Back"} onPress={backPress} />
      </Gradient>
    );
  } else {
    return (
      <Gradient>
        <FlatList
          onPress={toCart}
          removeClippedSubviews={false}
          windowSize={100}
          maxToRenderPerBatch={15}
          initialNumToRender={8}
          data={filteredSongs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(itemData) => <SongItem items={itemData.item} />}
        />
        <MainButton name={"Back"} onPress={backPress} />
      </Gradient>
    );
  }
};

SongScreen.navigationOptions = { headerTitle: "Songs" };

export default SongScreen;
