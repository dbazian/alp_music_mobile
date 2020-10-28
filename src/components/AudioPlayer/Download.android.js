import React, { useState } from "react";
import {
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  Linking,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import RNFetchBlob from "rn-fetch-blob";
import storage from "@react-native-firebase/storage";
import SmallIndicator from "../Indicators/SmallIndicator";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDownload } from "@fortawesome/pro-light-svg-icons";
import Colors from "../../../constants/Colors";

const Download = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const task = storage().ref(props.audioFile).getDownloadURL();

  const downloadPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("permissions granted");
        const source = await task;
        let dirs = RNFetchBlob.fs.dirs;
        setIsLoading(true);
        RNFetchBlob.config({
          fileCache: false,
          appendExt: "mp3",
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path: dirs.DownloadDir + "/" + props.audioFile,
            description: "Song",
          },
        })
          .fetch("GET", source)
          .then((res) => {
            console.log("file_download", res);
            setIsLoading(false);
            Alert.alert(
              "Your file is done downloading and added to Files/Audio!"
            );
          })
          .catch((errorMessage) => {
            setIsLoading(false);
            console.log("error with downloading file", errorMessage);
            Alert.alert(
              "There was an error downloading file please try again later."
            );
          });
      } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
        console.log("permission denied");
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        Alert.alert(
          "In order to download this file you will need to accept permissions in your settings",
          "Do you wish to continue?",
          [
            {
              text: "Ok",
              onPress: () => Linking.openSettings(),
            },
            {
              text: "Cancel",
              onPress: () => console.log("cancelled"),
              style: "cancel",
            },
          ],
          { cancelable: false }
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  if (isLoading) {
    return <SmallIndicator />;
  }
  return (
    <TouchableOpacity onPress={downloadPermission}>
      <FontAwesomeIcon
        icon={faDownload}
        size={hp("5%")}
        color={Colors.primary}
      />
    </TouchableOpacity>
  );
};

export default Download;
