import React, { useState, useEffect } from "react";
import { TouchableOpacity, Alert } from "react-native";
import { withNavigation } from "react-navigation";
import { useDispatch, useSelector } from "react-redux";
import SmallIndicator from "../Indicators/SmallIndicator";
import * as cartActions from "../../../store/actions/cartActions";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faShoppingCart, faTrash } from "@fortawesome/pro-light-svg-icons";
import Colors from "../../../constants/Colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const ShoppingCart = props => {
  const itemInCart = useSelector(state =>
    state.cart.cart.some(item => item.id === props.items.id)
  );
  const itemId = useSelector(state => state.cart.cart);
  const [iconSwitch, setIconSwitch] = useState(faShoppingCart);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    itemInCart ? setIconSwitch(faTrash) : setIconSwitch(faShoppingCart);
  }, [itemInCart]);

  const handleToCartPress = () => {
    props.navigation.navigate({ routeName: "Songs" });
    props.navigation.navigate({ routeName: "Cart" });
  };

  const cartPress = async () => {
    if (!itemInCart) {
      setIsLoading(true);
      await dispatch(cartActions.addToCart(props.items));
      await dispatch(cartActions.setCart());
      setIsLoading(false);
      Alert.alert("Song added to cart!", "Proceed to checkout?", [
        {
          text: "Add more songs",
        },
        {
          text: "Checkout",
          onPress: () => handleToCartPress(),
        },
      ]);
    } else {
      for (id of itemId) {
        if (id.id === props.items.id) {
          await dispatch(cartActions.removeFromCart(id.cid));
          await dispatch(cartActions.setCart());
        }
      }
    }
  };

  if (isLoading) {
    return <SmallIndicator />;
  }

  return (
    <TouchableOpacity onPress={cartPress}>
      <FontAwesomeIcon
        icon={iconSwitch}
        size={hp("5%")}
        color={Colors.primary}
      />
    </TouchableOpacity>
  );
};

export default withNavigation(ShoppingCart);
