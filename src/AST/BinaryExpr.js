const ASTList = require('./ASTList.js')

class BinaryExpr extends ASTList {
  constructor(list) {
    super(list)
  }

  left() {
    return this.child(0)
  }

  operactor() {
    return this.child(1).token().getText()
  }

  right() {
    return this.child(2)
  }
}

module.exports = BinaryExpr