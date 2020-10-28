import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { withNavigation } from "react-navigation";
import { useDispatch, useSelector } from "react-redux";
import * as cartActions from "../../../store/actions/cartActions";
import * as licenseActions from "../../../store/actions/licenseAction";
import * as favoriteActions from "../../../store/actions/favoriteActions";
import BodyText from "../Texts/BodyText";
import SongCard from "../Wrappers/SongCard";
import PlayPause from "../AudioPlayer/PlayPause";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faShoppingCart,
  faTrash,
  faDownload,
} from "@fortawesome/pro-light-svg-icons";
import { faStar as falStar } from "@fortawesome/free-solid-svg-icons";

import Colors from "../../../constants/Colors";

const FavoriteItem = (props) => {
  const [iconSwitch, setIconSwitch] = useState(faShoppingCart);
  const itemInCart = useSelector((state) =>
    Object.keys(state.cart.items).some((id) => parseInt(id) === props.items.id)
  );
  const itemInOrder = useSelector((state) =>
    state.order.orders.some((song) =>
      song.items.some((id) => id.id === props.items.id)
    )
  );
  const dispatch = useDispatch();

  // LOAD FAVORITES
  useEffect(() => {
    dispatch(favoriteActions.setFavorite());
  }, []);

  // CHECK IF ITEM IS IN CART
  useEffect(() => {
    if (itemInCart) {
      setIconSwitch(faTrash);
    } else {
      setIconSwitch(faShoppingCart);
    }
  }, [itemInCart]);

  // CHECK IF ITEM HAS BEEN PURCHASED
  useEffect(() => {
    if (itemInOrder) {
      setIconSwitch(faDownload);
    }
  });

  // IF ITEM IS NOT IN CART
  const handleLicenseScreen = () => {
    props.navigation.navigate({ routeName: "License" });
  };

  // CLICK STAR ICON
  const favoritesPress = () => {
    dispatch(favoriteActions.removeFavorite(props.items.fid));
    dispatch(favoriteActions.setFavorite());
  };

  // CLICK CART ICON
  const cartPress = async () => {
    // NOT IN CART OR PURCHASED

    if (itemInCart === false && itemInOrder === false) {
      dispatch(licenseActions.licenseInfo(props.items.id));
      handleLicenseScreen();

      // IN CART BUT NOT PURCHASED
    } else if (itemInCart === true && itemInOrder === false) {
      dispatch(cartActions.removeFromCart(props.items));
      alert("Song has been removed from cart.");

      // PURCHASED
    } else if (itemInCart === false && itemInOrder === true) {
      Alert.alert(
        "Song has already been purchased.",
        "Proceed to orders for download",
        [
          {
            // CLICK DOWNLOAD ICON
            text: "Ok",
            onPress: () => props.navigation.navigate({ routeName: "Orders" }),
          },
          {
            text: "Cancel",
            onPress: () => console.log("cancelled"),
          },
        ]
      );
    }
  };

  return (
    <View>
      <SongCard>
        <View style={styles.space}>
          <View style={styles.songText}>
            <BodyText>{props.items.name}</BodyText>
          </View>
          <View style={styles.innerContainer}>
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
                icon={falStar}
                size={hp("5%")}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SongCard>
    </View>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  songText: {
    flex: 2,
    flexDirection: "row",
  },
  space: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

export default withNavigation(FavoriteItem);
