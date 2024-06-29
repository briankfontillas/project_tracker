const nextId = require("./nextId");
const URL = require('./url');
const STATUS = require("../public/constants").STATUS;

class Ticket {
  constructor(title = "", description = "", priority = 1, status = STATUS.todo) {
    this.id = nextId();
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.status = status;
    this.links = [];
  }

  static create(data) {
    return Object.assign(new Ticket(), data);
  }

  getTitle() {
    return this.title;
  }

  getLinks() {
    return this.links;
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

  addLink(type, url) {
    this.getLinks().push(new URL(type, url));
  }
}

module.exports = Ticket;