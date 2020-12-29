export default sqlStrings = {
  CREATE: {
    ITEMS_TABLE:
      "CREATE TABLE IF NOT EXISTS items" +
      "(id INTEGER PRIMARY KEY AUTOINCREMENT," +
      " name TEXT NOT NULL UNIQUE, desc TEXT, category TEXT, details TEXT)",
    SPELLS_TABLE:
      "CREATE TABLE IF NOT EXISTS spells" +
      "(id INTEGER PRIMARY KEY AUTOINCREMENT," +
      " name TEXT NOT NULL UNIQUE, desc TEXT, details TEXT)",
  },
  INSERT: {
    ITEM: "INSERT INTO items (name, desc, category, details)",
    SPELL: "INSERT INTO items (name, desc, details)",
  },
  SELECT: {
    ALL_ITEMS: "SELECT * FROM items",
    ONE_ITEM: (name) => {
      return `SELECT * FROM items WHERE name=${name}`;
    },
  },
  CONSTANTS: {
    EQUIPMENT_CATEGORY: {
      WEAPON: "Weapon",
    },
  },
};
