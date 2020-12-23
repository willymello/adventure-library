import React from "react";
import { StyleSheet, Text, View } from "react-native";
import EquipmentPack from "./EquipmentPack";

export default (MoreItemInfo = props => {
  const item = props.item;
  if (item.equipment_category === "Weapon") {
    return (
      <View>
        <Text>Type: {item.category_range}</Text>

        <Text>
          Cost: {item.cost.quantity} {item.cost.unit}
        </Text>
        <Text>
          Damage: {item.damage.dice_count}d{item.damage.dice_value}{" "}
          {item.damage.damage_type.name} damage
        </Text>
        <Text>Normal Range: {item.range.normal}</Text>
        {item.range.long !== null ? (
          <Text>Long Range: {item.range.long}</Text>
        ) : null}
      </View>
    );
  }
  if (item.equipment_category === "Armor") {
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
    item.equipment_category === "Adventuring Gear" ||
    item.equipment_category === "Tools"
  ) {
    return (
      <View>
        {item.desc
          ? item.desc.map((str, idx) => {
              return <Text key={idx + 1}>{str}</Text>;
            })
          : null}

        <Text>
          Cost: {item.cost.quantity} {item.cost.unit}
        </Text>
        <Text>Weight: {item.weight}</Text>
      </View>
    );
  }
  if (item.gear_category === "Standard Gear" || item.gear_category === "Kit") {
    return (
      <View>
        {item.desc
          ? item.desc.map((str, idx) => {
              return <Text key={idx + 1}>{str}</Text>;
            })
          : null}

        <Text>
          Cost: {item.cost.quantity} {item.cost.unit}
        </Text>
        <Text>Weight: {item.weight}</Text>
      </View>
    );
  }
  if (item.equipment_category === "Mounts and Vehicles") {
    return (
      <View>
        {item.desc
          ? item.desc.map((str, idx) => {
              return <Text key={idx + 1}>{str}</Text>;
            })
          : null}

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
  return (
    <View>
      <Text>No Interwebs, contact your Dungeon Meister</Text>
    </View>
  );
});
const styles = StyleSheet.create({
  hideButton: {
    alignSelf: "center",
    paddingTop: 2,
    paddingBottom: 2
  }
});
