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

  test("Cannot move ticket to the right if last column", () => {
    const doneTickets = board.findColumn(Column.STATUS.done).tickets;

    board.addTicket(testTicket, Column.STATUS.done);
    board.progressTicket(testTicket);
    expect(doneTickets.length).toBe(2);
  });
});