const Token = require("./Token.js")

class NumToken extends Token {
  constructor(line, value) {
    super(line)
    this._value = value
  }

  isNumber() {
    return true
  }
  
  getNumber() {
    return this._value
  }

  getText() {
    return this._value.toString()
  } 

}

module.exports = NumToken;
