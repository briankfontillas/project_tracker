const STATUS = require("../public/constants").STATUS;

class Ticket {
  constructor(title = "") {
    this.title = title;
    this.description = "";
    this.priority = 1;
    this.status = STATUS.todo;
  }

  getTitle() {
    return this.title;
  }

  updateTitle(title) {
    this.title = title;
  }

  updateDescription(description) {
    this.description = description;
  }

  updatePriority(pri) {
    this.priority = pri;
  }

  updateStatus(status) {
    this.status = status;
  }
}

module.exports = Ticket;