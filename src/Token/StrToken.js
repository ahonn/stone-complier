const Token = require("./Token.js")

class StrToken extends Token {
  constructor(line, str) {
    super(line)
    this._str = str
  }

  isString() {
    return true
  }

  getText() {
    return this._str
  }
}

module.exports = StrToken;