import React from "react";
import { StyleSheet, Text, View } from "react-native";
import EquipmentPack from "./EquipmentPack";

export default MoreItemInfo = (props) => {
  const item = JSON.parse(props.item.details);
  console.log(item.name, "=--=-===-= ", item, "item in more item info");
  if (item.equipment_category.name === "Weapon") {
    return (
      <View>
        <Text>Type: {item.category_range}</Text>

        <Text>
          Cost: {item.cost.quantity} {item.cost.unit}
        </Text>
        <Text>
          Damage: {item.damage.damage_dice} {item.damage.damage_type.name}{" "}
          damage
        </Text>
        {item.two_handed_damage ? (
          <Text>
            Two Handed: {item.two_handed_damage.damage_dice}{" "}
            {item.two_handed_damage.damage_type.name} damage
          </Text>
        ) : null}
        <Text>Normal Range: {item.range.normal}</Text>
        {item.range.long !== null ? (
          <Text>Long Range: {item.range.long}</Text>
        ) : null}
      </View>
    );
  }
  if (item.equipment_category.name === "Armor") {
    return (
      <View>
        <Text>Type: {item.armor_category} armor</Text>
        <Text>Base Armor: {item.armor_class.base}</Text>
        <Text>DEX Bonus: {item.armor_class.dex_bonus ? "Yes" : "No"}</Text>
        <Text>STR Requirement: {item.str_minimum}</Text>
        <Text>
          Stealth Disadvantage: {item.stealth_disadvantage ? "Yes" : "No"}
        </Text>
        <Text>Weight: {item.weight}</Text>
        <Text>
          Cost: {item.cost.quantity} {item.cost.unit}
        </Text>
      </View>
    );
  }

  if (
    item.equipment_category.name === "Adventuring Gear" ||
    item.equipment_category.name === "Tools"
  ) {
    return (
      <View>
        {/* {item.desc
          ? item.desc.map((str, idx) => {
              return <Text key={idx + 1}>{str}</Text>;
            })
          : null} */}
        <Text>{item.desc}</Text>
        <Text>
          Cost: {item.cost.quantity} {item.cost.unit}
        </Text>
        <Text>Weight: {item.weight}</Text>
      </View>
    );
  }
  if (item.equipment_category.name === "Mounts and Vehicles") {
    return (
      <View>
        {/* {item.desc
          ? item.desc.map((str, idx) => {
              return <Text key={idx + 1}>{str}</Text>;
            })
          : null} */}
        <Text>{item.desc}</Text>

        <Text>
          Cost: {item.cost.quantity} {item.cost.unit}
        </Text>
        <Text>Weight: {item.weight}</Text>
        {item.speed ? (
          <Text>
            Speed: {item.speed.quantity} {item.speed.unit}
          </Text>
        ) : null}
      </View>
    );
  }
  if (
    item.gear_category.name === "Standard Gear" ||
    item.gear_category.name === "Kit"
  ) {
    return (
      <View>
        {/* {item.desc
          ? item.desc.map((str, idx) => {
              return <Text key={idx + 1}>{str}</Text>;
            })
          : null} */}
        <Text>{item.desc}</Text>
        <Text>
          Cost: {item.cost.quantity} {item.cost.unit}
        </Text>
        <Text>Weight: {item.weight}</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>No Interwebs, contact your Dungeon Meister</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  hideButton: {
    alignSelf: "center",
    paddingTop: 2,
    paddingBottom: 2,
  },
});
