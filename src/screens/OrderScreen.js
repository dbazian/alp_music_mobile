import React, { useEffect } from "react";
import { View, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { stopPlay } from "../../store/actions/playerActions";

import MainButton from "../components/Interactive/MainButton";
import HeaderText from "../components/Texts/HeaderText";
import OrderItem from "../components/Items/OrderItem";
import Gradient from "../components/Wrappers/Gradient";

const OrderScreen = (props) => {
  const orders = useSelector((state) => state.order.orders);
  const isAudioPlaying = useSelector((state) => state.player.isAudioPlaying);
  const { goBack } = props.navigation;
  const dispatch = useDispatch();
  useEffect(() => {
    props.navigation.addListener("didBlur", () => {
      if (isAudioPlaying === true) {
        dispatch(stopPlay(true));
      }
    });
  });
  const backPress = () => {
    if (isAudioPlaying === true) {
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
    <View>
      <Gradient>
        <FlatList
          removeClippedSubviews={false}
          windowSize={100}
          maxToRenderPerBatch={15}
          initialNumToRender={8}
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(itemData) => (
            <OrderItem
              items={itemData.item.items}
              date={itemData.item.date}
              totalAmount={itemData.item.totalAmount}
            />
          )}
        />
        <MainButton onPress={backPress} name={"Back"} />
      </Gradient>
    </View>
  );
};

export default OrderScreen;
