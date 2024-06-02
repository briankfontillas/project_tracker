const Board = require("./board");
const Column = require("./column");
const Ticket = require("./ticket");

let board = new Board();
board.updateTitle("Project Tracker");

board.addTicket(new Ticket("First ticket"), Column.STATUS.todo);
board.addTicket(new Ticket("First ticket"), Column.STATUS.inProgress);
board.addTicket(new Ticket("Ticket in review"), Column.STATUS.review);
board.addTicket(new Ticket("Finished ticket"), Column.STATUS.done);
board.addTicket(new Ticket("second todo"), Column.STATUS.todo);
board.addTicket(new Ticket("First ticket"), Column.STATUS.monitoring);
board.addTicket(new Ticket("First ticket"), Column.STATUS.testing);
board.addTicket(new Ticket("First ticket"), Column.STATUS.todo);
board.addTicket(new Ticket("wow ticket"), Column.STATUS.review);

module.exports = board;