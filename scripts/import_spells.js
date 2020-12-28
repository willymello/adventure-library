"use strict";

const fs = require("fs");
const axios = require("axios");
const itemsResponse = require("../assets/data/items.json");
const ITEMS_PATH =
  "/Users/willy.mello/PersonalProjects/AdventureLibrary/assets/data/items.json";

const NEW_ITEMS_PATH =
  "/Users/willy.mello/PersonalProjects/AdventureLibrary/assets/data/items-rewrite.json";

const EQUIPMENT_STRINGS = {
  weapon: "Weapon",
};

const API_STRINGS = {
  ROOT: "http://dnd5eapi.co",
};

// const items = JSON.stringify(itemsResponse).toString();
const rawItems = fs.readFileSync(ITEMS_PATH);
const items = JSON.parse(rawItems);

async function getData(str) {
  const { data } = await axios.get(str);
  const details = await data;
  return details;
}

async function iterateAndReturnData() {
  for (let i = 0; i < items.count; i++) {
    let itemurl = items.results[i].url;
    let fullUrl = API_STRINGS.ROOT + itemurl;
    console.log({ fullUrl });

    try {
      items.results[i].details = await getData(fullUrl);
    } catch (error) {
      console.log(error);
    }
  }
  console.log({ items }, "items in iterate");
  fs.writeFileSync(NEW_ITEMS_PATH, JSON.stringify(items));
}
iterateAndReturnData();
console.log({ items });
