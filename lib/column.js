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

  clear() {
    this.tickets = [];
  }
}

module.exports = Column;