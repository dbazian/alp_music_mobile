import React, { useEffect } from "react";
import { FlatList, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { stopPlay } from "../../store/actions/playerActions";
import { addOrder } from "../../store/actions/orderActions";
import { useToken, setToken } from "../../store/actions/tokenActions";
import SongItem from "../components/Items/SongItem";
import BodyText from "../components/Texts/BodyText";
import HeaderText from "../components/Texts/HeaderText";
import MainButton from "../components/Interactive/MainButton";
import Gradient from "../components/Wrappers/Gradient";

const CartScreen = props => {
  const isAudioPlaying = useSelector(state => state.player.isAudioPlaying);
  const myTokens = useSelector(state => state.token.tokens);
  const cartItems = useSelector(state => {
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
      if (isAudioPlaying) {
        dispatch(stopPlay(true));
      }
    });
  });

  const handlePurchasePress = () => {
    if (isAudioPlaying) {
      dispatch(stopPlay(true));
    }
    if (myTokens >= cartItems.length) {
      dispatch(useToken(cartItems.length));
      dispatch(addOrder(cartItems));
      dispatch(setToken());
    } else {
      Alert.alert(
        "You need more tokens to purhcase.",
        "Proceed to purchase tokens?",
        [
          {
            text: "Ok",
            onPress: () => props.navigation.navigate({ routeName: "Tokens" }),
          },
          {
            text: "Cancel",
            onPress: () => console.log("cancelled going to orders"),
          },
        ]
      );
    }
  };

  if (cartItems.length === 0) {
    return (
      <Gradient>
        <HeaderText> Your cart is empty. </HeaderText>
        <BodyText>Tokens: {myTokens}</BodyText>
        <BodyText> Tokens Needed: {cartItems.length}</BodyText>
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
        keyExtractor={item => item.id.toString()}
        renderItem={itemData => <SongItem items={itemData.item} deletable />}
      />
      <BodyText>Tokens: {myTokens}</BodyText>
      <BodyText> Tokens Needed: {cartItems.length}</BodyText>
      <MainButton name={"Purchase"} onPress={handlePurchasePress} />
    </Gradient>
  );
};

CartScreen.navigationOptions = {
  headerTitle: "Cart",
};

export default CartScreen;
