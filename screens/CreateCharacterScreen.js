import React from "react";
// import t from "tcomb-form-native";
// tcomb not updated
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
import AsyncStorage from "@react-native-community/async-storage";
// import * as firebase from "firebase";
// require("firebase/firestore");
import OneClass from "../components/OneClass";
import everyClass from "../assets/data/classes.json";
import everyRace from "../assets/data/races.json";
import OneRace from "../components/OneRace";
// const Form = t.form.Form;
// const Stats = t.struct({
//   BASE_STR: t.Number,
//   BASE_DEX: t.Number,
//   BASE_CON: t.Number,
//   BASE_INT: t.Number,
//   BASE_WIS: t.Number,
//   BASE_CMA: t.Number,
//   STR_MOD: t.Number,
//   DEX_MOD: t.Number,
//   CON_MOD: t.Number,
//   INT_MOD: t.Number,
//   WIS_MOD: t.Number,
//   CMA_MOD: t.Number,
//   Name: t.String,
//   Race: t.String,
//   Subrace: t.String,
//   Class: t.String,
//   Background: t.String,
//   Age: t.Number,
//   Skills: t.String,
//   HP: t.Number,
//   Level: t.Number,
// });
// const Modifiers = t.struct({
//   STR_MOD: t.Number,
//   DEX_MOD: t.Number,
//   CON_MOD: t.Number,
//   INT_MOD: t.Number,
//   WIS_MOD: t.Number,
//   CMA_MOD: t.Number
// });
// const Personality = t.struct({
//   Name: t.String,
//   Race: t.String,
//   Subrace: t.String,
//   Class: t.String,
//   Background: t.String,
//   Age: t.Number,
//   Skills: t.String,
//   HP: t.Number,
//   Level: t.Number
// });
//tersting if one form works
// firebase.initializeApp({
//   apiKey: "AIzaSyAKnZDY_KSV-7iE8VGsuKse_zNr9XEF1C8",
//   authDomain: "spelllibrarynative.firebaseapp.com",
//   projectId: "spelllibrarynative",
// });
// const db = firebase.firestore();
export default class CreateCharacterScreen extends React.Component {
  constructor() {
    super();
    this.state = {
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
  addCharacterToParty = async () => {
    try {
      let ref = await db
        .collection("parties/rooms/alaska")
        .add(this.state.newChar);
      console.log("new ref");
    } catch (error) {
      console.error(error);
    }
  };
  handleSubmit() {
    const stats = this._form.getValue();
    // const mods = this._modifiersForm.getValue();
    // const personality = this._personalityForm.getValue();
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
    this._saveToAsyncStorage(this.state.newChar);
  }
  _deleteCurrentCharacter = async () => {
    await AsyncStorage.removeItem("character");
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
      let req = await AsyncStorage.getItem("character");
      req === null ? null : this.setState({ newChar: JSON.parse(req) });

      const races = everyRace;
      const classes = everyClass;

      this.setState({ allRaces: races.results, allClasses: classes.results });

      console.log("created character:", this.state.newChar);
    } catch (error) {
      console.error(error);
    }
  };

  _saveToAsyncStorage = async (obj) => {
    try {
      await AsyncStorage.setItem("character", JSON.stringify(obj));
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const name = this.state.newChar.name;
    return (
      <View>
        <Text>create char</Text>
      </View>
      // <ScrollView style={styles.container}>
      //   {name !== "" ? (
      //     <View>
      //       <Text>
      //         You already have a level {this.state.newChar.Level}{" "}
      //         {this.state.newChar.class} {this.state.newChar.race} with the name{" "}
      //         {this.state.newChar.name} .
      //       </Text>
      //       <Button
      //         title="add character to party"
      //         onPress={this.addCharacterToParty}
      //       />
      //       <Button
      //         onPress={this._deleteCurrentCharacter}
      //         title="delete current character"
      //       >
      //         Delete {this.state.newChar.name}?
      //       </Button>
      //     </View>
      //   ) : (
      //     <View>
      //       <Text>Create A Character</Text>
      //       <Form
      //         ref={c => (this._form = c)}
      //         value={{
      //           BASE_STR: 0,
      //           BASE_DEX: 0,
      //           BASE_CON: 0,
      //           BASE_INT: 0,
      //           BASE_WIS: 0,
      //           BASE_CMA: 0,
      //           STR_MOD: 0,
      //           DEX_MOD: 0,
      //           CON_MOD: 0,
      //           INT_MOD: 0,
      //           WIS_MOD: 0,
      //           CMA_MOD: 0,
      //           name: "Gimli Son of Gloin",
      //           race: "dwarf",
      //           subrace: "i.e. hill dawrf",
      //           class: "Fighter",
      //           skills: "Initmidation, deception, nature,stealth",
      //           background: "criminal",
      //           HP: 0,
      //           Level: 1
      //         }}
      //         type={Stats}
      //       />

      //       <Button title="create character" onPress={this.handleSubmit} />
      //     </View>
      //   )}

      //   <Text style={styles.classTitle}> Classes</Text>
      //   {this.state.allClasses.map((elem, idx) => {
      //     return (
      //       <View key={idx + 1} style={styles.oneClass}>
      //         <OneClass class={elem} />
      //       </View>
      //     );
      //   })}

      //   <Text style={styles.raceTitle}> Races</Text>
      //   {this.state.allRaces.map((elem, idx) => {
      //     return (
      //       <View key={idx + 1} style={styles.oneRace}>
      //         <OneRace race={elem} />
      //       </View>
      //     );
      //   })}
      // </ScrollView>
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
