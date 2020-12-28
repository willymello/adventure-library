import React from "react";
import { StyleSheet, Text, TouchableOpacity, Platform } from "react-native";

export default class PackItem extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      item: {}
    };
  }
  click = () => {
    this.setState({ open: !this.state.open });
  };

  componentDidMount = async () => {
    try {
      const res = await fetch(this.props.item.item_url);
      const item = await res.json();
      this.setState({ item });
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    return this.state.item.name ? (
      <TouchableOpacity style={styles.container} onPress={this.click}>
        <Text style={styles.title}>
          {this.props.item.quantity} X {this.state.item.name}
        </Text>
      </TouchableOpacity>
    ) : (
      <Text>Loading</Text>
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
