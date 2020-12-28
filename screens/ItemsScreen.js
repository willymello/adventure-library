import React from "react";
import {
  ScrollView,
  ListView,
  StyleSheet,
  Image,
  Button,
  View,
  TouchableOpacity,
  TextInput,
  Text,
} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";
import OneItem from "../components/OneItem";
import Pack from "../components/Pack";
import everyItem from "../assets/data/itemsExpanded.json";

export default class ItemsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      allItems: [],
      searchTerm: "",
    };
    this.checkStoredItems = this.checkStoredItems.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }
  componentDidMount = async () => {
    try {
      // this.reset();
      // const res = await fetch("http://dnd5eapi.co/api/equipment/");

      const items = everyItem;
      items
        ? null
        : new Error("you may need to run ./scripts/import_items.js ");

      this.setState({ allItems: items.results });
    } catch (error) {
      console.error(error);
    }
  };
  handlePress(e) {
    e.preventDefault();

    let searchTerm = e.nativeEvent.text;
    this.setState({ searchTerm });
  }
  handleClear() {
    this.setState({ searchTerm: "" });
  }
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
  _savePack = async (pack) => {
    const packArray = [];
    try {
      let req = await fetch(pack.url);
      let listOfUrls = await req.json();
      let listOfItems = await listOfUrls.map(async (elem) => {
        let item = await fetch(elem.url);
        item.quantity = elem.quantity;
        return item;
      });
      await listOfItems.forEach((elem) => {
        this._saveToAsyncStorage(elem);
      });
    } catch (error) {
      console.error(error);
    }
  };
  _saveToAsyncStorage = async (obj) => {
    try {
      //need to have async item storage be an object with quantity
      //[{name:'str',url:'str',quantity:integer},{name:'str2',url:'str2',quantity:integer2}]
      //need to check if any stored item has the same name as obj arg.
      //if true, increment that stored item, if false, add quantity:1 kv pair to obj arg and push to items arr

      let req = await AsyncStorage.getItem("items");
      let itemsList = [];
      if (req !== null) {
        let itemsList = this.checkStoredItems(obj, JSON.parse(req));

        await AsyncStorage.setItem(`items`, JSON.stringify(itemsList));
      } else {
        obj.quantity = 1;
        itemsList.push(obj);
        await AsyncStorage.setItem(`items`, JSON.stringify(itemsList));
      }
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const items = this.state.allItems.slice(0).filter((elem) => {
      return elem.name
        .toLowerCase()
        .includes(this.state.searchTerm.toLowerCase());
    });
    return (
      <View style={styles.container2}>
        {this.state.allItems.length ? (
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text>Search:</Text>
            <TextInput
              style={{
                flex: 2,
                borderWidth: 1,
                borderColor: "black",
                borderStyle: "solid",
              }}
              defaultValue=""
              title="search"
              onChange={(text) => this.handlePress(text)}
              value={this.state.searchTerm}
            />
            <Button onPress={this.handleClear} title="clear" />
          </View>
        ) : null}

        <ScrollView style={styles.container}>
          {this.state.allItems.length ? (
            items.map((elem, idx) => {
              return elem.name.slice(-7).toLowerCase() === "'s pack" ? (
                <View key={idx + 1} style={styles.oneSpell}>
                  <Pack pack={elem} />
                  {/* <TouchableOpacity
                  // onPress={() => this._savePack(elem)}
                  style={styles.addButton}
                >
                  <Image
                    source={require("../assets/images/addToInventory.png")}
                    style={styles.welcomeImage}
                  />
                </TouchableOpacity> */}
                </View>
              ) : (
                <View key={idx + 1} style={styles.oneSpell}>
                  <OneItem item={elem} />
                  <TouchableOpacity
                    onPress={() => this._saveToAsyncStorage(elem)}
                    style={styles.addButton}
                  >
                    <Image
                      source={require("../assets/images/addToInventory.png")}
                      style={styles.welcomeImage}
                    />
                  </TouchableOpacity>
                </View>
              );
            })
          ) : (
            <Image
              source={require("../assets/images/armour.gif")}
              style={styles.welcomeImage}
            />
          )}
        </ScrollView>
      </View>
    );
  }
}

ItemsScreen.navigationOptions = {
  title: "Items",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container2: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
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
  oneSpell: {
    flexDirection: "row",
    backgroundColor: "#DEB887",
  },
});
