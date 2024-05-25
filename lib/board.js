class Board {
  constructor() {
    this.title = "";
    this.columns = [];
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

  columnAt(index) {

  }

  clear() {
    let columns = this.getColumns();
    columns = [];
  }
}

module.exports = Board;