import React from "react";
import { Text } from "react-native";

export default class EquipmentPack extends React.Component {
  constructor(props) {
    super();
    this.state = {
      item: {}
    };
  }
  componentDidMount = async () => {
    try {
      let req = await fetch(this.props.url);
      let item = await req.json();
      this.setState({ item });
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    return this.state.item.name ? (
      <Text>
        {this.props.quantity} X {this.state.item.name}
      </Text>
    ) : (
      <Text>Loading</Text>
    );
  }
  //this needs to be asynchrnous and a stateful component i think
}
