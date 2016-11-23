const ASTNode = require('./ASTNode.js')

class ASTLeaf extends ASTree {
  constructor(token) {
    super()
    this._token = token
  }

  toString() {
    return this._token.getText()
  }

  location() {
    return "at line " + token.getLineNumber()
  }

  token() {
    return this._token
  }
}

module.exports = ASTLeaf