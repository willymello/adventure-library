import React from "react";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import CreateCharacterScreen from "../screens/CreateCharacterScreen";

import SpellsScreen from "../screens/SpellsScreen";
import ItemsScreen from "../screens/ItemsScreen";

import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

export default function MainApp(db) {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home">
          {(props) => <HomeScreen {...props} db={db} />}
        </Tab.Screen>
        <Tab.Screen name="Create Character">
          {(props) => <CreateCharacterScreen {...props} db={db} />}
        </Tab.Screen>
        <Tab.Screen name="Spells">
          {(props) => <SpellsScreen {...props} db={db} />}
        </Tab.Screen>
        <Tab.Screen name="Items">
          {(props) => <ItemsScreen {...props} db={db} />}
        </Tab.Screen>
        {/* <Tab.Screen name="Tab Bar" component={TabBarIcon} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
