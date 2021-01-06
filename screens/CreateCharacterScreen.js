import React from "react";

import {
  ScrollView,
  Text,
  StyleSheet,
  Image,
  Button,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";

import OneClass from "../components/OneClass";
import everyClass from "../assets/data/classes.json";
import everyRace from "../assets/data/races.json";
import OneRace from "../components/OneRace";
import ScreenHeader from "../components/ScreenHeader";

export default class CreateCharacterScreen extends React.PureComponent {
  constructor(...props) {
    super();
    this.state = {
      db: {},
      allClasses: [],
      allRaces: [],
      newChar: {
        stats: {
          str: 0,
          dex: 0,
          wis: 0,
          int: 0,
          con: 0,
          cma: 0,
        },
        asi: {
          str: 0,
          dex: 0,
          wis: 0,
          int: 0,
          con: 0,
          cma: 0,
        },
        name: "",
        race: "",
        class: "",
        subrace: "",
        skills: "",
        background: "",
        HP: 0,
        Level: 0,
        Age: 1,
      },
      formStati: {
        stats: false,
        mods: false,
        personality: false,
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.setState({
      ...this.state,
      newChar: {
        stats: {
          str: stats.BASE_STR + stats.STR_MOD,
          dex: stats.BASE_DEX + stats.DEX_MOD,
          wis: stats.BASE_WIS + stats.WIS_MOD,
          int: stats.BASE_INT + stats.INT_MOD,
          con: stats.BASE_CON + stats.CON_MOD,
          cma: stats.BASE_CMA + stats.CMA_MOD,
        },
        asi: {
          str: stats.STR_MOD,
          dex: stats.DEX_MOD,
          wis: stats.WIS_MOD,
          int: stats.INT_MOD,
          con: stats.CON_MOD,
          cma: stats.CMA_MOD,
        },
        name: stats.Name,
        race: stats.Race,
        class: stats.Class,
        subrace: stats.Subrace,
        background: stats.Background,
        skills: stats.Skills,
        HP: stats.HP,
        Level: stats.Level,
        Age: stats.Age,
      },
    });
  }
  _deleteCurrentCharacter = async () => {
    this.setState({
      ...this.state,
      newChar: {
        stats: {
          str: 0,
          dex: 0,
          wis: 0,
          int: 0,
          con: 0,
          cma: 0,
        },
        asi: {
          str: 0,
          dex: 0,
          wis: 0,
          int: 0,
          con: 0,
          cma: 0,
        },
        name: "",
        race: "",
        class: "",
        subrace: "",
        skills: "",
        background: "",
        HP: 0,
        Level: 0,
        Age: 1,
      },
      formStati: {
        stats: false,
        mods: false,
        personality: false,
      },
    });
  };
  componentDidMount = async () => {
    try {
      const races = JSON.parse(everyRace);
      const classes = JSON.parse(everyClass);

      this.setState({
        db: this.props.db,
        allRaces: races.results,
        allClasses: classes.results,
      });

      console.log("component did mount:", this.state);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const name = this.state.newChar.name;
    return (
      <View>
        <ScreenHeader title={"Character Screen"} />
        <ScrollView style={styles.container}>
          {name !== "" ? (
            <View>
              <Text>
                You already have a level {this.state.newChar.Level}{" "}
                {this.state.newChar.class} {this.state.newChar.race} with the
                name {this.state.newChar.name} .
              </Text>
              <Button
                title="add character to party"
                onPress={this.addCharacterToParty}
              />
              <Button
                onPress={this._deleteCurrentCharacter}
                title="delete current character"
              >
                Delete {this.state.newChar.name}?
              </Button>
            </View>
          ) : (
            <View>
              <Text>Create A Character</Text>
              {/* <Form
                ref={(c) => (this._form = c)}
                value={{
                  BASE_STR: 0,
                  BASE_DEX: 0,
                  BASE_CON: 0,
                  BASE_INT: 0,
                  BASE_WIS: 0,
                  BASE_CMA: 0,
                  STR_MOD: 0,
                  DEX_MOD: 0,
                  CON_MOD: 0,
                  INT_MOD: 0,
                  WIS_MOD: 0,
                  CMA_MOD: 0,
                  name: "Gimli Son of Gloin",
                  race: "dwarf",
                  subrace: "i.e. hill dawrf",
                  class: "Fighter",
                  skills: "Initmidation, deception, nature,stealth",
                  background: "criminal",
                  HP: 0,
                  Level: 1,
                }}
                type={Stats}
              /> */}

              <Button title="create character" onPress={this.handleSubmit} />
            </View>
          )}

          <Text style={styles.classTitle}> Classes</Text>
          {this.state.allClasses.map((elem, idx) => {
            return (
              <View key={idx + 1} style={styles.oneClass}>
                <OneClass class={elem} />
              </View>
            );
          })}

          <Text style={styles.raceTitle}> Races</Text>
          {this.state.allRaces.map((elem, idx) => {
            return (
              <View key={idx + 1} style={styles.oneRace}>
                <OneRace race={elem} />
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

CreateCharacterScreen.navigationOptions = {
  title: "Create Character",
};
const osText = Platform.OS === "ios" ? "Papyrus" : "Roboto";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  welcomeImage: {
    width: 80,
    height: 45,
    resizeMode: "contain",

    backgroundColor: "#DEB887",
  },
  raceTitle: {
    alignSelf: "center",
    alignItems: "center",
    borderStyle: "solid",
    fontFamily: osText,
    fontSize: 22,
    backgroundColor: "brown",
    color: "#DEB887",
    borderRadius: 25,
    borderColor: "black",
    borderWidth: 4,
    margin: 1,
  },
  classTitle: {
    alignSelf: "center",
    alignItems: "center",
    borderStyle: "solid",
    fontFamily: osText,
    fontSize: 22,
    backgroundColor: "#7A7A79",
    color: "#CBCBC6",
    borderRadius: 25,
    borderColor: "black",
    borderWidth: 4,
    margin: 1,
  },
  oneClass: {
    flexDirection: "row",
    backgroundColor: "#DEB887",
  },
  oneRace: {
    flexDirection: "row",
    backgroundColor: "#DEB887",
  },
});
