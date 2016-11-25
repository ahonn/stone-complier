import ASTLeaf from './ASTLeaf'
import ASTree from './ASTree'
import Token from '../Token/Token'

class StringLiteral extends ASTLeaf {
  constructor(t: Token) {
    super(t)
  }

  value(): string {
    return this.getToken().getText()
  }
}

export default StringLiteral