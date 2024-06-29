class URL {

  static TYPES = {
    related: 'Related',
    pr: 'Pull-request',
    blocking: 'Blocking',
    blockedBy: 'Blocked by',
    other: 'Other'
  };

  constructor(type, link) {
    this.type = type;
    this.link = link;
  }

  getType() {
    return this.type;
  }

  getLink() {
    return this.link;
  }

  updateType(newType) {
    this.type = newType;
  }

  updateLink(newLink) {
    this.link = newLink;
  }
}

module.exports = URL;