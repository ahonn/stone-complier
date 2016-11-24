import Token from '../Token/Token';
import ASTLeaf from './ASTLeaf';

class NameLiteral extends ASTLeaf {
  constructor(t: Token) {
    super(t)
  }

  name(): string {
    return this.getToken().getText()
  }
}

export default NameLiteral