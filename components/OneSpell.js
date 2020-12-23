import React from "react";
import { StyleSheet, Text, TouchableOpacity, Platform } from "react-native";
import MoreInfo from "./MoreInfo";

export default class OneSpell extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      spell: {}
    };
  }
  click = () => {
    console.log("clicked clikc");
    this.setState({ open: !this.state.open });
  };

  componentDidMount = async () => {
    try {
      const res = await fetch(this.props.spell.url);
      const spell = await res.json();
      this.setState({ spell });
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.click}>
        <Text style={styles.title}>{this.props.spell.name}</Text>
        {this.state.open ? (
          <MoreInfo spell={this.state.spell} onPress={this.click} />
        ) : null}
      </TouchableOpacity>
    );
  }
}
const osText = Platform.OS === "ios" ? "Papyrus" : "Roboto";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DEB887",
    alignItems: "baseline",
    borderColor: "brown",
    borderWidth: 2
  },
  title: {
    alignSelf: "center",
    fontFamily: osText,
    fontSize: 20
  }
});
