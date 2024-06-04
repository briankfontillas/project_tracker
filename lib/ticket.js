const nextId = require("./nextId");
const STATUS = require("../public/constants").STATUS;

class Ticket {
  constructor(title = "", description = "", priority = 1, status = STATUS.todo) {
    this.id = nextId();
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.status = status;
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