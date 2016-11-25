import ASTList from './ASTList'
import ASTree from './ASTree'

class IfStmnt extends ASTList {
  constructor(c: Array<ASTree>) {
    super(c)
  }

  condition(): ASTree {
    return this.child(0)
  }

  thenBlock(): ASTree {
    return this.child(1)
  }

  elseBlock(): ASTree {
    return this.numChildren() > 2 ? this.child(2) : null
  }

  toString(): string {
    return "(if " + this.condition() + " " + this.thenBlock() 
            + " else " + this.elseBlock() + ")"
  }
}

export default IfStmnt