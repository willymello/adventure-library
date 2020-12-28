export default sqlStrings = {
  CREATE: {
    ITEMS_TABLE:
      "CREATE TABLE IF NOT EXISTS items" +
      "(id INTEGER PRIMARY KEY AUTOINCREMENT," +
      " name TEXT, desc TEXT, category TEXT, count INT)",
  },
};
