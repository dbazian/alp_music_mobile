import React from "react";
import { StyleSheet, View } from "react-native";
import AutoComplete from "react-native-autocomplete-input";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Input = (props) => {
  return (
    <View style={styles.viewContainer}>
      <AutoComplete
        style={[styles.formBox, props.style]}
        listStyle={styles.listStyle}
        autoCapitalize="none"
        autoCorrect={false}
        keyExtractor={props.keyExtractor}
        data={props.data}
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        editable={props.isEditable}
        hideResults={props.hideResults}
        onSubmitEditing={props.onSubmitEditing}
        renderItem={props.renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formBox: {
    backgroundColor: "white",
    textAlign: "center",
    fontSize: hp("2.5%"),
    fontFamily: "Raleway-Medium",
    height: hp("7%"),
    width: wp("95%"),
  },
  viewContainer: {
    zIndex: 1,
    flex: 1,
    width: "95%",
    position: "absolute",
  },
  listStyle: {
    maxHeight: hp("10%"),
  },
});

export default Input;
