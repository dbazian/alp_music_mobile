import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { stopPlay } from "../../store/actions/playerActions";

import FavoriteItem from "../components/Items/FavoriteItem";
import MainButton from "../components/Interactive/MainButton";
import HeaderText from "../components/Texts/HeaderText";
import Gradient from "../components/Wrappers/Gradient";

const FavoriteScreen = (props) => {
  const favoriteItems = useSelector((state) => state.favorite.favorites);
  const isAudioPlaying = useSelector((state) => state.player.isAudioPlaying);
  const { goBack } = props.navigation;

  const dispatch = useDispatch();

  const backPress = () => {
    if (isAudioPlaying === true) {
      dispatch(stopPlay(true));
    }
    goBack();
  };

  useEffect(() => {
    props.navigation.addListener("didBlur", () => {
      if (isAudioPlaying === true) {
        dispatch(stopPlay(true));
      }
    });
  });

  const toCart = () => {
    props.navigation.navigate({ routeName: "Cart" });
  };

  if (favoriteItems.length === 0 || favoriteItems === undefined) {
    return (
      <Gradient>
        <HeaderText>No songs in your favorite list yet.</HeaderText>
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
          keyExtractor={(item) => item.fid}
          maxToRenderPerBatch={15}
          initialNumToRender={8}
          data={favoriteItems}
          renderItem={(itemData) => <FavoriteItem items={itemData.item} />}
        />
        <MainButton name={"Back"} onPress={backPress} />
      </Gradient>
    );
  }
};

FavoriteScreen.navigationOptions = { headerTitle: "Favorites" };

const styles = StyleSheet.create({
  full: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    height: "100%",
    width: "100%",
  },
});

export default FavoriteScreen;
