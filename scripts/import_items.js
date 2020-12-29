"use strict";
const sqlite = require("expo-sqlite");
const { resolve } = require("path");
const fs = require("fs");
const axios = require("axios");

const ITEMS_PATH = resolve("../assets/data/items.json");

const NEW_ITEMS_PATH = resolve("../assets/data/itemsExpanded.json");
const EQUIPMENT_STRINGS = {
  weapon: "Weapon",
};

const API_STRINGS = {
  ROOT: "http://dnd5eapi.co",
};
const rawItems = fs.readFileSync(ITEMS_PATH);
const items = JSON.parse(rawItems);

async function getData(str) {
  const { data } = await axios.get(str);
  const details = await data;
  return details;
}

async function iterateAndReturnData() {
  console.log("starting item expansion");
  for (let i = 0; i < items.count; i++) {
    let itemurl = items.results[i].url;
    let fullUrl = API_STRINGS.ROOT + itemurl;
    console.log({ fullUrl });

    try {
      items.results[i] = await getData(fullUrl);
      items.results[i].desc
        ? (items.results[i].desc = items.results[i].desc[0])
        : null;
    } catch (error) {
      console.log(error);
    }
  }
  console.log({ items }, "items in iterate");
  fs.writeFileSync(NEW_ITEMS_PATH, JSON.stringify(items));
  console.log("itemsExpanded.json created");
}

iterateAndReturnData();
