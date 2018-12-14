const Dom = require('./src/dom');

class DOMParse {
  constructor() {}

  parseFromString(str) {
    return new Dom(str);
  }
}

module.exports = DOMParse;
