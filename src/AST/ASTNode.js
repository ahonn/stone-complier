class ASTNode {
  child(i) {
    throw new Error('No child')
  }

  numChildren() {
    return 0
  }

  children() {
    return []
  }

  location() {
    throw new Error('No location')
  }
  
  iterator() {
    return this.children()
  }
}

module.exports = ASTNode