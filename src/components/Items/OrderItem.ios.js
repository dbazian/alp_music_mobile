import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import moment from "moment";
import OrderCard from "../Wrappers/OrderCard";
import SongCard from "../Wrappers/SongCard";
import BodyText from "../Texts/BodyText";
import SongText from "../Texts/SongText";
import PlayPause from "../AudioPlayer/PlayPause";
import Download from "../AudioPlayer/Download";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Colors from "../../../constants/Colors";
import DefaultStyles from "../../../constants/default-styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFileInvoice } from "@fortawesome/pro-light-svg-icons";

const OrderItem = props => {
  const songDate = moment(props.date).format("MMMM Do YYYY");
  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => {
    setShowDetails(prevState => !prevState);
  };

  return (
    <OrderCard>
      <View>
        <BodyText>Date Purchased: {songDate} </BodyText>
        {props.items.map(song => (
          <BodyText key={song.name}>Song Title: {song.name}</BodyText>
        ))}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={toggleDetails}>
            <Text style={styles.detailsButton}>
              {showDetails ? "Hide Details" : "Show Details"}
            </Text>
          </TouchableOpacity>
        </View>
        {showDetails && (
          <View>
            {props.items.map(song => (
              <SongCard key={song.name}>
                <View style={DefaultStyles.cardInnerContainer}>
                  <View style={DefaultStyles.cardTextContainer}>
                    <SongText>{song.name}</SongText>
                  </View>
                  <View style={DefaultStyles.cardIconContainer}>
                    <PlayPause audioFile={song.audio} />
                    <Download audioFile={song.audio} />
                  </View>
                </View>
              </SongCard>
            ))}
          </View>
        )}
      </View>
    </OrderCard>
  );
};

const styles = StyleSheet.create({
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

export default OrderItem;
