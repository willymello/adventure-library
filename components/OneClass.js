import React from "react";
import { StyleSheet, Text, TouchableOpacity, Platform } from "react-native";
import MoreClassInfo from "./MoreClassInfo";

export default class OneItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      item: {}
    };
  }
  click = () => {
    console.log("clicked clikc");
    this.setState({ open: !this.state.open });
  };

  componentDidMount = async () => {
    try {
      this.setState({ item: this.props.class });
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.click}>
        <Text style={styles.title}>{this.props.class.name}</Text>
        {this.state.open ? (
          <MoreClassInfo item={this.state.item} onPress={this.click} />
        ) : null}
      </TouchableOpacity>
    );
  }
}
const osText = Platform.OS === "ios" ? "Papyrus" : "Roboto";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CBCBC6",
    alignItems: "center",
    padding: 2,
    borderColor: "#7A7A79",
    borderWidth: 2
  },
  title: {
    fontFamily: osText,
    fontSize: 20
  },
  expand: {
    fontFamily: ""
  }
});
