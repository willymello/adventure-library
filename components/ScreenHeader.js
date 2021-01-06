import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default ScreenHeader = (props) => {
  const title = props.title;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};
const osText = Platform.OS === "ios" ? "Papyrus" : "Roboto";
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "column",
    color: "#FFFF",
    minHeight: 36,
  },

  title: {
    alignSelf: "center",
    fontFamily: osText,
    fontSize: 22,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#000",
    paddingTop: 14,
  },
});
