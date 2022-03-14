const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database("./database/kanban.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the in-memory SQlite database.");
  db.run(
    `CREATE TABLE "lane" (
        "id"	INTEGER NOT NULL UNIQUE,
        "name"	INTEGER,
        PRIMARY KEY("id" AUTOINCREMENT))`,
    (err) => {
      if (!err) {
        db.run(
          `CREATE TABLE "card" (
            "id"	INTEGER NOT NULL UNIQUE,
            "name"	TEXT,
            "type"	TEXT NOT NULL DEFAULT 'BUG',
            "laneId"	INTEGER,
            PRIMARY KEY("id" AUTOINCREMENT))`
        );
      }
    }
  );
});

module.exports = db;
