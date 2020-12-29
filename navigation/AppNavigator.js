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
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Create Character" component={CreateCharacterScreen} />
        <Tab.Screen name="Spells" component={SpellsScreen} />
        <Tab.Screen name="Items" component={ItemsScreen} />
        {/* <Tab.Screen name="Tab Bar" component={TabBarIcon} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
