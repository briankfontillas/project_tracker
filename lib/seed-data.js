const Board = require("./board");
const Column = require("./column");
const Ticket = require("./ticket");

let board = new Board();
board.updateTitle("Project Tracker");

board.addTicket(new Ticket("First ticket"));
board.addTicket(new Ticket("Ticket in review"), Column.STATUS.review);
board.addTicket(new Ticket("Finished ticket"), Column.STATUS.done);

module.exports = board;