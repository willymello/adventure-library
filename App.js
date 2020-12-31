import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { useState } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import sqlStrings from "./assets/sqlStrings";

import * as SQLite from "expo-sqlite";

import allItems from "./assets/data/itemsExpanded.json";

import MainApp from "./navigation/AppNavigator";

export default function App() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [getDb, setDb] = useState(null);

  if (!isLoadingComplete || getDb === null) {
    return (
      <AppLoading
        startAsync={() => loadResourcesAsync(setDb)}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return MainApp(getDb);
  }
}

async function loadResourcesAsync(setDb) {
  try {
    await instantiateAndSeedDb(setDb);
    await Promise.all([
      Asset.loadAsync([
        require("./assets/images/robot-dev.png"),
        require("./assets/images/robot-prod.png"),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free to
        // remove this if you are not using it in your app
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
      }),
    ]);
  } catch (error) {
    console.error(error);
  }
}
async function instantiateAndSeedDb(setDb) {
  try {
    console.log("called instantiate and seed db");
    const db = SQLite.openDatabase("AdventureLibrary.db");
    await db.transaction(
      (tx) => {
        tx.executeSql(
          sqlStrings.CREATE.ITEMS_TABLE(),
          [],
          (txObj, { _array }) => {
            // if (txObj._complete) {
            // TODO figure out what txObj._complete actually means
            return allItems.forEach(async (el) => {
              try {
                let desc = el.desc ? el.desc : `a(n) ${el.name}`;
                await tx.executeSql(
                  sqlStrings.INSERT.ITEM,
                  [
                    el.name,
                    desc,
                    el.equipment_category.name,
                    JSON.stringify(el),
                  ],
                  (txObj, { _array }) => {
                    console.log(txObj, "nested txObj in App.js success");
                  },
                  (txObj, errorObj) => {
                    console.log(errorObj, "nested errorObj in App.js failure");
                  }
                );
              } catch (error) {
                console.error(error);
              }
            });
            // } else {
            //   console.log(txObj, "txObj in else clause");
            // }
          },
          (txObj, errorObj) => {
            console.error(errorObj);
          }
        );
      },
      (error) => {
        console.error(error);
      },
      () => {
        console.log("db already existed");
      }
    );
    setDb(db);
  } catch (error) {
    console.error(error);
  }
}
function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}
async function seedDB(db_tx, item) {
  if (item.equipment_category.name === "Weapon") {
  }
  if (item.equipment_category.name === "Armor") {
  }

  if (
    item.equipment_category.name === "Adventuring Gear" ||
    item.equipment_category.name === "Tools"
  ) {
  }
  if (
    item.gear_category.name === "Standard Gear" ||
    item.gear_category.name === "Kit"
  ) {
  }
  if (item.equipment_category.name === "Mounts and Vehicles") {
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DEB887",
  },
});
