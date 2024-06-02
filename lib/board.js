const Column = require("./column");
const Ticket = require("./ticket");
const STATUS = require("./column").STATUS;


class Board {
  constructor() {
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
        console.log("column", column);
        if (ticket.title === title) return true;
      }
    })
  }

  addTicket(ticket, status = STATUS.todo) {
    let column = this.findColumn(status);

    column.tickets.push(ticket);
  }

  removeTicketByTitle(title) {
    const column = this.findColumnWithTicket(title);
    console.log("column in remove func:", column);
    let titles = column.tickets.map(ticket => ticket.title);
    let ticketIndex = titles.indexOf(title);
    console.log("ticket index in remove func:", ticketIndex);

    return column.tickets.splice(ticketIndex, 1);
  }

  progressTicket(ticketTitle) {
    let ticketTitles = this.lastColumn()
      .tickets
      .map(ticket => ticket.title);

    if (ticketTitles.includes(ticketTitle)) {
      return;
    };
    const columns = this.getColumns();
    const ticket = this.removeTicketByTitle(ticketTitle)[0];
    console.log("After remove ticket=", ticket);
    for (const column of columns) {
      // console.log("column title", column.title)
      // console.log("column tickets", column.tickets);
      // console.log("ticket status", ticket.status);
      // console.log("ticket title", ticket.title);
      if (column.title === ticket.status) {
        console.log("title and status match!!")
        console.log("----")
        let colIndex = columns.indexOf(column);
        console.log("columns::", columns);
        console.log("ticket::", ticket)
        console.log("colIndex=", colIndex);
        let nextColumn = columns[colIndex + 1];
        ticket.status = nextColumn.title;

        console.log("NEXTCOLUMN:", nextColumn);

        nextColumn.tickets.push(ticket);
        console.log("nextcolumn now:", nextColumn);
        break;
      }
    }
  }

  regressTicket(ticketTitle) {
    let ticketTitles = this.lastColumn()
      .tickets
      .map(ticket => ticket.title);
      
    if (ticketTitles.includes(ticketTitle)) {
      return;
    };
    const columns = this.getColumns();
    const ticket = this.removeTicketByTitle(ticketTitle);

    for (const column of columns) {
      if (column.title === ticket.status) {
        let colIndex = columns.indexOf(ticket);
        let nextColumn = columns[colIndex - 1];

        nextColumn.push(ticket);
      }
    }
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