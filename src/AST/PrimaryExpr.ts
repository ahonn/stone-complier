import ASTList from './ASTList'
import ASTree from './ASTree'

class PrimaryExpr extends ASTList {
  constructor(c: Array<ASTree>) {
    super(c)
  }

  static create(c: Array<ASTree>) {
    return c.length === 1 ? c[0] : new PrimaryExpr(c)
  }
}

export default PrimaryExpr