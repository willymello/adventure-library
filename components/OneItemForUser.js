import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  View,
  Image
} from "react-native";
import MoreItemInfo from "./MoreItemInfo";
import OneItem from "./OneItem";
export default class OneItemForUser extends React.Component {
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
      console.log("this.props", this.props.item.url);
      let res = await fetch(this.props.item.url);
      let item = await res.json();
      this.setState({ item });
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    console.log("this.state", this.state);
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={styles.container} onPress={this.click}>
          <Text style={styles.title}>
            {this.props.item.quantity} X {this.props.item.name}
          </Text>

          {this.state.open ? (
            <MoreItemInfo item={this.state.item} onPress={this.click} />
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.decrement(this.props.item)}
          style={styles.addButton}
        >
          <Image
            source={require("../assets/images/removeItem.png")}
            style={styles.welcomeImage}
          />
        </TouchableOpacity>
      </View>
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
  },
  welcomeImage: {
    width: 80,
    height: 45,
    resizeMode: "contain",

    backgroundColor: "#DEB887"
  },
  addButton: {
    width: 100,
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: 2,
    backgroundColor: "#DEB887",
    borderColor: "brown",
    width: 100
  }
});
