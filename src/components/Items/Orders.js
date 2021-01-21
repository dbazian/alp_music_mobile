import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import moment from "moment";
import OrderCard from "../Wrappers/OrderCard";
import BodyText from "../Texts/BodyText";
import Songs from "../Items/Songs";
import Colors from "../../../constants/Colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const Orders = props => {
  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => {
    setShowDetails(prevState => !prevState);
  };

  return (
    <OrderCard>
      <View>
        <BodyText>
          Date Purchased: {moment(props.date).format("MMMM Do YYYY")}{" "}
        </BodyText>
        {props.items.map(song => (
          <View key={song.id}>
            <BodyText>Song Title: {song.name}</BodyText>
          </View>
        ))}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={toggleDetails}>
          <Text style={styles.detailsButton}>
            {showDetails ? "Hide Details" : "Show Details"}
          </Text>
        </TouchableOpacity>
        {showDetails &&
          props.items.map(song => (
            <View key={song.id}>
              <Songs items={song} />
            </View>
          ))}
      </View>
    </OrderCard>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: "column",
  },
  buttonContainer: {
    alignItems: "center",
    marginVertical: hp("1.5%"),
  },
  detailsButton: {
    color: Colors.primary,
    textAlign: "center",
    fontSize: hp("2.5%"),
  },
});

export default Orders;
