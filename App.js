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

  if (!isLoadingComplete) {
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

async function loadResourcesAsync(setDbInstance) {
  const db = SQLite.openDatabase("AdventureLibrary");
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
    db.transaction((tx) => {
      tx.executeSql(sqlStrings.CREATE.ITEMS_TABLE);

      allItems.forEach((el) => {
        tx.executeSql(
          sqlStrings.INSERT.ITEM,
          (el.name, el.desc, el.equipment_category.name, JSON.stringify(el))
        );
      });
    }),
  ])
    .then(() => setDbInstance(db))
    .then(() => console.log("********* ********* ran db scripts"))
    .catch((err) => console.log({ err }));
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DEB887",
  },
});
