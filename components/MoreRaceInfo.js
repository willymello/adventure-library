import React from "react";
import { Text, View } from "react-native";

export default (MoreRaceInfo = props => {
  const item = props.item;
  console.log("item in moreraceinfo", item);
  return (
    <View>
      <Text> {item.asi_desc} </Text>
      <Text> {item.age}</Text>
      <Text> {item.alignment}</Text>
      <Text> {item.size}</Text>
      <Text> {item.speed_desc}</Text>

      <Text>TRAITS: </Text>
      <Text>{item.traits}</Text>
    </View>
  );
});
