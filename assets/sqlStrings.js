export default sqlStrings = {
  CREATE: {
    ITEMS_TABLE: () => {
      return (
        "create table if not exists items (" +
        "\n" +
        " id integer primary key autoincrement ," +
        "\n" +
        " name text not null unique, " +
        "\n" +
        " desc text ," +
        "\n" +
        " category text not null, " +
        "\n" +
        " details text not null" +
        "\n" +
        ");"
      );
    },
    SPELLS_TABLE:
      "CREATE TABLE IF NOT EXISTS spells" +
      "(id INTEGER PRIMARY KEY AUTOINCREMENT," +
      " name TEXT NOT NULL UNIQUE, desc TEXT, details TEXT)",
  },
  INSERT: {
    ITEM: "INSERT INTO items (name, desc, category, details) values (?,?,?,?)",
    SPELL: "INSERT INTO items (name, desc, details)",
  },
  SELECT: {
    ALL_ITEMS: "SELECT * FROM items",
    ONE_ITEM: (name) => {
      return `SELECT * FROM items WHERE name = ${name.toString()}`;
    },
    ONE_COLUMN_FROM_ITEMS: (column) => {
      return `SELECT ${column.toString()} FROM items ;`;
    },
  },
  CONSTANTS: {
    EQUIPMENT_CATEGORY: {
      WEAPON: "Weapon",
    },
  },
};
