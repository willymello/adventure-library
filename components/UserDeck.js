import React from "react";
import { StyleSheet, Text } from "react-native";
import OneSpell from "./OneSpell";

export default (UserDeck = props => {
  return props.deck.length ? (
    props.deck.map((elem, idx) => {
      return <OneSpell key={idx + 1} spell={elem} />;
    })
  ) : (
    <Text>no spells</Text>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DEB887",
    alignItems: "center"
  }
});
