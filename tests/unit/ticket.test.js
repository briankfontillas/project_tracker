const Ticket = require("../../lib/ticket");

describe("Initialized ticket", () => {
  test("existing ticket", () => {
    let ticket = new Ticket("Ticket Title");

    expect(ticket).toBeTruthy();
    expect(ticket.getTitle()).toBe("Ticket Title");
  });
});

describe("Ticket operations", () => {
  test("Delete ticket", () => {
    let ticket = new Ticket("title1");

    //todo
  });
});