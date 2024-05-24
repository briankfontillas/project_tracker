class Board {
  constructor() {
    this.title = "";
    this.columns = [];
  }

  getTitle() {
    return this.title;
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

  }
}

module.exports = Board;