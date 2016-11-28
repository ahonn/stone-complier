import ASTree from './ASTree'
import ASTList from './ASTList'
import Environment from '../Env/Environment'

class NegativeExpr extends ASTList {
  constructor(c: Array<ASTree>) {
    super(c)
  }

  operand(): ASTree {
    return this.child(0)
  }

  toString(): string {
    return "-" + this.operand()
  }

  eval(env: Environment): any {
    let value: Object = (<ASTree>this.operand()).eval(env)
    if (typeof value === "number") {
      return -value
    } else {
      throw new Error("bad type for -")
    }
  }
}

export default NegativeExpr