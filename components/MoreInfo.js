import React from "react";
import { Text, View } from "react-native";

export default MoreInfo = (props) => {
  const spell = props.spell;
  return (
    <View>
      <Text>Description: {spell.desc}</Text>
      <Text>Range: {spell.range} </Text>
      <Text>Casting Time: {spell.casting_time}</Text>
      <Text>Duration: {spell.duration}</Text>
      <Text>Material: {spell.material}</Text>
      <Text>Higher Level: {spell.higher_level}</Text>
    </View>
  );
};
