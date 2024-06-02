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
  if (testBoard.title) {
    res.redirect("/dashboard");
  } else {
    res.redirect("/new-board");
  }
});

app.get("/new-board", (req, res) => {
  res.render("new-board");
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard", { testBoard });
});

app.get("/new-ticket", (req, res) => {
  console.log(testBoard.columns)
  res.render("new-ticket", { testBoard });
})

app.listen(port, host, () => {
  console.log(`Project tracker listening on port ${port} of host ${host}`);
});