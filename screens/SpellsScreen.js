import React from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";

import OneSpell from "../components/OneSpell";

import AsyncStorage from "@react-native-community/async-storage";

import everySpell from "../assets/data/spellsExpanded.json";

export default class SpellsScreen extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      allSpells: [],
      searchTerm: "",
    };
    this.handlePress = this.handlePress.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }
  componentDidMount = async () => {
    let database = this.props.db;
    try {
      // this.reset();
      // const res = await fetch("http://dnd5eapi.co/api/spells/");
      // const spells = await res.json();
      await database.transaction((tx) => {
        console.log(
          tx,
          "started select all spellss:",
          sqlStrings.SELECT.ALL_SPELLS
        );
        tx.executeSql(
          sqlStrings.SELECT.ALL_SPELLS,
          null, // passing sql query and parameters:null
          // success callback which sends two things Transaction object and ResultSet Object
          (txObj, { rows: { _array } }) => {
            console.log({ _array }, "_array in spellsscreen", { txObj });
            this.setState({ allSpells: _array });
          },
          // failure callback which sends two things Transaction object and Error
          (txObj, error) => console.log("Error in fetching spells ", error)
        ); // end executeSQL
      });

      // spells
      //   ? null
      //   : new Error("you may need to run ./scripts/import_spells.js ");

      // this.setState({ allSpells: spells.results });
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
  _saveToAsyncStorage = async (obj) => {
    try {
      let req = await AsyncStorage.getItem("spells");
      let spellsList = [];
      if (req !== null) {
        let spellsList = JSON.parse(req);
        spellsList.push(obj);
        await AsyncStorage.setItem(`spells`, JSON.stringify(spellsList));
      } else {
        spellsList.push(obj);
        await AsyncStorage.setItem(`spells`, JSON.stringify(spellsList));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // reset = () => {
  //   const resetToHome = NavigationActions.reset({
  //     index: 0,
  //     key: null,
  //     actions: [NavigationActions.navigate({ routeName: "Home" })]
  //   });
  //   const resetAction = StackActions.reset({
  //     index: 0,
  //     actions: [NavigationActions.navigate({ routeName: "Spells" })]
  //   });
  //   console.log("reset executed");
  //   // return this.props.navigation.dispatch(resetToHome);
  // };

  render() {
    const spells = this.state.allSpells.slice(0).filter((elem) => {
      return elem.name
        .toLowerCase()
        .includes(this.state.searchTerm.toLowerCase());
    });
    return (
      <View style={styles.container2}>
        {this.state.allSpells.length ? (
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
        <ScrollView title={"Spells"} style={styles.container}>
          {this.state.allSpells.length ? (
            spells.map((elem, idx) => {
              return (
                <View key={idx + 1} style={styles.oneSpell}>
                  <OneSpell spell={elem} />
                  <TouchableOpacity
                    onPress={() => this._saveToAsyncStorage(elem)}
                    style={styles.addButton}
                  >
                    <Image
                      source={require("../assets/images/addSpellStill.png")}
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

SpellsScreen.navigationOptions = {
  title: "Spells",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexBasis: "auto",
  },
  welcomeImage: {
    width: 80,
    height: 45,
    resizeMode: "contain",

    backgroundColor: "#CBCBC6",
  },
  addButton: {
    backgroundColor: "#CBCBC6",
    alignItems: "center",
    padding: 2,
    borderColor: "#7A7A79",
    borderWidth: 2,
    width: 100,
    fontSize: 20,
  },
  oneSpell: {
    flexDirection: "row",
    backgroundColor: "#DEB887",
  },
  container2: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
  },
});
