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
  faStar,
} from "@fortawesome/pro-light-svg-icons";

import Colors from "../../../constants/Colors";

const SongItem = (props) => {
  const [iconSwitch, setIconSwitch] = useState(faShoppingCart);
  const [styleToggle, setStyleToggle] = useState(styles.shown);
  const itemInCart = useSelector((state) =>
    Object.keys(state.cart.items).some((id) => parseInt(id) === props.items.id)
  );

  const itemInOrder = useSelector((state) =>
    state.order.orders.some((song) =>
      song.items.some((id) => id.id === props.items.id)
    )
  );

  const itemInFavorites = useSelector((state) =>
    state.favorite.favorites.some((id) => id.id === props.items.id)
  );

  const dispatch = useDispatch();

  const handleLicenseScreen = () => {
    props.navigation.navigate({ routeName: "License" });
  };

  useEffect(() => {
    if (itemInCart) {
      setIconSwitch(faTrash);
    } else {
      setIconSwitch(faShoppingCart);
    }
  }, [itemInCart]);

  useEffect(() => {
    if (itemInOrder) {
      setIconSwitch(faDownload);
    }
  });

  useEffect(() => {
    if (!itemInFavorites) {
      setStyleToggle(styles.shown);
    }
  }, [itemInFavorites]);

  const favoritesPress = async () => {
    await dispatch(favoriteActions.addFavorite(props.items));
    dispatch(favoriteActions.setFavorite());
    setStyleToggle(styles.hidden);
    Alert.alert("Song has been added to favorites");
  };

  const cartPress = async () => {
    if (itemInCart === false && itemInOrder === false) {
      dispatch(licenseActions.licenseInfo(props.items.id));
      handleLicenseScreen();
    }
    if (itemInCart === true && itemInOrder === false) {
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
  shown: {
    display: "flex",
  },
  hidden: {
    display: "none",
  },
});

export default withNavigation(SongItem);
