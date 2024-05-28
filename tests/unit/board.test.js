const Board = require("../../lib/board");

describe("Initialized board", () => {
  test("existing board", () => {
    let board = new Board();

    expect(board).toBeTruthy();
    expect(board.getTitle()).toBe("");
    expect(board.columns.length).toBe(5);
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
    expect(board.columns.length).toBe(5);
  });
});
