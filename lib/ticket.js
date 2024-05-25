const STATUS = require("../public/constants").STATUS;

class Ticket {
  constructor() {
    this.title = "";
    this.description = "";
    this.priority = 1;
    this.status = STATUS.todo;
  }

  updateTitle(title) {
    this.title = title;
  }

  updateDescription(description) {
    this.description = description;
  }

  updatePriority(pri) {
    this.pri = pri;
  }

  updateStatus(status) {
    this.status = status;
  }
}