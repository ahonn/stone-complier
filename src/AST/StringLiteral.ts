import ASTLeaf from './ASTLeaf'
import ASTree from './ASTree'
import Token from '../Token/Token'
import Environment from '../Env/Environment'

class StringLiteral extends ASTLeaf {
  constructor(t: Token) {
    super(t)
  }

  value(): string {
    return this.getToken().getText()
  }

  eval(env: Environment): any {
    return this.value()
  }
}

export default StringLiteral