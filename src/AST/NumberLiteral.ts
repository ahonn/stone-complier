import ASTLeaf from './ASTLeaf'
import Token from '../Token/Token'
import Environment from '../Env/Environment'

class Numberliteral extends ASTLeaf {
  constructor(t: Token) {
    super(t)
  }

  value(): number | void {
    return this.getToken().getNumber()
  }

  eval(env: Environment): any {
    return this.value()
  }
}

export default Numberliteral