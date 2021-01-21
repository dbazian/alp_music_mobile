import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { stopPlay } from "../../store/actions/playerActions";
import MainButton from "../components/Interactive/MainButton";
import HeaderText from "../components/Texts/HeaderText";
import Orders from "../components/Items/Orders";
import Gradient from "../components/Wrappers/Gradient";

const OrderScreen = props => {
  const orders = useSelector(state => state.order.orders);
  const isAudioPlaying = useSelector(state => state.player.isAudioPlaying);
  const { goBack } = props.navigation;
  const dispatch = useDispatch();
  useEffect(() => {
    props.navigation.addListener("didBlur", () => {
      if (isAudioPlaying) {
        dispatch(stopPlay(true));
      }
    });
  });

  const backPress = () => {
    if (isAudioPlaying) {
      dispatch(stopPlay());
    }
    goBack();
  };

  if (orders.length === 0) {
    return (
      <Gradient>
        <HeaderText>No Orders Yet</HeaderText>
        <MainButton
          onPress={() => props.navigation.navigate({ routeName: "User" })}
          name={"Back"}
        />
      </Gradient>
    );
  }

  return (
    <Gradient>
      <FlatList
        removeClippedSubviews={false}
        maxToRenderPerBatch={15}
        initialNumToRender={8}
        data={orders}
        keyExtractor={item => item.id.toString()}
        renderItem={itemData => (
          <Orders items={itemData.item.items} date={itemData.item.date} />
        )}
      />
      <MainButton onPress={backPress} name={"Back"} />
    </Gradient>
  );
};

export default OrderScreen;
