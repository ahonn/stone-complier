const StoneException = require("../Exception/StoneException.js")

class Token {
  constructor(line) {
    this._lineNumber = line
  }

  static get EOF() {
    return new Token(-1)
  }

  static get EOL() {
    return "\\n"
  }

  getLineNumber() {
    return this._lineNumber
  }

  isIdentifier() { 
    return false 
  }

  isString() {
    return false 
  }
  
  getNumber() { 
    throw new StoneException("not number token")
  }

  getText() {
    return ""
  }

}

module.exports = Token
