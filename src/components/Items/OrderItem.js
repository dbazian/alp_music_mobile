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
import Card from "../Wrappers/Card";
import SongCard from "../Wrappers/SongCard";
import BodyText from "../Texts/BodyText";
import PlayPause from "../AudioPlayer/PlayPause";
import Download from "../AudioPlayer/Download";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../../../constants/Colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFileInvoice } from "@fortawesome/pro-light-svg-icons";

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  const songDate = moment(props.date).format("MMMM Do YYYY");

  const toggleDetails = () => {
    setShowDetails((prevState) => !prevState);
  };

  return (
    <Card>
      <View style={styles.fullContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.text}>Date Purchased: {songDate} </Text>
          <Text style={styles.text}>
            Cost: ${(props.totalAmount / 100).toFixed(2)}
          </Text>
          {props.items.map((song) => (
            <View style={styles.container} key={song.name}>
              <Text style={styles.text}>Song Title: {song.name}</Text>
            </View>
          ))}
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} onPress={toggleDetails}>
            <Text style={styles.textButton}>
              {showDetails ? "Hide Details" : "Show Details"}
            </Text>
          </TouchableOpacity>
        </View>

        {showDetails && (
          <View>
            {props.items.map((song) => (
              <View key={song.name}>
                <SongCard>
                  <View style={styles.space}>
                    <View style={styles.songText}>
                      <BodyText>{song.name}</BodyText>
                    </View>
                    <View style={styles.innerContainer}>
                      <PlayPause audioFile={song.audio} />
                      <Download audioFile={song.audio} />
                      <TouchableOpacity
                        onPress={() => {
                          Alert.alert(
                            "For commercial licensing you will be redirected to our website.",
                            "Do you wish to continue?",
                            [
                              {
                                text: "Ok",
                                onPress: () =>
                                  Linking.openURL(
                                    `https://alpmusic.sourceaudio.com/#!details?id=${props.id}`
                                  ),
                              },
                              {
                                text: "Cancel",
                                onPress: () => console.log("cancelled"),
                                style: "cancel",
                              },
                            ],
                            { cancelable: false }
                          );
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faFileInvoice}
                          size={hp("5%")}
                          color={Colors.primary}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </SongCard>
              </View>
            ))}
          </View>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  textButton: {
    color: Colors.primary,
    textAlign: "center",
    fontSize: hp("2.5%"),
  },
  innerContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  buttonView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: hp("1.5%"),
  },
  button: {
    width: wp("40%"),
  },
  text: {
    color: "white",
    fontSize: hp("2.3%"),
    textAlign: "center",
    marginBottom: 12,
  },
  space: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  songText: {
    flex: 1,
    flexDirection: "row",
  },
});

export default OrderItem;
