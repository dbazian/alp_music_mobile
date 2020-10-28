import React, { useState } from "react";
import { TouchableOpacity, Alert } from "react-native";
import RNFetchBlob from "rn-fetch-blob";
import storage from "@react-native-firebase/storage";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import SmallIndicator from "../Indicators/SmallIndicator";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDownload } from "@fortawesome/pro-light-svg-icons";
import Colors from "../../../constants/Colors";

const Download = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const downloadSong = async () => {
    const source = await storage().ref(props.audioFile).getDownloadURL();
    const {
      dirs: { DocumentDir },
    } = RNFetchBlob.fs;
    const configOptions = {
      ios: {
        fileCache: true,
        path: DocumentDir + "/" + props.audioFile,
        appendExt: "mp3",
      },
    };
    setIsLoading(true);
    RNFetchBlob.config(configOptions)
      .fetch("GET", source)
      .then((res) => {
        RNFetchBlob.ios.previewDocument(res.path());
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        Alert.alert(
          "There was a problem downloading your file please try again later."
        );
        setIsLoading(false);
      });
    return;
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
