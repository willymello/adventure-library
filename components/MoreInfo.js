import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default MoreInfo = (props) => {
  const spell = JSON.parse(props.spell);
  console.log({ spell });
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Description: </Text>
        <Text style={styles.description}> {spell.desc}</Text>
      </View>
      {spell.higher_level ? (
        <View>
          <Text style={styles.title}>HIGHER LEVEL: </Text>
          <Text style={styles.description}> {spell.higher_level}</Text>
        </View>
      ) : null}

      <Text>RANGE: {spell.range} </Text>
      <Text>CASTING TIME: {spell.casting_time}</Text>
      <Text>DURATION: {spell.duration}</Text>
      <Text>MATERIAL: {spell.material}</Text>
    </View>
  );
};
const osText = Platform.OS === "ios" ? "Papyrus" : "Roboto";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },

  title: {
    alignSelf: "center",
    fontFamily: osText,
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  description: {
    fontSize: 12,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    borderStyle: "solid",
    borderBottomWidth: 2,
  },
});
