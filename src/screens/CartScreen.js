import React, { useEffect } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { stopPlay } from "../../store/actions/playerActions";
import SongItem from "../components/Items/SongItem";
import HeaderText from "../components/Texts/HeaderText";
import MainButton from "../components/Interactive/MainButton";
import Gradient from "../components/Wrappers/Gradient";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const CartScreen = (props) => {
  const isAudioPlaying = useSelector((state) => state.player.isAudioPlaying);
  const seenTotalAmount = useSelector((state) => state.cart.totalAmount);

  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        id: state.cart.items[key].id,
        name: state.cart.items[key].name,
        genre: state.cart.items[key].genre,
        mood: state.cart.items[key].mood,
        audio: state.cart.items[key].audio,
        price: state.cart.items[key].price,
        licenseType: state.cart.items[key].licenseType,
      });
    }
    return transformedCartItems;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    props.navigation.addListener("didBlur", () => {
      if (isAudioPlaying === true) {
        dispatch(stopPlay(true));
      }
    });
  });

  const handlePurchasePress = () => {
    if (isAudioPlaying === true) {
      dispatch(stopPlay(true));
    }
    props.navigation.navigate({ routeName: "Payment" });
  };

  if (cartItems.length === 0) {
    return (
      <Gradient>
        <HeaderText> Your cart is empty. </HeaderText>
      </Gradient>
    );
  }

  return (
    <Gradient>
      <FlatList
        removeClippedSubviews={false}
        windowSize={100}
        maxToRenderPerBatch={15}
        initialNumToRender={8}
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(itemData) => <SongItem items={itemData.item} deletable />}
      />
      <Text style={styles.text}>Total: ${seenTotalAmount.toFixed(2)}</Text>
      <MainButton name={"Purchase"} onPress={handlePurchasePress} />
    </Gradient>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Raleway-Medium",
    fontSize: hp("3%"),
    color: "white",
    flex: 2,
  },
});

CartScreen.navigationOptions = {
  headerTitle: "Shopping Cart",
};

export default CartScreen;
