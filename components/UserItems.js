import React from "react";
import { StyleSheet, Text } from "react-native";
import OneItemForUser from "./OneItemForUser";

export default (UserItems = props => {
  const decrement = props.decrement;
  return props.items.length ? (
    props.items.map((elem, idx) => {
      return <OneItemForUser decrement={decrement} key={idx + 1} item={elem} />;
    })
  ) : (
    <Text>no items</Text>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DEB887",
    alignItems: "center"
  }
});
