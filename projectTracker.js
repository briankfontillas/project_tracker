const express = require("express");
const morgan = require("morgan");
const { body, validationResult } = require("express-validator");
const testBoard = require("./lib/seed-data");
const Board = require("./lib/board");
const Column = require("./lib/column");
const Ticket = require("./lib/ticket");
const nextId = require("./lib/nextId");

const app = express();
const host = "localhost";
const port = 3000;

app.set("views", "./views");
app.set("view engine", "pug");

app.use(morgan("common"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false}));

app.get("/", (req, res) => {
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

app.get("/dashboard/update", (req, res) => {
  res.render("board-title", { testBoard });
});

app.get("/new-ticket", (req, res) => {
  res.render("new-ticket", {
    testBoard,
    statuses: Column.STATUS,
  });
});

app.get("/ticket", (req, res) => {
  res.redirect("/new-ticket");
});

app.get("/ticket/:id", (req, res) => {
  let id = req.params.id;
  let ticket = testBoard.findTicketById(+id)

  res.render("edit-ticket", {
    testBoard,
    statuses: Column.STATUS,
    ticket,
  });
});

app.post("/dashboard/update", (req, res) => {
  let newTitle = req.body.projectTitle;
  testBoard.updateTitle(newTitle);

  res.redirect("/dashboard");
});

app.post("/dashboard/sort", (req, res) => {
  testBoard.sortTicketsByPriority();
  res.redirect("/dashboard");
})

app.post("/dashboard/clear", (req, res) => {
  testBoard.clear();
  res.redirect("/dashboard");
});

app.post("/ticket/create",
  [
    body("title")
      .trim()
      .isLength({ min: 1 })
      .bail()
      .isLength({ max: 25 })
      .withMessage("Title length needs to be between 1 - 25 characters."),
  ],
  (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("new-ticket", {
        errorMessages: errors.array().map(error => error.msg),
        testBoard: testBoard,
        statuses: Column.STATUS,
      });
    } else {
      next();
    }
  },
  (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  let status = req.body.status;
  let priority = req.body.priority;

  testBoard.addTicket(new Ticket(title, description, priority, status), status);
  res.redirect("/dashboard");
});

app.post("/ticket/:id/update", (req, res) => {
  let ticket = testBoard.findTicketById(+(req.params.id));
  ticket.updateTitle(req.body.title);
  ticket.updateDescription(req.body.description);
  ticket.updatePriority(req.body.priority);
  ticket.updateStatus(req.body.status);

  testBoard.addTicket(testBoard.removeTicketByTitle(req.body.title)[0], req.body.status);

  res.redirect("/dashboard");
});

app.post("/progress", (req, res) => {
  let ticketTitle = req.body.ticketTitle;
  testBoard.progressTicket(ticketTitle);
  res.redirect("/dashboard");
});

app.post("/regress", (req, res) => {
  let ticketTitle = req.body.ticketTitle;
  testBoard.regressTicket(ticketTitle);
  res.redirect("/dashboard");
});

app.listen(port, host, () => {
  console.log(`Project tracker listening on port ${port} of host ${host}`);
});