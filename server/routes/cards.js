const express = require("express");
const cardRouter = express.Router();
let db = require("../database.js");

cardRouter.get("/:laneId", (req, res) => {
  let sql = "select * from card where laneid=?";
  db.all(sql, [req.params.laneId], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

cardRouter.post("/", (req, res) => {
  let sql = "INSERT INTO card (name,type,laneid) VALUES (?,?,?)";
  let params = [req.body.name,req.body.type,req.body.laneid];
  db.run(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// laneRouter.put("/:id", (req, res) => {
//   let sql = "UPDATE lane set name=COALESCE(?,name) WHERE id=?";
//   let params = [req.body.name, req.params.id];
//   db.run(sql, params, (err, rows) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json(rows);
//   });
// });

cardRouter.delete("/:id", (req, res) => {
  let sql = "DELETE from card WHERE id=?";
  let params = [req.params.id];
  db.run(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

module.exports = cardRouter;
