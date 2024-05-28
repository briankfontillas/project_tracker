const Ticket = require("../../lib/ticket");

describe("Initialized ticket", () => {
  test("existing ticket", () => {
    let ticket = new Ticket();

    expect(ticket).toBeTruthy();
    expect(ticket.getTitle()).toBe("");
  });
});

describe("Ticket operations", () => {
  test("Update ticket", () => {
    let ticket = new Ticket("title1");

    ticket.updateTitle("test_title");
    ticket.updateDescription("Description");
    ticket.updatePriority(2);
    ticket.updateStatus("test status");

    expect(ticket.title).toBe("test_title");
    expect(ticket.description).toBe("Description");
    expect(ticket.priority).toBe(2);
    expect(ticket.status).toBe("test status");
  });
});