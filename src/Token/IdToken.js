const Token = require("./Token.js")

class IdToken extends Token {
  constructor(line, id) {
    super(line)
    this._text = id
  }

  isIdentifier() {
    return true
  }

  getText() {
    return this._text
  }
}

module.exports = IdToken;