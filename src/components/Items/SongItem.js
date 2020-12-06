import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { withNavigation } from "react-navigation";
import { useDispatch, useSelector } from "react-redux";
import * as cartActions from "../../../store/actions/cartActions";
import * as licenseActions from "../../../store/actions/licenseActions";
import * as favoriteActions from "../../../store/actions/favoriteActions";
import SongText from "../Texts/SongText";
import SongCard from "../Wrappers/SongCard";
import PlayPause from "../AudioPlayer/PlayPause";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faShoppingCart,
  faTrash,
  faDownload,
  faStar,
} from "@fortawesome/pro-light-svg-icons";
import Colors from "../../../constants/Colors";
import DefaultStyles from "../../../constants/default-styles";

const SongItem = props => {
  const [iconSwitch, setIconSwitch] = useState(faShoppingCart);
  const [styleToggle, setStyleToggle] = useState(styles.shown);
  const itemInCart = useSelector(state =>
    Object.keys(state.cart.items).some(id => parseInt(id) === props.items.id)
  );
  const itemInOrder = useSelector(state =>
    state.order.orders.some(song =>
      song.items.some(id => id.id === props.items.id)
    )
  );
  const itemInFavorites = useSelector(state =>
    state.favorite.favorites.some(id => id.id === props.items.id)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    itemInCart ? setIconSwitch(faTrash) : setIconSwitch(faShoppingCart);
  }, [itemInCart]);

  useEffect(() => {
    if (itemInOrder) {
      setIconSwitch(faDownload);
    }
  });

  useEffect(() => {
    itemInFavorites
      ? setStyleToggle(styles.hidden)
      : setStyleToggle(styles.shown);
  }, [itemInFavorites]);

  const favoritesPress = async () => {
    await dispatch(favoriteActions.addFavorite(props.items));
    dispatch(favoriteActions.setFavorite());
    Alert.alert("Song has been added to favorites");
  };

  const cartPress = () => {
    if (itemInCart === false && itemInOrder === false) {
      dispatch(licenseActions.licenseInfo(props.items.id));
      props.navigation.navigate({ routeName: "License" });
    } else if (itemInCart === true && itemInOrder === false) {
      dispatch(cartActions.removeFromCart(props.items));
      alert("Song has been removed from cart.");
    } else if (itemInCart === false && itemInOrder === true) {
      Alert.alert(
        "Song has already been purchased.",
        "Proceed to orders for download",
        [
          {
            text: "Ok",
            onPress: () => props.navigation.navigate({ routeName: "Orders" }),
          },
          {
            text: "Cancel",
            onPress: () => console.log("cancelled going to orders"),
          },
        ]
      );
    }
  };

  return (
    <SongCard>
      <View style={DefaultStyles.cardInnerContainer}>
        <View style={DefaultStyles.cardTextContainer}>
          <SongText>{props.items.name}</SongText>
        </View>
        <View style={DefaultStyles.cardIconContainer}>
          <PlayPause audioFile={props.items.audio} />
          <TouchableOpacity onPress={cartPress}>
            <FontAwesomeIcon
              icon={iconSwitch}
              size={hp("5%")}
              color={Colors.primary}
            />
          </TouchableOpacity>
          <View style={styleToggle}>
            <TouchableOpacity onPress={favoritesPress}>
              <FontAwesomeIcon
                icon={faStar}
                size={hp("5%")}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SongCard>
  );
};

const styles = StyleSheet.create({
  shown: {
    display: "flex",
  },
  hidden: {
    display: "none",
  },
});

export default withNavigation(SongItem);
