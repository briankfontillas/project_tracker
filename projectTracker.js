const express = require("express");
const morgan = require("morgan");
const testBoard = require("./lib/seed-data");
const Board = require("./lib/board");
const Column = require("./lib/column");
const Ticket = require("./lib/ticket");

const app = express();
const host = "localhost";
const port = 3000;

function largestColumnLength(columns) {
  let longest = 0;

  columns.forEach(column => {
    let currentLen = column.tickets.length;
    if (currentLen > longest) {
      longest = currentLen;
    }
  });

  return longest;
}

function retrieveRows(maxRows, columns) {
  let counter = 0;
  const rows = [];

  while (counter < maxRows) {
    let row = [];

    for (let index = 0; index < columns.length; index += 1) {
      let column = columns[index];
      let ticket = column.tickets[counter];

      row.push(ticket);
    }

    rows.push(row);
    counter += 1;
  }

  return rows;
}

app.set("views", "./views");
app.set("view engine", "pug");

app.use(morgan("common"));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("dashboard", { testBoard });
});

app.listen(port, host, () => {
  console.log(`Project tracker listening on port ${port} of host ${host}`);
});