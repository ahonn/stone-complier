import ASTLeaf from './ASTLeaf'
import Token from '../Token/Token'
import Environment from '../Env/Environment'

class NameLiteral extends ASTLeaf {
  constructor(t: Token) {
    super(t)
  }

  name(): string {
    return this.getToken().getText()
  }

  eval(env: Environment): any {
    let value: Object = env.get(this.name())
    if (value == null) {
      throw new Error("undefind name: " + this.name())
    } else {
      return value
    }
  }
}

export default NameLiteral