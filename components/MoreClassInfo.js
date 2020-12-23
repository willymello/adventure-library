import React from "react";
import { Text, View } from "react-native";

export default (MoreClassInfo = props => {
  const item = props.item;
  console.log("item in moreclassinfo", item);
  return (
    <View>
      <Text>HIT DICE: {item.hit_dice} </Text>
      <Text>1st LEVEL HP: {item.hp_at_1st_level}</Text>
      <Text>HP 2+: {item.hp_at_higher_levels}</Text>
      <Text>ARMOR PROFICIENCIES: {item.prof_armor}</Text>
      <Text>WEAPON PROFICIENCIES: {item.prof_weapons}</Text>
      <Text>SAVING THROWS: {item.prof_saving_throws}</Text>
      <Text>CLASS SKILLS: {item.prof_skills}</Text>
      <Text>STARTING EQUIPMENT: {item.equipment}</Text>
      <Text>SPELL CASTING: {item.spellcasting_ability}</Text>
      <Text>POORLY FORMATTED TABLE FROM OPEN SOURCE API: </Text>
      <Text style={{ fontSize: 6 }}>{item.table}</Text>
      <Text>CLASS DESCRIPTION:</Text>
      <Text> {item.desc}</Text>
    </View>
  );
});
