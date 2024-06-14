const Ticket = require("./ticket");

class Column {
  static STATUS = {
    todo: "To-do",
    inProgress: "In progress",
    review: "In review",
    testing: "In testing",
    monitoring: "Monitoring",
    done: "Done"
  };
  constructor(title) {
    this.title = title;
    this.tickets = [];
  }

  static create(data) {
    let column = Object.assign(new Column(), {
      title: data.title
    });

    data.tickets.forEach(ticket => column.tickets.push(Ticket.create(ticket)));
    return column;
  }

  getTitle() {
    return this.title;
  }

  getTickets() {
    return this.tickets;
  }

  getTicketsLength() {
    return this.getTickets().length;
  }

  findTicketByTitle(title) {
    let tickets = this.getTickets();
    return tickets.find(ticket => ticket.title === title);
  }

  findTicketById(id) {
    let tickets = this.getTickets();
    return tickets.find(ticket => ticket.id === id);
  }

  sortTicketsByPriority() {
    return this.getTickets().sort((a, b) => +a.priority - +b.priority);
  }

  clear() {
    this.tickets = [];
  }
}

module.exports = Column;