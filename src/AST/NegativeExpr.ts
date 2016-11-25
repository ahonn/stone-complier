import ASTList from './ASTList'
import ASTree from './ASTree'

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
}

export default NegativeExpr