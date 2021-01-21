import React from "react";
import { useSelector } from "react-redux";
import { View } from "react-native";
import SongText from "../Texts/SongText";
import SongCard from "../Wrappers/SongCard";
import PlayPause from "../IconButtons/PlayPause";
import Download from "../IconButtons/Download";
import Favorite from "../IconButtons/Favorite";
import ShoppingCart from "../IconButtons/ShoppingCart";
import DefaultStyles from "../../../constants/default-styles";

const Songs = props => {
  const itemInOrder = useSelector(state =>
    state.order.orders.some(song =>
      song.items.some(id => id.id === props.items.id)
    )
  );

  return (
    <SongCard>
      <View style={DefaultStyles.cardInnerContainer}>
        <View style={DefaultStyles.cardTextContainer}>
          <SongText>{props.items.name}</SongText>
        </View>
        <View style={DefaultStyles.cardIconContainer}>
          <PlayPause audioFile={props.items.audio} />
          {!itemInOrder ? (
            <ShoppingCart items={props.items} />
          ) : (
            <Download audioFile={props.items.audio} />
          )}
          <Favorite items={props.items} />
        </View>
      </View>
    </SongCard>
  );
};

export default Songs;
