import ASTList from './ASTList'
import ASTree from './ASTree'

class WhileStmnt extends ASTList {
  constructor(c: Array<ASTree>) {
    super(c)
  }

  condition(): ASTree {
    return this.child(0)
  }

  body(): ASTree {
    return this.child(1)
  }

  toString(): string {
    return "(while " + this.condition() + " " + this.body() + ")"
  }
}

export default WhileStmnt