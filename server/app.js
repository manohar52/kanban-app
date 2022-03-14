const express = require("express");
const laneRouter = require("./routes/lanes");
const cardRouter = require("./routes/cards");
const cors = require("cors");
const path = require("path");
const corsOpts = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
};
var db = require("./database.js")
var app = express();

app.use(cors(corsOpts));
app.use(express.json());
app.use("/api/lanes", laneRouter)
app.use("/api/cards", cardRouter)
const port = process.env.PORT || 4000;


// db.close((err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log("Close the database connection.");
// });

app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log("Example app listening on port 4000!");
});
