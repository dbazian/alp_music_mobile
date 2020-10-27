import React, { useState } from "react";
import {
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Alert,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import RNFetchBlob from "rn-fetch-blob";
import storage from "@react-native-firebase/storage";

import SmallIndicator from "../Indicators/SmallIndicator";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDownload } from "@fortawesome/pro-light-svg-icons";
import Colors from "../../../constants/Colors";

const Download = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const [isLoading, setIsLoading] = useState(false);

  let audioFile = props.audioFile;
  const reference = storage().ref(audioFile);
  let task = reference.getDownloadURL();

  const downloadPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Storage Permission",
          message: "App needs access to memory to download the file ",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("permissions granted");
      } else {
        console.log("permissions denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  downloadPermission();

  const downloadSong = async () => {
    Platform.select({
      android: downloadPermission(),
    });

    if (isAuth) {
      const source = await task;
      const {
        dirs: { DownloadDir },
      } = RNFetchBlob.fs;
      const { config } = RNFetchBlob;
      const aPath = DownloadDir;
      var ext = "mp3";
      var file_ex = props.audioFile;
      const configOptions = Platform.select({
        android: {
          fileCache: false,
          appendExt: ext,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path: aPath + "/" + file_ex,
            description: "Song",
          },
        },
      });
      setIsLoading(true);
      config(configOptions)
        .fetch("GET", source)
        .then((res) => {
          console.log("file_download", res);
          setIsLoading(false);
          Alert.alert("Your file is done downloading!");
        })
        .catch((errorMessage) => {
          setIsLoading(false);
          console.log("error with downloading file", errorMessage);
        });
    }
  };

  if (isLoading) {
    return <SmallIndicator />;
  }
  return (
    <TouchableOpacity onPress={downloadSong}>
      <FontAwesomeIcon
        icon={faDownload}
        size={hp("5%")}
        color={Colors.primary}
      />
    </TouchableOpacity>
  );
};

export default Download;
