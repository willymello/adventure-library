"use strict";

const fs = require("fs");
const { resolve } = require("path");
const axios = require("axios");
const itemsResponse = require("../assets/data/items.json");
const SPELLS_PATH = resolve("../assets/data/spells.json");

const NEW_SPELLS_PATH = resolve("../assets/data/spellsExpanded.json");

const API_STRINGS = {
  ROOT: "http://dnd5eapi.co",
};

// const items = JSON.stringify(itemsResponse).toString();
const rawSpells = fs.readFileSync(SPELLS_PATH);
const spells = JSON.parse(rawSpells);

async function getData(str) {
  const { data } = await axios.get(str);
  const details = await data;
  return details;
}

async function iterateAndReturnData() {
  for (let i = 0; i < spells.count; i++) {
    let spellUrl = spells.results[i].url;
    let fullUrl = API_STRINGS.ROOT + spellUrl;
    console.log("migrating", { fullUrl });

    try {
      spells.results[i] = await getData(fullUrl);
      spells.results[i].desc
        ? (spells.results[i].desc = spells.results[i].desc[0])
        : null;
      spells.results[i].higher_level
        ? (spells.results[i].higher_level = spells.results[i].higher_level[0])
        : null;
    } catch (error) {
      console.log(error);
    }
  }
  fs.writeFileSync(NEW_SPELLS_PATH, JSON.stringify(spells));
}
iterateAndReturnData();
