import ASTree from './ASTree'
import ASTList from './ASTList'
import Environment from '../Env/Environment'

abstract class Postfix extends ASTList {
  constructor(c: Array<ASTree>) {
    super(c)
  }

  eval(env: Environment, value: Object): Object {
    throw new Error("cannot eval: " + this.toString())
  }
}

export default Postfix