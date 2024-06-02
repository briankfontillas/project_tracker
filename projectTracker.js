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
app.use(express.urlencoded({ extended: false}));

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
  console.log("MY BOARD:", testBoard);
  res.render("dashboard", { testBoard });
});

app.get("/new-ticket", (req, res) => {
  res.render("new-ticket", {
    testBoard,
    statuses: Column.STATUS,
  });
});

app.post("/dashboard/clear", (req, res) => {
  testBoard.clear();
  res.redirect("/dashboard");
});

app.post("/ticket/create", (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  let status = req.body.status;
  let priority = req.body.priority;

  console.log(req.body);

  testBoard.addTicket(new Ticket(title, description, priority, status), status);
  res.redirect("/dashboard");
});

app.post("/progress", (req, res) => {
  let ticketTitle = req.body.ticketTitle;
  // console.log("TITLE:", ticketTitle);
  testBoard.progressTicket(ticketTitle);
  res.redirect("/dashboard");
});

app.listen(port, host, () => {
  console.log(`Project tracker listening on port ${port} of host ${host}`);
});