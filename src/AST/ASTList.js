const ASTNode = require('./ASTNode.js')

class ASTList extends ASTNode {
  constructor(list) {
    super()
    this._children = list
  }

  child(i) {
    return this._children[i]
  }

  numChildren() {
    return this._children.length
  }

  children() {
    return this._children
  }

  toString() {
    return '(' + this._children.join(" ") + ')'
  }

  location() {
    for (let node in this._children) {
      let s = node.location()
      if (s != null) {
        return s
      }
    }
    return null
  }
}

module.exports = ASTList