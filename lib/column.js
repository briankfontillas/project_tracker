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

  clear() {
    let tickets = this.getTickets();
    tickets = [];
  }
}

module.exports = Column;