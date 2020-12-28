import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  Image,
  View,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import PackItem from "../components/PackItem";

export default class Pack extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      pack: {},
      items: [],
    };
    this._saveToAsyncStorage = this._saveToAsyncStorage.bind(this);
    this.savePack = this.savePack.bind(this);
    this.checkStoredItems = this.checkStoredItems.bind(this);
  }
  click = () => {
    console.log("clicked clikc");
    this.setState({ open: !this.state.open });
  };
  savePack = (arr) => {
    console.log("called save pack");
    Promise.all(
      arr.map((url) => fetch(url.item_url).then((resp) => resp.json()))
    ).then((texts) => {
      texts.map((item) => {
        let matching = this.state.pack.contents.filter((elem) => {
          return item.url === elem.item_url;
        });

        item.quantity = matching[0].quantity;

        return item;
      });
      this._saveToAsyncStorage(texts);
    });
  };
  checkStoredItems = (objToStore, itemArray, num = 1) => {
    //filter itemArray to check for a matching name
    //if returned filter array.length===1,
    //map the initial array and increment the quantity
    //else, add quantity:1 kv pair to objToStore and push it to item array
    //return itemArray
    let name = objToStore.name;
    let exists = itemArray.filter((elem) => {
      return elem.name === name;
    });
    if (exists.length === 1) {
      return itemArray.map((elem) => {
        if (elem.name === name) {
          elem.quantity += num;
          return elem;
        }
        return elem;
      });
    }
    objToStore.quantity = num;
    itemArray.push(objToStore);
    return itemArray;
  };
  _saveToAsyncStorage = async (arr) => {
    try {
      let req = await AsyncStorage.getItem("items");
      let storedItems = [];
      if (req !== null) {
        let storedItems = await JSON.parse(req);
        for (let i = 0; i < arr.length; i++) {
          storedItems = this.checkStoredItems(
            arr[i],
            storedItems,
            arr[i].quantity
          );
        }
        await AsyncStorage.setItem("items", JSON.stringify(storedItems));
        return;
      }
      await AsyncStorage.setItem("items", JSON.stringify(arr));
      return arr;
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount = async () => {
    try {
      const res = await fetch(this.props.pack.url);
      const pack = await res.json();
      this.setState({ pack });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.click}>
        <View>
          <Text style={styles.title}>{this.props.pack.name}</Text>
          {this.state.open
            ? this.state.pack.contents.map((elem) => {
                return <PackItem item={elem} />;
              })
            : null}
        </View>

        <TouchableOpacity
          onPress={() => this.savePack(this.state.pack.contents)}
          style={styles.addButton}
        >
          <Image
            source={require("../assets/images/addToInventory.png")}
            style={styles.welcomeImage}
          />
        </TouchableOpacity>
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
    borderWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: osText,
    fontSize: 20,
  },
  expand: {
    fontFamily: "",
  },
  welcomeImage: {
    width: 80,
    height: 45,
    resizeMode: "contain",

    backgroundColor: "#DEB887",
  },
  addButton: {
    width: 100,
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: 2,
    backgroundColor: "#DEB887",
    borderColor: "brown",
    width: 100,
  },
});
