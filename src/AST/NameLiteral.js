const ASTLeaf = require('./ASTLeaf.js')

class NameLiteral extends ASTLeaf {
  constructor(token) {
    super(token)
  }

  name() {
    return this.token().getText()
  }
}

module.exports = NameLiteral