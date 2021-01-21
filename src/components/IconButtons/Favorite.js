import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import SmallIndicator from "../Indicators/SmallIndicator";
import * as favoriteActions from "../../../store/actions/favoriteActions";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/pro-light-svg-icons";
import Colors from "../../../constants/Colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const Favorite = props => {
  const itemInFavorites = useSelector(state =>
    state.favorite.favorites.some(item => item.id === props.items.id)
  );
  const favoriteId = useSelector(state => state.favorite.favorites);
  const [iconSwitch, setIconSwitch] = useState(emptyStar);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    itemInFavorites ? setIconSwitch(solidStar) : setIconSwitch(emptyStar);
  }, [itemInFavorites]);

  const favoritePress = async () => {
    if (!itemInFavorites) {
      setIsLoading(true);
      await dispatch(favoriteActions.addFavorite(props.items));
      await dispatch(favoriteActions.setFavorite());
      setIsLoading(false);
    } else {
      for (id of favoriteId) {
        if (id.id === props.items.id) {
          await dispatch(favoriteActions.removeFavorite(id.fid));
          await dispatch(favoriteActions.setFavorite());
        }
      }
    }
  };

  if (isLoading) {
    return <SmallIndicator />;
  }

  return (
    <TouchableOpacity onPress={favoritePress}>
      <FontAwesomeIcon
        icon={iconSwitch}
        size={hp("5%")}
        color={Colors.primary}
      />
    </TouchableOpacity>
  );
};

export default Favorite;
