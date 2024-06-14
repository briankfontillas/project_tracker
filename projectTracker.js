const express = require("express");
const morgan = require("morgan");
const { body, validationResult } = require("express-validator");
const session = require("express-session");
const store = require("connect-loki");
const Board = require("./lib/board");
const Column = require("./lib/column");
const Ticket = require("./lib/ticket");
const nextId = require("./lib/nextId");

const app = express();
const LokiStore = store(session);
const host = "localhost";
const port = 3000;

const boardData = new Board();

function validateTitle(title, whichTitle) {
  return body(title)
    .trim()
    .isLength({ min: 1 })
    .withMessage(`${whichTitle} is required.`)
    .bail()
    .isLength({ max: 25 })
    .withMessage(`${whichTitle} is too long. Maximum length is 25 characters. `)
}

const clone = object => {
  return JSON.parse(JSON.stringify(object));
};

app.set("views", "./views");
app.set("view engine", "pug");

app.use(morgan("common"));
app.use(session({
  cookie: {
    httpOnly: true,
    maxAge: 31 * 24 * 60 * 60 * 1000, // 31 days in milliseconds
    path: "/",
    secure: false,
  },
  name: "project-tracker-session-id",
  resave: false,
  saveUninitialized: true,
  secret: "this is not very secure",
  store: new LokiStore({}),
}));
app.use((req, res, next) => {
  if (!("boardData" in req.session)) {
    req.session.boardData = boardData;
  }

  next();
});
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false}));

app.get("/", (req, res) => {
  if (req.session.boardData.title) {
    res.redirect("/dashboard");
  } else {
    res.redirect("/new-board");
  }
});

app.get("/new-board", (req, res) => {
  res.render("new-board");
});

app.get("/dashboard", (req, res) => {
  if (!req.session.boardData) res.render("not-found");
  res.render("dashboard", { boardData: req.session.boardData });
});

app.get("/dashboard/update", (req, res) => {
  res.render("board-title", { boardData: req.session.boardData });
});

app.get("/new-ticket", (req, res) => {
  res.render("new-ticket", {
    boardData: req.session.boardData,
    statuses: Column.STATUS,
  });
});

app.get("/ticket", (req, res) => {
  res.redirect("/new-ticket");
});

app.get("/ticket/:id", (req, res) => {
  let id = req.params.id;
  req.session.boardData = Board.create(req.session.boardData);
  let ticket = req.session.boardData.findTicketById(+id)

  if (!ticket) {
    res.render("not-found");
  } else {
    res.render("edit-ticket", {
      boardData: req.session.boardData,
      statuses: Column.STATUS,
      ticket,
    });
  }
});

app.post("/dashboard/update",
  [validateTitle("projectTitle", "Project title")],
  (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (!req.session.boardData.title) {
        res.render("new-board", {
          boardData: req.session.boardData,
          errorMessages: errors.array().map(error => error.msg),
        });
      } else {
        res.render("board-title", {
          boardData: req.session.boardData,
          errorMessages: errors.array().map(error => error.msg),
        });
      }
    } else {
      next();
    }
  },
  (req, res) => {
    let newTitle = req.body.projectTitle;
    req.session.boardData = Board.create(req.session.boardData);
    req.session.boardData.updateTitle(newTitle);
    res.redirect("/dashboard");
});

app.post("/dashboard/sort", (req, res) => {
  req.session.boardData.sortTicketsByPriority();
  res.redirect("/dashboard");
})

app.post("/dashboard/clear", (req, res) => {
  req.session.boardData.clear();
  res.redirect("/dashboard");
});

app.post("/ticket/create",
  [validateTitle("title", "Project title")],
  (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("new-ticket", {
        errorMessages: errors.array().map(error => error.msg),
        boardData: req.session.boardData,
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

  req.session.boardData.addTicket(new Ticket(title, description, priority, status), status);
  res.redirect("/dashboard");
});

app.post("/ticket/:id/update",
  [validateTitle("title", "Ticket title")],
  (req, res, next) => {
    let ticket = req.session.boardData.findTicketById(+(req.params.id));
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("edit-ticket", {
        errorMessages: errors.array().map(error => error.msg),
        boardData: req.session.boardData,
        statuses: Column.STATUS,
        ticket: ticket,
      });
    } else {
      next();
    }
  },
  (req, res) => {
    let ticket = req.session.boardData.findTicketById(+(req.params.id));
    ticket.updateTitle(req.body.title);
    ticket.updateDescription(req.body.description);
    ticket.updatePriority(req.body.priority);
    ticket.updateStatus(req.body.status);

    req.session.boardData.addTicket(req.session.boardData.removeTicketByTitle(req.body.title)[0], req.body.status);

    res.redirect("/dashboard");
});

app.post("/progress", (req, res) => {
  let ticketTitle = req.body.ticketTitle;
  req.session.boardData = Board.create(req.session.boardData);
  req.session.boardData.progressTicket(ticketTitle);
  res.redirect("/dashboard");
});

app.post("/regress", (req, res) => {
  let ticketTitle = req.body.ticketTitle;
  req.session.boardData = Board.create(req.session.boardData);
  req.session.boardData.regressTicket(ticketTitle);
  res.redirect("/dashboard");
});

app.listen(port, host, () => {
  console.log(`Project tracker listening on port ${port} of host ${host}`);
});