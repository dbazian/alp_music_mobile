import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Alert } from "react-native";
import { withNavigation } from "react-navigation";
import { useDispatch, useSelector } from "react-redux";
import * as cartActions from "../../../store/actions/cartActions";
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
} from "@fortawesome/pro-light-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Colors from "../../../constants/Colors";
import DefaultStyles from "../../../constants/default-styles";

const FavoriteItem = props => {
  const [iconSwitch, setIconSwitch] = useState(faShoppingCart);
  const itemInCart = useSelector(state =>
    Object.keys(state.cart.items).some(id => parseInt(id) === props.items.id)
  );
  const itemInOrder = useSelector(state =>
    state.order.orders.some(song =>
      song.items.some(id => id.id === props.items.id)
    )
  );
  const selectedSong = useSelector(state =>
    state.filter.songData.find(song => song.id === props.items.id)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(favoriteActions.setFavorite());
  }, []);

  useEffect(() => {
    itemInCart ? setIconSwitch(faTrash) : setIconSwitch(faShoppingCart);
  }, [itemInCart]);

  useEffect(() => {
    if (itemInOrder) {
      setIconSwitch(faDownload);
    }
  });

  const favoritesPress = async () => {
    await dispatch(favoriteActions.removeFavorite(props.items.fid));
    dispatch(favoriteActions.setFavorite());
  };

  const cartPress = async () => {
    if (itemInCart === false && itemInOrder === false) {
      Alert.alert("Add To Shopping Cart?", "Proceed to cart to checkout", [
        {
          text: "Back To Songs",
          onPress: () => handleBackToSongsPress(),
        },
        {
          text: "To Checkout",
          onPress: () => handleToCartPress(),
        },
      ]);
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

  const handleBackToSongsPress = () => {
    dispatch(cartActions.addToCart(selectedSong));
    props.navigation.navigate({ routeName: "Songs" });
  };

  const handleToCartPress = () => {
    dispatch(cartActions.addToCart(selectedSong));
    props.navigation.navigate({ routeName: "Songs" });
    props.navigation.navigate({ routeName: "Cart" });
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
          <TouchableOpacity onPress={favoritesPress}>
            <FontAwesomeIcon
              icon={faStar}
              size={hp("5%")}
              color={Colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SongCard>
  );
};

export default withNavigation(FavoriteItem);
