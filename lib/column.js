class Column {
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
    
  }
}

module.exports = Column;