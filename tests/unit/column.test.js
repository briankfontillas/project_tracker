const Column = require("../../lib/column");
const Ticket = require("../../lib/ticket");

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

  test("Sort column", () => {
    let column = new Column("test1");
    let tickets = column.tickets;
    tickets = [
      new Ticket(
        {
          title: "title1",
          priority: 2,
          status: column.title
        }
      ),
      new Ticket(
        {
          title: "title2",
          priority: 1,
          status: column.title
        }
      ),
      new Ticket(
        {
          title: "title3",
          priority: 2,
          status: column.title
        }
      ),
      new Ticket(
        {
          title: "title4",
          priority: 0,
          status: column.title
        }
      ),
      new Ticket(
        {
          title: "title5",
          priority: 3,
          status: column.title
        }
      ),
    ];
    let expectedList = tickets
      .map(ticket => ticket.priority)
      .sort((a, b) => a - b);

    column.sortTicketsByPriority();

    let actualList = tickets.map(ticket => ticket.priority);

    expect(actualList).toEqual(expectedList);
  });
});