const Column = require("./column");
const Ticket = require("./ticket");
const STATUS = require("./column").STATUS;
const nextId = require("./nextId");


class Board {
  constructor() {
    this.id = nextId();
    this.title = "";
    this.columns = [
      new Column(STATUS.todo),
      new Column(STATUS.inProgress),
      new Column(STATUS.review),
      new Column(STATUS.testing),
      new Column(STATUS.monitoring),
      new Column(STATUS.done)
    ];
  }

  static create(rawBoardData) {
    let board = Object.assign(new Board(), {
      id: rawBoardData.id,
      title: rawBoardData.title,
    });
    board.columns = [];

    rawBoardData.columns.forEach(column => board.columns.push(Column.create(column)));
    return board;
  }

  getTitle() {
    return this.title;
  }

  getColumns() {
    return this.columns;
  }

  updateTitle(title) {
    this.title = String(title);
  }

  firstColumn() {
    return this.columns[0];
  }

  lastColumn() {
    let colLength = this.columns.length;
    return this.columns[colLength - 1];
  }

  findColumn(title) {
    return this.getColumns().find(column => column.title === title);
  }

  findColumnWithTicket(title) {
    return this.getColumns().find(column => {
      for (let ticket of column.tickets) {
        if (ticket.title === title) return true;
      }
    })
  }

  findTicketByTitle(title) {
    let column = this.findColumnWithTicket(title);
    return column.findTicketByTitle(title);
  }

  findColumnWithId(id) {
    return this.getColumns().find(column => {
      for (let ticket of column.tickets) {
        if (ticket.id === id) return true;
      }
    });
  }

  findTicketById(id) {
    let column = this.findColumnWithId(id);
    return column ? column.findTicketById(id) : undefined;
  }

  getTotalTickets() {
    const columns = this.getColumns();
    let ticketTotal = 0;

    columns.forEach(column => {
      const tickets = column.getTickets();
      ticketTotal += tickets.length;
    });

    return ticketTotal;
  }

  addTicket(ticket, status = STATUS.todo) {
    let column = this.findColumn(status);

    column.tickets.push(ticket);
  }

  removeTicketByTitle(title) {
    const column = this.findColumnWithTicket(title);
    let titles = column.tickets.map(ticket => ticket.title);
    let ticketIndex = titles.indexOf(title);

    return column.tickets.splice(ticketIndex, 1);
  }

  progressTicket(ticketTitle) {
    let lastColumnTitles = this.lastColumn()
      .tickets
      .map(ticket => ticket.title);

    if (lastColumnTitles.includes(ticketTitle)) {
      return false
    };

    const columns = this.getColumns();
    const ticket = this.removeTicketByTitle(ticketTitle)[0];

    for (const column of columns) {
      if (column.title === ticket.status) {
        let colIndex = columns.indexOf(column);
        let nextColumn = columns[colIndex + 1];
        ticket.status = nextColumn.title;
        nextColumn.tickets.push(ticket);
        break;
      }
    }
  }

  regressTicket(ticketTitle) {
    let firstColumnTitles = this.firstColumn()
      .tickets
      .map(ticket => ticket.title);
      
    if (firstColumnTitles.includes(ticketTitle)) {
      return false;
    };
    const columns = this.getColumns();
    const ticket = this.removeTicketByTitle(ticketTitle)[0];

    for (const column of columns) {
      if (column.title === ticket.status) {
        let colIndex = columns.indexOf(column);
        let nextColumn = columns[colIndex - 1];
        ticket.status = nextColumn.title;
        nextColumn.tickets.push(ticket);
        break;
      }
    }
  }

  sortTicketsByPriority() {
    const columns = this.getColumns();
    columns.forEach(column => {
      column.sortTicketsByPriority();
    });
  }

  clear() {
    this.columns = [
      new Column(STATUS.todo),
      new Column(STATUS.inProgress),
      new Column(STATUS.review),
      new Column(STATUS.testing),
      new Column(STATUS.monitoring),
      new Column(STATUS.done)
    ];
  }
}

module.exports = Board;