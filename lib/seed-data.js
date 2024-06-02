const Board = require("./board");
const Column = require("./column");
const Ticket = require("./ticket");

let board = new Board();
board.updateTitle("Project Tracker");

board.addTicket(new Ticket("First ticket", "", 1, Column.STATUS.todo), Column.STATUS.todo);
board.addTicket(new Ticket("Firstp ticket", "", 1, Column.STATUS.inProgress), Column.STATUS.inProgress);
board.addTicket(new Ticket("Ticket in review", "", 1, Column.STATUS.review), Column.STATUS.review);
board.addTicket(new Ticket("Finished ticket", "", 1, Column.STATUS.done), Column.STATUS.done);
board.addTicket(new Ticket("second todo", "", 1, Column.STATUS.todo), Column.STATUS.todo);
board.addTicket(new Ticket("Firstl ticket", "", 1, Column.STATUS.monitoring), Column.STATUS.monitoring);
board.addTicket(new Ticket("Firstnn ticket", "", 1, Column.STATUS.testing), Column.STATUS.testing);
board.addTicket(new Ticket("Firstpp ticket", "", 1, Column.STATUS.todo), Column.STATUS.todo);
board.addTicket(new Ticket("wow ticket", "", 1, Column.STATUS.review), Column.STATUS.review);

module.exports = board;