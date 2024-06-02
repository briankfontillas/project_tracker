const express = require("express");
const morgan = require("morgan");
const testBoard = require("./lib/seed-data");
const Board = require("./lib/board");
const Column = require("./lib/column");
const Ticket = require("./lib/ticket");

const app = express();
const host = "localhost";
const port = 3000;

app.set("views", "./views");
app.set("view engine", "pug");

app.use(morgan("common"));
app.use(express.static("public"));

app.get("/", (req, res) => {
  console.log(testBoard.columns)
  res.render("dashboard", {
    testBoard,
  });
});

app.listen(port, host, () => {
  console.log(`Project tracker listening on port ${port} of host ${host}`);
});