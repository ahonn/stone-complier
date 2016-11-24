import Token from '../Token/Token'
import ASTLeaf from './ASTLeaf';

class Numberliteral extends ASTLeaf {
  constructor(t: Token) {
    super(t)
  }

  value(): number | void {
    return this.getToken().getNumber()
  }
}

export default Numberliteral