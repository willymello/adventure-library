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
    SPELLS_TABLE: () => {
      return (
        "CREATE TABLE IF NOT EXISTS spells" +
        "(id INTEGER PRIMARY KEY AUTOINCREMENT," +
        " name TEXT NOT NULL UNIQUE, desc TEXT, details TEXT);"
      );
    },
    CHARACTER_TABLE: () => {
      return (
        "create table if not exists characters (" +
        "\n" +
        " id integer primary key autoincrement ," +
        "\n" +
        " name text not null , " +
        "\n" +
        " race text not null," +
        "\n" +
        " class text not null, " +
        "\n" +
        " skills text not null" +
        "\n" +
        " level integer not null" +
        "\n" +
        " hit_points integer not null" +
        "\n" +
        " age integer not null" +
        "\n" +
        " inventory_id integer" +
        "\n" +
        " stats string not null" +
        "\n" +
        " asi string not null" +
        "\n" +
        ");"
      );
    },
    INVENTORY_TABLE: () => {
      return (
        "create table if not exists inventories (" +
        "\n" +
        " character_id integer not null , " +
        "\n" +
        " item_id integer not null," +
        "\n" +
        " item_name string not null," +
        "\n" +
        " count integer not null, " +
        "\n" +
        ");"
      );
    },
  },
  INSERT: {
    ITEM: "INSERT INTO items (name, desc, category, details) values (?,?,?,?)",
    SPELL: "INSERT INTO spells (name, desc, details) values (?,?,?)",
    CHARACTER:
      "INSERT INTO characters (id, name, race, class, skills, level, hit_points, age, inventory_id, stats, asi) values (?,?,?,?,?,?,?,?,?,?)",
    INVENTORY_ITEM_COUNT: (count) => {
      // db.transaction(tx => {
      //   tx.executeSql('UPDATE items SET count = count + 1 WHERE id = ?', [id],
      //     (txObj, resultSet) => {
      //       if (resultSet.rowsAffected > 0) {
      //         let newList = this.state.data.map(data => {
      //           if (data.id === id)
      //             return { ...data, count: data.count + 1 }
      //           else
      //             return data
      //         })
      //         this.setState({ data: newList })
      //       }
      //     })
      // })
      return ` UPDATE items SET count = ${count} WHERE character_id = ? AND item_id = ?`;
    },
  },
  SELECT: {
    ALL_ITEMS: "SELECT * FROM items;",
    ONE_ITEM: (name) => {
      return `SELECT * FROM items WHERE name = ${name.toString()};`;
    },
    ONE_COLUMN_FROM_ITEMS: (column) => {
      return `SELECT ${column.toString()} FROM items ;`;
    },
    ALL_SPELLS: "SELECT * FROM spells;",
  },
  CONSTANTS: {
    EQUIPMENT_CATEGORY: {
      WEAPON: "Weapon",
    },
    FIELDS: {
      ID: "id",
      NAME: "name",
      RACE: "race",
      CLASS: "class",
      SKILLS: "skills",
      LEVEL: "level",
      HIT_POINTS: "hit_points",
      AGE: "age",
      INVENTORY_ID: "inventory_id",
      CHARACTER_ID: "character_id",
      STATS: "stats",
      ASI: "ASI",
      COUNT: "count",
      DETAILS: "details",
      DESCRIPTION: "desc",
    },
    TABLE_NAMES: {
      ITEMS: "items",
      CHARACTERS: "characters",
      SPELLS: "spells",
      INVENTORIES: "inventories",
    },
  },
};
