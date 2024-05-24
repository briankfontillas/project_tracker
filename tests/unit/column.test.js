const Column = require("../../lib/column");

describe("Initialized column", () => {
  test("existing column", () => {
    let col = new Column("Column Title");

    expect(col).toBeTruthy();
    expect(col.getTitle()).toBe("Column Title");
    expect(col.tickets.length).toBe(0);
  });
});

describe("Column operations", () => {
  test("Clear column", () => {
    let col = new Column("title1");
    col.tickets = [{}, {}, {}];

    col.clear();
    expect(col.getTicketsLength()).toBe(0);
  });
});