const Board = require("../../lib/board");
const Column = require("../../lib/column");
const Ticket = require("../../lib/ticket");

describe("Ticket usage operations", () => {
  let board;
  let testTicket;

  beforeEach(() => {
    // add tickets to columns
    board = new Board();
    testTicket = new Ticket("Test ticket");
    let columns = board.columns;

    columns.forEach(column => {
      column.tickets.push(new Ticket());
    });
  });

  test("Add and update new ticket", () => {
    const todoTickets = board.findColumn(Column.STATUS.todo).tickets;

    board.addTicket(testTicket);
    expect(todoTickets).toContain(testTicket);

    testTicket.updateTitle("UpdatedTitle");
    expect(todoTickets[todoTickets.length - 1].title).toBe("UpdatedTitle");
  });

  test("Move ticket to the right", () => {
    const todoTickets = board.findColumn(Column.STATUS.todo).tickets;

    board.addTicket(testTicket);
    expect(todoTickets.length).toBe(2);

    board.progressTicket(testTicket.title);
    expect(todoTickets.length).toBe(1);
  });

  test("Move ticket to the left", () => {
    const progressTickets = board.findColumn(Column.STATUS.inProgress).tickets;
    testTicket.updateStatus(Column.STATUS.inProgress);
    board.addTicket(testTicket, Column.STATUS.inProgress);
    expect(progressTickets.length).toBe(2);

    board.regressTicket(testTicket.title);
    expect(progressTickets.length).toBe(1);
  });

  test("Cannot move ticket to the right if last column", () => {
    const doneTickets = board.findColumn(Column.STATUS.done).tickets;

    board.addTicket(testTicket, Column.STATUS.done);
    board.progressTicket(testTicket.title);
    expect(doneTickets.length).toBe(2);
  });

  test("Cannot move ticket to the left if first column", () => {
    const todoTickets = board.findColumn(Column.STATUS.todo).tickets;
    
    board.addTicket(testTicket);
    board.regressTicket(testTicket.title);
    expect(todoTickets.length).toBe(2);
  })
});