const Board = require("../../lib/board");
const Ticket = require("../../lib/ticket");

describe("Initialized board", () => {
  test("existing board", () => {
    let board = new Board();

    expect(board).toBeTruthy();
    expect(board.getTitle()).toBe("");
    expect(board.columns.length).toBe(6);
  });
});

describe("Board operations", () => {
  test("Test updating the title", () => {
    let board = new Board();
    let newTitle = "Test title 1";

    board.updateTitle(newTitle);
    expect(board.getTitle()).toBe(newTitle);
  });

  test("Test updating the title to a number", () => {
    let board = new Board();
    
    board.updateTitle(107);
    expect(board.getTitle()).toBe("107");
  });

  test("Clearing the board", () => {
    let board = new Board();
    board.columns.push({title: "test", tickets: []});

    board.clear();
    expect(board.columns.length).toBe(6);
  });

  test("Deleting ticket from the board", () => {
    let board = new Board();
    let tickets = [{id: 1, status: "To-do"}, {id: 2, status: "To-do"}, {id: 3, status: "To-do"}];
    board.columns[0].tickets = tickets;
    board.removeTicketById(2);
    
    expect(board.columns[0].tickets.length).toBe(2);
    expect(board.findTicketById(2)).toBe(undefined);
  });
});
