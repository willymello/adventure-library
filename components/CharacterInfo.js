import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import OneSpell from "./OneSpell";

export default (CharacterInfo = props => {
  const character = props.character;
  return props.character.name ? (
    <View>
      <Text>
        {" "}
        {character.name}, the {character.background}, {character.subrace},{" "}
        {character.class} {character.race}
      </Text>
      <View style={styles.statsContainer}>
        <Text>
          STR: {character.stats.str} (+
          {Math.floor((character.stats.str - 10) / 2)})
        </Text>
        <Button
          style={{ padding: 0 }}
          title="-"
          onPress={() => props.handlePress("str", "-")}
        />
        <Button
          style={{ padding: 0 }}
          title="+"
          onPress={() => props.handlePress("str", "+")}
        />
      </View>
      <View style={styles.statsContainer}>
        <Text>
          DEX: {character.stats.dex} (+
          {Math.floor((character.stats.dex - 10) / 2)})
        </Text>
        <Button
          style={{ padding: 0 }}
          title="-"
          onPress={() => props.handlePress("dex", "-")}
        />
        <Button
          style={{ padding: 0 }}
          title="+"
          onPress={() => props.handlePress("dex", "+")}
        />
      </View>
      <View style={styles.statsContainer}>
        <Text>
          INT: {character.stats.int} (+
          {Math.floor((character.stats.int - 10) / 2)})
        </Text>
        <Button
          style={{ padding: 0 }}
          title="-"
          onPress={() => props.handlePress("int", "-")}
        />
        <Button
          style={{ padding: 0 }}
          title="+"
          onPress={() => props.handlePress("int", "+")}
        />
      </View>
      <View style={styles.statsContainer}>
        <Text>
          WIS: {character.stats.wis} (+
          {Math.floor((character.stats.wis - 10) / 2)})
        </Text>
        <Button
          style={{ padding: 0 }}
          title="-"
          onPress={() => props.handlePress("wis", "-")}
        />
        <Button
          style={{ padding: 0 }}
          title="+"
          onPress={() => props.handlePress("wis", "+")}
        />
      </View>
      <View style={styles.statsContainer}>
        <Text>
          CON: {character.stats.con} (+
          {Math.floor((character.stats.con - 10) / 2)})
        </Text>
        <Button
          style={{ padding: 0 }}
          title="-"
          onPress={() => props.handlePress("con", "-")}
        />
        <Button
          style={{ padding: 0 }}
          title="+"
          onPress={() => props.handlePress("con", "+")}
        />
      </View>
      <View style={styles.statsContainer}>
        <Text>
          CMA: {character.stats.cma} (+
          {Math.floor((character.stats.cma - 10) / 2)})
        </Text>
        <Button
          style={{ padding: 0 }}
          title="-"
          onPress={() => props.handlePress("cma", "-")}
        />
        <Button
          style={{ padding: 0 }}
          title="+"
          onPress={() => props.handlePress("cma", "+")}
        />
      </View>

      <Text>Skills: {character.skills}</Text>

      <View style={styles.statsContainer}>
        <Text>HP:{character.HP}</Text>
        <Button
          style={{ padding: 0 }}
          title="-"
          onPress={() => props.changeHP("-")}
        />
        <Button
          style={{ padding: 0 }}
          title="+"
          onPress={() => props.changeHP("+")}
        />
      </View>
    </View>
  ) : (
    <Text>Want to make a character?</Text>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DEB887",
    alignItems: "center"
  },
  statsContainer: {
    display: "flex",
    flexDirection: "row",
    fontSize: 20,
    justifyContent: "space-between"
  }
});
