const express = require("express");
const laneRouter = express.Router();
let db = require("../database.js");

laneRouter.get("/", (req, res) => {
  let sql = "select * from lane";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

laneRouter.post("/", (req, res) => {
  let sql = "INSERT INTO lane (name) VALUES (?)";
  let params = [req.body.name];
  db.run(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

laneRouter.put("/:id", (req, res) => {
  let sql = "UPDATE lane set name=COALESCE(?,name) WHERE id=?";
  let params = [req.body.name, req.params.id];
  db.run(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

laneRouter.delete("/:id", (req, res) => {
  let sql = "DELETE from lane WHERE id=?";
  let params = [req.params.id];
  db.run(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

module.exports = laneRouter;
